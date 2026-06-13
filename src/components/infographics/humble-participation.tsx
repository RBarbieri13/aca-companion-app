"use client";

// Trait 5 — Flip Side of The Other Laundry List main graphic.
// "When tempted or lured into a situation where control and manipulation seem to be the
// answer, we change the question. Instead of 'How can I dominate?' we might ask, 'How can I
// humbly participate?'"
// And: "we have been learning about and applying the concepts of critical survival inner
// parent, inner loving parent, Inner Child, and our Higher Power."

interface Props { className?: string; }

export function HumbleParticipation({ className }: Props) {
  return (
    <svg viewBox="0 0 720 460" className={className} role="img" aria-label="Changing the question from dominate to humbly participate, and the four-figure inner partnership behind it.">
      <defs>
        <marker id="hp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)"/>
        </marker>
      </defs>

      {/* Title */}
      <text x="360" y="22" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">
        CHANGE THE QUESTION
      </text>
      <text x="360" y="40" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontStyle="italic" fill="var(--muted-foreground)">
        a small move with enormous reach
      </text>

      {/* OLD question */}
      <g>
        <rect x="40" y="68" width="280" height="86" rx="14" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.5"/>
        <text x="180" y="92" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--accent)">
          THE OLD QUESTION
        </text>
        <text x="180" y="118" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="16" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
          “How can I dominate?”
        </text>
        <text x="180" y="138" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">
          take charge · manipulate · control
        </text>
        {/* strikethrough */}
        <line x1="64" y1="114" x2="296" y2="114" stroke="var(--accent)" strokeWidth="1" opacity="0.4"/>
      </g>

      {/* arrow */}
      <g>
        <line x1="330" y1="110" x2="376" y2="110" stroke="var(--muted-foreground)" strokeWidth="1.5" markerEnd="url(#hp-arrow)"/>
        <text x="354" y="100" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">we change it</text>
      </g>

      {/* NEW question */}
      <g>
        <rect x="386" y="68" width="294" height="86" rx="14" fill="var(--sage)" fillOpacity="0.20" stroke="var(--sage)" strokeWidth="1.75"/>
        <text x="533" y="92" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--sage)">
          THE NEW QUESTION
        </text>
        <text x="533" y="118" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="16" fontStyle="italic" fontWeight="700" fill="var(--foreground)">
          “How can I humbly participate?”
        </text>
        <text x="533" y="138" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">
          equal · curious · accountable
        </text>
      </g>

      {/* INNER PARTNERSHIP heading */}
      <text x="360" y="194" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.4" fontWeight="700" fill="var(--muted-foreground)">
        WHAT MAKES THE NEW QUESTION POSSIBLE
      </text>
      <text x="360" y="212" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
        The inner partnership
      </text>

      {/* Four figures in a square */}
      {[
        { x: 180, y: 286, color: "var(--primary)",     label: "Inner Loving",  sub: "Parent" },
        { x: 320, y: 286, color: "#8B7BA8",            label: "Critical Survival", sub: "Inner Parent" },
        { x: 460, y: 286, color: "var(--accent)",      label: "Inner Child",   sub: "" },
        { x: 600, y: 286, color: "var(--sage)",        label: "Higher Power",  sub: "" },
      ].map((f) => (
        <g key={f.label}>
          <circle cx={f.x} cy={f.y - 14} r="18" fill={f.color} fillOpacity="0.85"/>
          <rect x={f.x - 16} y={f.y + 4} width="32" height="36" rx="10" fill={f.color} fillOpacity="0.78"/>
          <text x={f.x} y={f.y + 60} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11" fontWeight="600" fill={f.color}>
            {f.label}
          </text>
          {f.sub && (
            <text x={f.x} y={f.y + 74} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11" fontWeight="600" fill={f.color}>
              {f.sub}
            </text>
          )}
        </g>
      ))}

      {/* connecting lines between figures */}
      <g stroke="var(--primary)" strokeWidth="1" opacity="0.35">
        <line x1="195" y1="286" x2="305" y2="286"/>
        <line x1="335" y1="286" x2="445" y2="286"/>
        <line x1="475" y1="286" x2="585" y2="286"/>
      </g>

      {/* bottom — the outcome */}
      <g>
        <rect x="100" y="382" width="520" height="64" rx="12" fill="var(--muted)" fillOpacity="0.4"/>
        <text x="360" y="404" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--muted-foreground)">
          AND IF SOMEONE WALKS AWAY
        </text>
        <text x="360" y="424" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.85">
          We no longer resist their leaving. We use the Steps and reparenting to comfort the Inner Child.
        </text>
        <text x="360" y="438" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">
          No longer fearful of being alone or isolated.
        </text>
      </g>
    </svg>
  );
}
