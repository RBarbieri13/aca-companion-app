"use client";

// The 2x2 model that structures every trait in the workbook.
// Laundry List (original) ↔ Other Laundry List (acting out)
// ↕ recovery axis ↕
// Flip Side ↔ Flip Side of Other

interface Props {
  className?: string;
  activeQuadrant?: "laundry" | "other" | "flipSide" | "flipSideOther";
  compact?: boolean;
}

export function QuadrantDiagram({ className, activeQuadrant, compact }: Props) {
  const isActive = (q: string) => activeQuadrant === q;
  const size = compact ? 220 : 320;

  return (
    <svg
      viewBox="0 0 360 320"
      className={className}
      width={size}
      height={Math.round(size * 320 / 360)}
      role="img"
      aria-label="The four quadrants of each trait"
    >
      {/* Axis labels */}
      <g fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontWeight="600" letterSpacing="1">
        <text x="180" y="14" textAnchor="middle">HOW THE TRAIT SHOWS UP</text>
        <text x="180" y="310" textAnchor="middle">↕   RECOVERY   ↕</text>
        <text x="6" y="165" transform="rotate(-90 6 165)" textAnchor="middle">←  TRAIT  →</text>
        <text x="354" y="165" transform="rotate(90 354 165)" textAnchor="middle">←  ACTING OUT  →</text>
      </g>

      {/* Quadrant rectangles */}
      {/* Laundry List - top left */}
      <g>
        <rect
          x="30" y="30" width="145" height="120" rx="12"
          fill={isActive("laundry") ? "var(--primary)" : "var(--muted)"}
          fillOpacity={isActive("laundry") ? 1 : 0.5}
          stroke="var(--primary)"
          strokeWidth={isActive("laundry") ? 2 : 1}
        />
        <text x="102" y="62" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill={isActive("laundry") ? "white" : "var(--primary)"}>
          The Laundry List
        </text>
        <text x="102" y="82" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill={isActive("laundry") ? "white" : "var(--muted-foreground)"} fillOpacity="0.85">
          the original trait
        </text>
        <text x="102" y="108" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="10" fontStyle="italic" fill={isActive("laundry") ? "white" : "var(--foreground)"} fillOpacity="0.85">
          &ldquo;We became...&rdquo;
        </text>
        <text x="102" y="126" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill={isActive("laundry") ? "white" : "var(--muted-foreground)"} fillOpacity="0.8">
          the wound
        </text>
      </g>

      {/* Other Laundry List - top right */}
      <g>
        <rect
          x="185" y="30" width="145" height="120" rx="12"
          fill={isActive("other") ? "var(--accent)" : "var(--muted)"}
          fillOpacity={isActive("other") ? 1 : 0.5}
          stroke="var(--accent)"
          strokeWidth={isActive("other") ? 2 : 1}
        />
        <text x="257" y="62" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill={isActive("other") ? "white" : "var(--accent)"}>
          The Other
        </text>
        <text x="257" y="80" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill={isActive("other") ? "white" : "var(--accent)"}>
          Laundry List
        </text>
        <text x="257" y="98" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill={isActive("other") ? "white" : "var(--muted-foreground)"} fillOpacity="0.85">
          how we act it out
        </text>
        <text x="257" y="120" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="10" fontStyle="italic" fill={isActive("other") ? "white" : "var(--foreground)"} fillOpacity="0.85">
          &ldquo;We become...&rdquo;
        </text>
      </g>

      {/* Flip Side - bottom left */}
      <g>
        <rect
          x="30" y="165" width="145" height="120" rx="12"
          fill={isActive("flipSide") ? "var(--sage)" : "var(--muted)"}
          fillOpacity={isActive("flipSide") ? 1 : 0.5}
          stroke="var(--sage)"
          strokeWidth={isActive("flipSide") ? 2 : 1}
        />
        <text x="102" y="197" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill={isActive("flipSide") ? "var(--primary)" : "var(--primary)"}>
          Flip Side of
        </text>
        <text x="102" y="215" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill={isActive("flipSide") ? "var(--primary)" : "var(--primary)"}>
          The Laundry List
        </text>
        <text x="102" y="233" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill={isActive("flipSide") ? "var(--primary)" : "var(--muted-foreground)"} fillOpacity="0.85">
          the recovery
        </text>
        <text x="102" y="255" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="10" fontStyle="italic" fill={isActive("flipSide") ? "var(--primary)" : "var(--foreground)"} fillOpacity="0.85">
          &ldquo;We move out of...&rdquo;
        </text>
      </g>

      {/* Flip Side of Other - bottom right */}
      <g>
        <rect
          x="185" y="165" width="145" height="120" rx="12"
          fill={isActive("flipSideOther") ? "#8B7BA8" : "var(--muted)"}
          fillOpacity={isActive("flipSideOther") ? 1 : 0.5}
          stroke="#8B7BA8"
          strokeWidth={isActive("flipSideOther") ? 2 : 1}
        />
        <text x="257" y="197" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill={isActive("flipSideOther") ? "white" : "#6B5B8A"}>
          Flip Side of
        </text>
        <text x="257" y="215" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12" fontWeight="600" fill={isActive("flipSideOther") ? "white" : "#6B5B8A"}>
          The Other
        </text>
        <text x="257" y="233" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill={isActive("flipSideOther") ? "white" : "var(--muted-foreground)"} fillOpacity="0.85">
          recovery from acting out
        </text>
        <text x="257" y="255" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="10" fontStyle="italic" fill={isActive("flipSideOther") ? "white" : "var(--foreground)"} fillOpacity="0.85">
          &ldquo;We face and resolve...&rdquo;
        </text>
      </g>

      {/* Center dividing lines */}
      <line x1="180" y1="30" x2="180" y2="285" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6"/>
      <line x1="30" y1="157" x2="330" y2="157" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6"/>
    </svg>
  );
}
