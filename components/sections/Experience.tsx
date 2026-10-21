"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { animate, stagger } from "animejs";
import { ChevronDown, Globe } from "lucide-react";
import { useLanguageStore } from "@/lib/store";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const ROW_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Experience() {
    const { t } = useLanguageStore();
    const content = t.experience;
    const timelineRef = useRef<HTMLDivElement>(null);
    // Only the #1 US role starts expanded so the section stays ultra-compact
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start 75%", "end 35%"],
    });
    const spineScaleY = useSpring(scrollYProgress, {
        stiffness: 140,
        damping: 26,
        mass: 0.35,
    });

    const toggleRole = (index: number) => {
        setOpenIndex((prev) => {
            const next = prev === index ? null : index;
            if (next !== null) {
                requestAnimationFrame(() => {
                    animate(`.js-exp-pillar-${index}`, {
                        opacity: [0, 1],
                        translateY: [10, 0],
                        delay: stagger(55),
                        duration: 420,
                        ease: "out(3)",
                    });
                });
            }
            return next;
        });
    };

    return (
        <section id="experience" className="relative bg-ink px-5 py-20 md:px-10 md:py-32">
            <SectionHeading index={content.index} label={content.label} />

            <div className="mt-10 mb-12 flex flex-wrap items-end justify-between gap-4 md:mt-14 md:mb-14">
                <h2 className="font-display text-[clamp(2.4rem,8vw,6.5rem)] font-extrabold uppercase leading-[0.9] tracking-tight">
                    <span className="text-outline">{content.title}</span>
                    <span className="text-acid">.</span>
                </h2>
                <div className="flex items-center gap-2.5 pb-2 font-mono text-[11px] uppercase tracking-[0.24em] text-bone/50">
                    <Globe className="h-3.5 w-3.5 text-acid" />
                    <span>USA & LATAM · 2025 — 2026</span>
                </div>
            </div>

            {/* Roles timeline (compact interactive accordion) */}
            <div ref={timelineRef} className="relative border-b border-bone/10">
                <div
                    aria-hidden
                    className="pointer-events-none absolute bottom-0 left-0 top-0 w-[2px] bg-bone/10"
                >
                    <motion.div
                        className="h-full w-full origin-top bg-acid shadow-[0_0_12px_#c8f31d]"
                        style={{ scaleY: spineScaleY }}
                    />
                </div>

                {content.roles.map((role, index) => {
                    const isOpen = openIndex === index;
                    const hasHighlights = role.highlights && role.highlights.length > 0;

                    return (
                        <motion.article
                            key={role.company}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.04, duration: 0.5, ease: ROW_EASE }}
                            className="group relative border-t border-bone/10"
                        >
                            {/* Timeline node dot */}
                            <span
                                aria-hidden
                                className={cn(
                                    "pointer-events-none absolute -left-[4px] top-8 z-10 h-2.5 w-2.5 rounded-full border transition-all duration-300",
                                    role.current
                                        ? "border-acid bg-acid shadow-[0_0_10px_#c8f31d]"
                                        : "border-bone/30 bg-ink group-hover:border-acid group-hover:bg-acid"
                                )}
                            />

                            <div
                                role="button"
                                tabIndex={0}
                                onClick={() => toggleRole(index)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        toggleRole(index);
                                    }
                                }}
                                data-cursor
                                className="cursor-pointer py-6 pl-5 transition-colors duration-300 hover:bg-bone/[0.025] md:py-8 md:pl-8"
                            >
                                {/* Compact summary row */}
                                <div className="grid items-start gap-3 md:grid-cols-12 md:gap-6">
                                    {/* Col 1: Period & Badges */}
                                    <div className="flex flex-wrap items-center gap-2 md:col-span-3 md:block">
                                        <div className="flex items-center gap-2">
                                            {role.current && (
                                                <span className="inline-flex items-center gap-1.5 rounded-sm border-l-2 border-acid bg-acid/10 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-acid">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-acid" />
                                                    {content.present}
                                                </span>
                                            )}
                                            {role.badge && (
                                                <span className="rounded-sm border border-bone/15 bg-bone/[0.04] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-bone/70">
                                                    {role.badge}
                                                </span>
                                            )}
                                        </div>
                                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone/55 md:mt-2">
                                            {role.period} · <span className="text-bone/40">{role.location}</span>
                                        </p>
                                    </div>

                                    {/* Col 2: Company + Role */}
                                    <div className="md:col-span-4">
                                        <div className="flex items-center justify-between gap-2">
                                            <h3 className="font-display text-xl font-bold tracking-tight transition-colors duration-300 group-hover:text-acid md:text-2xl">
                                                {role.company}
                                            </h3>
                                            <span className="inline-flex items-center gap-1 rounded-full border border-bone/15 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-acid md:hidden">
                                                {isOpen ? content.hideHint : content.tapHint}
                                                <ChevronDown
                                                    className={cn(
                                                        "h-3 w-3 transition-transform duration-300",
                                                        isOpen && "rotate-180"
                                                    )}
                                                />
                                            </span>
                                        </div>
                                        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-bone/70">
                                            {role.role}
                                        </p>
                                    </div>

                                    {/* Col 3: Concise description + tech chips */}
                                    <div className="md:col-span-5">
                                        <div className="flex items-start justify-between gap-4">
                                            <p className="text-xs leading-relaxed text-bone/65 md:text-sm">
                                                {role.description}
                                            </p>
                                            <ChevronDown
                                                className={cn(
                                                    "mt-1 hidden h-4 w-4 shrink-0 text-acid transition-transform duration-300 md:block",
                                                    isOpen && "rotate-180"
                                                )}
                                            />
                                        </div>

                                        <div className="mt-3 flex flex-wrap gap-1.5">
                                            {role.tech.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="rounded-full border border-bone/15 bg-ink/50 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-bone/65 transition-colors group-hover:border-acid/30"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Expandable Architectural Highlights */}
                                <AnimatePresence initial={false}>
                                    {hasHighlights && isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35, ease: ROW_EASE }}
                                            className="overflow-hidden"
                                        >
                                            <div
                                                className={cn(
                                                    "mt-5 grid gap-2.5 border-t border-bone/10 pt-4",
                                                    role.highlights.length >= 3
                                                        ? "sm:grid-cols-3"
                                                        : role.highlights.length === 2
                                                        ? "sm:grid-cols-2"
                                                        : "grid-cols-1"
                                                )}
                                            >
                                                {role.highlights.map((item) => (
                                                    <div
                                                        key={item.title}
                                                        className={cn(
                                                            `js-exp-pillar-${index}`,
                                                            "rounded-xl border border-acid/25 bg-secondary/60 p-3.5"
                                                        )}
                                                    >
                                                        <h4 className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-acid">
                                                            {item.title}
                                                        </h4>
                                                        <p className="mt-1 text-xs leading-relaxed text-bone/70">
                                                            {item.text}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.article>
                    );
                })}
            </div>

            {/* Compact 3-Column Meta Strip */}
            <div className="mt-10 grid gap-6 pt-4 sm:grid-cols-3 md:mt-12">
                <div className="rounded-xl border border-bone/10 bg-secondary/30 p-4">
                    <h3 className="font-mono text-[10px] uppercase tracking-[0.26em] text-acid">
                        {content.educationLabel}
                    </h3>
                    {content.education.map((entry) => (
                        <div key={entry.degree} className="mt-2">
                            <p className="font-display text-xs font-bold leading-snug text-bone md:text-sm">
                                {entry.degree}
                            </p>
                            <p className="mt-1 font-mono text-[10px] text-bone/45">
                                {entry.school} · {entry.period}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="rounded-xl border border-bone/10 bg-secondary/30 p-4">
                    <h3 className="font-mono text-[10px] uppercase tracking-[0.26em] text-acid">
                        {content.languagesLabel}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {content.languages.map((lang) => (
                            <span
                                key={lang}
                                className="rounded-full border border-bone/15 bg-ink/50 px-3 py-1 font-mono text-[10px] text-bone/80"
                            >
                                {lang}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="rounded-xl border border-bone/10 bg-secondary/30 p-4">
                    <h3 className="font-mono text-[10px] uppercase tracking-[0.26em] text-acid">
                        {content.awardLabel}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-bone/65">{content.award}</p>
                </div>
            </div>
        </section>
    );
}
