import { create } from "zustand";

export type Lang = "es" | "en";

interface LangState {
    lang: Lang;
    setLang: (lang: Lang) => void;
}

const KEY = "bz-lang";

export const useLang = create<LangState>((set) => ({
    lang: "es",
    setLang: (lang) => {
        try {
            localStorage.setItem(KEY, lang);
        } catch {
            // storage unavailable: the choice just lasts for this visit
        }
        document.documentElement.lang = lang;
        set({ lang });
    },
}));

/** Read the stored language once the page is interactive. */
export function restoreLang() {
    try {
        const stored = localStorage.getItem(KEY);
        if (stored === "en" || stored === "es") {
            document.documentElement.lang = stored;
            useLang.setState({ lang: stored });
        }
    } catch {
        // ignore
    }
}

interface IntroState {
    /** True once the preloader has cleared and the hero may resolve. */
    ready: boolean;
    setReady: () => void;
}

export const useIntro = create<IntroState>((set) => ({
    ready: false,
    setReady: () => set({ ready: true }),
}));
