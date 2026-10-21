"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
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
    const [pressed, setPressed] = useState(false);
    const [label, setLabel] = useState<string | null>(null);

    const visibleRef = useRef(false);
    const variantRef = useRef<CursorVariant>("default");
    const labelRef = useRef<string | null>(null);
    const lastTargetRef = useRef<EventTarget | null>(null);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const dotX = useSpring(mouseX, { stiffness: 1100, damping: 58, mass: 0.15 });
    const dotY = useSpring(mouseY, { stiffness: 1100, damping: 58, mass: 0.15 });
    const ringX = useSpring(mouseX, { stiffness: 210, damping: 22, mass: 0.45 });
    const ringY = useSpring(mouseY, { stiffness: 210, damping: 22, mass: 0.45 });

    useEffect(() => {
        if (!enabled) return;

        document.documentElement.classList.add("has-custom-cursor");

        const onMove = (event: MouseEvent) => {
            mouseX.set(event.clientX);
            mouseY.set(event.clientY);
            if (!visibleRef.current) {
                visibleRef.current = true;
                setVisible(true);
            }
        };

        const onOver = (event: MouseEvent) => {
            if (event.target === lastTargetRef.current) return;
            lastTargetRef.current = event.target;

            const target = event.target as HTMLElement | null;
            if (!target?.closest) return;

            const interactive = Boolean(target.closest("a, button, [data-cursor]"));
            const nextVariant: CursorVariant = interactive ? "hover" : "default";
            if (nextVariant !== variantRef.current) {
                variantRef.current = nextVariant;
                setVariant(nextVariant);
            }

            const labelled = target.closest("[data-cursor-label]");
            const nextLabel = labelled ? labelled.getAttribute("data-cursor-label") : null;
            if (nextLabel !== labelRef.current) {
                labelRef.current = nextLabel;
                setLabel(nextLabel);
            }
        };

        const onDown = () => setPressed(true);
        const onUp = () => setPressed(false);
        const onLeave = () => {
            visibleRef.current = false;
            setVisible(false);
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("mouseover", onOver, { passive: true });
        window.addEventListener("mousedown", onDown, { passive: true });
        window.addEventListener("mouseup", onUp, { passive: true });
        document.documentElement.addEventListener("mouseleave", onLeave);

        return () => {
            document.documentElement.classList.remove("has-custom-cursor");
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseover", onOver);
            window.removeEventListener("mousedown", onDown);
            window.removeEventListener("mouseup", onUp);
            document.documentElement.removeEventListener("mouseleave", onLeave);
        };
    }, [enabled, mouseX, mouseY]);

    if (!enabled) return null;

    return (
        <>
            {/* Trailing ring */}
            <motion.div
                aria-hidden
                className="pointer-events-none fixed left-0 top-0 z-[299] will-change-transform"
                style={{ x: ringX, y: ringY }}
            >
                <motion.div
                    className="-ml-5 -mt-5 h-10 w-10 rounded-full border border-acid/80 mix-blend-difference"
                    animate={{
                        scale: label ? 0 : pressed ? 0.42 : variant === "hover" ? 1.65 : 0.55,
                        opacity: visible ? (variant === "hover" ? 1 : 0.65) : 0,
                    }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                />
            </motion.div>

            {/* Core dot */}
            <motion.div
                aria-hidden
                className="pointer-events-none fixed left-0 top-0 z-[300] will-change-transform"
                style={{ x: dotX, y: dotY }}
            >
                <motion.div
                    className="-ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-acid"
                    animate={{ scale: label ? 0 : pressed ? 1.6 : 1, opacity: visible ? 1 : 0 }}
                    transition={{ duration: 0.15 }}
                />
            </motion.div>

            {/* Label bubble */}
            <motion.div
                aria-hidden
                className="pointer-events-none fixed left-0 top-0 z-[301] will-change-transform"
                style={{ x: dotX, y: dotY }}
            >
                <motion.div
                    className={cn(
                        "-ml-10 -mt-10 flex h-20 w-20 items-center justify-center rounded-full bg-acid text-center shadow-[0_0_30px_rgba(200,243,29,0.4)]"
                    )}
                    animate={{ scale: label ? 1 : 0, opacity: label ? 1 : 0 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                >
                    <span className="px-2 font-mono text-[9px] font-semibold uppercase leading-tight tracking-[0.18em] text-ink">
                        {label}
                    </span>
                </motion.div>
            </motion.div>
        </>
    );
}
