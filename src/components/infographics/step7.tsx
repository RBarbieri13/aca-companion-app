interface Props {
  className?: string;
}

// HumilityScale — a balance scale: self-loathing on one pan, grandiosity on the
// other, balanced at a centered "right-sized / true" fulcrum.
export function HumilityScale({ className }: Props) {
  return (
    <svg
      viewBox="0 0 560 420"
      className={className}
      role="img"
      aria-label="A balance scale showing humility as the true center between self-loathing and grandiosity"
    >
      <text x="280" y="26" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">
        HUMILITY = RIGHT-SIZED, NOT SELF-HATRED
      </text>

      {/* dashed level guide */}
      <line x1="80" y1="150" x2="480" y2="150" stroke="var(--muted-foreground)" strokeWidth="1" strokeDasharray="4 5" strokeOpacity="0.5" />

      {/* beam */}
      <line x1="120" y1="150" x2="440" y2="150" stroke="var(--primary)" strokeWidth="5" strokeLinecap="round" />
      <circle cx="280" cy="150" r="7" fill="var(--primary)" />

      {/* center post + fulcrum */}
      <line x1="280" y1="150" x2="280" y2="300" stroke="var(--primary)" strokeWidth="4" />
      <path d="M250 300 L310 300 L300 318 L260 318 Z" fill="var(--primary)" fillOpacity="0.2" stroke="var(--primary)" strokeWidth="2" strokeLinejoin="round" />

      {/* left pan: self-loathing */}
      <line x1="120" y1="150" x2="120" y2="208" stroke="var(--accent)" strokeWidth="1.5" />
      <path d="M84 208 A36 22 0 0 0 156 208 Z" fill="var(--accent)" fillOpacity="0.16" stroke="var(--accent)" strokeWidth="2" />
      <text x="120" y="244" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="13" fontWeight="600" fill="var(--accent)">self-loathing</text>
      <text x="120" y="262" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fill="var(--muted-foreground)">&ldquo;I&apos;m the worst&rdquo;</text>

      {/* right pan: grandiosity */}
      <line x1="440" y1="150" x2="440" y2="208" stroke="var(--accent)" strokeWidth="1.5" />
      <path d="M404 208 A36 22 0 0 0 476 208 Z" fill="var(--accent)" fillOpacity="0.16" stroke="var(--accent)" strokeWidth="2" />
      <text x="440" y="244" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="13" fontWeight="600" fill="var(--accent)">grandiosity</text>
      <text x="440" y="262" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fill="var(--muted-foreground)">&ldquo;I&apos;m above this&rdquo;</text>

      {/* center label */}
      <rect x="214" y="344" width="132" height="50" rx="14" fill="var(--sage)" fillOpacity="0.18" stroke="var(--sage)" strokeWidth="2" />
      <text x="280" y="368" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="17" fontWeight="600" fill="var(--primary)">right-sized</text>
      <text x="280" y="385" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="11" fill="var(--muted-foreground)">true &mdash; simply human</text>
    </svg>
  );
}

// ShortcomingsFlow — left-to-right flow with labeled arrows.
export function ShortcomingsFlow({ className }: Props) {
  const steps = [
    { x: 90, label: "become", sub: "willing", color: "#8B7BA8" },
    { x: 280, label: "humbly", sub: "ask", color: "var(--primary)" },
    { x: 470, label: "removed", sub: "gradually", color: "var(--sage)" },
  ];
  return (
    <svg
      viewBox="0 0 560 360"
      className={className}
      role="img"
      aria-label="A left-to-right flow: become willing, then humbly ask, then shortcomings are removed gradually"
    >
      <defs>
        <marker id="s7flow-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)" />
        </marker>
      </defs>

      <text x="280" y="30" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">
        THE SEVENTH STEP, AS A FLOW
      </text>

      {steps.map((s) => (
        <g key={s.label}>
          <circle cx={s.x} cy="160" r="58" fill={s.color} fillOpacity="0.14" stroke={s.color} strokeWidth="2" />
          <text x={s.x} y="155" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="18" fontWeight="600" fill={s.color}>{s.label}</text>
          <text x={s.x} y="178" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="18" fontWeight="600" fill={s.color}>{s.sub}</text>
        </g>
      ))}

      {/* arrows between nodes */}
      <line x1="156" y1="160" x2="216" y2="160" stroke="var(--muted-foreground)" strokeWidth="2" markerEnd="url(#s7flow-arrow)" />
      <line x1="346" y1="160" x2="406" y2="160" stroke="var(--muted-foreground)" strokeWidth="2" markerEnd="url(#s7flow-arrow)" />

      <text x="186" y="138" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fill="var(--muted-foreground)">then</text>
      <text x="376" y="138" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fill="var(--muted-foreground)">then</text>

      {/* the lived result */}
      <text x="280" y="300" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="12" fill="var(--muted-foreground)">
        One day you reach for honesty
      </text>
      <text x="280" y="318" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="12" fontWeight="600" fill="var(--sage)">
        before the old reflex.
      </text>
    </svg>
  );
}

// OpenHandsGlyph — two open upturned hands, asking; a plain original request.
export function OpenHandsGlyph({ className }: Props) {
  return (
    <svg
      viewBox="0 0 560 400"
      className={className}
      role="img"
      aria-label="Two open upturned hands offered in a quiet, sincere request"
    >
      <text x="280" y="28" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">
        ASKING, IN PLAIN WORDS
      </text>

      {/* soft glow above the hands */}
      <circle cx="280" cy="150" r="62" fill="var(--sage)" fillOpacity="0.1" />
      <circle cx="280" cy="150" r="62" fill="none" stroke="var(--sage)" strokeWidth="1" strokeDasharray="3 6" strokeOpacity="0.6" />

      {/* left hand: palm + fingers, upturned */}
      <path
        d="M210 250 Q200 215 214 200 Q224 192 232 204 L238 218 L240 178 Q241 168 250 168 Q258 168 259 178 L260 214 L266 168 Q267 158 276 158 Q284 158 285 168 L286 214"
        fill="var(--primary)"
        fillOpacity="0.12"
        stroke="var(--primary)"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M210 250 Q236 268 286 250 L286 214 Q248 226 210 214 Z" fill="var(--primary)" fillOpacity="0.16" stroke="var(--primary)" strokeWidth="2" strokeLinejoin="round" />

      {/* right hand: mirror */}
      <path
        d="M350 250 Q360 215 346 200 Q336 192 328 204 L322 218 L320 178 Q319 168 310 168 Q302 168 301 178 L300 214 L294 168 Q293 158 284 158 Q276 158 275 168 L274 214"
        fill="var(--primary)"
        fillOpacity="0.12"
        stroke="var(--primary)"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M350 250 Q324 268 274 250 L274 214 Q312 226 350 214 Z" fill="var(--primary)" fillOpacity="0.16" stroke="var(--primary)" strokeWidth="2" strokeLinejoin="round" />

      {/* the plain request (paraphrase, not the prayer) */}
      <text x="280" y="312" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="15" fontStyle="italic" fill="var(--primary)">
        I&apos;m willing now. Please take from me
      </text>
      <text x="280" y="334" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="15" fontStyle="italic" fill="var(--primary)">
        what keeps me from being useful,
      </text>
      <text x="280" y="356" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="15" fontStyle="italic" fill="var(--primary)">
        and leave what helps me serve.
      </text>
      <text x="280" y="382" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" letterSpacing="1" fill="var(--muted-foreground)">
        &mdash; your own honest version, meant sincerely
      </text>
    </svg>
  );
}
