"use client";

// A compact, distinct SVG glyph for every glossary concept. Each glyph is
// composed from the concept id so no two look alike, in the house palette.
// House colors: primary (program), accent (problem/warning), sage (growth).

const PALETTE = ["var(--primary)", "var(--accent)", "var(--sage)", "#8B7BA8", "#D4A84B"];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

// Bespoke glyph "recipes" for the most-referenced concepts; others fall back to
// a deterministic abstract mark. All share the soft, rounded house style.
type Recipe = (c: { a: string; b: string; c: string }) => React.ReactNode;

const RECIPES: Record<string, Recipe> = {
  powerlessness: ({ a }) => (
    <>
      <path d="M14 34 Q24 14 34 34" fill="none" stroke={a} strokeWidth="3" strokeLinecap="round" />
      <circle cx="24" cy="34" r="3.5" fill={a} />
    </>
  ),
  "higher-power": ({ a, c }) => (
    <>
      <circle cx="24" cy="24" r="12" fill="none" stroke={a} strokeWidth="2.5" />
      <circle cx="24" cy="24" r="4" fill={c} />
      {[0, 60, 120, 180, 240, 300].map((d) => (
        <line
          key={d}
          x1={24 + Math.cos((d * Math.PI) / 180) * 14}
          y1={24 + Math.sin((d * Math.PI) / 180) * 14}
          x2={24 + Math.cos((d * Math.PI) / 180) * 18}
          y2={24 + Math.sin((d * Math.PI) / 180) * 18}
          stroke={a}
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}
    </>
  ),
  resentment: ({ a }) => (
    <>
      <circle cx="24" cy="24" r="13" fill="none" stroke={a} strokeWidth="2.5" />
      <path d="M18 28 Q24 24 30 28" fill="none" stroke={a} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="19" cy="20" r="1.8" fill={a} />
      <circle cx="29" cy="20" r="1.8" fill={a} />
    </>
  ),
  fear: ({ a }) => (
    <>
      <path d="M24 12 L34 32 H14 Z" fill="none" stroke={a} strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="24" y1="20" x2="24" y2="26" stroke={a} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="30" r="1.6" fill={a} />
    </>
  ),
  humility: ({ a, c }) => (
    <>
      <line x1="24" y1="14" x2="24" y2="22" stroke={a} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="12" y1="24" x2="36" y2="24" stroke={a} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="14" cy="30" r="3" fill={c} />
      <circle cx="34" cy="30" r="3" fill={c} />
    </>
  ),
  "the-promises": ({ c }) => (
    <>
      <path d="M12 30 Q24 14 36 30" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="20" r="2.5" fill={c} />
    </>
  ),
  halt: ({ a }) => (
    <>
      <circle cx="24" cy="24" r="12" fill="none" stroke={a} strokeWidth="2.5" />
      <line x1="16" y1="16" x2="32" y2="32" stroke={a} strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
  "one-day-at-a-time": ({ a, c }) => (
    <>
      <circle cx="24" cy="24" r="13" fill="none" stroke={a} strokeWidth="2.5" />
      <line x1="24" y1="24" x2="24" y2="15" stroke={c} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="24" y1="24" x2="31" y2="27" stroke={a} strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
};

export function ConceptGlyph({ id, size = 56 }: { id: string; size?: number }) {
  const h = hash(id);
  const a = PALETTE[h % PALETTE.length];
  const b = PALETTE[(h >> 3) % PALETTE.length];
  const c = PALETTE[(h >> 6) % PALETTE.length];
  const recipe = RECIPES[id];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label={`${id} glyph`}
      className="shrink-0"
    >
      <rect x="2" y="2" width="44" height="44" rx="12" fill={a} fillOpacity="0.1" stroke={a} strokeOpacity="0.3" />
      {recipe ? (
        recipe({ a, b, c })
      ) : (
        // Deterministic abstract mark for concepts without a bespoke recipe.
        <>
          <circle cx="24" cy="24" r={8 + (h % 4)} fill="none" stroke={a} strokeWidth="2.5" />
          <circle cx={18 + (h % 8)} cy={20 + ((h >> 2) % 8)} r="3" fill={b} />
          <line
            x1="14"
            y1={30 - (h % 6)}
            x2="34"
            y2={30 - ((h >> 4) % 6)}
            stroke={c}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}
