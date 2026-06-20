interface Props {
  className?: string;
}

// Step 4 infographics. Pure SVG, no client code, scaled via className only.
// House palette: var(--primary)=program, var(--accent)=problem/defect,
// var(--sage)=growth/healed, plus #8B7BA8 and #D4A84B as extra categoricals.

export function ResentmentAnatomy({ className }: Props) {
  const cols = [
    { x: 30, label: "WHO I RESENT", c: "var(--accent)", ex: "My boss" },
    { x: 165, label: "THE CAUSE", c: "#D4A84B", ex: "Criticized me in front of the team" },
    { x: 300, label: "WHAT IT THREATENS", c: "#8B7BA8", ex: "Self-esteem · security · pride" },
    { x: 435, label: "MY PART", c: "var(--sage)", ex: "I was defensive, I&apos;d been coasting" },
  ];
  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-label="The four-column resentment inventory: who I resent, the cause, what it threatens, and my part.">
      <defs>
        <marker id="s4res-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)" />
        </marker>
      </defs>
      <text x="280" y="24" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">THE FOUR COLUMNS</text>
      {cols.map((col, i) => {
        const w = 110;
        const highlight = i === 3;
        return (
          <g key={col.label}>
            <rect x={col.x} y={50} width={w} height={300} rx="14" fill={col.c} fillOpacity={highlight ? "0.18" : "0.1"} stroke={col.c} strokeWidth={highlight ? "2.5" : "1.5"} strokeDasharray={highlight ? undefined : "5 4"} />
            <text x={col.x + w / 2} y={74} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="0.8" fontWeight="700" fill={col.c}>{col.label.split(" ").slice(0, 2).join(" ")}</text>
            {col.label.split(" ").length > 2 && (
              <text x={col.x + w / 2} y={86} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="0.8" fontWeight="700" fill={col.c}>{col.label.split(" ").slice(2).join(" ")}</text>
            )}
            {i < 3 && (
              <line x1={col.x + w + 3} y1={200} x2={col.x + w + 22} y2={200} stroke="var(--muted-foreground)" strokeWidth="1.5" markerEnd="url(#s4res-arrow)" />
            )}
          </g>
        );
      })}
      {/* concrete example row */}
      <text x="85" y="210" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--accent)">My boss</text>
      <text x="220" y="200" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fill="var(--muted-foreground)">Criticized me</text>
      <text x="220" y="214" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fill="var(--muted-foreground)">in front of</text>
      <text x="220" y="228" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fill="var(--muted-foreground)">the team</text>
      <text x="355" y="194" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fill="#8B7BA8">Self-esteem</text>
      <text x="355" y="208" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fill="#8B7BA8">Security</text>
      <text x="355" y="222" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fill="#8B7BA8">Pride</text>
      <text x="490" y="194" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fill="var(--sage)">I was</text>
      <text x="490" y="208" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fill="var(--sage)">defensive;</text>
      <text x="490" y="222" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fill="var(--sage)">I&apos;d been</text>
      <text x="490" y="236" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fill="var(--sage)">coasting</text>
      <text x="490" y="332" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11" fontStyle="italic" fill="var(--sage)">the freeing</text>
      <text x="490" y="346" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11" fontStyle="italic" fill="var(--sage)">column</text>
      <text x="280" y="384" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="11" fill="var(--muted-foreground)">Seeing my part is the only part I can change.</text>
    </svg>
  );
}

export function FearThread({ className }: Props) {
  const tangles = [
    { x: 110, label: "resentment", c: "var(--accent)" },
    { x: 245, label: "control", c: "#8B7BA8" },
    { x: 380, label: "judging", c: "#D4A84B" },
  ];
  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-label="A single thread labeled fear runs under several resentments and defects; pull it and the tangle comes apart.">
      <defs>
        <marker id="s4thr-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--primary)" />
        </marker>
      </defs>
      <text x="280" y="28" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">PULL THE THREAD</text>
      {/* tangled knots */}
      {tangles.map((t) => (
        <g key={t.label}>
          <path d={`M${t.x - 28} 150 q14 -26 28 0 q14 26 28 0 q-10 30 -28 18 q-22 12 -28 -18 z`} fill={t.c} fillOpacity="0.16" stroke={t.c} strokeWidth="2" />
          <circle cx={t.x} cy="150" r="4" fill={t.c} />
          <text x={t.x} y="120" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill={t.c}>{t.label}</text>
        </g>
      ))}
      {/* the single fear thread under everything */}
      <path d="M70 220 Q140 200 210 220 T350 220 T490 220" fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" />
      {tangles.map((t) => (
        <line key={t.label} x1={t.x} y1="168" x2={t.x} y2="216" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="3 4" />
      ))}
      <text x="495" y="224" fontFamily="var(--font-inter)" fontSize="11" letterSpacing="1" fontWeight="700" fill="var(--primary)">FEAR</text>
      {/* the pull */}
      <line x1="70" y1="220" x2="70" y2="300" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" markerEnd="url(#s4thr-arrow)" />
      <text x="74" y="330" fontFamily="var(--font-inter)" fontSize="11" fill="var(--muted-foreground)">pull gently&hellip;</text>
      <text x="280" y="372" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontWeight="600" fill="var(--primary)">&hellip;and the tangle comes apart.</text>
      <text x="280" y="394" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fill="var(--muted-foreground)">Fear is the thread running under most resentments.</text>
    </svg>
  );
}

export function InventoryRooms({ className }: Props) {
  const rooms = [
    { x: 80, y: 150, label: "Resentments", c: "var(--accent)", note: "who & what" },
    { x: 290, y: 150, label: "Fears", c: "#8B7BA8", note: "what threatens me" },
    { x: 80, y: 250, label: "Conduct", c: "#D4A84B", note: "how I&apos;ve acted" },
    { x: 290, y: 250, label: "Harms", c: "var(--primary)", note: "who I hurt" },
  ];
  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-label="A house cross-section whose rooms are the inventory areas: resentments, fears, conduct, harms.">
      <text x="280" y="26" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">WALKING THE ROOMS</text>
      {/* roof */}
      <path d="M50 120 L280 50 L510 120 Z" fill="var(--sage)" fillOpacity="0.18" stroke="var(--sage)" strokeWidth="2" strokeLinejoin="round" />
      {/* house body */}
      <rect x="60" y="120" width="440" height="230" rx="6" fill="var(--primary)" fillOpacity="0.05" stroke="var(--primary)" strokeWidth="2" />
      {/* rooms */}
      {rooms.map((r) => (
        <g key={r.label}>
          <rect x={r.x} y={r.y} width="190" height="80" rx="8" fill={r.c} fillOpacity="0.14" stroke={r.c} strokeWidth="1.5" strokeDasharray="5 4" />
          <text x={r.x + 95} y={r.y + 38} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="16" fontWeight="600" fill={r.c}>{r.label}</text>
          <text x={r.x + 95} y={r.y + 58} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fill="var(--muted-foreground)">{r.note}</text>
        </g>
      ))}
      {/* door */}
      <rect x="262" y="305" width="36" height="45" rx="4" fill="var(--primary)" fillOpacity="0.2" stroke="var(--primary)" strokeWidth="1.5" />
      <text x="280" y="384" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontStyle="italic" fontWeight="600" fill="var(--primary)">Taking stock &mdash; go at the pace of safety.</text>
    </svg>
  );
}
