"use client";

// Trait 8 reference table — telling the dose from real aliveness from the new baseline.
// Negative excitement (the dose) ↔ positive excitement (real aliveness) ↔ calm (the
// new baseline recovery makes possible). Responsive HTML, matching the sibling tables.

interface Props { className?: string; }

interface Row {
  label: string;
  negative: string;
  positive: string;
  calm: string;
}

const ROWS: Row[] = [
  {
    label: "Where it comes from",
    negative: "Danger, drama, untrustworthy people — anything that jolts the old wiring.",
    positive: "Real life opening up: a new venture, honest intimacy, play, making something.",
    calm: "A settled body and workable relationships — the baseline recovery resets.",
  },
  {
    label: "How the body feels",
    negative: "Braced and buzzing — tight jaw, shallow breath, that familiar dread-thrill.",
    positive: "Energized and open — heart lifted, breath full, feet still on the ground.",
    calm: "Settled. Shoulders down, breath low and slow — and still fully awake.",
  },
  {
    label: "The aftermath",
    negative: "A crash, then craving — and a fresh complaint about our circumstances.",
    positive: "Satisfaction that lasts; a memory that feeds us instead of draining us.",
    calm: "Nothing to recover from. Quiet stops sounding like a warning.",
  },
  {
    label: "What it builds in relationships",
    negative: "Constant upset — intensity mistaken for intimacy.",
    positive: "Shared joy and adventure, chosen together rather than inflicted.",
    calm: "Trust — life-enriching bonds that further our spiritual development.",
  },
  {
    label: "The recovery move",
    negative: "Name the pull: “this is the dose.” Wait before saying yes to it.",
    positive: "Say yes on purpose — excitement can be chosen, not just suffered.",
    calm: "Sit inside it until foreign becomes home — a spiritually conscious decision.",
  },
];

export function ExcitementDiscernmentTable({ className }: Props) {
  const columns: Array<{ key: "negative" | "positive" | "calm"; label: string; color: string; bg: string }> = [
    { key: "negative", label: "Negative excitement · the dose", color: "#B85068", bg: "#FBEEF1" },
    { key: "positive", label: "Positive excitement · real aliveness", color: "#C08A2D", bg: "#F7F0E3" },
    { key: "calm", label: "Calm · the new baseline", color: "#2D4A3E", bg: "#E6EDE8" },
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
