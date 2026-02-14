"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useVelocity, useTransform } from "framer-motion";

export function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Spring configuration for the "follower" effect (laggy)
    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    // Velocity for deformation (optional "jelly" effect)
    const velocityX = useVelocity(x);
    const velocityY = useVelocity(y);
    const scaleX = useTransform(velocityX, [-1000, 0, 1000], [1.2, 1, 1.2]);
    const scaleY = useTransform(velocityY, [-1000, 0, 1000], [0.8, 1, 0.8]);

    useEffect(() => {
        const moveMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            const target = e.target as HTMLElement;
            const isInteractive =
                window.getComputedStyle(target).cursor === "pointer" ||
                target.tagName.toLowerCase() === "button" ||
                target.tagName.toLowerCase() === "a" ||
                target.closest("button") ||
                target.closest("a");

            setIsHovered(!!isInteractive);
        };

        window.addEventListener("mousemove", moveMouse);
        return () => window.removeEventListener("mousemove", moveMouse);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="fixed inset-0 pointer-events-none z-[9999]"
        >
            <motion.div
                className="absolute w-4 h-4 bg-primary rounded-full mix-blend-difference"
                style={{
                    x,
                    y,
                    translateX: "-50%",
                    translateY: "-50%",
                    scaleX: scaleX, // Dynamic squash/stretch
                    scaleY: scaleY, // Dynamic squash/stretch
                }}
                animate={{
                    scale: isHovered ? 2.5 : 1, // Enlarge on hover
                }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
            />
        </motion.div>
    );
}
