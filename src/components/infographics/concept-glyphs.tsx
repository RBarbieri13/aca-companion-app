"use client";

// Small (48-64px square) inline glyphs for each key concept.
// Used next to concept names in the accordion to give each a visual anchor.

interface GlyphProps { className?: string; size?: number; }

function wrap(size: number, children: React.ReactNode) {
  return (
    <svg viewBox="0 0 60 60" width={size} height={size} role="img" aria-hidden="true">
      <rect width="60" height="60" rx="12" fill="var(--muted)"/>
      {children}
    </svg>
  );
}

export function DissociationGlyph({ className, size = 48 }: GlyphProps) {
  return (
    <div className={className}>
      {wrap(size, (
        <g>
          <path d="M 18 30 Q 30 14 42 30 Q 30 46 18 30" fill="none" stroke="var(--primary)" strokeWidth="1.5"/>
          <circle cx="30" cy="30" r="2.5" fill="var(--accent)"/>
          <circle cx="16" cy="30" r="1.5" fill="var(--muted-foreground)"/>
          <circle cx="44" cy="30" r="1.5" fill="var(--muted-foreground)"/>
        </g>
      ))}
    </div>
  );
}

export function FalseSelfGlyph({ className, size = 48 }: GlyphProps) {
  return (
    <div className={className}>
      {wrap(size, (
        <g>
          <circle cx="30" cy="30" r="18" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 2"/>
          <circle cx="30" cy="30" r="12" fill="var(--muted-foreground)" fillOpacity="0.25"/>
          <circle cx="30" cy="30" r="6" fill="var(--sage)" fillOpacity="0.6"/>
        </g>
      ))}
    </div>
  );
}

export function TrueSelfGlyph({ className, size = 48 }: GlyphProps) {
  return (
    <div className={className}>
      {wrap(size, (
        <g>
          <path d="M 30 14 L 34 26 L 46 28 L 37 36 L 40 48 L 30 42 L 20 48 L 23 36 L 14 28 L 26 26 Z"
            fill="var(--sage)" fillOpacity="0.35" stroke="var(--primary)" strokeWidth="1.5" strokeLinejoin="round"/>
        </g>
      ))}
    </div>
  );
}

export function ReparentingGlyph({ className, size = 48 }: GlyphProps) {
  return (
    <div className={className}>
      {wrap(size, (
        <g>
          {/* Parent hand - larger */}
          <path d="M 14 34 Q 14 24 22 24 L 28 24 Q 32 24 32 28 L 32 38 Q 32 44 26 44 L 18 44 Q 14 44 14 40 Z"
            fill="var(--primary)" fillOpacity="0.85"/>
          {/* Child - smaller, held */}
          <circle cx="40" cy="26" r="5" fill="var(--accent)"/>
          <rect x="36" y="30" width="8" height="16" rx="3" fill="var(--accent)"/>
        </g>
      ))}
    </div>
  );
}

export function InnerChildGlyph({ className, size = 48 }: GlyphProps) {
  return (
    <div className={className}>
      {wrap(size, (
        <g>
          <circle cx="30" cy="22" r="7" fill="var(--accent)"/>
          <rect x="22" y="28" width="16" height="22" rx="6" fill="var(--accent)" fillOpacity="0.85"/>
          {/* Held by parent outline */}
          <path d="M 12 48 Q 30 38 48 48" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round"/>
        </g>
      ))}
    </div>
  );
}

export function LovingParentGlyph({ className, size = 48 }: GlyphProps) {
  return (
    <div className={className}>
      {wrap(size, (
        <g>
          <circle cx="30" cy="20" r="8" fill="var(--primary)"/>
          <path d="M 18 42 Q 18 30 30 30 Q 42 30 42 42 L 42 48 L 18 48 Z" fill="var(--primary)" fillOpacity="0.85"/>
          {/* heart */}
          <path d="M 30 35 L 27 32 Q 24.5 34.5 27 37 L 30 40 L 33 37 Q 35.5 34.5 33 32 Z" fill="white" opacity="0.85"/>
        </g>
      ))}
    </div>
  );
}

export function ActingOutGlyph({ className, size = 48 }: GlyphProps) {
  return (
    <div className={className}>
      {wrap(size, (
        <g>
          <path d="M 14 30 L 46 30" stroke="var(--accent)" strokeWidth="2"/>
          <path d="M 40 24 L 46 30 L 40 36" stroke="var(--accent)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="18" cy="30" r="4" fill="var(--primary)"/>
          <circle cx="30" cy="30" r="3" fill="var(--muted-foreground)" fillOpacity="0.4"/>
        </g>
      ))}
    </div>
  );
}

export function ParaAlcoholicGlyph({ className, size = 48 }: GlyphProps) {
  return (
    <div className={className}>
      {wrap(size, (
        <g>
          {/* Family members - 3 figures */}
          <circle cx="18" cy="24" r="5" fill="var(--accent)" fillOpacity="0.8"/>
          <circle cx="30" cy="22" r="5" fill="var(--accent)" fillOpacity="0.5"/>
          <circle cx="42" cy="24" r="5" fill="var(--accent)" fillOpacity="0.3"/>
          {/* connective line */}
          <path d="M 12 42 Q 30 36 48 42" fill="none" stroke="var(--primary)" strokeWidth="1.25"/>
          <text x="30" y="53" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7" fontWeight="700" fill="var(--primary)" letterSpacing="0.5">FAMILY</text>
        </g>
      ))}
    </div>
  );
}

export function HypervigilanceGlyph({ className, size = 48 }: GlyphProps) {
  return (
    <div className={className}>
      {wrap(size, (
        <g>
          <ellipse cx="30" cy="30" rx="20" ry="11" fill="none" stroke="var(--accent)" strokeWidth="1.5"/>
          <circle cx="30" cy="30" r="6" fill="var(--primary)"/>
          <circle cx="30" cy="30" r="2" fill="white"/>
          {/* radar lines */}
          <line x1="6" y1="30" x2="12" y2="30" stroke="var(--accent)" strokeWidth="1.25"/>
          <line x1="48" y1="30" x2="54" y2="30" stroke="var(--accent)" strokeWidth="1.25"/>
          <line x1="30" y1="12" x2="30" y2="17" stroke="var(--accent)" strokeWidth="1.25"/>
          <line x1="30" y1="43" x2="30" y2="48" stroke="var(--accent)" strokeWidth="1.25"/>
        </g>
      ))}
    </div>
  );
}

export function TwelveStepsGlyph({ className, size = 48 }: GlyphProps) {
  return (
    <div className={className}>
      {wrap(size, (
        <g>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect
              key={i}
              x={8 + i * 7}
              y={48 - (i + 1) * 5}
              width="7"
              height={(i + 1) * 5 - 1}
              fill={i === 5 ? "var(--primary)" : "var(--muted-foreground)"}
              fillOpacity={0.25 + i * 0.12}
              rx="1"
            />
          ))}
        </g>
      ))}
    </div>
  );
}

export const GLYPHS: Record<string, React.ComponentType<GlyphProps>> = {
  dissociation: DissociationGlyph,
  "false-self": FalseSelfGlyph,
  "true-self": TrueSelfGlyph,
  reparenting: ReparentingGlyph,
  "inner-child": InnerChildGlyph,
  "loving-parent": LovingParentGlyph,
  "acting-out": ActingOutGlyph,
  "para-alcoholic": ParaAlcoholicGlyph,
  hypervigilance: HypervigilanceGlyph,
  "twelve-steps": TwelveStepsGlyph,
};
