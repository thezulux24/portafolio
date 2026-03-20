"use client";

import { useRef } from "react";
import { useLanguageStore } from "@/lib/store";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

export function About() {
    const { t } = useLanguageStore();
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "start 30%"],
    });

    // Image col: tilts from above into flat (3D rotateX on Y-axis for depth)
    const rawImageRotateX = useTransform(scrollYProgress, [0, 1], [18, 0]);
    const imageRotateX    = useSpring(rawImageRotateX, { stiffness: 60, damping: 22 });
    const imageY          = useTransform(scrollYProgress, [0, 1], [70, 0]);
    const imageOpacity    = useTransform(scrollYProgress, [0, 0.55], [0, 1]);

    // Text col: emerges from right, slightly delayed start
    const rawTextX   = useTransform(scrollYProgress, [0.08, 1], [60, 0]);
    const textX      = useSpring(rawTextX, { stiffness: 65, damping: 24 });
    const textOpacity = useTransform(scrollYProgress, [0.08, 0.6], [0, 1]);

    return (
        <section id="about" ref={sectionRef} className="py-24 bg-secondary/5">
            <div className="container px-6 mx-auto" style={{ perspective: "1400px" }}>
                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* Image col — 3D tilt entrance from top-forward */}
                    <motion.div
                        className="relative group will-change-transform"
                        style={{
                            rotateX: imageRotateX,
                            y: imageY,
                            opacity: imageOpacity,
                            transformOrigin: "center top",
                        }}
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                        <div className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800">
                            <Image
                                src="/images/fotoperfil.jpg"
                                alt="Brayan Zuluaga"
                                width={1000}
                                height={1000}
                                className="object-cover w-full h-full md:grayscale hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                    </motion.div>

                    {/* Text col — slides in from the right */}
                    <motion.div
                        className="space-y-6 will-change-transform"
                        style={{ x: textX, opacity: textOpacity }}
                    >
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
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
