"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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

const REVEAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Manifesto() {
    const { t } = useLanguageStore();
    const words = t.manifesto.statement.split(" ");

    return (
        <section id="about" className="relative bg-ink px-6 py-28 md:px-10 md:py-40">
            <SectionHeading index={t.manifesto.index} label={t.manifesto.label} />

            <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-10">
                {/* Portrait */}
                <div className="lg:col-span-5">
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.8, ease: REVEAL_EASE }}
                        data-cursor
                        className="group relative aspect-square overflow-hidden rounded-2xl border border-bone/10 transition-colors duration-500 hover:border-acid/50"
                    >
                        <Image
                            src="/images/fotoperfil.jpg"
                            alt="Brayan Zuluaga"
                            fill
                            priority
                            quality={100}
                            sizes="(max-width: 1024px) 100vw, 40vw"
                            className="object-cover"
                        />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/90 to-transparent px-5 pb-4 pt-16 font-mono text-[10px] uppercase tracking-[0.26em] text-bone/70">
                            <span>Brayan Zuluaga</span>
                            <span className="text-acid">EST. 2026</span>
                        </div>
                    </motion.div>
                </div>

                {/* Statement + meta */}
                <div className="flex flex-col gap-12 lg:col-span-7 lg:pl-6">
                    <motion.p
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-18%" }}
                        variants={{
                            hidden: {},
                            visible: {
                                transition: { staggerChildren: 0.038, delayChildren: 0.12 },
                            },
                        }}
                        className="font-display text-3xl font-bold leading-[1.12] tracking-tight md:text-5xl"
                    >
                        {words.map((word, index) => (
                            <motion.span
                                key={`${word}-${index}`}
                                variants={{
                                    hidden: { opacity: 0.08, y: 14 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: { duration: 0.55, ease: REVEAL_EASE },
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
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6, ease: REVEAL_EASE }}
                        className="max-w-xl text-base leading-relaxed text-bone/60 md:text-lg"
                    >
                        {t.manifesto.body}
                    </motion.p>

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
