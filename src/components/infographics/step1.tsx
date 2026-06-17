interface Props {
  className?: string;
}

// Step 1 — "We admitted we were powerless... that our lives had become unmanageable."
// House colors: primary (program), accent (problem/active addiction), sage (growth),
// #8B7BA8 (violet), #D4A84B (gold) as extra categoricals.

export function CycleOfAddiction({ className }: Props) {
  // Four stations on a closed loop: relief -> craving -> consequence -> back to relief.
  const stations = [
    { x: 280, y: 90, label: "Relief", sub: "one drink to take the edge off", color: "var(--sage)" },
    { x: 450, y: 215, label: "Craving", sub: "the mind argues for more", color: "var(--accent)" },
    { x: 280, y: 340, label: "Consequence", sub: "shame, fallout, regret", color: "#8B7BA8" },
    { x: 110, y: 215, label: "Return", sub: "drink to escape the shame", color: "var(--primary)" },
  ];
  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-label="The closed loop of addiction: relief leads to craving, consequence, and back to relief">
      <defs>
        <marker id="s1cycle-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)" />
        </marker>
      </defs>
      <text x="280" y="24" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">THE LOOP THAT RUNS ITSELF</text>

      {/* dashed guide ring */}
      <circle cx="280" cy="215" r="125" fill="none" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.7" />

      {/* curved arrows along the ring, clockwise */}
      <path d="M 372 130 A 125 125 0 0 1 372 300" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.8" markerEnd="url(#s1cycle-arrow)" opacity="0.8" />
      <path d="M 360 312 A 125 125 0 0 1 200 312" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.8" markerEnd="url(#s1cycle-arrow)" opacity="0.8" />
      <path d="M 188 300 A 125 125 0 0 1 188 130" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.8" markerEnd="url(#s1cycle-arrow)" opacity="0.8" />
      <path d="M 200 118 A 125 125 0 0 1 360 118" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.8" markerEnd="url(#s1cycle-arrow)" opacity="0.8" />

      {stations.map((s) => (
        <g key={s.label}>
          <circle cx={s.x} cy={s.y} r="42" fill={s.color} fillOpacity="0.16" stroke={s.color} strokeWidth="2" />
          <text x={s.x} y={s.y - 2} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="15" fontWeight="600" fill={s.color}>{s.label}</text>
          <text x={s.x} y={s.y + 14} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)">{s.sub}</text>
        </g>
      ))}

      {/* center label: powerlessness = the loop runs you */}
      <text x="280" y="208" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--foreground)">Powerlessness</text>
      <text x="280" y="226" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--muted-foreground)">the loop runs you,</text>
      <text x="280" y="240" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--muted-foreground)">not the other way around</text>
    </svg>
  );
}

export function PowerlessnessQuadrant({ className }: Props) {
  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-label="A 2 by 2 quadrant of control over the drink versus life manageability, marking the powerless and unmanageable corner">
      <defs>
        <marker id="s1quad-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)" />
        </marker>
      </defs>
      <text x="280" y="24" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">AN HONEST LOOK</text>

      {/* axes */}
      <line x1="90" y1="60" x2="90" y2="370" stroke="var(--muted-foreground)" strokeWidth="2" markerEnd="url(#s1quad-arrow)" />
      <line x1="90" y1="370" x2="500" y2="370" stroke="var(--muted-foreground)" strokeWidth="2" markerEnd="url(#s1quad-arrow)" />

      {/* axis labels */}
      <text x="78" y="56" textAnchor="end" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--muted-foreground)">manageable</text>
      <text x="78" y="358" textAnchor="end" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--muted-foreground)">unmanageable</text>
      <text x="80" y="392" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--muted-foreground)">drink kept</text>
      <text x="495" y="392" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--muted-foreground)">drink lost</text>
      <text x="44" y="215" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="0.5" fill="var(--muted-foreground)" transform="rotate(-90 44 215)">LIFE MANAGEABILITY</text>
      <text x="295" y="412" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="0.5" fill="var(--muted-foreground)">CONTROL OVER THE DRINK</text>

      {/* quadrant fills */}
      <rect x="92" y="62" width="201" height="153" rx="8" fill="var(--sage)" fillOpacity="0.10" />
      <rect x="296" y="62" width="201" height="153" rx="8" fill="#D4A84B" fillOpacity="0.10" />
      <rect x="92" y="217" width="201" height="151" rx="8" fill="#8B7BA8" fillOpacity="0.10" />
      <rect x="296" y="217" width="201" height="151" rx="8" fill="var(--accent)" fillOpacity="0.16" stroke="var(--accent)" strokeWidth="2" strokeDasharray="5 4" />

      {/* quadrant labels */}
      <text x="192" y="130" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12" fontWeight="600" fill="var(--sage)">Social drinker</text>
      <text x="192" y="148" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">takes it or leaves it</text>

      <text x="396" y="130" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12" fontWeight="600" fill="#D4A84B">White-knuckling</text>
      <text x="396" y="148" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">controlling it costs everything</text>

      <text x="192" y="288" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12" fontWeight="600" fill="#8B7BA8">Telling yourself</text>
      <text x="192" y="306" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">it is not the drink</text>

      <text x="396" y="282" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="700" fill="var(--accent)">Powerless &amp;</text>
      <text x="396" y="300" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="700" fill="var(--accent)">unmanageable</text>
      <text x="396" y="320" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">&quot;I meant to stop at one</text>
      <text x="396" y="333" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">and woke up at noon.&quot;</text>
      <circle cx="396" cy="350" r="4" fill="var(--accent)" />
      <text x="408" y="354" textAnchor="start" fontFamily="var(--font-inter)" fontSize="8.5" fontWeight="700" fill="var(--accent)">you are here</text>
    </svg>
  );
}

export function FirstDrinkCraving({ className }: Props) {
  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-label="The first drink triggers the phenomenon of craving, which argues for the next drink">
      <defs>
        <marker id="s1craving-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--accent)" />
        </marker>
      </defs>
      <text x="280" y="30" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">THE PHENOMENON OF CRAVING</text>

      {/* node 1: the first drink */}
      <rect x="40" y="160" width="150" height="100" rx="18" fill="var(--primary)" fillOpacity="0.14" stroke="var(--primary)" strokeWidth="2" />
      <text x="115" y="200" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="16" fontWeight="600" fill="var(--primary)">The first</text>
      <text x="115" y="222" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="16" fontWeight="600" fill="var(--primary)">drink</text>
      <text x="115" y="244" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">&quot;just one tonight&quot;</text>

      {/* trigger arrow */}
      <line x1="195" y1="210" x2="300" y2="210" stroke="var(--accent)" strokeWidth="2.5" markerEnd="url(#s1craving-arrow)" />
      <text x="247" y="198" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fontStyle="italic" fill="var(--accent)">triggers</text>
      <text x="247" y="228" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)">a bodily switch flips</text>

      {/* node 2: the phenomenon of craving */}
      <rect x="305" y="150" width="215" height="120" rx="18" fill="var(--accent)" fillOpacity="0.16" stroke="var(--accent)" strokeWidth="2" />
      <text x="412" y="186" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="15" fontWeight="600" fill="var(--accent)">The phenomenon</text>
      <text x="412" y="206" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="15" fontWeight="600" fill="var(--accent)">of craving</text>
      <text x="412" y="230" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">an itch that only the</text>
      <text x="412" y="243" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">next drink can scratch</text>

      {/* looping arrow: craving argues for the next drink, back toward more */}
      <path d="M 412 270 C 412 330, 250 345, 150 330 C 90 320, 100 282, 110 262" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeDasharray="6 4" markerEnd="url(#s1craving-arrow)" />
      <rect x="208" y="318" width="190" height="42" rx="12" fill="var(--background)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="303" y="335" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fontWeight="600" fill="var(--accent)">&quot;one more won&apos;t hurt&quot;</text>
      <text x="303" y="350" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">craving argues for the next</text>

      {/* key */}
      <text x="280" y="392" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--muted-foreground)">The fight was lost at the first drink, not the tenth.</text>
    </svg>
  );
}
