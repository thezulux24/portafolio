import { Preloader } from "@/components/ui/Preloader";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Experience } from "@/components/sections/Experience";
import { Arsenal } from "@/components/sections/Arsenal";
import { Works } from "@/components/sections/Works";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
    return (
        <main className="relative min-h-screen w-full">
            <Preloader />
            <Hero />
            <Manifesto />
            <Experience />
            <Arsenal />
            <Works />
            <Footer />
        </main>
    );
}
