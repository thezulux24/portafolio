import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
    children: React.ReactNode;
    reverse?: boolean;
    duration?: number;
    className?: string;
    trackClassName?: string;
    pauseOnHover?: boolean;
}

export function Marquee({
    children,
    reverse = false,
    duration = 30,
    className,
    trackClassName,
    pauseOnHover = false,
}: MarqueeProps) {
    return (
        <div className={cn("marquee-mask", pauseOnHover && "marquee-paused", className)}>
            <div
                className={cn("marquee-track", reverse && "reverse", trackClassName)}
                style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
            >
                <div className="flex shrink-0 items-center">{children}</div>
                <div className="flex shrink-0 items-center" aria-hidden>
                    {children}
                </div>
            </div>
        </div>
    );
}
