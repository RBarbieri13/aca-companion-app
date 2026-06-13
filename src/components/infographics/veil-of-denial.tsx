"use client";

// Trait 5 — Flip Side of The Laundry List main graphic.
// "The veil of denial, which seemed like a thick, immovable tapestry, now seems like a sheer
// satin sheet easily moved by us when we are ready."
// Three panels: heavy tapestry → loosening weave → sheer satin sheet drawn aside, revealing
// the participant we have become.

interface Props { className?: string; }

export function VeilOfDenial({ className }: Props) {
  return (
    <svg viewBox="0 0 700 480" className={className} role="img" aria-label="The veil of denial moves from heavy tapestry to sheer satin sheet as recovery thins the weave, with what we start to see at each stage.">
      <defs>
        <pattern id="vd-tapestry" patternUnits="userSpaceOnUse" width="6" height="6">
          <rect width="6" height="6" fill="var(--muted-foreground)" fillOpacity="0.55"/>
          <path d="M 0 3 L 6 3 M 3 0 L 3 6" stroke="var(--foreground)" strokeWidth="0.4" opacity="0.5"/>
        </pattern>
        <pattern id="vd-loose" patternUnits="userSpaceOnUse" width="8" height="8">
          <rect width="8" height="8" fill="var(--muted-foreground)" fillOpacity="0.30"/>
          <path d="M 0 4 L 8 4 M 4 0 L 4 8" stroke="var(--foreground)" strokeWidth="0.35" opacity="0.35"/>
        </pattern>
        <pattern id="vd-sheer" patternUnits="userSpaceOnUse" width="10" height="10">
          <rect width="10" height="10" fill="var(--muted-foreground)" fillOpacity="0.10"/>
          <path d="M 0 5 L 10 5" stroke="var(--muted-foreground)" strokeWidth="0.25" opacity="0.5"/>
        </pattern>
        <marker id="vd-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--muted-foreground)"/>
        </marker>
      </defs>

      {/* Title */}
      <text x="350" y="22" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">
        THE WEAVE LOOSENS
      </text>
      <text x="350" y="40" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" fontStyle="italic" fill="var(--muted-foreground)">
        from thick tapestry to satin sheet — we move it when we are ready
      </text>

      {/* PANEL 1 — heavy tapestry */}
      <g>
        {/* rod */}
        <line x1="30" y1="64" x2="220" y2="64" stroke="var(--muted-foreground)" strokeWidth="1.5"/>
        <rect x="40" y="66" width="170" height="200" fill="url(#vd-tapestry)" stroke="var(--muted-foreground)" strokeWidth="1.25"/>
        {/* a faint silhouette behind, barely visible */}
        <circle cx="125" cy="160" r="20" fill="var(--accent)" fillOpacity="0.10"/>

        <text x="125" y="294" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--accent)">
          Heavy tapestry
        </text>
        <text x="125" y="312" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
          “thick &amp; immovable”
        </text>
        <text x="125" y="326" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">
          we cannot see what is true
        </text>
      </g>

      {/* arrow 1 */}
      <g>
        <line x1="236" y1="166" x2="266" y2="166" stroke="var(--muted-foreground)" strokeWidth="1.25" markerEnd="url(#vd-arrow)"/>
        <text x="251" y="156" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">Steps · meetings</text>
      </g>

      {/* PANEL 2 — loosening weave */}
      <g>
        <line x1="278" y1="64" x2="438" y2="64" stroke="var(--muted-foreground)" strokeWidth="1.5"/>
        <rect x="288" y="66" width="140" height="200" fill="url(#vd-loose)" stroke="var(--muted-foreground)" strokeWidth="1" strokeDasharray="3 2"/>
        {/* clearer silhouette */}
        <circle cx="358" cy="148" r="18" fill="var(--sage)" fillOpacity="0.45"/>
        <rect x="346" y="166" width="24" height="34" rx="7" fill="var(--sage)" fillOpacity="0.4"/>

        <text x="358" y="294" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--muted-foreground)">
          Loosening
        </text>
        <text x="358" y="312" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
          we begin to see through
        </text>
        <text x="358" y="326" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">
          “this is happening — and I am here”
        </text>
      </g>

      {/* arrow 2 */}
      <g>
        <line x1="450" y1="166" x2="480" y2="166" stroke="var(--muted-foreground)" strokeWidth="1.25" markerEnd="url(#vd-arrow)"/>
        <text x="465" y="156" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8" fill="var(--muted-foreground)" fontStyle="italic">honest sharing</text>
      </g>

      {/* PANEL 3 — satin sheet drawn aside */}
      <g>
        <line x1="492" y1="64" x2="680" y2="64" stroke="var(--muted-foreground)" strokeWidth="1.5"/>
        {/* satin pulled to one side */}
        <path d="M 502 66 L 522 66 L 540 266 L 502 266 Z" fill="url(#vd-sheer)" stroke="var(--muted-foreground)" strokeWidth="0.75" opacity="0.85"/>
        {/* clear figure (participant) */}
        <circle cx="610" cy="148" r="20" fill="var(--sage)" fillOpacity="0.85"/>
        <rect x="595" y="170" width="30" height="44" rx="9" fill="var(--sage)" fillOpacity="0.8"/>
        {/* a small raised hand — claiming participation */}
        <path d="M 622 174 L 638 158" stroke="var(--sage)" strokeWidth="2.5" strokeLinecap="round"/>

        <text x="600" y="294" textAnchor="middle" fontFamily="var(--font-fraunces)" fontSize="13" fontWeight="600" fill="var(--sage)">
          Satin sheet
        </text>
        <text x="600" y="312" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
          “easily moved by us, when ready”
        </text>
        <text x="600" y="326" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--muted-foreground)">
          a participant in our own life
        </text>
      </g>

      {/* What we start to see at each stage */}
      <g>
        <text x="350" y="368" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="10" letterSpacing="1.5" fontWeight="700" fill="var(--muted-foreground)">
          WHAT WE START TO SEE
        </text>

        {/* panel 1 column */}
        <g>
          <text x="125" y="394" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fontWeight="700" fill="var(--muted-foreground)" letterSpacing="0.5">
            BEHIND THE TAPESTRY
          </text>
          <g fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--foreground)" opacity="0.78">
            <text x="125" y="414" textAnchor="middle">· nothing — at first</text>
            <text x="125" y="428" textAnchor="middle">· “this is just how things are”</text>
            <text x="125" y="442" textAnchor="middle">· vague unease without a name</text>
          </g>
        </g>

        {/* panel 2 column */}
        <g>
          <text x="358" y="394" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fontWeight="700" fill="var(--muted-foreground)" letterSpacing="0.5">
            THROUGH THE LOOSENING
          </text>
          <g fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--foreground)" opacity="0.78">
            <text x="358" y="414" textAnchor="middle">· “oh — I&apos;ve done this before”</text>
            <text x="358" y="428" textAnchor="middle">· patterns repeating</text>
            <text x="358" y="442" textAnchor="middle">· my part in the story</text>
          </g>
        </g>

        {/* panel 3 column */}
        <g>
          <text x="600" y="394" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="8.5" fontWeight="700" fill="var(--sage)" letterSpacing="0.5">
            ONCE THE SATIN MOVES
          </text>
          <g fontFamily="var(--font-inter)" fontSize="8.5" fill="var(--foreground)" opacity="0.78">
            <text x="600" y="414" textAnchor="middle">· choices I can make</text>
            <text x="600" y="428" textAnchor="middle">· power I already have</text>
            <text x="600" y="442" textAnchor="middle">· a life I am inside</text>
          </g>
        </g>
      </g>

      <text x="350" y="468" textAnchor="middle" fontFamily="var(--font-inter)" fontSize="9" fill="var(--muted-foreground)" fontStyle="italic">
        We don&apos;t tear the veil down. We let recovery thin it.
      </text>
    </svg>
  );
}
