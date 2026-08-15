"use client";

// Trait 8 reference table — three roles, one drug.
// Negative excitement can be dosed from the victim, the victimizer, or the rescuer
// position; each is a different tap into the same emotional intoxication. Responsive
// HTML, matching the sibling tables.

interface Props { className?: string; }

interface Row {
  label: string;
  victim: string;
  victimizer: string;
  rescuer: string;
}

const ROWS: Row[] = [
  {
    label: "Where the dose comes from",
    victim: "Being harmed, wronged, hit by one crisis after another — the jolt of it happening to us.",
    victimizer: "Controlling, criticizing, stirring the conflict — the surge of making it happen.",
    rescuer: "Diving into other people's emergencies — the rush of being needed in a crisis.",
  },
  {
    label: "What it looks like (work / home / meetings)",
    victim: "At work: the impossible boss, again. At home: chaos we somehow keep finding. Even in meetings: “my story is the worst here.”",
    victimizer: "At work: the pot-stirrer. At home: the fault-finder. Even in meetings: cross-talk, correction, control.",
    rescuer: "At work: everyone's unpaid fixer. At home: on call for every relative. Even in meetings: managing other people's recovery.",
  },
  {
    label: "What it quietly costs",
    victim: "We stay in danger and call it bad luck — complaining about circumstances we keep choosing.",
    victimizer: "People brace around us; closeness can't survive the sparks we throw.",
    rescuer: "Our own life goes unlived, and the people we “save” never get to grow.",
  },
  {
    label: "The recovery turn",
    victim: "Notice the dose. Name the pull toward the familiar jolt before saying yes to it.",
    victimizer: "Choose calm on purpose — let a disagreement stay small and survivable.",
    rescuer: "Let others hold their own crises; offer presence, not adrenaline.",
  },
];

export function ExcitementRolesTable({ className }: Props) {
  const columns: Array<{ key: "victim" | "victimizer" | "rescuer"; label: string; color: string; bg: string }> = [
    { key: "victim", label: "Victim · it happens to me", color: "#B85068", bg: "#FBEEF1" },
    { key: "victimizer", label: "Victimizer · I make it happen", color: "#C08A2D", bg: "#F7F0E3" },
    { key: "rescuer", label: "Rescuer · I fix what happens", color: "#8B7BA8", bg: "#F1EEF6" },
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
