"use client";

import { useId } from "react";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface RotatingBadgeProps {
    text: string;
    className?: string;
}

export function RotatingBadge({ text, className }: RotatingBadgeProps) {
    const id = useId();
    const pathId = `badge-circle-${id.replace(/[^a-zA-Z0-9]/g, "")}`;

    return (
        <div className={cn("relative h-28 w-28 text-foreground/80", className)}>
            <svg viewBox="0 0 100 100" className="h-full w-full animate-spin-slow">
                <defs>
                    <path
                        id={pathId}
                        d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                        fill="none"
                    />
                </defs>
                <text className="fill-current font-mono text-[8px] uppercase tracking-[0.22em]">
                    <textPath href={`#${pathId}`}>{text}</textPath>
                </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <ArrowDown className="h-4 w-4 text-acid" />
            </div>
        </div>
    );
}
