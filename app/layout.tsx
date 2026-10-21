import type { Metadata } from "next";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Cursor } from "@/components/ui/Cursor";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const syne = Syne({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    variable: "--font-syne",
});
const jbMono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400", "500"],
    variable: "--font-jbmono",
});

export const metadata: Metadata = {
    title: "Brayan Zuluaga | Backend Developer, Software Architect & AI Engineer",
    description:
        "Portfolio of Brayan David Zuluaga Meléndez — Backend Developer & Software Architect at Axel Growth Partners (USA), Lead Full-Stack & AI Architect at Knowten Suite, and Data Engineer at PROESA (World Bank).",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body
                className={cn(
                    inter.variable,
                    syne.variable,
                    jbMono.variable,
                    "min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary selection:text-primary-foreground"
                )}
            >
                <SmoothScroll>
                    <Cursor />
                    <GrainOverlay />
                    <ScrollProgress />
                    <Navbar />
                    {children}
                </SmoothScroll>
                <SpeedInsights />
            </body>
        </html>
    );
}
