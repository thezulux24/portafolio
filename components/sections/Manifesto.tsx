"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useLanguageStore } from "@/lib/store";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const HIGHLIGHTS = new Set([
    "datos",
    "automatización:",
    "señal",
    "resultados",
    "data",
    "automation:",
    "signal",
    "results",
]);

function RevealWord({
    progress,
    range,
    highlighted,
    children,
}: {
    progress: MotionValue<number>;
    range: [number, number];
    highlighted: boolean;
    children: string;
}) {
    const opacity = useTransform(progress, range, [0.08, 1]);
    const y = useTransform(progress, range, [12, 0]);
    const filter = useTransform(progress, range, ["blur(5px)", "blur(0px)"]);
    return (
        <motion.span
            style={{ opacity, y, filter }}
            className={cn("inline-block will-change-transform", highlighted && "text-acid")}
        >
            {children}&nbsp;
        </motion.span>
    );
}

export function Manifesto() {
    const { t } = useLanguageStore();
    const statementRef = useRef<HTMLParagraphElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress: statementProgress } = useScroll({
        target: statementRef,
        offset: ["start 0.85", "start 0.35"],
    });

    const { scrollYProgress: imageProgress } = useScroll({
        target: imageRef,
        offset: ["start end", "end start"],
    });

    const imageY = useTransform(imageProgress, [0, 1], ["-9%", "9%"]);

    const words = t.manifesto.statement.split(" ");

    return (
        <section id="about" className="relative bg-ink px-6 py-28 md:px-10 md:py-40">
            <SectionHeading index={t.manifesto.index} label={t.manifesto.label} />

            <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-10">
                {/* Portrait with parallax */}
                <div className="lg:col-span-5">
                    <div
                        ref={imageRef}
                        data-cursor
                        className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-bone/10"
                    >
                        <motion.div
                            className="absolute inset-x-0 -inset-y-[10%] will-change-transform"
                            style={{ y: imageY }}
                        >
                            <Image
                                src="/images/fotoperfil.jpg"
                                alt="Brayan Zuluaga"
                                fill
                                sizes="(max-width: 1024px) 100vw, 40vw"
                                className="object-cover grayscale transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                            />
                        </motion.div>
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/90 to-transparent px-5 pb-4 pt-16 font-mono text-[10px] uppercase tracking-[0.26em] text-bone/70">
                            <span>Brayan Zuluaga</span>
                            <span className="text-acid">EST. 2024</span>
                        </div>
                    </div>
                </div>

                {/* Statement + meta */}
                <div className="flex flex-col gap-12 lg:col-span-7 lg:pl-6">
                    <p
                        ref={statementRef}
                        className="font-display text-3xl font-bold leading-[1.12] tracking-tight md:text-5xl"
                    >
                        {words.map((word, index) => {
                            // Overlapping ranges => smooth cascading fill instead of word-by-word steps
                            const start = (index / words.length) * 0.8;
                            const end = Math.min(1, start + 2.5 / words.length);
                            return (
                                <RevealWord
                                    key={`${word}-${index}`}
                                    progress={statementProgress}
                                    range={[start, end]}
                                    highlighted={HIGHLIGHTS.has(word.toLowerCase())}
                                >
                                    {word}
                                </RevealWord>
                            );
                        })}
                    </p>

                    <p className="max-w-xl text-base leading-relaxed text-bone/60 md:text-lg">
                        {t.manifesto.body}
                    </p>

                    <div className="grid gap-10 border-t border-bone/10 pt-10 md:grid-cols-2">
                        <div>
                            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-acid">
                                {t.manifesto.educationLabel}
                            </h3>
                            <p className="font-display text-lg font-bold leading-snug">
                                {t.manifesto.university}
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-bone/60">
                                {t.manifesto.degree}
                            </p>
                        </div>
                        <div>
                            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-acid">
                                {t.manifesto.strengthsLabel}
                            </h3>
                            <ul className="space-y-2.5">
                                {t.manifesto.strengths.map((strength, index) => (
                                    <li key={strength} className="flex items-baseline gap-3 text-sm text-bone/75">
                                        <span className="font-mono text-[10px] text-bone/35">
                                            0{index + 1}
                                        </span>
                                        {strength}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="grid gap-6 border-t border-bone/10 pt-10 sm:grid-cols-3">
                        {t.manifesto.focus.map((item, index) => (
                            <div key={item.title} className="group">
                                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/35 transition-colors group-hover:text-acid">
                                    0{index + 1}
                                </span>
                                <h4 className="mt-2 font-display text-base font-bold">
                                    {item.title}
                                </h4>
                                <p className="mt-1.5 text-xs leading-relaxed text-bone/50">
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
