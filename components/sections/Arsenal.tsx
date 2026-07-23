"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
    siAngular,
    siAnthropic,
    siCplusplus,
    siDocker,
    siFastapi,
    siFirebase,
    siFlutter,
    siGit,
    siGithub,
    siGooglegemini,
    siJavascript,
    siLinux,
    siNestjs,
    siNextdotjs,
    siNodedotjs,
    siOpenrouter,
    siPandas,
    siPostgresql,
    siPrisma,
    siPython,
    siReact,
    siRedis,
    siScikitlearn,
    siScrapy,
    siSelenium,
    siSupabase,
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

const OPENAI_PATH =
    "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.259 23.832a6.0522 6.0522 0 0 0 5.7617-4.1332 5.9895 5.9895 0 0 0 3.9977-2.9001 6.0473 6.0473 0 0 0-.7365-6.9776zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.5045 4.5045 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.47 4.47 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615l-4.835 2.7866a4.4998 4.4998 0 0 1-6.1456-1.6417zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7913A4.495 4.495 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.602 8.3829l2.02-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.3973-.6859zm2.0107-3.0231l-.142-.0852-4.7735-2.7582a.7712.7712 0 0 0-.7806 0L9.0066 9.2533V6.9209a.0757.0757 0 0 1 .0332-.0615l4.8303-2.7866a4.5045 4.5045 0 0 1 6.6802 4.6563zM8.3061 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.052V6.0646a4.4998 4.4998 0 0 1 7.3757-3.4537l-.1419.0804-4.7783 2.7582a.7948.7948 0 0 0-.3927.6813v6.7322zm1.0937-2.3655l3.1028-1.7906 3.1028 1.7906v3.5812l-3.1028 1.7906-3.1028-1.7906z";

const DEEPSEEK_PATH =
    "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2V7h2v10zM11 9H9V7h2v2z";

const TECH_ITEMS: TechItem[] = [
    // Row 1: AI, APIs & Data
    { name: "OpenAI", path: OPENAI_PATH, color: "#10A37F" },
    { name: "Gemini AI", path: siGooglegemini.path, color: `#${siGooglegemini.hex}` },
    { name: "Claude AI", path: siAnthropic.path, color: `#${siAnthropic.hex}` },
    { name: "DeepSeek", path: DEEPSEEK_PATH, color: "#4D6BFE" },
    { name: "OpenRouter", path: siOpenrouter.path, color: `#${siOpenrouter.hex}` },
    { name: "Python", path: siPython.path, color: `#${siPython.hex}` },
    { name: "Pandas", path: siPandas.path, color: `#${siPandas.hex}` },
    { name: "Scrapling", path: siScrapy.path, color: `#${siScrapy.hex}` },
    { name: "Selenium", path: siSelenium.path, color: `#${siSelenium.hex}` },
    { name: "Scikit-Learn", path: siScikitlearn.path, color: `#${siScikitlearn.hex}` },

    // Row 2: Languages & Backend
    { name: "TypeScript", path: siTypescript.path, color: `#${siTypescript.hex}` },
    { name: "JavaScript", path: siJavascript.path, color: `#${siJavascript.hex}` },
    { name: "NestJS", path: siNestjs.path, color: `#${siNestjs.hex}` },
    { name: "Node.js", path: siNodedotjs.path, color: `#${siNodedotjs.hex}` },
    { name: "FastAPI", path: siFastapi.path, color: `#${siFastapi.hex}` },
    { name: "PostgreSQL", path: siPostgresql.path, color: `#${siPostgresql.hex}` },
    { name: "Prisma", path: siPrisma.path, color: `#${siPrisma.hex}` },
    { name: "Redis", path: siRedis.path, color: `#${siRedis.hex}` },
    { name: "Supabase", path: siSupabase.path, color: `#${siSupabase.hex}` },
    { name: "Docker", path: siDocker.path, color: `#${siDocker.hex}` },

    // Row 3: Frontend, Mobile & Tools
    { name: "React", path: siReact.path, color: `#${siReact.hex}` },
    { name: "Next.js", path: siNextdotjs.path, color: "#E0E0E0" },
    { name: "Angular", path: siAngular.path, color: `#${siAngular.hex}` },
    { name: "Tailwind CSS", path: siTailwindcss.path, color: `#${siTailwindcss.hex}` },
    { name: "Flutter", path: siFlutter.path, color: `#${siFlutter.hex}` },
    { name: "Firebase", path: siFirebase.path, color: `#${siFirebase.hex}` },
    { name: "Git", path: siGit.path, color: `#${siGit.hex}` },
    { name: "GitHub", path: siGithub.path, color: "#E0E0E0" },
    { name: "Linux", path: siLinux.path, color: `#${siLinux.hex}` },
    { name: "C++", path: siCplusplus.path, color: `#${siCplusplus.hex}` },
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
    const firstRow = TECH_ITEMS.slice(0, 10);
    const secondRow = TECH_ITEMS.slice(10, 20);
    const thirdRow = TECH_ITEMS.slice(20);
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
                <Marquee duration={34}>
                    {firstRow.map((item) => (
                        <TechChip key={item.name} item={item} />
                    ))}
                </Marquee>
                <Marquee duration={42} reverse>
                    {secondRow.map((item) => (
                        <TechChip key={item.name} item={item} />
                    ))}
                </Marquee>
                <Marquee duration={38}>
                    {thirdRow.map((item) => (
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
