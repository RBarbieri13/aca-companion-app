"use client";

// Trait 5 — Laundry List quadrant main graphic.
// "We grew up feeling disempowered and unable to make healthy choices... blown about by the
// winds of the times" — and as a counter-move, "some of us became determined to be among the
// winners" and exercised power beyond the requirements of the situation.
// The pendulum: disempowered victim ↔ over-empowered victimizer, with humble participation
// (true, right-sized power) at the still center.

interface Props { className?: string; }

export function PowerPendulum({ className }: Props) {
  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-label="Two extremes of power: disempowered victim and over-empowered victimizer, with humble participation at the still center.">
      <defs>
        <marker id="pp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)"/>
        </marker>
      </defs>

      {/* Title */}
      <text x="280" y="22" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">
        TWO EXTREMES OF POWER
      </text>
      <text x="280" y="40" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontStyle="italic" fill="var(--muted-foreground)">
        the same wound, two opposite postures
      </text>

      {/* Arc path */}
      <path
        d="M 90 260 A 180 180 0 0 1 470 260"
        fill="none"
        stroke="var(--border)"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        opacity="0.7"
      />

      {/* LEFT POLE — Disempowered / Victim */}
      <g>
        <circle cx="90" cy="260" r="46" fill="var(--accent)" fillOpacity="0.16" stroke="var(--accent)" strokeWidth="2"/>
        {/* small slumped figure */}
        <circle cx="90" cy="252" r="9" fill="var(--accent)" fillOpacity="0.85"/>
        <rect x="84" y="260" width="12" height="18" rx="4" fill="var(--accent)" fillOpacity="0.8"/>
        {/* wind lines blowing them */}
        <path d="M 60 248 L 78 246" stroke="var(--muted-foreground)" strokeWidth="1" strokeDasharray="2 2" opacity="0.55"/>
        <path d="M 56 254 L 78 252" stroke="var(--muted-foreground)" strokeWidth="1" strokeDasharray="2 2" opacity="0.55"/>
        <path d="M 60 260 L 78 258" stroke="var(--muted-foreground)" strokeWidth="1" strokeDasharray="2 2" opacity="0.55"/>

        <text x="90" y="320" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontWeight="600" fill="var(--accent)">
          Victim
        </text>
        <text x="90" y="335" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
          disempowered
        </text>
        <g fontFamily="var(--font-inter)" fontSize="8" fill="var(--foreground)" opacity="0.78">
          <text x="90" y="355" textAnchor="middle">· blown by the winds</text>
          <text x="90" y="366" textAnchor="middle">· “this is happening TO me”</text>
          <text x="90" y="377" textAnchor="middle">· shrug of resignation</text>
        </g>
        <text x="90" y="395" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
          The Laundry List
        </text>
      </g>

      {/* RIGHT POLE — Over-empowered / Victimizer */}
      <g>
        <circle cx="470" cy="260" r="46" fill="var(--primary)" fillOpacity="0.14" stroke="var(--primary)" strokeWidth="2"/>
        {/* commanding figure with raised arm */}
        <circle cx="466" cy="252" r="9" fill="var(--primary)" fillOpacity="0.9"/>
        <rect x="460" y="260" width="14" height="18" rx="4" fill="var(--primary)" fillOpacity="0.85"/>
        <path d="M 472 258 L 488 246" stroke="var(--primary)" strokeWidth="2.25" strokeLinecap="round"/>
        {/* tiny subservient figures */}
        <circle cx="500" cy="262" r="3" fill="var(--muted-foreground)" fillOpacity="0.5"/>
        <circle cx="500" cy="272" r="3" fill="var(--muted-foreground)" fillOpacity="0.4"/>

        <text x="470" y="320" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontWeight="600" fill="var(--primary)">
          Victimizer
        </text>
        <text x="470" y="335" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
          over-empowered
        </text>
        <g fontFamily="var(--font-inter)" fontSize="8" fill="var(--foreground)" opacity="0.78">
          <text x="470" y="355" textAnchor="middle">· “take charge” defenses</text>
          <text x="470" y="366" textAnchor="middle">· manipulate &amp; control</text>
          <text x="470" y="377" textAnchor="middle">· choose only the subservient</text>
        </g>
        <text x="470" y="395" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
          The Other Laundry List
        </text>
      </g>

      {/* CENTER — Pivot wound + Humble Participation */}
      <g>
        <circle cx="280" cy="62" r="12" fill="var(--primary)"/>
        <text x="280" y="46" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="600" letterSpacing="1" fill="var(--muted-foreground)">
          PIVOT
        </text>

        {/* pendulum string */}
        <line x1="280" y1="74" x2="280" y2="240" stroke="var(--muted-foreground)" strokeWidth="1.25" opacity="0.5"/>

        {/* still-center bob */}
        <circle cx="280" cy="260" r="40" fill="var(--sage)" fillOpacity="0.22" stroke="var(--sage)" strokeWidth="1.75"/>
        <text x="280" y="252" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11" fontStyle="italic" fontWeight="600" fill="var(--primary)">
          Humble
        </text>
        <text x="280" y="266" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11" fontStyle="italic" fontWeight="600" fill="var(--primary)">
          participation
        </text>
        <text x="280" y="282" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic">
          right-sized power
        </text>

        <text x="280" y="320" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="700" letterSpacing="1" fill="var(--sage)">
          THE FLIP SIDE
        </text>
        <text x="280" y="335" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">
          “How can I humbly participate?”
        </text>
        <text x="280" y="346" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)">
          neither helpless nor dominating
        </text>
      </g>

      {/* swing arrows */}
      <g>
        <path d="M 144 220 Q 210 180 280 188" fill="none" stroke="var(--accent)" strokeWidth="1.25" strokeDasharray="3 2" opacity="0.5"/>
        <path d="M 280 188 Q 350 180 416 220" fill="none" stroke="var(--primary)" strokeWidth="1.25" strokeDasharray="3 2" opacity="0.5"/>
        <text x="200" y="178" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">collapse</text>
        <text x="360" y="178" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">overpower</text>
      </g>

      {/* trigger arrows from pivot to each pole */}
      <g>
        <path d="M 244 256 Q 200 256 140 256" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 2" opacity="0.45" markerEnd="url(#pp-arrow)"/>
        <path d="M 316 256 Q 360 256 420 256" fill="none" stroke="var(--primary)" strokeWidth="1" strokeDasharray="3 2" opacity="0.45" markerEnd="url(#pp-arrow)"/>
      </g>
    </svg>
  );
}
