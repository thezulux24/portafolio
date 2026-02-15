"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguageStore } from "@/lib/store";

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProjectGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: GalleryImage[];
  initialIndex: number;
  projectTitle: string;
}

interface GalleryDialogContentProps {
  onClose: () => void;
  images: GalleryImage[];
  initialIndex: number;
  projectTitle: string;
}

function GalleryDialogContent({ onClose, images, initialIndex, projectTitle }: GalleryDialogContentProps) {
  const { t } = useLanguageStore();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const getWrappedIndex = useCallback(
    (index: number) => ((index % images.length) + images.length) % images.length,
    [images.length]
  );

  const [activeIndex, setActiveIndex] = useState(() => getWrappedIndex(initialIndex));

  const goPrevious = useCallback(() => {
    setActiveIndex((previous) => getWrappedIndex(previous - 1));
  }, [getWrappedIndex]);

  const goNext = useCallback(() => {
    setActiveIndex((previous) => getWrappedIndex(previous + 1));
  }, [getWrappedIndex]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const animationFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrevious();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goNext, goPrevious, onClose]);

  const currentImage = images[getWrappedIndex(activeIndex)];
  const counterLabel = t.projects.gallery.counter
    .replace("{current}", String(activeIndex + 1))
    .replace("{total}", String(images.length));

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6">
      <motion.button
        type="button"
        aria-label={t.projects.gallery.close}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${projectTitle} ${t.projects.gallery.open}`}
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 12 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="relative z-10 h-full w-full max-w-7xl"
      >
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-black/75 shadow-2xl shadow-black/60">
          <header className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
            <div className="min-w-0">
              <h3 className="truncate font-heading text-lg font-semibold text-white">{projectTitle}</h3>
              <p className="text-xs text-muted-foreground sm:text-sm">{counterLabel}</p>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label={t.projects.gallery.close}
              className="rounded-lg border border-white/15 bg-white/5 p-2 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div className="relative min-h-0 flex-1 bg-black/70">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.1),_transparent_45%)]" />
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              quality={100}
              unoptimized
              sizes="(max-width: 768px) 100vw, 90vw"
              className="object-contain p-4 sm:p-8"
            />

            <button
              type="button"
              onClick={goPrevious}
              aria-label={t.projects.gallery.previous}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/70 p-2 text-white transition-colors hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:left-5"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label={t.projects.gallery.next}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/70 p-2 text-white transition-colors hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:right-5"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="border-t border-white/10 bg-black/80 px-3 py-3 sm:px-5">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  aria-label={`${t.projects.gallery.open} ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "relative h-16 w-24 shrink-0 overflow-hidden rounded-md border transition-all sm:h-20 sm:w-32",
                    index === activeIndex
                      ? "border-white/80 ring-1 ring-white/60"
                      : "border-white/15 hover:border-white/40"
                  )}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    quality={95}
                    sizes="128px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ProjectGalleryModal({
  isOpen,
  onClose,
  images,
  initialIndex,
  projectTitle,
}: ProjectGalleryModalProps) {
  if (!images.length) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <GalleryDialogContent
          key={`${projectTitle}-${initialIndex}-${images.length}`}
          onClose={onClose}
          images={images}
          initialIndex={initialIndex}
          projectTitle={projectTitle}
        />
      ) : null}
    </AnimatePresence>
  );
}
