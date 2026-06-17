interface Props {
  className?: string;
}

// Step 12 — "Having had a spiritual awakening as the result of these steps, we tried to
// carry this message... and to practice these principles in all our affairs."
// House colors: primary (program), accent (problem/warning), sage (growth/promise),
// #8B7BA8 (violet), #D4A84B (gold) as extra categoricals.

export function SpiralOfService({ className }: Props) {
  // An outward spiral: "keep it by giving it away", with an arrow looping back to a newcomer.
  const cx = 250;
  const cy = 215;
  const turns = 3.2;
  const steps = 220;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = t * turns * 2 * Math.PI;
    const r = 14 + t * 150;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-label="An outward spiral of service that loops back to a newcomer at Step 1: keep it by giving it away">
      <defs>
        <marker id="s12spiral-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--sage)" />
        </marker>
      </defs>
      <text x="280" y="28" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">KEEP IT BY GIVING IT AWAY</text>

      <polyline points={pts.join(" ")} fill="none" stroke="var(--sage)" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />

      {/* center: you, recovered */}
      <circle cx={cx} cy={cy} r="18" fill="var(--primary)" fillOpacity="0.18" stroke="var(--primary)" strokeWidth="2" />
      <text x={cx} y={cy + 4} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11" fontWeight="600" fill="var(--primary)">You</text>

      {/* loop back to a Step-1 newcomer */}
      <path d="M 396 110 C 470 150, 470 290, 396 332" fill="none" stroke="var(--sage)" strokeWidth="2.2" strokeDasharray="6 4" markerEnd="url(#s12spiral-arrow)" />

      {/* newcomer node */}
      <circle cx="470" cy="330" r="30" fill="#D4A84B" fillOpacity="0.18" stroke="#D4A84B" strokeWidth="2" />
      <text x="470" y="326" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11" fontWeight="600" fill="#D4A84B">A newcomer</text>
      <text x="470" y="342" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)">at Step 1, scared</text>

      <text x="470" y="116" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fontStyle="italic" fill="var(--sage)">what you carry out</text>
      <text x="470" y="130" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fontStyle="italic" fill="var(--sage)">comes back in</text>

      <text x="280" y="402" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--muted-foreground)">Service is a spiral, not a finish line &mdash; it widens every time you reach back.</text>
    </svg>
  );
}

export function AwakeningSpectrum({ className }: Props) {
  // A horizontal spectrum from "gradual / educational" to "sudden" -- both real, both enough.
  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-label="A spectrum of spiritual awakening from gradual and educational to sudden, both real and both enough">
      <defs>
        <linearGradient id="s12spec-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--sage)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#D4A84B" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <text x="280" y="40" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">WHAT AN AWAKENING LOOKS LIKE</text>

      <rect x="70" y="170" width="420" height="44" rx="22" fill="url(#s12spec-grad)" />
      <rect x="70" y="170" width="420" height="44" rx="22" fill="none" stroke="var(--border)" strokeWidth="1.2" />

      {/* left pole: gradual */}
      <circle cx="70" cy="192" r="9" fill="var(--sage)" stroke="var(--background)" strokeWidth="2" />
      <text x="70" y="142" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontWeight="600" fill="var(--sage)">Gradual</text>
      <text x="70" y="158" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">educational variety</text>
      <text x="70" y="252" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">a slow change in</text>
      <text x="70" y="265" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">outlook over months</text>

      {/* middle marker */}
      <circle cx="280" cy="192" r="7" fill="#8B7BA8" stroke="var(--background)" strokeWidth="2" />
      <text x="280" y="252" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">most people land</text>
      <text x="280" y="265" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">somewhere here</text>

      {/* right pole: sudden */}
      <circle cx="490" cy="192" r="9" fill="#D4A84B" stroke="var(--background)" strokeWidth="2" />
      <text x="490" y="142" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontWeight="600" fill="#D4A84B">Sudden</text>
      <text x="490" y="158" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">the rare lightning kind</text>
      <text x="490" y="252" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">a quick, vivid</text>
      <text x="490" y="265" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">shift, all at once</text>

      <text x="280" y="330" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--primary)">Both are real. Both are enough.</text>
      <text x="280" y="352" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--muted-foreground)">You don&apos;t need a thunderclap &mdash; you need to be a little freer than you were.</text>
    </svg>
  );
}

export function PrinciplesRadial({ className }: Props) {
  // A central "the principles" radiating spokes into life-domains. "in all our affairs".
  const cx = 280;
  const cy = 215;
  const domains = [
    { label: "Work", angle: -90, color: "var(--primary)" },
    { label: "Family", angle: -30, color: "var(--sage)" },
    { label: "Money", angle: 30, color: "#D4A84B" },
    { label: "Conflict", angle: 90, color: "var(--accent)" },
    { label: "Friendship", angle: 150, color: "#8B7BA8" },
    { label: "Self", angle: 210, color: "var(--primary)" },
  ];
  const rad = (a: number) => (a * Math.PI) / 180;
  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-label="The principles at the center radiating spokes into life domains: work, family, money, conflict, friendship, self">
      <defs>
        <marker id="s12rad-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)" />
        </marker>
      </defs>
      <text x="280" y="28" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">IN ALL OUR AFFAIRS</text>

      {domains.map((d) => {
        const x1 = cx + Math.cos(rad(d.angle)) * 52;
        const y1 = cy + Math.sin(rad(d.angle)) * 52;
        const x2 = cx + Math.cos(rad(d.angle)) * 132;
        const y2 = cy + Math.sin(rad(d.angle)) * 132;
        const nx = cx + Math.cos(rad(d.angle)) * 162;
        const ny = cy + Math.sin(rad(d.angle)) * 162;
        return (
          <g key={d.label}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--muted-foreground)" strokeWidth="1.6" strokeDasharray="4 4" markerEnd="url(#s12rad-arrow)" opacity="0.8" />
            <circle cx={nx} cy={ny} r="30" fill={d.color} fillOpacity="0.16" stroke={d.color} strokeWidth="2" />
            <text x={nx} y={ny + 4} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11" fontWeight="600" fill={d.color}>{d.label}</text>
          </g>
        );
      })}

      {/* center hub */}
      <circle cx={cx} cy={cy} r="50" fill="var(--primary)" fillOpacity="0.16" stroke="var(--primary)" strokeWidth="2.5" />
      <text x={cx} y={cy - 4} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="700" fill="var(--primary)">The</text>
      <text x={cx} y={cy + 14} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="700" fill="var(--primary)">principles</text>

      <text x="280" y="402" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--muted-foreground)">Not just in the rooms &mdash; the same honesty everywhere you actually live.</text>
    </svg>
  );
}
