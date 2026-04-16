"use client";

interface ProgressRingProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  color?: string;
}

export function ProgressRing({
  value,
  size = 120,
  strokeWidth = 10,
  label,
  sublabel,
  color = "var(--primary)",
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.max(0, Math.min(100, value)) / 100) * circumference;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--muted)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 600ms ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label && (
          <div className="font-serif text-2xl font-semibold text-[var(--foreground)]">
            {label}
          </div>
        )}
        {sublabel && (
          <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mt-0.5">
            {sublabel}
          </div>
        )}
      </div>
    </div>
  );
}
