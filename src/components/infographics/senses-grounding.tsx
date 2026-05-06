"use client";

// Trait 3 — Flip Side of The Laundry List quadrant.
// "ORIENTATION — Be Prepared to Engage Your Senses"
// Look at some things (actual) · Make a noise · Eat a peach · Smell some cinnamon · Pat your face.
// A grounding tool for moving out of dissociation when fear of anger or criticism floods us.

interface Props { className?: string; }

export function SensesGrounding({ className }: Props) {
  const senses = [
    {
      label: "Look",
      detail: "at some things (actual)",
      example: "name 5 things you can see",
      color: "var(--primary)",
      angle: -90,
    },
    {
      label: "Listen",
      detail: "make a noise",
      example: "hum · clap · play music",
      color: "var(--accent)",
      angle: -18,
    },
    {
      label: "Taste",
      detail: "eat a peach",
      example: "anything sharp · cold · real",
      color: "var(--sage)",
      angle: 54,
    },
    {
      label: "Smell",
      detail: "some cinnamon",
      example: "coffee · soap · tea · zest",
      color: "#8B7BA8",
      angle: 126,
    },
    {
      label: "Touch",
      detail: "pat your face",
      example: "feet on floor · cold water",
      color: "#D4A84B",
      angle: 198,
    },
  ];

  const cx = 270, cy = 200, r = 116;

  return (
    <svg viewBox="0 0 540 440" className={className} role="img" aria-label="Engage your senses — a grounding tool for returning to the present">
      {/* Top caption */}
      <text x="270" y="22" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">
        ORIENTATION
      </text>
      <text x="270" y="40" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
        Be prepared to engage your senses
      </text>

      {/* BEFORE strip — left edge */}
      <g>
        <rect x="20" y="76" width="78" height="66" rx="10" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.5"/>
        <text x="59" y="93" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" letterSpacing="0.8" fill="var(--accent)">
          BEFORE
        </text>
        <text x="59" y="108" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
          flooded
        </text>
        <text x="59" y="120" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
          dissociated
        </text>
        <text x="59" y="132" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
          5 years old
        </text>
      </g>

      {/* AFTER strip — right edge */}
      <g>
        <rect x="442" y="76" width="78" height="66" rx="10" fill="var(--sage)" fillOpacity="0.18" stroke="var(--sage)" strokeWidth="1" strokeOpacity="0.6"/>
        <text x="481" y="93" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" letterSpacing="0.8" fill="var(--sage)">
          AFTER
        </text>
        <text x="481" y="108" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
          present
        </text>
        <text x="481" y="120" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
          oriented
        </text>
        <text x="481" y="132" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
          adult body
        </text>
      </g>

      {/* Faint outer ring */}
      <circle cx={cx} cy={cy} r={r + 38} fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="2 4" opacity="0.5"/>

      {/* Center — the present moment */}
      <g>
        <circle cx={cx} cy={cy} r="56" fill="var(--card)" stroke="var(--sage)" strokeWidth="1.75"/>
        <circle cx={cx} cy={cy} r="40" fill="var(--sage)" fillOpacity="0.10"/>
        <text x={cx} y={cy - 14} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" letterSpacing="1.5" fontWeight="700">
          HERE · NOW
        </text>
        <text x={cx} y={cy + 4} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontStyle="italic" fontWeight="600" fill="var(--primary)">
          Adult body
        </text>
        <text x={cx} y={cy + 22} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)">
          out of the loop
        </text>
      </g>

      {/* Sense nodes around the circle */}
      {senses.map((s, i) => {
        const rad = (s.angle * Math.PI) / 180;
        const x = cx + Math.cos(rad) * r;
        const y = cy + Math.sin(rad) * r;
        const labelOffset = 38;
        const lx = cx + Math.cos(rad) * (r + labelOffset);
        const ly = cy + Math.sin(rad) * (r + labelOffset);
        return (
          <g key={s.label}>
            {/* connection from center to node */}
            <line x1={cx} y1={cy} x2={x} y2={y} stroke={s.color} strokeWidth="0.75" opacity="0.35"/>
            <circle cx={x} cy={y} r="22" fill="var(--muted)" stroke={s.color} strokeWidth="2"/>
            <text x={x} y={y - 2} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11" fontWeight="600" fill={s.color}>
              {s.label}
            </text>
            <text x={x} y={y + 9} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="6.5" fontWeight="700" fill={s.color} letterSpacing="0.5">
              {`#${i + 1}`}
            </text>
            <text x={lx} y={ly} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="600" fill="var(--foreground)">
              {s.detail}
            </text>
            <text x={lx} y={ly + 11} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
              {s.example}
            </text>
          </g>
        );
      })}

      {/* Bottom: how to use */}
      <g>
        <rect x="40" y="368" width="460" height="58" rx="10" fill="var(--muted)" fillOpacity="0.4"/>
        <text x="270" y="386" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--muted-foreground)">
          HOW TO USE
        </text>
        <text x="270" y="402" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.85">
          Pick any one. Stay 30–60 seconds. Each sense tells the body
          <tspan fontStyle="italic">: it&apos;s not that time anymore.</tspan>
        </text>
        <text x="270" y="416" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">
          Then return to the conversation as the adult who was always here.
        </text>
      </g>
    </svg>
  );
}
