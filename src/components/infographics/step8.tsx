interface Props {
  className?: string;
}

// HarmsLedger — a ledger graphic: rows of "person | the harm in a sentence",
// including a row for "myself". The Step Eight list.
export function HarmsLedger({ className }: Props) {
  const rows = [
    { who: "Mom", harm: "Years of broken promises and missed calls.", color: "var(--accent)" },
    { who: "Jordan", harm: "Borrowed money I never paid back.", color: "var(--accent)" },
    { who: "My old boss", harm: "Lied to cover the days I couldn’t show.", color: "var(--accent)" },
    { who: "Myself", harm: "Traded years of my own life for the next drink.", color: "var(--sage)" },
  ];
  return (
    <svg
      viewBox="0 0 560 380"
      className={className}
      role="img"
      aria-label="A ledger listing people harmed and the harm in one sentence, including a row for myself"
    >
      <text x="280" y="26" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">
        THE LIST &mdash; WHO, AND THE HARM IN A SENTENCE
      </text>

      {/* ledger frame */}
      <rect x="40" y="48" width="480" height="304" rx="14" fill="var(--primary)" fillOpacity="0.04" stroke="var(--primary)" strokeWidth="2" />

      {/* header row */}
      <line x1="40" y1="84" x2="520" y2="84" stroke="var(--primary)" strokeWidth="1.5" strokeOpacity="0.5" />
      <line x1="178" y1="48" x2="178" y2="352" stroke="var(--primary)" strokeWidth="1" strokeOpacity="0.35" />
      <text x="62" y="72" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.2" fontWeight="700" fill="var(--muted-foreground)">PERSON</text>
      <text x="198" y="72" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.2" fontWeight="700" fill="var(--muted-foreground)">THE HARM</text>

      {rows.map((r, i) => {
        const y = 84 + i * 64;
        return (
          <g key={r.who}>
            {i > 0 && <line x1="40" y1={y} x2="520" y2={y} stroke="var(--primary)" strokeWidth="1" strokeDasharray="3 5" strokeOpacity="0.3" />}
            <circle cx="62" cy={y + 34} r="6" fill={r.color} fillOpacity="0.25" stroke={r.color} strokeWidth="2" />
            <text x="80" y={y + 38} fontFamily="var(--font-fraunces)" fontSize="16" fontWeight="600" fill="var(--primary)">{r.who}</text>
            <text x="198" y={y + 38} fontFamily="var(--font-inter)" fontSize="12.5" fill="var(--muted-foreground)">{r.harm}</text>
          </g>
        );
      })}

      <text x="280" y="372" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontStyle="italic" fill="var(--sage)">
        Keep the hard names on it. Willingness is the whole assignment here.
      </text>
    </svg>
  );
}

// WillingnessSpectrum — a horizontal spectrum from unwilling to willing.
export function WillingnessSpectrum({ className }: Props) {
  const markers = [
    { x: 80, label: "Dad", note: "“no way”", color: "var(--accent)" },
    { x: 230, label: "Jordan", note: "“maybe someday”", color: "#D4A84B" },
    { x: 380, label: "Mom", note: "“soon”", color: "#8B7BA8" },
    { x: 490, label: "Myself", note: "“ready”", color: "var(--sage)" },
  ];
  return (
    <svg
      viewBox="0 0 560 320"
      className={className}
      role="img"
      aria-label="A spectrum of willingness from unwilling to willing, with example people placed along it"
    >
      <defs>
        <linearGradient id="s8spectrum-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.5" />
          <stop offset="55%" stopColor="#D4A84B" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--sage)" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      <text x="280" y="30" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">
        WILLINGNESS CAN RIPEN OVER TIME
      </text>

      {/* the spectrum bar */}
      <rect x="50" y="150" width="460" height="20" rx="10" fill="url(#s8spectrum-grad)" stroke="var(--muted-foreground)" strokeWidth="1" strokeOpacity="0.3" />

      {/* end labels */}
      <text x="50" y="200" textAnchor="start" fontFamily="var(--font-fraunces)" fontSize="15" fontWeight="600" fill="var(--accent)">unwilling</text>
      <text x="510" y="200" textAnchor="end" fontFamily="var(--font-fraunces)" fontSize="15" fontWeight="600" fill="var(--sage)">willing</text>

      {/* markers */}
      {markers.map((m) => (
        <g key={m.label}>
          <line x1={m.x} y1="138" x2={m.x} y2="182" stroke={m.color} strokeWidth="2" />
          <circle cx={m.x} cy="160" r="7" fill={m.color} stroke="white" strokeWidth="1.5" />
          <text x={m.x} y="122" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="12" fontWeight="600" fill={m.color}>{m.label}</text>
          <text x={m.x} y="226" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fill="var(--muted-foreground)">{m.note}</text>
        </g>
      ))}

      <text x="280" y="284" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="11" fontStyle="italic" fill="var(--muted-foreground)">
        Where willingness is low, don&apos;t force it &mdash; let it ripen with time and prayer.
      </text>
    </svg>
  );
}

// ListBeforeAmends — Step 8 (list + willingness) comes BEFORE Step 9 (action).
export function ListBeforeAmends({ className }: Props) {
  return (
    <svg
      viewBox="0 0 560 300"
      className={className}
      role="img"
      aria-label="Step Eight, the list and willingness, comes before Step Nine, the amends and action"
    >
      <defs>
        <marker id="s8seq-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)" />
        </marker>
      </defs>

      <text x="280" y="30" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">
        PREPARE, THEN ACT
      </text>

      {/* Step 8 box */}
      <rect x="40" y="80" width="190" height="150" rx="16" fill="var(--primary)" fillOpacity="0.1" stroke="var(--primary)" strokeWidth="2" />
      <text x="135" y="116" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--primary)">STEP 8</text>
      <text x="135" y="146" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="19" fontWeight="600" fill="var(--primary)">the list</text>
      <text x="135" y="174" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="19" fontWeight="600" fill="var(--primary)">+ willingness</text>
      <text x="135" y="206" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="11" fill="var(--muted-foreground)">preparation</text>

      {/* arrow */}
      <line x1="240" y1="155" x2="320" y2="155" stroke="var(--muted-foreground)" strokeWidth="2.5" markerEnd="url(#s8seq-arrow)" />
      <text x="280" y="142" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1" fill="var(--muted-foreground)">then</text>

      {/* Step 9 box */}
      <rect x="330" y="80" width="190" height="150" rx="16" fill="var(--sage)" fillOpacity="0.16" stroke="var(--sage)" strokeWidth="2" />
      <text x="425" y="116" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--sage)">STEP 9</text>
      <text x="425" y="146" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="19" fontWeight="600" fill="var(--primary)">the amends</text>
      <text x="425" y="174" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="19" fontWeight="600" fill="var(--primary)">the action</text>
      <text x="425" y="206" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="11" fill="var(--muted-foreground)">repair</text>

      <text x="280" y="272" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="11" fontStyle="italic" fill="var(--muted-foreground)">
        First the honest list and real willingness &mdash; then, and only then, the amends.
      </text>
    </svg>
  );
}
