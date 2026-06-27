"use client";

// Trait 6 reference table — three postures of responsibility compared across lenses.
// Over-responsible (The Laundry List) ↔ Irresponsible/self-centered (The Other Laundry List)
// ↔ Right-sized / self-caring (the Flip Side). Responsive HTML, like the sibling tables.

interface Props { className?: string; }

interface Row {
  label: string;
  over: string;
  under: string;
  right: string;
}

const ROWS: Row[] = [
  {
    label: "Focus",
    over: "Glued to others — their moods, needs, and messes.",
    under: "Glued to self-importance; others barely register.",
    right: "Enough of me for me, enough room for you.",
  },
  {
    label: "Underneath",
    over: "Inferiority — “I must, because I'm not enough.”",
    under: "Grandiosity — “I'm better than, so the rules don't apply.”",
    right: "Capable AND worthwhile — no pole to defend.",
  },
  {
    label: "What it avoids",
    over: "Looking too closely at my own faults.",
    under: "Seeing my own deficiencies and shortcomings.",
    right: "Nothing — the in-depth inventory looks honestly.",
  },
  {
    label: "Energy",
    over: "Drained — managing everyone uses up my power.",
    under: "Spent on image and being right.",
    right: "Restored — released back to my own life.",
  },
  {
    label: "Recovery turn",
    over: "Stop enabling; let others carry their decisions.",
    under: "Right-size; ask to have shortcomings removed.",
    right: "Live self-focused and self-caring, free of both burdens.",
  },
];

export function ResponsibilityPatternsTable({ className }: Props) {
  const columns: Array<{ key: "over" | "under" | "right"; label: string; color: string; bg: string }> = [
    { key: "over", label: "Over-responsible", color: "#B85068", bg: "#FBEEF1" },
    { key: "under", label: "Self-centered", color: "#C08A2D", bg: "#F7F0E3" },
    { key: "right", label: "Right-sized", color: "#2D4A3E", bg: "#E6EDE8" },
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
