"use client";

import { motion } from "framer-motion";

// Trait 8 — Laundry List supplement (also embedded inside the body-scan exercise).
// The body map of negative excitement: a figure braced for an impact that already
// happened — shallow chest breathing, raised shoulders, clamped jaw, grinding teeth,
// a bouncing knee, dug-at fingernails, a chewed lip — under a faint halo of static.

interface Props { className?: string; }

export function BodyStaticMap({ className }: Props) {
  return (
    <svg viewBox="0 0 720 540" className={className} role="img" aria-label="A body map of negative excitement: a figure bracing for an impact that already happened — clamped jaw, grinding teeth, chewed lip, raised shoulders that stay up, quick shallow chest breathing, fingers dug at, a bouncing knee and tapping foot — with a note that the body still remembers what it did in childhood.">
      <defs>
        <filter id="bsm-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.1"/>
        </filter>
      </defs>

      {/* Title */}
      <text x="360" y="26" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10.5" letterSpacing="1.6" fontWeight="700" fill="var(--muted-foreground)">
        BRACING FOR AN IMPACT THAT ALREADY HAPPENED
      </text>
      <text x="360" y="46" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
        The low static of a body still on duty
      </text>

      {/* the static halo */}
      <motion.ellipse
        cx="360" cy="262" rx="118" ry="188" fill="var(--accent)"
        animate={{ opacity: [0.05, 0.11, 0.05] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <ellipse cx="360" cy="262" rx="118" ry="188" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 5" opacity="0.35"/>

      {/* ————— the figure ————— */}
      {/* head */}
      <circle cx="360" cy="126" r="25" fill="var(--primary)" fillOpacity="0.1" stroke="var(--primary)" strokeWidth="1.5" filter="url(#bsm-shadow)"/>
      {/* grinding teeth */}
      <path d="M 350 136 L 354 132 L 358 136 L 362 132 L 366 136" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinejoin="round"/>
      {/* clamped jaw */}
      <path d="M 344 140 Q 360 152 376 140" fill="none" stroke="var(--accent)" strokeWidth="2.25" strokeLinecap="round"/>
      {/* neck */}
      <rect x="353" y="150" width="14" height="12" fill="var(--primary)" fillOpacity="0.15"/>
      {/* raised shoulders + "up" chevrons */}
      <rect x="320" y="160" width="80" height="15" rx="7" fill="var(--primary)" fillOpacity="0.2" stroke="var(--primary)" strokeWidth="1"/>
      <path d="M 312 162 L 318 154 L 324 162" fill="none" stroke="var(--accent)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M 396 162 L 402 154 L 408 162" fill="none" stroke="var(--accent)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
      {/* torso */}
      <rect x="331" y="172" width="58" height="116" rx="16" fill="var(--primary)" fillOpacity="0.1" stroke="var(--primary)" strokeWidth="1.5"/>
      {/* quick, shallow chest breathing — high, small, fast */}
      <motion.g
        stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"
        animate={{ opacity: [0.35, 0.95, 0.35] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <line x1="348" y1="194" x2="372" y2="194"/>
        <line x1="348" y1="202" x2="372" y2="202"/>
        <line x1="348" y1="210" x2="372" y2="210"/>
      </motion.g>
      {/* arms */}
      <rect x="311" y="174" width="12" height="92" rx="6" fill="var(--primary)" fillOpacity="0.15" stroke="var(--primary)" strokeWidth="0.75"/>
      <rect x="397" y="174" width="12" height="92" rx="6" fill="var(--primary)" fillOpacity="0.15" stroke="var(--primary)" strokeWidth="0.75"/>
      {/* hands */}
      <circle cx="317" cy="274" r="7.5" fill="var(--primary)" fillOpacity="0.2" stroke="var(--primary)" strokeWidth="1"/>
      <circle cx="403" cy="274" r="7.5" fill="var(--primary)" fillOpacity="0.2" stroke="var(--primary)" strokeWidth="1"/>
      {/* digging at the fingernails */}
      <g stroke="var(--accent)" strokeWidth="1.25" strokeLinecap="round">
        <line x1="306" y1="270" x2="310" y2="274"/>
        <line x1="305" y1="277" x2="309" y2="280"/>
        <line x1="307" y1="283" x2="311" y2="285"/>
      </g>
      {/* right leg + foot (still) */}
      <rect x="366" y="288" width="17" height="104" rx="8" fill="var(--primary)" fillOpacity="0.12" stroke="var(--primary)" strokeWidth="1"/>
      <rect x="366" y="392" width="30" height="10" rx="5" fill="var(--primary)" fillOpacity="0.18" stroke="var(--primary)" strokeWidth="0.75"/>
      {/* left leg + foot — the bouncing knee, the tapping toes */}
      <motion.g
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="337" y="288" width="17" height="104" rx="8" fill="var(--primary)" fillOpacity="0.12" stroke="var(--primary)" strokeWidth="1"/>
        <rect x="327" y="392" width="28" height="10" rx="5" fill="var(--primary)" fillOpacity="0.18" stroke="var(--primary)" strokeWidth="0.75"/>
        <circle cx="345" cy="342" r="3" fill="var(--accent)" fillOpacity="0.8"/>
      </motion.g>

      {/* ————— left callouts ————— */}
      <g fontFamily="var(--font-inter)" textAnchor="end">
        <text x="215" y="120" fontSize="8.5" fontWeight="700" fill="var(--accent)">clamped jaw</text>
        <text x="215" y="132" fontSize="7.5" fontStyle="italic" fill="var(--muted-foreground)">day and night</text>
        <text x="215" y="198" fontSize="8.5" fontWeight="700" fill="var(--accent)">quick, shallow chest breathing</text>
        <text x="215" y="210" fontSize="7.5" fontStyle="italic" fill="var(--muted-foreground)">high in the chest, never the belly</text>
        <text x="215" y="276" fontSize="8.5" fontWeight="700" fill="var(--accent)">digging at the fingernails</text>
        <text x="215" y="288" fontSize="7.5" fontStyle="italic" fill="var(--muted-foreground)">small, constant, unnoticed</text>
        <text x="215" y="362" fontSize="8.5" fontWeight="700" fill="var(--accent)">bouncing knee · tapping foot</text>
        <text x="215" y="374" fontSize="7.5" fontStyle="italic" fill="var(--muted-foreground)">the body craving movement</text>
      </g>
      <g stroke="var(--muted-foreground)" strokeWidth="0.75" strokeDasharray="2 3" opacity="0.55">
        <line x1="222" y1="124" x2="344" y2="141"/>
        <line x1="222" y1="202" x2="342" y2="200"/>
        <line x1="222" y1="280" x2="308" y2="277"/>
        <line x1="222" y1="366" x2="338" y2="344"/>
      </g>

      {/* ————— right callouts ————— */}
      <g fontFamily="var(--font-inter)" textAnchor="start">
        <text x="505" y="112" fontSize="8.5" fontWeight="700" fill="var(--accent)">grinding teeth</text>
        <text x="505" y="124" fontSize="7.5" fontStyle="italic" fill="var(--muted-foreground)">even in sleep</text>
        <text x="505" y="152" fontSize="8.5" fontWeight="700" fill="var(--accent)">chewing the lip</text>
        <text x="505" y="164" fontSize="7.5" fontStyle="italic" fill="var(--muted-foreground)">the skin inside the mouth, too</text>
        <text x="505" y="200" fontSize="8.5" fontWeight="700" fill="var(--accent)">shoulders that stay up</text>
        <text x="505" y="212" fontSize="7.5" fontStyle="italic" fill="var(--muted-foreground)">raised — and never lowered</text>
      </g>
      <g stroke="var(--muted-foreground)" strokeWidth="0.75" strokeDasharray="2 3" opacity="0.55">
        <line x1="498" y1="116" x2="368" y2="134"/>
        <line x1="498" y1="156" x2="378" y2="146"/>
        <line x1="498" y1="204" x2="400" y2="168"/>
      </g>

      {/* the childhood echo */}
      <g filter="url(#bsm-shadow)">
        <rect x="470" y="340" width="220" height="92" rx="12" fill="var(--muted)" fillOpacity="0.5"/>
      </g>
      <text x="580" y="362" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" letterSpacing="1.2" fontWeight="700" fill="var(--muted-foreground)">THE CHILDHOOD ECHO</text>
      <g textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontStyle="italic" fill="var(--foreground)" opacity="0.85">
        <text x="580" y="380">the body still remembers</text>
        <text x="580" y="392">what it did back then —</text>
        <text x="580" y="404">little you braced this way first</text>
      </g>
      <text x="580" y="421" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fontStyle="italic" fill="var(--muted-foreground)">compare today&apos;s brace to that child&apos;s</text>

      {/* the scan invitation */}
      <rect x="40" y="452" width="640" height="46" rx="12" fill="var(--sage)" fillOpacity="0.14" stroke="var(--sage)" strokeWidth="1.25"/>
      <text x="360" y="470" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" letterSpacing="1.2" fontWeight="700" fill="var(--sage)">A TWENTY-SECOND SCAN</text>
      <text x="360" y="486" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontStyle="italic" fill="var(--foreground)" opacity="0.85">
        jaw · shoulders · breath · hands · knees — where are you bracing right now, and how old is that brace?
      </text>

      {/* bottom caption */}
      <text x="360" y="522" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
        None of this is a flaw. It&apos;s a faithful body still doing its old job — waiting to hear the impact is over.
      </text>
    </svg>
  );
}
