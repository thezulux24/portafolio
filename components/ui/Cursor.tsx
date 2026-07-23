"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type CursorVariant = "default" | "hover";

function subscribeFinePointer(callback: () => void) {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    mediaQuery.addEventListener("change", callback);
    return () => mediaQuery.removeEventListener("change", callback);
}

export function Cursor() {
    const enabled = useSyncExternalStore(
        subscribeFinePointer,
        () => window.matchMedia("(pointer: fine)").matches,
        () => false
    );
    const [visible, setVisible] = useState(false);
    const [variant, setVariant] = useState<CursorVariant>("default");
    const [label, setLabel] = useState<string | null>(null);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const dotX = useSpring(mouseX, { stiffness: 1000, damping: 60, mass: 0.2 });
    const dotY = useSpring(mouseY, { stiffness: 1000, damping: 60, mass: 0.2 });
    const ringX = useSpring(mouseX, { stiffness: 160, damping: 20, mass: 0.6 });
    const ringY = useSpring(mouseY, { stiffness: 160, damping: 20, mass: 0.6 });

    useEffect(() => {
        if (!enabled) return;

        document.documentElement.classList.add("has-custom-cursor");

        const onMove = (event: MouseEvent) => {
            mouseX.set(event.clientX);
            mouseY.set(event.clientY);
            setVisible(true);
        };

        const onOver = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            const interactive = target.closest?.("a, button, [data-cursor]");
            setVariant(interactive ? "hover" : "default");
            const labelled = target.closest?.("[data-cursor-label]");
            setLabel(labelled ? labelled.getAttribute("data-cursor-label") : null);
        };

        const onLeave = () => setVisible(false);

        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("mouseover", onOver, { passive: true });
        document.documentElement.addEventListener("mouseleave", onLeave);

        return () => {
            document.documentElement.classList.remove("has-custom-cursor");
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseover", onOver);
            document.documentElement.removeEventListener("mouseleave", onLeave);
        };
    }, [enabled, mouseX, mouseY]);

    if (!enabled) return null;

    return (
        <>
            {/* Trailing ring */}
            <motion.div
                aria-hidden
                className="pointer-events-none fixed left-0 top-0 z-[299]"
                style={{ x: ringX, y: ringY }}
            >
                <motion.div
                    className="-ml-5 -mt-5 h-10 w-10 rounded-full border border-white mix-blend-difference"
                    animate={{
                        scale: label ? 0 : variant === "hover" ? 1.7 : 0.55,
                        opacity: visible ? (variant === "hover" ? 1 : 0.7) : 0,
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                />
            </motion.div>

            {/* Core dot */}
            <motion.div
                aria-hidden
                className="pointer-events-none fixed left-0 top-0 z-[300]"
                style={{ x: dotX, y: dotY }}
            >
                <motion.div
                    className="-ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference"
                    animate={{ scale: label ? 0 : 1, opacity: visible ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                />
            </motion.div>

            {/* Label bubble */}
            <motion.div
                aria-hidden
                className="pointer-events-none fixed left-0 top-0 z-[301]"
                style={{ x: dotX, y: dotY }}
            >
                <motion.div
                    className={cn(
                        "-ml-9 -mt-9 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-acid text-center"
                    )}
                    animate={{ scale: label ? 1 : 0, opacity: label ? 1 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <span className="px-2 font-mono text-[9px] font-medium uppercase leading-tight tracking-[0.18em] text-ink">
                        {label}
                    </span>
                </motion.div>
            </motion.div>
        </>
    );
}
