"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useLanguageStore } from "@/lib/store";
import { cn } from "@/lib/utils";

function LocalTime({ className }: { className?: string }) {
    const [time, setTime] = useState("");

    useEffect(() => {
        const update = () =>
            setTime(
                new Date().toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    timeZone: "America/Bogota",
                })
            );
        update();
        const interval = window.setInterval(update, 1000);
        return () => window.clearInterval(interval);
    }, []);

    return (
        <span className={cn("font-mono text-[11px] tracking-[0.2em] text-bone/50", className)}>
            CALI {time}
        </span>
    );
}

export function Navbar() {
    const { t, language, setLanguage } = useLanguageStore();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const getSectionHref = (sectionId: string) =>
        pathname === "/" ? `#${sectionId}` : `/#${sectionId}`;

    const navLinks = [
        { label: t.nav.about, href: getSectionHref("about") },
        { label: t.nav.experience, href: getSectionHref("experience") },
        { label: t.nav.stack, href: getSectionHref("stack") },
        { label: t.nav.projects, href: getSectionHref("projects") },
        { label: t.nav.contact, href: getSectionHref("contact") },
    ];

    const toggleLanguage = () => setLanguage(language === "es" ? "en" : "es");

    return (
        <>
            <motion.header
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: pathname === "/" ? 2.4 : 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-x-0 top-0 z-[110] mix-blend-difference"
            >
                <div className="flex items-center justify-between px-6 py-5 md:px-10">
                    <a
                        href={pathname === "/" ? "#" : "/"}
                        className="font-display text-lg font-extrabold tracking-tight text-white"
                    >
                        BZ<span className="align-super text-[10px]">©</span>
                    </a>

                    {/* Desktop nav */}
                    <nav className="hidden items-center gap-8 md:flex">
                        {navLinks.map((link, index) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="group flex items-baseline gap-1.5 text-[13px] font-medium text-white/70 transition-colors hover:text-white"
                            >
                                <span className="font-mono text-[9px] text-white/40 transition-colors group-hover:text-white">
                                    0{index + 1}
                                </span>
                                <span className="link-sweep">{link.label}</span>
                            </a>
                        ))}
                        <span className="h-3.5 w-px bg-white/25" />
                        <button
                            type="button"
                            onClick={toggleLanguage}
                            className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
                        >
                            {language === "es" ? "ES / EN" : "EN / ES"}
                        </button>
                    </nav>

                    {/* Mobile controls */}
                    <div className="flex items-center gap-5 md:hidden">
                        <button
                            type="button"
                            onClick={toggleLanguage}
                            className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/80"
                        >
                            {language.toUpperCase()}
                        </button>
                        <button
                            type="button"
                            aria-label="Menu"
                            onClick={() => setIsMobileMenuOpen((open) => !open)}
                            className="text-white"
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile fullscreen menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ clipPath: "inset(0 0 100% 0)" }}
                        animate={{ clipPath: "inset(0 0 0% 0)" }}
                        exit={{ clipPath: "inset(0 0 100% 0)" }}
                        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 z-[105] flex flex-col justify-between bg-ink px-6 pb-10 pt-28"
                    >
                        <nav className="flex flex-col gap-2">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    initial={{ opacity: 0, y: 28 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25 + index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="group flex items-baseline gap-4 border-b border-bone/10 py-4"
                                >
                                    <span className="font-mono text-xs text-acid">0{index + 1}</span>
                                    <span className="font-display text-4xl font-extrabold uppercase tracking-tight text-bone transition-colors group-hover:text-acid">
                                        {link.label}
                                    </span>
                                    <ArrowUpRight className="ml-auto h-5 w-5 text-bone/40" />
                                </motion.a>
                            ))}
                        </nav>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.55, duration: 0.5 }}
                            className="flex items-center justify-between"
                        >
                            <LocalTime />
                            <div className="flex gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/60">
                                <a href="https://github.com/thezulux24" target="_blank" rel="noopener noreferrer">
                                    GitHub
                                </a>
                                <a href="mailto:thezulux24@gmail.com">Email</a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
