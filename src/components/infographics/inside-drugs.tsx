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
    },
    {
      label: "Fear",
      chemical: "adrenaline",
      color: "var(--primary)",
      x: 250,
      hint: "fight or flight",
    },
    {
      label: "Pain",
      chemical: "melatonin",
      color: "var(--muted-foreground)",
      x: 390,
      hint: "shut down · numb",
    },
  ];

  return (
    <svg viewBox="0 0 500 320" className={className} role="img" aria-label="The inside drugs cycle: worry, fear, and pain as numbing chemistry">
      {/* Top caption */}
      <text x="250" y="22" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="600" fill="var(--muted-foreground)">
        WHEN THE TRAUMA WAS TOO MUCH FOR A TINY BODY
      </text>
      <text x="250" y="38" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fill="var(--muted-foreground)" fontStyle="italic">
        we &ldquo;dosed&rdquo; ourselves with what was already inside us
      </text>

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
        </g>
      ))}

      {/* Body line beneath the three drops */}
      <line x1="60" y1="220" x2="440" y2="220" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6"/>

      {/* Numb body silhouette */}
      <g opacity="0.85">
        <circle cx="250" cy="248" r="14" fill="var(--foreground)" fillOpacity="0.18"/>
        <rect x="232" y="262" width="36" height="34" rx="10" fill="var(--foreground)" fillOpacity="0.16"/>
        <text x="250" y="208" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.5" fontWeight="600" fill="var(--muted-foreground)">
          THE FEELINGS GO NUMB
        </text>
      </g>

      {/* Side labels: avoid pole and aggressor pole both run on dosing */}
      <g>
        <text x="80" y="248" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--accent)" fontWeight="600">
          The avoider
        </text>
        <text x="80" y="262" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
          worry · fear · pain
        </text>
        <line x1="80" y1="270" x2="220" y2="262" stroke="var(--accent)" strokeWidth="0.75" opacity="0.4"/>

        <text x="420" y="248" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--primary)" fontWeight="600">
          The aggressor
        </text>
        <text x="420" y="262" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
          adrenaline of control
        </text>
        <line x1="420" y1="270" x2="280" y2="262" stroke="var(--primary)" strokeWidth="0.75" opacity="0.4"/>
      </g>

      {/* Bottom caption */}
      <text x="250" y="306" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
        Both positions in the Game of Dissociation run on the same chemistry.
      </text>
    </svg>
  );
}
