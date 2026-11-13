import type { Metadata, Viewport } from "next";
import { Archivo, Doto, Martian_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { FringeField } from "@/components/gl/FringeField";
import { Nav } from "@/components/layout/Nav";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const martian = Martian_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-martian", display: "swap" });
const doto = Doto({ subsets: ["latin"], weight: ["900"], variable: "--font-doto", display: "swap" });

// Vercel exposes the production domain at build time; nothing is hard-coded here.
const site = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
    metadataBase: new URL(site),
    title: "Brayan Zuluaga · Software Architect",
    description:
        "Brayan Zuluaga, full-stack software architect. Backends, interfaces, AI agents and data platforms shipped to production: Knowten Suite, Enerplus, CMS Studio, MiPlante and more.",
    openGraph: {
        title: "Brayan Zuluaga · Software Architect",
        description: "Backends, AI agents and data platforms shipped to production.",
        type: "website",
    },
};

export const viewport: Viewport = {
    themeColor: "#050a16",
    colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="es" className={`${archivo.variable} ${martian.variable} ${doto.variable}`}>
            <body>
                <a
                    href="#projects"
                    className="btn btn-primary fixed top-3 left-3 z-[200] -translate-y-[200%] focus-visible:translate-y-0"
                >
                    Saltar al contenido · Skip to content
                </a>
                <FringeField />
                <SmoothScroll>
                    <Nav />
                    <div className="relative z-[1]">{children}</div>
                </SmoothScroll>
                <SpeedInsights />
            </body>
        </html>
    );
}
