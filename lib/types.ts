import type { Lang } from "./store";
import type { RGB } from "./scene";

/** A string in both languages. */
export type L = Record<Lang, string>;

export interface Shot {
    src: string;
    width: number;
    height: number;
    alt: L;
    /** Which side to keep when a capture is wider than the plate. Defaults to the left. */
    keep?: "left" | "right";
}

export interface ProjectLink {
    label: L;
    href: string;
}

export interface Project {
    slug: string;
    name: string;
    /** What kind of thing it is, in a few words. */
    kind: L;
    /** The one sentence. */
    line: L;
    /** Three facts, each verifiable in the repo. */
    facts: { value: string; label: L }[];
    stack: string[];
    role?: L;
    year: string;
    /** Phone captures are laid out side by side instead of one wide screen. */
    device: "desktop" | "phone";
    shots: Shot[];
    links: ProjectLink[];
    /** Shown when the code is private or the data on screen is demo data. */
    note?: L;
    /** Hue the fringe field takes while this product is on stage. */
    hue: RGB;
}

export interface Role {
    period: L;
    company: string;
    title: L;
    line: L;
    /** Up to two short specifics under the line. */
    points?: L[];
    current: boolean;
}

export interface StackGroup {
    title: L;
    /** One sentence on what this discipline delivers. */
    line: L;
    items: { name: string; icon?: string }[];
}
