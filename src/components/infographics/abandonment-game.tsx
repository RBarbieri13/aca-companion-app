"use client";

// Trait 4 synthesis — "Trait 4 in one frame."
// The Game of Dissociation: we first took the role of rescuer, and in time became either the
// abandoned (victim) of The Laundry List or the abandoner (victimizer) of The Other Laundry
// List — rotating endlessly so we never feel the wound. Recovery is the exit: comfort the
// child and stop playing.

interface Props { className?: string; }

export function AbandonmentGame({ className }: Props) {
  const cx = 250, cy = 230, r = 120;
  // three role seats around the wound
  const roles = [
    {
      key: "rescuer",
      label: "Rescuer",
      note: "the role we took first",
      list: "",
      color: "var(--sage)",
      angle: -90,
    },
    {
      key: "victim",
      label: "Victim",
      note: "the abandoned",
      list: "The Laundry List",
      color: "var(--accent)",
      angle: 30,
    },
    {
      key: "victimizer",
      label: "Victimizer",
      note: "the abandoner",
      list: "The Other Laundry List",
      color: "var(--primary)",
      angle: 150,
    },
  ];

  return (
    <svg viewBox="0 0 720 460" className={className} role="img" aria-label="Trait 4 in one frame: the rotating roles of the Game of Dissociation and the exit into recovery">
      <defs>
        <marker id="ag-rot" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)"/>
        </marker>
        <marker id="ag-exit" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--sage)"/>
        </marker>
      </defs>

      {/* Title */}
      <text x="360" y="26" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">
        TRAIT 4 IN ONE FRAME
      </text>
      <text x="360" y="44" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
        The Game of Dissociation — three seats, one wound
      </text>

      {/* rotation ring */}
      <circle cx={cx} cy={cy} r={r + 34} fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="2 4" opacity="0.5"/>

      {/* rotation arrows between seats */}
      {roles.map((from, i) => {
        const to = roles[(i + 1) % roles.length];
        const fa = (from.angle * Math.PI) / 180;
        const ta = (to.angle * Math.PI) / 180;
        const pad = 40;
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
            markerEnd="url(#ag-rot)"
          />
        );
      })}

      {/* center — the avoided wound */}
      <g>
        <circle cx={cx} cy={cy} r="52" fill="var(--card)" stroke="var(--accent)" strokeWidth="1.5"/>
        <text x={cx} y={cy - 8} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" letterSpacing="1.2" fontWeight="700" fill="var(--muted-foreground)">
          NEVER FELT
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontStyle="italic" fontWeight="600" fill="var(--accent)">
          The wound
        </text>
        <text x={cx} y={cy + 27} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)">
          traumatic childhood
        </text>
      </g>

      {/* role seats */}
      {roles.map((role) => {
        const rad = (role.angle * Math.PI) / 180;
        const x = cx + Math.cos(rad) * r;
        const y = cy + Math.sin(rad) * r;
        return (
          <g key={role.key}>
            <circle cx={x} cy={y} r="34" fill={role.color} fillOpacity="0.16" stroke={role.color} strokeWidth="2"/>
            <text x={x} y={y - 4} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill={role.color}>
              {role.label}
            </text>
            <text x={x} y={y + 10} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic">
              {role.note}
            </text>
            {role.list && (
              <text x={x} y={role.angle === 30 ? y + 52 : y + 52} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" fill={role.color}>
                {role.list}
              </text>
            )}
          </g>
        );
      })}

      {/* RIGHT — the exit panel */}
      <g>
        <line x1="406" y1="190" x2="470" y2="190" stroke="var(--sage)" strokeWidth="2" markerEnd="url(#ag-exit)"/>
        <text x="440" y="180" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" fill="var(--sage)" letterSpacing="0.5">
          THE EXIT
        </text>

        <rect x="476" y="120" width="226" height="140" rx="14" fill="var(--sage)" fillOpacity="0.16" stroke="var(--sage)" strokeWidth="1.5"/>
        <text x="589" y="146" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--sage)">
          STOP PLAYING
        </text>
        <text x="589" y="170" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
          Comfort the child
        </text>
        <text x="589" y="192" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--foreground)" opacity="0.82">
          feel the wound instead of
        </text>
        <text x="589" y="206" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--foreground)" opacity="0.82">
          rotating away from it
        </text>
        <line x1="506" y1="220" x2="672" y2="220" stroke="var(--sage)" strokeWidth="1" opacity="0.4"/>
        <text x="589" y="238" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">
          no compulsive need to
        </text>
        <text x="589" y="251" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">
          recreate abandonment
        </text>
      </g>

      {/* bottom caption */}
      <text x="360" y="404" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.82">
        The seats rotate endlessly so we never have to remember the original hurt.
      </text>
      <text x="360" y="420" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
        Double winners may swap an outside substance for an inside concoction of pain, fear and excitement.
      </text>
    </svg>
  );
}
