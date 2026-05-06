"use client";

// Trait 3 — Other Laundry List quadrant.
// "Instead of being anger and criticism avoiders, some of us became angry and critical,
// thinking 'If we can't beat them, we'll join them!'"
// The pendulum swings between avoider (victim) and aggressor (intimidator), pivoting on
// the buried vulnerability that triggers the flip.

interface Props { className?: string; }

export function AngerPendulum({ className }: Props) {
  return (
    <svg viewBox="0 0 540 420" className={className} role="img" aria-label="The swing from anger and criticism avoider to angry critic, pivoting on a buried vulnerability">
      <defs>
        <marker id="ap-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)"/>
        </marker>
      </defs>

      {/* Top caption */}
      <text x="270" y="22" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">
        IF WE CAN&apos;T BEAT THEM, WE&apos;LL JOIN THEM
      </text>
      <text x="270" y="38" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fill="var(--muted-foreground)" fontStyle="italic">
        the same person, two postures
      </text>

      {/* Arc path */}
      <path
        d="M 90 260 A 180 180 0 0 1 450 260"
        fill="none"
        stroke="var(--border)"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        opacity="0.7"
      />

      {/* LEFT POLE — Avoider */}
      <g>
        <circle cx="90" cy="260" r="44" fill="var(--accent)" fillOpacity="0.16" stroke="var(--accent)" strokeWidth="2"/>
        {/* Figure flinching — head turned away, arm up */}
        <circle cx="84" cy="252" r="9" fill="var(--accent)" fillOpacity="0.85"/>
        <rect x="78" y="260" width="14" height="18" rx="4" fill="var(--accent)" fillOpacity="0.8"/>
        {/* shielding arm */}
        <path d="M 90 254 L 102 246" stroke="var(--accent)" strokeWidth="2.25" strokeLinecap="round"/>
        {/* incoming jagged criticism */}
        <path d="M 110 238 L 105 244 L 112 244 L 106 252" stroke="var(--foreground)" strokeWidth="1.25" fill="none" opacity="0.55"/>

        <text x="90" y="320" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontWeight="600" fill="var(--accent)">
          Avoider
        </text>
        <text x="90" y="335" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
          frightened by anger
        </text>

        {/* concrete behaviors */}
        <g fontFamily="var(--font-inter)" fontSize="8" fill="var(--foreground)" opacity="0.78">
          <text x="90" y="354" textAnchor="middle">· goes silent · over-apologizes</text>
          <text x="90" y="365" textAnchor="middle">· scans for the angry person</text>
          <text x="90" y="376" textAnchor="middle">· avoids hard conversations</text>
        </g>
        <text x="90" y="395" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
          (the victim position)
        </text>
      </g>

      {/* RIGHT POLE — Aggressor */}
      <g>
        <circle cx="450" cy="260" r="44" fill="var(--primary)" fillOpacity="0.14" stroke="var(--primary)" strokeWidth="2"/>
        {/* Figure pointing / shouting */}
        <circle cx="446" cy="252" r="9" fill="var(--primary)" fillOpacity="0.9"/>
        <rect x="440" y="260" width="14" height="18" rx="4" fill="var(--primary)" fillOpacity="0.85"/>
        {/* pointing arm */}
        <path d="M 452 260 L 468 252" stroke="var(--primary)" strokeWidth="2.25" strokeLinecap="round"/>
        {/* outgoing jagged criticism */}
        <path d="M 472 246 L 476 252 L 469 252 L 474 260" stroke="var(--accent)" strokeWidth="1.5" fill="none"/>

        <text x="450" y="320" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontWeight="600" fill="var(--primary)">
          Aggressor
        </text>
        <text x="450" y="335" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
          angry &amp; critical
        </text>

        {/* concrete behaviors */}
        <g fontFamily="var(--font-inter)" fontSize="8" fill="var(--foreground)" opacity="0.78">
          <text x="450" y="354" textAnchor="middle">· cutting &ldquo;helpful&rdquo; criticism</text>
          <text x="450" y="365" textAnchor="middle">· contempt · ridicule · sarcasm</text>
          <text x="450" y="376" textAnchor="middle">· takes charge to feel safe</text>
        </g>
        <text x="450" y="395" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
          (&ldquo;tough love&rdquo; · adrenaline)
        </text>
      </g>

      {/* CENTER — buried vulnerabilities (the trigger that flips the pendulum) */}
      <g>
        <circle cx="270" cy="70" r="11" fill="var(--primary)"/>
        <text x="270" y="54" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="600" letterSpacing="1" fill="var(--muted-foreground)">
          PIVOT
        </text>

        {/* Pendulum string */}
        <line x1="270" y1="80" x2="270" y2="252" stroke="var(--muted-foreground)" strokeWidth="1.25" opacity="0.5"/>

        {/* Pendulum bob — the buried wound */}
        <circle cx="270" cy="260" r="34" fill="var(--accent)" fillOpacity="0.25" stroke="var(--accent)" strokeWidth="1.75"/>
        <text x="270" y="252" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11" fontStyle="italic" fontWeight="600" fill="var(--primary)">
          Buried
        </text>
        <text x="270" y="267" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11" fontStyle="italic" fontWeight="600" fill="var(--primary)">
          vulnerabilities
        </text>
        <text x="270" y="281" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic">
          shame · fear · grief
        </text>

        <text x="270" y="320" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="700" letterSpacing="1" fill="var(--accent)">
          WHAT TRIGGERS THE FLIP
        </text>
        <text x="270" y="335" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">
          someone reminds us of our own
        </text>
        <text x="270" y="346" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">
          unprocessed pain
        </text>
      </g>

      {/* Trigger arrows — from buried wound out to each pole */}
      <g>
        <path d="M 240 268 Q 180 270 132 264" fill="none" stroke="var(--accent)" strokeWidth="1.25" strokeDasharray="3 2" opacity="0.55" markerEnd="url(#ap-arrow)"/>
        <path d="M 300 268 Q 360 270 408 264" fill="none" stroke="var(--primary)" strokeWidth="1.25" strokeDasharray="3 2" opacity="0.55" markerEnd="url(#ap-arrow)"/>
      </g>

      {/* Swing arrows */}
      <g>
        <path d="M 142 220 Q 200 180 270 188" fill="none" stroke="var(--accent)" strokeWidth="1.25" strokeDasharray="3 2" opacity="0.5"/>
        <path d="M 270 188 Q 340 180 398 220" fill="none" stroke="var(--primary)" strokeWidth="1.25" strokeDasharray="3 2" opacity="0.5"/>
        <text x="200" y="178" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">flinch</text>
        <text x="340" y="178" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">strike</text>
      </g>
    </svg>
  );
}
