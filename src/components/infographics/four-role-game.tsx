"use client";

// Trait 5 synthesis — the four roles of the Game of Dissociation, named explicitly in the
// workbook: "All members of the family are, unfortunately, given one of four roles in the
// game: victim, victimizer, rescuer I, or rescuer II."
// Recovery is stepping out of the seats into humble participation.

interface Props { className?: string; }

export function FourRoleGame({ className }: Props) {
  const cx = 250, cy = 240, r = 130;

  const roles = [
    {
      key: "victim",
      label: "Victim",
      note: "“happens to me”",
      list: "The Laundry List",
      color: "var(--accent)",
      angle: -90,
    },
    {
      key: "victimizer",
      label: "Victimizer",
      note: "manipulate · control",
      list: "The Other Laundry List",
      color: "var(--primary)",
      angle: 0,
    },
    {
      key: "rescuer-2",
      label: "Rescuer II",
      note: "the over-helper",
      list: "the surge of “helping”",
      color: "#8B7BA8",
      angle: 90,
    },
    {
      key: "rescuer-1",
      label: "Rescuer I",
      note: "the family fixer",
      list: "we took this first",
      color: "var(--sage)",
      angle: 180,
    },
  ];

  return (
    <svg viewBox="0 0 760 500" className={className} role="img" aria-label="Trait 5 in one frame: the four roles of the Game of Dissociation and the exit into humble participation.">
      <defs>
        <marker id="frg-rot" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)"/>
        </marker>
        <marker id="frg-exit" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--sage)"/>
        </marker>
      </defs>

      {/* Title */}
      <text x="380" y="26" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">
        TRAIT 5 IN ONE FRAME
      </text>
      <text x="380" y="44" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
        The four roles in the Game of Dissociation
      </text>
      <text x="380" y="62" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
        “there is no admission fee”
      </text>

      {/* outer rotation ring */}
      <circle cx={cx} cy={cy} r={r + 36} fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="2 4" opacity="0.5"/>

      {/* rotation arrows between seats */}
      {roles.map((from, i) => {
        const to = roles[(i + 1) % roles.length];
        const fa = (from.angle * Math.PI) / 180;
        const ta = (to.angle * Math.PI) / 180;
        const pad = 38;
        const x1 = cx + Math.cos(fa) * r;
        const y1 = cy + Math.sin(fa) * r;
        const x2 = cx + Math.cos(ta) * r;
        const y2 = cy + Math.sin(ta) * r;
        const dx = x2 - x1, dy = y2 - y1;
        const len = Math.hypot(dx, dy);
        const ox = (dx / len) * pad;
        const oy = (dy / len) * pad;
        return (
          <path
            key={from.key}
            d={`M ${x1 + ox} ${y1 + oy} A ${r} ${r} 0 0 1 ${x2 - ox} ${y2 - oy}`}
            fill="none"
            stroke="var(--muted-foreground)"
            strokeWidth="1.5"
            opacity="0.5"
            markerEnd="url(#frg-rot)"
          />
        );
      })}

      {/* center — the avoided wound (powerlessness) */}
      <g>
        <circle cx={cx} cy={cy} r="56" fill="var(--card)" stroke="var(--accent)" strokeWidth="1.5"/>
        <text x={cx} y={cy - 12} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" letterSpacing="1.2" fontWeight="700" fill="var(--muted-foreground)">
          NEVER FELT
        </text>
        <text x={cx} y={cy + 6} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontStyle="italic" fontWeight="600" fill="var(--accent)">
          The powerlessness
        </text>
        <text x={cx} y={cy + 24} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)">
          of the dysfunctional family
        </text>
      </g>

      {/* role seats */}
      {roles.map((role) => {
        const rad = (role.angle * Math.PI) / 180;
        const x = cx + Math.cos(rad) * r;
        const y = cy + Math.sin(rad) * r;
        return (
          <g key={role.key}>
            <circle cx={x} cy={y} r="36" fill={role.color} fillOpacity="0.16" stroke={role.color} strokeWidth="2"/>
            <text x={x} y={y - 4} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill={role.color}>
              {role.label}
            </text>
            <text x={x} y={y + 10} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic">
              {role.note}
            </text>
            <text x={x} y={y + 54} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" fill={role.color}>
              {role.list}
            </text>
          </g>
        );
      })}

      {/* RIGHT — the exit panel */}
      <g>
        <line x1="426" y1="220" x2="492" y2="220" stroke="var(--sage)" strokeWidth="2" markerEnd="url(#frg-exit)"/>
        <text x="460" y="210" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" fill="var(--sage)" letterSpacing="0.5">
          THE EXIT
        </text>

        <rect x="500" y="146" width="240" height="180" rx="14" fill="var(--sage)" fillOpacity="0.16" stroke="var(--sage)" strokeWidth="1.5"/>
        <text x="620" y="170" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--sage)">
          STOP PLAYING
        </text>
        <text x="620" y="192" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
          Humble participation
        </text>
        <text x="620" y="216" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--foreground)" opacity="0.82">
          “How can I humbly
        </text>
        <text x="620" y="230" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--foreground)" opacity="0.82">
          participate?”
        </text>
        <line x1="528" y1="246" x2="712" y2="246" stroke="var(--sage)" strokeWidth="1" opacity="0.4"/>
        <text x="620" y="266" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="700" fill="var(--sage)" letterSpacing="0.5">
          THE INNER PARTNERSHIP
        </text>
        <g fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">
          <text x="620" y="284" textAnchor="middle">loving parent · critical survival parent</text>
          <text x="620" y="298" textAnchor="middle">Inner Child · Higher Power</text>
        </g>
        <text x="620" y="316" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--sage)" fontStyle="italic">
          wholeness &amp; completeness
        </text>
      </g>

      {/* bottom caption */}
      <text x="380" y="446" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.82">
        Every member of a dysfunctional family is given one of four roles. We rotate so we never feel the wound.
      </text>
      <text x="380" y="462" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
        The recovery move is not to win the Game. It is to leave it.
      </text>
    </svg>
  );
}
