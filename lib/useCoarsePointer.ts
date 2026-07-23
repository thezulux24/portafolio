import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    mediaQuery.addEventListener("change", callback);
    return () => mediaQuery.removeEventListener("change", callback);
}

/** True on touch-first devices (phones, tablets). */
export function useCoarsePointer() {
    return useSyncExternalStore(
        subscribe,
        () => window.matchMedia("(pointer: coarse)").matches,
        () => false
    );
}
