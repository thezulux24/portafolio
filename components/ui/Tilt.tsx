"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCoarsePointer } from "@/lib/useCoarsePointer";
import { cn } from "@/lib/utils";

interface TiltProps {
    children: React.ReactNode;
    /** Max rotation in degrees */
    max?: number;
    className?: string;
}

/** Physics-based 3D tilt on hover. Disabled on touch devices. */
export function Tilt({ children, max = 8, className }: TiltProps) {
    const ref = useRef<HTMLDivElement>(null);
    const coarse = useCoarsePointer();
    const rawRotateX = useMotionValue(0);
    const rawRotateY = useMotionValue(0);
    const rotateX = useSpring(rawRotateX, { stiffness: 160, damping: 18, mass: 0.4 });
    const rotateY = useSpring(rawRotateY, { stiffness: 160, damping: 18, mass: 0.4 });

    const handleMove = (event: React.MouseEvent) => {
        if (coarse) return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        rawRotateY.set(px * max);
        rawRotateX.set(-py * max);
    };

    const handleLeave = () => {
        rawRotateX.set(0);
        rawRotateY.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{
                rotateX,
                rotateY,
                transformPerspective: 900,
                transformStyle: "preserve-3d",
            }}
            className={cn("will-change-transform", className)}
        >
            {children}
        </motion.div>
    );
}
