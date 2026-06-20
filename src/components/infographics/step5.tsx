interface Props {
  className?: string;
}

// Step 5 infographics. Pure SVG, no client code, scaled via className only.
// House palette: var(--primary)=program, var(--accent)=problem/burden,
// var(--sage)=growth/healed, plus #8B7BA8 and #D4A84B as extra categoricals.

export function WeightLifted({ className }: Props) {
  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-label="A person bowed under a heavy weight, then standing lighter, while a second human being simply receives and witnesses.">
      <defs>
        <marker id="s5wt-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)" />
        </marker>
      </defs>
      <text x="280" y="26" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">CARRIED IN SECRET &middot; THEN SPOKEN</text>

      {/* BEFORE: bowed figure under weight */}
      <text x="100" y="70" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1" fontWeight="700" fill="var(--accent)">BEFORE</text>
      <rect x="62" y="90" width="76" height="34" rx="6" fill="var(--accent)" fillOpacity="0.2" stroke="var(--accent)" strokeWidth="2" />
      <text x="100" y="112" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontWeight="700" fill="var(--accent)">the secret</text>
      <circle cx="100" cy="150" r="15" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
      <path d="M100 165 q-22 6 -24 40 M100 165 q22 6 24 40" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M86 128 q14 -10 28 0" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M76 210 q24 16 48 0" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />

      {/* arrow */}
      <line x1="160" y1="180" x2="208" y2="180" stroke="var(--muted-foreground)" strokeWidth="1.5" markerEnd="url(#s5wt-arrow)" />

      {/* AFTER: lighter figure standing tall */}
      <text x="270" y="70" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1" fontWeight="700" fill="var(--sage)">AFTER</text>
      <circle cx="270" cy="120" r="15" fill="none" stroke="var(--sage)" strokeWidth="2.5" />
      <line x1="270" y1="135" x2="270" y2="200" stroke="var(--sage)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M270 150 q-26 -8 -34 -28 M270 150 q26 -8 34 -28" fill="none" stroke="var(--sage)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M270 200 l-20 32 M270 200 l20 32" fill="none" stroke="var(--sage)" strokeWidth="2.5" strokeLinecap="round" />
      <text x="270" y="252" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fill="var(--sage)">lighter</text>

      {/* THE WITNESS */}
      <line x1="330" y1="160" x2="378" y2="160" stroke="var(--muted-foreground)" strokeWidth="1.5" strokeDasharray="3 4" markerEnd="url(#s5wt-arrow)" />
      <circle cx="450" cy="170" r="60" fill="var(--primary)" fillOpacity="0.07" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="6 5" />
      <circle cx="450" cy="135" r="16" fill="none" stroke="var(--primary)" strokeWidth="2.5" />
      <line x1="450" y1="151" x2="450" y2="205" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M450 168 q-30 4 -40 28 M450 168 q30 4 40 28" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M450 205 l-18 30 M450 205 l18 30" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" />
      <text x="450" y="258" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--primary)">another human being</text>
      <text x="450" y="276" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fill="var(--muted-foreground)">simply receives &middot; witnesses</text>

      <text x="280" y="330" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="15" fontWeight="600" fill="var(--primary)">The witness is the medicine.</text>
      <text x="280" y="360" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="11" fill="var(--muted-foreground)">Example: read aloud to a sponsor &mdash; &ldquo;I&apos;ve never told anyone this.&rdquo;</text>
      <text x="280" y="382" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="11" fill="var(--muted-foreground)">Seen at your worst and not abandoned, the exhale is real.</text>
    </svg>
  );
}

export function ConfessionTriangle({ className }: Props) {
  const verts = [
    { x: 280, y: 80, label: "a Higher Power", c: "var(--primary)" },
    { x: 120, y: 300, label: "myself", c: "#8B7BA8" },
    { x: 440, y: 300, label: "another human being", c: "var(--sage)" },
  ];
  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-label="A triangle whose vertices are a Higher Power, myself, and another human being; integrity is one whole person across all three.">
      <text x="280" y="34" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">THREE WITNESSES, NOTHING HIDDEN</text>
      {/* triangle edges */}
      <path d="M280 80 L120 300 L440 300 Z" fill="var(--primary)" fillOpacity="0.06" stroke="var(--muted-foreground)" strokeWidth="1.5" strokeDasharray="6 5" />
      {/* integrity center */}
      <circle cx="280" cy="227" r="34" fill="var(--primary)" fillOpacity="0.12" stroke="var(--primary)" strokeWidth="2" />
      <text x="280" y="224" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--primary)">integrity</text>
      <text x="280" y="240" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)">one whole person</text>
      {/* vertices */}
      {verts.map((v) => (
        <g key={v.label}>
          <circle cx={v.x} cy={v.y} r="22" fill={v.c} fillOpacity="0.18" stroke={v.c} strokeWidth="2.5" />
          <text x={v.x} y={v.y === 80 ? v.y - 32 : v.y + 44} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill={v.c}>{v.label}</text>
        </g>
      ))}
      <text x="280" y="384" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="11" fill="var(--muted-foreground)">Example: &ldquo;admitted to God, to ourselves, and to another the exact nature of our wrongs.&rdquo;</text>
    </svg>
  );
}

export function SecretsFunnel({ className }: Props) {
  const secrets = [
    { x: 180, label: "shame", c: "var(--accent)" },
    { x: 280, label: "&ldquo;unspeakable&rdquo;", c: "#8B7BA8" },
    { x: 380, label: "dread", c: "#D4A84B" },
  ];
  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-label="Oversized secrets enter a funnel and come out human-sized; secrets keep their power only while secret.">
      <defs>
        <marker id="s5fun-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--sage)" />
        </marker>
      </defs>
      <text x="280" y="26" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">SPOKEN ALOUD TO SOMEONE SAFE</text>
      {/* oversized secrets entering */}
      {secrets.map((s) => (
        <g key={s.label}>
          <circle cx={s.x} cy="80" r="30" fill={s.c} fillOpacity="0.18" stroke={s.c} strokeWidth="2" strokeDasharray="5 4" />
          <text x={s.x} y="85" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontWeight="600" fill={s.c}>{s.label}</text>
        </g>
      ))}
      {/* the funnel */}
      <path d="M150 150 L410 150 L312 250 L312 300 L248 300 L248 250 Z" fill="var(--primary)" fillOpacity="0.08" stroke="var(--primary)" strokeWidth="2" strokeLinejoin="round" />
      <text x="280" y="200" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontStyle="italic" fontWeight="600" fill="var(--primary)">spoken aloud</text>
      {/* falling-in arrows */}
      {secrets.map((s) => (
        <line key={s.label} x1={s.x} y1="112" x2={s.x} y2="146" stroke="var(--muted-foreground)" strokeWidth="1.5" strokeDasharray="3 4" />
      ))}
      {/* human-sized output */}
      <line x1="280" y1="302" x2="280" y2="332" stroke="var(--sage)" strokeWidth="2" markerEnd="url(#s5fun-arrow)" />
      <circle cx="280" cy="356" r="20" fill="var(--sage)" fillOpacity="0.2" stroke="var(--sage)" strokeWidth="2.5" />
      <text x="280" y="360" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontWeight="700" fill="var(--sage)">human-sized</text>
      <text x="500" y="356" textAnchor="end" fontFamily="var(--font-fraunces)" fontSize="12" fontStyle="italic" fontWeight="600" fill="var(--primary)">secrets keep their power</text>
      <text x="500" y="374" textAnchor="end" fontFamily="var(--font-fraunces)" fontSize="12" fontStyle="italic" fontWeight="600" fill="var(--primary)">only while secret</text>
    </svg>
  );
}
