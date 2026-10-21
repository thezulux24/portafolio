"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { animate, stagger } from "animejs";
import { ArrowDownRight, ArrowUpRight, Asterisk, FileText } from "lucide-react";
import { useLanguageStore } from "@/lib/store";
import { useIntroStore } from "@/lib/intro";
import { useCoarsePointer } from "@/lib/useCoarsePointer";
import { HeroShader } from "@/components/3d/HeroShader";
import { Magnetic } from "@/components/ui/Magnetic";
import { Marquee } from "@/components/ui/Marquee";
import { RotatingBadge } from "@/components/ui/RotatingBadge";
import { cn } from "@/lib/utils";

const FIRST = "BRAYAN";
const LAST = "ZULUAGA";
const REVEAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function KineticChars({ text, outline = false }: { text: string; outline?: boolean }) {
    const handleCharEnter = (event: React.MouseEvent<HTMLSpanElement>) => {
        const el = event.currentTarget;
        animate(el, {
            translateY: [0, -14, 0],
            scale: [1, 1.08, 1],
            duration: 620,
            ease: "outElastic(1, 0.5)",
        });
    };

    return (
        <>
            {text.split("").map((char, index) => (
                <span
                    key={`${char}-${index}`}
                    onMouseEnter={handleCharEnter}
                    className={cn(
                        "js-hero-char inline-block origin-bottom cursor-default select-none will-change-transform transition-colors duration-300 hover:text-acid",
                        outline && "text-outline outline-hover-acid"
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

    const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
    const shaderY = useTransform(scrollYProgress, [0, 1], [0, 90]);
    const fadeOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    useEffect(() => {
        if (!started) return;
        const animation = animate(".js-hero-char", {
            translateY: ["115%", "0%"],
            rotateX: [-65, 0],
            delay: stagger(42, { start: 80 }),
            duration: 1100,
            ease: "out(4)",
        });
        return () => {
            animation.cancel();
        };
    }, [started]);

    useEffect(() => {
        if (!started || !isCoarse) return;
        const animation = animate(".js-hero-pulse", {
            scale: [1, 1.75],
            opacity: [0.6, 0],
            duration: 2500,
            ease: "out(2)",
            loop: true,
            delay: stagger(1250, { start: 500 }),
        });
        return () => {
            animation.cancel();
        };
    }, [started, isCoarse]);

    const reveal = (delay: number) => ({
        initial: { opacity: 0, y: 16 },
        animate: started ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
        transition: { delay, duration: 0.8, ease: REVEAL_EASE },
    });

    return (
        <section ref={sectionRef} className="relative flex min-h-svh flex-col overflow-hidden bg-ink">
            {/* WebGL fluid-noise + interactive 3D gyroscope backdrop */}
            <motion.div className="absolute inset-0 will-change-transform" style={{ y: shaderY }}>
                <HeroShader />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink" />
            </motion.div>

            <motion.div className="relative z-10 flex flex-1 flex-col" style={{ opacity: fadeOpacity }}>
                {/* Top meta row */}
                <motion.div
                    {...reveal(0.5)}
                    className="flex items-center justify-between px-5 pt-16 font-mono text-[9px] uppercase tracking-[0.22em] text-bone/65 md:px-10 md:pt-24 md:text-[11px]"
                >
                    <span className="flex items-center gap-2">
                        <span className="availability-dot inline-block h-1.5 w-1.5 rounded-full bg-acid" />
                        {t.hero.status}
                    </span>
                    <span className="hidden lg:block">{t.hero.role}</span>
                    <span className="hidden sm:inline">{t.hero.location}</span>
                </motion.div>

                {/* Mobile: orbital ripple rings framing the touch-interactive 3D artifact */}
                <motion.div
                    {...reveal(0.75)}
                    className="pointer-events-none absolute inset-0 flex items-center justify-center sm:hidden"
                >
                    <div className="relative -mt-16 flex items-center justify-center">
                        <span
                            className="js-hero-pulse absolute h-56 w-56 rounded-full border border-acid/45"
                            style={{ opacity: 0 }}
                        />
                        <span
                            className="js-hero-pulse absolute h-56 w-56 rounded-full border border-acid/25"
                            style={{ opacity: 0 }}
                        />
                    </div>
                </motion.div>

                {/* Kinetic title */}
                <motion.div
                    className="mt-auto px-5 will-change-transform md:px-10"
                    style={{ y: titleY }}
                >
                    <motion.p
                        {...reveal(0.65)}
                        className="mb-3 font-mono text-[10px] uppercase tracking-[0.34em] text-acid md:mb-4 md:text-xs"
                    >
                        Portfolio — 2026
                    </motion.p>

                    <h1 className="perspective-1000 font-display font-extrabold uppercase leading-[0.85] tracking-[-0.02em]">
                        <span className="block overflow-hidden pb-[0.05em] text-[clamp(2.65rem,13.2vw,13.2rem)]">
                            <KineticChars text={FIRST} />
                        </span>
                        <span className="group block overflow-hidden pb-[0.08em] text-[clamp(2.65rem,13.2vw,13.2rem)]">
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

                {/* Bottom row + Thumb-friendly Dual CTAs */}
                <motion.div
                    {...reveal(0.9)}
                    className="mx-5 mt-5 flex flex-wrap items-end justify-between gap-5 border-t border-bone/10 pb-5 pt-4 md:mx-10 md:mt-6 md:pb-8 md:pt-5"
                >
                    <div className="w-full max-w-xl sm:w-auto">
                        <p className="text-xs leading-relaxed text-bone/65 md:text-base">
                            {t.hero.tagline}
                        </p>

                        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
                            <Magnetic strength={0.2}>
                                <a
                                    href="#projects"
                                    className="group flex w-full items-center justify-center gap-1.5 rounded-full bg-acid px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink transition-transform duration-300 hover:scale-[1.03] sm:w-auto sm:px-5"
                                >
                                    <span>{t.hero.cta}</span>
                                    <ArrowDownRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                                </a>
                            </Magnetic>

                            <Magnetic strength={0.2}>
                                <Link
                                    href="/cv"
                                    className="group flex w-full items-center justify-center gap-1.5 rounded-full border border-bone/20 bg-ink/60 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/85 backdrop-blur-sm transition-colors duration-300 hover:border-acid hover:text-acid sm:w-auto sm:px-5"
                                >
                                    <FileText className="h-3.5 w-3.5 text-acid" />
                                    <span>{t.hero.cv}</span>
                                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </Link>
                            </Magnetic>
                        </div>
                    </div>

                    <a href="#about" aria-label={t.hero.scroll} className="hidden shrink-0 sm:block">
                        <RotatingBadge text={t.hero.badge} />
                    </a>
                </motion.div>
            </motion.div>

            {/* Disciplines marquee */}
            <motion.div
                {...reveal(1.05)}
                className="relative z-10 border-t border-bone/10 bg-ink/75 py-3 backdrop-blur-sm"
            >
                <Marquee duration={26}>
                    {t.hero.marquee.map((item) => (
                        <span
                            key={item}
                            className="mx-6 flex items-center gap-12 font-mono text-[10px] uppercase tracking-[0.28em] text-bone/70 md:text-[11px]"
                        >
                            {item}
                            <Asterisk className="h-3.5 w-3.5 text-acid" />
                        </span>
                    ))}
                </Marquee>
            </motion.div>
        </section>
    );
}
