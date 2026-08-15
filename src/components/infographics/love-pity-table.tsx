"use client";

// Trait 9 reference table — love vs pity vs rescue, compared across six lenses.
// Mirrors the FourRoleTable / AssertionStancesTable pattern.
// "We are able to distinguish love from pity, and do not think 'rescuing' people we
// 'pity' is an act of love."

interface Props {
  className?: string;
}

interface Row {
  label: string;
  love: string;
  pity: string;
  rescue: string;
}

const ROWS: Row[] = [
  {
    label: "Where it looks from",
    love: "Eye level. Two people facing each other as equals.",
    pity: "Slightly above. It looks down and feels sorry.",
    rescue: "Overhead. It swoops in before anyone asks.",
  },
  {
    label: "What it says",
    love: "“I see you. I'm with you.”",
    pity: "“You poor thing.”",
    rescue: "“Hold still — I'll fix this.”",
  },
  {
    label: "What it asks of the other person",
    love: "Only their real self — room to be strong and struggling at once.",
    pity: "To stay a little pitiful, so the feeling of caring can continue.",
    rescue: "To stay in trouble, so the rescuer stays needed.",
  },
  {
    label: "How both people end up",
    love: "Two grown-ups, both still growing.",
    pity: "One lifted, one lowered — a relationship of unequals.",
    rescue: "One indispensable, one dependent — and both stuck.",
  },
  {
    label: "The aftertaste",
    love: "Warmth that lasts after the visit ends.",
    pity: "A vague heaviness, as if something is owed.",
    rescue: "Exhaustion, resentment, and a strange emptiness.",
  },
  {
    label: "The recovery turn",
    love: "Keep choosing it — the Flip Side: love without pity.",
    pity: "Notice the looking-down. Return to eye level before speaking.",
    rescue: "Ask first. Let capable people carry what is theirs.",
  },
];

export function LovePityTable({ className }: Props) {
  const columns: Array<{
    key: "love" | "pity" | "rescue";
    label: string;
    color: string;
    bg: string;
  }> = [
    { key: "love", label: "Love", color: "#2D4A3E", bg: "#E6EDE8" },
    { key: "pity", label: "Pity", color: "#B85068", bg: "#FBEEF1" },
    { key: "rescue", label: "Rescue", color: "#C08A2D", bg: "#F7F0E3" },
  ];

  return (
    <div className={className}>
      {/* Desktop + tablet: full grid */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-[var(--border)]">
        {/* Header row */}
        <div className="grid grid-cols-[170px_repeat(3,1fr)]">
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
              className="grid grid-cols-[170px_repeat(3,1fr)] border-t border-[var(--border)]"
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

      {/* Mobile: stacked cards per stance */}
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
