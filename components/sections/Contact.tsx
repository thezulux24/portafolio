"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { tuneField } from "@/lib/field";
import { HUES } from "@/lib/scene";
import { useLang } from "@/lib/store";
import { contact, ui } from "@/lib/content";

const HoloGlobe = dynamic(() => import("@/components/gl/HoloGlobe"), { ssr: false });

export function Contact() {
    const root = useRef<HTMLElement>(null);
    const lang = useLang((state) => state.lang);
    const [copied, setCopied] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useGSAP(
        () => {
            const tune = () => tuneField({ hue: HUES.flare, x: 0.35, y: 0.0, gain: 1.1, density: 0.8 });
            ScrollTrigger.create({ trigger: root.current, start: "top 55%", onEnter: tune, onEnterBack: tune });

            // The sign lights when it comes into view; with reduced motion it is simply on.
            const title = root.current?.querySelector(".js-title");
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                title?.classList.add("is-lit");
            } else {
                ScrollTrigger.create({
                    trigger: root.current,
                    start: "top 62%",
                    once: true,
                    onEnter: () => title?.classList.add("is-lit"),
                });
            }
        },
        { scope: root }
    );

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(contact.email);
            setCopied(true);
            if (timer.current) clearTimeout(timer.current);
            timer.current = setTimeout(() => setCopied(false), 1800);
        } catch {
            window.location.href = `mailto:${contact.email}`;
        }
    };

    return (
        <section
            ref={root}
            id="contact"
            aria-labelledby="contact-title"
            className="relative flex min-h-svh scroll-mt-(--nav-h) flex-col overflow-clip pt-20 stage:pt-24"
        >
            <div className="wrap relative flex flex-1 flex-col">
                <HoloGlobe className="pointer-events-none absolute top-[13svh] right-0 size-[min(72vw,22rem)] stage:top-1/2 stage:right-0 stage:size-[min(46vw,76svh,42rem)] stage:-translate-y-[52%]" />

                <h2
                    id="contact-title"
                    className={"js-title neon-sign display " + (lang === "es" ? "text-[11.2vw] stage:text-[min(11.3vw,25svh,10.75rem)]" : "text-[19vw] stage:text-[min(13.2vw,25svh,12.5rem)]")}
                    aria-label={ui.contact.title[lang].join(" ")}>
                    {ui.contact.title[lang].map((line) => (
                        <span key={line} className="block pb-[0.04em] not-first:-mt-[0.04em]" aria-hidden="true">
                            {line}
                        </span>
                    ))}
                </h2>

                <div className="mt-auto flex max-w-xl flex-col gap-6 pt-[42svh] pb-12 stage:pt-10 stage:pb-16">
                    <p className="text-lg leading-snug text-text stage:text-[1.375rem]">{ui.contact.line[lang]}</p>

                    <div className="flex flex-wrap gap-3">
                        <button type="button" onClick={copy} className="btn btn-primary max-stage:flex-1 normal-case! tracking-normal!">
                            <span className="grid">
                                <span
                                    className={
                                        "col-start-1 row-start-1 transition-[opacity,filter] duration-200 " +
                                        (copied ? "opacity-0 blur-[2px]" : "opacity-100")
                                    }
                                >
                                    {contact.email}
                                </span>
                                <span
                                    aria-hidden={!copied}
                                    className={
                                        "col-start-1 row-start-1 transition-[opacity,filter] duration-200 " +
                                        (copied ? "opacity-100" : "opacity-0 blur-[2px]")
                                    }
                                >
                                    {ui.contact.copied[lang]}
                                </span>
                            </span>
                            {copied ? <Check /> : <Copy />}
                            <span className="sr-only" role="status">
                                {copied ? ui.contact.copied[lang] : ""}
                            </span>
                        </button>
                        <a href={`mailto:${contact.email}`} className="btn btn-quiet max-stage:flex-1">
                            {ui.contact.write[lang]}
                            <ArrowUpRight />
                        </a>
                    </div>

                    <ul className="flex flex-wrap gap-x-7 gap-y-3 pt-2">
                        {contact.links.map((link) => (
                            <li key={link.href}>
                                {link.href.startsWith("/") ? (
                                    <Link href={link.href} className="link text-sm font-semibold">
                                        {link.label}
                                        <ArrowUpRight />
                                    </Link>
                                ) : (
                                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="link text-sm font-semibold">
                                        {link.label}
                                        <ArrowUpRight />
                                    </a>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <footer className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line py-5 text-[0.8125rem] text-text-3">
                    <p>© 2026 Brayan Zuluaga</p>
                    <p>Cali, CO · Naples, FL</p>
                </footer>
            </div>
        </section>
    );
}
