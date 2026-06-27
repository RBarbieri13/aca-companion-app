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

export function ReversedFlowGlyph({ className, size = 48 }: GlyphProps) {
  return (
    <div className={className}>
      {wrap(size, (
        <g>
          {/* Adult figure - larger */}
          <circle cx="20" cy="22" r="6" fill="var(--primary)" fillOpacity="0.85"/>
          <rect x="14" y="28" width="12" height="18" rx="4" fill="var(--primary)" fillOpacity="0.85"/>
          {/* Child figure - smaller, reaching up */}
          <circle cx="44" cy="28" r="4" fill="var(--accent)"/>
          <rect x="40" y="32" width="8" height="14" rx="3" fill="var(--accent)" fillOpacity="0.9"/>
          {/* Reversed arrow - from child up to adult */}
          <path d="M 38 28 L 28 22" stroke="var(--accent)" strokeWidth="1.5" fill="none"/>
          <path d="M 31 22 L 28 22 L 28 25" stroke="var(--accent)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
      ))}
    </div>
  );
}

export function EnmeshmentGlyph({ className, size = 48 }: GlyphProps) {
  return (
    <div className={className}>
      {wrap(size, (
        <g>
          {/* Two overlapping circles - no boundary */}
          <circle cx="23" cy="30" r="13" fill="var(--accent)" fillOpacity="0.5" stroke="var(--accent)" strokeWidth="1.5"/>
          <circle cx="37" cy="30" r="13" fill="var(--primary)" fillOpacity="0.5" stroke="var(--primary)" strokeWidth="1.5"/>
          {/* Tangle in the middle */}
          <path d="M 25 26 Q 30 30 35 26 M 25 34 Q 30 30 35 34" stroke="var(--foreground)" strokeWidth="1" fill="none" opacity="0.5"/>
        </g>
      ))}
    </div>
  );
}

export function RigidSelfSufficiencyGlyph({ className, size = 48 }: GlyphProps) {
  return (
    <div className={className}>
      {wrap(size, (
        <g>
          {/* Solitary figure inside a box (sanctuary/prison) */}
          <rect x="12" y="14" width="36" height="34" rx="3" fill="none" stroke="var(--primary)" strokeWidth="1.5"/>
          {/* Vertical bars suggesting prison */}
          <line x1="20" y1="16" x2="20" y2="46" stroke="var(--primary)" strokeWidth="1" opacity="0.5"/>
          <line x1="28" y1="16" x2="28" y2="46" stroke="var(--primary)" strokeWidth="1" opacity="0.5"/>
          <line x1="36" y1="16" x2="36" y2="46" stroke="var(--primary)" strokeWidth="1" opacity="0.5"/>
          {/* Figure inside */}
          <circle cx="30" cy="26" r="4" fill="var(--accent)"/>
          <rect x="26" y="30" width="8" height="12" rx="3" fill="var(--accent)" fillOpacity="0.85"/>
        </g>
      ))}
    </div>
  );
}

export function InsideDrugsGlyph({ className, size = 48 }: GlyphProps) {
  return (
    <div className={className}>
      {wrap(size, (
        <g>
          {/* Three droplets representing cortisol / adrenaline / melatonin */}
          <path d="M 20 18 Q 16 26 20 30 Q 24 26 20 18 Z" fill="var(--accent)" fillOpacity="0.85"/>
          <path d="M 30 14 Q 26 22 30 26 Q 34 22 30 14 Z" fill="var(--primary)" fillOpacity="0.85"/>
          <path d="M 40 18 Q 36 26 40 30 Q 44 26 40 18 Z" fill="var(--muted-foreground)" fillOpacity="0.7"/>
          {/* numb body silhouette below */}
          <circle cx="30" cy="40" r="4" fill="var(--foreground)" fillOpacity="0.35"/>
          <rect x="26" y="44" width="8" height="8" rx="2" fill="var(--foreground)" fillOpacity="0.3"/>
        </g>
      ))}
    </div>
  );
}

export function SoberListeningGlyph({ className, size = 48 }: GlyphProps) {
  return (
    <div className={className}>
      {wrap(size, (
        <g>
          {/* Ear */}
          <path d="M 24 18 Q 18 18 18 28 Q 18 38 24 42 L 26 42 Q 30 42 30 38 Q 30 34 26 32 Q 28 28 28 24 Q 28 18 24 18 Z"
            fill="var(--primary)" fillOpacity="0.85"/>
          {/* Sound waves arriving (criticism) */}
          <path d="M 36 22 Q 40 26 36 32" stroke="var(--accent)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M 41 20 Q 47 26 41 34" stroke="var(--accent)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
          {/* Steady ground line (sober stance) */}
          <line x1="14" y1="48" x2="46" y2="48" stroke="var(--sage)" strokeWidth="1.5" strokeLinecap="round"/>
        </g>
      ))}
    </div>
  );
}

export function EngageSensesGlyph({ className, size = 48 }: GlyphProps) {
  return (
    <div className={className}>
      {wrap(size, (
        <g>
          {/* Five small marks around a center — five senses */}
          <circle cx="30" cy="30" r="6" fill="var(--sage)" fillOpacity="0.6" stroke="var(--primary)" strokeWidth="1.25"/>
          <circle cx="30" cy="14" r="3" fill="var(--accent)"/>
          <circle cx="46" cy="22" r="3" fill="var(--accent)"/>
          <circle cx="44" cy="42" r="3" fill="var(--accent)"/>
          <circle cx="16" cy="42" r="3" fill="var(--accent)"/>
          <circle cx="14" cy="22" r="3" fill="var(--accent)"/>
          {/* Faint connecting lines */}
          <line x1="30" y1="14" x2="30" y2="24" stroke="var(--primary)" strokeWidth="0.75" opacity="0.5"/>
          <line x1="46" y1="22" x2="36" y2="28" stroke="var(--primary)" strokeWidth="0.75" opacity="0.5"/>
          <line x1="44" y1="42" x2="34" y2="34" stroke="var(--primary)" strokeWidth="0.75" opacity="0.5"/>
          <line x1="16" y1="42" x2="26" y2="34" stroke="var(--primary)" strokeWidth="0.75" opacity="0.5"/>
          <line x1="14" y1="22" x2="24" y2="28" stroke="var(--primary)" strokeWidth="0.75" opacity="0.5"/>
        </g>
      ))}
    </div>
  );
}

export function CompulsivePersonalityGlyph({ className, size = 48 }: GlyphProps) {
  return (
    <div className={className}>
      {wrap(size, (
        <g>
          {/* A figure caught in a spinning, driven orbit */}
          <circle cx="30" cy="30" r="16" fill="none" stroke="var(--accent)" strokeWidth="1.25" strokeDasharray="3 2"/>
          {/* central driven figure */}
          <circle cx="30" cy="27" r="4.5" fill="var(--accent)"/>
          <rect x="25.5" y="31" width="9" height="12" rx="3" fill="var(--accent)" fillOpacity="0.85"/>
          {/* orbiting compulsion dot with motion arc */}
          <circle cx="46" cy="30" r="3" fill="var(--primary)"/>
          <path d="M 44 18 A 16 16 0 0 1 46 27" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round"/>
        </g>
      ))}
    </div>
  );
}

export function RecreatingAbandonmentGlyph({ className, size = 48 }: GlyphProps) {
  return (
    <div className={className}>
      {wrap(size, (
        <g>
          {/* A loop arrow returning to the same wound */}
          <path d="M 18 36 A 12 12 0 1 1 30 42" fill="none" stroke="var(--accent)" strokeWidth="1.75" strokeLinecap="round"/>
          <path d="M 30 42 L 25 40 M 30 42 L 31 37" stroke="var(--accent)" strokeWidth="1.75" fill="none" strokeLinecap="round"/>
          {/* the recurring wound at center */}
          <path d="M 30 22 L 32.5 27 L 27.5 27 Z" fill="var(--primary)" fillOpacity="0.85"/>
          <circle cx="30" cy="30" r="2" fill="var(--primary)"/>
        </g>
      ))}
    </div>
  );
}

export function VictimVictimizerGlyph({ className, size = 48 }: GlyphProps) {
  return (
    <div className={className}>
      {wrap(size, (
        <g>
          {/* Triangle of three rotating roles */}
          <path d="M 30 16 L 44 40 L 16 40 Z" fill="none" stroke="var(--primary)" strokeWidth="1.25" opacity="0.5"/>
          {/* three role nodes */}
          <circle cx="30" cy="16" r="4" fill="var(--sage)"/>
          <circle cx="44" cy="40" r="4" fill="var(--accent)"/>
          <circle cx="16" cy="40" r="4" fill="var(--primary)"/>
          {/* rotation arrows */}
          <path d="M 36 22 A 12 12 0 0 1 39 32" fill="none" stroke="var(--muted-foreground)" strokeWidth="1" strokeLinecap="round"/>
          <path d="M 39 32 L 37 30 M 39 32 L 40.5 30" stroke="var(--muted-foreground)" strokeWidth="1" strokeLinecap="round"/>
        </g>
      ))}
    </div>
  );
}

export function SelfAbandonmentGlyph({ className, size = 48 }: GlyphProps) {
  return (
    <div className={className}>
      {wrap(size, (
        <g>
          {/* Adult figure turning away from a small child */}
          <circle cx="22" cy="24" r="6" fill="var(--muted-foreground)" fillOpacity="0.6"/>
          <rect x="16" y="30" width="12" height="16" rx="4" fill="var(--muted-foreground)" fillOpacity="0.5"/>
          {/* small child left behind, dashed (abandoned) */}
          <circle cx="40" cy="30" r="4" fill="none" stroke="var(--accent)" strokeWidth="1.25" strokeDasharray="2 1.5"/>
          <rect x="36" y="34" width="8" height="11" rx="3" fill="none" stroke="var(--accent)" strokeWidth="1.25" strokeDasharray="2 1.5"/>
          {/* gap between them */}
          <line x1="30" y1="20" x2="33" y2="44" stroke="var(--border)" strokeWidth="1" strokeDasharray="2 3" opacity="0.7"/>
        </g>
      ))}
    </div>
  );
}

export function DoubleWinnerGlyph({ className, size = 48 }: GlyphProps) {
  return (
    <div className={className}>
      {wrap(size, (
        <g>
          {/* Two overlapping laurel/check marks — two recoveries */}
          <path d="M 16 30 L 22 37 L 33 22" fill="none" stroke="var(--sage)" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M 27 34 L 33 41 L 44 26" fill="none" stroke="var(--primary)" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
      ))}
    </div>
  );
}

export function CriticalSurvivalParentGlyph({ className, size = 48 }: GlyphProps) {
  return (
    <div className={className}>
      {wrap(size, (
        <g>
          {/* A watchful eye over a small figure — protective but stern */}
          <path d="M 12 26 Q 30 14 48 26 Q 30 38 12 26" fill="none" stroke="var(--primary)" strokeWidth="1.5"/>
          <circle cx="30" cy="26" r="5" fill="var(--primary)"/>
          <circle cx="30" cy="26" r="2" fill="white"/>
          {/* small child beneath */}
          <circle cx="30" cy="44" r="4" fill="var(--accent)"/>
          <rect x="26" y="48" width="8" height="6" rx="2" fill="var(--accent)" fillOpacity="0.85"/>
        </g>
      ))}
    </div>
  );
}

export function PowerReclamationGlyph({ className, size = 48 }: GlyphProps) {
  return (
    <div className={className}>
      {wrap(size, (
        <g>
          {/* A small figure raising a hand — claiming voice/power */}
          <circle cx="30" cy="22" r="6" fill="var(--primary)" fillOpacity="0.9"/>
          <rect x="24" y="28" width="12" height="18" rx="4" fill="var(--primary)" fillOpacity="0.85"/>
          {/* raised arm */}
          <path d="M 36 30 L 44 18" stroke="var(--primary)" strokeWidth="2.25" strokeLinecap="round"/>
          {/* spark/star at the hand */}
          <path d="M 44 16 L 46 12 L 46 16 L 50 17 L 46 18 Z" fill="var(--sage)"/>
        </g>
      ))}
    </div>
  );
}

export function VeilOfDenialGlyph({ className, size = 48 }: GlyphProps) {
  return (
    <div className={className}>
      {wrap(size, (
        <g>
          {/* Hanging veil on a rod — left half opaque, right half translucent (recovery) */}
          <line x1="10" y1="14" x2="50" y2="14" stroke="var(--muted-foreground)" strokeWidth="1.25"/>
          {/* opaque side */}
          <path d="M 12 14 L 12 46 Q 22 50 30 46 L 30 14 Z" fill="var(--muted-foreground)" fillOpacity="0.55"/>
          {/* translucent side */}
          <path d="M 30 14 L 30 46 Q 40 50 48 46 L 48 14 Z" fill="var(--muted-foreground)" fillOpacity="0.18" stroke="var(--muted-foreground)" strokeWidth="0.75" strokeDasharray="2 2"/>
          {/* shape seen through the translucent side */}
          <circle cx="40" cy="32" r="5" fill="var(--sage)" fillOpacity="0.6"/>
        </g>
      ))}
    </div>
  );
}

export function HumbleParticipationGlyph({ className, size = 48 }: GlyphProps) {
  return (
    <div className={className}>
      {wrap(size, (
        <g>
          {/* Three figures in a circle — equal participants */}
          <circle cx="20" cy="34" r="5" fill="var(--primary)" fillOpacity="0.85"/>
          <circle cx="40" cy="34" r="5" fill="var(--sage)" fillOpacity="0.85"/>
          <circle cx="30" cy="22" r="5" fill="var(--accent)" fillOpacity="0.85"/>
          {/* connecting triangle (equal sides) */}
          <path d="M 30 22 L 20 34 L 40 34 Z" fill="none" stroke="var(--primary)" strokeWidth="1" strokeOpacity="0.45"/>
        </g>
      ))}
    </div>
  );
}

export function WholenessCompletenessGlyph({ className, size = 48 }: GlyphProps) {
  return (
    <div className={className}>
      {wrap(size, (
        <g>
          {/* Concentric ring + filled core — complete in self */}
          <circle cx="30" cy="30" r="16" fill="none" stroke="var(--primary)" strokeWidth="1.25" strokeDasharray="3 3" opacity="0.55"/>
          <circle cx="30" cy="30" r="11" fill="var(--sage)" fillOpacity="0.25" stroke="var(--sage)" strokeWidth="1.5"/>
          <circle cx="30" cy="30" r="5" fill="var(--primary)"/>
        </g>
      ))}
    </div>
  );
}

export function OverResponsibilityGlyph({ className, size = 48 }: GlyphProps) {
  return (
    <div className={className}>
      {wrap(size, (
        <g>
          {/* small figure carrying an oversized weight */}
          <circle cx="24" cy="34" r="5" fill="var(--accent)"/>
          <rect x="20" y="39" width="8" height="11" rx="2.5" fill="var(--accent)" fillOpacity="0.85"/>
          {/* oversized load on the back/shoulders */}
          <rect x="26" y="14" width="22" height="18" rx="3" fill="var(--primary)" fillOpacity="0.85"/>
          <line x1="26" y1="20" x2="48" y2="20" stroke="var(--card)" strokeWidth="1" opacity="0.5"/>
          <line x1="26" y1="26" x2="48" y2="26" stroke="var(--card)" strokeWidth="1" opacity="0.5"/>
          {/* strain line */}
          <path d="M 22 28 L 26 32" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/>
        </g>
      ))}
    </div>
  );
}

export function ParentificationGlyph({ className, size = 48 }: GlyphProps) {
  return (
    <div className={className}>
      {wrap(size, (
        <g>
          {/* small child figure sheltering a larger (parent) figure — role reversed */}
          <circle cx="22" cy="26" r="6" fill="var(--accent)"/>
          <rect x="15" y="33" width="14" height="15" rx="4" fill="var(--accent)" fillOpacity="0.85"/>
          {/* protective arc over a slumped adult */}
          <path d="M 30 44 Q 30 30 42 30 Q 48 30 48 38" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="40" cy="40" r="4" fill="var(--muted-foreground)" fillOpacity="0.6"/>
        </g>
      ))}
    </div>
  );
}

export function EnablingGlyph({ className, size = 48 }: GlyphProps) {
  return (
    <div className={className}>
      {wrap(size, (
        <g>
          {/* a propping hand holding up a leaning figure */}
          <path d="M 30 18 L 38 44" stroke="var(--muted-foreground)" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
          <circle cx="29" cy="16" r="5" fill="var(--muted-foreground)" fillOpacity="0.6"/>
          {/* the prop / supporting hand */}
          <path d="M 18 46 L 30 30" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="16" cy="46" r="3" fill="var(--accent)"/>
        </g>
      ))}
    </div>
  );
}

export function InferiorityGrandiosityGlyph({ className, size = 48 }: GlyphProps) {
  return (
    <div className={className}>
      {wrap(size, (
        <g>
          {/* a balance/seesaw between low and high */}
          <line x1="14" y1="40" x2="46" y2="20" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M 30 30 L 26 46 L 34 46 Z" fill="var(--muted-foreground)" fillOpacity="0.5"/>
          {/* low end (inferiority) */}
          <circle cx="14" cy="40" r="4" fill="var(--accent)"/>
          {/* high end (grandiosity) */}
          <circle cx="46" cy="20" r="4" fill="#D4A84B"/>
        </g>
      ))}
    </div>
  );
}

export function MagicalOmnipotenceGlyph({ className, size = 48 }: GlyphProps) {
  return (
    <div className={className}>
      {wrap(size, (
        <g>
          {/* small child with radiating "magic" sparks */}
          <circle cx="30" cy="32" r="6" fill="var(--accent)"/>
          <rect x="24" y="38" width="12" height="12" rx="3" fill="var(--accent)" fillOpacity="0.85"/>
          {[[30,14],[44,20],[16,20],[46,34],[14,34]].map(([x,y],i)=>(
            <path key={i} d={`M ${x} ${y-3} L ${x+1.5} ${y} L ${x} ${y+3} L ${x-1.5} ${y} Z`} fill="#D4A84B"/>
          ))}
          <circle cx="30" cy="32" r="13" fill="none" stroke="#D4A84B" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.6"/>
        </g>
      ))}
    </div>
  );
}

export function SelfFocusGlyph({ className, size = 48 }: GlyphProps) {
  return (
    <div className={className}>
      {wrap(size, (
        <g>
          {/* a figure with attention/arrow turned inward toward self */}
          <circle cx="30" cy="26" r="7" fill="var(--sage)" fillOpacity="0.9"/>
          <rect x="22" y="34" width="16" height="14" rx="5" fill="var(--sage)" fillOpacity="0.8"/>
          {/* inward arrows */}
          <path d="M 12 20 L 22 26" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M 20 24 L 22 26 L 19 27" stroke="var(--primary)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M 48 20 L 38 26" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M 40 24 L 38 26 L 41 27" stroke="var(--primary)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </g>
      ))}
    </div>
  );
}

export function InDepthInventoryGlyph({ className, size = 48 }: GlyphProps) {
  return (
    <div className={className}>
      {wrap(size, (
        <g>
          {/* magnifying glass over a checklist revealing a sage core */}
          <rect x="14" y="16" width="20" height="26" rx="3" fill="var(--muted)" stroke="var(--muted-foreground)" strokeWidth="1"/>
          <line x1="18" y1="22" x2="30" y2="22" stroke="var(--muted-foreground)" strokeWidth="1.25" opacity="0.7"/>
          <line x1="18" y1="28" x2="30" y2="28" stroke="var(--muted-foreground)" strokeWidth="1.25" opacity="0.7"/>
          <line x1="18" y1="34" x2="26" y2="34" stroke="var(--muted-foreground)" strokeWidth="1.25" opacity="0.7"/>
          {/* magnifier */}
          <circle cx="36" cy="34" r="9" fill="var(--sage)" fillOpacity="0.25" stroke="var(--primary)" strokeWidth="1.75"/>
          <line x1="43" y1="41" x2="48" y2="46" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round"/>
          {/* tiny star in lens — capable/worthwhile */}
          <path d="M 36 30 L 37.5 33 L 40.5 33 L 38 35 L 39 38 L 36 36 L 33 38 L 34 35 L 31.5 33 L 34.5 33 Z" fill="var(--sage)" fillOpacity="0.7"/>
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
  "reversed-flow": ReversedFlowGlyph,
  enmeshment: EnmeshmentGlyph,
  "rigid-self-sufficiency": RigidSelfSufficiencyGlyph,
  "inside-drugs": InsideDrugsGlyph,
  "sober-listening": SoberListeningGlyph,
  "engage-your-senses": EngageSensesGlyph,
  "compulsive-personality": CompulsivePersonalityGlyph,
  "recreating-abandonment": RecreatingAbandonmentGlyph,
  "victim-victimizer": VictimVictimizerGlyph,
  "self-abandonment": SelfAbandonmentGlyph,
  "double-winner": DoubleWinnerGlyph,
  "critical-survival-parent": CriticalSurvivalParentGlyph,
  "power-reclamation": PowerReclamationGlyph,
  "veil-of-denial": VeilOfDenialGlyph,
  "humble-participation": HumbleParticipationGlyph,
  "wholeness-completeness": WholenessCompletenessGlyph,
  "overdeveloped-responsibility": OverResponsibilityGlyph,
  parentification: ParentificationGlyph,
  enabling: EnablingGlyph,
  "inferiority-grandiosity": InferiorityGrandiosityGlyph,
  "magical-omnipotence": MagicalOmnipotenceGlyph,
  "self-focus": SelfFocusGlyph,
  "in-depth-inventory": InDepthInventoryGlyph,
};
