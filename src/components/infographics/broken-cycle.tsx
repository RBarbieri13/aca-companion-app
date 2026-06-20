"use client";

// Trait 4 — Flip Side of The Laundry List quadrant.
// "We do not have a compulsive need to recreate abandonment."
// The old loop (abandoned → choose the unavailable → recreate the wound) is interrupted by
// emotional inventory and the Steps, and a new path opens toward being true to ourselves.

interface Props { className?: string; }

export function BrokenCycle({ className }: Props) {
  const loopNodes = [
    { label: "Abandoned", angle: -90 },
    { label: "Seek the\nunavailable", angle: -18 },
    { label: "Recreate\nthe wound", angle: 54 },
    { label: "Feels\nfamiliar", angle: 126 },
    { label: "Stay\nasleep", angle: 198 },
  ];
  const cx = 180, cy = 210, r = 92;

  return (
    <svg viewBox="0 0 560 400" className={className} role="img" aria-label="Breaking the compulsive recycle of abandonment">
      <defs>
        <marker id="bc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)" opacity="0.5"/>
        </marker>
        <marker id="bc-arrow-new" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--sage)"/>
        </marker>
      </defs>

      {/* Title */}
      <text x="280" y="24" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">
        BREAKING THE RECYCLE
      </text>
      <text x="280" y="42" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontStyle="italic" fill="var(--muted-foreground)">
        &ldquo;We do not have a compulsive need to recreate abandonment.&rdquo;
      </text>

      {/* The old loop (faded) */}
      <text x="180" y="78" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" letterSpacing="1" fontWeight="700" fill="var(--accent)" opacity="0.7">
        THE OLD LOOP
      </text>
      {loopNodes.map((_, i) => {
        const from = loopNodes[i];
        const to = loopNodes[(i + 1) % loopNodes.length];
        // skip drawing the arc segment that will be "cut"
        if (i === 4) return null;
        const fa = (from.angle * Math.PI) / 180;
        const ta = (to.angle * Math.PI) / 180;
        const pad = 24;
        const x1 = cx + Math.cos(fa) * r;
        const y1 = cy + Math.sin(fa) * r;
        const x2 = cx + Math.cos(ta) * r;
        const y2 = cy + Math.sin(ta) * r;
        const dx = x2 - x1, dy = y2 - y1;
        const len = Math.hypot(dx, dy);
        const ox = (dx / len) * pad;
        const oy = (dy / len) * pad;
        return (
          <path
            key={i}
            d={`M ${x1 + ox} ${y1 + oy} A ${r} ${r} 0 0 1 ${x2 - ox} ${y2 - oy}`}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
            opacity="0.4"
            markerEnd="url(#bc-arrow)"
          />
        );
      })}

      {/* The CUT — interruption point */}
      <g>
        {/* scissors-style break between "Stay asleep" and "Abandoned" */}
        <line x1="120" y1="150" x2="150" y2="120" stroke="var(--sage)" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="126" y1="118" x2="148" y2="150" stroke="var(--sage)" strokeWidth="1" strokeDasharray="2 2" opacity="0.7"/>
        <text x="96" y="120" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" fill="var(--sage)">CUT</text>
      </g>

      {/* loop nodes */}
      {loopNodes.map((n, i) => {
        const rad = (n.angle * Math.PI) / 180;
        const x = cx + Math.cos(rad) * r;
        const y = cy + Math.sin(rad) * r;
        const lines = n.label.split("\n");
        return (
          <g key={`n-${i}`}>
            <circle cx={x} cy={y} r="20" fill="var(--muted)" stroke="var(--accent)" strokeWidth="1.25" opacity="0.85"/>
            <text x={x} y={y + 3 - (lines.length - 1) * 5} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="600" fill="var(--accent)">
              {lines.map((line, li) => (
                <tspan key={li} x={x} dy={li === 0 ? 0 : 9}>{line}</tspan>
              ))}
            </text>
          </g>
        );
      })}

      {/* The interrupting tool */}
      <g>
        <rect x="300" y="120" width="230" height="74" rx="12" fill="var(--sage)" fillOpacity="0.18" stroke="var(--sage)" strokeWidth="1.5"/>
        <text x="415" y="142" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1" fontWeight="700" fill="var(--sage)">
          WHAT CUTS THE LOOP
        </text>
        <text x="415" y="162" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.85">
          emotional inventory of our
        </text>
        <text x="415" y="176" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.85">
          patterns of bonding · the Steps
        </text>
        <text x="415" y="189" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
          see exactly how we recreate / recycle it
        </text>
      </g>
      <line x1="150" y1="135" x2="300" y2="150" stroke="var(--sage)" strokeWidth="1.25" strokeDasharray="3 2" opacity="0.7" markerEnd="url(#bc-arrow-new)"/>

      {/* The new path */}
      <g>
        <rect x="300" y="248" width="230" height="92" rx="12" fill="var(--primary)" fillOpacity="0.06" stroke="var(--primary)" strokeWidth="1.5"/>
        <text x="415" y="272" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1" fontWeight="700" fill="var(--primary)">
          THE NEW PATH
        </text>
        <text x="415" y="294" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
          True to ourselves
        </text>
        <text x="415" y="314" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--foreground)" opacity="0.8">
          choose safe, available people
        </text>
        <text x="415" y="328" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">
          no need to rebuild the wound
        </text>
      </g>
      <path d="M 200 270 Q 250 300 300 300" fill="none" stroke="var(--primary)" strokeWidth="1.5" markerEnd="url(#bc-arrow-new)" opacity="0.7"/>
      <text x="240" y="318" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" fill="var(--primary)" letterSpacing="0.5">
        step out
      </text>
    </svg>
  );
}
