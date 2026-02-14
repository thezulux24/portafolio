"use client";

import { useLanguageStore } from "@/lib/store";
import { HeroScene } from "@/components/3d/HeroScene";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

export function Hero() {
    const { t } = useLanguageStore();

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-background">
            {/* 3D Background */}
            <HeroScene />

            {/* Content Overlay */}
            <div className="container relative z-10 px-6 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="mb-6 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-primary backdrop-blur-md"
                    >
                        {t.hero.status}
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-bold font-heading leading-tight tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                        Brayan Zuluaga
                    </h1>

                    <h2 className="text-2xl md:text-3xl font-light text-muted-foreground mb-8">
                        {t.hero.role}
                    </h2>

                    <p className="max-w-xl mx-auto text-lg text-muted-foreground/80 mb-10 leading-relaxed">
                        {t.hero.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button size="lg" className="group" asChild>
                            <a href="#projects">
                                {t.hero.cta}
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </a>
                        </Button>
                        <Button size="lg" variant="outline" className="group" asChild>
                            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                                {t.hero.cv}
                                <Download className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-1" />
                            </a>
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator - Optional */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-1 bg-white/50 rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}
