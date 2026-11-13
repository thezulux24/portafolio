import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger, ScrambleTextPlugin, CustomEase);
    // Things resolve, they do not bounce: one strong ease-out and one in-out for on-screen travel.
    CustomEase.create("resolve", "0.23, 1, 0.32, 1");
    CustomEase.create("travel", "0.77, 0, 0.175, 1");
    gsap.defaults({ ease: "resolve", duration: 0.6 });
}

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const STAGE = "(min-width: 75rem) and (min-height: 44rem)";

export { gsap, ScrollTrigger, useGSAP };
