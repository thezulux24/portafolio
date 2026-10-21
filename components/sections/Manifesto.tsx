"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { animate, stagger } from "animejs";
import { useLanguageStore } from "@/lib/store";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tilt } from "@/components/ui/Tilt";
import { cn } from "@/lib/utils";

const HIGHLIGHTS = new Set([
    "señal",
    "caos:",
    "resilientes",
    "global.",
    "signal",
    "chaos:",
    "resilient",
    "globally.",
]);

const REVEAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function AnimatedMetricCard({
    value,
    suffix,
    label,
    detail,
    index,
    trigger,
}: {
    value: number;
    suffix: string;
    label: string;
    detail: string;
    index: number;
    trigger: boolean;
}) {
    const numberRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!trigger || !numberRef.current) return;
        const el = numberRef.current;
        const state = { val: 0 };
        const anim = animate(state, {
            val: value,
            duration: 1350,
            delay: index * 95,
            ease: "out(4)",
            onUpdate: () => {
                el.textContent = String(Math.round(state.val));
            },
        });
        return () => {
            anim.cancel();
        };
    }, [trigger, value, index]);

    return (
        <div
            data-cursor
            className="js-manifesto-metric group relative overflow-hidden rounded-xl border border-bone/10 bg-secondary/40 p-4 opacity-0 transition-colors duration-300 hover:border-acid/45 hover:bg-bone/[0.03] md:p-5"
        >
            <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-0.5 font-display text-3xl font-extrabold tracking-tight text-acid md:text-4xl">
                    <span ref={numberRef} className="tabular-nums">
                        0
                    </span>
                    <span>{suffix}</span>
                </div>
                <span className="font-mono text-[9px] tracking-[0.2em] text-bone/25 group-hover:text-acid">
                    0{index + 1}
                </span>
            </div>
            <p className="mt-2 font-display text-xs font-bold leading-snug text-bone/90 md:text-sm">
                {label}
            </p>
            <p className="mt-1 truncate font-mono text-[9px] uppercase tracking-[0.14em] text-bone/45">
                {detail}
            </p>
        </div>
    );
}

export function Manifesto() {
    const { t } = useLanguageStore();
    const words = t.manifesto.statement.split(" ");
    const metricsRef = useRef<HTMLDivElement>(null);
    const metricsInView = useInView(metricsRef, { once: true, margin: "-60px" });

    useEffect(() => {
        if (!metricsInView) return;
        const anim = animate(".js-manifesto-metric", {
            opacity: [0, 1],
            translateY: [20, 0],
            delay: stagger(80),
            duration: 650,
            ease: "out(3)",
        });
        return () => {
            anim.cancel();
        };
    }, [metricsInView]);

    return (
        <section id="about" className="relative bg-ink px-5 py-20 md:px-10 md:py-32">
            <SectionHeading index={t.manifesto.index} label={t.manifesto.label} />

            {/* Compact 2x2 (mobile) / 4-col (desktop) Telemetry Strip */}
            <div
                ref={metricsRef}
                className="mt-8 grid grid-cols-2 gap-3 md:mt-10 lg:grid-cols-4 lg:gap-4"
            >
                {t.manifesto.metrics.map((metric, idx) => (
                    <AnimatedMetricCard
                        key={metric.label}
                        value={metric.value}
                        suffix={metric.suffix}
                        label={metric.label}
                        detail={metric.detail}
                        index={idx}
                        trigger={metricsInView}
                    />
                ))}
            </div>

            <div className="mt-10 grid items-center gap-10 lg:mt-14 lg:grid-cols-12">
                {/* Portrait */}
                <div className="lg:col-span-5">
                    <Tilt max={6}>
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.7, ease: REVEAL_EASE }}
                            data-cursor
                            className="group relative mx-auto aspect-[4/4.2] max-w-md overflow-hidden rounded-2xl border border-bone/10 transition-colors duration-500 hover:border-acid/50 lg:max-w-none"
                        >
                            <Image
                                src="/images/fotoperfil.jpg"
                                alt="Brayan Zuluaga"
                                fill
                                priority
                                quality={90}
                                sizes="(max-width: 1024px) 100vw, 40vw"
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                            />

                            {/* HUD corner brackets */}
                            <div className="pointer-events-none absolute inset-3.5">
                                <span className="absolute left-0 top-0 h-3.5 w-3.5 border-l-2 border-t-2 border-acid/70" />
                                <span className="absolute right-0 top-0 h-3.5 w-3.5 border-r-2 border-t-2 border-acid/70" />
                                <span className="absolute bottom-9 left-0 h-3.5 w-3.5 border-b-2 border-l-2 border-acid/70" />
                                <span className="absolute bottom-9 right-0 h-3.5 w-3.5 border-b-2 border-r-2 border-acid/70" />
                            </div>

                            <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-ink/80 to-transparent px-4 pt-3.5 pb-6 font-mono text-[9px] uppercase tracking-[0.22em] text-bone/70">
                                <span>SYS.ARCHITECT</span>
                                <span className="text-acid">FL, USA · CALI, CO</span>
                            </div>

                            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/95 via-ink/60 to-transparent px-4 pb-3.5 pt-14 font-mono text-[10px] uppercase tracking-[0.24em] text-bone/85">
                                <span>Brayan Zuluaga</span>
                                <span className="text-acid">US & LATAM</span>
                            </div>
                        </motion.div>
                    </Tilt>
                </div>

                {/* Statement + concise bio + 4 Focus Pillars */}
                <div className="flex flex-col gap-7 lg:col-span-7 lg:pl-6">
                    <motion.p
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-15%" }}
                        variants={{
                            hidden: {},
                            visible: {
                                transition: { staggerChildren: 0.028, delayChildren: 0.05 },
                            },
                        }}
                        className="font-display text-2xl font-bold leading-[1.14] tracking-tight sm:text-3xl md:text-5xl"
                    >
                        {words.map((word, index) => (
                            <motion.span
                                key={`${word}-${index}`}
                                variants={{
                                    hidden: { opacity: 0.08, y: 12 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: { duration: 0.45, ease: REVEAL_EASE },
                                    },
                                }}
                                className={cn(
                                    "inline-block will-change-transform",
                                    HIGHLIGHTS.has(word.toLowerCase()) && "text-acid"
                                )}
                            >
                                {word}&nbsp;
                            </motion.span>
                        ))}
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.5, ease: REVEAL_EASE }}
                        className="max-w-2xl text-sm leading-relaxed text-bone/65 md:text-base"
                    >
                        {t.manifesto.body}
                    </motion.p>

                    {/* 4 Focus Pillars — 2x2 grid on all viewports for clean scannability */}
                    <div className="grid grid-cols-1 gap-3 border-t border-bone/10 pt-6 sm:grid-cols-2">
                        {t.manifesto.focus.map((item, index) => (
                            <div
                                key={item.title}
                                className="group rounded-xl border border-bone/10 bg-secondary/35 p-4 transition-colors duration-300 hover:border-acid/45 hover:bg-bone/[0.03]"
                            >
                                <div className="flex items-center justify-between">
                                    <h4 className="font-display text-sm font-bold text-bone transition-colors group-hover:text-acid md:text-base">
                                        {item.title}
                                    </h4>
                                    <span className="font-mono text-[9px] text-acid/80">
                                        0{index + 1}
                                    </span>
                                </div>
                                <p className="mt-1.5 text-xs leading-relaxed text-bone/55">
                                    {item.detail}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
