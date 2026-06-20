interface Props {
  className?: string;
}

// Step 10 — "Continued to take personal inventory and when we were wrong promptly admitted it."
// House colors: primary (program), accent (problem/warning), sage (growth/promise),
// #8B7BA8 (violet), #D4A84B (gold) as extra categoricals.

export function MaintenanceLoop({ className }: Props) {
  // A continuous daily loop: spot-check -> admit -> correct -> continue -> back to spot-check.
  const stations = [
    { x: 280, y: 92, label: "Spot-check", sub: "where did I drift today?", color: "var(--primary)" },
    { x: 452, y: 215, label: "Admit", sub: "name it, no spin", color: "#8B7BA8" },
    { x: 280, y: 338, label: "Correct", sub: "make it right, small", color: "var(--sage)" },
    { x: 108, y: 215, label: "Continue", sub: "let it go, carry on", color: "#D4A84B" },
  ];
  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-label="The Step 10 maintenance loop: spot-check, admit, correct, continue, and back again">
      <defs>
        <marker id="s10loop-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)" />
        </marker>
      </defs>
      <text x="280" y="24" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">THE DAILY LOOP</text>

      <circle cx="280" cy="215" r="125" fill="none" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.7" />

      <path d="M 372 130 A 125 125 0 0 1 372 300" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.8" markerEnd="url(#s10loop-arrow)" opacity="0.8" />
      <path d="M 360 312 A 125 125 0 0 1 200 312" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.8" markerEnd="url(#s10loop-arrow)" opacity="0.8" />
      <path d="M 188 300 A 125 125 0 0 1 188 130" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.8" markerEnd="url(#s10loop-arrow)" opacity="0.8" />
      <path d="M 200 118 A 125 125 0 0 1 360 118" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.8" markerEnd="url(#s10loop-arrow)" opacity="0.8" />

      {stations.map((s) => (
        <g key={s.label}>
          <circle cx={s.x} cy={s.y} r="44" fill={s.color} fillOpacity="0.16" stroke={s.color} strokeWidth="2" />
          <text x={s.x} y={s.y - 2} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="15" fontWeight="600" fill={s.color}>{s.label}</text>
          <text x={s.x} y={s.y + 14} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)">{s.sub}</text>
        </g>
      ))}

      <text x="280" y="208" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--foreground)">Repetition</text>
      <text x="280" y="226" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--muted-foreground)">the power isn&apos;t one big fix,</text>
      <text x="280" y="240" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--muted-foreground)">it&apos;s the lap, done daily</text>
    </svg>
  );
}

export function PromptlyCurve({ className }: Props) {
  // A rising cost-vs-delay curve: a 10-second fix today becomes a 4-month wall if it sits.
  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-label="A rising curve showing the cost of an unmade amend climbing the longer it is delayed">
      <defs>
        <marker id="s10curve-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)" />
        </marker>
        <linearGradient id="s10curve-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <text x="280" y="24" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">WHY &quot;PROMPTLY&quot;</text>

      <line x1="80" y1="60" x2="80" y2="360" stroke="var(--muted-foreground)" strokeWidth="2" markerEnd="url(#s10curve-arrow)" />
      <line x1="80" y1="360" x2="510" y2="360" stroke="var(--muted-foreground)" strokeWidth="2" markerEnd="url(#s10curve-arrow)" />
      <text x="44" y="210" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="0.5" fill="var(--muted-foreground)" transform="rotate(-90 44 210)">COST TO REPAIR</text>
      <text x="295" y="392" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="0.5" fill="var(--muted-foreground)">TIME YOU LET IT SIT</text>

      <path d="M 80 360 Q 240 350 360 250 T 500 80 L 500 360 Z" fill="url(#s10curve-fill)" />
      <path d="M 80 360 Q 240 350 360 250 T 500 80" fill="none" stroke="var(--accent)" strokeWidth="3" />

      {/* today: cheap */}
      <circle cx="110" cy="352" r="6" fill="var(--sage)" />
      <text x="120" y="338" textAnchor="start" fontFamily="var(--font-fraunces)" fontSize="12" fontWeight="600" fill="var(--sage)">Today</text>
      <text x="120" y="352" textAnchor="start" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">a 10-second &quot;I was wrong&quot;</text>

      {/* a week */}
      <circle cx="330" cy="278" r="5" fill="#D4A84B" />
      <text x="318" y="268" textAnchor="end" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">a week: a hard talk</text>

      {/* four months: a wall */}
      <circle cx="492" cy="96" r="6" fill="var(--accent)" />
      <text x="484" y="92" textAnchor="end" fontFamily="var(--font-fraunces)" fontSize="12" fontWeight="700" fill="var(--accent)">Four months</text>
      <text x="484" y="106" textAnchor="end" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">now it&apos;s a wall between you</text>

      <text x="280" y="412" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--muted-foreground)">Resentment compounds. Pay it the day it is owed.</text>
    </svg>
  );
}

export function EarlyWarningRadar({ className }: Props) {
  // A small spider chart: Resentful / Selfish / Dishonest / Afraid. The nightly check
  // catches small upsets while they are still small.
  const cx = 280;
  const cy = 220;
  const axes = [
    { label: "Resentful", angle: -90, val: 0.32 },
    { label: "Selfish", angle: 0, val: 0.48 },
    { label: "Dishonest", angle: 90, val: 0.22 },
    { label: "Afraid", angle: 180, val: 0.4 },
  ];
  const rMax = 120;
  const rad = (a: number) => (a * Math.PI) / 180;
  const pt = (angle: number, r: number) => ({
    x: cx + Math.cos(rad(angle)) * r,
    y: cy + Math.sin(rad(angle)) * r,
  });
  const poly = axes
    .map((a) => {
      const p = pt(a.angle, a.val * rMax);
      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-label="A radar chart of four nightly self-checks: resentful, selfish, dishonest, afraid, caught while small">
      <text x="280" y="30" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">THE NIGHTLY SPOT-CHECK</text>

      {[0.33, 0.66, 1].map((ring) => (
        <polygon
          key={ring}
          points={axes
            .map((a) => {
              const p = pt(a.angle, ring * rMax);
              return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
            })
            .join(" ")}
          fill="none"
          stroke="var(--border)"
          strokeWidth="1.2"
          strokeDasharray="3 4"
          opacity="0.8"
        />
      ))}

      {axes.map((a) => {
        const edge = pt(a.angle, rMax);
        return <line key={a.label} x1={cx} y1={cy} x2={edge.x} y2={edge.y} stroke="var(--border)" strokeWidth="1.2" />;
      })}

      <polygon points={poly} fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="2.5" />

      {axes.map((a) => {
        const p = pt(a.angle, a.val * rMax);
        const lab = pt(a.angle, rMax + 26);
        return (
          <g key={a.label}>
            <circle cx={p.x} cy={p.y} r="4.5" fill="var(--accent)" />
            <text x={lab.x} y={lab.y + 3} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12" fontWeight="600" fill="var(--primary)">{a.label}?</text>
          </g>
        );
      })}

      <text x="280" y="392" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--muted-foreground)">Small spikes, caught at night, never grow into the next bender.</text>
    </svg>
  );
}
