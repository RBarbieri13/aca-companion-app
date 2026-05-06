"use client";

// Trait 3 supplement — a single-frame overview of the four positions in Trait 3,
// the chemistry that powers each one, and where recovery enters.
// Designed for the "Other Laundry List" quadrant as a synthesis graphic.

interface Props { className?: string; }

export function GameOfDissociation({ className }: Props) {
  return (
    <svg viewBox="0 0 760 460" className={className} role="img" aria-label="The Game of Dissociation in Trait 3 — four positions in one frame">
      <defs>
        <marker id="god-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)"/>
        </marker>
      </defs>

      {/* Title */}
      <text x="380" y="24" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">
        TRAIT 3 IN ONE FRAME
      </text>
      <text x="380" y="42" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
        The Game of Dissociation — and where recovery enters
      </text>

      {/* Center — buried wound */}
      <g>
        <circle cx="380" cy="240" r="62" fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="1.75"/>
        <text x="380" y="232" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--accent)">
          THE WOUND
        </text>
        <text x="380" y="250" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12" fontStyle="italic" fontWeight="600" fill="var(--primary)">
          Childhood
        </text>
        <text x="380" y="266" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12" fontStyle="italic" fontWeight="600" fill="var(--primary)">
          anger &amp; criticism
        </text>
      </g>

      {/* TOP-LEFT — Avoider position (Laundry List) */}
      <g>
        <rect x="30" y="80" width="240" height="120" rx="14" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.5"/>
        <text x="50" y="104" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--accent)">
          THE LAUNDRY LIST
        </text>
        <text x="50" y="128" fontFamily="var(--font-fraunces)" fontSize="14" fontWeight="600" fill="var(--accent)">
          Avoider
        </text>
        <text x="50" y="146" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.85">
          frightened by anger &amp; criticism
        </text>
        {/* Chemistry */}
        <g fontFamily="var(--font-inter)" fontSize="8.5">
          <text x="50" y="170" fill="var(--muted-foreground)" letterSpacing="0.8" fontWeight="700">DOSING:</text>
          <text x="100" y="170" fill="var(--accent)" fontStyle="italic">worry · fear · pain</text>
          <text x="50" y="186" fill="var(--muted-foreground)" letterSpacing="0.8" fontWeight="700">FEELS:</text>
          <text x="100" y="186" fill="var(--foreground)" opacity="0.78">numb · small · scanning</text>
        </g>
      </g>

      {/* TOP-RIGHT — Aggressor position (Other Laundry List) */}
      <g>
        <rect x="490" y="80" width="240" height="120" rx="14" fill="var(--primary)" fillOpacity="0.08" stroke="var(--primary)" strokeWidth="1.5"/>
        <text x="510" y="104" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--primary)">
          THE OTHER LAUNDRY LIST
        </text>
        <text x="510" y="128" fontFamily="var(--font-fraunces)" fontSize="14" fontWeight="600" fill="var(--primary)">
          Aggressor
        </text>
        <text x="510" y="146" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.85">
          frightening with anger &amp; cutting criticism
        </text>
        {/* Chemistry */}
        <g fontFamily="var(--font-inter)" fontSize="8.5">
          <text x="510" y="170" fill="var(--muted-foreground)" letterSpacing="0.8" fontWeight="700">DOSING:</text>
          <text x="560" y="170" fill="var(--primary)" fontStyle="italic">adrenaline of control</text>
          <text x="510" y="186" fill="var(--muted-foreground)" letterSpacing="0.8" fontWeight="700">FEELS:</text>
          <text x="560" y="186" fill="var(--foreground)" opacity="0.78">in charge · powerful · armored</text>
        </g>
      </g>

      {/* BOTTOM-LEFT — Flip Side of Laundry List */}
      <g>
        <rect x="30" y="288" width="240" height="120" rx="14" fill="var(--sage)" fillOpacity="0.18" stroke="var(--sage)" strokeWidth="1.5"/>
        <text x="50" y="312" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--sage)">
          FLIP SIDE OF THE LAUNDRY LIST
        </text>
        <text x="50" y="336" fontFamily="var(--font-fraunces)" fontSize="14" fontWeight="600" fill="var(--sage)">
          Grounded
        </text>
        <text x="50" y="354" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.85">
          not automatically frightened
        </text>
        <g fontFamily="var(--font-inter)" fontSize="8.5">
          <text x="50" y="378" fill="var(--muted-foreground)" letterSpacing="0.8" fontWeight="700">TOOL:</text>
          <text x="86" y="378" fill="var(--sage)" fontStyle="italic">engage the senses</text>
          <text x="50" y="394" fill="var(--muted-foreground)" letterSpacing="0.8" fontWeight="700">FEELS:</text>
          <text x="92" y="394" fill="var(--foreground)" opacity="0.78">present · adult · here-now</text>
        </g>
      </g>

      {/* BOTTOM-RIGHT — Flip Side of Other Laundry List */}
      <g>
        <rect x="490" y="288" width="240" height="120" rx="14" fill="#8B7BA8" fillOpacity="0.16" stroke="#8B7BA8" strokeWidth="1.5"/>
        <text x="510" y="312" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="#8B7BA8">
          FLIP SIDE OF THE OTHER
        </text>
        <text x="510" y="336" fontFamily="var(--font-fraunces)" fontSize="14" fontWeight="600" fill="#8B7BA8">
          Sober
        </text>
        <text x="510" y="354" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.85">
          nothing left to defend
        </text>
        <g fontFamily="var(--font-inter)" fontSize="8.5">
          <text x="510" y="378" fill="var(--muted-foreground)" letterSpacing="0.8" fontWeight="700">TOOL:</text>
          <text x="546" y="378" fill="#8B7BA8" fontStyle="italic">thank you for sharing</text>
          <text x="510" y="394" fill="var(--muted-foreground)" letterSpacing="0.8" fontWeight="700">FEELS:</text>
          <text x="552" y="394" fill="var(--foreground)" opacity="0.78">steady · curious · responsible</text>
        </g>
      </g>

      {/* Connector arrows from wound out to each pole (the trigger flips you) */}
      <g opacity="0.6">
        <path d="M 332 218 Q 280 180 270 156" fill="none" stroke="var(--accent)" strokeWidth="1.25" strokeDasharray="3 2" markerEnd="url(#god-arrow)"/>
        <path d="M 428 218 Q 480 180 490 156" fill="none" stroke="var(--primary)" strokeWidth="1.25" strokeDasharray="3 2" markerEnd="url(#god-arrow)"/>
      </g>

      {/* Arrows showing recovery direction (top → bottom) */}
      <g opacity="0.7">
        <path d="M 150 210 L 150 280" fill="none" stroke="var(--sage)" strokeWidth="1.5" markerEnd="url(#god-arrow)"/>
        <text x="160" y="248" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" fill="var(--sage)" letterSpacing="0.5">
          recover
        </text>

        <path d="M 610 210 L 610 280" fill="none" stroke="#8B7BA8" strokeWidth="1.5" markerEnd="url(#god-arrow)"/>
        <text x="620" y="248" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" fill="#8B7BA8" letterSpacing="0.5">
          recover
        </text>
      </g>

      {/* Bottom caption */}
      <text x="380" y="438" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--muted-foreground)" fontStyle="italic">
        The avoider and aggressor are the same person, both running on dosing chemistry.
        Recovery is the move from chemistry to presence.
      </text>
    </svg>
  );
}
