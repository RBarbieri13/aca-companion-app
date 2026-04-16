"use client";

interface Props { className?: string; }

export function FalseSelfLayers({ className }: Props) {
  return (
    <svg viewBox="0 0 340 300" className={className} role="img" aria-label="The False Self and True Self layers">
      <circle cx="170" cy="150" r="125" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="6 3"/>
      <circle cx="170" cy="150" r="90" fill="var(--muted)" fillOpacity="0.7" stroke="var(--border)" strokeWidth="1"/>
      <circle cx="170" cy="150" r="50" fill="var(--sage)" fillOpacity="0.35" stroke="var(--primary)" strokeWidth="1.5"/>

      <g fontFamily="var(--font-inter)" fontWeight="600">
        <text x="170" y="52" textAnchor="middle" fontSize="10" fill="var(--accent)" letterSpacing="1.5">FALSE SELF</text>
        <text x="170" y="65" textAnchor="middle" fontSize="9" fill="var(--muted-foreground)" fontWeight="400" fontStyle="italic">hero · martyr · performer</text>
      </g>

      <g fontFamily="var(--font-inter)">
        <text x="170" y="100" textAnchor="middle" fontSize="9" fill="var(--muted-foreground)" fontWeight="600" letterSpacing="1">SURVIVAL MOVES</text>
        <text x="170" y="112" textAnchor="middle" fontSize="8" fill="var(--muted-foreground)">people pleaser · controller</text>
        <text x="170" y="122" textAnchor="middle" fontSize="8" fill="var(--muted-foreground)">hypervigilance · decisiveness</text>
      </g>

      <g fontFamily="var(--font-fraunces)">
        <text x="170" y="152" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--primary)" fontStyle="italic">True Self</text>
        <text x="170" y="170" textAnchor="middle" fontSize="9" fontFamily="var(--font-inter)" fill="var(--muted-foreground)">buried, not erased</text>
      </g>

      <g fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)">
        <path d="M 95 50 L 115 90" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" fill="none"/>
        <text x="55" y="45" fontSize="10" fill="var(--accent)" fontWeight="600">What they see</text>

        <path d="M 248 240 L 230 210" stroke="var(--primary)" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" fill="none"/>
        <text x="215" y="262" fontSize="10" fill="var(--primary)" fontWeight="600">What&apos;s underneath</text>
      </g>
    </svg>
  );
}
