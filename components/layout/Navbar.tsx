"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { animate } from "animejs";
import { ArrowUpRight, Briefcase, Code2, Cpu, FileText, Layers, Mail, Menu, User, X } from "lucide-react";
import { useLanguageStore } from "@/lib/store";
import { useCoarsePointer } from "@/lib/useCoarsePointer";
import { cn } from "@/lib/utils";

function LocalTime({ className }: { className?: string }) {
    const [time, setTime] = useState("");

    useEffect(() => {
        const update = () =>
            setTime(
                new Date().toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "America/Bogota",
                })
            );
        update();
        const interval = window.setInterval(update, 15000);
        return () => window.clearInterval(interval);
    }, []);

    if (!time) return null;

    return (
        <span className={cn("font-mono text-[10px] tracking-[0.2em] text-bone/50", className)}>
            CO {time} · US-FL
        </span>
    );
}

/** Tactile acid touch-ripple on mobile tap */
function MobileTouchRipple() {
    const isCoarse = useCoarsePointer();

    useEffect(() => {
        if (!isCoarse) return;

        const onTouchStart = (e: TouchEvent) => {
            const touch = e.touches[0];
            if (!touch) return;

            const ripple = document.createElement("span");
            ripple.className =
                "pointer-events-none fixed z-[350] -ml-5 -mt-5 h-10 w-10 rounded-full border border-acid/80 bg-acid/15";
            ripple.style.left = `${touch.clientX}px`;
            ripple.style.top = `${touch.clientY}px`;
            document.body.appendChild(ripple);

            animate(ripple, {
                scale: [0.2, 1.9],
                opacity: [0.85, 0],
                duration: 520,
                ease: "out(3)",
                onComplete: () => ripple.remove(),
            });
        };

        window.addEventListener("touchstart", onTouchStart, { passive: true });
        return () => window.removeEventListener("touchstart", onTouchStart);
    }, [isCoarse]);

    return null;
}

export function Navbar() {
    const { t, language, setLanguage } = useLanguageStore();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string>("about");

    const getSectionHref = (sectionId: string) =>
        pathname === "/" ? `#${sectionId}` : `/#${sectionId}`;

    const navLinks = [
        { id: "about", label: t.nav.about, href: getSectionHref("about"), icon: User },
        { id: "experience", label: t.nav.experience, href: getSectionHref("experience"), icon: Briefcase },
        { id: "stack", label: t.nav.stack, href: getSectionHref("stack"), icon: Cpu },
        { id: "projects", label: t.nav.projects, href: getSectionHref("projects"), icon: Layers },
        { id: "contact", label: t.nav.contact, href: getSectionHref("contact"), icon: Mail },
    ];

    useEffect(() => {
        if (pathname !== "/") return;
        const ids = ["about", "experience", "stack", "projects", "contact"];
        const elements = ids
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => Boolean(el));

        if (!elements.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                }
            },
            { rootMargin: "-35% 0px -50% 0px", threshold: 0 }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [pathname]);

    const toggleLanguage = () => setLanguage(language === "es" ? "en" : "es");

    const handleDockTap = (e: React.MouseEvent<HTMLElement>, id: string) => {
        setActiveSection(id);
        animate(e.currentTarget, {
            scale: [1, 0.86, 1.08, 1],
            duration: 420,
            ease: "outElastic(1, 0.6)",
        });
    };

    return (
        <>
            <MobileTouchRipple />

            <motion.header
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: pathname === "/" ? 1.7 : 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-x-0 top-0 z-[110] mix-blend-difference"
            >
                <div className="flex items-center justify-between px-5 py-4 md:px-10 md:py-5">
                    <div className="flex items-center gap-6">
                        <Link
                            href={pathname === "/" ? "#" : "/"}
                            className="font-display text-lg font-extrabold tracking-tight text-white transition-transform duration-300 hover:scale-105"
                        >
                            BZ<span className="align-super text-[10px] text-acid">©</span>
                        </Link>
                        <LocalTime className="hidden xl:inline-block text-white/45" />
                    </div>

                    {/* Desktop nav */}
                    <nav className="hidden items-center gap-7 md:flex">
                        {navLinks.map((link, index) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "group flex items-baseline gap-1.5 text-[13px] font-medium transition-colors hover:text-white",
                                    activeSection === link.id && pathname === "/"
                                        ? "text-white"
                                        : "text-white/65"
                                )}
                            >
                                <span
                                    className={cn(
                                        "font-mono text-[9px] transition-colors group-hover:text-acid",
                                        activeSection === link.id && pathname === "/"
                                            ? "text-acid"
                                            : "text-white/40"
                                    )}
                                >
                                    0{index + 1}
                                </span>
                                <span className="link-sweep">{link.label}</span>
                            </a>
                        ))}

                        <Link
                            href="/cv"
                            className={cn(
                                "group inline-flex items-center gap-1.5 rounded-full border border-white/25 px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-acid hover:bg-acid hover:text-ink",
                                pathname === "/cv" && "border-acid bg-acid text-ink"
                            )}
                        >
                            <FileText className="h-3 w-3" />
                            <span>{t.nav.cv}</span>
                        </Link>

                        <span className="h-3.5 w-px bg-white/25" />

                        <button
                            type="button"
                            onClick={toggleLanguage}
                            className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/75 transition-colors hover:text-acid"
                        >
                            <span className={cn(language === "es" && "font-bold text-acid")}>ES</span>
                            <span className="mx-1 text-white/35">/</span>
                            <span className={cn(language === "en" && "font-bold text-acid")}>EN</span>
                        </button>
                    </nav>

                    {/* Mobile top controls */}
                    <div className="flex items-center gap-3 md:hidden">
                        <button
                            type="button"
                            onClick={toggleLanguage}
                            className="rounded-full border border-white/25 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white"
                        >
                            {language === "es" ? "ES · EN" : "EN · ES"}
                        </button>
                        <button
                            type="button"
                            aria-label="Menu"
                            onClick={() => setIsMobileMenuOpen((open) => !open)}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white"
                        >
                            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Floating Bottom App Dock (Native-App Feel) */}
            <motion.nav
                aria-label="Mobile quick navigation"
                initial={{ y: 90, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: pathname === "/" ? 1.9 : 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="fixed bottom-4 left-1/2 z-[108] flex -translate-x-1/2 items-center gap-1 rounded-full border border-bone/15 bg-ink/85 px-2 py-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.85)] backdrop-blur-xl md:hidden"
            >
                {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === "/" && activeSection === link.id;
                    return (
                        <a
                            key={link.id}
                            href={link.href}
                            onClick={(e) => handleDockTap(e, link.id)}
                            className={cn(
                                "relative flex flex-col items-center justify-center rounded-full px-3 py-1.5 transition-colors duration-200",
                                isActive ? "text-ink" : "text-bone/65 active:text-acid"
                            )}
                        >
                            {isActive && (
                                <motion.span
                                    layoutId="mobile-dock-pill"
                                    transition={{ type: "spring", stiffness: 360, damping: 28 }}
                                    className="absolute inset-0 rounded-full bg-acid shadow-[0_0_16px_rgba(200,243,29,0.45)]"
                                />
                            )}
                            <Icon className="relative z-10 h-3.5 w-3.5" />
                            <span className="relative z-10 mt-0.5 font-mono text-[8px] font-semibold uppercase tracking-[0.12em]">
                                {link.label}
                            </span>
                        </a>
                    );
                })}

                <span className="mx-0.5 h-5 w-px bg-bone/15" />

                <Link
                    href="/cv"
                    className={cn(
                        "relative flex flex-col items-center justify-center rounded-full px-3 py-1.5 transition-colors",
                        pathname === "/cv"
                            ? "bg-acid text-ink"
                            : "border border-acid/35 bg-acid/10 text-acid"
                    )}
                >
                    <Code2 className="h-3.5 w-3.5" />
                    <span className="mt-0.5 font-mono text-[8px] font-semibold uppercase tracking-[0.12em]">
                        {t.nav.cv}
                    </span>
                </Link>
            </motion.nav>

            {/* Mobile fullscreen menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ clipPath: "inset(0 0 100% 0)" }}
                        animate={{ clipPath: "inset(0 0 0% 0)" }}
                        exit={{ clipPath: "inset(0 0 100% 0)" }}
                        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 z-[109] flex flex-col justify-between bg-ink px-6 pb-24 pt-20"
                    >
                        <nav className="flex flex-col gap-1">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 + index * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="group flex items-baseline gap-4 border-b border-bone/10 py-3.5"
                                >
                                    <span className="font-mono text-xs text-acid">0{index + 1}</span>
                                    <span className="font-display text-3xl font-extrabold uppercase tracking-tight text-bone transition-colors group-hover:text-acid">
                                        {link.label}
                                    </span>
                                    <ArrowUpRight className="ml-auto h-5 w-5 text-bone/40" />
                                </motion.a>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.42, duration: 0.4 }}
                            >
                                <Link
                                    href="/cv"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="group flex items-baseline gap-4 border-b border-bone/10 py-3.5"
                                >
                                    <span className="font-mono text-xs text-acid">06</span>
                                    <span className="font-display text-3xl font-extrabold uppercase tracking-tight text-acid">
                                        {t.nav.cv} / PDF
                                    </span>
                                    <ArrowUpRight className="ml-auto h-5 w-5 text-acid" />
                                </Link>
                            </motion.div>
                        </nav>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.45, duration: 0.4 }}
                            className="flex items-center justify-between"
                        >
                            <LocalTime />
                            <div className="flex gap-5 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/60">
                                <a href="https://www.linkedin.com/in/brayanzz24" target="_blank" rel="noopener noreferrer">
                                    LinkedIn
                                </a>
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
