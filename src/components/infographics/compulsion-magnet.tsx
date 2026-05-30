"use client";

// Trait 4 — Laundry List quadrant.
// "We either become alcoholics, marry them, or both, or find another compulsive
// personality such as a workaholic to fulfill our sick abandonment needs."
// The unmet childhood need acts like a magnet for emotionally-unavailable, driven people —
// because their unavailability recreates the abandonment that felt like home.

interface Props { className?: string; }

export function CompulsionMagnet({ className }: Props) {
  const types = [
    { label: "Alcoholic", sub: "/ addict", color: "var(--accent)", x: 95, y: 120 },
    { label: "Workaholic", sub: "always working", color: "var(--primary)", x: 425, y: 120 },
    { label: "Rageaholic", sub: "anger-driven", color: "#8B7BA8", x: 95, y: 250 },
    { label: "Compulsive", sub: "any -aholic", color: "#D4A84B", x: 425, y: 250 },
  ];

  return (
    <svg viewBox="0 0 540 420" className={className} role="img" aria-label="The unmet abandonment need draws emotionally unavailable, compulsive people">
      <defs>
        <radialGradient id="cm-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.08"/>
        </radialGradient>
        <marker id="cm-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)"/>
        </marker>
      </defs>

      {/* Title */}
      <text x="270" y="24" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">
        WHY THESE PEOPLE, EVERY TIME
      </text>
      <text x="270" y="42" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontStyle="italic" fill="var(--muted-foreground)">
        the unmet need is a magnet for the unavailable
      </text>

      {/* Center — the unmet abandonment need */}
      <g>
        <circle cx="270" cy="186" r="56" fill="url(#cm-core)" stroke="var(--accent)" strokeWidth="1.75"/>
        {/* small abandoned-child mark */}
        <circle cx="270" cy="168" r="7" fill="var(--accent)" fillOpacity="0.9"/>
        <rect x="263" y="176" width="14" height="18" rx="5" fill="var(--accent)" fillOpacity="0.8"/>
        <text x="270" y="210" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" letterSpacing="0.8" fontWeight="700" fill="var(--accent)">
          ABANDONMENT
        </text>
        <text x="270" y="222" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" letterSpacing="0.8" fontWeight="700" fill="var(--accent)">
          &ldquo;NEEDS&rdquo;
        </text>
      </g>

      {/* "or we become one" badge under the core */}
      <g>
        <rect x="186" y="250" width="168" height="22" rx="11" fill="var(--card)" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.5"/>
        <text x="270" y="265" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--foreground)" opacity="0.85">
          marry them &mdash; <tspan fontWeight="700" fill="var(--accent)">or become one ourselves</tspan>
        </text>
      </g>

      {/* Legend for the pull lines */}
      <g>
        <line x1="36" y1="60" x2="58" y2="60" stroke="var(--muted-foreground)" strokeWidth="1" strokeDasharray="3 3" opacity="0.55"/>
        <text x="63" y="63" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
          magnetic pull
        </text>
      </g>

      {/* Four compulsive types, each pulled toward the center */}
      {types.map((t) => (
        <g key={t.label}>
          <rect x={t.x - 70} y={t.y - 30} width="140" height="60" rx="12" fill={t.color} fillOpacity="0.10" stroke={t.color} strokeWidth="1.5"/>
          <text x={t.x} y={t.y - 8} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill={t.color}>
            {t.label}
          </text>
          <text x={t.x} y={t.y + 7} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">
            {t.sub}
          </text>
          <text x={t.x} y={t.y + 21} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fontWeight="700" letterSpacing="0.5" fill="var(--muted-foreground)">
            EMOTIONALLY UNAVAILABLE
          </text>
          {/* magnetic pull line toward the core */}
          <line
            x1={t.x < 270 ? t.x + 70 : t.x - 70}
            y1={t.y}
            x2={t.x < 270 ? 214 : 326}
            y2={186}
            stroke="var(--muted-foreground)"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.45"
            markerEnd="url(#cm-arrow)"
          />
        </g>
      ))}

      {/* Bottom mechanism strip */}
      <g>
        <rect x="40" y="332" width="460" height="68" rx="10" fill="var(--muted)" fillOpacity="0.4"/>
        <g fontFamily="var(--font-inter)">
          <text x="120" y="356" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--foreground)" opacity="0.82">unavailable</text>
          <text x="270" y="356" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--foreground)" opacity="0.82">feels familiar</text>
          <text x="420" y="356" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--accent)">&ldquo;feels like home&rdquo;</text>
        </g>
        <g fill="none" stroke="var(--muted-foreground)" strokeWidth="1.25" opacity="0.55">
          <path d="M 175 352 L 215 352" markerEnd="url(#cm-arrow)"/>
          <path d="M 325 352 L 360 352" markerEnd="url(#cm-arrow)"/>
        </g>
        <text x="270" y="384" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
          &ldquo;We chose partners who would help us play out the abandonment we experienced as children.&rdquo;
        </text>
      </g>
    </svg>
  );
}
