import {
    siAngular,
    siC,
    siClaude,
    siCplusplus,
    siDocker,
    siDuckdb,
    siElectron,
    siFastapi,
    siFlutter,
    siGooglegemini,
    siGreensock,
    siLinux,
    siNestjs,
    siNextdotjs,
    siPandas,
    siPostgresql,
    siPython,
    siReact,
    siRedis,
    siRust,
    siTailwindcss,
    siThreedotjs,
    siTypescript,
    siVercel,
    type SimpleIcon,
} from "simple-icons";

const ICONS: Record<string, SimpleIcon> = {
    angular: siAngular,
    c: siC,
    claude: siClaude,
    cplusplus: siCplusplus,
    docker: siDocker,
    duckdb: siDuckdb,
    electron: siElectron,
    fastapi: siFastapi,
    flutter: siFlutter,
    gemini: siGooglegemini,
    gsap: siGreensock,
    linux: siLinux,
    nestjs: siNestjs,
    nextjs: siNextdotjs,
    pandas: siPandas,
    postgresql: siPostgresql,
    python: siPython,
    react: siReact,
    redis: siRedis,
    rust: siRust,
    tailwind: siTailwindcss,
    threejs: siThreedotjs,
    typescript: siTypescript,
    vercel: siVercel,
};

// Marks whose official colour is near-black disappear on this ground: light them instead.
const DARK_MARKS = new Set(["rust", "nextjs", "threejs", "angular", "pandas", "vercel"]);

export function brandColor(icon: string) {
    const entry = ICONS[icon];
    if (!entry || DARK_MARKS.has(icon)) return undefined;
    return `#${entry.hex}`;
}

export function BrandIcon({ icon }: { icon: string }) {
    const entry = ICONS[icon];
    if (!entry) return null;
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d={entry.path} />
        </svg>
    );
}
