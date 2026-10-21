"use client";

import { useState } from "react";
import Link from "next/link";
import { animate } from "animejs";
import { ArrowUpRight, Asterisk, Bot, Check, Copy, FileText, Github, Linkedin, Mail } from "lucide-react";
import { useLanguageStore } from "@/lib/store";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Magnetic } from "@/components/ui/Magnetic";
import { Marquee } from "@/components/ui/Marquee";
import { IdeaBulb } from "@/components/3d/IdeaBulb";

const EMAIL = "thezulux24@gmail.com";

export function Footer() {
    const { t } = useLanguageStore();
    const [copied, setCopied] = useState(false);
    const year = new Date().getFullYear();

    const handleCopyEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            animate(e.currentTarget, {
                scale: [1, 1.07, 1],
                duration: 420,
                ease: "outElastic(1, 0.5)",
            });
            window.setTimeout(() => setCopied(false), 2400);
        } catch {
            window.location.href = `mailto:${EMAIL}`;
        }
    };

    return (
        <footer id="contact" className="relative overflow-hidden bg-ink pt-20 pb-20 md:pt-32 md:pb-0">
            <div className="px-5 md:px-10">
                <SectionHeading index={t.contact.index} label={t.contact.label} />

                {/* Giant CTA */}
                <div className="relative mt-12 flex flex-col items-start gap-8 md:mt-16">
                    <IdeaBulb className="pointer-events-none absolute -right-6 top-1/2 z-0 h-64 w-64 -translate-y-1/2 opacity-25 md:right-10 md:h-[22rem] md:w-[22rem] md:opacity-80" />

                    <Magnetic strength={0.1} className="relative z-10 block">
                        <a
                            href={`mailto:${EMAIL}`}
                            data-cursor-label={t.contact.cta}
                            className="group block"
                        >
                            <h2 className="font-display font-extrabold uppercase leading-[0.88] tracking-tight">
                                <span className="block text-[clamp(2.7rem,11vw,10rem)]">
                                    {t.contact.line1}
                                </span>
                                <span className="outline-hover-acid block text-[clamp(2.7rem,11vw,10rem)] text-outline">
                                    {t.contact.line2}
                                </span>
                            </h2>
                        </a>
                    </Magnetic>

                    {/* Primary email + copy row */}
                    <div className="relative z-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
                        <Magnetic strength={0.2}>
                            <a
                                href={`mailto:${EMAIL}`}
                                className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-acid px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-transform duration-300 sm:w-auto"
                            >
                                <Mail className="h-4 w-4" />
                                {EMAIL}
                                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </a>
                        </Magnetic>

                        <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:items-center">
                            <button
                                type="button"
                                onClick={handleCopyEmail}
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-acid/35 bg-acid/10 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-acid transition-colors duration-300 hover:bg-acid hover:text-ink sm:px-5"
                            >
                                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                                <span>{copied ? t.contact.copied : t.contact.copyEmail}</span>
                            </button>

                            <Link
                                href="/cv"
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-bone/20 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/85 transition-colors duration-300 hover:border-acid hover:text-acid sm:px-5"
                            >
                                <FileText className="h-3.5 w-3.5 text-acid" />
                                {t.contact.cv}
                            </Link>

                            <a
                                href="https://www.linkedin.com/in/brayanzz24"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-bone/20 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/85 transition-colors duration-300 hover:border-acid hover:text-acid sm:px-5"
                            >
                                <Linkedin className="h-3.5 w-3.5" />
                                {t.contact.linkedin}
                            </a>

                            <a
                                href="https://github.com/thezulux24"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-bone/20 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/85 transition-colors duration-300 hover:border-acid hover:text-acid sm:px-5"
                            >
                                <Github className="h-3.5 w-3.5" />
                                {t.contact.github}
                            </a>

                            <a
                                href="https://apify.com/knowten"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="col-span-2 inline-flex items-center justify-center gap-2 rounded-full border border-bone/20 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/85 transition-colors duration-300 hover:border-acid hover:text-acid sm:col-span-1 sm:px-5"
                            >
                                <Bot className="h-3.5 w-3.5" />
                                {t.contact.apify}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Acid ribbon */}
            <div className="mt-16 -rotate-1 bg-acid py-2.5 md:mt-24 md:py-3">
                <Marquee duration={22} className="[mask-image:none] [-webkit-mask-image:none]">
                    {t.contact.marqueeItems.map((phrase) => (
                        <span
                            key={phrase}
                            className="mx-5 flex items-center gap-10 font-display text-xs font-bold uppercase tracking-[0.14em] text-ink md:text-sm"
                        >
                            {phrase}
                            <Asterisk className="h-3.5 w-3.5" />
                        </span>
                    ))}
                </Marquee>
            </div>

            {/* Credits */}
            <div className="flex flex-col items-center justify-between gap-2 border-t border-bone/10 px-5 py-6 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/45 md:flex-row md:px-10">
                <span>© {year} Brayan Zuluaga</span>
                <span className="text-bone/30">+57 323 760 7583 · bzuluaga.site</span>
                <span>{t.contact.location}</span>
            </div>
        </footer>
    );
}
