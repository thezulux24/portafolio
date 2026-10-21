"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { animate, stagger } from "animejs";
import { useIntroStore } from "@/lib/intro";

const EXIT_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

const BOOT_LOGS = [
    "SYS.ARCH // NAPLES, FL · CALI, CO",
    "BACKEND.CLUSTER // HIGH AVAILABILITY",
    "AI.ENGINE // CLAUDE 5.5 · GEMINI · SYNORA",
    "DATA.PIPELINES // 60+ SCRAPERS READY",
];

export function Preloader() {
    const started = useIntroStore((state) => state.started);
    const start = useIntroStore((state) => state.start);
    const [count, setCount] = useState(0);
    const [done, setDone] = useState(started);
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (started) {
            setDone(true);
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const target = { value: 0 };
        const counterAnim = animate(target, {
            value: 100,
            duration: 1650,
            ease: "out(3)",
            onUpdate: () => setCount(Math.round(target.value)),
            onComplete: () => {
                start();
                window.setTimeout(() => {
                    setDone(true);
                    document.body.style.overflow = previousOverflow;
                }, 260);
            },
        });

        const logsAnim = animate(".js-preloader-log", {
            opacity: [0, 1],
            translateX: [-14, 0],
            delay: stagger(240, { start: 80 }),
            duration: 520,
            ease: "out(3)",
        });

        const barsAnim = animate(".js-preloader-bar", {
            scaleY: [0.15, 1],
            delay: stagger(55),
            duration: 420,
            alternate: true,
            loop: true,
            ease: "inOut(2)",
        });

        return () => {
            counterAnim.cancel();
            logsAnim.cancel();
            barsAnim.cancel();
            document.body.style.overflow = previousOverflow;
        };
    }, [start, started]);

    return (
        <AnimatePresence>
            {!done && (
                <motion.div
                    ref={rootRef}
                    className="fixed inset-0 z-[400] flex flex-col justify-between overflow-hidden bg-ink px-6 py-8 md:px-10"
                    exit={{ clipPath: "inset(0 0 100% 0)" }}
                    transition={{ duration: 0.8, ease: EXIT_EASE }}
                    style={{ clipPath: "inset(0 0 0% 0)" }}
                >
                    {/* Subtle architectural HUD grid */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-[0.05]"
                        style={{
                            backgroundImage:
                                "linear-gradient(to right, #ece9e1 1px, transparent 1px), linear-gradient(to bottom, #ece9e1 1px, transparent 1px)",
                            backgroundSize: "72px 72px",
                        }}
                    />

                    {/* Top bar */}
                    <motion.div
                        className="relative z-10 flex items-start justify-between font-mono text-[11px] uppercase tracking-[0.28em] text-bone/60"
                        exit={{ opacity: 0, y: -24 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                        <span className="flex items-center gap-2.5">
                            <span className="inline-block h-2 w-2 rounded-full bg-acid" />
                            Brayan Zuluaga
                        </span>
                        <span className="hidden sm:block">Systems & AI Architecture — 2026</span>
                        <span className="text-acid">US · LATAM</span>
                    </motion.div>

                    {/* Center telemetry logs */}
                    <motion.div
                        className="relative z-10 my-auto flex flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-bone/45 md:text-[11px]"
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        {BOOT_LOGS.map((line, idx) => (
                            <div
                                key={line}
                                className="js-preloader-log flex items-center gap-3 opacity-0"
                            >
                                <span className="text-acid">0{idx + 1}</span>
                                <span className="h-px w-4 bg-bone/20" />
                                <span>{line}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Bottom counter + equalizer */}
                    <motion.div
                        className="relative z-10 flex items-end justify-between gap-6"
                        exit={{ opacity: 0, y: 40 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                        <div className="mb-3 hidden flex-col gap-3 md:flex">
                            <div className="flex h-6 items-end gap-1">
                                {Array.from({ length: 12 }).map((_, i) => (
                                    <span
                                        key={i}
                                        className="js-preloader-bar inline-block h-full w-1 origin-bottom bg-acid/80"
                                    />
                                ))}
                            </div>
                            <div className="max-w-[280px] font-mono text-[10px] uppercase leading-relaxed tracking-[0.22em] text-bone/45">
                                Backend Architect · AI Agents · Data Intelligence
                            </div>
                        </div>

                        <div className="flex items-baseline font-display text-[25vw] font-extrabold leading-none tracking-tighter text-bone md:text-[17vw]">
                            <span className="tabular-nums">{count}</span>
                            <span className="text-acid">%</span>
                        </div>
                    </motion.div>

                    {/* Progress bar */}
                    <div className="absolute bottom-0 left-0 h-[3px] w-full bg-bone/10">
                        <div
                            className="h-full bg-acid shadow-[0_0_16px_#c8f31d] transition-[width] duration-75 ease-linear"
                            style={{ width: `${count}%` }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
