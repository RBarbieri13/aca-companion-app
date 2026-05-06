"use client";

// Trait 3 — Flip Side of The Other Laundry List quadrant.
// "We can hear them out, ask ourselves what, if anything, we might have done to harm the
// person. If nothing is of our doing we simply say, 'Thank you for sharing. I am sorry you
// feel that way.' ... Even criticism may be viewed from this emotionally sober perspective.
// ... 'If it doesn't apply, let it fly.'"

interface Props { className?: string; }

export function SoberListening({ className }: Props) {
  return (
    <svg viewBox="0 0 640 320" className={className} role="img" aria-label="Sober listening: a flow for receiving anger or criticism without defending the false self">
      <defs>
        <marker id="arrow-sl" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)"/>
        </marker>
      </defs>

      {/* Top caption */}
      <text x="320" y="22" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="600" fill="var(--muted-foreground)">
        EMOTIONALLY SOBER · NOTHING TO DEFEND
      </text>

      {/* INCOMING criticism — left side */}
      <g>
        <rect x="20" y="120" width="120" height="80" rx="12" fill="var(--accent)" fillOpacity="0.16" stroke="var(--accent)" strokeWidth="1.5"/>
        <text x="80" y="148" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--accent)">
          Anger or
        </text>
        <text x="80" y="164" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--accent)">
          criticism
        </text>
        <text x="80" y="184" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
          arrives
        </text>
      </g>

      {/* arrow to question */}
      <line x1="146" y1="160" x2="178" y2="160" stroke="var(--muted-foreground)" strokeWidth="1.25" markerEnd="url(#arrow-sl)"/>

      {/* THE QUESTION — center */}
      <g>
        <rect x="184" y="100" width="180" height="120" rx="14" fill="var(--card)" stroke="var(--primary)" strokeWidth="1.5"/>
        <text x="274" y="124" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.5" fontWeight="600" fill="var(--muted-foreground)">
          ASK YOURSELF
        </text>
        <text x="274" y="148" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
          Is there truth in this
        </text>
        <text x="274" y="166" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
          that could benefit me?
        </text>
        <text x="274" y="190" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)">
          sit with it · reflect · stay present
        </text>
      </g>

      {/* Branching arrows */}
      <g>
        <path d="M 364 130 Q 410 100 470 100" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.25" markerEnd="url(#arrow-sl)"/>
        <text x="412" y="92" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="600" fill="var(--sage)">
          YES
        </text>

        <path d="M 364 195 Q 410 230 470 230" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.25" markerEnd="url(#arrow-sl)"/>
        <text x="412" y="222" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="600" fill="var(--accent)">
          NO
        </text>
      </g>

      {/* RESPONSE — yes branch */}
      <g>
        <rect x="478" y="62" width="146" height="84" rx="12" fill="var(--sage)" fillOpacity="0.22" stroke="var(--sage)" strokeWidth="1.5"/>
        <text x="551" y="84" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="600" fill="var(--sage)">
          IF IT APPLIES
        </text>
        <text x="551" y="104" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
          Thank them for
        </text>
        <text x="551" y="120" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
          showing me
        </text>
        <text x="551" y="138" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)">
          take responsibility · grow
        </text>
      </g>

      {/* RESPONSE — no branch */}
      <g>
        <rect x="478" y="190" width="146" height="84" rx="12" fill="var(--primary)" fillOpacity="0.12" stroke="var(--primary)" strokeWidth="1.5"/>
        <text x="551" y="212" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="600" fill="var(--primary)">
          IF IT DOESN&apos;T
        </text>
        <text x="551" y="232" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
          &ldquo;Thank you for sharing.
        </text>
        <text x="551" y="248" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
          I&apos;m sorry you feel that way.&rdquo;
        </text>
        <text x="551" y="266" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
          let it fly
        </text>
      </g>

      {/* Bottom caption */}
      <text x="320" y="298" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--muted-foreground)" fontStyle="italic">
        Renewed True Self esteem makes the false self nothing left to defend.
      </text>
    </svg>
  );
}
