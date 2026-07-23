"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { animate, stagger } from "animejs";
import { Asterisk } from "lucide-react";
import { useLanguageStore } from "@/lib/store";
import { useIntroStore } from "@/lib/intro";
import { useCoarsePointer } from "@/lib/useCoarsePointer";
import { HeroShader } from "@/components/3d/HeroShader";
import { Marquee } from "@/components/ui/Marquee";
import { RotatingBadge } from "@/components/ui/RotatingBadge";
import { cn } from "@/lib/utils";

const FIRST = "BRAYAN";
const LAST = "ZULUAGA";
const REVEAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function KineticChars({ text, outline = false }: { text: string; outline?: boolean }) {
    return (
        <>
            {text.split("").map((char, index) => (
                <span
                    key={`${char}-${index}`}
                    className={cn(
                        "js-hero-char inline-block will-change-transform",
                        outline && "text-outline"
                    )}
                    style={{ transform: "translateY(115%)" }}
                >
                    {char}
                </span>
            ))}
        </>
    );
}

export function Hero() {
    const { t } = useLanguageStore();
    const started = useIntroStore((state) => state.started);
    const isCoarse = useCoarsePointer();
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    const titleY = useTransform(scrollYProgress, [0, 1], [0, 160]);
    const shaderY = useTransform(scrollYProgress, [0, 1], [0, 110]);
    const fadeOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

    useEffect(() => {
        if (!started) return;
        const animation = animate(".js-hero-char", {
            translateY: ["115%", "0%"],
            delay: stagger(45, { start: 120 }),
            duration: 1150,
            ease: "out(4)",
        });
        return () => {
            animation.cancel();
        };
    }, [started]);

    // Mobile centerpiece: automatic expanding ripple rings (no cursor needed)
    useEffect(() => {
        if (!started || !isCoarse) return;
        const animation = animate(".js-hero-pulse", {
            scale: [1, 1.8],
            opacity: [0.65, 0],
            duration: 2600,
            ease: "out(2)",
            loop: true,
            delay: stagger(1300, { start: 500 }),
        });
        return () => {
            animation.cancel();
        };
    }, [started, isCoarse]);

    const reveal = (delay: number) => ({
        initial: { opacity: 0, y: 18 },
        animate: started ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
        transition: { delay, duration: 0.9, ease: REVEAL_EASE },
    });

    return (
        <section ref={sectionRef} className="relative flex min-h-svh flex-col overflow-hidden bg-ink">
            {/* WebGL fluid-noise backdrop */}
            <motion.div className="absolute inset-0 will-change-transform" style={{ y: shaderY }}>
                <HeroShader />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink" />
            </motion.div>

            <motion.div className="relative z-10 flex flex-1 flex-col" style={{ opacity: fadeOpacity }}>
                {/* Top meta row */}
                <motion.div
                    {...reveal(0.9)}
                    className="flex items-center justify-between px-6 pt-24 font-mono text-[10px] uppercase tracking-[0.28em] text-bone/60 md:px-10 md:pt-28 md:text-[11px]"
                >
                    <span className="flex items-center gap-2.5">
                        <span className="availability-dot inline-block h-1.5 w-1.5 rounded-full bg-acid" />
                        {t.hero.status}
                    </span>
                    <span className="hidden lg:block">{t.hero.role}</span>
                    <span>{t.hero.location}</span>
                </motion.div>

                {/* Mobile centerpiece — auto-animated, fills the empty space */}
                <motion.div
                    {...reveal(1.15)}
                    className="relative flex flex-1 items-center justify-center py-10 sm:hidden"
                >
                    <div className="relative flex items-center justify-center">
                        <span
                            className="js-hero-pulse absolute h-40 w-40 rounded-full border border-acid/50"
                            style={{ opacity: 0 }}
                        />
                        <span
                            className="js-hero-pulse absolute h-40 w-40 rounded-full border border-acid/30"
                            style={{ opacity: 0 }}
                        />
                        <RotatingBadge text={t.hero.badge} className="h-40 w-40 text-bone/90" />
                    </div>
                </motion.div>

                {/* Kinetic title */}
                <motion.div
                    className="mt-auto px-6 will-change-transform md:px-10"
                    style={{ y: titleY }}
                >
                    <motion.p
                        {...reveal(1.05)}
                        className="mb-4 font-mono text-[10px] uppercase tracking-[0.34em] text-acid md:text-xs"
                    >
                        Portfolio — 2026
                    </motion.p>
                    <h1 className="font-display font-extrabold uppercase leading-[0.86] tracking-[-0.02em]">
                        <span className="block overflow-hidden pb-[0.05em] text-[clamp(3.4rem,15vw,13.5rem)]">
                            <KineticChars text={FIRST} />
                        </span>
                        <span className="block overflow-hidden pb-[0.08em] text-[clamp(3.4rem,15vw,13.5rem)]">
                            <KineticChars text={LAST} outline />
                            <span
                                className="js-hero-char inline-block text-acid will-change-transform"
                                style={{ transform: "translateY(115%)" }}
                            >
                                .
                            </span>
                        </span>
                    </h1>
                </motion.div>

                {/* Bottom row */}
                <motion.div
                    {...reveal(1.25)}
                    className="mx-6 mt-10 flex items-end justify-between gap-6 border-t border-bone/10 pb-8 pt-5 md:mx-10"
                >
                    <div className="max-w-md">
                        <p className="text-sm leading-relaxed text-bone/60 md:text-base">
                            {t.hero.tagline}
                        </p>
                        <p className="mt-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/40">
                            <span className="inline-block h-px w-10 bg-acid" />
                            {t.hero.scroll}
                        </p>
                    </div>
                    <a href="#about" aria-label={t.hero.scroll} className="hidden shrink-0 sm:block">
                        <RotatingBadge text={t.hero.badge} />
                    </a>
                </motion.div>
            </motion.div>

            {/* Disciplines marquee */}
            <motion.div
                {...reveal(1.4)}
                className="relative z-10 border-t border-bone/10 bg-ink/70 py-3.5 backdrop-blur-sm"
            >
                <Marquee duration={26}>
                    {t.hero.marquee.map((item) => (
                        <span
                            key={item}
                            className="mx-7 flex items-center gap-14 font-mono text-[11px] uppercase tracking-[0.32em] text-bone/70"
                        >
                            {item}
                            <Asterisk className="h-4 w-4 text-acid" />
                        </span>
                    ))}
                </Marquee>
            </motion.div>
        </section>
    );
}
