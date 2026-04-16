"use client";

// Two-figure graphic for the Inner Child exercise. The Loving Parent (larger, grounded)
// and the Inner Child (smaller, held).

interface Props { className?: string; }

export function InnerChildDialog({ className }: Props) {
  return (
    <svg viewBox="0 0 380 220" className={className} role="img" aria-label="Loving Parent and Inner Child in dialogue">
      {/* Ground */}
      <ellipse cx="190" cy="200" rx="150" ry="8" fill="var(--border)" opacity="0.5"/>

      {/* Loving Parent - taller figure on left */}
      <g>
        <circle cx="130" cy="58" r="22" fill="var(--primary)" fillOpacity="0.95"/>
        <rect x="108" y="78" width="44" height="110" rx="16" fill="var(--primary)" fillOpacity="0.85"/>
        {/* Gentle gesture - arm reaching out */}
        <path d="M 152 110 Q 185 120 220 150" stroke="var(--primary)" strokeWidth="14" strokeLinecap="round" fill="none" opacity="0.85"/>
        <text x="130" y="218" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontWeight="600" fill="var(--primary)" letterSpacing="0.5">LOVING PARENT</text>
      </g>

      {/* Inner Child - smaller figure on right */}
      <g>
        <circle cx="260" cy="118" r="14" fill="var(--accent)" fillOpacity="0.95"/>
        <rect x="246" y="130" width="28" height="58" rx="10" fill="var(--accent)" fillOpacity="0.85"/>
        <text x="260" y="218" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontWeight="600" fill="var(--accent)" letterSpacing="0.5">INNER CHILD</text>
      </g>

      {/* Speech bubbles */}
      <g fontFamily="var(--font-fraunces)" fontStyle="italic">
        <g>
          <rect x="30" y="25" width="140" height="34" rx="8" fill="var(--card)" stroke="var(--primary)" strokeWidth="1.25"/>
          <path d="M 100 59 L 106 70 L 115 59 Z" fill="var(--card)" stroke="var(--primary)" strokeWidth="1.25"/>
          <path d="M 101 59 L 114 59" stroke="var(--card)" strokeWidth="2"/>
          <text x="100" y="42" textAnchor="middle" fontSize="11" fill="var(--primary)">&ldquo;I&apos;m here.&rdquo;</text>
          <text x="100" y="54" textAnchor="middle" fontSize="10" fill="var(--muted-foreground)" fontFamily="var(--font-inter)">What&apos;s happening?</text>
        </g>

        <g>
          <rect x="220" y="70" width="150" height="34" rx="8" fill="var(--card)" stroke="var(--accent)" strokeWidth="1.25"/>
          <path d="M 240 104 L 234 115 L 248 104 Z" fill="var(--card)" stroke="var(--accent)" strokeWidth="1.25"/>
          <path d="M 241 104 L 247 104" stroke="var(--card)" strokeWidth="2"/>
          <text x="295" y="87" textAnchor="middle" fontSize="11" fill="var(--accent)">&ldquo;I feel scared.&rdquo;</text>
          <text x="295" y="99" textAnchor="middle" fontSize="10" fill="var(--muted-foreground)" fontFamily="var(--font-inter)">and tired...</text>
        </g>
      </g>
    </svg>
  );
}
