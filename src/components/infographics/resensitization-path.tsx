"use client";

import { motion } from "framer-motion";

// Trait 8 — Flip Side of The Other Laundry List main graphic.
// "We uncover, acknowledge and express our childhood fears and withdraw from emotional
// intoxication." A journey path from hitting bottom (the beginning, not the end) through
// the return of feelings, uncovering, acknowledging, expressing in the safe harbor of
// meetings, withdrawing from what intoxicates — foreign at first, then rejuvenated and
// alive. The freeing continues.

interface Props { className?: string; }

export function ResensitizationPath({ className }: Props) {
  return (
    <svg viewBox="0 0 720 480" className={className} role="img" aria-label="The resensitization path: from hitting bottom — the beginning, not the end — through the return of feelings, uncovering and acknowledging hidden childhood fears, expressing them in the safe harbor of meetings among fellow travelers, and withdrawing from intoxicating people, activities and situations — foreign at first, then rejuvenated and alive, with the freeing continuing on.">
      <defs>
        <linearGradient id="rp-terrain" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.1"/>
          <stop offset="55%" stopColor="var(--primary)" stopOpacity="0.05"/>
          <stop offset="100%" stopColor="var(--sage)" stopOpacity="0.18"/>
        </linearGradient>
        <filter id="rp-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.12"/>
        </filter>
        <marker id="rp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--sage)"/>
        </marker>
      </defs>

      {/* Title */}
      <text x="360" y="26" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10.5" letterSpacing="1.6" fontWeight="700" fill="var(--muted-foreground)">
        THE RESENSITIZATION PATH
      </text>
      <text x="360" y="44" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontStyle="italic" fill="var(--muted-foreground)">
        coming back to feeling — painstaking, foreign, and worth it
      </text>

      {/* the terrain */}
      <rect x="30" y="60" width="660" height="330" rx="18" fill="url(#rp-terrain)" stroke="var(--border)" strokeWidth="1"/>

      {/* the path */}
      <path
        d="M 85 350 C 150 356 180 318 225 308 C 270 298 292 268 330 258 C 368 248 400 228 435 220 C 465 213 470 198 488 190 C 512 179 535 168 555 160 C 590 146 615 118 645 95"
        fill="none" stroke="var(--primary)" strokeWidth="1.75" strokeDasharray="2 7" strokeLinecap="round" opacity="0.65"
      />

      {/* the traveler */}
      <motion.circle
        r="6" fill="var(--primary)" stroke="var(--card)" strokeWidth="1.5" filter="url(#rp-shadow)"
        animate={{
          cx: [85, 225, 330, 435, 488, 555, 645],
          cy: [350, 308, 258, 220, 190, 160, 95],
          opacity: [0, 1, 1, 1, 1, 1, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
      />

      {/* WAYPOINT 1 — hitting bottom */}
      <circle cx="85" cy="350" r="16" fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="1.25"/>
      <circle cx="85" cy="350" r="8" fill="var(--accent)" fillOpacity="0.9" filter="url(#rp-shadow)"/>
      <text x="112" y="376" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12" fontWeight="600" fill="var(--accent)">Hitting bottom</text>
      <text x="112" y="389" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontStyle="italic" fill="var(--muted-foreground)">the beginning — not the end</text>

      {/* WAYPOINT 2 — feelings return */}
      <motion.g
        animate={{ opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        stroke="#C08A2D" strokeWidth="1.75" strokeLinecap="round"
      >
        <line x1="225" y1="298" x2="225" y2="290"/>
        <line x1="216" y1="303" x2="209" y2="298"/>
        <line x1="234" y1="303" x2="241" y2="298"/>
      </motion.g>
      <circle cx="225" cy="308" r="5" fill="#C08A2D"/>
      <text x="225" y="334" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12" fontWeight="600" fill="#C08A2D">Feelings return</text>
      <text x="225" y="347" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontStyle="italic" fill="var(--muted-foreground)">slipping through the cracks of the armor</text>

      {/* WAYPOINT 3 — uncover */}
      <circle cx="326" cy="252" r="7" fill="none" stroke="var(--primary)" strokeWidth="1.75"/>
      <line x1="331" y1="258" x2="339" y2="266" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round"/>
      <text x="322" y="228" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12" fontWeight="600" fill="var(--primary)">Uncover</text>
      <text x="322" y="240" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontStyle="italic" fill="var(--muted-foreground)">the hidden childhood fears</text>

      {/* WAYPOINT 4 — acknowledge */}
      <path d="M 427 219 L 433 226 L 444 211" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="435" y="246" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12" fontWeight="600" fill="var(--primary)">Acknowledge</text>
      <text x="435" y="258" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontStyle="italic" fill="var(--muted-foreground)">what actually happened to us</text>

      {/* WAYPOINT 5 — express, in the safe harbor of meetings */}
      <g filter="url(#rp-shadow)">
        <circle cx="488" cy="190" r="24" fill="var(--sage)" fillOpacity="0.25" stroke="var(--sage)" strokeWidth="1.75"/>
        {[0, 72, 144, 216, 288].map((a) => {
          const r = (a * Math.PI) / 180;
          return <circle key={a} cx={488 + Math.cos(r) * 10.5} cy={190 + Math.sin(r) * 10.5} r="3" fill="var(--sage)"/>;
        })}
      </g>
      <text x="470" y="140" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12" fontWeight="600" fill="var(--sage)">Express — the safe harbor</text>
      <text x="470" y="153" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontStyle="italic" fill="var(--muted-foreground)">meetings, among fellow travelers</text>

      {/* WAYPOINT 6 — withdraw */}
      <g>
        <circle cx="549" cy="156" r="5" fill="var(--primary)" fillOpacity="0.9"/>
        <path d="M 560 152 L 570 146" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round"/>
        <g stroke="var(--accent)" strokeWidth="1.25" strokeLinecap="round" opacity="0.7">
          <path d="M 534 172 L 528 178 L 534 184"/>
          <path d="M 542 176 L 537 182"/>
        </g>
      </g>
      <text x="597" y="200" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12" fontWeight="600" fill="var(--primary)">Withdraw</text>
      <text x="597" y="213" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fontStyle="italic" fill="var(--muted-foreground)">from people · activities · situations</text>
      <text x="597" y="224" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fontStyle="italic" fill="var(--muted-foreground)">that keep us emotionally intoxicated</text>

      {/* the "foreign at first" marker */}
      <path d="M 582 138 L 588 132 L 594 138 L 588 144 Z" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.25"/>
      <text x="600" y="152" textAnchor="start" fontFamily="var(--font-inter)" fontSize="7.5" fontStyle="italic" fill="var(--muted-foreground)">foreign at first —</text>
      <text x="600" y="162" textAnchor="start" fontFamily="var(--font-inter)" fontSize="7.5" fontStyle="italic" fill="var(--muted-foreground)">then, slowly, home</text>

      {/* DESTINATION — rejuvenated & alive */}
      <motion.circle
        cx="645" cy="95" r="18" fill="var(--sage)" fillOpacity="0.4" stroke="var(--sage)" strokeWidth="2" filter="url(#rp-shadow)"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: "645px", originY: "95px" }}
      />
      <path d="M 645 87 L 647.5 93 L 654 93 L 649 97 L 651 103 L 645 99.5 L 639 103 L 641 97 L 636 93 L 642.5 93 Z" fill="var(--sage)"/>
      <text x="618" y="74" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12" fontWeight="600" fill="var(--sage)">Rejuvenated &amp; alive</text>
      <text x="645" y="126" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontStyle="italic" fill="var(--muted-foreground)">perhaps for the first time</text>

      {/* the freeing continues */}
      <path d="M 663 86 C 676 78 686 71 694 64" fill="none" stroke="var(--sage)" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.8" markerEnd="url(#rp-arrow)"/>
      <text x="700" y="54" textAnchor="end" fontFamily="var(--font-inter)" fontSize="7.5" fontStyle="italic" fill="var(--sage)">…and the freeing continues</text>

      {/* bottom strip — ways back into the senses */}
      <rect x="30" y="402" width="660" height="44" rx="12" fill="var(--sage)" fillOpacity="0.13" stroke="var(--sage)" strokeWidth="1.25"/>
      <text x="360" y="419" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" letterSpacing="1.2" fontWeight="700" fill="var(--sage)">WAYS BACK INTO THE SENSES</text>
      <text x="360" y="436" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="10.5" fontStyle="italic" fill="var(--foreground)" opacity="0.88">
        look at something actual · make a noise · eat a peach · smell some cinnamon · pat your face
      </text>

      {/* bottom caption */}
      <text x="360" y="468" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
        Disinhibiting is painstaking work — foreign at first, then rejuvenating. And the freeing continues as we go.
      </text>
    </svg>
  );
}
