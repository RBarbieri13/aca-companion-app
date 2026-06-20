"use client";

// 14x14 matrix showing co-engagement of trait pairs.
// Cell [row=i, col=j] = how often a tag appearing in trait i's journal also appears in trait j's.
// Diagonal is deliberately left empty (comparing a trait to itself is not insightful).

interface Props {
  className?: string;
  /** matrix[i][j] = co-occurrence count between traits i+1 and j+1 */
  matrix: number[][];
}

export function TraitMatrix({ className, matrix }: Props) {
  const cell = 24;
  const labelSize = 16;
  const offset = labelSize + 2;
  const max = matrix.flat().reduce((m, v) => Math.max(m, v), 0);

  return (
    <svg
      viewBox={`0 0 ${offset + cell * 14 + 8} ${offset + cell * 14 + 8}`}
      className={className}
      role="img"
      aria-label="Trait interaction matrix"
    >
      {/* Column labels */}
      {Array.from({ length: 14 }, (_, j) => (
        <text
          key={`c${j}`}
          x={offset + cell * j + cell / 2}
          y={labelSize - 4}
          textAnchor="middle"
          fontFamily="var(--font-inter)"
          fontSize="9"
          fontWeight="600"
          fill="var(--muted-foreground)"
        >
          {j + 1}
        </text>
      ))}
      {/* Row labels */}
      {Array.from({ length: 14 }, (_, i) => (
        <text
          key={`r${i}`}
          x={labelSize - 4}
          y={offset + cell * i + cell / 2 + 3}
          textAnchor="end"
          fontFamily="var(--font-inter)"
          fontSize="9"
          fontWeight="600"
          fill="var(--muted-foreground)"
        >
          {i + 1}
        </text>
      ))}
      {/* Cells */}
      {Array.from({ length: 14 }, (_, i) =>
        Array.from({ length: 14 }, (_, j) => {
          const value = matrix[i]?.[j] ?? 0;
          const isDiagonal = i === j;
          const intensity = max > 0 ? value / max : 0;
          return (
            <rect
              key={`${i}-${j}`}
              x={offset + cell * j + 1}
              y={offset + cell * i + 1}
              width={cell - 2}
              height={cell - 2}
              rx={3}
              fill={
                isDiagonal
                  ? "var(--muted)"
                  : value === 0
                  ? "var(--muted)"
                  : `rgba(45, 74, 62, ${0.2 + intensity * 0.75})`
              }
              stroke="var(--border)"
              strokeWidth={0.5}
            >
              <title>
                Trait {i + 1} × Trait {j + 1}: {value} shared tag{value === 1 ? "" : "s"}
              </title>
            </rect>
          );
        })
      )}
    </svg>
  );
}
