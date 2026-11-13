"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useLang } from "@/lib/store";
import { ui } from "@/lib/content";

const LINKS = [
    { id: "projects", label: ui.nav.projects },
    { id: "experience", label: ui.nav.experience },
    { id: "stack", label: ui.nav.stack },
    { id: "contact", label: ui.nav.contact },
] as const;

function LangToggle() {
    const { lang, setLang } = useLang();
    return (
        <div role="group" aria-label={ui.nav.language[lang]} className="data flex items-center border border-line">
            {(["es", "en"] as const).map((code) => (
                <button
                    key={code}
                    type="button"
                    aria-pressed={lang === code}
                    onClick={() => setLang(code)}
                    className={
                        "min-h-11 px-3 uppercase transition-colors duration-150 " +
                        (lang === code ? "bg-text text-void" : "text-text-2 hover:text-holo")
                    }
                >
                    {code}
                </button>
            ))}
        </div>
    );
}

export function Nav() {
    const { lang } = useLang();
    const pathname = usePathname();
    const home = pathname === "/";
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!open) return;
        const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
        document.documentElement.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            document.documentElement.style.overflow = "";
            window.removeEventListener("keydown", onKey);
        };
    }, [open]);

    const href = (id: string) => (home ? `#${id}` : `/#${id}`);

    return (
        <header
            className={
                "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-200 " +
                (scrolled || open ? "border-line bg-void/80 backdrop-blur-md" : "border-transparent")
            }
        >
            <div className="wrap flex h-(--nav-h) items-center justify-between gap-6">
                <Link href={home ? "#" : "/"} aria-label={ui.nav.home[lang]} className="display text-xl leading-none">
                    BZ
                </Link>

                <nav aria-label={ui.nav.primary[lang]} className="hidden items-center gap-9 stage:flex">
                    {LINKS.map((link) => (
                        <a key={link.id} href={href(link.id)} className="link text-sm text-text-2">
                            {link.label[lang]}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <LangToggle />
                    <Link href="/cv" className="btn btn-quiet hidden min-h-11! px-4! stage:inline-flex">
                        CV
                    </Link>
                    <button
                        type="button"
                        aria-expanded={open}
                        aria-controls="menu"
                        aria-label={open ? ui.nav.close[lang] : ui.nav.menu[lang]}
                        onClick={() => setOpen((value) => !value)}
                        className="grid size-11 place-items-center border border-line text-text transition-transform duration-150 active:scale-95 stage:hidden"
                    >
                        {open ? <X className="size-5" /> : <Menu className="size-5" />}
                    </button>
                </div>
            </div>

            <div
                id="menu"
                inert={!open}
                className={
                    "fixed inset-x-0 top-(--nav-h) bottom-0 h-[calc(100dvh-var(--nav-h))] bg-void transition-opacity duration-200 stage:hidden " +
                    (open ? "opacity-100" : "pointer-events-none opacity-0")
                }
            >
                <nav aria-label={ui.nav.primary[lang]} className="wrap flex h-full flex-col justify-between py-10">
                    <ul className="flex flex-col gap-2">
                        {[...LINKS, { id: "cv", label: { es: "CV", en: "CV" } }].map((link, index) => (
                            <li
                                key={link.id}
                                style={{ transitionDelay: open ? `${60 + index * 40}ms` : "0ms" }}
                                className={
                                    "transition-opacity duration-300 ease-out " + (open ? "opacity-100" : "opacity-0")
                                }
                            >
                                {link.id === "cv" ? (
                                    <Link href="/cv" onClick={() => setOpen(false)} className="heading block py-2 text-4xl">
                                        CV
                                    </Link>
                                ) : (
                                    <a href={href(link.id)} onClick={() => setOpen(false)} className="heading block py-2 text-4xl">
                                        {link.label[lang]}
                                    </a>
                                )}
                            </li>
                        ))}
                    </ul>
                    <p className="text-sm text-text-3">Cali, CO · Naples, FL</p>
                </nav>
            </div>
        </header>
    );
}
