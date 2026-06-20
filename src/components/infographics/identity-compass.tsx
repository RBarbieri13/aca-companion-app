"use client";

// Flip Side of Trait 2's Laundry List: "We do not depend on others to tell us who we are."
// A figure with an internal compass - self-defined identity.

interface Props { className?: string; }

export function IdentityCompass({ className }: Props) {
  return (
    <svg viewBox="0 0 420 300" className={className} role="img" aria-label="Self-defined identity">
      {/* Figure */}
      <g>
        <circle cx="210" cy="80" r="28" fill="var(--primary)" fillOpacity="0.9"/>
        <path d="M 172 110 Q 172 95 210 95 Q 248 95 248 110 L 248 220 Q 248 235 210 235 Q 172 235 172 220 Z" fill="var(--primary)" fillOpacity="0.85"/>
      </g>

      {/* Compass inside the chest */}
      <g>
        {/* Outer ring */}
        <circle cx="210" cy="160" r="38" fill="var(--card)" stroke="var(--sage)" strokeWidth="1.5"/>
        {/* Inner ring */}
        <circle cx="210" cy="160" r="30" fill="none" stroke="var(--border)" strokeWidth="0.75"/>

        {/* Compass N, E, S, W markers */}
        <text x="210" y="134" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" fill="var(--primary)">N</text>
        <text x="234" y="163" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" fill="var(--muted-foreground)">E</text>
        <text x="210" y="191" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" fill="var(--muted-foreground)">S</text>
        <text x="186" y="163" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" fill="var(--muted-foreground)">W</text>

        {/* Needle pointing North - the True Self */}
        <path d="M 210 160 L 206 140 L 210 136 L 214 140 Z" fill="var(--accent)"/>
        <path d="M 210 160 L 214 180 L 210 184 L 206 180 Z" fill="var(--muted-foreground)" fillOpacity="0.5"/>
        <circle cx="210" cy="160" r="3" fill="var(--primary)"/>
      </g>

      {/* External influences - shown as subtle arrows that don't redirect the needle */}
      <g opacity="0.55">
        {[
          { x: 60, y: 130, label: "others' opinions" },
          { x: 60, y: 190, label: "past labels" },
          { x: 360, y: 130, label: "what they want" },
          { x: 360, y: 190, label: "comparisons" },
        ].map((e, i) => (
          <g key={i}>
            <text
              x={e.x}
              y={e.y}
              textAnchor="middle"
              fontFamily="var(--font-inter)"
              fontSize="9"
              fontStyle="italic"
              fill="var(--muted-foreground)"
            >
              {e.label}
            </text>
            <path
              d={
                e.x < 210
                  ? `M ${e.x + 40} ${e.y - 2} L ${170} ${160}`
                  : `M ${e.x - 40} ${e.y - 2} L ${250} ${160}`
              }
              stroke="var(--muted-foreground)"
              strokeWidth="0.8"
              strokeDasharray="2 3"
              fill="none"
            />
          </g>
        ))}
      </g>

      {/* Bottom label */}
      <text x="210" y="265" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontStyle="italic" fontWeight="600" fill="var(--primary)">
        The needle points from within
      </text>
      <text x="210" y="285" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fill="var(--muted-foreground)">
        External voices are heard — but they don&apos;t redirect the needle.
      </text>

      {/* Top label */}
      <text x="210" y="28" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontWeight="600" letterSpacing="1.5" fill="var(--muted-foreground)">
        INNER COMPASS
      </text>
    </svg>
  );
}
