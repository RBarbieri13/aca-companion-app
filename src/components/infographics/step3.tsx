interface Props {
  className?: string;
}

// Step 3 — "Made a decision to turn our will and our lives over to the care of God as we understood Him."
// House colors: primary (program), accent (problem), sage (growth/promise),
// #8B7BA8 (violet), #D4A84B (gold) as extra categoricals.

export function DecisionGate({ className }: Props) {
  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-label="Self-will approaches a gate, makes a decision, and passes into the care of a higher power">
      <defs>
        <marker id="s3gate-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)" />
        </marker>
      </defs>
      <text x="280" y="26" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">A DECISION IS A THRESHOLD</text>

      {/* approaching self-will */}
      <rect x="34" y="170" width="130" height="86" rx="16" fill="var(--accent)" fillOpacity="0.16" stroke="var(--accent)" strokeWidth="2" />
      <text x="99" y="205" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontWeight="600" fill="var(--accent)">Self-will</text>
      <text x="99" y="224" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">tired of running</text>
      <text x="99" y="237" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">the whole show</text>

      <line x1="168" y1="213" x2="222" y2="213" stroke="var(--muted-foreground)" strokeWidth="2" markerEnd="url(#s3gate-arrow)" />

      {/* the gate / threshold */}
      <line x1="280" y1="80" x2="280" y2="350" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 5" opacity="0.7" />
      <rect x="234" y="110" width="92" height="206" rx="46" fill="#D4A84B" fillOpacity="0.14" stroke="#D4A84B" strokeWidth="2.5" />
      <text x="280" y="200" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="#D4A84B">a</text>
      <text x="280" y="220" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="15" fontWeight="700" fill="#D4A84B">decision</text>
      <text x="280" y="240" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)">the gate</text>

      <line x1="338" y1="213" x2="392" y2="213" stroke="var(--muted-foreground)" strokeWidth="2" markerEnd="url(#s3gate-arrow)" />

      {/* into the care of a higher power */}
      <rect x="398" y="160" width="140" height="106" rx="16" fill="var(--sage)" fillOpacity="0.16" stroke="var(--sage)" strokeWidth="2" />
      <text x="468" y="195" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--sage)">Into the care</text>
      <text x="468" y="212" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--sage)">of a Power</text>
      <text x="468" y="232" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">no longer alone</text>
      <text x="468" y="245" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">at the wheel</text>

      <text x="280" y="362" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="0.5" fill="var(--muted-foreground)">CARE — NOT CONTROL</text>
      <text x="280" y="392" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)">&quot;I decided to stop arguing with the morning before it starts.&quot;</text>
    </svg>
  );
}

export function WillHandoff({ className }: Props) {
  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-label="My will and my life being handed over to caring hands">
      <defs>
        <marker id="s3handoff-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)" />
        </marker>
      </defs>
      <text x="280" y="26" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">TWO THINGS TO HAND OVER</text>

      {/* my will */}
      <rect x="50" y="70" width="180" height="92" rx="16" fill="#8B7BA8" fillOpacity="0.16" stroke="#8B7BA8" strokeWidth="2" />
      <text x="140" y="100" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="15" fontWeight="600" fill="#8B7BA8">My will</text>
      <text x="140" y="120" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">the inner driver:</text>
      <text x="140" y="133" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">my plans, my thinking</text>
      <text x="140" y="150" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontStyle="italic" fill="var(--muted-foreground)">&quot;how I think it should go&quot;</text>

      {/* my life */}
      <rect x="50" y="190" width="180" height="92" rx="16" fill="var(--primary)" fillOpacity="0.14" stroke="var(--primary)" strokeWidth="2" />
      <text x="140" y="220" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="15" fontWeight="600" fill="var(--primary)">My life</text>
      <text x="140" y="240" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">the outer facts:</text>
      <text x="140" y="253" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">job, bills, people</text>
      <text x="140" y="270" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontStyle="italic" fill="var(--muted-foreground)">&quot;the outcome I can&apos;t force&quot;</text>

      {/* handoff arrows */}
      <path d="M 232 116 C 290 116, 300 150, 358 168" fill="none" stroke="var(--muted-foreground)" strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#s3handoff-arrow)" />
      <path d="M 232 236 C 290 236, 300 202, 358 184" fill="none" stroke="var(--muted-foreground)" strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#s3handoff-arrow)" />
      <text x="295" y="140" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontStyle="italic" fill="var(--muted-foreground)">turned over</text>

      {/* caring hands: two cupped arcs holding a soft heart */}
      <g>
        <path d="M 360 200 Q 360 270 440 270 Q 520 270 520 200" fill="var(--sage)" fillOpacity="0.12" stroke="var(--sage)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 372 196 Q 388 236 440 240" fill="none" stroke="var(--sage)" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        <path d="M 508 196 Q 492 236 440 240" fill="none" stroke="var(--sage)" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        {/* the held thing: a soft heart */}
        <path d="M 440 150 C 432 138, 412 140, 412 158 C 412 174, 440 190, 440 190 C 440 190, 468 174, 468 158 C 468 140, 448 138, 440 150 Z" fill="#D4A84B" fillOpacity="0.3" stroke="#D4A84B" strokeWidth="2" />
        <text x="440" y="300" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--sage)">Caring hands</text>
        <text x="440" y="318" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">a Power that holds both</text>
      </g>

      <text x="280" y="390" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)">Handed over, not thrown away. You still show up and act.</text>
    </svg>
  );
}

export function OpenHandRelease({ className }: Props) {
  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-label="A clenched fist transforming into an open hand, releasing what it gripped">
      <defs>
        <marker id="s3release-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)" />
        </marker>
      </defs>
      <text x="280" y="26" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">LETTING GO IS AN ACTION</text>

      {/* clenched fist (left) — abstract: a tight rounded square gripping a dot */}
      <g>
        <rect x="64" y="160" width="120" height="110" rx="30" fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="2.5" />
        {/* knuckle lines */}
        <line x1="84" y1="186" x2="164" y2="186" stroke="var(--accent)" strokeWidth="2" opacity="0.6" />
        <line x1="84" y1="206" x2="164" y2="206" stroke="var(--accent)" strokeWidth="2" opacity="0.6" />
        <line x1="84" y1="226" x2="164" y2="226" stroke="var(--accent)" strokeWidth="2" opacity="0.6" />
        {/* the gripped thing, trapped inside */}
        <circle cx="124" cy="246" r="9" fill="#D4A84B" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="124" y="300" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontWeight="600" fill="var(--accent)">Clenched</text>
        <text x="124" y="318" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">gripping the outcome</text>
        <text x="124" y="331" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontStyle="italic" fill="var(--muted-foreground)">&quot;it has to go my way&quot;</text>
      </g>

      {/* transformation arrow */}
      <line x1="200" y1="215" x2="312" y2="215" stroke="var(--muted-foreground)" strokeWidth="2.5" markerEnd="url(#s3release-arrow)" />
      <text x="256" y="203" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fontStyle="italic" fill="var(--muted-foreground)">release</text>
      <text x="256" y="232" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)">unclench, palm up</text>

      {/* open hand (right) — a palm with five spread fingers */}
      <g>
        {/* palm */}
        <path d="M 372 250 Q 372 200 422 200 Q 472 200 472 250 Q 472 290 422 290 Q 372 290 372 250 Z" fill="var(--sage)" fillOpacity="0.14" stroke="var(--sage)" strokeWidth="2.5" />
        {/* fingers */}
        <line x1="384" y1="206" x2="372" y2="168" stroke="var(--sage)" strokeWidth="5" strokeLinecap="round" />
        <line x1="404" y1="200" x2="400" y2="158" stroke="var(--sage)" strokeWidth="5" strokeLinecap="round" />
        <line x1="424" y1="200" x2="424" y2="154" stroke="var(--sage)" strokeWidth="5" strokeLinecap="round" />
        <line x1="444" y1="200" x2="448" y2="158" stroke="var(--sage)" strokeWidth="5" strokeLinecap="round" />
        <line x1="462" y1="208" x2="476" y2="172" stroke="var(--sage)" strokeWidth="5" strokeLinecap="round" />
        {/* the released thing, rising / freed */}
        <circle cx="422" cy="140" r="9" fill="#D4A84B" fillOpacity="0.85" />
        <line x1="422" y1="172" x2="422" y2="158" stroke="#D4A84B" strokeWidth="1.5" strokeDasharray="2 3" />
        <text x="422" y="320" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontWeight="600" fill="var(--sage)">Open</text>
        <text x="422" y="338" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">offering it up</text>
        <text x="422" y="351" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontStyle="italic" fill="var(--muted-foreground)">&quot;thy will, not mine&quot;</text>
      </g>

      <text x="280" y="392" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)">The same hand that grips can also let go.</text>
    </svg>
  );
}
