"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
        let rafId = 0;

        const loop = (time: number) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(loop);
        };
        rafId = requestAnimationFrame(loop);

        // Intercept in-page anchors and glide with lenis instead of jumping.
        const onClick = (event: MouseEvent) => {
            const anchor = (event.target as HTMLElement).closest?.(
                'a[href^="#"]'
            ) as HTMLAnchorElement | null;
            if (!anchor) return;

            const hash = anchor.getAttribute("href");
            if (!hash || hash === "#") {
                event.preventDefault();
                lenis.scrollTo(0, { duration: 1.4 });
                return;
            }

            const target = document.querySelector(hash);
            if (target) {
                event.preventDefault();
                lenis.scrollTo(target as HTMLElement, { duration: 1.5 });
            }
        };

        document.addEventListener("click", onClick);

        return () => {
            cancelAnimationFrame(rafId);
            document.removeEventListener("click", onClick);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
