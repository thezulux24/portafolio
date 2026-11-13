"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { restoreLang } from "@/lib/store";

let lenis: Lenis | null = null;

/** Scroll to an element or offset, smoothly when smooth scroll is running. */
export function scrollTo(target: string | number | HTMLElement, offset = 0) {
    if (lenis) {
        lenis.scrollTo(target, { offset, duration: 1.2 });
        return;
    }
    if (typeof target === "number") {
        window.scrollTo({ top: target + offset });
        return;
    }
    const node = typeof target === "string" ? document.querySelector(target) : target;
    if (node) window.scrollTo({ top: node.getBoundingClientRect().top + window.scrollY + offset });
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        restoreLang();

        const onClick = (event: MouseEvent) => {
            const anchor = (event.target as HTMLElement).closest?.('a[href^="#"]') as HTMLAnchorElement | null;
            if (!anchor) return;
            const hash = anchor.getAttribute("href");
            if (!hash) return;
            event.preventDefault();
            if (hash === "#") {
                scrollTo(0);
            } else if (document.querySelector(hash)) {
                scrollTo(hash);
                history.replaceState(null, "", hash);
            }
        };
        document.addEventListener("click", onClick);

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return () => document.removeEventListener("click", onClick);
        }

        lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => lenis?.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        return () => {
            document.removeEventListener("click", onClick);
            gsap.ticker.remove(tick);
            lenis?.destroy();
            lenis = null;
        };
    }, []);

    return <>{children}</>;
}
