"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { tuneField } from "@/lib/field";
import { HUES } from "@/lib/scene";
import { useLang } from "@/lib/store";
import { experience, ui } from "@/lib/content";

export function Experience() {
    const root = useRef<HTMLElement>(null);
    const lang = useLang((state) => state.lang);

    useGSAP(
        () => {
            const tune = () => tuneField({ hue: HUES.sodium, x: -0.62, y: -0.1, gain: 0.7, density: 0.9 });
            ScrollTrigger.create({ trigger: root.current, start: "top 55%", end: "bottom 45%", onEnter: tune, onEnterBack: tune });

            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                // One beam reads down the list; each row resolves as it passes.
                const list = root.current?.querySelector<HTMLElement>(".js-roles");
                const rows = gsap.utils.toArray<HTMLElement>(".js-row", root.current);
                if (!list) return;
                const scan = gsap.timeline({ scrollTrigger: { trigger: list, start: "top 78%", once: true } });
                scan.fromTo(
                    ".js-beam",
                    { y: 0, autoAlpha: 1 },
                    { y: () => list.offsetHeight, duration: 1.1, ease: "power1.inOut" },
                    0
                );
                scan.to(".js-beam", { autoAlpha: 0, duration: 0.2 }, 1);
                rows.forEach((row) => {
                    const at = (row.offsetTop / Math.max(1, list.offsetHeight)) * 1.1;
                    scan.from(row, { autoAlpha: 0, duration: 0.35, ease: "power1.out" }, at);
                });
            });
        },
        { scope: root }
    );

    return (
        <section
            ref={root}
            id="experience"
            aria-labelledby="experience-title"
            className="relative scroll-mt-(--nav-h) py-24 stage:py-32"
        >
            <div className="wrap grid gap-12 stage:grid-cols-12 stage:gap-10">
                <div className="flex flex-col gap-8 stage:col-span-5">
                    <h2 id="experience-title" className="heading text-[clamp(2.5rem,4.6vw,4.25rem)]">
                        {ui.experience.title[lang]}
                    </h2>
                    <p className="max-w-[30ch] text-2xl leading-snug text-text stage:text-[1.75rem]">
                        {experience.statement[lang]}
                    </p>
                    <dl className="mt-auto grid gap-4 text-[0.9375rem] text-text-2">
                        <div className="grid gap-1">
                            <dt className="text-[0.8125rem] text-text-3">{ui.experience.education[lang]}</dt>
                            <dd className="max-w-[44ch]">{experience.education[lang]}</dd>
                        </div>
                        <div className="grid gap-1">
                            <dt className="text-[0.8125rem] text-text-3">{ui.experience.languages[lang]}</dt>
                            <dd>{experience.languages[lang]}</dd>
                        </div>
                    </dl>
                </div>

                <div className="js-roles relative stage:col-span-7">
                    <span className="js-beam beam" aria-hidden="true" />
                    <ol className="border-b border-line">
                        {experience.roles.map((role) => (
                            <li
                                key={role.company}
                                className="js-row role-row grid gap-x-6 gap-y-1 border-t border-line py-5 sm:grid-cols-[9.5rem_1fr]"
                            >
                                <p className="data flex items-start gap-2 pt-1 text-text-3">
                                    <span
                                        aria-hidden="true"
                                        className={"mt-[0.4em] size-1.5 flex-none " + (role.current ? "bg-holo" : "bg-void-3")}
                                    />
                                    {role.period[lang]}
                                </p>
                                <div className="grid gap-1">
                                    <h3 className="text-lg font-semibold leading-tight text-text [font-variation-settings:'wdth'_112]">
                                        {role.company}
                                    </h3>
                                    <p className="text-sm text-holo">{role.title[lang]}</p>
                                    <p className="max-w-[58ch] text-[0.9375rem] text-text-2">{role.line[lang]}</p>
                                    {role.points && (
                                        <ul className="mt-1 grid gap-1">
                                            {role.points.map((point) => (
                                                <li key={point.en} className="flex gap-2.5 text-sm text-text-3">
                                                    <span aria-hidden="true" className="mt-[0.6em] h-px w-2.5 flex-none bg-holo" />
                                                    {point[lang]}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}
