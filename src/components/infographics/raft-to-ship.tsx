"use client";

import { motion } from "framer-motion";

// Trait 7 — Flip Side of The Other Laundry List main graphic (UPGRADED).
// "We support and encourage others in their efforts to be assertive."
// The workbook's own image: what started out as a raft became a boat and is now a ship of
// love and goodwill — crewed by the outer team (group, fellow travelers) and the inner crew
// (loving parent, Inner Child, Higher Power).

interface Props { className?: string; }

export function RaftToShip({ className }: Props) {
  return (
    <svg viewBox="0 0 700 500" className={className} role="img" aria-label="The progression from solo raft to spiritual-team boat to a ship of love and goodwill, crewed by the outer team and the inner crew.">
      <defs>
        <linearGradient id="rts-sea" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.10"/>
          <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.10"/>
          <stop offset="100%" stopColor="var(--sage)" stopOpacity="0.18"/>
        </linearGradient>
        <filter id="rts-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.12"/>
        </filter>
        <marker id="rts-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)"/>
        </marker>
      </defs>

      {/* Title */}
      <text x="350" y="26" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10.5" letterSpacing="1.6" fontWeight="700" fill="var(--muted-foreground)">
        WHAT STARTED AS A RAFT
      </text>
      <text x="350" y="44" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontStyle="italic" fill="var(--muted-foreground)">
        …became a boat, and is now a ship of love and goodwill
      </text>

      {/* the sea band */}
      <rect x="30" y="70" width="640" height="240" rx="18" fill="url(#rts-sea)" stroke="var(--border)" strokeWidth="1"/>

      {/* animated waves */}
      <motion.g
        animate={{ x: [0, -18, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        stroke="var(--primary)" strokeWidth="1.25" fill="none" opacity="0.35"
      >
        <path d="M 40 250 Q 70 240 100 250 T 160 250 T 220 250 T 280 250 T 340 250 T 400 250 T 460 250 T 520 250 T 580 250 T 640 250 T 700 250"/>
        <path d="M 40 272 Q 70 262 100 272 T 160 272 T 220 272 T 280 272 T 340 272 T 400 272 T 460 272 T 520 272 T 580 272 T 640 272 T 700 272"/>
      </motion.g>

      {/* STAGE 1 — the raft */}
      <motion.g animate={{ y: [0, 4, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
        <g transform="translate(120, 236)" filter="url(#rts-shadow)">
          <rect x="-34" y="0" width="68" height="10" rx="3" fill="#C08A2D" fillOpacity="0.8"/>
          {[-26, -13, 0, 13, 26].map((x) => (
            <line key={x} x1={x} y1="0" x2={x} y2="10" stroke="var(--background)" strokeWidth="1.25" opacity="0.6"/>
          ))}
          {/* lone figure */}
          <circle cx="0" cy="-14" r="7" fill="var(--accent)"/>
          <rect x="-6" y="-8" width="12" height="10" rx="3" fill="var(--accent)" fillOpacity="0.85"/>
        </g>
      </motion.g>
      <text x="120" y="286" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--accent)">The raft</text>
      <text x="120" y="300" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">surviving alone</text>

      {/* arrow */}
      <line x1="180" y1="220" x2="230" y2="200" stroke="var(--muted-foreground)" strokeWidth="1.25" strokeDasharray="4 3" markerEnd="url(#rts-arrow)" opacity="0.6"/>

      {/* STAGE 2 — the boat (fellow traveler) */}
      <motion.g animate={{ y: [0, 5, 0] }} transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}>
        <g transform="translate(320, 210)" filter="url(#rts-shadow)">
          <path d="M -46 8 L 46 8 L 32 24 L -32 24 Z" fill="var(--primary)" fillOpacity="0.85"/>
          <line x1="0" y1="-34" x2="0" y2="8" stroke="var(--primary)" strokeWidth="2.5"/>
          <path d="M 0 -34 L 30 4 L 0 4 Z" fill="var(--accent)" fillOpacity="0.8"/>
          {/* two figures — me + fellow traveler */}
          <circle cx="-16" cy="-2" r="6" fill="var(--sage)"/>
          <circle cx="14" cy="-2" r="6" fill="var(--accent)"/>
        </g>
      </motion.g>
      <text x="320" y="286" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--primary)">The boat</text>
      <text x="320" y="300" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">a fellow traveler joins the journey</text>

      {/* arrow */}
      <line x1="392" y1="190" x2="450" y2="170" stroke="var(--muted-foreground)" strokeWidth="1.25" strokeDasharray="4 3" markerEnd="url(#rts-arrow)" opacity="0.6"/>

      {/* STAGE 3 — the ship */}
      <motion.g animate={{ y: [0, 6, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}>
        <g transform="translate(555, 180)" filter="url(#rts-shadow)">
          <path d="M -70 22 L 70 22 L 50 44 L -50 44 Z" fill="var(--primary)"/>
          {/* two masts */}
          <line x1="-24" y1="-52" x2="-24" y2="22" stroke="var(--primary)" strokeWidth="3"/>
          <line x1="26" y1="-38" x2="26" y2="22" stroke="var(--primary)" strokeWidth="2.5"/>
          <path d="M -24 -52 L 20 6 L -24 6 Z" fill="var(--sage)" fillOpacity="0.9"/>
          <path d="M -24 -40 L -58 10 L -24 10 Z" fill="var(--accent)" fillOpacity="0.8"/>
          <path d="M 26 -38 L 58 12 L 26 12 Z" fill="#D4A84B" fillOpacity="0.8"/>
          {/* flag */}
          <path d="M -24 -52 L -8 -46 L -24 -40 Z" fill="var(--accent)"/>
          {/* crew figures along the deck */}
          {[-44, -22, 0, 22, 44].map((x, i) => (
            <circle key={x} cx={x} cy="14" r="5" fill={["var(--sage)", "var(--accent)", "#D4A84B", "var(--sage)", "var(--accent)"][i]}/>
          ))}
        </g>
      </motion.g>
      <text x="555" y="286" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--sage)">The ship of love &amp; goodwill</text>
      <text x="555" y="300" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">room for all who venture into our meetings</text>

      {/* THE CREW — two panels */}
      <g>
        <rect x="40" y="330" width="305" height="112" rx="14" fill="var(--primary)" fillOpacity="0.06" stroke="var(--primary)" strokeWidth="1.25" filter="url(#rts-shadow)"/>
        <text x="192" y="354" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--primary)">THE OUTER TEAM</text>
        <g fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.85">
          <text x="192" y="376" textAnchor="middle">our ACA group · our fellow travelers</text>
          <text x="192" y="392" textAnchor="middle">open arms, hearts, and ears</text>
        </g>
        <text x="192" y="414" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">
          action coming from love, understanding, and patience
        </text>

        <rect x="355" y="330" width="305" height="112" rx="14" fill="var(--sage)" fillOpacity="0.12" stroke="var(--sage)" strokeWidth="1.25" filter="url(#rts-shadow)"/>
        <text x="507" y="354" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--sage)">THE INNER CREW</text>
        <g fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.85">
          <text x="507" y="376" textAnchor="middle">inner loving parent · Inner Child(ren)</text>
          <text x="507" y="392" textAnchor="middle">inner Higher Power</text>
        </g>
        <text x="507" y="414" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">
          quietly cheering us on to deeper trust and empowerment
        </text>
      </g>

      {/* bottom caption */}
      <text x="350" y="470" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.85">
        Together they help us find our True Self and learn to discern when it is time to be assertive —
      </text>
      <text x="350" y="486" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
        and to cheer just as loudly when someone else finds their voice.
      </text>
    </svg>
  );
}
