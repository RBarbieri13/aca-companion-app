"use client";

// Two figures at a healthy distance — used on Flip Side of The Other Laundry List.
// Contrasts with the dominating dynamic of The Other Laundry List.

interface Props { className?: string; }

export function AuthenticConnection({ className }: Props) {
  return (
    <svg viewBox="0 0 400 220" className={className} role="img" aria-label="Authentic connection without intimidation">
      {/* Ground */}
      <line x1="30" y1="185" x2="370" y2="185" stroke="var(--border)" strokeWidth="1" strokeDasharray="2 4" opacity="0.7"/>

      {/* Left figure - self */}
      <g>
        <circle cx="120" cy="80" r="20" fill="var(--primary)" fillOpacity="0.9"/>
        <rect x="100" y="100" width="40" height="70" rx="14" fill="var(--primary)" fillOpacity="0.8"/>
        <text x="120" y="205" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="600" fill="var(--primary)" letterSpacing="0.5">YOU</text>
        <text x="120" y="216" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)">grounded</text>
      </g>

      {/* Right figure - other */}
      <g>
        <circle cx="280" cy="80" r="20" fill="var(--sage)" fillOpacity="0.9"/>
        <rect x="260" y="100" width="40" height="70" rx="14" fill="var(--sage)" fillOpacity="0.85"/>
        <text x="280" y="205" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="600" fill="var(--primary)" letterSpacing="0.5">OTHER</text>
        <text x="280" y="216" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)">their dignity intact</text>
      </g>

      {/* Connection - warm, bidirectional, not collapsing */}
      <g>
        <path d="M 145 110 Q 200 85 255 110" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 145 135 Q 200 160 255 135" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
      </g>

      {/* Labels between */}
      <g fontFamily="var(--font-inter)">
        <rect x="170" y="60" width="60" height="18" rx="9" fill="var(--card)" stroke="var(--sage)" strokeWidth="1"/>
        <text x="200" y="72" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--primary)">engaged</text>

        <rect x="170" y="142" width="60" height="18" rx="9" fill="var(--card)" stroke="var(--sage)" strokeWidth="1"/>
        <text x="200" y="154" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--primary)">mutual</text>
      </g>

      {/* Title */}
      <text x="200" y="30" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontWeight="600" letterSpacing="1.5" fill="var(--muted-foreground)">
        CONNECTED, NOT CONTROLLING
      </text>
    </svg>
  );
}
