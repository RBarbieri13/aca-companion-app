"use client";

// Trait 3 — Other Laundry List quadrant.
// "Instead of being anger and criticism avoiders, some of us became angry and critical,
// thinking 'If we can't beat them, we'll join them!'"
// The pendulum swings between avoider (victim) and aggressor (intimidator).

interface Props { className?: string; }

export function AngerPendulum({ className }: Props) {
  return (
    <svg viewBox="0 0 500 340" className={className} role="img" aria-label="The swing from anger and criticism avoider to angry critic">
      {/* Top caption */}
      <text x="250" y="20" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="600" fill="var(--muted-foreground)">
        IF WE CAN&apos;T BEAT THEM, WE&apos;LL JOIN THEM
      </text>

      {/* Arc path */}
      <path
        d="M 80 240 A 180 180 0 0 1 420 240"
        fill="none"
        stroke="var(--border)"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        opacity="0.7"
      />

      {/* LEFT POLE — Avoider */}
      <g>
        <circle cx="80" cy="240" r="40" fill="var(--accent)" fillOpacity="0.16" stroke="var(--accent)" strokeWidth="2"/>
        {/* Figure flinching — head turned away, arm up */}
        <circle cx="74" cy="232" r="9" fill="var(--accent)" fillOpacity="0.85"/>
        <rect x="68" y="240" width="14" height="18" rx="4" fill="var(--accent)" fillOpacity="0.8"/>
        {/* shielding arm */}
        <path d="M 80 234 L 92 226" stroke="var(--accent)" strokeWidth="2.25" strokeLinecap="round"/>
        {/* incoming jagged criticism */}
        <path d="M 100 218 L 95 224 L 102 224 L 96 232" stroke="var(--foreground)" strokeWidth="1.25" fill="none" opacity="0.55"/>

        <text x="80" y="298" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--accent)">
          Avoider
        </text>
        <text x="80" y="313" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)">
          frightened by anger
        </text>
        <text x="80" y="325" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
          (the victim position)
        </text>
      </g>

      {/* RIGHT POLE — Aggressor */}
      <g>
        <circle cx="420" cy="240" r="40" fill="var(--primary)" fillOpacity="0.14" stroke="var(--primary)" strokeWidth="2"/>
        {/* Figure pointing / shouting */}
        <circle cx="416" cy="232" r="9" fill="var(--primary)" fillOpacity="0.9"/>
        <rect x="410" y="240" width="14" height="18" rx="4" fill="var(--primary)" fillOpacity="0.85"/>
        {/* pointing arm */}
        <path d="M 422 240 L 438 232" stroke="var(--primary)" strokeWidth="2.25" strokeLinecap="round"/>
        {/* outgoing jagged criticism */}
        <path d="M 442 226 L 446 232 L 439 232 L 444 240" stroke="var(--accent)" strokeWidth="1.5" fill="none"/>

        <text x="420" y="298" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--primary)">
          Aggressor
        </text>
        <text x="420" y="313" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)">
          angry &amp; critical
        </text>
        <text x="420" y="325" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
          (&ldquo;tough love,&rdquo; cutting truth)
        </text>
      </g>

      {/* CENTER — buried vulnerabilities (the trigger that flips the pendulum) */}
      <g>
        <circle cx="250" cy="60" r="10" fill="var(--primary)"/>
        <text x="250" y="44" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="600" letterSpacing="1" fill="var(--muted-foreground)">
          PIVOT
        </text>

        {/* Pendulum string */}
        <line x1="250" y1="68" x2="250" y2="232" stroke="var(--muted-foreground)" strokeWidth="1.25" opacity="0.5"/>

        {/* Pendulum bob — the buried wound */}
        <circle cx="250" cy="240" r="30" fill="var(--accent)" fillOpacity="0.25" stroke="var(--accent)" strokeWidth="1.5"/>
        <text x="250" y="234" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11" fontStyle="italic" fontWeight="600" fill="var(--primary)">
          Buried
        </text>
        <text x="250" y="248" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11" fontStyle="italic" fontWeight="600" fill="var(--primary)">
          vulnerabilities
        </text>

        <text x="250" y="298" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="600" letterSpacing="1" fill="var(--accent)">
          WHAT GETS TRIGGERED
        </text>
        <text x="250" y="313" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
          and flips us to the other pole
        </text>
      </g>

      {/* Swing arrows */}
      <g>
        <path d="M 130 205 Q 190 170 250 175" fill="none" stroke="var(--accent)" strokeWidth="1.25" strokeDasharray="3 2" opacity="0.55"/>
        <path d="M 250 175 Q 310 170 370 205" fill="none" stroke="var(--primary)" strokeWidth="1.25" strokeDasharray="3 2" opacity="0.55"/>
      </g>
    </svg>
  );
}
