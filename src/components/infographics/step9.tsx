interface Props {
  className?: string;
}

// AmendsDecisionTree — for each person: choose direct / living / indirect, AND a
// guardrail branch "would it injure them or others?" leading to a safer form.
export function AmendsDecisionTree({ className }: Props) {
  return (
    <svg
      viewBox="0 0 560 440"
      className={className}
      role="img"
      aria-label="A decision tree for making amends: choose direct, living, or indirect, with a guardrail asking whether it would cause injury"
    >
      <defs>
        <marker id="s9tree-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)" />
        </marker>
      </defs>

      <text x="280" y="26" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">
        FOR EACH PERSON ON THE LIST
      </text>

      {/* root node */}
      <rect x="208" y="44" width="144" height="48" rx="14" fill="var(--primary)" fillOpacity="0.12" stroke="var(--primary)" strokeWidth="2" />
      <text x="280" y="65" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontWeight="600" fill="var(--primary)">a harm</text>
      <text x="280" y="82" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fill="var(--muted-foreground)">what form fits?</text>

      {/* three type branches */}
      <line x1="240" y1="92" x2="110" y2="138" stroke="var(--muted-foreground)" strokeWidth="1.5" markerEnd="url(#s9tree-arrow)" />
      <line x1="280" y1="92" x2="280" y2="138" stroke="var(--muted-foreground)" strokeWidth="1.5" markerEnd="url(#s9tree-arrow)" />
      <line x1="320" y1="92" x2="450" y2="138" stroke="var(--muted-foreground)" strokeWidth="1.5" markerEnd="url(#s9tree-arrow)" />

      {[
        { x: 92, t: "direct", ex: "&ldquo;I owe you an apology, in person.&rdquo;" },
        { x: 230, t: "living", ex: "changed conduct, kept up over time" },
        { x: 432, t: "indirect", ex: "give back when you can&apos;t face them" },
      ].map((b) => (
        <g key={b.t}>
          <rect x={b.x} y="142" width="100" height="44" rx="12" fill="#8B7BA8" fillOpacity="0.14" stroke="#8B7BA8" strokeWidth="2" />
          <text x={b.x + 50} y="169" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="15" fontWeight="600" fill="#8B7BA8">{b.t}</text>
        </g>
      ))}
      <text x="142" y="202" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">in person, owning it</text>
      <text x="280" y="202" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">changed conduct, kept up</text>
      <text x="482" y="202" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">when you can&apos;t reach them</text>

      {/* guardrail diamond */}
      <line x1="280" y1="186" x2="280" y2="232" stroke="var(--muted-foreground)" strokeWidth="1.5" markerEnd="url(#s9tree-arrow)" />
      <path d="M280 236 L356 296 L280 356 L204 296 Z" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" strokeLinejoin="round" />
      <text x="280" y="290" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="11.5" fontWeight="600" fill="var(--accent)">would it injure</text>
      <text x="280" y="306" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="11.5" fontWeight="600" fill="var(--accent)">them or others?</text>

      {/* no -> proceed */}
      <line x1="356" y1="296" x2="430" y2="296" stroke="var(--muted-foreground)" strokeWidth="1.5" markerEnd="url(#s9tree-arrow)" />
      <text x="392" y="288" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontWeight="700" fill="var(--sage)">NO</text>
      <rect x="434" y="276" width="100" height="40" rx="12" fill="var(--sage)" fillOpacity="0.18" stroke="var(--sage)" strokeWidth="2" />
      <text x="484" y="301" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontWeight="600" fill="var(--primary)">proceed</text>

      {/* yes -> safer form */}
      <line x1="204" y1="296" x2="130" y2="296" stroke="var(--muted-foreground)" strokeWidth="1.5" markerEnd="url(#s9tree-arrow)" />
      <text x="168" y="288" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontWeight="700" fill="var(--accent)">YES</text>
      <rect x="26" y="276" width="104" height="40" rx="12" fill="#D4A84B" fillOpacity="0.16" stroke="#D4A84B" strokeWidth="2" />
      <text x="78" y="295" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--primary)">a safer</text>
      <text x="78" y="310" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--primary)">form</text>

      <text x="280" y="400" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="11" fontStyle="italic" fill="var(--muted-foreground)">
        The clause is a guardrail against new harm &mdash;
      </text>
      <text x="280" y="418" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="11" fontStyle="italic" fontWeight="600" fill="var(--primary)">
        not a loophole to avoid the hard ones.
      </text>
    </svg>
  );
}

// CleanYourSide — a street with a center line: "my side" (clean it) vs
// "their side" (not mine to drag through their pain).
export function CleanYourSide({ className }: Props) {
  return (
    <svg
      viewBox="0 0 560 360"
      className={className}
      role="img"
      aria-label="A street with a center line: clean only my side, leaving their side as theirs"
    >
      <text x="280" y="28" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">
        CLEAN ONLY YOUR SIDE OF THE STREET
      </text>

      {/* my side (clean) */}
      <rect x="40" y="56" width="232" height="248" rx="14" fill="var(--sage)" fillOpacity="0.14" stroke="var(--sage)" strokeWidth="2" />
      {/* their side (leave it) */}
      <rect x="288" y="56" width="232" height="248" rx="14" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="2" strokeDasharray="6 6" />

      {/* center line */}
      <line x1="280" y1="62" x2="280" y2="298" stroke="var(--muted-foreground)" strokeWidth="3" strokeDasharray="14 12" strokeLinecap="round" />

      {/* my side content */}
      <text x="156" y="92" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="18" fontWeight="600" fill="var(--primary)">my side</text>
      <text x="156" y="116" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1" fill="var(--sage)">CLEAN IT</text>
      {["the money I owe", "the lies I told", "the broken trust"].map((t, i) => (
        <g key={t}>
          <circle cx="76" cy={156 + i * 44} r="6" fill="var(--sage)" stroke="white" strokeWidth="1.5" />
          <text x="92" y={160 + i * 44} fontFamily="var(--font-inter)" fontSize="12.5" fill="var(--primary)">{t}</text>
        </g>
      ))}

      {/* their side content */}
      <text x="404" y="92" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="18" fontWeight="600" fill="var(--accent)">their side</text>
      <text x="404" y="116" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1" fill="var(--accent)">NOT MINE TO TOUCH</text>
      {["what they did to me", "their part in it", "their pain"].map((t, i) => (
        <g key={t}>
          <circle cx="324" cy={156 + i * 44} r="6" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="2 3" />
          <text x="340" y={160 + i * 44} fontFamily="var(--font-inter)" fontSize="12.5" fill="var(--muted-foreground)">{t}</text>
        </g>
      ))}

      <text x="280" y="338" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="11" fontStyle="italic" fill="var(--muted-foreground)">
        Repair what you broke &mdash; without dragging anyone back through their pain.
      </text>
    </svg>
  );
}

// PromisesBridge — a bridge from "amends" across to "the Promises".
export function PromisesBridge({ className }: Props) {
  return (
    <svg
      viewBox="0 0 560 360"
      className={className}
      role="img"
      aria-label="A bridge leading from amends across to the Promises of freedom and peace"
    >
      <text x="280" y="28" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">
        AMENDS ARE THE BRIDGE
      </text>

      {/* dashed guide arc above */}
      <path d="M70 250 Q280 70 490 250" fill="none" stroke="var(--sage)" strokeWidth="1" strokeDasharray="3 7" strokeOpacity="0.6" />

      {/* the bridge arc */}
      <path d="M70 250 Q280 96 490 250" fill="none" stroke="var(--sage)" strokeWidth="6" strokeLinecap="round" />

      {/* suspension struts */}
      {[0.2, 0.35, 0.5, 0.65, 0.8].map((t) => {
        const x = 70 + (490 - 70) * t;
        const y = 250 + (96 - 250) * (4 * t * (1 - t));
        return <line key={t} x1={x} y1={y} x2={x} y2="270" stroke="var(--sage)" strokeWidth="1.5" strokeOpacity="0.55" />;
      })}

      {/* near bank: amends */}
      <rect x="20" y="258" width="120" height="58" rx="14" fill="var(--primary)" fillOpacity="0.12" stroke="var(--primary)" strokeWidth="2" />
      <text x="80" y="285" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="17" fontWeight="600" fill="var(--primary)">amends</text>
      <text x="80" y="304" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--muted-foreground)">the action</text>

      {/* far bank: the Promises */}
      <rect x="420" y="258" width="120" height="58" rx="14" fill="var(--sage)" fillOpacity="0.2" stroke="var(--sage)" strokeWidth="2" />
      <text x="480" y="282" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="15" fontWeight="600" fill="var(--primary)">the Promises</text>
      <text x="480" y="302" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--sage)">freedom &middot; peace</text>

      {/* keystone marker */}
      <circle cx="280" cy="118" r="9" fill="var(--sage)" stroke="white" strokeWidth="2" />
      <text x="280" y="100" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fill="var(--muted-foreground)">cleaned, span by span</text>

      <text x="280" y="346" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="11" fontStyle="italic" fill="var(--muted-foreground)">
        Not a reward &mdash; a natural result of cleaning your side.
      </text>
    </svg>
  );
}
