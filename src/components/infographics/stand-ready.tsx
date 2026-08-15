"use client";

import { motion } from "framer-motion";

// Trait 9 — Flip Side of the Other Laundry List supplement.
// "No longer compelled to rush into the flames of discord or desperation; we stand ready
// for those who might turn to us and ask for help or direction."
// With gratitude and love we share the pilgrimage — a call, a book, an article, an ACA
// flier found in the street seemingly by coincidence: an invitation to a lifetime
// spiritual quest.

interface Props { className?: string; }

export function StandReady({ className }: Props) {
  return (
    <svg viewBox="0 0 680 520" className={className} role="img" aria-label="Flames of discord on one side; the recovered figure stands ready at the edge with lantern raised and hand open, while small tokens of invitation — a phone call, a book, an article, an ACA flier — line a path toward a lifetime spiritual quest.">
      <defs>
        <filter id="sr-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.12"/>
        </filter>
        <radialGradient id="sr-lantern" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C08A2D" stopOpacity="0.55"/>
          <stop offset="100%" stopColor="#C08A2D" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="sr-quest" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--sage)" stopOpacity="0.45"/>
          <stop offset="100%" stopColor="var(--sage)" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Title */}
      <text x="340" y="22" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">
        STANDING READY
      </text>
      <text x="340" y="40" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontStyle="italic" fill="var(--muted-foreground)">
        no longer compelled to rush into the flames
      </text>

      {/* LEFT — the flames of discord & desperation */}
      <g>
        <motion.g
          animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "110px", originY: "300px" }}
        >
          <path d="M 70 300 C 62 268, 84 252, 78 226 C 100 244, 96 262, 94 274 C 106 258, 104 240, 100 224 C 122 246, 126 274, 118 300 Z" fill="var(--accent)" fillOpacity="0.75"/>
          <path d="M 110 300 C 104 276, 122 264, 118 244 C 136 260, 130 276, 130 284 C 140 272, 138 256, 136 246 C 152 264, 154 284, 148 300 Z" fill="#C08A2D" fillOpacity="0.8"/>
        </motion.g>
        <motion.g
          animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0.95, 0.6] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
          style={{ originX: "150px", originY: "300px" }}
        >
          <path d="M 150 300 C 146 282, 158 274, 156 260 C 168 272, 164 284, 163 290 C 170 280, 169 270, 167 262 C 178 276, 179 290, 174 300 Z" fill="var(--accent)" fillOpacity="0.6"/>
        </motion.g>
        <text x="122" y="326" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fontWeight="700" letterSpacing="0.5" fill="var(--accent)">
          THE FLAMES
        </text>
        <text x="122" y="339" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
          discord · desperation
        </text>
      </g>

      {/* the edge — a restraint line the figure no longer crosses compulsively */}
      <line x1="212" y1="212" x2="212" y2="308" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 4"/>
      <text x="212" y="200" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" letterSpacing="1" fontWeight="700" fill="var(--muted-foreground)">
        THE EDGE
      </text>
      <text x="212" y="322" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--muted-foreground)" fontStyle="italic">
        we stand — we do not rush
      </text>

      {/* CENTER — the recovered figure, lantern raised, hand open */}
      <g>
        {/* lantern glow */}
        <motion.circle
          cx="330" cy="192" r="54" fill="url(#sr-lantern)"
          animate={{ scale: [0.85, 1.15, 0.85], opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "330px", originY: "192px" }}
        />
        {/* lantern */}
        <g filter="url(#sr-shadow)">
          <rect x="322" y="182" width="16" height="20" rx="3" fill="none" stroke="#C08A2D" strokeWidth="2"/>
          <path d="M 326 182 Q 330 174 334 182" fill="none" stroke="#C08A2D" strokeWidth="1.5"/>
          <motion.circle
            cx="330" cy="192" r="4" fill="#C08A2D"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>
        {/* figure */}
        <circle cx="292" cy="228" r="14" fill="var(--sage)"/>
        <rect x="277" y="244" width="30" height="52" rx="10" fill="var(--sage)" fillOpacity="0.85" filter="url(#sr-shadow)"/>
        {/* arm raising the lantern */}
        <path d="M 306 252 L 328 206" stroke="var(--sage)" strokeWidth="3.5" strokeLinecap="round"/>
        {/* open hand toward the path */}
        <path d="M 278 262 L 250 274" stroke="var(--sage)" strokeWidth="3" strokeLinecap="round"/>
        <g stroke="var(--sage)" strokeWidth="1.5" strokeLinecap="round">
          <path d="M 250 274 L 243 270"/>
          <path d="M 250 274 L 242 275"/>
          <path d="M 250 274 L 244 280"/>
        </g>
        <text x="292" y="318" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="700" letterSpacing="0.5" fill="var(--sage)">
          STANDING READY
        </text>
        <g fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
          <text x="292" y="332" textAnchor="middle">lantern raised · hand open —</text>
          <text x="292" y="344" textAnchor="middle">for those who turn and ask</text>
        </g>
      </g>

      {/* RIGHT — the path of small invitations */}
      <g>
        {/* winding dotted path */}
        <path d="M 340 300 C 400 296, 420 264, 468 252 C 516 240, 540 208, 584 176" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.5" strokeDasharray="1 7" strokeLinecap="round" opacity="0.8"/>

        {/* token: a phone call */}
        <g transform="translate(384, 288)">
          <path d="M -6 -8 C -1 -12, 2 -10, 3 -6 L 0 -3 C 2 1, 5 4, 9 6 L 12 3 C 16 4, 18 7, 14 12 C 6 12, -8 -1, -6 -8 Z" fill="#C08A2D" fillOpacity="0.85" filter="url(#sr-shadow)"/>
          <text x="4" y="30" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--foreground)" opacity="0.8">a phone call</text>
        </g>

        {/* token: a book */}
        <g transform="translate(452, 250)">
          <path d="M -12 -6 C -6 -10, -1 -10, 0 -7 C 1 -10, 6 -10, 12 -6 L 12 8 C 6 4, 1 4, 0 7 C -1 4, -6 4, -12 8 Z" fill="var(--primary)" fillOpacity="0.85" filter="url(#sr-shadow)"/>
          <line x1="0" y1="-7" x2="0" y2="7" stroke="var(--card)" strokeWidth="1"/>
          <text x="0" y="28" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--foreground)" opacity="0.8">a book</text>
        </g>

        {/* token: an article */}
        <g transform="translate(516, 216)">
          <rect x="-9" y="-11" width="18" height="22" rx="2" fill="var(--card)" stroke="#8B7BA8" strokeWidth="1.5" filter="url(#sr-shadow)"/>
          <g stroke="#8B7BA8" strokeWidth="1" opacity="0.7">
            <line x1="-5" y1="-5" x2="5" y2="-5"/>
            <line x1="-5" y1="0" x2="5" y2="0"/>
            <line x1="-5" y1="5" x2="1" y2="5"/>
          </g>
          <text x="0" y="28" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--foreground)" opacity="0.8">an article</text>
        </g>

        {/* token: the flier in the street */}
        <g transform="translate(578, 182)">
          <motion.g
            animate={{ rotate: [-6, 5, -6], y: [0, 3, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: "0px", originY: "0px" }}
          >
            <g transform="rotate(-10)">
              <rect x="-10" y="-13" width="20" height="26" rx="2" fill="var(--card)" stroke="var(--accent)" strokeWidth="1.5" filter="url(#sr-shadow)"/>
              <text x="0" y="-2" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="6" fontWeight="700" fill="var(--accent)">ACA</text>
              <line x1="-5" y1="4" x2="5" y2="4" stroke="var(--accent)" strokeWidth="1" opacity="0.7"/>
              <line x1="-5" y1="8" x2="3" y2="8" stroke="var(--accent)" strokeWidth="1" opacity="0.7"/>
            </g>
          </motion.g>
          <text x="0" y="32" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7.5" fill="var(--foreground)" opacity="0.8">a flier in the street</text>
          <text x="0" y="44" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="7" fill="var(--muted-foreground)" fontStyle="italic">&ldquo;seemingly by coincidence&rdquo;</text>
        </g>

        {/* the horizon — the quest */}
        <motion.circle
          cx="618" cy="128" r="40" fill="url(#sr-quest)"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx="618" cy="128" r="9" fill="var(--sage)" fillOpacity="0.9"/>
        <g fontFamily="var(--font-inter)" fontSize="8" fontWeight="700" fill="var(--sage)" letterSpacing="0.5">
          <text x="618" y="86" textAnchor="middle">A LIFETIME</text>
          <text x="618" y="98" textAnchor="middle">SPIRITUAL QUEST</text>
        </g>
      </g>

      {/* ground line */}
      <path d="M 48 300 Q 240 306 400 300 T 648 288" fill="none" stroke="var(--border)" strokeWidth="1.25" opacity="0.8"/>

      {/* bottom panel */}
      <g>
        <rect x="60" y="376" width="560" height="84" rx="14" fill="var(--sage)" fillOpacity="0.14" stroke="var(--sage)" strokeWidth="1.5" filter="url(#sr-shadow)"/>
        <text x="80" y="400" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--sage)">
          WHAT WE OFFER INSTEAD OF RESCUE
        </text>
        <text x="80" y="422" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.88">
          With gratitude and love, we share our pilgrimage into family-of-origin work —
        </text>
        <text x="80" y="440" fontFamily="var(--font-inter)" fontSize="9.5" fill="var(--foreground)" opacity="0.88">
          and leave the invitation where a searching hand can find it.
        </text>
      </g>

      {/* bottom caption */}
      <text x="340" y="492" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
        The lantern is not for pulling anyone out. It is so the way out can be seen by whoever turns to look.
      </text>
    </svg>
  );
}
