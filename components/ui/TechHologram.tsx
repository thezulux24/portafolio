"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { BrandIcon } from "@/components/ui/BrandIcon";

const NAMES: Record<string, string> = {
    rust: "Rust",
    cplusplus: "C++",
    python: "Python",
    typescript: "TypeScript",
    nestjs: "NestJS",
    postgresql: "PostgreSQL",
    redis: "Redis",
    docker: "Docker",
    react: "React",
    nextjs: "Next.js",
    angular: "Angular",
    threejs: "Three.js",
    tailwind: "Tailwind",
    claude: "Claude",
    gemini: "Gemini",
    linux: "Linux",
};

// Two orbits of tools around a projected core, turning opposite ways:
// the lower one is the backend, the upper one the interface and the models.
const RINGS = [
    { icons: ["rust", "cplusplus", "python", "typescript", "nestjs", "postgresql", "redis", "docker"], tone: "holo", y: 0.7, spread: 1, speed: 0.55 },
    { icons: ["react", "nextjs", "angular", "threejs", "tailwind", "claude", "gemini", "linux"], tone: "flare", y: 0.34, spread: 0.78, speed: -0.42 },
] as const;

const TILT = 0.2;
const MOTES = 12;

/** Decorative: the tools of the stack, projected as a hologram. The real list is the text below it. */
export function TechHologram({ className = "" }: { className?: string }) {
    const root = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const node = root.current;
        if (!node) return;
        const items = RINGS.map((_, ring) => Array.from(node.querySelectorAll<HTMLElement>(`[data-ring="${ring}"]`)));
        const labels = items.map((list) => list.map((item) => item.querySelector<HTMLElement>(".tech-holo-label")));
        const orbits = Array.from(node.querySelectorAll<SVGEllipseElement>(".tech-holo-orbits ellipse"));
        const svg = node.querySelector<SVGSVGElement>(".tech-holo-orbits");
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const pointer = { x: 0, target: 0 };
        let angle = 0.6;
        let width = 0;
        let height = 0;
        let radius = 0;

        const measure = () => {
            width = node.clientWidth;
            height = node.clientHeight;
            radius = Math.min(width * 0.4, height * 0.9);
            svg?.setAttribute("viewBox", `0 0 ${width} ${height}`);
            RINGS.forEach((ring, r) => {
                const orbit = orbits[r];
                if (!orbit) return;
                orbit.setAttribute("cx", String(width / 2));
                orbit.setAttribute("cy", String(ring.y * height));
                orbit.setAttribute("rx", String(radius * ring.spread));
                orbit.setAttribute("ry", String(radius * ring.spread * TILT));
            });
        };

        const place = () => {
            pointer.x += (pointer.target - pointer.x) * 0.06;
            RINGS.forEach((ring, r) => {
                const list = items[r];
                list.forEach((item, i) => {
                    const a = angle * ring.speed + (i / list.length) * Math.PI * 2 + pointer.x * 0.5;
                    const depth = (Math.cos(a) + 1) / 2; // 1 in front, 0 behind
                    const x = Math.sin(a) * radius * ring.spread;
                    const y = ring.y * height + Math.cos(a) * radius * ring.spread * TILT;
                    const scale = 0.58 + depth * 0.52;
                    item.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
                    item.style.opacity = (0.12 + depth * 0.88).toFixed(3);
                    item.style.zIndex = String(Math.round(depth * 20));
                    // The tool closest to the viewer reads out its name.
                    const label = labels[r][i];
                    if (label) label.style.opacity = Math.max(0, (depth - 0.88) / 0.12).toFixed(3);
                });
            });
        };

        const tick = (_time: number, delta: number) => {
            angle += (delta / 1000) * 0.5;
            place();
        };

        const onMove = (event: PointerEvent) => {
            if (event.pointerType === "touch") return;
            pointer.target = (event.clientX / window.innerWidth) * 2 - 1;
        };
        const onResize = () => {
            measure();
            place();
        };

        let live = false;
        const observer = new IntersectionObserver(
            ([entry]) => {
                node.classList.toggle("is-live", entry.isIntersecting);
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

        measure();
        place();
        observer.observe(node);
        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("resize", onResize);
        return () => {
            observer.disconnect();
            gsap.ticker.remove(tick);
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <div ref={root} className={"tech-holo " + className} aria-hidden="true">
            <div className="tech-holo-beam" />
            <div className="tech-holo-motes">
                {Array.from({ length: MOTES }, (_, i) => (
                    <span
                        key={i}
                        style={
                            {
                                "--x": `${18 + ((i * 37) % 64)}%`,
                                "--d": `${(i * 0.53) % 4}s`,
                                "--t": `${3.2 + ((i * 7) % 5) * 0.45}s`,
                            } as React.CSSProperties
                        }
                    />
                ))}
            </div>
            <svg className="tech-holo-orbits">
                <defs>
                    <linearGradient id="orbit-holo" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="oklch(0.88 0.15 185)" stopOpacity="0.12" />
                        <stop offset="1" stopColor="oklch(0.88 0.15 185)" stopOpacity="0.85" />
                    </linearGradient>
                    <linearGradient id="orbit-flare" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="oklch(0.78 0.18 355)" stopOpacity="0.1" />
                        <stop offset="1" stopColor="oklch(0.78 0.18 355)" stopOpacity="0.75" />
                    </linearGradient>
                </defs>
                <ellipse fill="none" stroke="url(#orbit-holo)" strokeWidth="1" />
                <ellipse fill="none" stroke="url(#orbit-flare)" strokeWidth="1" strokeDasharray="2 5" />
            </svg>
            <span className="tech-holo-core">
                <i />
            </span>
            <div className="tech-holo-base">
                <span />
                <span />
                <span className="tech-holo-spin">
                    <i />
                </span>
            </div>
            {RINGS.map((ring, r) =>
                ring.icons.map((icon) => (
                    <span key={icon} data-ring={r} className={"tech-holo-item " + (ring.tone === "flare" ? "is-flare" : "")}>
                        <BrandIcon icon={icon} />
                        <span className="tech-holo-label">{NAMES[icon]}</span>
                    </span>
                ))
            )}
        </div>
    );
}
