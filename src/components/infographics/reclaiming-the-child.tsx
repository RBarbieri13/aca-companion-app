"use client";

// Trait 4 — Flip Side of The Other Laundry List quadrant.
// "We accept and comfort the isolated and hurt Inner Child we have abandoned and disavowed
// and thereby end the need to act out our fears of enmeshment and abandonment with other
// people."
// The loving parent crosses the gap back to the child it left — and as that bond forms, the
// fears of being engulfed or annihilated reduce, opening the door to true intimacy.

interface Props { className?: string; }

export function ReclaimingTheChild({ className }: Props) {
  return (
    <svg viewBox="0 0 560 400" className={className} role="img" aria-label="The loving parent returns to comfort the abandoned inner child, opening the way to true intimacy">
      <defs>
        <marker id="rtc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--sage)"/>
        </marker>
        <radialGradient id="rtc-warm" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--sage)" stopOpacity="0.30"/>
          <stop offset="100%" stopColor="var(--sage)" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Title */}
      <text x="280" y="24" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">
        COMING BACK FOR THE CHILD WE LEFT
      </text>
      <text x="280" y="42" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontStyle="italic" fill="var(--muted-foreground)">
        accept &amp; comfort the isolated, hurt Inner Child
      </text>

      {/* Warm glow behind the reunion */}
      <ellipse cx="200" cy="150" rx="150" ry="90" fill="url(#rtc-warm)"/>

      {/* Loving parent */}
      <g>
        <circle cx="130" cy="120" r="20" fill="var(--primary)" fillOpacity="0.9"/>
        <rect x="110" y="140" width="40" height="62" rx="14" fill="var(--primary)" fillOpacity="0.85"/>
        {/* reaching arm */}
        <path d="M 148 158 Q 180 150 208 162" fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round"/>
        <text x="130" y="222" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="700" fill="var(--primary)" letterSpacing="0.5">LOVING PARENT</text>
        <text x="130" y="234" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">the adult who came back</text>
      </g>

      {/* Inner child — no longer dashed, now held */}
      <g>
        <circle cx="240" cy="138" r="13" fill="var(--accent)" fillOpacity="0.9"/>
        <rect x="227" y="150" width="26" height="40" rx="9" fill="var(--accent)" fillOpacity="0.85"/>
        {/* little heart */}
        <path d="M 240 168 L 236 164 Q 233 166.5 236 169.5 L 240 173 L 244 169.5 Q 247 166.5 244 164 Z" fill="white" opacity="0.85"/>
        <text x="240" y="214" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="700" fill="var(--accent)" letterSpacing="0.5">INNER CHILD</text>
        <text x="240" y="226" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">accepted in every mood</text>
      </g>

      {/* the "gap closing" label */}
      <text x="190" y="100" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" fill="var(--sage)" letterSpacing="0.5">
        the gap closes
      </text>

      {/* Outcome chain on the right */}
      <g>
        <rect x="330" y="78" width="206" height="68" rx="12" fill="var(--sage)" fillOpacity="0.16" stroke="var(--sage)" strokeWidth="1.5"/>
        <text x="433" y="100" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" letterSpacing="1" fontWeight="700" fill="var(--sage)">AS THE BOND FORMS</text>
        <text x="433" y="120" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.85">fears of being engulfed</text>
        <text x="433" y="134" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.85">or annihilated reduce</text>
      </g>

      <line x1="433" y1="150" x2="433" y2="182" stroke="var(--sage)" strokeWidth="1.5" markerEnd="url(#rtc-arrow)"/>

      <g>
        <rect x="330" y="186" width="206" height="76" rx="12" fill="var(--primary)" fillOpacity="0.06" stroke="var(--primary)" strokeWidth="1.5"/>
        <text x="433" y="208" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" letterSpacing="1" fontWeight="700" fill="var(--primary)">THE END OF ACTING OUT</text>
        <text x="433" y="228" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12.5" fontStyle="italic" fontWeight="600" fill="var(--foreground)">True intimacy</text>
        <text x="433" y="246" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--foreground)" opacity="0.8">first with our True Self,</text>
        <text x="433" y="258" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--foreground)" opacity="0.8">then with the equally available</text>
      </g>

      {/* Bottom caption */}
      <text x="280" y="300" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
        We end the need to act out our fears of enmeshment and abandonment with other people.
      </text>

      {/* Reparenting reminder strip */}
      <g>
        <rect x="60" y="320" width="440" height="56" rx="10" fill="var(--muted)" fillOpacity="0.4"/>
        <text x="280" y="342" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" letterSpacing="1.2" fontWeight="700" fill="var(--muted-foreground)">
          A COMMITMENT, NOT A MOMENT
        </text>
        <text x="280" y="360" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--foreground)" opacity="0.82">
          As with any relationship, this takes time and effort — kept daily, like a promise.
        </text>
      </g>
    </svg>
  );
}
