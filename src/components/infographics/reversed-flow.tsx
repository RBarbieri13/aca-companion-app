"use client";

// The reversed flow of approval described in Trait 2:
// Healthy: parent -> approves -> child -> identity develops
// Reversed: child -> works to earn approval -> parent -> Game of Dissociation starts

interface Props { className?: string; }

export function ReversedFlow({ className }: Props) {
  return (
    <svg viewBox="0 0 520 300" className={className} role="img" aria-label="Healthy flow vs. reversed flow of approval">
      <defs>
        <marker id="arrow-healthy" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--sage)"/>
        </marker>
        <marker id="arrow-reversed" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--accent)"/>
        </marker>
      </defs>

      {/* HEALTHY FLOW - top half */}
      <g>
        <text x="130" y="20" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="600" letterSpacing="1.5" fill="var(--sage)">
          HEALTHY FLOW
        </text>
        {/* Parent */}
        <g>
          <circle cx="55" cy="65" r="22" fill="var(--primary)" fillOpacity="0.9"/>
          <text x="55" y="69" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11" fontWeight="600" fill="white">Parent</text>
        </g>
        {/* Arrow - parent approves child */}
        <path d="M 83 65 L 175 65" stroke="var(--sage)" strokeWidth="2.5" markerEnd="url(#arrow-healthy)"/>
        <text x="130" y="55" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fill="var(--sage)" fontWeight="600">approves</text>
        <text x="130" y="82" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">unconditionally</text>

        {/* Child */}
        <g>
          <circle cx="210" cy="65" r="18" fill="var(--sage)" fillOpacity="0.85"/>
          <text x="210" y="69" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="10" fontWeight="600" fill="var(--primary)">Child</text>
        </g>
        {/* Result */}
        <path d="M 232 65 L 300 65" stroke="var(--sage)" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" markerEnd="url(#arrow-healthy)"/>
        <g>
          <rect x="305" y="45" width="145" height="42" rx="10" fill="var(--sage)" fillOpacity="0.3" stroke="var(--sage)" strokeWidth="1.5"/>
          <text x="377" y="62" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11" fontWeight="600" fill="var(--primary)">Identity develops</text>
          <text x="377" y="77" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)">valued for who they are</text>
        </g>
      </g>

      {/* Divider */}
      <line x1="20" y1="130" x2="500" y2="130" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" opacity="0.7"/>

      {/* REVERSED FLOW - bottom half */}
      <g>
        <text x="130" y="160" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fontWeight="600" letterSpacing="1.5" fill="var(--accent)">
          REVERSED FLOW
        </text>
        {/* Parent - absent */}
        <g>
          <circle cx="55" cy="210" r="22" fill="var(--muted)" stroke="var(--muted-foreground)" strokeWidth="1.5" strokeDasharray="3 2"/>
          <text x="55" y="214" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11" fontWeight="600" fill="var(--muted-foreground)">Parent</text>
          <text x="55" y="244" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">emotionally absent</text>
        </g>
        {/* Reversed arrow - child works to earn */}
        <path d="M 175 210 L 83 210" stroke="var(--accent)" strokeWidth="2.5" markerEnd="url(#arrow-reversed)"/>
        <text x="130" y="200" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fill="var(--accent)" fontWeight="600">works to earn</text>
        <text x="130" y="227" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">performs, placates</text>

        {/* Child - performing */}
        <g>
          <circle cx="210" cy="210" r="18" fill="var(--accent)" fillOpacity="0.85"/>
          <text x="210" y="214" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="10" fontWeight="600" fill="white">Child</text>
        </g>
        {/* Result - Game of Dissociation */}
        <path d="M 232 210 L 300 210" stroke="var(--accent)" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" markerEnd="url(#arrow-reversed)"/>
        <g>
          <rect x="305" y="186" width="180" height="52" rx="10" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.5"/>
          <text x="395" y="203" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11" fontWeight="600" fontStyle="italic" fill="var(--accent)">Game of Dissociation</text>
          <text x="395" y="218" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)">true identity hidden</text>
          <text x="395" y="230" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)">from self and others</text>
        </g>
      </g>

      {/* Bottom caption */}
      <text x="260" y="280" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11" fontStyle="italic" fill="var(--foreground)" opacity="0.75">
        We lose an essential ingredient to healthy development —
      </text>
      <text x="260" y="294" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="11" fontStyle="italic" fill="var(--foreground)" opacity="0.75">
        to be valued for who we are.
      </text>
    </svg>
  );
}
