"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticProps {
    children: React.ReactNode;
    strength?: number;
    className?: string;
}

export function Magnetic({ children, strength = 0.3, className }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null);
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const x = useSpring(rawX, { stiffness: 180, damping: 14, mass: 0.25 });
    const y = useSpring(rawY, { stiffness: 180, damping: 14, mass: 0.25 });

    const handleMove = (event: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        rawX.set((event.clientX - (rect.left + rect.width / 2)) * strength);
        rawY.set((event.clientY - (rect.top + rect.height / 2)) * strength);
    };

    const handleLeave = () => {
        rawX.set(0);
        rawY.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{ x, y }}
            className={cn("inline-block will-change-transform", className)}
        >
            {children}
        </motion.div>
    );
}
