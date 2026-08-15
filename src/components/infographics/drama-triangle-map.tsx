"use client";

import { motion } from "framer-motion";

// Trait 9 — Flip Side of the Other Laundry List main graphic.
// "We have compassion for anyone who is trapped in the 'drama triangle' and is
// desperately searching for a way out of insanity."
// The three corners — persecutor, rescuer (adrenaline-surged hero/savior), victim
// (melatonin-induced martyr) — trade places around a wound no seat has to feel.
// The emotionally sober True Self stands outside the rotation, open-handed.
// Self-contained; also embedded inside an exercise component — legible at ~640px.

interface Props { className?: string; }

export function DramaTriangleMap({ className }: Props) {
  // triangle geometry
  const cx = 268, cy = 232;
  const corners = [
    { key: "persecutor", x: cx - 128, y: cy - 92, label: "PERSECUTOR", note1: "blames · controls", note2: "makes someone smaller", color: "var(--accent)" },
    { key: "rescuer", x: cx + 128, y: cy - 92, label: "RESCUER", note1: "the adrenaline-surged", note2: "hero / savior", color: "#C08A2D" },
    { key: "victim", x: cx, y: cy + 126, label: "VICTIM", note1: "the melatonin-induced", note2: "martyr", color: "#8B7BA8" },
  ];

  return (
    <svg viewBox="0 0 720 480" className={className} role="img" aria-label="The drama triangle: persecutor, rescuer, and victim trade places around an avoided center wound, while the emotionally sober True Self stands outside with an open hand and compassion for anyone trapped and searching for the way out.">
      <defs>
        <filter id="dtm-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.12"/>
        </filter>
        <marker id="dtm-rot" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)"/>
        </marker>
        <radialGradient id="dtm-wound" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.06"/>
        </radialGradient>
      </defs>

      {/* Title */}
      <text x="360" y="26" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10.5" letterSpacing="1.6" fontWeight="700" fill="var(--muted-foreground)">
        THE DRAMA TRIANGLE
      </text>
      <text x="360" y="46" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
        Three seats trading places around a wound nobody sits with
      </text>

      {/* triangle edges */}
      <path
        d={`M ${corners[0].x} ${corners[0].y} L ${corners[1].x} ${corners[1].y} L ${corners[2].x} ${corners[2].y} Z`}
        fill="none" stroke="var(--border)" strokeWidth="1.5"
      />

      {/* rotation arrows — three-fold symmetric, so the 120° loop reads as endless */}
      <g transform={`translate(${cx}, ${cy + 10})`}>
        <motion.g
          animate={{ rotate: [0, 120] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
          style={{ originX: "0px", originY: "0px" }}
        >
          {[0, 120, 240].map((deg) => (
            <g key={deg} transform={`rotate(${deg})`}>
              <path
                d="M 148 -46 A 155 155 0 0 1 148 46"
                fill="none" stroke="var(--muted-foreground)" strokeWidth="1.5" opacity="0.55"
                markerEnd="url(#dtm-rot)"
              />
            </g>
          ))}
        </motion.g>
      </g>
      <text x={cx} y={cy - 148} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic">
        the seats rotate — the wound never has to be felt
      </text>

      {/* center — the avoided wound */}
      <g>
        <circle cx={cx} cy={cy + 10} r="52" fill="url(#dtm-wound)" stroke="var(--accent)" strokeWidth="1.25"/>
        <text x={cx} y={cy - 2} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" letterSpacing="1" fontWeight="700" fill="var(--accent)">
          AVOIDED
        </text>
        <text x={cx} y={cy + 15} textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12" fontStyle="italic" fontWeight="600" fill="var(--accent)">
          the wound
        </text>
        <text x={cx} y={cy + 30} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)">
          the loss underneath every seat
        </text>
      </g>

      {/* the three corners */}
      {corners.map((c) => (
        <g key={c.key}>
          <circle cx={c.x} cy={c.y} r="40" fill={c.color} fillOpacity="0.14" stroke={c.color} strokeWidth="2" filter="url(#dtm-shadow)"/>
          <text x={c.x} y={c.y - 4} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fontWeight="700" letterSpacing="1" fill={c.color}>
            {c.label}
          </text>
          <text x={c.x} y={c.y + 10} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic">
            {c.note1}
          </text>
          <text x={c.x} y={c.y + 21} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic">
            {c.note2}
          </text>
        </g>
      ))}
      {/* symbiosis note under rescuer–victim edge */}
      <text x={cx + 116} y={cy + 96} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic" transform={`rotate(-58, ${cx + 116}, ${cy + 96})`}>
        symbiotic interconnectedness
      </text>

      {/* OUTSIDE — the emotionally sober True Self */}
      <g>
        <rect x="500" y="120" width="200" height="250" rx="14" fill="var(--sage)" fillOpacity="0.16" stroke="var(--sage)" strokeWidth="1.5" filter="url(#dtm-shadow)"/>
        <text x="600" y="144" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--sage)">
          OUTSIDE THE TRIANGLE
        </text>

        {/* the figure — standing, open hand toward the triangle */}
        <motion.g
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="600" cy="180" r="14" fill="var(--sage)"/>
          <rect x="585" y="196" width="30" height="48" rx="10" fill="var(--sage)" fillOpacity="0.85"/>
          {/* open hand extended */}
          <path d="M 585 208 L 548 218" stroke="var(--sage)" strokeWidth="3" strokeLinecap="round"/>
          <g stroke="var(--sage)" strokeWidth="1.5" strokeLinecap="round">
            <path d="M 548 218 L 541 213"/>
            <path d="M 548 218 L 540 219"/>
            <path d="M 548 218 L 542 224"/>
          </g>
        </motion.g>

        <text x="600" y="266" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
          The emotionally sober
        </text>
        <text x="600" y="282" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
          True Self
        </text>
        <g fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--foreground)" opacity="0.82">
          <text x="600" y="304" textAnchor="middle">sees the rotation clearly —</text>
          <text x="600" y="317" textAnchor="middle">first in ourselves, then all around us</text>
        </g>
        <text x="600" y="340" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--sage)" fontStyle="italic" fontWeight="600">
          compassion for anyone trapped
        </text>
        <text x="600" y="353" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--sage)" fontStyle="italic" fontWeight="600">
          and searching for the way out
        </text>
      </g>

      {/* bottom caption */}
      <text x="360" y="430" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.85">
        The Steps forge new perceptions on anvils of patience, tolerance, and acceptance.
      </text>
      <text x="360" y="448" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
        From outside the triangle, compassion gushes forth — for every seat, including the ones we sat in.
      </text>
    </svg>
  );
}
