import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Brayan Zuluaga | Systems Engineer & Architect",
  description: "Portfolio of Brayan Zuluaga - Systems Engineer specialized in Backend, Frontend, and Data Architecture.",
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
          spaceGrotesk.variable,
          "min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary selection:text-primary-foreground"
        )}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
