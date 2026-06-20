"use client";

// Donut ring showing the 5 thematic families and how much you've engaged with each.
// Each trait is color-coded by theme; the ring sums journal entries + exercise logs per theme.

interface Props {
  className?: string;
  themes: Array<{ id: string; name: string; color: string; count: number }>;
}

export function ThemeRing({ className, themes }: Props) {
  const total = themes.reduce((s, t) => s + t.count, 0) || 1;
  const radius = 100;
  const innerRadius = 60;
  const circumference = 2 * Math.PI * radius;

  let cumulative = 0;

  return (
    <svg viewBox="0 0 280 280" className={className} role="img" aria-label="Theme families ring">
      <g transform="translate(140, 140)">
        {/* Background ring */}
        <circle r={radius} fill="none" stroke="var(--muted)" strokeWidth={40} />
        {/* Arcs */}
        {total > 1 &&
          themes.map((theme, i) => {
            const fraction = theme.count / total;
            const dashLength = fraction * circumference;
            const dashOffset = -cumulative;
            cumulative += dashLength;
            return (
              <circle
                key={theme.id}
                r={radius}
                fill="none"
                stroke={theme.color}
                strokeWidth={40}
                strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                strokeDashoffset={dashOffset}
                transform="rotate(-90)"
                opacity={i === 0 || fraction > 0 ? 0.9 : 1}
              />
            );
          })}

        {/* Center */}
        <circle r={innerRadius} fill="var(--card)" />
        {total <= 1 ? (
          <g>
            <text
              textAnchor="middle"
              y="-5"
              fontFamily="var(--font-inter)"
              fontSize="10"
              fill="var(--muted-foreground)"
              letterSpacing="1"
              fontWeight="600"
            >
              NO DATA YET
            </text>
            <text
              textAnchor="middle"
              y="12"
              fontFamily="var(--font-fraunces)"
              fontSize="10"
              fill="var(--muted-foreground)"
              fontStyle="italic"
            >
              start reflecting
            </text>
          </g>
        ) : (
          <g>
            <text
              textAnchor="middle"
              y="-8"
              fontFamily="var(--font-inter)"
              fontSize="9"
              fill="var(--muted-foreground)"
              letterSpacing="1.5"
              fontWeight="600"
            >
              TOTAL ENTRIES
            </text>
            <text
              textAnchor="middle"
              y="18"
              fontFamily="var(--font-fraunces)"
              fontSize="32"
              fontWeight="600"
              fill="var(--primary)"
            >
              {total}
            </text>
          </g>
        )}
      </g>
    </svg>
  );
}
