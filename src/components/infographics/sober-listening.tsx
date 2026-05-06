"use client";

// Trait 3 — Flip Side of The Other Laundry List quadrant.
// "We can hear them out, ask ourselves what, if anything, we might have done to harm the
// person. If nothing is of our doing we simply say, 'Thank you for sharing. I am sorry you
// feel that way.' ... Even criticism may be viewed from this emotionally sober perspective.
// ... 'If it doesn't apply, let it fly.'"

interface Props { className?: string; }

export function SoberListening({ className }: Props) {
  return (
    <svg viewBox="0 0 720 380" className={className} role="img" aria-label="Sober listening: a flow for receiving anger or criticism without defending the false self">
      <defs>
        <marker id="arrow-sl" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)"/>
        </marker>
        <marker id="arrow-old" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--accent)" opacity="0.55"/>
        </marker>
      </defs>

      {/* Top caption */}
      <text x="360" y="22" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">
        EMOTIONALLY SOBER · NOTHING TO DEFEND
      </text>
      <text x="360" y="38" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontStyle="italic" fill="var(--muted-foreground)">
        from True Self esteem, criticism is information — not a verdict
      </text>

      {/* INCOMING criticism — left side */}
      <g>
        <rect x="20" y="140" width="130" height="88" rx="12" fill="var(--accent)" fillOpacity="0.16" stroke="var(--accent)" strokeWidth="1.5"/>
        <text x="85" y="166" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fontWeight="700" letterSpacing="0.8" fill="var(--accent)">
          INPUT
        </text>
        <text x="85" y="186" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--accent)">
          Anger or
        </text>
        <text x="85" y="202" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--accent)">
          criticism
        </text>
        <text x="85" y="220" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">
          arrives
        </text>
      </g>

      {/* arrow to question */}
      <line x1="156" y1="184" x2="194" y2="184" stroke="var(--muted-foreground)" strokeWidth="1.25" markerEnd="url(#arrow-sl)"/>

      {/* THE QUESTION — center */}
      <g>
        <rect x="200" y="116" width="210" height="136" rx="14" fill="var(--card)" stroke="var(--primary)" strokeWidth="1.75"/>
        <text x="305" y="140" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">
          THE SOBER QUESTION
        </text>
        <text x="305" y="166" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
          Is there truth in this
        </text>
        <text x="305" y="184" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
          that could benefit me?
        </text>
        {/* tools */}
        <line x1="232" y1="200" x2="378" y2="200" stroke="var(--border)" strokeWidth="1" opacity="0.6"/>
        <text x="305" y="216" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--foreground)" opacity="0.78">
          breathe · sit with it · hear it out
        </text>
        <text x="305" y="231" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">
          ask: what, if anything, did I do?
        </text>
      </g>

      {/* Branching arrows */}
      <g>
        <path d="M 410 150 Q 460 110 530 110" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.25" markerEnd="url(#arrow-sl)"/>
        <text x="468" y="100" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="700" fill="var(--sage)">
          YES
        </text>

        <path d="M 410 220 Q 460 260 530 260" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.25" markerEnd="url(#arrow-sl)"/>
        <text x="468" y="252" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="700" fill="var(--primary)">
          NO
        </text>
      </g>

      {/* RESPONSE — yes branch */}
      <g>
        <rect x="540" y="58" width="170" height="100" rx="12" fill="var(--sage)" fillOpacity="0.22" stroke="var(--sage)" strokeWidth="1.5"/>
        <text x="625" y="82" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--sage)">
          IF IT APPLIES
        </text>
        <text x="625" y="104" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11.5" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
          &ldquo;Thank you for
        </text>
        <text x="625" y="120" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11.5" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
          showing me.&rdquo;
        </text>
        <text x="625" y="142" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">
          take responsibility · grow
        </text>
      </g>

      {/* RESPONSE — no branch */}
      <g>
        <rect x="540" y="208" width="170" height="100" rx="12" fill="var(--primary)" fillOpacity="0.10" stroke="var(--primary)" strokeWidth="1.5"/>
        <text x="625" y="232" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--primary)">
          IF IT DOESN&apos;T
        </text>
        <text x="625" y="254" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
          &ldquo;Thank you for sharing.
        </text>
        <text x="625" y="270" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
          I&apos;m sorry you feel that way.&rdquo;
        </text>
        <text x="625" y="292" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">
          if it doesn&apos;t apply, let it fly
        </text>
      </g>

      {/* OLD path — defending the false self, crossed out */}
      <g opacity="0.65">
        <rect x="200" y="290" width="210" height="56" rx="10" fill="none" stroke="var(--accent)" strokeWidth="1.25" strokeDasharray="3 3"/>
        <text x="305" y="310" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1" fontWeight="700" fill="var(--accent)">
          THE OLD PATH (no longer needed)
        </text>
        <text x="305" y="326" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--foreground)" fontStyle="italic">
          flinch · attack · contempt · ridicule
        </text>
        <text x="305" y="338" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)">
          defending the false self with anger
        </text>
        {/* strikethrough */}
        <line x1="220" y1="318" x2="390" y2="318" stroke="var(--accent)" strokeWidth="1" opacity="0.55"/>
      </g>
      <path d="M 156 226 Q 180 270 200 308" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 3" opacity="0.45" markerEnd="url(#arrow-old)"/>

      {/* Bottom caption */}
      <text x="360" y="368" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--muted-foreground)" fontStyle="italic">
        Renewed True Self esteem leaves the false self with nothing left to defend.
      </text>
    </svg>
  );
}
