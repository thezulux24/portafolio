import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { EducationAndStack } from "@/components/sections/EducationAndStack";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <About />
      <EducationAndStack />
      <Projects />
      <Footer />
    </main>
  );
}
