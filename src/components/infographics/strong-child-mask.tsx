"use client";

import { motion } from "framer-motion";

// Trait 9 — Other Laundry List supplement.
// The child who had to pretend strong: felt older than other children, looked down on
// kids acting their age, resented their "normal" childhood. Sight-lines of contempt and
// resentment toward the prize-winner and the person everyone volunteers to help — and a
// barred door labeled "asking for help."
// The mask kept us alive — and kept every hand out.

interface Props { className?: string; }

export function StrongChildMask({ className }: Props) {
  return (
    <svg viewBox="0 0 680 520" className={className} role="img" aria-label="A child wearing an older, stronger mask, with sight-lines of contempt toward the prize winner and resentment toward the person everyone helps, and a barred door labeled asking for help.">
      <defs>
        <filter id="scm-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.12"/>
        </filter>
        <marker id="scm-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--accent)"/>
        </marker>
      </defs>

      {/* Title */}
      <text x="340" y="22" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">
        THE OLDER-STRONGER MASK
      </text>
      <text x="340" y="40" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontStyle="italic" fill="var(--muted-foreground)">
        the child who was never allowed to be one
      </text>

      {/* LEFT — the child behind the mask */}
      <g>
        {/* small child body */}
        <circle cx="170" cy="180" r="12" fill="var(--accent)" fillOpacity="0.75"/>
        <rect x="157" y="194" width="26" height="42" rx="9" fill="var(--accent)" fillOpacity="0.65" filter="url(#scm-shadow)"/>
        {/* small arm holding the mask up */}
        <path d="M 183 204 L 204 186" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" opacity="0.75"/>

        {/* the oversized mask, hovering in front of the face */}
        <motion.g
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <g transform="translate(216, 176)" filter="url(#scm-shadow)">
            <path d="M 0 -42 C 26 -42, 38 -22, 38 2 C 38 30, 22 44, 0 44 C -22 44, -38 30, -38 2 C -38 -22, -26 -42, 0 -42 Z" fill="var(--primary)" fillOpacity="0.9"/>
            {/* stern features — older than its wearer */}
            <path d="M -24 -12 L -8 -8 M 8 -8 L 24 -12" stroke="var(--card)" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M -20 -2 L -10 -2 M 10 -2 L 20 -2" stroke="var(--card)" strokeWidth="2" strokeLinecap="round"/>
            {/* flat unsmiling mouth */}
            <path d="M -12 26 L 12 26" stroke="var(--card)" strokeWidth="2.5" strokeLinecap="round"/>
            {/* worry lines it should not have yet */}
            <path d="M -14 -26 Q 0 -32 14 -26" fill="none" stroke="var(--card)" strokeWidth="1.25" opacity="0.7"/>
          </g>
        </motion.g>

        <text x="196" y="266" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="700" letterSpacing="0.5" fill="var(--primary)">
          THE MASK
        </text>
        <text x="196" y="280" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
          older &amp; stronger than the child behind it
        </text>

        {/* what it took */}
        <g fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--foreground)" opacity="0.8">
          <text x="196" y="306" textAnchor="middle">· had to pretend strong</text>
          <text x="196" y="320" textAnchor="middle">· felt older than the other children</text>
          <text x="196" y="334" textAnchor="middle">· looked down on kids acting their age</text>
          <text x="196" y="348" textAnchor="middle">· resented their &ldquo;normal&rdquo; childhood</text>
        </g>
      </g>

      {/* sight-line 1 — contempt toward the prize winner */}
      <g>
        <path d="M 254 156 C 330 128, 400 118, 460 118" fill="none" stroke="var(--accent)" strokeWidth="1.25" strokeDasharray="4 3" markerEnd="url(#scm-arrow)" opacity="0.75"/>
        <text x="352" y="112" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" letterSpacing="1" fill="var(--accent)">CONTEMPT</text>

        {/* the winner with the big prize */}
        <g transform="translate(516, 112)">
          <circle cx="0" cy="-4" r="11" fill="#C08A2D"/>
          <rect x="-11" y="8" width="22" height="30" rx="7" fill="#C08A2D" fillOpacity="0.85" filter="url(#scm-shadow)"/>
          {/* trophy held high */}
          <path d="M 11 12 L 28 -6" stroke="#C08A2D" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M 24 -24 h 14 v 6 a 7 7 0 0 1 -14 0 Z M 29 -12 v 5 M 26 -7 h 10" stroke="#C08A2D" strokeWidth="1.75" fill="none" strokeLinecap="round"/>
          <text x="0" y="56" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" fill="#C08A2D" letterSpacing="0.5">THE WINNER</text>
          <text x="0" y="69" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic">of the big prize</text>
        </g>
      </g>

      {/* sight-line 2 — resentment toward the one everyone helps */}
      <g>
        <path d="M 256 186 C 340 196, 410 212, 462 226" fill="none" stroke="var(--accent)" strokeWidth="1.25" strokeDasharray="4 3" markerEnd="url(#scm-arrow)" opacity="0.75"/>
        <text x="356" y="188" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" letterSpacing="1" fill="var(--accent)">RESENTMENT</text>

        {/* the person everyone volunteers to help */}
        <g transform="translate(524, 238)">
          <circle cx="0" cy="-6" r="10" fill="#8B7BA8"/>
          <rect x="-10" y="5" width="20" height="27" rx="6" fill="#8B7BA8" fillOpacity="0.85" filter="url(#scm-shadow)"/>
          {/* volunteering hands reaching in */}
          <g stroke="var(--sage)" strokeWidth="2.5" strokeLinecap="round">
            <path d="M -38 -18 L -16 -8"/>
            <path d="M 38 -18 L 16 -8"/>
            <path d="M -40 14 L -14 12"/>
            <path d="M 40 14 L 14 12"/>
          </g>
          <text x="0" y="52" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" fill="#8B7BA8" letterSpacing="0.5">THE HELPED ONE</text>
          <text x="0" y="65" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic">everyone volunteers for them</text>
        </g>
      </g>

      {/* the barred door */}
      <g transform="translate(524, 356)">
        <rect x="-42" y="-30" width="84" height="88" rx="8" fill="var(--card)" stroke="var(--muted-foreground)" strokeWidth="1.5" filter="url(#scm-shadow)"/>
        <circle cx="26" cy="14" r="3" fill="var(--muted-foreground)" opacity="0.7"/>
        {/* bars */}
        <g stroke="var(--accent)" strokeWidth="3.5" strokeLinecap="round" opacity="0.85">
          <path d="M -50 -18 L 50 6"/>
          <path d="M -50 20 L 50 -4"/>
        </g>
        <text x="0" y="76" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" letterSpacing="1" fill="var(--muted-foreground)">ASKING FOR HELP</text>
        <text x="0" y="89" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic">barred from the inside</text>
      </g>
      {/* sight-line to the door — averted */}
      <path d="M 250 220 C 320 280, 390 330, 470 352" fill="none" stroke="var(--muted-foreground)" strokeWidth="1" strokeDasharray="2 4" opacity="0.5"/>
      <text x="352" y="312" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic" transform="rotate(14, 352, 312)">
        a door we never let ourselves try
      </text>

      {/* bottom caption */}
      <text x="340" y="474" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.85">
        The mask kept us alive — and kept every hand out.
      </text>
      <text x="340" y="492" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
        What looked like contempt for their weakness was longing for the help we could never request.
      </text>
    </svg>
  );
}
