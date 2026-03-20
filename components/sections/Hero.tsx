"use client";

import { useRef } from "react";
import { useLanguageStore } from "@/lib/store";
import { HeroScene } from "@/components/3d/HeroScene";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

export function Hero() {
    const { t } = useLanguageStore();
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollY } = useScroll();

    // Content drifts up, fades, and scales down as user scrolls away
    const rawContentY = useTransform(scrollY, [0, 650], [0, -150]);
    const contentY    = useSpring(rawContentY, { stiffness: 80, damping: 28 });
    const contentOpacity = useTransform(scrollY, [0, 420], [1, 0]);
    const contentScale   = useTransform(scrollY, [0, 650], [1, 0.88]);

    // 3D background moves slower than content (parallax depth)
    const bgY = useTransform(scrollY, [0, 700], [0, 72]);

    // Scroll indicator fades + lifts early
    const indicatorOpacity = useTransform(scrollY, [0, 200], [1, 0]);
    const indicatorY       = useTransform(scrollY, [0, 200], [0, -18]);

    return (
        <section ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-background">

            {/* 3D Background — parallaxes at 60% scroll speed */}
            <motion.div className="absolute inset-0 will-change-transform" style={{ y: bgY }}>
                <HeroScene />
            </motion.div>

            {/* Content block — scroll-driven exit */}
            <motion.div
                className="container relative z-10 px-6 flex flex-col items-center text-center will-change-transform"
                style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-4xl"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.88 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-6 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-primary backdrop-blur-md"
                    >
                        {t.hero.status}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className="text-5xl md:text-7xl font-bold font-heading leading-tight tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50"
                    >
                        Brayan Zuluaga
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.22, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="text-2xl md:text-3xl font-light text-muted-foreground mb-8"
                    >
                        {t.hero.role}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.32, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-xl mx-auto text-lg text-muted-foreground/80 mb-10 leading-relaxed"
                    >
                        {t.hero.description}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.42, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Button size="lg" className="group" asChild>
                            <a href="#projects">
                                {t.hero.cta}
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </a>
                        </Button>
                        <Button size="lg" variant="outline" className="group" asChild>
                            <a href="/cv">
                                {t.hero.cv}
                                <Download className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-1" />
                            </a>
                        </Button>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Scroll indicator — fades and lifts as user begins scrolling */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                style={{ opacity: indicatorOpacity, y: indicatorY }}
            >
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-1 bg-white/50 rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}
