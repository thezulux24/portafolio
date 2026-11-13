"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { tuneField } from "@/lib/field";
import { HUES } from "@/lib/scene";
import { useLang } from "@/lib/store";
import { stack, ui } from "@/lib/content";
import { BrandIcon, brandColor } from "@/components/ui/BrandIcon";

export function Stack() {
    const root = useRef<HTMLElement>(null);
    const lang = useLang((state) => state.lang);

    useGSAP(
        () => {
            const tune = () => tuneField({ hue: HUES.lime, x: 0.7, y: 0.25, gain: 0.7, density: 1.3 });
            ScrollTrigger.create({ trigger: root.current, start: "top 55%", end: "bottom 45%", onEnter: tune, onEnterBack: tune });

            const mm = gsap.matchMedia();
            mm.add(MOTION_OK, () => {
                // The four groups resolve in order, once.
                gsap.from(".js-group", {
                    autoAlpha: 0,
                    duration: 0.45,
                    stagger: 0.09,
                    ease: "power1.out",
                    scrollTrigger: { trigger: root.current, start: "top 68%", once: true },
                });
            });
        },
        { scope: root }
    );

    return (
        <section ref={root} id="stack" aria-labelledby="stack-title" className="relative scroll-mt-(--nav-h) pt-24 pb-16 stage:pt-32 stage:pb-20">
            <div className="wrap">
                <h2 id="stack-title" className="heading text-[clamp(2.5rem,4.6vw,4.25rem)]">
                    {ui.stack.title[lang]}
                </h2>

                <div className="mt-12 border-b border-line">
                    {stack.map((group) => (
                        <div key={group.title.en} className="js-group grid gap-4 border-t border-line py-6 stage:grid-cols-12 stage:gap-10 stage:py-7">
                            <div className="grid content-start gap-2 stage:col-span-5">
                                <h3 className="text-lg font-semibold leading-tight text-sodium [font-variation-settings:'wdth'_112]">{group.title[lang]}</h3>
                                <p className="max-w-[46ch] text-[0.9375rem] leading-relaxed text-text-2">{group.line[lang]}</p>
                            </div>
                            <ul className="flex flex-wrap content-start gap-2 stage:col-span-7">
                                {group.items.map((item) => (
                                    <li
                                        key={item.name}
                                        className="chip"
                                        style={item.icon ? ({ "--brand": brandColor(item.icon) } as React.CSSProperties) : undefined}
                                    >
                                        {item.icon && <BrandIcon icon={item.icon} />}
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
