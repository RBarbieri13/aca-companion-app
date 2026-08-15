"use client";

import { motion } from "framer-motion";

// Trait 9 — Other Laundry List supplement.
// The psychologically and spiritually barren person becomes an inviting oasis to the
// underwhelmed — an ecosystem of attraction and repulsion where both reenact a childhood
// dynamic, each getting what they subconsciously need to stave off recalling their losses.
// A win for the supposed "loser," a loss for the supposed "winner" — lose-lose.

interface Props { className?: string; }

export function LoseLoseOasis({ className }: Props) {
  return (
    <svg viewBox="0 0 640 520" className={className} role="img" aria-label="The barren oasis ecosystem: a psychologically barren figure appears as an oasis mirage to an underwhelmed seeker; circular arrows of attraction and repulsion connect them, and the scoreboard flips to lose-lose.">
      <defs>
        <filter id="llo-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.12"/>
        </filter>
        <marker id="llo-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)"/>
        </marker>
        <radialGradient id="llo-mirage" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--sage)" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="var(--sage)" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Title */}
      <text x="320" y="22" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">
        THE BARREN OASIS
      </text>
      <text x="320" y="40" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontStyle="italic" fill="var(--muted-foreground)">
        an ecosystem of attraction &amp; repulsion
      </text>

      {/* desert ground */}
      <path d="M 40 268 Q 180 254 320 264 T 600 262" fill="none" stroke="var(--border)" strokeWidth="1.5"/>
      <path d="M 60 282 Q 200 272 340 280 T 590 276" fill="none" stroke="var(--border)" strokeWidth="1" opacity="0.6"/>

      {/* LEFT — the underwhelmed seeker */}
      <g>
        <circle cx="130" cy="188" r="13" fill="#C08A2D"/>
        <rect x="116" y="203" width="28" height="44" rx="9" fill="#C08A2D" fillOpacity="0.85" filter="url(#llo-shadow)"/>
        {/* leaning toward the mirage */}
        <path d="M 144 214 L 174 206" stroke="#C08A2D" strokeWidth="3" strokeLinecap="round"/>
        <text x="130" y="304" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="700" letterSpacing="0.5" fill="#C08A2D">
          THE UNDERWHELMED
        </text>
        <g fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
          <text x="130" y="318" textAnchor="middle">so thirsty that anything</text>
          <text x="130" y="330" textAnchor="middle">shimmering looks like water</text>
        </g>
      </g>

      {/* RIGHT — the barren person as oasis mirage */}
      <g>
        {/* mirage glow */}
        <motion.circle
          cx="490" cy="190" r="66" fill="url(#llo-mirage)"
          animate={{ opacity: [0.45, 1, 0.45], scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "490px", originY: "190px" }}
        />
        {/* palm fronds — the mirage costume */}
        <g stroke="var(--sage)" strokeWidth="2" fill="none" opacity="0.75">
          <path d="M 490 148 C 470 132, 452 130, 438 138"/>
          <path d="M 490 148 C 510 132, 528 130, 542 138"/>
          <path d="M 490 148 C 482 128, 470 118, 456 116"/>
          <path d="M 490 148 C 498 128, 510 118, 524 116"/>
        </g>
        {/* shimmering pool at the feet */}
        <motion.g
          animate={{ opacity: [0.25, 0.7, 0.25] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          stroke="var(--sage)" strokeWidth="1.25" fill="none"
        >
          <path d="M 452 254 Q 470 248 490 254 T 528 254"/>
          <path d="M 460 262 Q 476 256 492 262 T 522 262"/>
        </motion.g>
        {/* the barren figure inside the mirage */}
        <circle cx="490" cy="176" r="13" fill="var(--muted-foreground)" fillOpacity="0.6"/>
        <rect x="476" y="191" width="28" height="46" rx="9" fill="var(--muted-foreground)" fillOpacity="0.5" filter="url(#llo-shadow)"/>
        <text x="490" y="304" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="700" letterSpacing="0.5" fill="var(--sage)">
          THE BARREN &ldquo;OASIS&rdquo;
        </text>
        <g fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
          <text x="490" y="318" textAnchor="middle">psychologically &amp; spiritually stripped —</text>
          <text x="490" y="330" textAnchor="middle">yet inviting from a distance</text>
        </g>
      </g>

      {/* circular arrows of attraction & repulsion */}
      <g>
        <path d="M 190 172 C 250 136, 370 136, 430 168" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.5" markerEnd="url(#llo-arrow)" opacity="0.7"/>
        <text x="310" y="132" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fontWeight="700" letterSpacing="1" fill="var(--muted-foreground)">
          ATTRACTION
        </text>
        <text x="310" y="145" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic">
          &ldquo;finally, someone to fill&rdquo;
        </text>

        <path d="M 430 236 C 370 268, 250 268, 190 240" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#llo-arrow)" opacity="0.7"/>
        <text x="310" y="240" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fontWeight="700" letterSpacing="1" fill="var(--muted-foreground)">
          REPULSION
        </text>
        <text x="310" y="253" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic">
          &ldquo;your neediness disgusts me&rdquo;
        </text>

        <text x="310" y="196" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--foreground)" opacity="0.8" fontStyle="italic">
          both reenacting a childhood dynamic —
        </text>
        <text x="310" y="209" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--foreground)" opacity="0.8" fontStyle="italic">
          each staving off the memory of their losses
        </text>
      </g>

      {/* the scoreboard flips */}
      <g>
        <rect x="52" y="352" width="256" height="76" rx="12" fill="var(--card)" stroke="var(--border)" strokeWidth="1.25" filter="url(#llo-shadow)"/>
        <text x="180" y="374" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" letterSpacing="1" fontWeight="700" fill="var(--muted-foreground)">
          THE SUPPOSED &ldquo;LOSER&rdquo;
        </text>
        <text x="180" y="392" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--foreground)" opacity="0.85">
          gets rescued, gets to stay small
        </text>
        <text x="180" y="414" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12" fontStyle="italic" fontWeight="600" fill="#C08A2D">
          scoreboard flips: a win
        </text>

        <rect x="332" y="352" width="256" height="76" rx="12" fill="var(--card)" stroke="var(--border)" strokeWidth="1.25" filter="url(#llo-shadow)"/>
        <text x="460" y="374" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" letterSpacing="1" fontWeight="700" fill="var(--muted-foreground)">
          THE SUPPOSED &ldquo;WINNER&rdquo;
        </text>
        <text x="460" y="392" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--foreground)" opacity="0.85">
          gets needed, stays barren inside
        </text>
        <text x="460" y="414" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12" fontStyle="italic" fontWeight="600" fill="var(--accent)">
          scoreboard flips: a loss
        </text>
      </g>

      {/* the stamp */}
      <g transform="translate(320, 462) rotate(-4)">
        <rect x="-84" y="-20" width="168" height="40" rx="6" fill="none" stroke="var(--accent)" strokeWidth="2.5" opacity="0.85"/>
        <text x="0" y="8" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="21" fontWeight="700" letterSpacing="3" fill="var(--accent)" opacity="0.9">
          LOSE–LOSE
        </text>
      </g>

      <text x="320" y="508" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
        Neither one drinks. The mirage only works as long as nobody gets close enough to see.
      </text>
    </svg>
  );
}
