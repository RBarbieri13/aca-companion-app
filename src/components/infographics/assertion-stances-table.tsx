"use client";

// Trait 7 reference table — three stances of the voice compared across lenses.
// Passive / give in (The Laundry List) ↔ Aggressive / guilt others (The Other Laundry List)
// ↔ Assertive (the Flip Sides). Responsive HTML, matching the sibling tables.

interface Props { className?: string; }

interface Row {
  label: string;
  passive: string;
  aggressive: string;
  assertive: string;
}

const ROWS: Row[] = [
  {
    label: "The move",
    passive: "Give in, smooth it over, disappear my viewpoint.",
    aggressive: "Guilt-trip, slight, or attack whoever asserts themselves.",
    assertive: "Say what's true for me, calmly, and let it stand.",
  },
  {
    label: "The goal",
    passive: "Survive the family's denial system; keep the peace.",
    aggressive: "Prevent any expression of the other's True Self.",
    assertive: "Let both True Selves have the birthright of expression.",
  },
  {
    label: "The payoff",
    passive: "Not feeling my feelings.",
    aggressive: "A false sense of mastery, domination, and control.",
    assertive: "Being genuine and human — feelings included.",
  },
  {
    label: "The cost",
    passive: "Countless small deaths · “Where am I in all this?”",
    aggressive: "People turn away, or get drawn into the control.",
    assertive: "Occasional choppy waters — worth every swell.",
  },
  {
    label: "The recovery turn",
    passive: "Pause until my own viewpoint finishes forming — then speak.",
    aggressive: "Notice the discomfort when others assert; cheer instead of silence.",
    assertive: "Keep course by the inner compass; re-adjust with the Steps.",
  },
];

export function AssertionStancesTable({ className }: Props) {
  const columns: Array<{ key: "passive" | "aggressive" | "assertive"; label: string; color: string; bg: string }> = [
    { key: "passive", label: "Passive · give in", color: "#B85068", bg: "#FBEEF1" },
    { key: "aggressive", label: "Aggressive · guilt them", color: "#C08A2D", bg: "#F7F0E3" },
    { key: "assertive", label: "Assertive · both voices", color: "#2D4A3E", bg: "#E6EDE8" },
  ];

  return (
    <div className={className}>
      {/* Desktop + tablet */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-[var(--border)]">
        <div className="grid grid-cols-[150px_repeat(3,1fr)]">
          <div className="bg-[var(--muted)]/40" />
          {columns.map((c) => (
            <div key={c.key} className="px-4 py-3 font-serif text-sm font-bold text-center text-white" style={{ background: c.color }}>
              {c.label}
            </div>
          ))}
        </div>
        {ROWS.map((row, ri) => {
          const isLast = ri === ROWS.length - 1;
          return (
            <div key={row.label} className="grid grid-cols-[150px_repeat(3,1fr)] border-t border-[var(--border)]">
              <div className="flex items-start px-4 py-4 bg-[var(--primary)] text-[var(--primary-foreground)]">
                <span className="font-serif text-sm font-semibold leading-tight">{row.label}</span>
              </div>
              {columns.map((c) => (
                <div
                  key={c.key}
                  className="px-4 py-4 text-[13px] leading-relaxed text-[var(--foreground)]"
                  style={{ background: c.bg, fontStyle: isLast ? "italic" : "normal", fontWeight: isLast ? 500 : 400 }}
                >
                  {row[c.key]}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-4">
        {columns.map((c) => (
          <div key={c.key} className="overflow-hidden rounded-xl border border-[var(--border)]">
            <div className="px-4 py-3 font-serif text-base font-bold text-white" style={{ background: c.color }}>
              {c.label}
            </div>
            <div className="divide-y divide-[var(--border)]" style={{ background: c.bg }}>
              {ROWS.map((row, ri) => {
                const isLast = ri === ROWS.length - 1;
                return (
                  <div key={row.label} className="px-4 py-3">
                    <div className="text-[10px] uppercase tracking-wider font-semibold text-[var(--primary)] mb-1">{row.label}</div>
                    <div className="text-sm leading-relaxed text-[var(--foreground)]" style={{ fontStyle: isLast ? "italic" : "normal" }}>
                      {row[c.key]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
