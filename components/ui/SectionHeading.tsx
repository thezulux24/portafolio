"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { animate } from "animejs";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
    index: string;
    label: string;
    className?: string;
}

export function SectionHeading({ index, label, className }: SectionHeadingProps) {
    const rootRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLSpanElement>(null);
    const inView = useInView(rootRef, { once: true, margin: "-40px" });

    useEffect(() => {
        if (!inView || !lineRef.current) return;
        const anim = animate(lineRef.current, {
            scaleX: [0, 1],
            duration: 950,
            ease: "out(4)",
        });
        return () => {
            anim.cancel();
        };
    }, [inView]);

    return (
        <div
            ref={rootRef}
            className={cn(
                "flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-bone/55",
                className
            )}
        >
            <span className="text-acid">( {index} )</span>
            <span>{label}</span>
            <span
                ref={lineRef}
                style={{ transform: "scaleX(0)" }}
                className="h-px flex-1 origin-left bg-gradient-to-r from-acid/50 via-bone/15 to-bone/5 will-change-transform"
            />
        </div>
    );
}
