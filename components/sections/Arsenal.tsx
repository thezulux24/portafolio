"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
    siAngular,
    siCplusplus,
    siDocker,
    siFastapi,
    siGit,
    siGithub,
    siJavascript,
    siNestjs,
    siNextdotjs,
    siNodedotjs,
    siPandas,
    siScrapy,
    siSelenium,
    siFlutter,
    siFirebase,
    siPostgresql,
    siPrisma,
    siPython,
    siReact,
    siTailwindcss,
    siTypescript,
} from "simple-icons";
import { useLanguageStore } from "@/lib/store";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Marquee } from "@/components/ui/Marquee";

interface TechItem {
    name: string;
    path: string;
    color: string;
}

const TECH_ITEMS: TechItem[] = [
    { name: "TypeScript", path: siTypescript.path, color: `#${siTypescript.hex}` },
    { name: "JavaScript", path: siJavascript.path, color: `#${siJavascript.hex}` },
    { name: "Python", path: siPython.path, color: `#${siPython.hex}` },
    { name: "C++", path: siCplusplus.path, color: `#${siCplusplus.hex}` },
    { name: "NestJS", path: siNestjs.path, color: `#${siNestjs.hex}` },
    { name: "Node.js", path: siNodedotjs.path, color: `#${siNodedotjs.hex}` },
    { name: "FastAPI", path: siFastapi.path, color: `#${siFastapi.hex}` },
    { name: "PostgreSQL", path: siPostgresql.path, color: `#${siPostgresql.hex}` },
    { name: "Prisma", path: siPrisma.path, color: `#${siPrisma.hex}` },
    { name: "React", path: siReact.path, color: `#${siReact.hex}` },
    { name: "Next.js", path: siNextdotjs.path, color: `#${siNextdotjs.hex}` },
    { name: "Angular", path: siAngular.path, color: `#${siAngular.hex}` },
    { name: "Tailwind CSS", path: siTailwindcss.path, color: `#${siTailwindcss.hex}` },
    { name: "Git", path: siGit.path, color: `#${siGit.hex}` },
    { name: "GitHub", path: siGithub.path, color: `#${siGithub.hex}` },
    { name: "Docker", path: siDocker.path, color: `#${siDocker.hex}` },
    { name: "Pandas", path: siPandas.path, color: `#${siPandas.hex}` },
    { name: "Scrapy", path: siScrapy.path, color: `#${siScrapy.hex}` },
    { name: "Selenium", path: siSelenium.path, color: `#${siSelenium.hex}` },
    { name: "Flutter", path: siFlutter.path, color: `#${siFlutter.hex}` },
    { name: "Firebase", path: siFirebase.path, color: `#${siFirebase.hex}` },
];

function TechChip({ item }: { item: TechItem }) {
    return (
        <div
            className="group mx-2.5 flex items-center gap-3 rounded-full border border-bone/15 px-5 py-3 transition-colors duration-300 hover:border-bone/40"
            style={{ "--chip": item.color } as CSSProperties}
            data-cursor
        >
            <svg
                viewBox="0 0 24 24"
                aria-hidden
                className="h-4 w-4 text-bone/45 transition-colors duration-300 group-hover:text-[var(--chip)]"
            >
                <path fill="currentColor" d={item.path} />
            </svg>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone/70">
                {item.name}
            </span>
        </div>
    );
}

export function Arsenal() {
    const { t } = useLanguageStore();
    const firstRow = TECH_ITEMS.slice(0, 11);
    const secondRow = TECH_ITEMS.slice(11);
    const titleWords = t.arsenal.title.split(" ");

    return (
        <section id="stack" className="relative overflow-x-clip bg-ink py-28 md:py-40">
            <div className="px-6 md:px-10">
                <SectionHeading index={t.arsenal.index} label={t.arsenal.label} />

                <div className="mt-14 flex flex-wrap items-end justify-between gap-6">
                    <h2 className="font-display text-[clamp(2.6rem,8vw,7rem)] font-extrabold uppercase leading-[0.9] tracking-tight">
                        {titleWords.map((word, index) => (
                            <span key={word} className={index % 2 === 1 ? "text-outline" : undefined}>
                                {word}{index < titleWords.length - 1 ? " " : ""}
                            </span>
                        ))}
                        <span className="text-acid">.</span>
                    </h2>
                    <p className="max-w-xs pb-3 text-sm leading-relaxed text-bone/50">
                        {t.arsenal.subtitle}
                    </p>
                </div>
            </div>

            {/* Counter-scrolling icon ribbons */}
            <div className="mt-16 space-y-4">
                <Marquee duration={36}>
                    {firstRow.map((item) => (
                        <TechChip key={item.name} item={item} />
                    ))}
                </Marquee>
                <Marquee duration={44} reverse>
                    {secondRow.map((item) => (
                        <TechChip key={item.name} item={item} />
                    ))}
                </Marquee>
            </div>

            {/* Capability rows — acid fill on hover */}
            <div className="mt-20 px-6 md:px-10">
                <div className="border-b border-bone/10">
                    {t.arsenal.capabilities.map((capability, index) => (
                        <motion.div
                            key={capability.id}
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ delay: index * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="group relative overflow-hidden border-t border-bone/10"
                            data-cursor
                        >
                            <div className="absolute inset-0 translate-y-full bg-acid transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0 group-active:translate-y-0" />
                            <div className="relative z-10 grid items-center gap-3 py-7 transition-colors duration-300 group-hover:text-ink group-active:text-ink md:grid-cols-12 md:py-9">
                                <span className="font-mono text-xs text-bone/40 transition-colors duration-300 group-hover:text-ink/60 group-active:text-ink/60 md:col-span-1">
                                    0{index + 1}
                                </span>
                                <h3 className="font-display text-3xl font-bold uppercase tracking-tight md:col-span-4 md:text-4xl">
                                    {capability.title}
                                </h3>
                                <div className="flex flex-wrap gap-x-5 gap-y-1.5 md:col-span-6">
                                    {capability.items.map((item) => (
                                        <span
                                            key={item}
                                            className="font-mono text-xs uppercase tracking-[0.18em] text-bone/55 transition-colors duration-300 group-hover:text-ink/75 group-active:text-ink/75"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                                <ArrowUpRight className="hidden h-6 w-6 justify-self-end text-bone/30 transition-all duration-300 group-hover:rotate-45 group-hover:text-ink group-active:rotate-45 group-active:text-ink md:col-span-1 md:block" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
