"use client";

// Trait 3 — Laundry List quadrant.
// The workbook describes "dosing" with the inside drugs of worry (cortisol),
// fear (adrenaline), and pain (melatonin) to numb the trauma we couldn't process.

interface Props { className?: string; }

export function InsideDrugs({ className }: Props) {
  const drugs = [
    {
      label: "Worry",
      chemical: "cortisol",
      color: "var(--accent)",
      x: 110,
      hint: "scanning for danger",
      example: "“I bet they’re mad…”",
    },
    {
      label: "Fear",
      chemical: "adrenaline",
      color: "var(--primary)",
      x: 250,
      hint: "fight or flight",
      example: "racing heart · frozen voice",
    },
    {
      label: "Pain",
      chemical: "melatonin",
      color: "#8B7BA8",
      x: 390,
      hint: "shut down · numb",
      example: "“I just want to sleep.”",
    },
  ];

  return (
    <svg viewBox="0 0 500 380" className={className} role="img" aria-label="The inside drugs cycle: worry, fear, and pain as numbing chemistry">
      <defs>
        <linearGradient id="numb-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0.05"/>
          <stop offset="100%" stopColor="var(--foreground)" stopOpacity="0.18"/>
        </linearGradient>
        <marker id="loop-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)"/>
        </marker>
      </defs>

      {/* Top caption */}
      <text x="250" y="22" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="600" fill="var(--muted-foreground)">
        WHEN THE TRAUMA WAS TOO MUCH FOR A TINY BODY
      </text>
      <text x="250" y="38" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fill="var(--muted-foreground)" fontStyle="italic">
        we &ldquo;dosed&rdquo; ourselves with what was already inside us
      </text>

      {/* Subtle vertical drip lines from drops to body */}
      {drugs.map((d) => (
        <line
          key={`drip-${d.label}`}
          x1={d.x}
          y1="178"
          x2={d.x}
          y2="232"
          stroke={d.color}
          strokeWidth="1"
          strokeDasharray="2 3"
          opacity="0.45"
        />
      ))}

      {/* Three droplets / vials */}
      {drugs.map((d) => (
        <g key={d.label}>
          {/* Droplet */}
          <path
            d={`M ${d.x} 70 Q ${d.x - 28} 110 ${d.x - 28} 130 Q ${d.x - 28} 158 ${d.x} 158 Q ${d.x + 28} 158 ${d.x + 28} 130 Q ${d.x + 28} 110 ${d.x} 70 Z`}
            fill={d.color}
            fillOpacity="0.18"
            stroke={d.color}
            strokeWidth="1.75"
          />
          <ellipse cx={d.x - 8} cy="105" rx="6" ry="10" fill="white" fillOpacity="0.45"/>

          <text x={d.x} y="125" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontWeight="600" fill={d.color}>
            {d.label}
          </text>
          <text x={d.x} y="142" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
            {d.chemical}
          </text>

          <text x={d.x} y="180" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="600" fill="var(--foreground)" letterSpacing="0.5">
            {d.hint}
          </text>
          <text x={d.x} y="194" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">
            {d.example}
          </text>
        </g>
      ))}

      {/* Body line beneath the three drops */}
      <line x1="60" y1="234" x2="440" y2="234" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6"/>

      {/* Numb body silhouette */}
      <g>
        <text x="250" y="228" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.5" fontWeight="600" fill="var(--muted-foreground)">
          THE FEELINGS GO NUMB
        </text>
        <rect x="200" y="244" width="100" height="60" rx="14" fill="url(#numb-grad)" stroke="var(--foreground)" strokeOpacity="0.18"/>
        <circle cx="250" cy="262" r="9" fill="var(--foreground)" fillOpacity="0.18"/>
        <rect x="240" y="272" width="20" height="22" rx="6" fill="var(--foreground)" fillOpacity="0.16"/>
      </g>

      {/* Side labels: avoid pole and aggressor pole both run on dosing */}
      <g>
        <rect x="20" y="248" width="120" height="42" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4"/>
        <text x="80" y="263" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--accent)" fontWeight="700" letterSpacing="0.5">
          THE AVOIDER
        </text>
        <text x="80" y="277" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">
          worry · fear · pain
        </text>
        <text x="80" y="287" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)">
          (the victim position)
        </text>

        <rect x="360" y="248" width="120" height="42" rx="8" fill="var(--primary)" fillOpacity="0.08" stroke="var(--primary)" strokeWidth="1" strokeOpacity="0.4"/>
        <text x="420" y="263" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--primary)" fontWeight="700" letterSpacing="0.5">
          THE AGGRESSOR
        </text>
        <text x="420" y="277" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">
          adrenaline of control
        </text>
        <text x="420" y="287" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)">
          (taking charge)
        </text>
      </g>

      {/* Feedback loop — dose → numb → unable to feel → dose more */}
      <g>
        <text x="250" y="332" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--muted-foreground)">
          THE LOOP THAT KEEPS RUNNING
        </text>
        <g fontFamily="var(--font-inter)" fontSize="8.5" fontWeight="600">
          <text x="98" y="354" textAnchor="middle" fill="var(--foreground)" opacity="0.78">dose</text>
          <text x="200" y="354" textAnchor="middle" fill="var(--foreground)" opacity="0.78">numb</text>
          <text x="306" y="354" textAnchor="middle" fill="var(--foreground)" opacity="0.78">can&apos;t feel</text>
          <text x="408" y="354" textAnchor="middle" fill="var(--foreground)" opacity="0.78">dose more</text>
        </g>
        <g fill="none" stroke="var(--muted-foreground)" strokeWidth="1.25" opacity="0.55">
          <path d="M 116 348 L 178 348" markerEnd="url(#loop-arrow)"/>
          <path d="M 222 348 L 282 348" markerEnd="url(#loop-arrow)"/>
          <path d="M 332 348 L 382 348" markerEnd="url(#loop-arrow)"/>
        </g>
        <path
          d="M 408 360 Q 408 372 250 372 Q 92 372 92 360"
          fill="none"
          stroke="var(--muted-foreground)"
          strokeWidth="1"
          strokeDasharray="2 3"
          opacity="0.45"
          markerEnd="url(#loop-arrow)"
        />
      </g>
    </svg>
  );
}
