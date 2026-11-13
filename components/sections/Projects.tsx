"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Info, Maximize2 } from "lucide-react";
import { gsap, MOTION_OK, ScrollTrigger, STAGE, useGSAP } from "@/lib/gsap";
import { tuneField } from "@/lib/field";
import { useLang } from "@/lib/store";
import { projects, ui } from "@/lib/content";
import { scrollTo } from "@/components/providers/SmoothScroll";
import { Lightbox } from "@/components/ui/Lightbox";

const COUNT = projects.length;
const pad = (value: number) => String(value).padStart(2, "0");

// Every product is shown on the same plate, so nothing shifts between steps.
const PLATE = "stage:aspect-[16/10] stage:max-h-[calc(100svh-19.5rem)]";

export function Projects() {
    const root = useRef<HTMLElement>(null);
    const lang = useLang((state) => state.lang);
    const [active, setActive] = useState(0);
    const [staged, setStaged] = useState(false);
    const [shotOf, setShotOf] = useState<number[]>(() => projects.map(() => 0));
    const [lightbox, setLightbox] = useState<{ project: number; shot: number } | null>(null);
    const activeRef = useRef(0);
    const trigger = useRef<ScrollTrigger | null>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            const section = root.current;
            const stage = section?.querySelector<HTMLElement>(".js-stage");
            const articles = gsap.utils.toArray<HTMLElement>(".project", section);
            const progress = section?.querySelector<HTMLElement>(".js-progress");
            if (!section || !stage) return;

            const hueFor = (index: number) =>
                tuneField({
                    hue: projects[index].hue,
                    x: index % 2 ? -0.5 : 0.6,
                    y: index % 2 ? 0.2 : -0.15,
                    gain: 0.8,
                    density: 1.15,
                });

            // Pinned stage: one product per step, resolved by a scanning beam.
            mm.add(`${STAGE} and ${MOTION_OK}`, () => {
                setStaged(true);
                section.classList.add("is-stage");
                articles.forEach((article, index) => article.classList.toggle("is-active", index === activeRef.current));

                let running: gsap.core.Timeline | null = null;

                const show = (next: number, direction: number) => {
                    const previous = activeRef.current;
                    if (next === previous) return;
                    // A fast scroll can outrun the scan: finish the last one before starting the next.
                    running?.progress(1);
                    activeRef.current = next;
                    setActive(next);
                    hueFor(next);

                    const incoming = articles[next];
                    const outgoing = articles[previous];
                    const media = incoming.querySelector(".js-wipe");
                    const beam = incoming.querySelector<HTMLElement>(".js-beam");
                    const height = incoming.querySelector<HTMLElement>(".js-frame")?.offsetHeight ?? 0;
                    const down = direction >= 0;

                    incoming.classList.add("is-active");
                    gsap.set(incoming, { zIndex: 2 });
                    gsap.set(outgoing, { zIndex: 1 });

                    running = gsap.timeline({
                        onComplete: () => {
                            outgoing.classList.remove("is-active");
                            gsap.set([incoming, outgoing], { clearProps: "zIndex" });
                        },
                    });
                    running.to(outgoing.querySelectorAll(".js-t"), { autoAlpha: 0, duration: 0.15, ease: "power1.out" }, 0);
                    running.fromTo(
                        media,
                        { clipPath: down ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)" },
                        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.75, ease: "travel" },
                        0
                    );
                    running.fromTo(
                        beam,
                        { y: down ? 0 : height, autoAlpha: 1 },
                        { y: down ? height : 0, duration: 0.75, ease: "travel" },
                        0
                    );
                    running.to(beam, { autoAlpha: 0, duration: 0.2, ease: "power1.out" }, 0.7);
                    // The text resolves in place behind the beam; nothing slides.
                    running.fromTo(
                        incoming.querySelectorAll(".js-t"),
                        { autoAlpha: 0 },
                        { autoAlpha: 1, duration: 0.4, stagger: 0.05, ease: "power1.out" },
                        0.16
                    );
                };

                const pin = ScrollTrigger.create({
                    trigger: stage,
                    start: "top top",
                    end: () => `+=${(COUNT - 1) * window.innerHeight * 0.8}`,
                    pin: true,
                    anticipatePin: 1,
                    snap: { snapTo: 1 / (COUNT - 1), duration: { min: 0.2, max: 0.55 }, delay: 0.06, ease: "power2.out" },
                    onUpdate: (self) => {
                        show(Math.round(self.progress * (COUNT - 1)), self.direction);
                        if (progress) progress.style.transform = `scaleX(${self.progress})`;
                    },
                    onEnter: () => hueFor(activeRef.current),
                    onEnterBack: () => hueFor(activeRef.current),
                });
                trigger.current = pin;

                return () => {
                    running?.progress(1);
                    trigger.current = null;
                    section.classList.remove("is-stage");
                    articles.forEach((article) => article.classList.remove("is-active"));
                    gsap.set(section.querySelectorAll(".js-t, .js-wipe, .js-beam"), { clearProps: "all" });
                    setStaged(false);
                };
            });

            // The plate has depth: it turns a few degrees toward the pointer.
            mm.add(`${STAGE} and ${MOTION_OK} and (hover: hover) and (pointer: fine)`, () => {
                const frames = gsap.utils.toArray<HTMLElement>(".js-frame", section);
                gsap.set(frames, { transformPerspective: 1400, transformOrigin: "50% 50%" });
                const turnY = frames.map((frame) => gsap.quickTo(frame, "rotationY", { duration: 0.8, ease: "power3.out" }));
                const turnX = frames.map((frame) => gsap.quickTo(frame, "rotationX", { duration: 0.8, ease: "power3.out" }));
                const onMove = (event: PointerEvent) => {
                    const x = event.clientX / window.innerWidth - 0.5;
                    const y = event.clientY / window.innerHeight - 0.5;
                    turnY[activeRef.current]?.(x * 5);
                    turnX[activeRef.current]?.(y * -3.5);
                };
                const onLeave = () => {
                    turnY.forEach((turn) => turn(0));
                    turnX.forEach((turn) => turn(0));
                };
                stage.addEventListener("pointermove", onMove, { passive: true });
                stage.addEventListener("pointerleave", onLeave);
                return () => {
                    stage.removeEventListener("pointermove", onMove);
                    stage.removeEventListener("pointerleave", onLeave);
                    gsap.set(frames, { clearProps: "transform" });
                };
            });

            // Everywhere else the products are a plain list; the field still follows them.
            mm.add(`not all and ${STAGE}, (prefers-reduced-motion: reduce)`, () => {
                articles.forEach((article, index) => {
                    ScrollTrigger.create({
                        trigger: article,
                        start: "top 60%",
                        end: "bottom 40%",
                        onEnter: () => hueFor(index),
                        onEnterBack: () => hueFor(index),
                    });
                });
            });
        },
        { scope: root }
    );

    const goTo = useCallback((index: number) => {
        const pin = trigger.current;
        if (!pin) return;
        scrollTo(pin.start + (index / (COUNT - 1)) * (pin.end - pin.start));
    }, []);

    const setShot = (project: number, shot: number) =>
        setShotOf((current) => current.map((value, index) => (index === project ? shot : value)));

    const viewing = lightbox ? projects[lightbox.project] : null;

    return (
        <section ref={root} id="projects" className="projects relative scroll-mt-(--nav-h)" aria-labelledby="projects-title">
            <div className="js-stage relative stage:[.is-stage_&]:h-svh">
                <div className="wrap flex h-full flex-col pt-24 pb-20 stage:[.is-stage_&]:pt-[calc(var(--nav-h)+1.25rem)] stage:[.is-stage_&]:pb-8">
                    <header className="flex flex-none items-end justify-between gap-8">
                        <h2
                            id="projects-title"
                            className="heading text-[clamp(2.5rem,4.6vw,4.25rem)] stage:[.is-stage_&]:text-[clamp(1.75rem,2.3vw,2.25rem)]"
                        >
                            {ui.projects.title[lang]}
                        </h2>

                        {staged && (
                            <ol className="data flex items-center gap-1" aria-label={ui.projects.index[lang]}>
                                {projects.map((project, index) => (
                                    <li key={project.slug}>
                                        <button
                                            type="button"
                                            onClick={() => goTo(index)}
                                            aria-current={index === active ? "true" : undefined}
                                            className={
                                                "flex min-h-11 items-center gap-2 px-2.5 transition-colors duration-150 " +
                                                (index === active ? "text-holo" : "text-text-3 hover:text-text")
                                            }
                                        >
                                            <span>{pad(index + 1)}</span>
                                            {index === active && <span className="font-sans text-sm font-semibold text-text">{project.name}</span>}
                                            <span className="sr-only">{index === active ? "" : project.name}</span>
                                        </button>
                                    </li>
                                ))}
                            </ol>
                        )}
                    </header>

                    <div className="mt-5 h-px flex-none bg-void-3" aria-hidden="true">
                        <div className="js-progress h-px origin-left scale-x-0 bg-holo" />
                    </div>

                    <div className="project-list mt-12 flex min-h-0 flex-1 flex-col gap-24 stage:mt-10 stage:[.is-stage_&]:gap-0">
                        {projects.map((project, index) => {
                            const shot = project.shots[shotOf[index]];
                            // Wider captures are cropped to the plate, keeping the side that carries the subject.
                            const anchor = shot.keep === "right" ? "object-right-top" : "object-left-top";
                            return (
                                <article
                                    key={project.slug}
                                    className="project grid min-h-0 content-start gap-x-10 gap-y-6 stage:grid-cols-12 stage:grid-rows-[auto_1fr]"
                                    aria-labelledby={`project-${project.slug}`}
                                >
                                    <div className="flex flex-col gap-4 stage:col-span-4 stage:row-start-1">
                                        <h3 id={`project-${project.slug}`} className="js-t heading text-[clamp(2rem,3.3vw,3rem)]">
                                            {project.name}
                                        </h3>
                                        <p className="js-t text-sm font-semibold text-sodium [font-variation-settings:'wdth'_112]">
                                            {project.kind[lang]} · {project.year}
                                        </p>
                                        <p className="js-t max-w-[46ch] text-[1.0625rem] leading-relaxed text-text-2">{project.line[lang]}</p>
                                    </div>

                                    <div className="flex flex-col gap-5 max-stage:order-3 stage:col-span-4 stage:row-start-2">
                                        <ul className="js-t grid border-y border-line">
                                            {project.features.map((feature, featureIndex) => (
                                                <li
                                                    key={feature.en}
                                                    className={
                                                        "flex items-center gap-3 py-2.5 text-[0.9375rem] text-text " +
                                                        (featureIndex > 0 ? "border-t border-line/60" : "")
                                                    }
                                                >
                                                    <span aria-hidden="true" className="neon-dot" />
                                                    {feature[lang]}
                                                </li>
                                            ))}
                                        </ul>

                                        <dl className="js-t grid gap-2 text-sm text-text-2">
                                            {project.role && (
                                                <div className="flex gap-3">
                                                    <dt className="w-12 flex-none text-text-3">{ui.projects.role[lang]}</dt>
                                                    <dd>{project.role[lang]}</dd>
                                                </div>
                                            )}
                                            <div className="flex gap-3">
                                                <dt className="w-12 flex-none text-text-3">Stack</dt>
                                                <dd className="data pt-0.5">{project.stack.join(" · ")}</dd>
                                            </div>
                                        </dl>

                                        <div className="js-t flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
                                            {project.links.map((link) => (
                                                <a
                                                    key={link.href}
                                                    href={link.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="link text-sm font-semibold"
                                                >
                                                    {link.label[lang]}
                                                    <ArrowUpRight />
                                                </a>
                                            ))}
                                            {project.note && (
                                                <p className="flex items-center gap-2 text-[0.8125rem] text-text-3">
                                                    <Info className="size-3.5" aria-hidden="true" />
                                                    {project.note[lang]}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="max-stage:order-2 stage:col-span-8 stage:col-start-5 stage:row-span-2 stage:row-start-1">
                                        <div className="js-frame slate slate-ticks relative">
                                            <div className="js-wipe">
                                                {project.device === "phone" ? (
                                                    <div
                                                        className={
                                                            "grid auto-cols-[58%] grid-flow-col gap-3 overflow-x-auto p-3 stage:flex stage:justify-center stage:gap-5 stage:overflow-hidden stage:p-5 " +
                                                            PLATE
                                                        }
                                                        style={{ scrollbarWidth: "none" }}
                                                    >
                                                        {project.shots.slice(0, 4).map((phone, phoneIndex) => (
                                                            <button
                                                                key={phone.src}
                                                                type="button"
                                                                onClick={() => setLightbox({ project: index, shot: phoneIndex })}
                                                                aria-label={`${ui.projects.enlarge[lang]}: ${phone.alt[lang]}`}
                                                                className={
                                                                    "relative block cursor-zoom-in overflow-hidden outline outline-1 -outline-offset-1 outline-line transition-[outline-color,transform] duration-200 ease-out-strong hover:outline-holo active:scale-[0.99] stage:h-full stage:flex-none " +
                                                                    (phoneIndex === 3 ? "stage:hidden" : "")
                                                                }
                                                            >
                                                                <Image
                                                                    src={phone.src}
                                                                    alt={phone.alt[lang]}
                                                                    width={phone.width}
                                                                    height={phone.height}
                                                                    sizes="(min-width: 64rem) 18vw, 58vw"
                                                                    className="h-auto w-full stage:h-full stage:w-auto"
                                                                />
                                                            </button>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() => setLightbox({ project: index, shot: shotOf[index] })}
                                                        aria-label={`${ui.projects.enlarge[lang]}: ${shot.alt[lang]}`}
                                                        className={"group block aspect-[16/10] w-full cursor-zoom-in overflow-hidden " + PLATE}
                                                    >
                                                        <Image
                                                            key={shot.src}
                                                            src={shot.src}
                                                            alt={shot.alt[lang]}
                                                            width={shot.width}
                                                            height={shot.height}
                                                            sizes="(min-width: 64rem) 62vw, 100vw"
                                                            quality={90}
                                                            priority={index === 0}
                                                            className={
                                                                "shot-swap h-full w-full origin-top transition-transform duration-500 ease-out-strong group-hover:scale-[1.015] " +
                                                                "object-cover " +
                                                                anchor
                                                            }
                                                        />
                                                    </button>
                                                )}
                                            </div>
                                            <span className="neon-edge" aria-hidden="true" />
                                            <span className="js-beam beam" aria-hidden="true" />
                                        </div>

                                        <div className="mt-4 flex h-14 items-center">
                                            {project.device === "desktop" ? (
                                                <ul
                                                    className="flex gap-2 overflow-x-auto"
                                                    style={{ scrollbarWidth: "none" }}
                                                    aria-label={ui.projects.screens[lang]}
                                                >
                                                    {project.shots.map((thumb, thumbIndex) => (
                                                        <li key={thumb.src} className="flex-none">
                                                            <button
                                                                type="button"
                                                                onClick={() => setShot(index, thumbIndex)}
                                                                aria-current={thumbIndex === shotOf[index] ? "true" : undefined}
                                                                aria-label={thumb.alt[lang]}
                                                                className="thumb block"
                                                            >
                                                                <Image
                                                                    src={thumb.src}
                                                                    alt=""
                                                                    width={thumb.width}
                                                                    height={thumb.height}
                                                                    sizes="96px"
                                                                    className="h-14 w-[5.6rem] object-cover object-top"
                                                                />
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => setLightbox({ project: index, shot: 0 })}
                                                    className="link text-sm font-semibold"
                                                >
                                                    {ui.projects.allScreens[lang].replace("{n}", String(project.shots.length))}
                                                    <Maximize2 />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>

            <Lightbox
                title={viewing?.name ?? ""}
                shots={viewing?.shots ?? []}
                index={lightbox ? lightbox.shot : null}
                lang={lang}
                onIndex={(shot) => setLightbox((current) => (current ? { ...current, shot } : current))}
                onClose={() => setLightbox(null)}
            />
        </section>
    );
}
