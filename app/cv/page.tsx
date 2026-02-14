"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { CvLoadingScene } from "@/components/3d/CvLoadingScene";
import { useLanguageStore } from "@/lib/store";

export default function CvLoadingPage() {
    const { t } = useLanguageStore();
    const content = t.cvLoading;

    return (
        <section className="relative min-h-screen overflow-hidden bg-background px-6 pb-16 pt-28">
            <CvLoadingScene />

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_58%)]" />
            <div
                className="pointer-events-none absolute inset-0 opacity-20 mix-blend-screen"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(to bottom, rgba(255,255,255,0.24) 0px, rgba(255,255,255,0.24) 1px, transparent 2px, transparent 6px)",
                }}
            />

            <div className="relative z-10 mx-auto flex min-h-[calc(100vh-10rem)] w-full max-w-3xl flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-mono text-sm text-primary backdrop-blur-md"
                >
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    <span>{content.status}</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="bg-gradient-to-b from-white to-white/60 bg-clip-text font-heading text-4xl font-bold tracking-tight text-transparent md:text-6xl"
                >
                    {content.title}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground"
                >
                    {content.description}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scaleX: 0.92 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 0.28, duration: 0.55 }}
                    className="mt-8 w-full max-w-lg rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-md"
                >
                    <div className="relative h-2 overflow-hidden rounded-full border border-white/15 bg-white/5">
                        <motion.span
                            className="absolute inset-y-0 w-2/5 bg-gradient-to-r from-transparent via-white to-transparent"
                            animate={{ x: ["-120%", "240%"] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.5 }}
                    className="mt-10"
                >
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-white/10"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        {content.back}
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
