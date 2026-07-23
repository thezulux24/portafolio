"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { animate } from "animejs";
import { useIntroStore } from "@/lib/intro";

const EXIT_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export function Preloader() {
    const start = useIntroStore((state) => state.start);
    const [count, setCount] = useState(0);
    const [done, setDone] = useState(false);
    const counterRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const target = { value: 0 };
        const animation = animate(target, {
            value: 100,
            duration: 1900,
            ease: "out(3)",
            onUpdate: () => setCount(Math.round(target.value)),
            onComplete: () => {
                start();
                window.setTimeout(() => {
                    setDone(true);
                    document.body.style.overflow = previousOverflow;
                }, 350);
            },
        });

        return () => {
            animation.cancel();
            document.body.style.overflow = previousOverflow;
        };
    }, [start]);

    return (
        <AnimatePresence>
            {!done && (
                <motion.div
                    className="fixed inset-0 z-[400] flex flex-col justify-between bg-ink px-6 py-8 md:px-10"
                    exit={{ clipPath: "inset(0 0 100% 0)" }}
                    transition={{ duration: 0.9, ease: EXIT_EASE }}
                    style={{ clipPath: "inset(0 0 0% 0)" }}
                >
                    <motion.div
                        className="flex items-start justify-between font-mono text-[11px] uppercase tracking-[0.28em] text-bone/60"
                        exit={{ opacity: 0, y: -24 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <span>Brayan Zuluaga</span>
                        <span className="hidden sm:block">Portfolio — 2026</span>
                        <span className="text-acid">Cali, CO</span>
                    </motion.div>

                    <motion.div
                        className="flex items-end justify-between gap-6"
                        exit={{ opacity: 0, y: 40 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <div className="mb-3 hidden max-w-[240px] font-mono text-[11px] uppercase leading-relaxed tracking-[0.22em] text-bone/40 md:block">
                            Systems Engineer
                            <br />
                            Software Architect
                        </div>

                        <div className="flex items-baseline font-display text-[26vw] font-extrabold leading-none tracking-tighter text-bone md:text-[18vw]">
                            <span ref={counterRef} className="tabular-nums">
                                {count}
                            </span>
                            <span className="text-acid">%</span>
                        </div>
                    </motion.div>

                    <div className="absolute bottom-0 left-0 h-[3px] w-full bg-bone/10">
                        <div
                            className="h-full bg-acid transition-[width] duration-100 ease-linear"
                            style={{ width: `${count}%` }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
