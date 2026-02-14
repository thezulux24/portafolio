import { create } from 'zustand';
import { translations, Language } from './translations';

interface LanguageState {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: typeof translations['es'];
}

export const useLanguageStore = create<LanguageState>((set) => ({
    language: 'es',
    t: translations['es'],
    setLanguage: (lang) => set({ language: lang, t: translations[lang] }),
}));
