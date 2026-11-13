"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { Shot } from "@/lib/types";
import type { Lang } from "@/lib/store";
import { ui } from "@/lib/content";

interface LightboxProps {
    title: string;
    shots: Shot[];
    index: number | null;
    lang: Lang;
    onIndex: (index: number) => void;
    onClose: () => void;
}

/** Full-size view of a product's screens. Native dialog: focus is trapped and Esc closes. */
export function Lightbox({ title, shots, index, lang, onIndex, onClose }: LightboxProps) {
    const dialog = useRef<HTMLDialogElement>(null);
    const open = index !== null;

    useEffect(() => {
        const node = dialog.current;
        if (!node) return;
        if (open && !node.open) {
            node.showModal();
            document.documentElement.style.overflow = "hidden";
        }
        if (!open && node.open) node.close();
        return () => {
            document.documentElement.style.overflow = "";
        };
    }, [open]);

    useEffect(() => {
        if (index === null) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "ArrowRight") onIndex((index + 1) % shots.length);
            if (event.key === "ArrowLeft") onIndex((index - 1 + shots.length) % shots.length);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [index, shots.length, onIndex]);

    const shot = index !== null ? shots[index] : null;

    return (
        <dialog
            ref={dialog}
            className="lightbox"
            aria-label={title}
            data-lenis-prevent
            onClose={onClose}
            onClick={(event) => event.target === event.currentTarget && onClose()}
        >
            {shot && index !== null && (
                <div className="flex h-full flex-col">
                    <div className="wrap flex h-(--nav-h) flex-none items-center justify-between gap-4">
                        <p className="data text-text-2">
                            <span className="text-text">{title}</span>
                            <span className="mx-2 text-text-3">/</span>
                            {String(index + 1).padStart(2, "0")} — {String(shots.length).padStart(2, "0")}
                        </p>
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label={ui.projects.close[lang]}
                            className="grid size-11 place-items-center border border-line text-text transition-[transform,color,border-color] duration-150 hover:border-holo hover:text-holo active:scale-95"
                        >
                            <X className="size-5" />
                        </button>
                    </div>

                    <div
                        className="flex min-h-0 flex-1 items-center justify-center px-(--gutter)"
                        onClick={(event) => event.target === event.currentTarget && onClose()}
                    >
                        <Image
                            key={shot.src}
                            src={shot.src}
                            alt={shot.alt[lang]}
                            width={shot.width}
                            height={shot.height}
                            sizes="100vw"
                            quality={90}
                            className="shot-swap h-auto max-h-full w-auto max-w-full object-contain"
                        />
                    </div>

                    {shots.length > 1 && (
                        <div className="wrap flex flex-none items-center justify-center gap-3 py-5">
                            <button
                                type="button"
                                onClick={() => onIndex((index - 1 + shots.length) % shots.length)}
                                aria-label={ui.projects.previous[lang]}
                                className="grid size-11 place-items-center border border-line text-text transition-[transform,color,border-color] duration-150 hover:border-holo hover:text-holo active:scale-95"
                            >
                                <ArrowLeft className="size-5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => onIndex((index + 1) % shots.length)}
                                aria-label={ui.projects.next[lang]}
                                className="grid size-11 place-items-center border border-line text-text transition-[transform,color,border-color] duration-150 hover:border-holo hover:text-holo active:scale-95"
                            >
                                <ArrowRight className="size-5" />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </dialog>
    );
}
