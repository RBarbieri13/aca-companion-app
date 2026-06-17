interface Props {
  className?: string;
}

// Step 2 — "Came to believe that a Power greater than ourselves could restore us to sanity."
// House colors: primary (program), accent (problem), sage (growth/promise),
// #8B7BA8 (violet), #D4A84B (gold) as extra categoricals.

export function SelfWillPendulum({ className }: Props) {
  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-label="A pendulum swinging between forcing control and collapse, with a still center labeled a Power greater than the swinging">
      <text x="280" y="24" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">THE SWING OF SELF-WILL</text>

      {/* pivot */}
      <circle cx="280" cy="70" r="6" fill="var(--foreground)" />
      <text x="280" y="56" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">running on my own steam</text>

      {/* dashed swing arc */}
      <path d="M 110 280 A 220 220 0 0 1 450 280" fill="none" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.7" />

      {/* two rods to the extremes */}
      <line x1="280" y1="70" x2="120" y2="262" stroke="var(--muted-foreground)" strokeWidth="1.5" strokeDasharray="2 3" opacity="0.6" />
      <line x1="280" y1="70" x2="440" y2="262" stroke="var(--muted-foreground)" strokeWidth="1.5" strokeDasharray="2 3" opacity="0.6" />

      {/* extreme bobs */}
      <circle cx="120" cy="278" r="48" fill="var(--accent)" fillOpacity="0.16" stroke="var(--accent)" strokeWidth="2" />
      <text x="120" y="274" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontWeight="600" fill="var(--accent)">Forcing</text>
      <text x="120" y="292" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">control, willpower</text>
      <text x="120" y="340" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fontStyle="italic" fill="var(--muted-foreground)">&quot;I&apos;ve got this&quot;</text>

      <circle cx="440" cy="278" r="48" fill="#8B7BA8" fillOpacity="0.18" stroke="#8B7BA8" strokeWidth="2" />
      <text x="440" y="274" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontWeight="600" fill="#8B7BA8">Collapse</text>
      <text x="440" y="292" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">despair, giving up</text>
      <text x="440" y="340" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fontStyle="italic" fill="var(--muted-foreground)">&quot;what&apos;s the point&quot;</text>

      {/* still center point */}
      <line x1="280" y1="70" x2="280" y2="300" stroke="var(--sage)" strokeWidth="2.5" />
      <circle cx="280" cy="312" r="40" fill="var(--sage)" fillOpacity="0.16" stroke="var(--sage)" strokeWidth="2" />
      <text x="280" y="308" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12" fontWeight="600" fill="var(--sage)">Still center</text>
      <text x="280" y="326" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)">not pushing, not quitting</text>

      <text x="280" y="386" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)">A Power greater than the swinging holds the center still.</text>
    </svg>
  );
}

export function ComingToBelieveGradient({ className }: Props) {
  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-label="A horizontal gradient bar from disbelief through willingness to faith, showing belief as a gradient not a switch">
      <defs>
        <linearGradient id="s2belief-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#D4A84B" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--sage)" stopOpacity="0.7" />
        </linearGradient>
        <marker id="s2belief-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)" />
        </marker>
      </defs>
      <text x="280" y="40" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">BELIEF IS A DIMMER, NOT A SWITCH</text>

      <text x="280" y="78" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="18" fontWeight="600" fill="var(--foreground)">Came to believe</text>

      {/* the gradient bar */}
      <rect x="60" y="150" width="440" height="56" rx="28" fill="url(#s2belief-grad)" stroke="var(--border)" strokeWidth="1" />

      {/* progress arrow under the bar */}
      <line x1="60" y1="232" x2="500" y2="232" stroke="var(--muted-foreground)" strokeWidth="1.8" markerEnd="url(#s2belief-arrow)" />
      <text x="280" y="252" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">no leap required, just the next inch</text>

      {/* three milestones */}
      <g>
        <circle cx="90" cy="178" r="9" fill="var(--accent)" />
        <text x="90" y="130" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--accent)">Disbelief</text>
        <text x="90" y="300" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">&quot;none of this is</text>
        <text x="90" y="313" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">for me&quot;</text>
      </g>
      <g>
        <circle cx="280" cy="178" r="9" fill="#D4A84B" />
        <text x="280" y="130" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="#D4A84B">Willingness</text>
        <text x="280" y="300" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">&quot;maybe I&apos;ll keep</text>
        <text x="280" y="313" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">an open mind&quot;</text>
      </g>
      <g>
        <circle cx="470" cy="178" r="9" fill="var(--sage)" />
        <text x="470" y="130" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--sage)">Faith</text>
        <text x="470" y="300" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">&quot;something is</text>
        <text x="470" y="313" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">carrying me&quot;</text>
      </g>

      <text x="280" y="362" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)">Most people stand somewhere in the middle. That counts.</text>
    </svg>
  );
}

export function HigherPowerRing({ className }: Props) {
  // Inclusive options arranged in a ring around a center.
  const options = [
    { label: "The group", sub: "the room itself", color: "var(--primary)" },
    { label: "Nature", sub: "the ocean, the sky", color: "var(--sage)" },
    { label: "Love", sub: "being cared for", color: "var(--accent)" },
    { label: "Honesty", sub: "the truth, simply", color: "#D4A84B" },
    { label: "God of your", sub: "own understanding", color: "#8B7BA8" },
    { label: "Wisdom of others", sub: "those further along", color: "var(--primary)" },
  ];
  const cx = 280;
  const cy = 220;
  const r = 138;
  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-label="A ring of inclusive higher power options around a center, showing many doors in">
      <text x="280" y="24" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">MANY DOORS IN</text>

      {/* dashed ring */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.7" />

      {/* center */}
      <circle cx={cx} cy={cy} r="48" fill="var(--primary)" fillOpacity="0.12" stroke="var(--primary)" strokeWidth="2" strokeDasharray="5 4" />
      <text x={cx} y={cy - 4} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--primary)">A Power</text>
      <text x={cx} y={cy + 13} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--primary)">greater</text>
      <text x={cx} y={cy + 30} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)">than me</text>

      {options.map((o, i) => {
        const angle = (-90 + i * 60) * (Math.PI / 180);
        const ox = cx + Math.cos(angle) * r;
        const oy = cy + Math.sin(angle) * r;
        return (
          <g key={o.label}>
            <line x1={cx + Math.cos(angle) * 48} y1={cy + Math.sin(angle) * 48} x2={cx + Math.cos(angle) * (r - 30)} y2={cy + Math.sin(angle) * (r - 30)} stroke={o.color} strokeWidth="1.5" opacity="0.5" />
            <circle cx={ox} cy={oy} r="34" fill={o.color} fillOpacity="0.16" stroke={o.color} strokeWidth="2" />
            <text x={ox} y={oy - 1} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="10.5" fontWeight="600" fill={o.color}>{o.label}</text>
            <text x={ox} y={oy + 13} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)">{o.sub}</text>
          </g>
        );
      })}

      <text x="280" y="404" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)">&quot;I started with the group, and that was enough to begin.&quot;</text>
    </svg>
  );
}
