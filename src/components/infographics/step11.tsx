interface Props {
  className?: string;
}

// Step 11 — "Sought through prayer and meditation to improve our conscious contact...
// praying only for knowledge of His will for us and the power to carry that out."
// House colors: primary (program), accent (problem/warning), sage (growth/promise),
// #8B7BA8 (violet), #D4A84B (gold) as extra categoricals.

export function ConsciousContactCircles({ className }: Props) {
  // Concentric widening circles / signal-strength toward a center "Power".
  // Practice clears the line; the self sits at the outer edge.
  const cx = 200;
  const cy = 210;
  const rings = [
    { r: 150, label: "static", color: "var(--border)" },
    { r: 112, label: "noise thins", color: "#8B7BA8" },
    { r: 74, label: "signal steadies", color: "var(--sage)" },
    { r: 36, label: "", color: "var(--primary)" },
  ];
  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-label="Concentric circles widening from the self toward a center labeled Power, the line clearing with practice">
      <defs>
        <marker id="s11cc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--primary)" />
        </marker>
      </defs>
      <text x="280" y="28" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">IMPROVING THE CONTACT</text>

      {rings.map((ring) => (
        <circle key={ring.r} cx={cx} cy={cy} r={ring.r} fill="none" stroke={ring.color} strokeWidth="1.8" strokeDasharray={ring.r === 36 ? "0" : "4 5"} opacity="0.8" />
      ))}

      {/* center: Power */}
      <circle cx={cx} cy={cy} r="36" fill="var(--primary)" fillOpacity="0.18" stroke="var(--primary)" strokeWidth="2.5" />
      <text x={cx} y={cy + 5} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="16" fontWeight="700" fill="var(--primary)">Power</text>

      {/* self at the outer edge, dialing in */}
      <circle cx={cx} cy={cy - 150} r="9" fill="#D4A84B" />
      <text x={cx} y={cy - 168} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12" fontWeight="600" fill="#D4A84B">You</text>

      <line x1={cx} y1={cy - 138} x2={cx} y2={cy - 50} stroke="var(--primary)" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#s11cc-arrow)" />

      {/* ring captions on the right */}
      <text x="392" y="120" textAnchor="start" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--muted-foreground)">Day one is mostly static.</text>
      <text x="392" y="160" textAnchor="start" fontFamily="var(--font-inter)" fontSize="9.5" fill="#8B7BA8">Showing up thins the noise,</text>
      <text x="392" y="190" textAnchor="start" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--sage)">the signal steadies,</text>
      <text x="392" y="220" textAnchor="start" fontFamily="var(--font-inter)" fontSize="9.5" fontWeight="600" fill="var(--primary)">the line gets clearer.</text>
      <text x="392" y="300" textAnchor="start" fontFamily="var(--font-inter)" fontSize="9" fontStyle="italic" fill="var(--muted-foreground)">You don&apos;t move the tower.</text>
      <text x="392" y="316" textAnchor="start" fontFamily="var(--font-inter)" fontSize="9" fontStyle="italic" fill="var(--muted-foreground)">You just keep tuning in.</text>
    </svg>
  );
}

export function WillAndPower({ className }: Props) {
  // Two-part diagram: knowledge of a Higher Power's will + the power to carry it out.
  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-label="The two things Step 11 asks for: knowledge of a Higher Power's will, and the power to carry it out">
      <defs>
        <marker id="s11wp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)" />
        </marker>
      </defs>
      <text x="280" y="28" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">PRAY ONLY FOR TWO THINGS</text>

      {/* left: knowledge of the will */}
      <rect x="44" y="120" width="200" height="150" rx="18" fill="var(--primary)" fillOpacity="0.14" stroke="var(--primary)" strokeWidth="2" />
      <text x="144" y="156" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="15" fontWeight="600" fill="var(--primary)">Knowledge</text>
      <text x="144" y="176" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--muted-foreground)">of a Power&apos;s will</text>
      <text x="144" y="208" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">the next right thing,</text>
      <text x="144" y="222" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">not the whole map</text>

      {/* plus */}
      <text x="280" y="205" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="30" fontWeight="700" fill="var(--sage)">+</text>

      {/* right: the power to carry it out */}
      <rect x="316" y="120" width="200" height="150" rx="18" fill="var(--sage)" fillOpacity="0.18" stroke="var(--sage)" strokeWidth="2" />
      <text x="416" y="156" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="15" fontWeight="600" fill="var(--primary)">The power</text>
      <text x="416" y="176" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--muted-foreground)">to carry it out</text>
      <text x="416" y="208" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">willingness when</text>
      <text x="416" y="222" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">it gets hard</text>

      {/* what we do NOT pray for */}
      <rect x="120" y="318" width="320" height="62" rx="14" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="5 4" />
      <line x1="280" y1="276" x2="280" y2="312" stroke="var(--muted-foreground)" strokeWidth="1.8" strokeDasharray="4 4" markerEnd="url(#s11wp-arrow)" />
      <text x="280" y="340" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12" fontWeight="600" fill="var(--accent)">Not the outcome</text>
      <text x="280" y="358" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">not the raise, the call back, or the specific</text>
      <text x="280" y="371" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">way it has to go &mdash; just willingness and direction</text>
    </svg>
  );
}

export function MorningNightBookends({ className }: Props) {
  // Two bookends holding a day: morning intention / night review.
  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-label="Two bookends holding a day: a morning intention toward usefulness and a night review of honesty and gratitude">
      <text x="280" y="30" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">HOLD THE DAY AT BOTH ENDS</text>

      {/* left bookend */}
      <path d="M 60 110 h 70 v 230 h -36 v -16 h -34 Z" fill="#D4A84B" fillOpacity="0.18" stroke="#D4A84B" strokeWidth="2" />
      <circle cx="95" cy="150" r="16" fill="#D4A84B" fillOpacity="0.30" stroke="#D4A84B" strokeWidth="1.5" />
      <text x="95" y="200" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--primary)">Morning</text>
      <text x="95" y="232" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">set an</text>
      <text x="95" y="245" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">intention</text>
      <text x="95" y="276" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontStyle="italic" fill="#D4A84B">&quot;let me be</text>
      <text x="95" y="288" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontStyle="italic" fill="#D4A84B">useful today&quot;</text>

      {/* the day between */}
      {[150, 192, 234, 276, 318].map((x, i) => (
        <rect key={x} x={x} y={130 + (i % 2) * 8} width="22" height={200 - (i % 2) * 8} rx="4" fill="var(--primary)" fillOpacity={0.08 + i * 0.03} stroke="var(--primary)" strokeWidth="1.2" />
      ))}
      <text x="248" y="120" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12" fontWeight="600" fill="var(--primary)">the day, lived</text>
      <text x="248" y="358" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">work, people, choices, weather</text>

      {/* right bookend */}
      <path d="M 500 110 h -70 v 230 h 36 v -16 h 34 Z" fill="#8B7BA8" fillOpacity="0.18" stroke="#8B7BA8" strokeWidth="2" />
      <circle cx="465" cy="150" r="16" fill="#8B7BA8" fillOpacity="0.30" stroke="#8B7BA8" strokeWidth="1.5" />
      <text x="465" y="200" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--primary)">Night</text>
      <text x="465" y="232" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">honest</text>
      <text x="465" y="245" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">review</text>
      <text x="465" y="276" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontStyle="italic" fill="#8B7BA8">&quot;where was I off?</text>
      <text x="465" y="288" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontStyle="italic" fill="#8B7BA8">what am I grateful for?&quot;</text>

      <text x="280" y="398" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--muted-foreground)">A day set on purpose and reviewed in honesty stays upright.</text>
    </svg>
  );
}
