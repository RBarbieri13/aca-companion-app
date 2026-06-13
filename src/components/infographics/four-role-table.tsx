"use client";

// Trait 5 reference table — the four roles of the Game of Dissociation compared across
// lenses. Mirrors the AbandonmentStrategiesTable pattern from Trait 4.
// "Victim, victimizer, rescuer I, or rescuer II" — every member of the family is given one.

interface Props {
  className?: string;
}

interface Row {
  label: string;
  rescuer1: string;
  rescuer2: string;
  victim: string;
  victimizer: string;
}

const ROWS: Row[] = [
  {
    label: "The move",
    rescuer1: "Fix the family. Hold everything together as the responsible one.",
    rescuer2: "Hunt for someone disadvantaged to “help” — feel the surge.",
    victim: "Live from “this is happening to me.” Shrug of resignation.",
    victimizer: "Take charge. Manipulate. Choose only the subservient.",
  },
  {
    label: "What feels true",
    rescuer1: "If I keep working, things won't fall apart.",
    rescuer2: "Helping makes me powerful and good.",
    victim: "I have no real say. Other people decide my life.",
    victimizer: "Weak people lose. I am determined to be among the winners.",
  },
  {
    label: "What it costs",
    rescuer1: "Exhaustion · resentment · disconnection from own needs.",
    rescuer2: "Relationships of unequals · a hidden contempt for the helped.",
    victim: "Power left on the table. Choices made by default.",
    victimizer: "Friends drift away. Recognition of love becomes impossible.",
  },
  {
    label: "The recovery turn",
    rescuer1: "Let the family member be a grown-up. Tend the Inner Child.",
    rescuer2: "Notice the surge. Choose equal relationships on purpose.",
    victim: "See yourself as a participant. Exercise incremental power.",
    victimizer: "Change the question: “How can I humbly participate?”",
  },
];

export function FourRoleTable({ className }: Props) {
  const columns: Array<{
    key: "rescuer1" | "rescuer2" | "victim" | "victimizer";
    label: string;
    color: string;
    bg: string;
  }> = [
    { key: "rescuer1", label: "Rescuer I", color: "#2D4A3E", bg: "#E6EDE8" },
    { key: "rescuer2", label: "Rescuer II", color: "#6B5B95", bg: "#EEEAF4" },
    { key: "victim", label: "Victim", color: "#B85068", bg: "#FBEEF1" },
    { key: "victimizer", label: "Victimizer", color: "#C08A2D", bg: "#F7F0E3" },
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

      {/* Mobile: stacked cards per role */}
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
