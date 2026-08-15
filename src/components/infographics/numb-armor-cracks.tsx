"use client";

import { motion } from "framer-motion";

// Trait 8 — Other Laundry List main graphic.
// "We inhibit our fear by staying deadened and numb." The True Self wrapped in three
// named layers of armor — outside substances, a flurry of activities, a cocktail of
// internal chemicals — reading from outside as the superficial "okay." The cracks,
// where feeling seeps back through, are drawn as the good news.

interface Props { className?: string; }

export function NumbArmorCracks({ className }: Props) {
  return (
    <svg viewBox="0 0 720 480" className={className} role="img" aria-label="The numb armor: the True Self wrapped in three layers — outside substances, a flurry of activities, a cocktail of internal chemicals — that read from outside as the superficial okay. Animated cracks let feeling seep back through, and the quiet-moment question appears: what is wrong with me that I cannot feel? The cracks are framed as resensitization beginning.">
      <defs>
        <radialGradient id="nac-self" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C08A2D" stopOpacity="0.45"/>
          <stop offset="100%" stopColor="#C08A2D" stopOpacity="0.05"/>
        </radialGradient>
        <filter id="nac-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.12"/>
        </filter>
      </defs>

      {/* Title */}
      <text x="360" y="26" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10.5" letterSpacing="1.6" fontWeight="700" fill="var(--muted-foreground)">
        WE INHIBIT OUR FEAR BY STAYING DEADENED AND NUMB
      </text>
      <text x="360" y="46" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="14" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
        Three layers of armor — and the cracks that save us
      </text>

      {/* how it reads from outside */}
      <text x="250" y="108" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fontStyle="italic" fill="var(--muted-foreground)">
        from outside it reads: felt nothing — the superficial “okay”
      </text>

      {/* ————— the armor rings ————— */}
      <circle cx="250" cy="252" r="120" fill="none" stroke="var(--foreground)" strokeWidth="16" strokeOpacity="0.16"/>
      <circle cx="250" cy="252" r="92" fill="none" stroke="var(--muted-foreground)" strokeWidth="16" strokeOpacity="0.26"/>
      <circle cx="250" cy="252" r="64" fill="none" stroke="#8B7BA8" strokeWidth="16" strokeOpacity="0.32"/>
      <g fill="none" stroke="var(--border)" strokeWidth="0.75" opacity="0.8">
        <circle cx="250" cy="252" r="128"/>
        <circle cx="250" cy="252" r="112"/>
        <circle cx="250" cy="252" r="100"/>
        <circle cx="250" cy="252" r="84"/>
        <circle cx="250" cy="252" r="72"/>
        <circle cx="250" cy="252" r="56"/>
      </g>

      {/* ————— the True Self, still in there ————— */}
      <circle cx="250" cy="252" r="40" fill="url(#nac-self)"/>
      <circle cx="250" cy="240" r="8.5" fill="#C08A2D"/>
      <rect x="242" y="250" width="17" height="22" rx="6" fill="#C08A2D" fillOpacity="0.85"/>
      <text x="250" y="286" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7" letterSpacing="1" fontWeight="700" fill="#C08A2D">TRUE SELF</text>
      <text x="250" y="296" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="6.5" fontStyle="italic" fill="var(--muted-foreground)">still in there — intact</text>

      {/* ————— the cracks: feeling seeping through ————— */}
      <motion.g
        animate={{ opacity: [0.25, 0.95, 0.25] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        fill="none" stroke="#C08A2D" strokeWidth="2.25" strokeLinejoin="round" strokeLinecap="round"
      >
        <path d="M 272 226 L 290 232 L 300 214 L 322 222 L 334 204 L 356 208 L 372 198"/>
        <line x1="376" y1="194" x2="388" y2="186"/>
        <line x1="378" y1="200" x2="392" y2="198"/>
      </motion.g>
      <motion.g
        animate={{ opacity: [0.25, 0.9, 0.25] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
        fill="none" stroke="#C08A2D" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"
      >
        <path d="M 230 282 L 214 292 L 218 312 L 198 322 L 192 344 L 178 360"/>
        <line x1="174" y1="366" x2="164" y2="376"/>
        <line x1="180" y1="368" x2="174" y2="380"/>
      </motion.g>
      <motion.g
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        fill="none" stroke="#C08A2D" strokeWidth="1.75" strokeLinejoin="round" strokeLinecap="round"
      >
        <path d="M 244 212 L 238 196 L 248 180 L 240 162 L 246 148 L 240 130"/>
        <line x1="238" y1="124" x2="234" y2="114"/>
      </motion.g>

      {/* ————— legend: the three layers ————— */}
      <text x="434" y="126" textAnchor="start" fontFamily="var(--font-inter)" fontSize="8" letterSpacing="1.2" fontWeight="700" fill="var(--muted-foreground)">THE THREE LAYERS OF ARMOR</text>

      <g fontFamily="var(--font-inter)" textAnchor="start">
        <text x="434" y="150" fontSize="8.5" fontWeight="700" letterSpacing="0.5" fill="var(--foreground)">OUTSIDE SUBSTANCES</text>
        <text x="434" y="162" fontSize="7.5" fontStyle="italic" fill="var(--muted-foreground)">whatever we could take in from the outside</text>
        <text x="434" y="214" fontSize="8.5" fontWeight="700" letterSpacing="0.5" fill="var(--muted-foreground)">A FLURRY OF ACTIVITIES</text>
        <text x="434" y="226" fontSize="7.5" fontStyle="italic" fill="var(--muted-foreground)">too busy, always, to feel anything</text>
        <text x="434" y="278" fontSize="8.5" fontWeight="700" letterSpacing="0.5" fill="#8B7BA8">A COCKTAIL OF INTERNAL CHEMICALS</text>
        <text x="434" y="290" fontSize="7.5" fontStyle="italic" fill="var(--muted-foreground)">the body&apos;s own drugs, self-served</text>
      </g>
      <g stroke="var(--muted-foreground)" strokeWidth="0.75" strokeDasharray="2 3" opacity="0.55">
        <line x1="348" y1="183" x2="428" y2="150"/>
        <line x1="340" y1="233" x2="428" y2="216"/>
        <line x1="313" y1="265" x2="428" y2="279"/>
      </g>

      {/* the quiet moment */}
      <g filter="url(#nac-shadow)">
        <rect x="424" y="306" width="266" height="86" rx="12" fill="var(--muted)" fillOpacity="0.5"/>
      </g>
      <text x="557" y="326" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" letterSpacing="1.2" fontWeight="700" fill="var(--muted-foreground)">THEN, IN A QUIET MOMENT</text>
      <text x="557" y="341" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontStyle="italic" fill="var(--foreground)" opacity="0.82">eventually the inhibition stops working —</text>
      <text x="557" y="352" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fontStyle="italic" fill="var(--foreground)" opacity="0.82">feelings slip through the cracks…</text>
      <text x="557" y="371" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11.5" fontStyle="italic" fontWeight="600" fill="var(--foreground)">“What&apos;s wrong with me —</text>
      <text x="557" y="385" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11.5" fontStyle="italic" fontWeight="600" fill="var(--foreground)">that I cannot feel?”</text>

      {/* the reframe */}
      <rect x="40" y="408" width="640" height="38" rx="10" fill="var(--sage)" fillOpacity="0.14" stroke="var(--sage)" strokeWidth="1.25"/>
      <text x="360" y="424" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" letterSpacing="1.2" fontWeight="700" fill="var(--sage)">THE CRACKS ARE THE GOOD NEWS</text>
      <text x="360" y="438" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--foreground)" opacity="0.85">
        what leaks in is feeling itself — resensitization has already begun
      </text>

      {/* bottom caption */}
      <text x="360" y="466" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
        The armor was never a character flaw — it was survival gear. We don&apos;t rip it off; we let it crack.
      </text>
    </svg>
  );
}
