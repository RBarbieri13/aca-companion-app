"use client";

// The dissociation loop described in Trait 1 of the workbook:
// isolate → fear people & authority → separation → deeper pain → more isolation

interface Props { className?: string; }

export function DissociationCycle({ className }: Props) {
  const nodes = [
    { label: "Isolate", angle: -90 },
    { label: "Fear people\n& authority", angle: -30 },
    { label: "Separation", angle: 30 },
    { label: "Deeper pain", angle: 90 },
    { label: "More fear", angle: 150 },
    { label: "Deeper isolation", angle: 210 },
  ];

  const cx = 200, cy = 200, r = 130;

  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="The dissociation cycle">
      <defs>
        <marker id="arrowhead-diss" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--primary)" opacity="0.6"/>
        </marker>
      </defs>

      {/* Faint outer ring */}
      <circle cx={cx} cy={cy} r={r + 30} fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="2 4" opacity="0.5"/>

      {/* Circular arrow path */}
      {nodes.map((_, i) => {
        const from = nodes[i];
        const to = nodes[(i + 1) % nodes.length];
        const fa = (from.angle * Math.PI) / 180;
        const ta = (to.angle * Math.PI) / 180;
        // Start slightly outside the node, end slightly inside the next
        const pad = 26;
        const arcR = r;
        const x1 = cx + Math.cos(fa) * arcR;
        const y1 = cy + Math.sin(fa) * arcR;
        const x2 = cx + Math.cos(ta) * arcR;
        const y2 = cy + Math.sin(ta) * arcR;
        // Offset along perpendicular toward next
        const dx = x2 - x1, dy = y2 - y1;
        const len = Math.hypot(dx, dy);
        const ox = (dx / len) * pad;
        const oy = (dy / len) * pad;
        return (
          <path
            key={i}
            d={`M ${x1 + ox} ${y1 + oy} A ${arcR} ${arcR} 0 0 1 ${x2 - ox} ${y2 - oy}`}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="1.5"
            opacity="0.4"
            markerEnd="url(#arrowhead-diss)"
          />
        );
      })}

      {/* Center text */}
      <g>
        <circle cx={cx} cy={cy} r="52" fill="var(--card)" stroke="var(--border)" strokeWidth="1"/>
        <text x={cx} y={cy - 8} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" letterSpacing="1.5" fontWeight="600">
          THE LOOP
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontStyle="italic" fill="var(--foreground)">
          Dissociation
        </text>
        <text x={cx} y={cy + 28} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)">
          as a survival game
        </text>
      </g>

      {/* Nodes */}
      {nodes.map((n, i) => {
        const rad = (n.angle * Math.PI) / 180;
        const x = cx + Math.cos(rad) * r;
        const y = cy + Math.sin(rad) * r;
        const lines = n.label.split("\n");
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="22" fill="var(--muted)" stroke="var(--primary)" strokeWidth="1.5"/>
            <text x={x} y={y + 4 - (lines.length - 1) * 5} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="600" fill="var(--primary)">
              {lines.map((line, li) => (
                <tspan key={li} x={x} dy={li === 0 ? 0 : 10}>{line}</tspan>
              ))}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
