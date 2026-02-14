"use client";

import { useLanguageStore } from "@/lib/store";
import { motion } from "framer-motion";
import { GraduationCap, Code2, Cpu, Database, Layers } from "lucide-react";

export function EducationAndStack() {
    const { t } = useLanguageStore();

    const skills = {
        languages: ["TypeScript", "JavaScript", "Python", "C++"],
        backend: ["NestJS", "Node.js", "FastAPI", "PostgreSQL", "Prisma ORM"],
        frontend: ["React", "Next.js", "Angular", "Tailwind CSS"],
        tools: ["Git", "GitHub", "Docker", "Algorithms (Competitive Programming)"]
    };

    return (
        <section id="experience" className="py-24 bg-background">
            <div className="container px-6 mx-auto">
                <div className="grid lg:grid-cols-5 gap-12">

                    {/* Education - Left Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 space-y-8"
                    >
                        <div>
                            <h2 className="text-3xl font-bold font-heading mb-6 flex items-center gap-3">
                                <GraduationCap className="text-primary" />
                                {t.about.education}
                            </h2>
                            <div className="relative pl-6 border-l border-white/10 space-y-8">
                                <div className="relative">
                                    <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-primary border-4 border-background" />
                                    <h3 className="text-xl font-bold text-foreground">{t.about.university}</h3>
                                    <p className="text-muted-foreground mt-1">{t.about.degree}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="font-bold mb-4 text-primary">{t.skills.strengths}</h3>
                            <ul className="space-y-2 text-muted-foreground text-sm">
                                <li>• {t.skills.bullet1}</li>
                                <li>• {t.skills.bullet2}</li>
                                <li>• {t.skills.bullet3}</li>
                                <li>• {t.skills.bullet4}</li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Tech Stack - Right Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-3 space-y-8"
                    >
                        <h2 className="text-3xl font-bold font-heading mb-6">
                            {t.skills.title}
                        </h2>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <StackCard
                                icon={<Cpu className="h-5 w-5" />}
                                title={t.skills.languages}
                                items={skills.languages}
                            />
                            <StackCard
                                icon={<Database className="h-5 w-5" />}
                                title="Backend"
                                items={skills.backend}
                            />
                            <StackCard
                                icon={<Code2 className="h-5 w-5" />}
                                title="Frontend"
                                items={skills.frontend}
                            />
                            <StackCard
                                icon={<Layers className="h-5 w-5" />}
                                title={t.skills.frameworks}
                                items={skills.tools}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function StackCard({ icon, title, items }: { icon: React.ReactNode, title: string, items: string[] }) {
    return (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors group">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                    {icon}
                </div>
                <h3 className="font-bold">{title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
                {items.map(item => (
                    <span key={item} className="text-xs px-2 py-1 rounded bg-white/5 text-muted-foreground">
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}
