"use client";

// Topographic-style "recovery landscape" — each trait is a peak. The altitude
// represents engagement depth (answered questions + related exercises).
// Concentric contour rings communicate altitude visually.

interface Props {
  className?: string;
  /** engagement[i] = 0..100 for trait i+1 */
  engagement: number[];
}

export function RecoveryTopography({ className, engagement }: Props) {
  const width = 720;
  const height = 260;
  const pad = 20;
  const columnW = (width - 2 * pad) / 14;

  // Paths for the "profile" line of the landscape
  const points = engagement.map((e, i) => {
    const x = pad + columnW * i + columnW / 2;
    const maxH = height - pad - 40;
    const h = (e / 100) * maxH;
    const y = height - pad - h - 20;
    return { x, y, e, i };
  });

  // Build a smooth curve via quadratic bezier
  const linePath = points
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${height - pad - 20} L ${p.x} ${p.y}`;
      const prev = points[i - 1];
      const cx = (prev.x + p.x) / 2;
      return `Q ${cx} ${prev.y} ${p.x} ${p.y}`;
    })
    .join(" ");
  const fillPath = `${linePath} L ${points[points.length - 1].x} ${height - pad - 20} L ${points[0].x} ${height - pad - 20} Z`;

  const maxEngagement = Math.max(...engagement, 1);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} role="img" aria-label="Recovery topography">
      <defs>
        <linearGradient id="topo-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Contour lines (altitude references) */}
      {[0.25, 0.5, 0.75].map((frac, i) => {
        const y = height - pad - 20 - frac * (height - pad - 60);
        return (
          <line
            key={i}
            x1={pad}
            y1={y}
            x2={width - pad}
            y2={y}
            stroke="var(--border)"
            strokeWidth={0.75}
            strokeDasharray="3 4"
            opacity={0.6}
          />
        );
      })}

      {/* Filled landscape */}
      <path d={fillPath} fill="url(#topo-grad)" />
      <path d={linePath} fill="none" stroke="var(--primary)" strokeWidth={2} strokeLinejoin="round" />

      {/* Peak markers */}
      {points.map((p) => (
        <g key={p.i}>
          {p.e > 0 && (
            <circle
              cx={p.x}
              cy={p.y}
              r={3}
              fill="var(--accent)"
              stroke="var(--card)"
              strokeWidth={1.5}
            />
          )}
          {/* Trait number labels at the baseline */}
          <text
            x={p.x}
            y={height - pad - 4}
            textAnchor="middle"
            fontFamily="var(--font-inter)"
            fontSize="9"
            fontWeight={p.e === maxEngagement && p.e > 0 ? 700 : 500}
            fill={
              p.e === maxEngagement && p.e > 0 ? "var(--primary)" : "var(--muted-foreground)"
            }
          >
            {p.i + 1}
          </text>
          {/* Altitude percentage for engaged traits */}
          {p.e > 0 && (
            <text
              x={p.x}
              y={p.y - 8}
              textAnchor="middle"
              fontFamily="var(--font-inter)"
              fontSize="8"
              fontWeight="600"
              fill="var(--primary)"
            >
              {Math.round(p.e)}
            </text>
          )}
        </g>
      ))}

      {/* Sea level */}
      <line
        x1={pad}
        y1={height - pad - 20}
        x2={width - pad}
        y2={height - pad - 20}
        stroke="var(--muted-foreground)"
        strokeWidth={1}
        opacity={0.5}
      />

      {/* Axis labels */}
      <g>
        <text
          x={pad}
          y={16}
          fontFamily="var(--font-inter)"
          fontSize="9"
          fontWeight="600"
          letterSpacing="1"
          fill="var(--muted-foreground)"
        >
          HIGH ENGAGEMENT
        </text>
        <text
          x={pad}
          y={height - pad - 22}
          fontFamily="var(--font-inter)"
          fontSize="9"
          letterSpacing="1"
          fontWeight="600"
          fill="var(--muted-foreground)"
        >
          NOT STARTED
        </text>
      </g>
    </svg>
  );
}
