"use client";

// An arc showing the movement from survival (Laundry List) to wholeness (Flip Side).
// Used on Flip Side quadrant tabs.

interface Props { className?: string; }

export function RecoveryArc({ className }: Props) {
  return (
    <svg viewBox="0 0 420 200" className={className} role="img" aria-label="The recovery arc">
      <defs>
        <linearGradient id="arc-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.7"/>
          <stop offset="50%" stopColor="var(--sage)" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.9"/>
        </linearGradient>
        <marker id="arrowhead-arc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--primary)"/>
        </marker>
      </defs>

      {/* Start state */}
      <g>
        <circle cx="50" cy="140" r="30" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.5"/>
        <text x="50" y="145" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11" fontWeight="600" fill="var(--accent)">
          Trait
        </text>
        <text x="50" y="185" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontWeight="600" letterSpacing="0.5">
          THE WOUND
        </text>
      </g>

      {/* The arc */}
      <path
        d="M 80 140 Q 210 20 370 140"
        fill="none"
        stroke="url(#arc-grad)"
        strokeWidth="3"
        strokeLinecap="round"
        markerEnd="url(#arrowhead-arc)"
      />

      {/* Milestones on the arc */}
      <g>
        <circle cx="145" cy="80" r="6" fill="var(--card)" stroke="var(--accent)" strokeWidth="2"/>
        <text x="145" y="62" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="600" fill="var(--foreground)">
          Admit powerlessness
        </text>
        <text x="145" y="51" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)">
          over the effect
        </text>
      </g>

      <g>
        <circle cx="210" cy="52" r="6" fill="var(--card)" stroke="var(--sage)" strokeWidth="2"/>
        <text x="210" y="35" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="600" fill="var(--foreground)">
          Daily ACA work
        </text>
        <text x="210" y="24" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)">
          Steps · meetings · reparenting
        </text>
      </g>

      <g>
        <circle cx="280" cy="80" r="6" fill="var(--card)" stroke="var(--sage)" strokeWidth="2"/>
        <text x="280" y="62" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="600" fill="var(--foreground)">
          Appropriate response
        </text>
        <text x="280" y="51" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)">
          not childhood reaction
        </text>
      </g>

      {/* End state */}
      <g>
        <circle cx="375" cy="140" r="32" fill="var(--primary)" stroke="var(--primary)" strokeWidth="2"/>
        <text x="375" y="138" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11" fontWeight="600" fill="white">
          Flip
        </text>
        <text x="375" y="152" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11" fontWeight="600" fill="white">
          Side
        </text>
        <text x="375" y="185" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontWeight="600" letterSpacing="0.5">
          WHOLENESS
        </text>
      </g>
    </svg>
  );
}
