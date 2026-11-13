"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useIntro } from "@/lib/store";

/**
 * A short exposure: the plate counts up while fonts and the portrait load,
 * then clears. Seen once per visit: about 1.5 s, and never more than 2.7 s on a slow network.
 */
export function Preloader() {
    const root = useRef<HTMLDivElement>(null);
    const count = useRef<HTMLSpanElement>(null);
    const bar = useRef<HTMLSpanElement>(null);
    const [gone, setGone] = useState(false);
    const setReady = useIntro((state) => state.setReady);

    useGSAP(
        () => {
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                setReady();
                setGone(true);
                return;
            }

            const progress = { value: 0 };
            const assets = Promise.all([
                document.fonts.ready,
                new Promise<void>((resolve) => {
                    const image = new Image();
                    image.onload = image.onerror = () => resolve();
                    image.src = "/holo/portrait.webp";
                }),
            ]);
            // Never wait on the network for more than a moment: the page works without the portrait.
            const loaded = Promise.race([assets, new Promise((resolve) => setTimeout(resolve, 2200))]);

            const render = () => {
                if (count.current) count.current.textContent = String(Math.round(progress.value)).padStart(3, "0");
                if (bar.current) bar.current.style.transform = `scaleX(${progress.value / 100})`;
            };

            const timeline = gsap.timeline();
            timeline.to(progress, { value: 82, duration: 0.8, ease: "power2.out", onUpdate: render });
            timeline.add(() => {
                timeline.pause();
                loaded.then(() => timeline.resume());
            });
            timeline.to(progress, { value: 100, duration: 0.3, ease: "power2.out", onUpdate: render });
            timeline.add(() => setReady());
            timeline.to(root.current, { autoAlpha: 0, duration: 0.45, ease: "power2.out", onComplete: () => setGone(true) });
        },
        { scope: root }
    );

    if (gone) return null;

    return (
        <div ref={root} className="preloader fixed inset-0 z-[100] grid place-items-center bg-void" aria-hidden="true">
            <div className="flex w-[min(20rem,70vw)] flex-col gap-4">
                <span ref={count} className="readout text-6xl text-holo">
                    000
                </span>
                <span className="block h-px w-full bg-void-3">
                    <span ref={bar} className="block h-px origin-left scale-x-0 bg-holo" />
                </span>
            </div>
        </div>
    );
}
