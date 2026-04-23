"use client";

// Two poles of losing the self - enmeshment and rigid self-sufficiency.
// A pendulum that swings wide in both directions, with "true self" at the still center.

interface Props { className?: string; }

export function IdentityPendulum({ className }: Props) {
  return (
    <svg viewBox="0 0 500 320" className={className} role="img" aria-label="The pendulum between enmeshment and rigid self-sufficiency">
      {/* Arc path */}
      <path
        d="M 80 230 A 180 180 0 0 1 420 230"
        fill="none"
        stroke="var(--border)"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        opacity="0.7"
      />

      {/* LEFT POLE - Enmeshment */}
      <g>
        <circle cx="80" cy="230" r="38" fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="2"/>
        {/* Two merged figures */}
        <circle cx="72" cy="225" r="10" fill="var(--accent)" fillOpacity="0.85"/>
        <circle cx="88" cy="225" r="10" fill="var(--primary)" fillOpacity="0.85"/>
        <rect x="64" y="235" width="32" height="4" rx="2" fill="var(--accent)" fillOpacity="0.5"/>

        <text x="80" y="290" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--accent)">
          Enmeshment
        </text>
        <text x="80" y="305" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)">
          &ldquo;We lose our identities&rdquo;
        </text>
        <text x="80" y="316" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
          (holding others hostage)
        </text>
      </g>

      {/* RIGHT POLE - Rigid Self-Sufficiency */}
      <g>
        <circle cx="420" cy="230" r="38" fill="var(--primary)" fillOpacity="0.12" stroke="var(--primary)" strokeWidth="2"/>
        {/* Figure in a box */}
        <rect x="404" y="213" width="32" height="32" rx="3" fill="none" stroke="var(--primary)" strokeWidth="1.5"/>
        <line x1="410" y1="213" x2="410" y2="245" stroke="var(--primary)" strokeWidth="0.75" opacity="0.6"/>
        <line x1="420" y1="213" x2="420" y2="245" stroke="var(--primary)" strokeWidth="0.75" opacity="0.6"/>
        <line x1="430" y1="213" x2="430" y2="245" stroke="var(--primary)" strokeWidth="0.75" opacity="0.6"/>
        <circle cx="420" cy="225" r="4" fill="var(--primary)" fillOpacity="0.9"/>
        <rect x="416" y="229" width="8" height="14" rx="2" fill="var(--primary)" fillOpacity="0.85"/>

        <text x="420" y="290" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--primary)">
          Rigid Self-Sufficiency
        </text>
        <text x="420" y="305" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)">
          &ldquo;Require no supervision&rdquo;
        </text>
        <text x="420" y="316" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
          (denying all needs)
        </text>
      </g>

      {/* CENTER - True Self (pendulum pivot) */}
      <g>
        <circle cx="250" cy="50" r="8" fill="var(--primary)"/>
        <text x="250" y="34" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="600" letterSpacing="1" fill="var(--muted-foreground)">
          PIVOT
        </text>

        {/* Pendulum string */}
        <line x1="250" y1="58" x2="250" y2="220" stroke="var(--muted-foreground)" strokeWidth="1.25" opacity="0.5"/>
        {/* Pendulum bob - the still center */}
        <circle cx="250" cy="230" r="26" fill="var(--sage)" fillOpacity="0.3" stroke="var(--sage)" strokeWidth="1.5"/>
        <text x="250" y="227" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12" fontStyle="italic" fontWeight="600" fill="var(--primary)">
          True Self
        </text>
        <text x="250" y="242" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)">
          the still center
        </text>

        <text x="250" y="290" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="600" letterSpacing="1" fill="var(--sage)">
          WHERE IDENTITY LIVES
        </text>
        <text x="250" y="305" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
          neither merged nor walled off
        </text>
      </g>

      {/* Swing arrows */}
      <g>
        <path d="M 130 195 Q 190 160 250 165" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 2" opacity="0.5"/>
        <path d="M 250 165 Q 310 160 370 195" fill="none" stroke="var(--primary)" strokeWidth="1" strokeDasharray="3 2" opacity="0.5"/>
      </g>

      {/* Top caption */}
      <text x="250" y="18" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="600" fill="var(--muted-foreground)">
        BOTH EXTREMES ABANDON THE SELF
      </text>
    </svg>
  );
}
