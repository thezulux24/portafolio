"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { animate, stagger } from "animejs";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Download, FileText, Globe, Linkedin, Mail, Phone } from "lucide-react";
import { CvLoadingScene } from "@/components/3d/CvLoadingScene";
import { useLanguageStore } from "@/lib/store";

export default function CvPage() {
    const { t } = useLanguageStore();
    const content = t.cvLoading;

    useEffect(() => {
        const anim = animate(".js-cv-card", {
            opacity: [0, 1],
            translateY: [24, 0],
            delay: stagger(75, { start: 120 }),
            duration: 620,
            ease: "out(3)",
        });
        return () => {
            anim.cancel();
        };
    }, []);

    return (
        <section className="relative min-h-screen overflow-hidden bg-ink px-6 pb-24 pt-28 md:px-10">
            <CvLoadingScene />

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,243,29,0.08),transparent_58%)]" />

            <div className="relative z-10 mx-auto max-w-6xl">
                {/* Top navigation & action bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-bone/10 pb-8">
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2.5 rounded-full border border-bone/20 bg-ink/70 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-bone/85 backdrop-blur-md transition-colors hover:border-acid hover:text-acid"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        {content.back}
                    </Link>

                    <div className="flex flex-wrap items-center gap-3">
                        <a
                            href="/Brayan_Zuluaga_CV.pdf"
                            download="Brayan_Zuluaga_CV.pdf"
                            className="inline-flex items-center gap-2.5 rounded-full bg-acid px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-transform duration-300 hover:scale-[1.03]"
                        >
                            <Download className="h-4 w-4" />
                            <span>{content.downloadPdf}</span>
                        </a>
                        <a
                            href="/Brayan_Zuluaga_CV.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-bone/20 bg-ink/70 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-bone/85 backdrop-blur-md transition-colors hover:border-acid hover:text-acid"
                        >
                            <FileText className="h-4 w-4 text-acid" />
                            <span>{content.openNewTab}</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                    </div>
                </div>

                {/* Executive Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55 }}
                    className="mt-10 rounded-2xl border border-bone/15 bg-secondary/60 p-7 backdrop-blur-md md:p-10"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-acid/30 bg-acid/10 px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-acid">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>{content.status}</span>
                    </div>

                    <h1 className="mt-4 font-display text-3xl font-extrabold uppercase tracking-tight text-bone md:text-5xl">
                        Brayan David Zuluaga Meléndez
                    </h1>
                    <p className="mt-2 font-mono text-xs uppercase tracking-[0.24em] text-acid">
                        {t.hero.role} · US & LATAM
                    </p>
                    <p className="mt-4 max-w-3xl text-sm leading-relaxed text-bone/70 md:text-base">
                        {t.manifesto.body}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-5 border-t border-bone/10 pt-5 font-mono text-xs text-bone/65">
                        <a href="mailto:thezulux24@gmail.com" className="inline-flex items-center gap-2 hover:text-acid">
                            <Mail className="h-3.5 w-3.5 text-acid" />
                            thezulux24@gmail.com
                        </a>
                        <span className="inline-flex items-center gap-2">
                            <Phone className="h-3.5 w-3.5 text-acid" />
                            +57 323 760 7583
                        </span>
                        <a
                            href="https://www.linkedin.com/in/brayanzz24"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 hover:text-acid"
                        >
                            <Linkedin className="h-3.5 w-3.5 text-acid" />
                            linkedin.com/in/brayanzz24
                        </a>
                        <span className="inline-flex items-center gap-2">
                            <Globe className="h-3.5 w-3.5 text-acid" />
                            Cali, CO · Naples, FL (Remote)
                        </span>
                    </div>
                </motion.div>

                {/* Two-column layout: Live Interactive Roles + Official PDF Viewer */}
                <div className="mt-10 grid gap-8 lg:grid-cols-12">
                    {/* Left: Updated Experience Summary (including Axel Growth Partners & Knowten Suite) */}
                    <div className="space-y-4 lg:col-span-7">
                        <h2 className="font-mono text-xs uppercase tracking-[0.28em] text-acid">
                            {t.experience.label} — {t.experience.title}
                        </h2>

                        {t.experience.roles.map((role) => (
                            <div
                                key={role.company}
                                className="js-cv-card rounded-2xl border border-bone/10 bg-secondary/50 p-6 opacity-0 backdrop-blur-md transition-colors hover:border-acid/40"
                            >
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-acid">
                                        {role.period} · {role.location}
                                    </span>
                                    {role.badge && (
                                        <span className="rounded-sm border border-acid/30 bg-acid/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-acid">
                                            {role.badge}
                                        </span>
                                    )}
                                </div>
                                <h3 className="mt-2 font-display text-xl font-bold text-bone">
                                    {role.company}
                                </h3>
                                <p className="font-mono text-xs text-bone/70">{role.role}</p>
                                <p className="mt-3 text-xs leading-relaxed text-bone/65">
                                    {role.description}
                                </p>
                                {role.highlights && role.highlights.length > 0 && (
                                    <ul className="mt-3 space-y-1.5 border-l border-acid/30 pl-3">
                                        {role.highlights.map((h) => (
                                            <li key={h.title} className="text-xs leading-relaxed text-bone/65">
                                                <strong className="font-mono text-[10px] uppercase tracking-[0.14em] text-acid">
                                                    {h.title}:
                                                </strong>{" "}
                                                {h.text}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <div className="mt-4 flex flex-wrap gap-1.5">
                                    {role.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="rounded-full border border-bone/15 bg-ink/60 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-bone/60"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right: Embedded PDF Preview + Education & Skills */}
                    <div className="space-y-6 lg:col-span-5">
                        <div className="js-cv-card overflow-hidden rounded-2xl border border-bone/15 bg-secondary/60 opacity-0 backdrop-blur-md">
                            <div className="flex items-center justify-between border-b border-bone/10 px-5 py-3.5">
                                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-acid">
                                    {content.previewLabel}
                                </span>
                                <a
                                    href="/Brayan_Zuluaga_CV.pdf"
                                    download="Brayan_Zuluaga_CV.pdf"
                                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/70 hover:text-acid"
                                >
                                    PDF ↗
                                </a>
                            </div>
                            <iframe
                                src="/Brayan_Zuluaga_CV.pdf#view=FitH"
                                title="Brayan Zuluaga Official CV PDF"
                                className="h-[540px] w-full bg-ink"
                            />
                        </div>

                        <div className="js-cv-card rounded-2xl border border-bone/10 bg-secondary/50 p-6 opacity-0 backdrop-blur-md">
                            <h3 className="font-mono text-[11px] uppercase tracking-[0.28em] text-acid">
                                {t.experience.educationLabel}
                            </h3>
                            <div className="mt-4 space-y-4">
                                {t.experience.education.map((edu) => (
                                    <div key={edu.degree}>
                                        <p className="font-display text-sm font-bold text-bone">{edu.degree}</p>
                                        <p className="text-xs text-bone/60">{edu.school}</p>
                                        <p className="font-mono text-[10px] text-bone/40">{edu.period}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
