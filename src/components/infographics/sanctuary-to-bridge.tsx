"use client";

// Flip Side of The Other Laundry List: "the sanctuary we have built... has become a prison
// and we become willing to risk moving out of isolation."
// Three panels: sanctuary (cozy) -> prison (bars) -> bridge (leaving toward fellowship).

interface Props { className?: string; }

export function SanctuaryToBridge({ className }: Props) {
  return (
    <svg viewBox="0 0 640 240" className={className} role="img" aria-label="Sanctuary becomes prison, then a bridge out">
      <defs>
        <marker id="arrow-stb" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)"/>
        </marker>
      </defs>

      {/* PANEL 1: Sanctuary */}
      <g>
        {/* Soft rounded enclosure */}
        <path d="M 40 160 Q 40 80 115 80 Q 190 80 190 160 Z" fill="var(--sage)" fillOpacity="0.25" stroke="var(--sage)" strokeWidth="1.5"/>
        {/* Figure - at peace */}
        <circle cx="115" cy="125" r="10" fill="var(--primary)" fillOpacity="0.9"/>
        <rect x="107" y="133" width="16" height="22" rx="5" fill="var(--primary)" fillOpacity="0.85"/>
        {/* Warm glow */}
        <circle cx="115" cy="120" r="35" fill="var(--sage)" fillOpacity="0.08"/>

        <text x="115" y="190" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--primary)">Sanctuary</text>
        <text x="115" y="206" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">safe · protective</text>
        <text x="115" y="218" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">needed, at first</text>
      </g>

      {/* Arrow 1 */}
      <g>
        <line x1="210" y1="120" x2="235" y2="120" stroke="var(--muted-foreground)" strokeWidth="1.25" markerEnd="url(#arrow-stb)"/>
        <text x="222" y="108" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">time passes</text>
      </g>

      {/* PANEL 2: Prison */}
      <g>
        {/* Same silhouette, but with bars */}
        <path d="M 255 160 Q 255 80 330 80 Q 405 80 405 160 Z" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.5"/>
        {/* Bars */}
        <line x1="280" y1="85" x2="280" y2="160" stroke="var(--accent)" strokeWidth="1.5"/>
        <line x1="305" y1="82" x2="305" y2="160" stroke="var(--accent)" strokeWidth="1.5"/>
        <line x1="330" y1="80" x2="330" y2="160" stroke="var(--accent)" strokeWidth="1.5"/>
        <line x1="355" y1="82" x2="355" y2="160" stroke="var(--accent)" strokeWidth="1.5"/>
        <line x1="380" y1="85" x2="380" y2="160" stroke="var(--accent)" strokeWidth="1.5"/>

        {/* Figure - looking out */}
        <circle cx="330" cy="125" r="10" fill="var(--primary)" fillOpacity="0.85"/>
        <rect x="322" y="133" width="16" height="22" rx="5" fill="var(--primary)" fillOpacity="0.8"/>

        <text x="330" y="190" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--accent)">Prison</text>
        <text x="330" y="206" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">same walls · different meaning</text>
        <text x="330" y="218" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">needs denied, unmet</text>
      </g>

      {/* Arrow 2 */}
      <g>
        <line x1="420" y1="120" x2="445" y2="120" stroke="var(--muted-foreground)" strokeWidth="1.25" markerEnd="url(#arrow-stb)"/>
        <text x="432" y="108" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">we risk</text>
      </g>

      {/* PANEL 3: Bridge & Fellowship */}
      <g>
        {/* Ruined wall on left */}
        <path d="M 465 160 Q 465 100 490 95" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5"/>

        {/* Figure walking out */}
        <circle cx="490" cy="118" r="10" fill="var(--primary)" fillOpacity="0.9"/>
        <rect x="482" y="126" width="16" height="22" rx="5" fill="var(--primary)" fillOpacity="0.85"/>

        {/* Bridge */}
        <path d="M 498 148 L 540 160" stroke="var(--sage)" strokeWidth="3" strokeLinecap="round"/>
        <path d="M 498 152 L 540 164" stroke="var(--sage)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>

        {/* Fellowship - multiple warm figures */}
        <g>
          <circle cx="555" cy="135" r="8" fill="var(--sage)" fillOpacity="0.9"/>
          <rect x="549" y="141" width="12" height="16" rx="4" fill="var(--sage)" fillOpacity="0.85"/>

          <circle cx="580" cy="130" r="9" fill="var(--accent)" fillOpacity="0.75"/>
          <rect x="573" y="137" width="14" height="18" rx="4" fill="var(--accent)" fillOpacity="0.7"/>

          <circle cx="608" cy="138" r="8" fill="var(--primary)" fillOpacity="0.7"/>
          <rect x="602" y="144" width="12" height="16" rx="4" fill="var(--primary)" fillOpacity="0.65"/>
        </g>

        <text x="560" y="190" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--sage)">Fellowship</text>
        <text x="560" y="206" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">accepted as we are</text>
        <text x="560" y="218" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">celebrates individuality</text>
      </g>

      {/* Top caption */}
      <text x="320" y="20" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="600" fill="var(--muted-foreground)">
        THE SAME WALLS, THREE MEANINGS
      </text>
    </svg>
  );
}
