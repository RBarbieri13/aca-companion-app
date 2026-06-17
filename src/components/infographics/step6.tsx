interface Props {
  className?: string;
}

// Step 6 infographics. Pure SVG, no client code, scaled via className only.
// House palette: var(--primary)=program, var(--accent)=defect/warning,
// var(--sage)=growth/readiness, plus #8B7BA8 and #D4A84B as extra categoricals.

export function ReadinessGauge({ className }: Props) {
  // Semicircular gauge centered at (280,300), radius 180, sweeping 180deg -> 0deg.
  const cx = 280;
  const cy = 300;
  const r = 180;
  const ticks = [
    { a: 180, label: "not yet", c: "var(--accent)" },
    { a: 135, label: "willing", c: "#D4A84B" },
    { a: 90, label: "asking", c: "#8B7BA8" },
    { a: 45, label: "letting go", c: "var(--sage)" },
    { a: 0, label: "entirely ready", c: "var(--primary)" },
  ];
  const polar = (deg: number, rad: number) => {
    const t = (deg * Math.PI) / 180;
    return { x: cx - rad * Math.cos(t), y: cy - rad * Math.sin(t) };
  };
  // needle pointing at ~62deg (toward "willing/asking")
  const needle = polar(62, r - 30);
  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-label="A semicircular gauge from not yet to entirely ready, with a needle; readiness is a reading, not a switch.">
      <text x="280" y="30" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">A READING, NOT A SWITCH</text>
      {/* dashed guide arc */}
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="var(--muted-foreground)" strokeWidth="1.5" strokeDasharray="6 6" />
      {/* solid colored arc */}
      <path d={`M ${cx - (r - 18)} ${cy} A ${r - 18} ${r - 18} 0 0 1 ${cx + (r - 18)} ${cy}`} fill="none" stroke="var(--primary)" strokeWidth="3" strokeOpacity="0.35" />
      {/* ticks + labels */}
      {ticks.map((t) => {
        const outer = polar(t.a, r);
        const inner = polar(t.a, r - 22);
        const lab = polar(t.a, r + 22);
        return (
          <g key={t.label}>
            <line x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke={t.c} strokeWidth="3" strokeLinecap="round" />
            <text x={lab.x} y={lab.y} textAnchor={t.a > 100 ? "end" : t.a < 80 ? "start" : "middle"} fontFamily="var(--font-inter)" fontSize="10" fontWeight="600" fill={t.c}>{t.label}</text>
          </g>
        );
      })}
      {/* needle */}
      <line x1={cx} y1={cy} x2={needle.x} y2={needle.y} stroke="var(--accent)" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="9" fill="var(--accent)" stroke="var(--primary-foreground)" strokeWidth="2" />
      <text x="280" y="356" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontWeight="600" fill="var(--primary)">Honest willingness is the reading that matters.</text>
      <text x="280" y="382" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="11" fill="var(--muted-foreground)">Example: &ldquo;Glad to drop the lying &mdash; still attached to control.&rdquo;</text>
    </svg>
  );
}

export function DefectAssetMirror({ className }: Props) {
  const pairs = [
    { y: 90, defect: "control", asset: "competence", c: "var(--accent)", a: "var(--sage)" },
    { y: 180, defect: "people-pleasing", asset: "empathy", c: "#8B7BA8", a: "var(--sage)" },
    { y: 270, defect: "pride", asset: "self-respect", c: "#D4A84B", a: "var(--sage)" },
  ];
  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-label="A mirror showing each defect reflected as the asset hiding inside it: control to competence, pleasing to empathy, pride to self-respect.">
      <defs>
        <marker id="s6mir-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)" />
        </marker>
      </defs>
      <text x="280" y="28" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">THE ASSET HIDING INSIDE</text>
      <text x="150" y="56" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1" fontWeight="700" fill="var(--accent)">DEFECT</text>
      <text x="410" y="56" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1" fontWeight="700" fill="var(--sage)">REFLECTED ASSET</text>
      {/* the mirror line */}
      <line x1="280" y1="70" x2="280" y2="330" stroke="var(--primary)" strokeWidth="2.5" />
      <line x1="284" y1="70" x2="284" y2="330" stroke="var(--primary)" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="2 4" />
      {pairs.map((p) => (
        <g key={p.defect}>
          <rect x="60" y={p.y} width="170" height="52" rx="12" fill={p.c} fillOpacity="0.16" stroke={p.c} strokeWidth="2" />
          <text x="145" y={p.y + 32} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="15" fontWeight="600" fill={p.c}>{p.defect}</text>
          <rect x="334" y={p.y} width="170" height="52" rx="12" fill={p.a} fillOpacity="0.16" stroke={p.a} strokeWidth="2" strokeDasharray="5 4" />
          <text x="419" y={p.y + 32} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="15" fontWeight="600" fill={p.a}>{p.asset}</text>
          <line x1="232" y1={p.y + 26} x2="332" y2={p.y + 26} stroke="var(--muted-foreground)" strokeWidth="1.5" strokeDasharray="3 4" markerEnd="url(#s6mir-arrow)" />
        </g>
      ))}
      <text x="280" y="372" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontWeight="600" fill="var(--primary)">Most defects are a strength overgrown.</text>
      <text x="280" y="396" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="11" fill="var(--muted-foreground)">Control was once protection; we right-size it, not erase it.</text>
    </svg>
  );
}

export function FearEachDefectProtects({ className }: Props) {
  const cols = [
    { x: 100, defect: "control", fear: "of chaos", c: "var(--accent)" },
    { x: 280, defect: "people-pleasing", fear: "of rejection", c: "#8B7BA8" },
    { x: 460, defect: "anger", fear: "of being hurt", c: "#D4A84B" },
  ];
  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-label="Each defect shown as a hand guarding a fear underneath it; name the fear and the hand loosens.">
      <defs>
        <marker id="s6fear-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--sage)" />
        </marker>
      </defs>
      <text x="280" y="28" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">EACH DEFECT GUARDS A FEAR</text>
      {cols.map((c) => (
        <g key={c.defect}>
          {/* the defect (the guarding shield/hand) */}
          <path d={`M${c.x} 70 q42 0 42 42 q0 40 -42 56 q-42 -16 -42 -56 q0 -42 42 -42 z`} fill={c.c} fillOpacity="0.16" stroke={c.c} strokeWidth="2.5" />
          <text x={c.x} y="120" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontWeight="600" fill={c.c}>{c.defect}</text>
          <text x={c.x} y="138" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)">guards&hellip;</text>
          {/* the fear underneath */}
          <circle cx={c.x} cy="230" r="34" fill="var(--primary)" fillOpacity="0.1" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="5 4" />
          <text x={c.x} y="227" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="0.5" fontWeight="700" fill="var(--primary)">FEAR</text>
          <text x={c.x} y="242" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fill="var(--primary)">{c.fear}</text>
          {/* loosening arrow */}
          <line x1={c.x} y1="268" x2={c.x} y2="300" stroke="var(--sage)" strokeWidth="2" markerEnd="url(#s6fear-arrow)" />
        </g>
      ))}
      <text x="280" y="328" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontWeight="600" fill="var(--sage)">Name the fear &mdash; the hand loosens.</text>
      <text x="280" y="356" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="11" fill="var(--muted-foreground)">Example: &ldquo;My controlling was guarding a fear of chaos.&rdquo;</text>
      <text x="280" y="382" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="11" fill="var(--muted-foreground)">Seen plainly, the grip on the defect eases almost on its own.</text>
    </svg>
  );
}
