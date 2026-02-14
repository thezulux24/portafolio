"use client";

import { useState } from "react";
import { useLanguageStore } from "@/lib/store";
import { motion } from "framer-motion";
import { ExternalLink, Github, Layers, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrivateProjectModal } from "@/components/ui/PrivateProjectModal";

export function Projects() {
    const { t } = useLanguageStore();
    const [showPrivateModal, setShowPrivateModal] = useState(false);

    const projects = [
        {
            title: t.projects.pyp.title, // Accessing translation for "PyP Camiones"
            description: t.projects.pyp.description,
            tags: ["NestJS", "React + Vite", "PostgreSQL", "Prisma ORM", "Tailwind CSS"],
            image: "", // Placeholder
            links: {
                demo: "https://pypcamiones.cloud",
                repo: "https://github.com/thezulux24/pyp",
                app: "https://app.pypcamiones.cloud"
            },
            featured: true,
            isPrivate: true, // Mark as private
        },
    ];

    const handlePrivateLink = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowPrivateModal(true);
    };

    return (
        <section id="projects" className="py-24 bg-background relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 p-20 opacity-10 blur-3xl rounded-full bg-primary/20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 p-32 opacity-10 blur-3xl rounded-full bg-blue-500/20 pointer-events-none" />

            <div className="container px-6 mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 space-y-4"
                >
                    <h2 className="text-3xl md:text-5xl font-bold font-heading">{t.projects.title}</h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full" />
                </motion.div>

                <div className="grid gap-12">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative border border-white/10 rounded-3xl overflow-hidden bg-white/5 hover:bg-white/[0.07] transition-colors"
                        >
                            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
                                <div className="space-y-6 order-2 md:order-1">
                                    <div className="flex items-center gap-3">
                                        <Layers className="text-primary h-6 w-6" />
                                        <span className="text-sm font-medium tracking-wider uppercase text-primary">
                                            {t.projects.featured}
                                        </span>
                                    </div>

                                    <h3 className="text-3xl font-bold font-heading group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>

                                    <p className="text-muted-foreground text-lg leading-relaxed">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-white/80 border border-white/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-4 pt-4">
                                        <Button asChild>
                                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="mr-2 h-4 w-4" />
                                                Landing Page
                                            </a>
                                        </Button>

                                        {/* App Button - Restricted */}
                                        <Button variant="secondary" onClick={project.isPrivate ? handlePrivateLink : undefined} asChild={!project.isPrivate}>
                                            {project.isPrivate ? (
                                                <>
                                                    <ArrowUpRight className="mr-2 h-4 w-4" />
                                                    App
                                                </>
                                            ) : (
                                                <a href={project.links.app} target="_blank" rel="noopener noreferrer">
                                                    <ArrowUpRight className="mr-2 h-4 w-4" />
                                                    App
                                                </a>
                                            )}
                                        </Button>

                                        {/* Code Button - Restricted */}
                                        <Button variant="outline" onClick={project.isPrivate ? handlePrivateLink : undefined} asChild={!project.isPrivate}>
                                            {project.isPrivate ? (
                                                <>
                                                    <Github className="mr-2 h-4 w-4" />
                                                    Code
                                                </>
                                            ) : (
                                                <a href={project.links.repo} target="_blank" rel="noopener noreferrer">
                                                    <Github className="mr-2 h-4 w-4" />
                                                    Code
                                                </a>
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                <div className="order-1 md:order-2 relative aspect-video rounded-xl overflow-hidden bg-black/50 border border-white/10 group-hover:border-primary/50 transition-colors">
                                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black p-8 flex items-center justify-center">
                                        <code className="text-primary/50 font-mono text-xl">{`<${project.title} />`}</code>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <PrivateProjectModal isOpen={showPrivateModal} onClose={() => setShowPrivateModal(false)} />
        </section>
    );
}
