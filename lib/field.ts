import { gsap } from "./gsap";
import { field, type RGB } from "./scene";

interface FieldTarget {
    hue?: RGB;
    x?: number;
    y?: number;
    gain?: number;
    density?: number;
}

/** Retune the fringe field: where the second source sits and which hue it leans to. */
export function tuneField({ hue, x, y, gain, density }: FieldTarget, duration = 1.4) {
    const instant = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const time = instant ? 0 : duration;
    if (hue) {
        gsap.to(field.accent, { 0: hue[0], 1: hue[1], 2: hue[2], duration: time, ease: "power2.out", overwrite: true });
    }
    const vars: gsap.TweenVars = { duration: time, ease: "power2.out", overwrite: "auto" };
    if (x !== undefined) vars.srcX = x;
    if (y !== undefined) vars.srcY = y;
    if (gain !== undefined) vars.gain = gain;
    if (density !== undefined) vars.density = density;
    gsap.to(field, vars);
}
