"use client";

// A comparison table showing three unhealthy relational patterns:
// Enmeshment, Codependency, Disengagement — and how each shows up across 5 lenses.
// Directly supports Trait 2's Other Laundry List (the swing between enmeshment
// and rigid self-sufficiency).
//
// Rendered as real HTML (not SVG) so text wraps and stays readable at every width.

interface Props {
  className?: string;
}

interface Row {
  label: string;
  enmeshment: string;
  codependency: string;
  disengagement: string;
}

const ROWS: Row[] = [
  {
    label: "Boundaries",
    enmeshment: "No real boundaries; everyone's in each other's business.",
    codependency: "Weak boundaries; always putting others first.",
    disengagement: "Walls up; everyone keeps to themselves.",
  },
  {
    label: "Emotional needs",
    enmeshment: "Feel obligated to meet others' needs, often out of guilt.",
    codependency: "Feel needed by fixing or helping others.",
    disengagement: "Don't share or talk about feelings much.",
  },
  {
    label: "Independence",
    enmeshment: "Wanting space feels wrong or selfish; seen as betrayal.",
    codependency: "Afraid to be on your own.",
    disengagement: "Everyone acts like they don't need each other.",
  },
  {
    label: "Identity",
    enmeshment: "Hard to know who you are outside the relationship.",
    codependency: "Self-worth comes from being needed.",
    disengagement: "Don't feel connected to others.",
  },
  {
    label: "Example",
    enmeshment:
      "A mom expects her grown child to tell her everything and feels hurt if they don't.",
    codependency: "A partner ignores their own needs to \u201Cfix\u201D the other person.",
    disengagement: "Family members barely talk, even when something's wrong.",
  },
];

export function RelationalPatternsTable({ className }: Props) {
  const columns: Array<{
    key: "enmeshment" | "codependency" | "disengagement";
    label: string;
    color: string;
    bg: string;
  }> = [
    { key: "enmeshment", label: "Enmeshment", color: "#B85068", bg: "#FBEEF1" },
    { key: "codependency", label: "Codependency", color: "#4A9BB8", bg: "#EAF4F8" },
    { key: "disengagement", label: "Disengagement", color: "#2D4A3E", bg: "#E6EDE8" },
  ];

  return (
    <div className={className}>
      {/* Desktop + tablet: full grid */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-[var(--border)]">
        {/* Header row */}
        <div className="grid grid-cols-[140px_repeat(3,1fr)]">
          <div className="bg-[var(--muted)]/40" />
          {columns.map((c) => (
            <div
              key={c.key}
              className="px-4 py-3 font-serif text-base font-bold text-center text-white"
              style={{ background: c.color }}
            >
              {c.label}
            </div>
          ))}
        </div>

        {/* Data rows */}
        {ROWS.map((row, ri) => (
          <div
            key={row.label}
            className="grid grid-cols-[140px_repeat(3,1fr)] border-t border-[var(--border)]"
          >
            <div className="flex items-start px-4 py-4 bg-[var(--primary)] text-[var(--primary-foreground)]">
              <span className="font-serif text-sm md:text-base font-semibold leading-tight">
                {row.label}
              </span>
            </div>
            {columns.map((c) => {
              const isLast = ri === ROWS.length - 1;
              return (
                <div
                  key={c.key}
                  className="px-4 py-4 text-sm leading-relaxed text-[var(--foreground)]"
                  style={{
                    background: c.bg,
                    fontStyle: isLast ? "italic" : "normal",
                  }}
                >
                  {row[c.key]}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Mobile: stacked cards per pattern */}
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
