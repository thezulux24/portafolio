/**
 * Shared, mutable scene state. GSAP tweens these plain objects and the WebGL
 * layers read them every frame, so React never re-renders for motion.
 */

export type RGB = [number, number, number];

/** The fringe field behind every section. */
export const field = {
    /** Hue the fringes lean toward (linear-ish RGB, 0..1). */
    accent: [0.3, 0.95, 0.85] as RGB,
    /** Second wave source, in aspect-corrected uv (y from -0.5 to 0.5). */
    srcX: 0.55,
    srcY: 0.05,
    /** Overall fringe brightness. */
    gain: 1,
    /** Fringe density. */
    density: 1,
};

/** The hologram portrait in the hero. */
export const portrait = {
    /** 0 = scattered points, 1 = points converged on the figure. */
    formed: 0,
    /** 0..1.1, bottom-up scan that resolves the solid image. */
    reveal: 0,
    /** 0..1, scroll-driven: the figure breaks back into light. */
    dissolve: 0,
};

/** Named hues for the field, one per section / product. */
export const HUES = {
    holo: [0.3, 0.95, 0.85] as RGB,
    flare: [1.0, 0.25, 0.42] as RGB,
    sodium: [1.0, 0.7, 0.25] as RGB,
    lime: [0.72, 0.98, 0.3] as RGB,
    azure: [0.3, 0.6, 1.0] as RGB,
    green: [0.25, 0.9, 0.5] as RGB,
    ember: [1.0, 0.45, 0.2] as RGB,
} satisfies Record<string, RGB>;
