"use client";

import { motion } from "framer-motion";
import { useLanguageStore } from "@/lib/store";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ROW_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Experience() {
    const { t } = useLanguageStore();
    const content = t.experience;

    return (
        <section id="experience" className="relative bg-ink px-6 py-28 md:px-10 md:py-40">
            <SectionHeading index={content.index} label={content.label} />

            <div className="mt-14 mb-16 flex flex-wrap items-end justify-between gap-6">
                <h2 className="font-display text-[clamp(2.6rem,8vw,7rem)] font-extrabold uppercase leading-[0.9] tracking-tight">
                    <span className="text-outline">{content.title}</span>
                    <span className="text-acid">.</span>
                </h2>
                <p className="pb-3 font-mono text-xs uppercase tracking-[0.3em] text-bone/40">
                    2025 — 2026
                </p>
            </div>

            {/* Roles timeline */}
            <div className="border-b border-bone/10">
                {content.roles.map((role, index) => (
                    <motion.article
                        key={role.company}
                        initial={{ opacity: 0, y: 36 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-70px" }}
                        transition={{ delay: index * 0.05, duration: 0.65, ease: ROW_EASE }}
                        className="group relative border-t border-bone/10"
                        data-cursor
                    >
                        {/* Acid side indicator */}
                        <span className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-acid transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100" />

                        <div className="grid gap-4 py-8 pl-5 transition-colors duration-300 group-hover:bg-bone/[0.03] md:grid-cols-12 md:gap-6 md:py-10 md:pl-8">
                            {/* Period */}
                            <div className="md:col-span-3">
                                <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-bone/50">
                                    {role.period}
                                </p>
                                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/35">
                                    {role.location}
                                </p>
                                {role.current && (
                                    <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-acid/40 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-acid">
                                        <span className="availability-dot inline-block h-1 w-1 rounded-full bg-acid" />
                                        {content.present}
                                    </p>
                                )}
                            </div>

                            {/* Company + role */}
                            <div className="md:col-span-4">
                                <h3 className="font-display text-2xl font-bold tracking-tight transition-colors duration-300 group-hover:text-acid md:text-3xl">
                                    {role.company}
                                </h3>
                                <p className="mt-2 text-sm leading-snug text-bone/60">
                                    {role.role}
                                </p>
                            </div>

                            {/* Description + tech */}
                            <div className="md:col-span-5">
                                <p className="max-w-xl text-sm leading-relaxed text-bone/60">
                                    {role.description}
                                </p>
                                <div className="mt-4 flex flex-wrap gap-1.5">
                                    {role.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="rounded-full border border-bone/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-bone/55 transition-colors duration-300 group-hover:border-bone/30"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>

            {/* Meta grid: education, languages, award, volunteering */}
            <div className="mt-16 grid gap-10 border-t border-bone/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, ease: ROW_EASE }}
                >
                    <h3 className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-acid">
                        {content.educationLabel}
                    </h3>
                    <div className="space-y-5">
                        {content.education.map((entry) => (
                            <div key={entry.degree}>
                                <p className="font-display text-sm font-bold leading-snug">
                                    {entry.degree}
                                </p>
                                <p className="mt-1 text-xs leading-relaxed text-bone/50">
                                    {entry.school}
                                </p>
                                <p className="mt-0.5 font-mono text-[10px] tracking-[0.18em] text-bone/35">
                                    {entry.period}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08, duration: 0.55, ease: ROW_EASE }}
                >
                    <h3 className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-acid">
                        {content.languagesLabel}
                    </h3>
                    <ul className="space-y-2.5">
                        {content.languages.map((language) => (
                            <li key={language} className="flex items-baseline gap-3 text-sm text-bone/75">
                                <span className="h-1 w-1 shrink-0 rounded-full bg-acid" />
                                {language}
                            </li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.16, duration: 0.55, ease: ROW_EASE }}
                >
                    <h3 className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-acid">
                        {content.awardLabel}
                    </h3>
                    <p className="text-sm leading-relaxed text-bone/60">{content.award}</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.24, duration: 0.55, ease: ROW_EASE }}
                >
                    <h3 className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-acid">
                        {content.volunteeringLabel}
                    </h3>
                    <p className="text-sm leading-relaxed text-bone/60">{content.volunteering}</p>
                </motion.div>
            </div>
        </section>
    );
}
