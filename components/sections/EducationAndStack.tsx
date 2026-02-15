"use client";

import { type ReactNode } from "react";
import { useLanguageStore } from "@/lib/store";
import { motion } from "framer-motion";
import { GraduationCap, Code2, Cpu, Database, Layers } from "lucide-react";
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
    siPostgresql,
    siPrisma,
    siPython,
    siReact,
    siTailwindcss,
    siTypescript,
} from "simple-icons";
import { TechMarquee3D, type TechItem } from "@/components/ui/TechMarquee3D";

const TECH_MARQUEE_ITEMS: TechItem[] = [
    { id: "typescript", name: "TypeScript", icon: siTypescript.path, brandColor: `#${siTypescript.hex}` },
    { id: "javascript", name: "JavaScript", icon: siJavascript.path, brandColor: `#${siJavascript.hex}` },
    { id: "python", name: "Python", icon: siPython.path, brandColor: `#${siPython.hex}` },
    { id: "cplusplus", name: "C++", icon: siCplusplus.path, brandColor: `#${siCplusplus.hex}` },
    { id: "nestjs", name: "NestJS", icon: siNestjs.path, brandColor: `#${siNestjs.hex}` },
    { id: "nodejs", name: "Node.js", icon: siNodedotjs.path, brandColor: `#${siNodedotjs.hex}` },
    { id: "fastapi", name: "FastAPI", icon: siFastapi.path, brandColor: `#${siFastapi.hex}` },
    { id: "postgresql", name: "PostgreSQL", icon: siPostgresql.path, brandColor: `#${siPostgresql.hex}` },
    { id: "prisma", name: "Prisma", icon: siPrisma.path, brandColor: `#${siPrisma.hex}` },
    { id: "react", name: "React", icon: siReact.path, brandColor: `#${siReact.hex}` },
    { id: "nextjs", name: "Next.js", icon: siNextdotjs.path, brandColor: `#${siNextdotjs.hex}` },
    { id: "angular", name: "Angular", icon: siAngular.path, brandColor: `#${siAngular.hex}` },
    { id: "tailwind", name: "Tailwind CSS", icon: siTailwindcss.path, brandColor: `#${siTailwindcss.hex}` },
    { id: "git", name: "Git", icon: siGit.path, brandColor: `#${siGit.hex}` },
    { id: "github", name: "GitHub", icon: siGithub.path, brandColor: `#${siGithub.hex}` },
    { id: "docker", name: "Docker", icon: siDocker.path, brandColor: `#${siDocker.hex}` },
];

export function EducationAndStack() {
    const { t } = useLanguageStore();

    const stackSections = [
        {
            id: "languages",
            icon: <Cpu className="h-5 w-5" />,
            title: t.skills.languages,
            items: ["TypeScript", "JavaScript", "Python", "C++"],
        },
        {
            id: "backend",
            icon: <Database className="h-5 w-5" />,
            title: "Backend",
            items: ["NestJS", "Node.js", "FastAPI", "PostgreSQL", "Prisma ORM"],
        },
        {
            id: "frontend",
            icon: <Code2 className="h-5 w-5" />,
            title: "Frontend",
            items: ["React", "Next.js", "Angular", "Tailwind CSS"],
        },
        {
            id: "tools",
            icon: <Layers className="h-5 w-5" />,
            title: t.skills.frameworks,
            items: ["Git", "GitHub", "Docker", "Algorithms (Competitive Programming)"],
        },
    ];

    return (
        <section id="experience" className="w-full overflow-x-clip bg-background py-24">
            <div className="container mx-auto w-full px-6">
                <div className="grid min-w-0 gap-12 lg:grid-cols-5">

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8 lg:col-span-2"
                    >
                        <div>
                            <h2 className="mb-6 flex items-center gap-3 font-heading text-3xl font-bold">
                                <GraduationCap className="text-primary" />
                                {t.about.education}
                            </h2>
                            <div className="relative space-y-8 border-l border-white/10 pl-6">
                                <div className="relative">
                                    <div className="absolute -left-[25px] top-1 h-3 w-3 rounded-full border-4 border-background bg-primary" />
                                    <h3 className="text-xl font-bold text-foreground">{t.about.university}</h3>
                                    <p className="mt-1 text-muted-foreground">{t.about.degree}</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                            <h3 className="mb-4 font-bold text-primary">{t.skills.strengths}</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>- {t.skills.bullet1}</li>
                                <li>- {t.skills.bullet2}</li>
                                <li>- {t.skills.bullet3}</li>
                                <li>- {t.skills.bullet4}</li>
                            </ul>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="min-w-0 space-y-8 lg:col-span-3"
                    >
                        <div className="space-y-2">
                            <h2 className="font-heading text-3xl font-bold">
                                {t.skills.title}
                            </h2>
                            <p className="text-xs uppercase tracking-[0.22em] text-white/60">{t.skills.marqueeTitle}</p>
                            <p className="text-sm text-muted-foreground">{t.skills.marqueeSubtitle}</p>
                        </div>

                        <div className="grid auto-rows-fr grid-cols-2 gap-3 md:hidden">
                            {stackSections.map((section) => (
                                <MobileStackCard
                                    key={section.id}
                                    icon={section.icon}
                                    title={section.title}
                                    items={section.items}
                                />
                            ))}
                        </div>

                        <TechMarquee3D items={TECH_MARQUEE_ITEMS} />

                        <div className="hidden gap-6 md:grid md:grid-cols-2">
                            {stackSections.map((section) => (
                                <StackCard
                                    key={section.id}
                                    icon={section.icon}
                                    title={section.title}
                                    items={section.items}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function StackCard({ icon, title, items }: { icon: ReactNode; title: string; items: string[] }) {
    return (
        <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-primary/50">
            <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary group-hover:text-black">
                    {icon}
                </div>
                <h3 className="font-bold">{title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                    <span key={item} className="rounded bg-white/5 px-2 py-1 text-xs text-muted-foreground">
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}

function MobileStackCard({ icon, title, items }: { icon: ReactNode; title: string; items: string[] }) {
    return (
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="mb-3 flex items-center gap-2">
                <div className="rounded-md bg-primary/10 p-1.5 text-primary">
                    {icon}
                </div>
                <h3 className="text-xs font-semibold tracking-wide text-white">{title}</h3>
            </div>
            <div className="space-y-1.5">
                {items.map((item) => (
                    <p key={item} className="rounded bg-white/5 px-2 py-1 text-[11px] leading-4 text-muted-foreground">
                        {item}
                    </p>
                ))}
            </div>
        </div>
    );
}
