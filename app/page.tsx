import { Preloader } from "@/components/ui/Preloader";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Stack } from "@/components/sections/Stack";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
    return (
        <main>
            <Preloader />
            <Hero />
            <Projects />
            <Experience />
            <Stack />
            <Contact />
        </main>
    );
}
