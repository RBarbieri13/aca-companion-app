"use client";

// Trait 4 — Other Laundry List quadrant.
// "We dominate others and abandon them before they can abandon us or we avoid relationships
// with dependent people altogether. To avoid being hurt, we isolate and dissociate and
// thereby abandon ourselves."
// Two opposite-looking strategies that converge on the same end: self-abandonment.

interface Props { className?: string; }

export function AbandonFirst({ className }: Props) {
  return (
    <svg viewBox="0 0 560 400" className={className} role="img" aria-label="Two strategies to avoid being hurt that both end in abandoning ourselves">
      <defs>
        <marker id="af-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)"/>
        </marker>
      </defs>

      {/* Title */}
      <text x="280" y="24" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">
        TWO WAYS TO NOT GET HURT
      </text>
      <text x="280" y="42" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontStyle="italic" fill="var(--muted-foreground)">
        &ldquo;before they can abandon us&rdquo;
      </text>

      {/* LEFT strategy — Dominate & abandon first */}
      <g>
        <rect x="30" y="66" width="220" height="150" rx="14" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.5"/>
        <text x="140" y="90" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1" fontWeight="700" fill="var(--accent)">
          STRATEGY 1 · DOMINATE
        </text>
        <text x="140" y="112" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="15" fontWeight="600" fill="var(--accent)">
          Abandon them first
        </text>
        {/* two figures, one pushing the other away */}
        <circle cx="108" cy="142" r="9" fill="var(--accent)" fillOpacity="0.9"/>
        <rect x="100" y="150" width="16" height="20" rx="5" fill="var(--accent)" fillOpacity="0.85"/>
        <path d="M 122 150 L 150 150" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" markerEnd="url(#af-arrow)"/>
        <circle cx="172" cy="142" r="7" fill="var(--muted-foreground)" fillOpacity="0.45"/>
        <rect x="165" y="149" width="14" height="17" rx="4" fill="var(--muted-foreground)" fillOpacity="0.4"/>
        <text x="140" y="190" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--foreground)" opacity="0.78">
          control the ebb and flow ·
        </text>
        <text x="140" y="203" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--foreground)" opacity="0.78">
          keep everyone at arm&apos;s length
        </text>
      </g>

      {/* RIGHT strategy — Avoid altogether */}
      <g>
        <rect x="310" y="66" width="220" height="150" rx="14" fill="var(--primary)" fillOpacity="0.08" stroke="var(--primary)" strokeWidth="1.5"/>
        <text x="420" y="90" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1" fontWeight="700" fill="var(--primary)">
          STRATEGY 2 · AVOID
        </text>
        <text x="420" y="112" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="15" fontWeight="600" fill="var(--primary)">
          Avoid them altogether
        </text>
        {/* lone figure inside a wall */}
        <rect x="402" y="128" width="36" height="44" rx="4" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="3 2"/>
        <circle cx="420" cy="144" r="8" fill="var(--primary)" fillOpacity="0.9"/>
        <rect x="413" y="151" width="14" height="18" rx="4" fill="var(--primary)" fillOpacity="0.85"/>
        <text x="420" y="190" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--foreground)" opacity="0.78">
          no relationships with
        </text>
        <text x="420" y="203" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--foreground)" opacity="0.78">
          dependent people · isolate
        </text>
      </g>

      {/* Converging arrows */}
      <path d="M 140 218 Q 160 250 250 268" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.5" markerEnd="url(#af-arrow)" opacity="0.6"/>
      <path d="M 420 218 Q 400 250 310 268" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.5" markerEnd="url(#af-arrow)" opacity="0.6"/>

      {/* Convergence — abandon ourselves */}
      <g>
        <rect x="150" y="276" width="260" height="100" rx="14" fill="var(--foreground)" fillOpacity="0.06" stroke="var(--foreground)" strokeOpacity="0.3" strokeWidth="1.5"/>
        <text x="280" y="300" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" letterSpacing="1.2" fontWeight="700" fill="var(--muted-foreground)">
          THE SAME END
        </text>
        <text x="280" y="324" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="17" fontStyle="italic" fontWeight="600" fill="var(--foreground)">
          We abandon ourselves
        </text>
        <text x="280" y="346" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--foreground)" opacity="0.8">
          isolate &amp; dissociate · build a false self
        </text>
        <text x="280" y="361" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)" fontStyle="italic">
          to hide our authentic needs and wants
        </text>
      </g>
    </svg>
  );
}
