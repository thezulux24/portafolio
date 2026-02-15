"use client";

import { useMemo, type CSSProperties } from "react";

export interface TechItem {
  id: string;
  name: string;
  icon: string;
  brandColor: string;
}

export interface TechMarquee3DProps {
  items: TechItem[];
}

function toGlowColor(hexColor: string): string {
  const normalized = hexColor.replace("#", "").trim();
  const value = normalized.length === 3
    ? normalized
        .split("")
        .map((character) => `${character}${character}`)
        .join("")
    : normalized;

  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, 0.38)`;
}

function TechCard({ item }: { item: TechItem }) {
  const color = item.brandColor.startsWith("#") ? item.brandColor : `#${item.brandColor}`;
  const style = {
    "--tech-color": color,
    "--tech-glow": toGlowColor(color),
  } as CSSProperties;

  return (
    <article
      tabIndex={0}
      style={style}
      className="tech-card-3d flex h-16 min-w-36 shrink-0 items-center gap-3 rounded-xl border border-white/15 bg-zinc-900/70 px-3.5 shadow-[0_12px_26px_-18px_rgba(0,0,0,0.9)] outline-none transition-colors hover:border-[color:var(--tech-color)] hover:shadow-[0_18px_42px_-18px_var(--tech-glow)] focus-visible:border-[color:var(--tech-color)] focus-visible:shadow-[0_18px_42px_-18px_var(--tech-glow)] sm:min-w-40 sm:px-4"
    >
      <div className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-black/50 text-white">
        <svg viewBox="0 0 24 24" role="img" aria-label={item.name} className="h-5 w-5">
          <path fill="currentColor" d={item.icon} />
        </svg>
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-white">{item.name}</p>

      </div>
    </article>
  );
}

export function TechMarquee3D({ items }: TechMarquee3DProps) {
  const topTrack = useMemo(() => [...items, ...items], [items]);
  const bottomTrack = useMemo(() => [...items].reverse().concat([...items].reverse()), [items]);

  if (!items.length) {
    return null;
  }

  return (
    <div className="tech-marquee-paused tech-marquee-mask relative w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent px-3 py-4 sm:px-4">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_transparent_52%)]" />
      <div className="relative space-y-3">
        <div className="w-full overflow-hidden">
          <div className="tech-marquee-track tech-marquee-left">
            {topTrack.map((item, index) => (
              <TechCard key={`${item.id}-top-${index}`} item={item} />
            ))}
          </div>
        </div>

        <div className="w-full overflow-hidden">
          <div className="tech-marquee-track tech-marquee-right">
            {bottomTrack.map((item, index) => (
              <TechCard key={`${item.id}-bottom-${index}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
