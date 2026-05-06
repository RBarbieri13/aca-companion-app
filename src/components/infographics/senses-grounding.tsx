"use client";

// Trait 3 — Flip Side of The Laundry List quadrant.
// "ORIENTATION — Be Prepared to Engage Your Senses"
// Look at some things (actual) · Make a noise · Eat a peach · Smell some cinnamon · Pat your face.
// A grounding tool for moving out of dissociation when fear of anger or criticism floods us.

interface Props { className?: string; }

export function SensesGrounding({ className }: Props) {
  const senses = [
    { label: "Look",   detail: "at some things (actual)", color: "var(--primary)",          angle: -90 },
    { label: "Listen", detail: "make a noise",            color: "var(--accent)",           angle: -18 },
    { label: "Taste",  detail: "eat a peach",             color: "var(--sage)",             angle: 54  },
    { label: "Smell",  detail: "some cinnamon",           color: "var(--muted-foreground)", angle: 126 },
    { label: "Touch",  detail: "pat your face",           color: "var(--primary)",          angle: 198 },
  ];

  const cx = 250, cy = 170, r = 110;

  return (
    <svg viewBox="0 0 500 340" className={className} role="img" aria-label="Engage your senses — a grounding tool for returning to the present">
      {/* Top caption */}
      <text x="250" y="22" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="600" fill="var(--muted-foreground)">
        ORIENTATION
      </text>
      <text x="250" y="38" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
        Be prepared to engage your senses
      </text>

      {/* Faint outer ring */}
      <circle cx={cx} cy={cy} r={r + 30} fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="2 4" opacity="0.5"/>

      {/* Center — the present moment */}
      <g>
        <circle cx={cx} cy={cy} r="48" fill="var(--card)" stroke="var(--sage)" strokeWidth="1.5"/>
        <text x={cx} y={cy - 8} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" letterSpacing="1.5" fontWeight="600">
          HERE · NOW
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontStyle="italic" fontWeight="600" fill="var(--primary)">
          Adult body
        </text>
        <text x={cx} y={cy + 28} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)">
          out of the loop
        </text>
      </g>

      {/* Sense nodes around the circle */}
      {senses.map((s) => {
        const rad = (s.angle * Math.PI) / 180;
        const x = cx + Math.cos(rad) * r;
        const y = cy + Math.sin(rad) * r;
        const labelOffset = 32;
        const lx = cx + Math.cos(rad) * (r + labelOffset);
        const ly = cy + Math.sin(rad) * (r + labelOffset);
        return (
          <g key={s.label}>
            {/* connection from center to node */}
            <line x1={cx} y1={cy} x2={x} y2={y} stroke={s.color} strokeWidth="0.75" opacity="0.35"/>
            <circle cx={x} cy={y} r="20" fill="var(--muted)" stroke={s.color} strokeWidth="1.75"/>
            <text x={x} y={y + 4} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11" fontWeight="600" fill={s.color}>
              {s.label}
            </text>
            <text x={lx} y={ly + 3} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">
              {s.detail}
            </text>
          </g>
        );
      })}

      {/* Bottom caption */}
      <text x="250" y="316" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)">
        Each sense tells the nervous system: <tspan fontStyle="italic">it&apos;s not that time anymore.</tspan>
      </text>
      <text x="250" y="328" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">
        We are no longer small.
      </text>
    </svg>
  );
}
