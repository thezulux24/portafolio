import { create } from "zustand";

interface IntroState {
    /** True once the preloader finished and the hero intro may start. */
    started: boolean;
    start: () => void;
}

export const useIntroStore = create<IntroState>((set) => ({
    started: false,
    start: () => set({ started: true }),
}));
