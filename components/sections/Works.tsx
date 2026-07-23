"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowUpRight, ChevronDown, Lock } from "lucide-react";
import { useLanguageStore } from "@/lib/store";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Magnetic } from "@/components/ui/Magnetic";
import { Tilt } from "@/components/ui/Tilt";
import { PrivateProjectModal } from "@/components/ui/PrivateProjectModal";
import { ProjectGalleryModal, type GalleryImage } from "@/components/ui/ProjectGalleryModal";
import { cn } from "@/lib/utils";

const KNOWTEN_GALLERY_IMAGES: GalleryImage[] = [
    { src: "/images/Knowten/image1.png", alt: "Knowten Suite — catálogo de actores de extracción", width: 1917, height: 947 },
    { src: "/images/Knowten/image2.png", alt: "Knowten Suite — ejecución de actor con terminal en vivo", width: 1909, height: 882 },
    { src: "/images/Knowten/image3.png", alt: "Knowten Suite — plataforma de datos", width: 1908, height: 878 },
    { src: "/images/Knowten/image4.png", alt: "Knowten Suite — insights IA y chat con el dataset", width: 1919, height: 949 },
    { src: "/images/Knowten/image5.png", alt: "Knowten Suite — visualización de datos", width: 1918, height: 949 },
    { src: "/images/Knowten/image6.png", alt: "Knowten Suite — análisis y reportes", width: 1657, height: 935 },
    { src: "/images/Knowten/image7.png", alt: "Knowten Suite — panel de inteligencia", width: 1918, height: 935 },
];

/** Which gallery image illustrates each feature (index into KNOWTEN_GALLERY_IMAGES) */
const FEATURE_IMAGE_MAP = [0, 1, 3, 4, 6];

const SHOWCASE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Feature {
    title: string;
    description: string;
    imageIndex: number;
}

function FeatureBlock({
    feature,
    index,
    isActive,
    onActivate,
    onOpenImage,
    openLabel,
}: {
    feature: Feature;
    index: number;
    isActive: boolean;
    onActivate: () => void;
    onOpenImage: (imageIndex: number) => void;
    openLabel: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { margin: "-42% 0px -42% 0px" });

    useEffect(() => {
        if (inView) onActivate();
    }, [inView, onActivate]);

    return (
        <div
            ref={ref}
            className={cn(
                "border-t border-bone/10 py-10 transition-opacity duration-500 last:border-b lg:py-14",
                isActive ? "opacity-100" : "lg:opacity-35"
            )}
        >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-acid">
                0{index + 1}
            </span>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight md:text-3xl">
                {feature.title}
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-bone/60 md:text-base">
                {feature.description}
            </p>

            {/* Inline image on mobile (sticky viewer is desktop-only) */}
            <button
                type="button"
                aria-label={openLabel}
                data-cursor-label={openLabel}
                onClick={() => onOpenImage(feature.imageIndex)}
                className="group relative mt-6 block aspect-[16/10] w-full overflow-hidden rounded-xl border border-bone/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid/70 lg:hidden"
            >
                <Image
                    src={featureImageSrc(feature.imageIndex).src}
                    alt={featureImageSrc(feature.imageIndex).alt}
                    fill
                    quality={75}
                    sizes="100vw"
                    className="object-cover"
                />
            </button>
        </div>
    );
}

function featureImageSrc(imageIndex: number) {
    return KNOWTEN_GALLERY_IMAGES[imageIndex];
}

export function Works() {
    const { t } = useLanguageStore();
    const [showPrivateModal, setShowPrivateModal] = useState(false);
    const [showGalleryModal, setShowGalleryModal] = useState(false);
    const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [expanded, setExpanded] = useState(false);

    const project = {
        title: t.projects.knowten.title,
        description: t.projects.knowten.description,
        role: t.projects.knowten.role,
        year: t.projects.knowten.year,
        stack: ["Next.js 16", "NestJS", "TypeScript", "PostgreSQL", "Prisma", "Apify", "DeepSeek AI", "Recharts"],
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

    const openGallery = (imageIndex: number) => {
        setGalleryInitialIndex(imageIndex);
        setShowGalleryModal(true);
    };

    const meta = [
        { label: t.projects.year, value: project.year },
        { label: t.projects.role, value: project.role },
        { label: t.projects.stack, value: project.stack.join(" · ") },
    ];

    const total = KNOWTEN_GALLERY_IMAGES.length;

    return (
        <section id="projects" className="relative bg-ink px-6 py-28 md:px-10 md:py-40">
            <SectionHeading index={t.projects.index} label={t.projects.label} />

            <div className="mt-14 mb-16 flex flex-wrap items-end justify-between gap-6">
                <h2 className="font-display text-[clamp(2.6rem,9vw,8rem)] font-extrabold uppercase leading-[0.9] tracking-tight">
                    <span className="text-outline">{t.projects.title}</span>
                    <span className="text-acid">.</span>
                </h2>
                <p className="pb-3 font-mono text-xs uppercase tracking-[0.3em] text-bone/40">
                    SaaS · B2B · Data
                </p>
            </div>

            {/* Project header */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: SHOWCASE_EASE }}
                className="border-t border-bone/10 pt-10"
            >
                <div className="flex flex-wrap items-end justify-between gap-8">
                    <div>
                        <span className="font-display text-6xl font-extrabold text-outline-faint md:text-7xl">
                            01
                        </span>
                        <h3 className="mt-2 font-display text-[clamp(2rem,5vw,4.2rem)] font-extrabold uppercase leading-[0.95] tracking-tight">
                            {project.title}
                        </h3>
                    </div>

                    <div className="flex flex-wrap gap-x-7 gap-y-3 pb-2">
                        {project.links.map((link) => {
                            const content = (
                                <span className="group/link inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.22em] text-bone transition-colors hover:text-acid">
                                    {link.locked && <Lock className="h-3 w-3 text-acid" />}
                                    <span className="link-sweep">{link.label}</span>
                                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                                </span>
                            );

                            return (
                                <Magnetic key={link.label} strength={0.25}>
                                    {link.locked ? (
                                        <button type="button" onClick={() => setShowPrivateModal(true)}>
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

                <p className="mt-6 max-w-3xl text-base leading-relaxed text-bone/60 md:text-lg">
                    {project.description}
                </p>

                <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-4">
                    {meta.map((row) => (
                        <div key={row.label} className="max-w-md">
                            <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone/40">
                                {row.label}
                            </dt>
                            <dd className="mt-1 text-sm text-bone/80">{row.value}</dd>
                        </div>
                    ))}
                </dl>
            </motion.div>

            {/* Sticky showcase */}
            <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
                {/* Features column */}
                <div>
                    {/* Mobile: cover image (the essentials stay visible) */}
                    <button
                        type="button"
                        aria-label={t.projects.gallery.open}
                        data-cursor-label={t.projects.gallery.open}
                        onClick={() => openGallery(0)}
                        className="group relative block aspect-[16/10] w-full overflow-hidden rounded-xl border border-bone/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid/70 lg:hidden"
                    >
                        <Image
                            src={KNOWTEN_GALLERY_IMAGES[0].src}
                            alt={KNOWTEN_GALLERY_IMAGES[0].alt}
                            fill
                            quality={90}
                            sizes="100vw"
                            className="object-cover"
                        />
                        <div className="pointer-events-none absolute bottom-4 left-5 font-mono text-[10px] uppercase tracking-[0.26em] text-bone/80">
                            {t.projects.gallery.open} ↗
                        </div>
                    </button>

                    {/* Mobile: expand toggle */}
                    <button
                        type="button"
                        onClick={() => setExpanded((value) => !value)}
                        aria-expanded={expanded}
                        className="mt-4 flex w-full items-center justify-between border-y border-bone/10 py-4 font-mono text-[11px] uppercase tracking-[0.26em] text-bone transition-colors hover:text-acid lg:hidden"
                    >
                        <span>{expanded ? t.projects.showLess : t.projects.showMore}</span>
                        <motion.span
                            animate={{ rotate: expanded ? 180 : 0 }}
                            transition={{ duration: 0.35, ease: SHOWCASE_EASE }}
                            className="text-acid"
                        >
                            <ChevronDown className="h-4 w-4" />
                        </motion.span>
                    </button>

                    {/* Desktop: features always visible, drives the sticky viewer */}
                    <div className="hidden lg:block">
                        {features.map((feature, index) => (
                            <FeatureBlock
                                key={feature.title}
                                feature={feature}
                                index={index}
                                isActive={activeImageIndex === feature.imageIndex}
                                onActivate={() => setActiveImageIndex(feature.imageIndex)}
                                onOpenImage={openGallery}
                                openLabel={t.projects.gallery.open}
                            />
                        ))}
                    </div>

                    {/* Mobile: collapsible features */}
                    <AnimatePresence initial={false}>
                        {expanded && (
                            <motion.div
                                key="mobile-features"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.55, ease: SHOWCASE_EASE }}
                                className="overflow-hidden lg:hidden"
                            >
                                {features.map((feature, index) => (
                                    <FeatureBlock
                                        key={feature.title}
                                        feature={feature}
                                        index={index}
                                        isActive={activeImageIndex === feature.imageIndex}
                                        onActivate={() => setActiveImageIndex(feature.imageIndex)}
                                        onOpenImage={openGallery}
                                        openLabel={t.projects.gallery.open}
                                    />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Sticky viewer (desktop) */}
                <div className="hidden lg:block">
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
                                className="group relative aspect-[16/10] cursor-pointer overflow-hidden rounded-xl border border-bone/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid/70"
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeImageIndex}
                                        initial={{ opacity: 0, scale: 1.05 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.45, ease: SHOWCASE_EASE }}
                                        className="absolute inset-0"
                                    >
                                        <Image
                                            src={KNOWTEN_GALLERY_IMAGES[activeImageIndex].src}
                                            alt={KNOWTEN_GALLERY_IMAGES[activeImageIndex].alt}
                                            fill
                                            quality={90}
                                            sizes="50vw"
                                            className="object-cover"
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                <div className="pointer-events-none absolute bottom-4 left-5 font-mono text-[10px] uppercase tracking-[0.26em] text-bone/80">
                                    {String(activeImageIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                                </div>
                                <div className="pointer-events-none absolute bottom-4 right-5 font-mono text-[10px] uppercase tracking-[0.26em] text-acid opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    {t.projects.gallery.open} ↗
                                </div>
                            </div>
                        </Tilt>

                        {/* Thumbnail selector */}
                        <div className="mt-3 grid grid-cols-7 gap-2">
                            {KNOWTEN_GALLERY_IMAGES.map((image, imageIndex) => (
                                <button
                                    key={image.src}
                                    type="button"
                                    aria-label={`${t.projects.gallery.open} ${imageIndex + 1}`}
                                    onClick={() => setActiveImageIndex(imageIndex)}
                                    className={cn(
                                        "relative aspect-[4/3] overflow-hidden rounded-md border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid/70",
                                        imageIndex === activeImageIndex
                                            ? "border-acid"
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

            <ProjectGalleryModal
                isOpen={showGalleryModal}
                onClose={() => setShowGalleryModal(false)}
                images={KNOWTEN_GALLERY_IMAGES}
                initialIndex={galleryInitialIndex}
                projectTitle={project.title}
            />
            <PrivateProjectModal
                isOpen={showPrivateModal}
                onClose={() => setShowPrivateModal(false)}
                projectTitle={project.title}
            />
        </section>
    );
}
