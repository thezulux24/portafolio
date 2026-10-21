"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { animate } from "animejs";
import { ArrowUpRight, ChevronLeft, ChevronRight, Lock, Sparkles } from "lucide-react";
import { useLanguageStore } from "@/lib/store";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Magnetic } from "@/components/ui/Magnetic";
import { Tilt } from "@/components/ui/Tilt";
import { PrivateProjectModal } from "@/components/ui/PrivateProjectModal";
import { ProjectGalleryModal, type GalleryImage } from "@/components/ui/ProjectGalleryModal";
import { cn } from "@/lib/utils";

const KNOWTEN_GALLERY_IMAGES: GalleryImage[] = [
    { src: "/images/Knowten/live-synora-docked.png", alt: "Knowten Suite — Radar Competitivo y Agente IA Synora (Ctrl+J) con trazas de herramientas", width: 1920, height: 1000 },
    { src: "/images/Knowten/live-3-radar-environment.png", alt: "Knowten Suite — Mapa del Entorno PESTEL Voronoi y Rosa PESTEL", width: 1920, height: 1000 },
    { src: "/images/Knowten/live-5-radar-brief.png", alt: "Knowten Suite — Brief Ejecutivo redactado con IA y verificado por factId", width: 1920, height: 1000 },
    { src: "/images/Knowten/live-4-radar-pulse.png", alt: "Knowten Suite — Pulso Corporativo y Retos de Innovación por Industria", width: 1920, height: 1000 },
    { src: "/images/Knowten/live-tools.png", alt: "Knowten Suite — Estudio de Extracción Cloud con 49 Scrapers Activos", width: 1920, height: 1000 },
    { src: "/images/Knowten/live-mentions.png", alt: "Knowten Suite — Explorador de Menciones con Postura y Frase Sustentada por IA", width: 1920, height: 1000 },
    { src: "/images/Knowten/live-developer-api.png", alt: "Knowten Suite — API Pública /v1 (kt_live_...) y Webhooks HMAC-SHA256", width: 1920, height: 1000 },
    { src: "/images/Knowten/live-8-admin-console.png", alt: "Knowten Suite — Centro de Control Admin y Telemetría SaaS Multi-Tenant", width: 1920, height: 1000 },
];

/** Maps each of the 4 core Knowten features to its primary screenshot */
const FEATURE_IMAGE_MAP = [0, 1, 2, 4];

const SHOWCASE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Feature {
    title: string;
    badge?: string;
    description: string;
    imageIndex: number;
}

function DesktopFeatureBlock({
    feature,
    index,
    isActive,
    onActivate,
}: {
    feature: Feature;
    index: number;
    isActive: boolean;
    onActivate: () => void;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { margin: "-42% 0px -42% 0px" });

    useEffect(() => {
        if (inView) onActivate();
    }, [inView, onActivate]);

    return (
        <div
            ref={ref}
            onMouseEnter={onActivate}
            className={cn(
                "group cursor-pointer border-t border-bone/10 py-8 transition-all duration-300 last:border-b",
                isActive ? "opacity-100" : "opacity-40 hover:opacity-80"
            )}
        >
            <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-acid">
                    0{index + 1}
                </span>
                {feature.badge && (
                    <span className="rounded-sm border border-acid/30 bg-acid/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-acid">
                        {feature.badge}
                    </span>
                )}
            </div>
            <h3 className="mt-2.5 font-display text-2xl font-bold tracking-tight transition-colors group-hover:text-acid">
                {feature.title}
            </h3>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-bone/65">
                {feature.description}
            </p>
        </div>
    );
}

export function Works() {
    const { t } = useLanguageStore();
    const [privateModalProject, setPrivateModalProject] = useState<string | null>(null);
    const [showGalleryModal, setShowGalleryModal] = useState(false);
    const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);
    const [activeFeatureIdx, setActiveFeatureIdx] = useState(0);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const mobileCardRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef<number | null>(null);

    const project = {
        title: t.projects.knowten.title,
        subtitle: t.projects.knowten.subtitle,
        description: t.projects.knowten.description,
        role: t.projects.knowten.role,
        year: t.projects.knowten.year,
        stack: [
            "Next.js 16",
            "NestJS 11",
            "PostgreSQL 16",
            "Prisma 7",
            "Claude 5.5",
            "Apify",
            "Docker",
        ],
        links: [
            { label: t.projects.live, href: "https://app.knowten.info" },
            { label: t.projects.apifyStore, href: "https://apify.com/knowten" },
            { label: t.projects.code, locked: true as const },
        ],
    };

    const features: Feature[] = t.projects.knowten.features.map((feature, index) => ({
        ...feature,
        imageIndex: FEATURE_IMAGE_MAP[index % FEATURE_IMAGE_MAP.length],
    }));

    const selectFeature = (idx: number) => {
        const wrapped = ((idx % features.length) + features.length) % features.length;
        setActiveFeatureIdx(wrapped);
        setActiveImageIndex(features[wrapped].imageIndex);
        if (mobileCardRef.current) {
            animate(mobileCardRef.current, {
                opacity: [0.45, 1],
                translateY: [8, 0],
                duration: 340,
                ease: "out(3)",
            });
        }
    };

    const openGallery = (imageIndex: number) => {
        setGalleryInitialIndex(imageIndex);
        setShowGalleryModal(true);
    };

    const total = KNOWTEN_GALLERY_IMAGES.length;
    const currentMobileFeature = features[activeFeatureIdx] ?? features[0];

    return (
        <section id="projects" className="relative bg-ink px-5 py-20 md:px-10 md:py-32">
            <SectionHeading index={t.projects.index} label={t.projects.label} />

            <div className="mt-10 mb-12 flex flex-wrap items-end justify-between gap-4 md:mt-14 md:mb-14">
                <h2 className="font-display text-[clamp(2.4rem,8.5vw,7.5rem)] font-extrabold uppercase leading-[0.9] tracking-tight">
                    <span className="text-outline">{t.projects.title}</span>
                    <span className="text-acid">.</span>
                </h2>
                <p className="pb-2 font-mono text-[11px] uppercase tracking-[0.26em] text-bone/45">
                    SaaS · AI Agents · Data
                </p>
            </div>

            {/* 01: Flagship Project Header (Knowten Suite) */}
            <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: SHOWCASE_EASE }}
                className="border-t border-bone/10 pt-8"
            >
                <div className="flex flex-wrap items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="font-display text-5xl font-extrabold text-outline-faint md:text-6xl">
                                01
                            </span>
                            <span className="rounded-full border border-acid/35 bg-acid/10 px-3 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-acid">
                                {t.projects.featured}
                            </span>
                        </div>
                        <h3 className="mt-2 font-display text-[clamp(1.9rem,5vw,4rem)] font-extrabold uppercase leading-[0.95] tracking-tight">
                            {project.title}
                        </h3>
                        <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-acid/85">
                            {project.subtitle}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 pb-1">
                        {project.links.map((link) => {
                            const content = (
                                <span className="group/link inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-bone transition-colors hover:text-acid">
                                    {link.locked && <Lock className="h-3 w-3 text-acid" />}
                                    <span className="link-sweep">{link.label}</span>
                                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                                </span>
                            );

                            return (
                                <Magnetic key={link.label} strength={0.2}>
                                    {link.locked ? (
                                        <button
                                            type="button"
                                            onClick={() => setPrivateModalProject(project.title)}
                                        >
                                            {content}
                                        </button>
                                    ) : (
                                        <a href={link.href} target="_blank" rel="noopener noreferrer">
                                            {content}
                                        </a>
                                    )}
                                </Magnetic>
                            );
                        })}
                    </div>
                </div>

                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-bone/70 md:text-base">
                    {project.description}
                </p>

                {/* Compact 4-Metric Strip */}
                <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4 md:gap-3">
                    {t.projects.knowten.stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-xl border border-bone/10 bg-secondary/40 px-3.5 py-3"
                        >
                            <div className="font-display text-xl font-extrabold text-acid md:text-2xl">
                                {stat.value}
                            </div>
                            <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-bone/55">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* MOBILE INTERACTIVE APP DECK (Swipeable & Tap-Driven, Zero Clutter) */}
            <div className="mt-8 lg:hidden">
                <div
                    onTouchStart={(e) => {
                        touchStartX.current = e.touches[0]?.clientX ?? null;
                    }}
                    onTouchEnd={(e) => {
                        if (touchStartX.current === null) return;
                        const deltaX = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
                        if (Math.abs(deltaX) > 42) {
                            selectFeature(deltaX < 0 ? activeFeatureIdx + 1 : activeFeatureIdx - 1);
                        }
                        touchStartX.current = null;
                    }}
                    className="overflow-hidden rounded-2xl border border-bone/15 bg-secondary/45 p-4"
                >
                    {/* Top step pills + Prev/Next */}
                    <div className="mb-3 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                            {features.map((f, idx) => (
                                <button
                                    key={f.title}
                                    type="button"
                                    onClick={() => selectFeature(idx)}
                                    className={cn(
                                        "rounded-full px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] transition-all",
                                        idx === activeFeatureIdx
                                            ? "bg-acid text-ink shadow-[0_0_12px_rgba(200,243,29,0.4)]"
                                            : "border border-bone/15 bg-ink/50 text-bone/60"
                                    )}
                                >
                                    0{idx + 1}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-1.5">
                            <button
                                type="button"
                                aria-label={t.projects.gallery.previous}
                                onClick={() => selectFeature(activeFeatureIdx - 1)}
                                className="flex h-7 w-7 items-center justify-center rounded-full border border-bone/15 bg-ink/60 text-bone/80 active:border-acid active:text-acid"
                            >
                                <ChevronLeft className="h-3.5 w-3.5" />
                            </button>
                            <button
                                type="button"
                                aria-label={t.projects.gallery.next}
                                onClick={() => selectFeature(activeFeatureIdx + 1)}
                                className="flex h-7 w-7 items-center justify-center rounded-full border border-bone/15 bg-ink/60 text-bone/80 active:border-acid active:text-acid"
                            >
                                <ChevronRight className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    </div>

                    {/* Pre-mounted GPU screenshot stack */}
                    <button
                        type="button"
                        onClick={() => openGallery(activeImageIndex)}
                        className="relative block aspect-[16/10] w-full overflow-hidden rounded-xl border border-bone/10 bg-ink"
                    >
                        {KNOWTEN_GALLERY_IMAGES.map((img, idx) => (
                            <div
                                key={img.src}
                                className={cn(
                                    "absolute inset-0 transition-opacity duration-300",
                                    idx === activeImageIndex ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"
                                )}
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    quality={90}
                                    sizes="100vw"
                                    className="object-cover"
                                />
                            </div>
                        ))}
                        <span className="pointer-events-none absolute bottom-2.5 right-3 z-20 rounded-full bg-ink/85 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-acid backdrop-blur-sm">
                            {t.projects.gallery.open} ↗
                        </span>
                    </button>

                    {/* Mobile 8-thumbnail quick selector */}
                    <div className="mt-2.5 grid grid-cols-8 gap-1.5">
                        {KNOWTEN_GALLERY_IMAGES.map((image, imageIndex) => (
                            <button
                                key={image.src}
                                type="button"
                                aria-label={`${t.projects.gallery.open} ${imageIndex + 1}`}
                                onClick={() => setActiveImageIndex(imageIndex)}
                                className={cn(
                                    "relative aspect-[4/3] overflow-hidden rounded border transition-all",
                                    imageIndex === activeImageIndex
                                        ? "border-acid ring-1 ring-acid/50"
                                        : "border-bone/15 opacity-45"
                                )}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    quality={60}
                                    sizes="12vw"
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>

                    {/* Active feature description */}
                    <div ref={mobileCardRef} className="mt-4">
                        <div className="flex items-center justify-between gap-2">
                            <span className="rounded-sm border border-acid/30 bg-acid/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-acid">
                                {currentMobileFeature.badge}
                            </span>
                            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone/40">
                                {t.projects.swipeHint} ↔
                            </span>
                        </div>
                        <h4 className="mt-2 font-display text-lg font-bold text-bone">
                            {currentMobileFeature.title}
                        </h4>
                        <p className="mt-1.5 text-xs leading-relaxed text-bone/65">
                            {currentMobileFeature.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* DESKTOP STICKY SHOWCASE */}
            <div className="mt-12 hidden gap-12 lg:grid lg:grid-cols-2 lg:gap-16">
                <div>
                    {features.map((feature, index) => (
                        <DesktopFeatureBlock
                            key={feature.title}
                            feature={feature}
                            index={index}
                            isActive={activeFeatureIdx === index}
                            onActivate={() => {
                                setActiveFeatureIdx(index);
                                setActiveImageIndex(feature.imageIndex);
                            }}
                        />
                    ))}
                </div>

                <div>
                    <div className="sticky top-28">
                        <Tilt max={3}>
                            <div
                                role="button"
                                tabIndex={0}
                                aria-label={t.projects.gallery.open}
                                data-cursor-label={t.projects.gallery.open}
                                onClick={() => openGallery(activeImageIndex)}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter" || event.key === " ") {
                                        event.preventDefault();
                                        openGallery(activeImageIndex);
                                    }
                                }}
                                className="group relative aspect-[16/10] cursor-pointer overflow-hidden rounded-xl border border-bone/15 bg-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid/70"
                            >
                                {KNOWTEN_GALLERY_IMAGES.map((img, idx) => {
                                    const isCurrent = idx === activeImageIndex;
                                    return (
                                        <div
                                            key={img.src}
                                            className={cn(
                                                "absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform]",
                                                isCurrent
                                                    ? "z-10 scale-100 opacity-100"
                                                    : "pointer-events-none z-0 scale-[1.03] opacity-0"
                                            )}
                                        >
                                            <Image
                                                src={img.src}
                                                alt={img.alt}
                                                fill
                                                quality={90}
                                                sizes="50vw"
                                                className="object-cover"
                                            />
                                        </div>
                                    );
                                })}

                                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-center justify-between bg-gradient-to-t from-ink/90 via-ink/40 to-transparent px-5 pb-4 pt-12">
                                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone/85">
                                        {String(activeImageIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                                    </span>
                                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-acid opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        {t.projects.gallery.open} ↗
                                    </span>
                                </div>
                            </div>
                        </Tilt>

                        {/* 8-Thumbnail selector */}
                        <div className="mt-3 grid grid-cols-8 gap-2">
                            {KNOWTEN_GALLERY_IMAGES.map((image, imageIndex) => (
                                <button
                                    key={image.src}
                                    type="button"
                                    aria-label={`${t.projects.gallery.open} ${imageIndex + 1}`}
                                    onClick={() => setActiveImageIndex(imageIndex)}
                                    className={cn(
                                        "relative aspect-[4/3] overflow-hidden rounded-md border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid/70",
                                        imageIndex === activeImageIndex
                                            ? "border-acid ring-1 ring-acid/50"
                                            : "border-bone/15 opacity-45 hover:opacity-90"
                                    )}
                                >
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        quality={75}
                                        sizes="8vw"
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Systems (02 — 03): Horizontal Touch-Snap Carousel on Mobile, 2-Col Grid on Desktop */}
            <div className="mt-16 border-t border-bone/10 pt-12 md:mt-24">
                <div className="mb-6 flex items-center justify-between gap-4">
                    <h3 className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.26em] text-acid">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>{t.projects.otherProjectsLabel}</span>
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/45 lg:hidden">
                        {t.projects.swipeHint} →
                    </span>
                </div>

                <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
                    {t.projects.additional.map((item) => (
                        <article
                            key={item.title}
                            data-cursor
                            className="group relative flex w-[84vw] max-w-sm shrink-0 snap-center flex-col justify-between rounded-2xl border border-bone/10 bg-secondary/40 p-6 transition-all duration-300 hover:border-acid/45 hover:bg-bone/[0.03] lg:w-auto lg:max-w-none"
                        >
                            <div>
                                <div className="flex items-center justify-between">
                                    <span className="font-display text-3xl font-extrabold text-outline-faint transition-colors group-hover:text-acid">
                                        {item.index}
                                    </span>
                                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-acid">
                                        {item.category}
                                    </span>
                                </div>

                                <h4 className="mt-3 font-display text-xl font-bold tracking-tight text-bone transition-colors group-hover:text-acid">
                                    {item.title}
                                </h4>
                                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-bone/45">
                                    {item.role} · {item.period}
                                </p>

                                <p className="mt-3 text-xs leading-relaxed text-bone/65 md:text-sm">
                                    {item.description}
                                </p>
                            </div>

                            <div className="mt-5 border-t border-bone/10 pt-4">
                                <div className="flex flex-wrap gap-1.5">
                                    {item.stack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="rounded-full border border-bone/15 bg-ink/60 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-bone/60"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-4 flex items-center gap-5">
                                    {item.privateProject ? (
                                        <button
                                            type="button"
                                            onClick={() => setPrivateModalProject(item.title)}
                                            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-acid transition-opacity hover:opacity-80"
                                        >
                                            <Lock className="h-3 w-3" />
                                            <span className="link-sweep">NDA · Privado</span>
                                            <ArrowUpRight className="h-3 w-3" />
                                        </button>
                                    ) : (
                                        <>
                                            {item.liveHref && (
                                                <a
                                                    href={item.liveHref}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-acid hover:text-bone"
                                                >
                                                    <span className="link-sweep">{t.projects.live}</span>
                                                    <ArrowUpRight className="h-3 w-3" />
                                                </a>
                                            )}
                                            {item.codeHref && (
                                                <a
                                                    href={item.codeHref}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/75 hover:text-acid"
                                                >
                                                    <span className="link-sweep">{t.projects.code}</span>
                                                    <ArrowUpRight className="h-3 w-3" />
                                                </a>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <ProjectGalleryModal
                isOpen={showGalleryModal}
                onClose={() => setShowGalleryModal(false)}
                images={KNOWTEN_GALLERY_IMAGES}
                initialIndex={galleryInitialIndex}
                projectTitle={project.title}
            />
            <PrivateProjectModal
                isOpen={Boolean(privateModalProject)}
                onClose={() => setPrivateModalProject(null)}
                projectTitle={privateModalProject ?? project.title}
            />
        </section>
    );
}
