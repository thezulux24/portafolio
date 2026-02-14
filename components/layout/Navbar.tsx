"use client";

import { useState, useEffect } from "react";
import { useLanguageStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, Github, Mail } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function Navbar() {
    const { t, language, setLanguage } = useLanguageStore();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: t.nav.about, href: "#about" },
        { label: t.nav.experience, href: "#experience" },
        { label: t.nav.projects, href: "#projects" },
        { label: t.nav.contact, href: "#contact" },
    ];

    const toggleLanguage = () => {
        setLanguage(language === "es" ? "en" : "es");
    };

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-black/50 backdrop-blur-md border-b border-white/10 py-4"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <a href="#" className="text-xl font-bold font-heading tracking-tight">
                    BZ<span className="text-primary">.</span>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                    <div className="h-4 w-px bg-white/20 mx-2" />
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleLanguage}
                        className="font-mono text-xs"
                    >
                        {language.toUpperCase()}
                    </Button>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" asChild>
                            <a href="https://github.com/thezulux24" target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4" />
                            </a>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                            <a href="mailto:thezulux24@gmail.com">
                                <Mail className="h-4 w-4" />
                            </a>
                        </Button>
                    </div>
                </nav>

                {/* Mobile Toggle */}
                <div className="md:hidden flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleLanguage}
                        className="font-mono text-xs"
                    >
                        {language.toUpperCase()}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black/90 backdrop-blur-xl border-b border-white/10"
                    >
                        <nav className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <div className="flex gap-4 mt-4">
                                <a href="https://github.com/thezulux24" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                                    <Github className="h-5 w-5" />
                                </a>
                                <a href="mailto:thezulux24@gmail.com" className="text-muted-foreground hover:text-primary">
                                    <Mail className="h-5 w-5" />
                                </a>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
