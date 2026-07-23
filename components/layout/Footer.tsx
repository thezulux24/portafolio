"use client";

import { ArrowUpRight, Asterisk, Bot, Github, Mail } from "lucide-react";
import { useLanguageStore } from "@/lib/store";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Magnetic } from "@/components/ui/Magnetic";
import { Marquee } from "@/components/ui/Marquee";

export function Footer() {
    const { t } = useLanguageStore();
    const year = new Date().getFullYear();

    return (
        <footer id="contact" className="relative overflow-hidden bg-ink pt-28 md:pt-40">
            <div className="px-6 md:px-10">
                <SectionHeading index={t.contact.index} label={t.contact.label} />

                {/* Giant CTA */}
                <div className="mt-16 flex flex-col items-start gap-10">
                    <Magnetic strength={0.12} className="block">
                        <a
                            href="mailto:thezulux24@gmail.com"
                            data-cursor-label={t.contact.cta}
                            className="group block"
                        >
                            <h2 className="font-display font-extrabold uppercase leading-[0.88] tracking-tight">
                                <span className="block text-[clamp(3rem,12vw,11rem)]">
                                    {t.contact.line1}
                                </span>
                                <span className="outline-hover-acid block text-[clamp(3rem,12vw,11rem)] text-outline">
                                    {t.contact.line2}
                                </span>
                            </h2>
                        </a>
                    </Magnetic>

                    <div className="flex flex-wrap items-center gap-5">
                        <Magnetic strength={0.25}>
                            <a
                                href="mailto:thezulux24@gmail.com"
                                className="group inline-flex items-center gap-3 rounded-full bg-acid px-8 py-4 font-mono text-xs font-medium uppercase tracking-[0.22em] text-ink transition-transform duration-300"
                            >
                                <Mail className="h-4 w-4" />
                                thezulux24@gmail.com
                                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </a>
                        </Magnetic>
                        <Magnetic strength={0.25}>
                            <a
                                href="https://github.com/thezulux24"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 rounded-full border border-bone/20 px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-bone/80 transition-colors duration-300 hover:border-acid hover:text-acid"
                            >
                                <Github className="h-4 w-4" />
                                GitHub
                            </a>
                        </Magnetic>
                        <Magnetic strength={0.25}>
                            <a
                                href="https://apify.com/knowten"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 rounded-full border border-bone/20 px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-bone/80 transition-colors duration-300 hover:border-acid hover:text-acid"
                            >
                                <Bot className="h-4 w-4" />
                                Apify Store
                            </a>
                        </Magnetic>
                    </div>
                </div>
            </div>

            {/* Acid ribbon */}
            <div className="mt-24 -rotate-1 bg-acid py-3 md:mt-32">
                <Marquee duration={22} className="[mask-image:none] [-webkit-mask-image:none]">
                    {t.contact.marqueeItems.map((phrase) => (
                        <span
                            key={phrase}
                            className="mx-6 flex items-center gap-12 font-display text-sm font-bold uppercase tracking-[0.14em] text-ink"
                        >
                            {phrase}
                            <Asterisk className="h-4 w-4" />
                        </span>
                    ))}
                </Marquee>
            </div>

            {/* Credits */}
            <div className="flex flex-col items-center justify-between gap-3 border-t border-bone/10 px-6 py-7 font-mono text-[10px] uppercase tracking-[0.24em] text-bone/40 md:flex-row md:px-10">
                <span>© {year} Brayan Zuluaga</span>
                <span className="text-bone/25">{t.contact.rights}</span>
                <span>{t.contact.location}</span>
            </div>
        </footer>
    );
}
