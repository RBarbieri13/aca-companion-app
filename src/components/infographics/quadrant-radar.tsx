"use client";

// Radar chart showing balance of engagement across the 4 quadrants for a trait:
// Laundry / Other Laundry / Flip Side / Flip Side of Other.

interface Props {
  className?: string;
  /** values[0..3] = 0..100 for laundry, other, flipSide, flipSideOther */
  values: [number, number, number, number];
  label?: string;
}

export function QuadrantRadar({ className, values, label }: Props) {
  const size = 180;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = 62;

  // Four axes: top = laundry, right = other, bottom = flipSideOther, left = flipSide
  // We arrange so that the "wound" pair (laundry, other) is on top, recovery pair is at bottom.
  const angles = [-Math.PI / 2, 0, Math.PI / 2, Math.PI]; // N, E, S, W
  const axisLabels = ["Laundry", "Other", "Flip S. Other", "Flip Side"];
  const axisColors = ["var(--primary)", "var(--accent)", "#8B7BA8", "var(--sage)"];

  const point = (angle: number, value: number) => {
    const r = (value / 100) * maxR;
    return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r };
  };

  const polyPoints = values
    .map((v, i) => {
      const p = point(angles[i], v);
      return `${p.x},${p.y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${size} ${size + 30}`} className={className} role="img" aria-label="Quadrant balance">
      {/* Concentric rings */}
      {[0.25, 0.5, 0.75, 1].map((frac, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={frac * maxR}
          fill="none"
          stroke="var(--border)"
          strokeWidth={0.75}
          strokeDasharray={i === 3 ? "none" : "2 3"}
          opacity={0.6}
        />
      ))}
      {/* Axes */}
      {angles.map((a, i) => {
        const p = point(a, 100);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            stroke="var(--border)"
            strokeWidth={0.75}
          />
        );
      })}
      {/* Data polygon */}
      <polygon
        points={polyPoints}
        fill="var(--primary)"
        fillOpacity={0.22}
        stroke="var(--primary)"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      {/* Data dots */}
      {values.map((v, i) => {
        const p = point(angles[i], v);
        return (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={3}
            fill={axisColors[i]}
            stroke="var(--card)"
            strokeWidth={1}
          />
        );
      })}
      {/* Axis labels */}
      {angles.map((a, i) => {
        const p = point(a, 1);
        const padding = 14;
        const lx = cx + Math.cos(a) * (maxR + padding);
        const ly = cy + Math.sin(a) * (maxR + padding) + 3;
        return (
          <text
            key={i}
            x={lx}
            y={ly}
            textAnchor={Math.abs(Math.cos(a)) < 0.1 ? "middle" : Math.cos(a) > 0 ? "start" : "end"}
            fontFamily="var(--font-inter)"
            fontSize="8"
            fontWeight="600"
            fill={axisColors[i]}
          >
            {axisLabels[i]}
          </text>
        );
      })}
      {label && (
        <text
          x={cx}
          y={size + 18}
          textAnchor="middle"
          fontFamily="var(--font-fraunces)"
          fontSize="11"
          fontWeight="600"
          fill="var(--foreground)"
        >
          {label}
        </text>
      )}
    </svg>
  );
}
