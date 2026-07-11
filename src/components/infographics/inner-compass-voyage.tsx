"use client";

import { motion } from "framer-motion";

// Trait 7 — Flip Side of The Laundry List main graphic (UPGRADED).
// "We do not feel guilty when we stand up for ourselves."
// A nautical chart: the voyage begins in the safe harbor of an ACA meeting, crosses choppy
// waters (sharing our truth), strays off course and is re-adjusted by the Steps — guided the
// whole way by the reconnected inner compass — toward the road of happy destiny.

interface Props { className?: string; }

export function InnerCompassVoyage({ className }: Props) {
  return (
    <svg viewBox="0 0 700 480" className={className} role="img" aria-label="A nautical chart of recovery: from the safe harbor of the meeting, through choppy waters, bearings re-adjusted by the Steps, guided by the inner compass toward the road of happy destiny.">
      <defs>
        <linearGradient id="icv-sea" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.07"/>
          <stop offset="100%" stopColor="var(--sage)" stopOpacity="0.16"/>
        </linearGradient>
        <filter id="icv-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.12"/>
        </filter>
      </defs>

      {/* Title */}
      <text x="350" y="26" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10.5" letterSpacing="1.6" fontWeight="700" fill="var(--muted-foreground)">
        THE VOYAGE OF THE RECONNECTED COMPASS
      </text>
      <text x="350" y="44" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontStyle="italic" fill="var(--muted-foreground)">
        standing up for ourselves, one crossing at a time
      </text>

      {/* the sea */}
      <rect x="30" y="62" width="640" height="300" rx="18" fill="url(#icv-sea)" stroke="var(--border)" strokeWidth="1"/>

      {/* dotted course */}
      <path id="icv-course" d="M 95 300 C 180 250 200 170 300 190 C 360 202 380 260 450 240 C 520 222 560 150 620 120"
        fill="none" stroke="var(--primary)" strokeWidth="1.75" strokeDasharray="2 7" strokeLinecap="round" opacity="0.65"/>

      {/* WAYPOINT 1 — safe harbor */}
      <g filter="url(#icv-shadow)">
        <circle cx="95" cy="300" r="30" fill="var(--sage)" fillOpacity="0.25" stroke="var(--sage)" strokeWidth="1.75"/>
        {/* little chairs in a circle = meeting */}
        {[0, 72, 144, 216, 288].map((a) => {
          const r = (a * Math.PI) / 180;
          return <circle key={a} cx={95 + Math.cos(r) * 13} cy={300 + Math.sin(r) * 13} r="3.5" fill="var(--sage)"/>;
        })}
      </g>
      <text x="95" y="348" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12" fontWeight="600" fill="var(--sage)">Safe harbor</text>
      <text x="95" y="362" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">no one interrupts, comments, or judges</text>

      {/* WAYPOINT 2 — choppy waters */}
      <g>
        <motion.g
          animate={{ y: [0, -3, 0, 3, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M 262 150 Q 274 138 286 150 T 310 150 T 334 150" fill="none" stroke="var(--accent)" strokeWidth="2.25" strokeLinecap="round" opacity="0.8"/>
          <path d="M 268 164 Q 280 152 292 164 T 316 164" fill="none" stroke="var(--accent)" strokeWidth="1.75" strokeLinecap="round" opacity="0.55"/>
        </motion.g>
        <text x="300" y="132" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12" fontWeight="600" fill="var(--accent)">Choppy waters</text>
        <text x="300" y="146" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">sharing our truth makes a swell</text>
      </g>

      {/* WAYPOINT 3 — re-adjust bearings */}
      <g>
        <circle cx="450" cy="240" r="24" fill="var(--card)" stroke="var(--primary)" strokeWidth="1.5" filter="url(#icv-shadow)"/>
        <text x="450" y="236" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fontWeight="700" fill="var(--primary)">STEPS &amp;</text>
        <text x="450" y="247" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fontWeight="700" fill="var(--primary)">TRADITIONS</text>
        <text x="450" y="286" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12" fontWeight="600" fill="var(--primary)">Re-adjust bearings</text>
        <text x="450" y="300" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">even when we stray, we correct course</text>
      </g>

      {/* DESTINATION */}
      <g>
        <motion.circle
          cx="620" cy="120" r="20" fill="var(--sage)" fillOpacity="0.4" stroke="var(--sage)" strokeWidth="2" filter="url(#icv-shadow)"
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "620px", originY: "120px" }}
        />
        <path d="M 620 112 L 622.5 118 L 629 118 L 624 122 L 626 128 L 620 124.5 L 614 128 L 616 122 L 611 118 L 617.5 118 Z" fill="var(--sage)"/>
        <text x="620" y="94" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="12" fontWeight="600" fill="var(--sage)">Road of happy destiny</text>
        <text x="620" y="152" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">happy, joyous, and free</text>
      </g>

      {/* the ship traveling the course */}
      <motion.g
        animate={{ x: [0, 6, 0], y: [0, -4, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <g transform="translate(300, 190)" filter="url(#icv-shadow)">
          <path d="M -20 6 L 20 6 L 12 16 L -12 16 Z" fill="var(--primary)" fillOpacity="0.9"/>
          <line x1="0" y1="-18" x2="0" y2="6" stroke="var(--primary)" strokeWidth="2"/>
          <path d="M 0 -18 L 15 2 L 0 2 Z" fill="var(--accent)" fillOpacity="0.85"/>
          <path d="M 0 -13 L -10 2 L 0 2 Z" fill="var(--sage)" fillOpacity="0.8"/>
        </g>
      </motion.g>

      {/* the inner compass — bottom left card */}
      <g>
        <g filter="url(#icv-shadow)">
          <circle cx="120" cy="130" r="42" fill="var(--card)" stroke="var(--primary)" strokeWidth="1.75"/>
        </g>
        <circle cx="120" cy="130" r="34" fill="none" stroke="var(--primary)" strokeWidth="0.75" strokeDasharray="2 3" opacity="0.6"/>
        {["N", "E", "S", "W"].map((d, i) => {
          const a = (i * 90 - 90) * (Math.PI / 180);
          return (
            <text key={d} x={120 + Math.cos(a) * 27} y={130 + Math.sin(a) * 27 + 3} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" fill="var(--primary)">{d}</text>
          );
        })}
        {/* needle settling toward the destination */}
        <motion.g
          style={{ originX: "120px", originY: "130px" }}
          animate={{ rotate: [18, -6, 8, 0] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 1.2, ease: "easeOut" }}
        >
          <path d="M 120 130 L 138 106" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M 120 130 L 106 148" stroke="var(--muted-foreground)" strokeWidth="2.25" strokeLinecap="round" opacity="0.55"/>
        </motion.g>
        <circle cx="120" cy="130" r="4" fill="var(--primary)"/>
        <text x="120" y="188" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fontWeight="700" letterSpacing="0.8" fill="var(--primary)">THE INNER COMPASS</text>
        <text x="120" y="201" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic">reconnected — it wobbles, then finds true</text>
      </g>

      {/* bottom strip — what guilt-free standing up sounds like */}
      <g>
        <rect x="30" y="380" width="640" height="66" rx="12" fill="var(--sage)" fillOpacity="0.13" stroke="var(--sage)" strokeWidth="1.25"/>
        <text x="350" y="402" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--sage)">WHAT IT SOUNDS LIKE, GUILT-FREE</text>
        <g fontFamily="var(--font-fraunces)" fontSize="11" fontStyle="italic" fill="var(--foreground)" opacity="0.88">
          <text x="180" y="426" textAnchor="middle">“I see it differently.”</text>
          <text x="350" y="426" textAnchor="middle">“That doesn&apos;t work for me.”</text>
          <text x="520" y="426" textAnchor="middle">“I&apos;d like to finish my thought.”</text>
        </g>
      </g>

      {/* bottom caption */}
      <text x="350" y="468" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
        Calm is the tell: when standing up stops feeling like a crime, the compass is yours again.
      </text>
    </svg>
  );
}
