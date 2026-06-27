"use client";

import { motion } from "framer-motion";

// Trait 6 — Other Laundry List quadrant (UPGRADED).
// "We are irresponsible and self-centered. Our inflated sense of self-worth and
// self-importance prevents us from seeing our deficiencies and shortcomings."
// An inflated bubble of self-importance acts as a shield: it deflects the very feedback
// (deficiencies, shortcomings) that would let us see ourselves clearly.

interface Props { className?: string; }

export function InflatedSelfShield({ className }: Props) {
  const deflected = [
    { label: "a deficiency", angle: -140 },
    { label: "a shortcoming", angle: -100 },
    { label: "honest feedback", angle: 100 },
    { label: "my part in it", angle: 140 },
  ];
  const cx = 300, cy = 250, r = 96;

  return (
    <svg viewBox="0 0 600 470" className={className} role="img" aria-label="An inflated bubble of self-importance acting as a shield that deflects feedback about our deficiencies and shortcomings.">
      <defs>
        <radialGradient id="iss-bubble" cx="42%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#D4A84B" stopOpacity="0.45"/>
          <stop offset="60%" stopColor="#D4A84B" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#D4A84B" stopOpacity="0.08"/>
        </radialGradient>
        <filter id="iss-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.10"/>
        </filter>
      </defs>

      {/* Title */}
      <text x="300" y="26" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10.5" letterSpacing="1.6" fontWeight="700" fill="var(--muted-foreground)">
        THE INFLATED SHIELD
      </text>
      <text x="300" y="44" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontStyle="italic" fill="var(--muted-foreground)">
        self-importance deflects what would help us see clearly
      </text>

      {/* the inflated bubble, gently breathing */}
      <motion.g
        initial={{ scale: 0.96 }}
        animate={{ scale: [0.97, 1.02, 0.97] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: "300px", originY: "250px" }}
      >
        <circle cx={cx} cy={cy} r={r + 16} fill="url(#iss-bubble)" stroke="#D4A84B" strokeWidth="1.5" strokeOpacity="0.6"/>
        {/* highlight */}
        <ellipse cx={cx - 34} cy={cy - 40} rx="22" ry="13" fill="#fff" fillOpacity="0.35"/>
      </motion.g>

      {/* inner self, comfortably hidden */}
      <g filter="url(#iss-shadow)">
        <circle cx={cx} cy={cy - 6} r="15" fill="var(--primary)" fillOpacity="0.9"/>
        <rect x={cx - 14} y={cy + 8} width="28" height="36" rx="9" fill="var(--primary)" fillOpacity="0.85"/>
      </g>
      <text x={cx} y={cy + 70} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="700" fill="var(--primary)" letterSpacing="0.5">
        INFLATED SELF
      </text>
      <text x={cx} y={cy + 84} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">
        “self-worth &amp; self-importance”
      </text>

      {/* deflected feedback bouncing off the shield */}
      {deflected.map((d) => {
        const rad = (d.angle * Math.PI) / 180;
        const sx = cx + Math.cos(rad) * 170;
        const sy = cy + Math.sin(rad) * 130;
        const hx = cx + Math.cos(rad) * (r + 18);
        const hy = cy + Math.sin(rad) * (r + 14);
        // reflection point continues to a deflected angle
        const dx = cx + Math.cos(rad + 0.5) * 175;
        const dy = cy + Math.sin(rad + 0.5) * 135;
        const labelX = cx + Math.cos(rad) * 192;
        const labelY = cy + Math.sin(rad) * 142;
        return (
          <g key={d.label}>
            {/* incoming */}
            <line x1={sx} y1={sy} x2={hx} y2={hy} stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 3"/>
            {/* deflected away */}
            <line x1={hx} y1={hy} x2={dx} y2={dy} stroke="var(--accent)" strokeWidth="1.25" opacity="0.55"/>
            {/* impact spark */}
            <circle cx={hx} cy={hy} r="3" fill="var(--accent)"/>
            <text x={labelX} y={labelY} textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--accent)" fontWeight="600">
              {d.label}
            </text>
          </g>
        );
      })}

      {/* the two faces of the trait — labels */}
      <g>
        <rect x="40" y="392" width="240" height="58" rx="12" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.5"/>
        <text x="160" y="414" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1" fontWeight="700" fill="var(--accent)">IRRESPONSIBLE · SELF-CENTERED</text>
        <text x="160" y="432" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--foreground)" opacity="0.78">“if people just took care of themselves,</text>
        <text x="160" y="444" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--foreground)" opacity="0.78">everybody would be okay”</text>

        <rect x="320" y="392" width="240" height="58" rx="12" fill="var(--primary)" fillOpacity="0.06" stroke="var(--primary)" strokeWidth="1" strokeOpacity="0.5"/>
        <text x="440" y="414" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1" fontWeight="700" fill="var(--primary)">THE COST</text>
        <text x="440" y="432" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--foreground)" opacity="0.78">we stand too close to the false self</text>
        <text x="440" y="444" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--foreground)" opacity="0.78">to see our own shortcomings</text>
      </g>
    </svg>
  );
}
