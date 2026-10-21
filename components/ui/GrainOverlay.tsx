"use client";

import { useEffect, useState } from "react";

export function GrainOverlay() {
    const [noiseUrl, setNoiseUrl] = useState<string | null>(null);

    useEffect(() => {
        // Generate a tiny 128x128 tileable noise texture once on mount.
        // Replaces expensive full-screen SVG <feTurbulence> filters for zero-lag scrolling.
        const size = 128;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const imageData = ctx.createImageData(size, size);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const v = (Math.random() * 255) | 0;
            data[i] = v;
            data[i + 1] = v;
            data[i + 2] = v;
            data[i + 3] = 12; // subtle alpha baked directly into the tile
        }
        ctx.putImageData(imageData, 0, 0);
        setNoiseUrl(canvas.toDataURL("image/png"));
    }, []);

    if (!noiseUrl) return null;

    return (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[90]"
            style={{
                backgroundImage: `url(${noiseUrl})`,
                backgroundRepeat: "repeat",
                backgroundSize: "128px 128px",
                contain: "strict",
            }}
        />
    );
}
