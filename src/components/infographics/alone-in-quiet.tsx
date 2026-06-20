"use client";

// Trait 5 — companion graphic for the Flip Side of Other reflection questions about being
// alone in silence with nothing happening. Three columns: a noisy "many activities" mode,
// a noticing/transition mode, and a "alone in quiet" mode — the recovery skill.

interface Props { className?: string; }

export function AloneInQuiet({ className }: Props) {
  return (
    <svg viewBox="0 0 680 480" className={className} role="img" aria-label="Three modes of being alone, plus what often happens during a single solo sit.">
      <defs>
        <marker id="aiq-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)"/>
        </marker>
        <linearGradient id="aiq-arc" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.7"/>
          <stop offset="50%" stopColor="var(--muted-foreground)" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="var(--sage)" stopOpacity="0.9"/>
        </linearGradient>
      </defs>

      {/* Title */}
      <text x="340" y="22" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">
        BEING ALONE — THREE MODES
      </text>
      <text x="340" y="40" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontStyle="italic" fill="var(--muted-foreground)">
        a recovery skill is built, not granted
      </text>

      {/* MODE 1 — many activities */}
      <g>
        <rect x="30" y="68" width="190" height="200" rx="14" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.5"/>
        <text x="125" y="92" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--accent)">
          MANY ACTIVITIES
        </text>

        {/* figure with chaotic icons orbiting */}
        <circle cx="125" cy="152" r="14" fill="var(--accent)" fillOpacity="0.85"/>
        <rect x="113" y="164" width="24" height="32" rx="8" fill="var(--accent)" fillOpacity="0.78"/>
        {/* orbiting noise marks */}
        <circle cx="86" cy="124" r="4" fill="var(--muted-foreground)" fillOpacity="0.6"/>
        <circle cx="164" cy="128" r="4" fill="var(--muted-foreground)" fillOpacity="0.6"/>
        <circle cx="78" cy="180" r="4" fill="var(--muted-foreground)" fillOpacity="0.6"/>
        <circle cx="172" cy="184" r="4" fill="var(--muted-foreground)" fillOpacity="0.6"/>
        <path d="M 85 100 L 88 96 L 92 100 L 88 104 Z" fill="var(--muted-foreground)" fillOpacity="0.5"/>
        <path d="M 160 196 L 164 192 L 168 196 L 164 200 Z" fill="var(--muted-foreground)" fillOpacity="0.5"/>

        <text x="125" y="232" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12" fontWeight="600" fill="var(--accent)">
          “alone” but loud
        </text>
        <text x="125" y="250" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">
          phone · TV · scroll · plan
        </text>
        <text x="125" y="262" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)">
          fills the silence
        </text>
      </g>

      <line x1="232" y1="168" x2="262" y2="168" stroke="var(--muted-foreground)" strokeWidth="1.5" markerEnd="url(#aiq-arrow)"/>

      {/* MODE 2 — noticing */}
      <g>
        <rect x="272" y="68" width="170" height="200" rx="14" fill="var(--muted)" fillOpacity="0.5" stroke="var(--muted-foreground)" strokeWidth="1.25" strokeOpacity="0.5"/>
        <text x="357" y="92" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--muted-foreground)">
          NOTICING
        </text>

        {/* figure pausing */}
        <circle cx="357" cy="152" r="13" fill="var(--muted-foreground)" fillOpacity="0.7"/>
        <rect x="346" y="164" width="22" height="32" rx="7" fill="var(--muted-foreground)" fillOpacity="0.55"/>
        {/* breathing arcs */}
        <path d="M 332 152 Q 320 152 320 162" fill="none" stroke="var(--sage)" strokeWidth="1.25" opacity="0.6"/>
        <path d="M 382 152 Q 394 152 394 162" fill="none" stroke="var(--sage)" strokeWidth="1.25" opacity="0.6"/>

        <text x="357" y="232" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12" fontWeight="600" fill="var(--muted-foreground)">
          a small pause
        </text>
        <text x="357" y="250" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">
          one breath · let it be quiet
        </text>
        <text x="357" y="262" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)">
          what is here?
        </text>
      </g>

      <line x1="452" y1="168" x2="482" y2="168" stroke="var(--muted-foreground)" strokeWidth="1.5" markerEnd="url(#aiq-arrow)"/>

      {/* MODE 3 — alone in quiet */}
      <g>
        <rect x="492" y="68" width="170" height="200" rx="14" fill="var(--sage)" fillOpacity="0.20" stroke="var(--sage)" strokeWidth="1.75"/>
        <text x="577" y="92" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--sage)">
          ALONE IN QUIET
        </text>

        {/* figure seated, calm; soft halo */}
        <circle cx="577" cy="158" r="32" fill="var(--sage)" fillOpacity="0.10"/>
        <circle cx="577" cy="150" r="13" fill="var(--sage)" fillOpacity="0.9"/>
        <rect x="566" y="162" width="22" height="32" rx="7" fill="var(--sage)" fillOpacity="0.85"/>

        <text x="577" y="232" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12" fontWeight="600" fill="var(--sage)">
          whole &amp; complete
        </text>
        <text x="577" y="250" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">
          silence, with nothing happening
        </text>
        <text x="577" y="262" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)">
          and that is enough
        </text>
      </g>

      {/* divider caption */}
      <text x="340" y="296" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
        Flip Side of Other, Trait 5: “Are you able to be alone, in silence, with nothing happening?”
      </text>

      {/* What tends to happen during a single solo sit */}
      <g>
        <text x="340" y="334" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">
          WHAT OFTEN HAPPENS IN A SINGLE SIT
        </text>

        {/* timeline base */}
        <line x1="80" y1="392" x2="600" y2="392" stroke="url(#aiq-arc)" strokeWidth="4" strokeLinecap="round"/>

        {/* time markers */}
        {[
          { t: "0:00",   label: "begin",         x: 80,  fill: "var(--accent)" },
          { t: "0:30",   label: "fidget · plan", x: 200, fill: "var(--accent)" },
          { t: "2:00",   label: "the urge to bolt", x: 320, fill: "var(--muted-foreground)" },
          { t: "5:00",   label: "soften",        x: 440, fill: "var(--sage)" },
          { t: "10:00",  label: "quiet shows up", x: 580, fill: "var(--sage)" },
        ].map((m) => (
          <g key={m.t}>
            <circle cx={m.x} cy="392" r="6" fill={m.fill} stroke="var(--card)" strokeWidth="2"/>
            <text x={m.x} y="372" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="700" fill={m.fill}>
              {m.t}
            </text>
            <text x={m.x} y="412" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--foreground)" opacity="0.82">
              {m.label}
            </text>
          </g>
        ))}

        <text x="340" y="438" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
          The urge to bolt around the two-minute mark is the practice — not a sign you&apos;re failing.
        </text>
        <text x="340" y="454" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
          Stay one more breath. That breath is the recovery move.
        </text>
      </g>
    </svg>
  );
}
