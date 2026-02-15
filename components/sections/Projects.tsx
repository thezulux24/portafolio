"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguageStore } from "@/lib/store";
import { motion } from "framer-motion";
import { ExternalLink, Github, Layers, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrivateProjectModal } from "@/components/ui/PrivateProjectModal";
import { ProjectGalleryModal, type GalleryImage } from "@/components/ui/ProjectGalleryModal";
import { cn } from "@/lib/utils";

const PYP_GALLERY_IMAGES: GalleryImage[] = [
    { src: "/images/pyp/image1.png", alt: "PyP Camiones screenshot 1", width: 1715, height: 792 },
    { src: "/images/pyp/image2.png", alt: "PyP Camiones screenshot 2", width: 1602, height: 827 },
    { src: "/images/pyp/image3.png", alt: "PyP Camiones screenshot 3", width: 902, height: 855 },
    { src: "/images/pyp/image4.png", alt: "PyP Camiones screenshot 4", width: 1065, height: 907 },
    { src: "/images/pyp/image5.png", alt: "PyP Camiones screenshot 5", width: 877, height: 800 },
    { src: "/images/pyp/image6.png", alt: "PyP Camiones screenshot 6", width: 487, height: 746 },
    { src: "/images/pyp/image7.png", alt: "PyP Camiones screenshot 7", width: 1052, height: 862 },
    { src: "/images/pyp/image8.png", alt: "PyP Camiones screenshot 8", width: 1237, height: 737 },
    { src: "/images/pyp/image9.png", alt: "PyP Camiones screenshot 9", width: 1417, height: 828 },
    { src: "/images/pyp/image10.png", alt: "PyP Camiones screenshot 10", width: 1232, height: 853 },
];

const MOSAIC_LAYOUT = [
    "md:col-span-2 md:row-span-2",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-2",
    "md:col-span-1 md:row-span-1",
    "md:col-span-2 md:row-span-1",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-1",
];

export function Projects() {
    const { t } = useLanguageStore();
    const [showPrivateModal, setShowPrivateModal] = useState(false);
    const [showGalleryModal, setShowGalleryModal] = useState(false);
    const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);
    const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
    const [galleryProjectTitle, setGalleryProjectTitle] = useState("");

    const projects = [
        {
            title: t.projects.pyp.title,
            description: t.projects.pyp.description,
            tags: ["NestJS", "React + Vite", "PostgreSQL", "Prisma ORM", "Tailwind CSS"],
            links: {
                demo: "https://pypcamiones.cloud",
                repo: "https://github.com/thezulux24/pyp",
                app: "https://app.pypcamiones.cloud"
            },
            featured: true,
            isPrivate: true,
            galleryImages: PYP_GALLERY_IMAGES,
        },
    ];

    const handlePrivateLink = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowPrivateModal(true);
    };

    const openGallery = (images: GalleryImage[], projectTitle: string, startIndex = 0) => {
        setGalleryImages(images);
        setGalleryProjectTitle(projectTitle);
        setGalleryInitialIndex(startIndex);
        setShowGalleryModal(true);
    };

    return (
        <section id="projects" className="relative overflow-hidden bg-background py-24">
            <div className="pointer-events-none absolute right-0 top-0 rounded-full bg-primary/20 p-20 opacity-10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-0 rounded-full bg-blue-500/20 p-32 opacity-10 blur-3xl" />

            <div className="container relative z-10 mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 space-y-4 text-center"
                >
                    <h2 className="font-heading text-3xl font-bold md:text-5xl">{t.projects.title}</h2>
                    <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-primary to-transparent" />
                </motion.div>

                <div className="grid gap-12">
                    {projects.map((project, index) => {
                        const previewImages = project.galleryImages.slice(0, 8);

                        return (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-colors hover:bg-white/[0.07]"
                            >
                                <div className="grid items-center gap-8 p-8 md:grid-cols-2 md:p-12">
                                    <div className="order-2 space-y-6 md:order-1">
                                        <div className="flex items-center gap-3">
                                            <Layers className="h-6 w-6 text-primary" />
                                            <span className="text-sm font-medium uppercase tracking-wider text-primary">
                                                {t.projects.featured}
                                            </span>
                                        </div>

                                        <h3 className="font-heading text-3xl font-bold transition-colors group-hover:text-primary">
                                            {project.title}
                                        </h3>

                                        <p className="text-lg leading-relaxed text-muted-foreground">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag) => (
                                                <span key={tag} className="rounded-full border border-white/5 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex flex-wrap gap-4 pt-4">
                                            <Button asChild>
                                                <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="mr-2 h-4 w-4" />
                                                    Landing Page
                                                </a>
                                            </Button>

                                            <Button variant="secondary" onClick={project.isPrivate ? handlePrivateLink : undefined} asChild={!project.isPrivate}>
                                                {project.isPrivate ? (
                                                    <>
                                                        <ArrowUpRight className="mr-2 h-4 w-4" />
                                                        App
                                                    </>
                                                ) : (
                                                    <a href={project.links.app} target="_blank" rel="noopener noreferrer">
                                                        <ArrowUpRight className="mr-2 h-4 w-4" />
                                                        App
                                                    </a>
                                                )}
                                            </Button>

                                            <Button variant="outline" onClick={project.isPrivate ? handlePrivateLink : undefined} asChild={!project.isPrivate}>
                                                {project.isPrivate ? (
                                                    <>
                                                        <Github className="mr-2 h-4 w-4" />
                                                        Code
                                                    </>
                                                ) : (
                                                    <a href={project.links.repo} target="_blank" rel="noopener noreferrer">
                                                        <Github className="mr-2 h-4 w-4" />
                                                        Code
                                                    </a>
                                                )}
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="order-1 rounded-xl border border-white/10 bg-black/50 transition-colors group-hover:border-primary/50 md:order-2">
                                        <div
                                            role="button"
                                            tabIndex={0}
                                            aria-label={t.projects.gallery.open}
                                            onClick={() => openGallery(project.galleryImages, project.title, 0)}
                                            onKeyDown={(event) => {
                                                if (event.key === "Enter" || event.key === " ") {
                                                    event.preventDefault();
                                                    openGallery(project.galleryImages, project.title, 0);
                                                }
                                            }}
                                            className="relative cursor-pointer overflow-hidden rounded-xl"
                                        >
                                            <div className="grid auto-rows-[90px] grid-cols-2 gap-2 p-2 sm:auto-rows-[88px] sm:grid-cols-4 md:auto-rows-[92px]">
                                                {previewImages.map((image, previewIndex) => (
                                                    <button
                                                        key={image.src}
                                                        type="button"
                                                        className={cn(
                                                            "group/tile relative overflow-hidden rounded-lg border border-white/10 bg-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
                                                            MOSAIC_LAYOUT[previewIndex] ?? ""
                                                        )}
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            openGallery(project.galleryImages, project.title, previewIndex);
                                                        }}
                                                        aria-label={`${t.projects.gallery.open} ${previewIndex + 1}`}
                                                    >
                                                        <Image
                                                            src={image.src}
                                                            alt={image.alt}
                                                            fill
                                                            quality={100}
                                                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 18vw"
                                                            className="object-cover grayscale transition duration-500 group-hover/tile:scale-[1.03] group-hover/tile:grayscale-0"
                                                        />
                                                        <div className="pointer-events-none absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover/tile:opacity-0" />
                                                    </button>
                                                ))}
                                            </div>

                                            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-4 py-3">
                                                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
                                                    {t.projects.gallery.open}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <ProjectGalleryModal
                isOpen={showGalleryModal}
                onClose={() => setShowGalleryModal(false)}
                images={galleryImages}
                initialIndex={galleryInitialIndex}
                projectTitle={galleryProjectTitle}
            />
            <PrivateProjectModal isOpen={showPrivateModal} onClose={() => setShowPrivateModal(false)} />
        </section>
    );
}
