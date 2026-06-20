"use client";

// Trait 4 reference table — the four ways the trait gets acted out, compared across lenses.
// "We either become alcoholics, marry them, or both, or find another compulsive personality...
//  We dominate others and abandon them before they can abandon us or we avoid relationships
//  with dependent people altogether."
// Rendered as real HTML (not SVG) so text wraps and stays readable at every width.

interface Props {
  className?: string;
}

interface Row {
  label: string;
  become: string;
  marry: string;
  dominate: string;
  avoid: string;
}

const ROWS: Row[] = [
  {
    label: "The move",
    become: "Become the compulsive one — alcohol, work, rage, control.",
    marry: "Partner with a compulsive, unavailable person.",
    dominate: "Take charge, then leave before they can leave you.",
    avoid: "Stay away from dependent people; isolate altogether.",
  },
  {
    label: "Fear underneath",
    become: "If I numb out, I won't have to feel the abandonment.",
    marry: "Familiar distance is safer than real closeness.",
    dominate: "If I leave first, it won't hurt the way being left did.",
    avoid: "If I never get close, I can never be abandoned again.",
  },
  {
    label: "What it costs",
    become: "We dose on an inside concoction of pain, fear, excitement.",
    marry: "We replay the old abandonment and call it love.",
    dominate: "We abandon people who could have stayed.",
    avoid: "We abandon ourselves — the loneliest leaving of all.",
  },
  {
    label: "The recovery turn",
    become: "Feel the wound instead of dosing it.",
    marry: "Choose available people; be true to yourself.",
    dominate: "Stay, and let the relationship deepen.",
    avoid: "Risk closeness with the equally available.",
  },
];

export function AbandonmentStrategiesTable({ className }: Props) {
  const columns: Array<{
    key: "become" | "marry" | "dominate" | "avoid";
    label: string;
    color: string;
    bg: string;
  }> = [
    { key: "become", label: "Become one", color: "#B85068", bg: "#FBEEF1" },
    { key: "marry", label: "Marry one", color: "#C08A2D", bg: "#F7F0E3" },
    { key: "dominate", label: "Leave first", color: "#2D4A3E", bg: "#E6EDE8" },
    { key: "avoid", label: "Avoid all", color: "#6B5B95", bg: "#EEEAF4" },
  ];

  return (
    <div className={className}>
      {/* Desktop + tablet: full grid */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-[var(--border)]">
        {/* Header row */}
        <div className="grid grid-cols-[150px_repeat(4,1fr)]">
          <div className="bg-[var(--muted)]/40" />
          {columns.map((c) => (
            <div
              key={c.key}
              className="px-3 py-3 font-serif text-sm font-bold text-center text-white"
              style={{ background: c.color }}
            >
              {c.label}
            </div>
          ))}
        </div>

        {/* Data rows */}
        {ROWS.map((row, ri) => {
          const isLast = ri === ROWS.length - 1;
          return (
            <div
              key={row.label}
              className="grid grid-cols-[150px_repeat(4,1fr)] border-t border-[var(--border)]"
            >
              <div className="flex items-start px-3 py-4 bg-[var(--primary)] text-[var(--primary-foreground)]">
                <span className="font-serif text-sm font-semibold leading-tight">
                  {row.label}
                </span>
              </div>
              {columns.map((c) => (
                <div
                  key={c.key}
                  className="px-3 py-4 text-[13px] leading-relaxed text-[var(--foreground)]"
                  style={{
                    background: c.bg,
                    fontStyle: isLast ? "italic" : "normal",
                    fontWeight: isLast ? 500 : 400,
                  }}
                >
                  {row[c.key]}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Mobile: stacked cards per strategy */}
      <div className="md:hidden space-y-4">
        {columns.map((c) => (
          <div
            key={c.key}
            className="overflow-hidden rounded-xl border border-[var(--border)]"
          >
            <div
              className="px-4 py-3 font-serif text-base font-bold text-white"
              style={{ background: c.color }}
            >
              {c.label}
            </div>
            <div className="divide-y divide-[var(--border)]" style={{ background: c.bg }}>
              {ROWS.map((row, ri) => {
                const isLast = ri === ROWS.length - 1;
                return (
                  <div key={row.label} className="px-4 py-3">
                    <div className="text-[10px] uppercase tracking-wider font-semibold text-[var(--primary)] mb-1">
                      {row.label}
                    </div>
                    <div
                      className="text-sm leading-relaxed text-[var(--foreground)]"
                      style={{ fontStyle: isLast ? "italic" : "normal" }}
                    >
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
