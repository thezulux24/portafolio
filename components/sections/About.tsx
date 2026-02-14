"use client";

import { useLanguageStore } from "@/lib/store";
import { motion } from "framer-motion";
import Image from "next/image";

export function About() {
    const { t } = useLanguageStore();

    return (
        <section id="about" className="py-24 bg-secondary/5">
            <div className="container px-6 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid md:grid-cols-2 gap-12 items-center"
                >
                    {/* Image/Visual - Using a placeholder or the provided image path */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800">
                            {/* Assuming the user said the image is at public/images/fotoperfil.jpg */}
                            {/* We need to verify if the file exists or if we should use a placeholder. User said it IS there. */}
                            <Image
                                src="/images/fotoperfil.jpg"
                                alt="Brayan Zuluaga"
                                width={500}
                                height={500}
                                className="object-cover w-full h-full md:grayscale hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading">
                            {t.about.title}
                        </h2>
                        <div className="h-1 w-20 bg-primary rounded-full" />

                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {t.about.description}
                        </p>

                        <div className="space-y-4 pt-4">
                            <div className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                                <div>
                                    <h3 className="font-semibold text-foreground">Backend + Architecture</h3>
                                    <p className="text-sm text-muted-foreground">NestJS, Node.js, Design Patterns, SOLID.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                                <div>
                                    <h3 className="font-semibold text-foreground">Frontend Performance</h3>
                                    <p className="text-sm text-muted-foreground">Next.js, React, Animations, Optimization.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                                <div>
                                    <h3 className="font-semibold text-foreground">Data & AI</h3>
                                    <p className="text-sm text-muted-foreground">PostgreSQL, Python, FastAPI, Algorithmic Thinking.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
