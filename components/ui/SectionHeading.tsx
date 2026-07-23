import { cn } from "@/lib/utils";

interface SectionHeadingProps {
    index: string;
    label: string;
    className?: string;
}

export function SectionHeading({ index, label, className }: SectionHeadingProps) {
    return (
        <div
            className={cn(
                "flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-bone/50",
                className
            )}
        >
            <span className="text-acid">( {index} )</span>
            <span>{label}</span>
            <span className="h-px flex-1 bg-bone/10" />
        </div>
    );
}
