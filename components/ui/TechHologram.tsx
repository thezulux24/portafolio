"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { BrandIcon } from "@/components/ui/BrandIcon";

// Two rings of tools orbit inside the projector's beam, turning opposite ways:
// the lower one is the backend, the upper one the interface and the models.
const RINGS = [
    { icons: ["rust", "cplusplus", "python", "typescript", "nestjs", "postgresql", "redis", "docker"], tone: "holo", y: 0.66, speed: 0.16 },
    { icons: ["react", "nextjs", "angular", "threejs", "tailwind", "claude", "gemini", "linux"], tone: "flare", y: 0.3, speed: -0.12 },
] as const;

/** Decorative: the tools of the stack, projected as a hologram. The real list is the text beside it. */
export function TechHologram({ className = "" }: { className?: string }) {
    const root = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const node = root.current;
        if (!node) return;
        const items = RINGS.map((_, ring) => Array.from(node.querySelectorAll<HTMLElement>(`[data-ring="${ring}"]`)));
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const pointer = { x: 0, target: 0 };
        let angle = 0;

        const place = () => {
            const width = node.clientWidth;
            const height = node.clientHeight;
            const radius = Math.min(width * 0.36, height * 0.62);
            pointer.x += (pointer.target - pointer.x) * 0.06;
            RINGS.forEach((ring, r) => {
                const list = items[r];
                list.forEach((item, i) => {
                    const a = angle * ring.speed * 6 + (i / list.length) * Math.PI * 2 + pointer.x * 0.6;
                    const depth = (Math.cos(a) + 1) / 2; // 1 in front, 0 behind
                    const x = Math.sin(a) * radius;
                    const y = ring.y * height + Math.cos(a) * radius * (0.17 + pointer.x * 0.02);
                    const scale = 0.62 + depth * 0.5;
                    item.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
                    item.style.opacity = (0.18 + depth * 0.82).toFixed(3);
                    item.style.zIndex = String(Math.round(depth * 10));
                });
            });
        };

        const tick = (_time: number, delta: number) => {
            angle += (delta / 1000) * 0.6;
            place();
        };

        const onMove = (event: PointerEvent) => {
            if (event.pointerType === "touch") return;
            pointer.target = (event.clientX / window.innerWidth) * 2 - 1;
        };

        let live = false;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (reduce) return;
                if (entry.isIntersecting && !live) {
                    gsap.ticker.add(tick);
                    live = true;
                } else if (!entry.isIntersecting && live) {
                    gsap.ticker.remove(tick);
                    live = false;
                }
            },
            { rootMargin: "100px" }
        );

        place();
        observer.observe(node);
        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("resize", place);
        return () => {
            observer.disconnect();
            gsap.ticker.remove(tick);
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("resize", place);
        };
    }, []);

    return (
        <div ref={root} className={"tech-holo " + className} aria-hidden="true">
            <div className="tech-holo-beam">
                <span />
            </div>
            <div className="tech-holo-base">
                <span />
                <span />
                <span />
            </div>
            {RINGS.map((ring, r) =>
                ring.icons.map((icon) => (
                    <span key={icon} data-ring={r} className={"tech-holo-item " + (ring.tone === "flare" ? "is-flare" : "")}>
                        <BrandIcon icon={icon} />
                    </span>
                ))
            )}
        </div>
    );
}
