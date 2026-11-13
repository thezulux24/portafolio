"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { tuneField } from "@/lib/field";
import { HUES, portrait } from "@/lib/scene";
import { useIntro, useLang } from "@/lib/store";
import { hero } from "@/lib/content";

const HoloPortrait = dynamic(() => import("@/components/gl/HoloPortrait"), { ssr: false });

export function Hero() {
    const root = useRef<HTMLElement>(null);
    const lang = useLang((state) => state.lang);
    const ready = useIntro((state) => state.ready);

    // Hold everything unresolved while the preloader is up.
    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                gsap.set(".js-name", { clipPath: "inset(100% 0% 0% 0%)" });
                gsap.set(".js-resolve", { autoAlpha: 0 });
                // Failsafe: whatever happens to the intro, the name and its copy are on screen by 6 s.
                const failsafe = window.setTimeout(() => {
                    gsap.set(".js-name", { clearProps: "clipPath" });
                    gsap.set(".js-resolve", { autoAlpha: 1 });
                }, 6000);
                return () => window.clearTimeout(failsafe);
            });
        },
        { scope: root }
    );

    useGSAP(
        () => {
            if (!ready) return;
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: reduce)", () => {
                portrait.formed = 1;
                portrait.reveal = 1.1;
            });

            mm.add(MOTION_OK, () => {
                // The figure converges out of points, then a scan resolves it; the name lands under it.
                const intro = gsap.timeline();
                intro.to(portrait, { formed: 1, duration: 1.7, ease: "power2.out" }, 0);
                intro.to(portrait, { reveal: 1.1, duration: 1.35, ease: "power1.inOut" }, 0.75);
                const title = root.current?.querySelector<HTMLElement>(".js-name");
                intro.to(".js-name", { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "travel" }, 0.15);
                // Release the clip once the scan is done, so nothing can ever cut the letters.
                intro.set(".js-name", { clearProps: "clipPath" }, 1.3);
                intro.fromTo(
                    ".js-name-beam",
                    { y: () => title?.offsetHeight ?? 0, autoAlpha: 1 },
                    { y: 0, duration: 1.1, ease: "travel" },
                    0.15
                );
                intro.to(".js-name-beam", { autoAlpha: 0, duration: 0.2, ease: "power1.out" }, 1.2);
                intro.to(".js-resolve", { autoAlpha: 1, duration: 0.5, stagger: 0.08, ease: "power1.out" }, 0.8);
                intro.to(
                    ".js-decode",
                    { duration: 0.9, scrambleText: { text: "{original}", chars: "01/<>_", speed: 0.6 }, ease: "none" },
                    0.85
                );

                // Scrolling away breaks the figure back into light.
                ScrollTrigger.create({
                    trigger: root.current,
                    start: "top top",
                    end: "bottom 35%",
                    scrub: 0.4,
                    onUpdate: (self) => {
                        portrait.dissolve = gsap.utils.clamp(0, 1, (self.progress - 0.12) / 0.8);
                    },
                });

                // The foil band on the name follows the pointer.
                const name = root.current?.querySelector<HTMLElement>(".js-name");
                const onMove = (event: PointerEvent) => {
                    if (!name || event.pointerType === "touch") return;
                    const x = 75 - (event.clientX / window.innerWidth) * 50;
                    gsap.to(name, { "--foil-x": `${x}%`, duration: 0.7, ease: "power2.out", overwrite: true });
                };
                window.addEventListener("pointermove", onMove, { passive: true });
                return () => window.removeEventListener("pointermove", onMove);
            });

            ScrollTrigger.create({
                trigger: root.current,
                start: "top bottom",
                end: "bottom 40%",
                onEnter: () => tuneField({ hue: HUES.holo, x: 0.55, y: 0.05, gain: 1, density: 1 }),
                onEnterBack: () => tuneField({ hue: HUES.holo, x: 0.55, y: 0.05, gain: 1, density: 1 }),
            });
        },
        { scope: root, dependencies: [ready] }
    );

    return (
        <section ref={root} id="top" className="hero relative min-h-svh overflow-clip">
            <div className="wrap relative flex min-h-svh flex-col pt-(--nav-h) pb-8 stage:pb-14">
                <div className="relative z-10 mt-[clamp(1rem,5svh,4rem)]">
                    <h1 aria-label="Brayan Zuluaga" className="js-name display text-[14.1vw] stage:text-[calc(var(--u)*12.6)]">
                        {["Brayan", "Zuluaga"].map((word, index) => (
                            <span key={word} className={"foil-line block pb-[0.04em] " + (index ? "-mt-[0.04em]" : "")} aria-hidden="true">
                                {word}
                                <span className="foil-text">{word}</span>
                            </span>
                        ))}
                    </h1>
                    <span className="js-name-beam beam" aria-hidden="true" />
                </div>

                {/* Name and figure share one unit (--u), capped where the content column stops growing,
                    so on any screen the head lands on the last letter without passing its apex. */}
                <HoloPortrait className="relative z-20 mx-auto -mt-[7vw] h-[38svh] w-[min(100%,24rem)] stage:absolute stage:right-[calc(var(--u)*-12.3)] stage:bottom-0 stage:mt-0 stage:h-[calc(var(--u)*48)] stage:w-[calc(var(--u)*54)]" />

                <div className="relative z-30 mt-6 flex max-w-xl flex-col gap-6 stage:mt-auto">
                    <p className="js-resolve text-lg leading-snug text-text stage:text-[1.375rem]">{hero.line[lang]}</p>
                    <dl className="js-resolve grid gap-1.5 text-sm text-text-2">
                        <div className="flex gap-3">
                            <dt className="w-12 text-text-3">{hero.baseLabel[lang]}</dt>
                            <dd className="js-decode data pt-0.5">{hero.base[lang]}</dd>
                        </div>
                        <div className="flex gap-3">
                            <dt className="w-12 text-text-3">{hero.nowLabel[lang]}</dt>
                            <dd>{hero.now}</dd>
                        </div>
                        <div className="flex gap-3">
                            <dt className="w-12 text-text-3">{hero.focusLabel[lang]}</dt>
                            <dd>{hero.focus[lang]}</dd>
                        </div>
                    </dl>
                    <div className="js-resolve flex flex-wrap gap-3">
                        <a href="#projects" className="btn btn-primary max-stage:flex-1">
                            {hero.cta[lang]}
                            <ArrowDown className="icon-down" />
                        </a>
                        <Link href="/cv" className="btn btn-quiet max-stage:flex-1">
                            {hero.cv[lang]}
                            <ArrowUpRight />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
