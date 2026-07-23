"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
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

interface ProjectLink {
    label: string;
    href?: string;
    locked?: boolean;
}

interface Project {
    title: string;
    description: string;
    role: string;
    year: string;
    stack: string[];
    links: ProjectLink[];
    galleryImages: GalleryImage[];
}

function ParallaxImage({
    image,
    priority,
    onOpen,
    openLabel,
}: {
    image: GalleryImage;
    priority?: boolean;
    onOpen: () => void;
    openLabel: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

    return (
        <div
            ref={ref}
            role="button"
            tabIndex={0}
            aria-label={openLabel}
            data-cursor-label={openLabel}
            onClick={onOpen}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onOpen();
                }
            }}
            className="group relative aspect-[16/10] cursor-pointer overflow-hidden rounded-xl border border-bone/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid/70"
        >
            <Tilt max={4} className="absolute inset-0">
            <motion.div className="absolute inset-x-0 -inset-y-[8%] will-change-transform" style={{ y }}>
                <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority={priority}
                    quality={90}
                    sizes="(max-width: 768px) 100vw, 66vw"
                    className="object-cover grayscale-[0.6] transition-all duration-700 group-hover:scale-[1.02] group-hover:grayscale-0"
                />
            </motion.div>
            </Tilt>
            <div className="pointer-events-none absolute inset-0 bg-ink/25 transition-opacity duration-500 group-hover:opacity-0" />
            <div className="pointer-events-none absolute bottom-4 left-5 font-mono text-[10px] uppercase tracking-[0.26em] text-bone/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {openLabel} ↗
            </div>
        </div>
    );
}

function ProjectCard({
    project,
    index,
    onOpenGallery,
    onLockedLink,
}: {
    project: Project;
    index: number;
    onOpenGallery: (project: Project, startIndex: number) => void;
    onLockedLink: () => void;
}) {
    const { t } = useLanguageStore();
    const [heroImage, ...restImages] = project.galleryImages;
    const thumbs = restImages.slice(0, 4);

    const meta = [
        { label: t.projects.year, value: project.year },
        { label: t.projects.role, value: project.role },
        { label: t.projects.stack, value: project.stack.join(" · ") },
    ];

    return (
        <motion.article
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-bone/10 pt-10 first:border-t-0 first:pt-0"
        >
            <div className="grid gap-10 lg:grid-cols-12">
                {/* Meta column */}
                <div className="order-2 flex flex-col justify-between gap-8 lg:order-1 lg:col-span-4">
                    <div>
                        <span className="font-display text-6xl font-extrabold text-outline-faint md:text-7xl">
                            0{index + 1}
                        </span>
                        <dl className="mt-8 space-y-4 border-t border-bone/10 pt-6">
                            {meta.map((row) => (
                                <div key={row.label} className="grid grid-cols-[72px_1fr] gap-3 text-sm">
                                    <dt className="font-mono text-[10px] uppercase leading-5 tracking-[0.24em] text-bone/40">
                                        {row.label}
                                    </dt>
                                    <dd className="text-bone/80">{row.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <div className="flex flex-wrap gap-x-7 gap-y-3">
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
                                        <button type="button" onClick={onLockedLink}>
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

                {/* Content column */}
                <div className="order-1 lg:order-2 lg:col-span-8">
                    <h3 className="font-display text-[clamp(2rem,5vw,4.2rem)] font-extrabold uppercase leading-[0.95] tracking-tight transition-colors duration-300">
                        {project.title}
                    </h3>
                    <p className="mt-5 max-w-2xl text-base leading-relaxed text-bone/60 md:text-lg">
                        {project.description}
                    </p>

                    <div className="mt-8">
                        <ParallaxImage
                            image={heroImage}
                            priority={index === 0}
                            onOpen={() => onOpenGallery(project, 0)}
                            openLabel={t.projects.gallery.open}
                        />

                        {thumbs.length > 0 && (
                            <div className="mt-3 grid grid-cols-4 gap-3">
                                {thumbs.map((image, thumbIndex) => (
                                    <button
                                        key={image.src}
                                        type="button"
                                        aria-label={`${t.projects.gallery.open} ${thumbIndex + 2}`}
                                        onClick={() => onOpenGallery(project, thumbIndex + 1)}
                                        className={cn(
                                            "group relative aspect-[4/3] overflow-hidden rounded-lg border border-bone/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid/70",
                                            thumbIndex === 3 && "hidden sm:block"
                                        )}
                                    >
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            fill
                                            quality={75}
                                            sizes="(max-width: 640px) 33vw, 18vw"
                                            className="object-cover grayscale transition-all duration-500 group-hover:scale-[1.05] group-hover:grayscale-0"
                                        />
                                        <div className="pointer-events-none absolute inset-0 bg-ink/30 transition-opacity duration-500 group-hover:opacity-0" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.article>
    );
}

export function Works() {
    const { t } = useLanguageStore();
    const [showPrivateModal, setShowPrivateModal] = useState(false);
    const [showGalleryModal, setShowGalleryModal] = useState(false);
    const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);
    const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
    const [galleryProjectTitle, setGalleryProjectTitle] = useState("");

    const projects: Project[] = [
        {
            title: t.projects.knowten.title,
            description: t.projects.knowten.description,
            role: t.projects.knowten.role,
            year: t.projects.knowten.year,
            stack: ["Next.js 16", "NestJS", "TypeScript", "PostgreSQL", "Prisma", "Apify", "DeepSeek AI", "Recharts"],
            links: [
                { label: t.projects.live, href: "https://app.knowten.info" },
                { label: t.projects.apifyStore, href: "https://apify.com/knowten" },
                { label: t.projects.code, locked: true },
            ],
            galleryImages: KNOWTEN_GALLERY_IMAGES,
        },
    ];

    const openGallery = (project: Project, startIndex: number) => {
        setGalleryImages(project.galleryImages);
        setGalleryProjectTitle(project.title);
        setGalleryInitialIndex(startIndex);
        setShowGalleryModal(true);
    };

    return (
        <section id="projects" className="relative bg-ink px-6 py-28 md:px-10 md:py-40">
            <SectionHeading index={t.projects.index} label={t.projects.label} />

            <div className="mt-14 mb-20 flex flex-wrap items-end justify-between gap-6">
                <h2 className="font-display text-[clamp(2.6rem,9vw,8rem)] font-extrabold uppercase leading-[0.9] tracking-tight">
                    <span className="text-outline">{t.projects.title}</span>
                    <span className="text-acid">.</span>
                </h2>
                <p className="pb-3 font-mono text-xs uppercase tracking-[0.3em] text-bone/40">
                    2024 — 2026
                </p>
            </div>

            <div className="space-y-28 md:space-y-36">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={project.title}
                        project={project}
                        index={index}
                        onOpenGallery={openGallery}
                        onLockedLink={() => setShowPrivateModal(true)}
                    />
                ))}
            </div>

            <ProjectGalleryModal
                isOpen={showGalleryModal}
                onClose={() => setShowGalleryModal(false)}
                images={galleryImages}
                initialIndex={galleryInitialIndex}
                projectTitle={galleryProjectTitle}
            />
            <PrivateProjectModal isOpen={showPrivateModal} onClose={() => setShowPrivateModal(false)} projectTitle="Knowten Suite" />
        </section>
    );
}
