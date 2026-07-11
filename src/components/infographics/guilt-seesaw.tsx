"use client";

import { motion } from "framer-motion";

// Trait 7 synthesis (UPGRADED) — "Trait 7 in one frame."
// The Laundry List swallows MY voice (guilt turned inward); The Other Laundry List silences
// YOUR voice (guilt turned outward). Same buried denouncement underneath — a seesaw that
// tilts forever until both voices are allowed at once: the assertive level.

interface Props { className?: string; }

export function GuiltSeesaw({ className }: Props) {
  return (
    <svg viewBox="0 0 720 480" className={className} role="img" aria-label="Trait 7 in one frame: guilt turned inward swallows my voice, guilt turned outward silences yours — one buried wound tips the seesaw until both voices are allowed.">
      <defs>
        <radialGradient id="gs-wound" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.08"/>
        </radialGradient>
        <filter id="gs-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.12"/>
        </filter>
        <marker id="gs-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--sage)"/>
        </marker>
      </defs>

      {/* Title */}
      <text x="360" y="26" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10.5" letterSpacing="1.6" fontWeight="700" fill="var(--muted-foreground)">
        TRAIT 7 IN ONE FRAME
      </text>
      <text x="360" y="46" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
        Two silencings, one wound
      </text>

      {/* the seesaw, tilting forever */}
      <g transform="translate(280, 210)">
        {/* fulcrum on the buried wound */}
        <circle cx="0" cy="52" r="44" fill="url(#gs-wound)" stroke="var(--accent)" strokeWidth="1.5"/>
        <text x="0" y="46" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" letterSpacing="1" fontWeight="700" fill="var(--accent)">THE WOUND</text>
        <text x="0" y="60" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic">denounced as a child</text>
        <path d="M -20 30 L 0 0 L 20 30 Z" fill="var(--muted-foreground)" fillOpacity="0.55"/>

        {/* the plank */}
        <motion.g
          style={{ originX: "0px", originY: "0px" }}
          animate={{ rotate: [-9, 9, -9] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="-190" y="-6" width="380" height="10" rx="5" fill="var(--primary)" fillOpacity="0.85" filter="url(#gs-shadow)"/>
          {/* LEFT seat — my voice swallowed */}
          <g transform="translate(-160, -6)">
            <circle cx="0" cy="-22" r="10" fill="var(--accent)" fillOpacity="0.9"/>
            <rect x="-9" y="-12" width="18" height="12" rx="4" fill="var(--accent)" fillOpacity="0.8"/>
            {/* guilt weight pressing down */}
            <rect x="-16" y="-52" width="32" height="16" rx="4" fill="var(--muted-foreground)" fillOpacity="0.6"/>
            <text x="0" y="-41" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fontWeight="700" fill="var(--card)">GUILT</text>
          </g>
          {/* RIGHT seat — your voice silenced */}
          <g transform="translate(160, -6)">
            <circle cx="0" cy="-22" r="10" fill="#C08A2D"/>
            <rect x="-9" y="-12" width="18" height="12" rx="4" fill="#C08A2D" fillOpacity="0.85"/>
            {/* guilt weight being hurled */}
            <rect x="10" y="-52" width="32" height="16" rx="4" fill="var(--muted-foreground)" fillOpacity="0.6"/>
            <text x="26" y="-41" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fontWeight="700" fill="var(--card)">GUILT</text>
            <path d="M 10 -44 L -2 -34" stroke="var(--muted-foreground)" strokeWidth="1.25" strokeDasharray="2 2" opacity="0.7"/>
          </g>
        </motion.g>
      </g>

      {/* pole labels */}
      <g>
        <text x="100" y="300" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontWeight="600" fill="var(--accent)">Guilt turned inward</text>
        <text x="100" y="317" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">I swallow my voice</text>
        <g fontFamily="var(--font-inter)" fontSize="8" fill="var(--foreground)" opacity="0.78">
          <text x="100" y="336" textAnchor="middle">· give in · submit · smooth</text>
          <text x="100" y="348" textAnchor="middle">· “it&apos;s fine, never mind”</text>
        </g>
        <text x="100" y="366" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">The Laundry List</text>

        <text x="460" y="300" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontWeight="600" fill="#C08A2D">Guilt turned outward</text>
        <text x="460" y="317" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">I silence your voice</text>
        <g fontFamily="var(--font-inter)" fontSize="8" fill="var(--foreground)" opacity="0.78">
          <text x="460" y="336" textAnchor="middle">· slights · attacks · shame</text>
          <text x="460" y="348" textAnchor="middle">· “who do you think you are?”</text>
        </g>
        <text x="460" y="366" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">The Other Laundry List</text>
      </g>

      {/* THE EXIT — level ground, both voices */}
      <g>
        <line x1="560" y1="250" x2="600" y2="250" stroke="var(--sage)" strokeWidth="2" markerEnd="url(#gs-arrow)"/>
        <text x="580" y="240" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" fill="var(--sage)">THE EXIT</text>

        <rect x="606" y="140" width="102" height="220" rx="14" fill="var(--sage)" fillOpacity="0.16" stroke="var(--sage)" strokeWidth="1.5" filter="url(#gs-shadow)"/>
        <text x="657" y="164" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" letterSpacing="1" fontWeight="700" fill="var(--sage)">ASSERTIVE</text>
        {/* two level figures, both with speech lines */}
        <circle cx="636" cy="206" r="8" fill="var(--sage)"/>
        <rect x="629" y="214" width="14" height="18" rx="5" fill="var(--sage)" fillOpacity="0.85"/>
        <path d="M 646 202 H 658" stroke="var(--primary)" strokeWidth="1.75" strokeLinecap="round"/>
        <circle cx="678" cy="206" r="8" fill="var(--primary)" fillOpacity="0.85"/>
        <rect x="671" y="214" width="14" height="18" rx="5" fill="var(--primary)" fillOpacity="0.8"/>
        <path d="M 656 214 H 668" stroke="var(--sage)" strokeWidth="1.75" strokeLinecap="round"/>
        {/* level line */}
        <line x1="620" y1="242" x2="694" y2="242" stroke="var(--sage)" strokeWidth="2" strokeLinecap="round"/>
        <g fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--foreground)" opacity="0.85">
          <text x="657" y="264" textAnchor="middle">both voices</text>
          <text x="657" y="276" textAnchor="middle">allowed at once</text>
        </g>
        <g fontFamily="var(--font-inter)" fontSize="7" fill="var(--muted-foreground)">
          <text x="657" y="300" textAnchor="middle" fontStyle="italic">I stand up without guilt.</text>
          <text x="657" y="312" textAnchor="middle" fontStyle="italic">I cheer when you do too.</text>
        </g>
        <text x="657" y="340" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7" fill="var(--sage)" fontWeight="700">both Flip Sides</text>
      </g>

      {/* bottom caption */}
      <text x="360" y="420" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.85">
        The seesaw only balances when neither voice has to lose. A level plank is not a truce — it&apos;s recovery.
      </text>
      <text x="360" y="438" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
        The overriding goal of both poles was the same: keep the True Self — mine or yours — from being expressed.
      </text>
    </svg>
  );
}
