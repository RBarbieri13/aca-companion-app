"use client";

// Trait 5 — Other Laundry List main graphic.
// The workbook's striking, specific list: we are intrigued by the under-educated, physically
// impaired, mentally struggling, the lost, the one walking to a door with their hands full.
// Helping them produces a powerful surge — which we then look for again. The "rescuer II"
// seat of the Game of Dissociation.

interface Props { className?: string; }

export function VictimizerLure({ className }: Props) {
  const lures = [
    "Under-educated",
    "Physically impaired",
    "Mentally struggling",
    "Lost & needing directions",
    "Hands full at the door",
    "Newcomer at the meeting",
  ];

  return (
    <svg viewBox="0 0 600 520" className={className} role="img" aria-label="What lures the rescuer II / victimizer seat — the disadvantaged — and the feedback loop of helping for the surge, plus the recovery interruption.">
      <defs>
        <marker id="vl-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)"/>
        </marker>
        <marker id="vl-arrow-sage" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--sage)"/>
        </marker>
        <radialGradient id="vl-surge" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Title */}
      <text x="300" y="22" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">
        WHAT LURES THE RESCUER II / VICTIMIZER
      </text>
      <text x="300" y="40" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontStyle="italic" fill="var(--muted-foreground)">
        “intrigued by people we can guide, lead, and watch out for”
      </text>

      {/* LEFT — the helper figure */}
      <g>
        <circle cx="120" cy="170" r="44" fill="url(#vl-surge)"/>
        <circle cx="120" cy="156" r="13" fill="var(--primary)" fillOpacity="0.9"/>
        <rect x="107" y="168" width="26" height="36" rx="9" fill="var(--primary)" fillOpacity="0.85"/>
        {/* leaning hand reaching out */}
        <path d="M 138 178 L 170 188" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round"/>
        <text x="120" y="226" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="700" fill="var(--primary)" letterSpacing="0.5">
          THE HELPER
        </text>
        <text x="120" y="240" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
          guide · lead · watch out
        </text>
      </g>

      {/* CENTER — list of lures */}
      <g>
        <text x="300" y="80" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--muted-foreground)">
          WHO INTRIGUES US
        </text>
        {lures.map((l, i) => (
          <g key={l}>
            <rect x="220" y={92 + i * 26} width="160" height="20" rx="10" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="0.75" strokeOpacity="0.5"/>
            <text x="300" y={106 + i * 26} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.85">
              {l}
            </text>
          </g>
        ))}
      </g>

      {/* RIGHT — the recipient figure (smaller, dimmer) */}
      <g>
        <circle cx="480" cy="160" r="10" fill="var(--muted-foreground)" fillOpacity="0.5"/>
        <rect x="470" y="170" width="20" height="28" rx="6" fill="var(--muted-foreground)" fillOpacity="0.45"/>
        <text x="480" y="220" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="700" fill="var(--muted-foreground)" letterSpacing="0.5">
          THE RESCUED
        </text>
        <text x="480" y="234" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
          kept subservient
        </text>
      </g>

      {/* The feedback loop at the bottom */}
      <g>
        <rect x="40" y="276" width="520" height="146" rx="14" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.5"/>
        <text x="300" y="300" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--accent)">
          THE FEEDBACK LOOP
        </text>

        {/* four-node loop */}
        <g fontFamily="var(--font-inter)" fontWeight="600">
          <rect x="64" y="328" width="106" height="32" rx="8" fill="var(--card)" stroke="var(--accent)" strokeWidth="1"/>
          <text x="117" y="349" textAnchor="middle" fontSize="9" fill="var(--foreground)">help someone</text>

          <rect x="200" y="328" width="106" height="32" rx="8" fill="var(--card)" stroke="var(--accent)" strokeWidth="1"/>
          <text x="253" y="345" textAnchor="middle" fontSize="9" fill="var(--accent)" fontWeight="700">powerful surge</text>
          <text x="253" y="356" textAnchor="middle" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic">recognition · power</text>

          <rect x="336" y="328" width="106" height="32" rx="8" fill="var(--card)" stroke="var(--accent)" strokeWidth="1"/>
          <text x="389" y="349" textAnchor="middle" fontSize="9" fill="var(--foreground)">look for more</text>

          <rect x="472" y="328" width="92" height="32" rx="8" fill="var(--card)" stroke="var(--accent)" strokeWidth="1"/>
          <text x="518" y="349" textAnchor="middle" fontSize="9" fill="var(--foreground)">repeat</text>
        </g>

        <g fill="none" stroke="var(--muted-foreground)" strokeWidth="1.25" opacity="0.55">
          <path d="M 170 344 L 200 344" markerEnd="url(#vl-arrow)"/>
          <path d="M 306 344 L 336 344" markerEnd="url(#vl-arrow)"/>
          <path d="M 442 344 L 472 344" markerEnd="url(#vl-arrow)"/>
        </g>
        <path d="M 518 366 Q 518 386 300 386 Q 82 386 82 366" fill="none" stroke="var(--muted-foreground)" strokeWidth="1" strokeDasharray="2 3" opacity="0.45" markerEnd="url(#vl-arrow)"/>
        <text x="300" y="412" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">
          The surge is the drug. We choose the disadvantaged because they keep the loop running.
        </text>
      </g>

      {/* Recovery interruption — where to step out */}
      <g>
        <rect x="40" y="436" width="520" height="74" rx="14" fill="var(--sage)" fillOpacity="0.18" stroke="var(--sage)" strokeWidth="1.5"/>
        <text x="60" y="458" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--sage)">
          WHERE TO STEP OUT
        </text>
        <text x="60" y="480" fontFamily="var(--font-inter)" fontSize="10" fill="var(--foreground)" opacity="0.88">
          Catch the <tspan fontWeight="700" fill="var(--sage)">surge</tspan> itself — that&apos;s the cue, before you act on it.
        </text>
        <text x="60" y="497" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
          Ask: would I want this person if they didn&apos;t need me? Choose equals on purpose.
        </text>
        {/* arrow pointing at the surge node */}
        <path d="M 253 384 L 253 432" fill="none" stroke="var(--sage)" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#vl-arrow-sage)"/>
      </g>
    </svg>
  );
}
