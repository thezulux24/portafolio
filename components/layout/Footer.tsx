"use client";

import { useLanguageStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ContactScene } from "@/components/3d/ContactScene";
import { Github, Mail } from "lucide-react";

export function Footer() {
    const { t } = useLanguageStore();

    return (
        <footer id="contact" className="relative bg-black border-t border-white/10 py-16 overflow-hidden">
            <ContactScene />

            <div className="container relative z-10 px-6 mx-auto">
                <div className="flex flex-col items-center justify-center gap-6 text-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold font-heading mb-2">Brayan Zuluaga</h2>
                        <p className="text-muted-foreground">{t.contact.title}</p>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                        <Button size="icon" variant="ghost" className="hover:text-primary hover:bg-white/5" asChild>
                            <a href="mailto:thezulux24@gmail.com">
                                <Mail className="h-5 w-5" />
                            </a>
                        </Button>
                        <Button size="icon" variant="ghost" className="hover:text-primary hover:bg-white/5" asChild>
                            <a href="https://github.com/thezulux24" target="_blank" rel="noopener noreferrer">
                                <Github className="h-5 w-5" />
                            </a>
                        </Button>
                        {/* Add LinkedIn if available, otherwise just these two are fine as per user request */}
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Brayan Zuluaga. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
