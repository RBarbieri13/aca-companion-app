"use client";

// Event → reaction → pause → chosen response. Visualizes the reparenting move.

interface Props { className?: string; }

export function TriggerFlow({ className }: Props) {
  const steps = [
    { label: "Event", sub: "something happens", color: "var(--accent)" },
    { label: "Old reaction", sub: "childhood autopilot", color: "#C97B5E" },
    { label: "Pause", sub: "notice the body", color: "var(--muted-foreground)" },
    { label: "Chosen response", sub: "adult self chooses", color: "var(--primary)" },
  ];

  return (
    <svg viewBox="0 0 620 140" className={className} role="img" aria-label="From trigger to chosen response">
      <defs>
        <marker id="arrowhead-trg" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)"/>
        </marker>
      </defs>

      {steps.map((s, i) => {
        const x = 30 + i * 145;
        return (
          <g key={i}>
            <rect x={x} y="35" width="130" height="60" rx="10" fill="var(--card)" stroke={s.color} strokeWidth="1.5"/>
            <text x={x + 65} y="60" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill={s.color}>
              {s.label}
            </text>
            <text x={x + 65} y="78" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)">
              {s.sub}
            </text>
            {/* Arrow to next */}
            {i < steps.length - 1 && (
              <line
                x1={x + 132}
                y1="65"
                x2={x + 143}
                y2="65"
                stroke="var(--muted-foreground)"
                strokeWidth="1.5"
                markerEnd="url(#arrowhead-trg)"
              />
            )}
          </g>
        );
      })}

      {/* Before / After labels */}
      <text x="160" y="122" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" letterSpacing="1" fontWeight="600">
        BEFORE RECOVERY
      </text>
      <text x="460" y="122" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--primary)" letterSpacing="1" fontWeight="600">
        WITH RECOVERY
      </text>

      {/* Dividing line */}
      <line x1="310" y1="25" x2="310" y2="105" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6"/>
    </svg>
  );
}
