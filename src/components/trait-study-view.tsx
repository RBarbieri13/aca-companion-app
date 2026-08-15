"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ReflectionCard } from "@/components/reflection-card";
import { ConceptsAccordion } from "@/components/concepts-accordion";
import { QUADRANT_LABELS } from "@/data/traits";
import type { Trait, ReflectionQuestion, Quadrant } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { QuadrantDiagram } from "@/components/infographics/quadrant-diagram";
import { DissociationCycle } from "@/components/infographics/dissociation-cycle";
import { FalseSelfLayers } from "@/components/infographics/false-self-layers";
import { RecoveryArc } from "@/components/infographics/recovery-arc";
import { AuthenticConnection } from "@/components/infographics/authentic-connection";
import { ReversedFlow } from "@/components/infographics/reversed-flow";
import { IdentityPendulum } from "@/components/infographics/identity-pendulum";
import { IdentityCompass } from "@/components/infographics/identity-compass";
import { SanctuaryToBridge } from "@/components/infographics/sanctuary-to-bridge";
import { RelationalPatternsTable } from "@/components/infographics/relational-patterns-table";
import { InsideDrugs } from "@/components/infographics/inside-drugs";
import { AngerPendulum } from "@/components/infographics/anger-pendulum";
import { SensesGrounding } from "@/components/infographics/senses-grounding";
import { SoberListening } from "@/components/infographics/sober-listening";
import { GameOfDissociation } from "@/components/infographics/game-of-dissociation";
import { CompulsionMagnet } from "@/components/infographics/compulsion-magnet";
import { AbandonFirst } from "@/components/infographics/abandon-first";
import { BrokenCycle } from "@/components/infographics/broken-cycle";
import { ReclaimingTheChild } from "@/components/infographics/reclaiming-the-child";
import { AbandonmentGame } from "@/components/infographics/abandonment-game";
import { AbandonmentStrategiesTable } from "@/components/infographics/abandonment-strategies-table";
import { PowerPendulum } from "@/components/infographics/power-pendulum";
import { VictimizerLure } from "@/components/infographics/victimizer-lure";
import { VeilOfDenial } from "@/components/infographics/veil-of-denial";
import { HumbleParticipation } from "@/components/infographics/humble-participation";
import { FourRoleGame } from "@/components/infographics/four-role-game";
import { FourRoleTable } from "@/components/infographics/four-role-table";
import { AloneInQuiet } from "@/components/infographics/alone-in-quiet";
import { PowerLadder } from "@/components/infographics/power-ladder";
import { SelfTalkSpectrum } from "@/components/infographics/self-talk-spectrum";
import { OverResponsibilityEngine } from "@/components/infographics/over-responsibility-engine";
import { InflatedSelfShield } from "@/components/infographics/inflated-self-shield";
import { InferiorityGrandiosityPendulum } from "@/components/infographics/inferiority-grandiosity-pendulum";
import { EnablingEnergyLoop } from "@/components/infographics/enabling-energy-loop";
import { InventoryToTrueSelf } from "@/components/infographics/inventory-to-true-self";
import { ResponsibilityPatternsTable } from "@/components/infographics/responsibility-patterns-table";
import { GuiltAlarmCircuit } from "@/components/infographics/guilt-alarm-circuit";
import { PreemptiveScan } from "@/components/infographics/preemptive-scan";
import { AssertionStancesTable } from "@/components/infographics/assertion-stances-table";
import { GuiltTripToolkit } from "@/components/infographics/guilt-trip-toolkit";
import { GuiltSeesaw } from "@/components/infographics/guilt-seesaw";
import { InnerCompassVoyage } from "@/components/infographics/inner-compass-voyage";
import { RaftToShip } from "@/components/infographics/raft-to-ship";
import { EncouragementRipple } from "@/components/infographics/encouragement-ripple";
import { ExcitementThermostat } from "@/components/infographics/excitement-thermostat";
import { BodyStaticMap } from "@/components/infographics/body-static-map";
import { ExcitementRolesTable } from "@/components/infographics/excitement-roles-table";
import { NumbArmorCracks } from "@/components/infographics/numb-armor-cracks";
import { ExcitementNumbPendulum } from "@/components/infographics/excitement-numb-pendulum";
import { UpsetToWorkable } from "@/components/infographics/upset-to-workable";
import { ExcitementDiscernmentTable } from "@/components/infographics/excitement-discernment-table";
import { ResensitizationPath } from "@/components/infographics/resensitization-path";
import { MixedSignalsMirror } from "@/components/infographics/mixed-signals-mirror";
import { EmptinessWell } from "@/components/infographics/emptiness-well";
import { LovePityTable } from "@/components/infographics/love-pity-table";
import { NeedinessRecoil } from "@/components/infographics/neediness-recoil";
import { LoseLoseOasis } from "@/components/infographics/lose-lose-oasis";
import { StrongChildMask } from "@/components/infographics/strong-child-mask";
import { DimmerSwitch } from "@/components/infographics/dimmer-switch";
import { DramaTriangleMap } from "@/components/infographics/drama-triangle-map";
import { StandReady } from "@/components/infographics/stand-ready";

const QUADRANT_ORDER: Quadrant[] = ["laundry", "other", "flipSide", "flipSideOther"];

type GraphicEntry = {
  Component: React.ComponentType<{ className?: string }>;
  caption: string;
  /** Optional: a second graphic to include below the primary one. */
  supplements?: Array<{
    Component: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
  }>;
};

// Trait-1 graphics serve as the default when a trait doesn't have its own.
const DEFAULT_QUADRANT_GRAPHIC: Record<Quadrant, GraphicEntry> = {
  laundry: {
    Component: DissociationCycle,
    caption:
      "The wound runs as a loop — isolation feeds fear, which deepens separation, which returns to isolation.",
  },
  other: {
    Component: FalseSelfLayers,
    caption:
      "To cover the fear, we armor up. The authority, the controller — these are the outer layers. The True Self stays buried, not erased.",
  },
  flipSide: {
    Component: RecoveryArc,
    caption:
      "Recovery is not a switch. It is a daily arc: admit the effect, work the Steps, practice reparenting, respond instead of react.",
  },
  flipSideOther: {
    Component: AuthenticConnection,
    caption:
      "Engaged, not controlling. We can hold our power and position without shrinking anyone around us.",
  },
};

const TRAIT_QUADRANT_GRAPHICS: Record<number, Partial<Record<Quadrant, GraphicEntry>>> = {
  2: {
    laundry: {
      Component: ReversedFlow,
      caption:
        "When a parent can't give approval, the current reverses. The child learns to earn it — and the Game of Dissociation begins. True identity is hidden, first from others, then from the self.",
    },
    other: {
      Component: IdentityPendulum,
      caption:
        "Terrified of being swallowed by enmeshment, we swing the other way — rigid self-sufficiency, disdaining approval. Both poles leave the self behind. The True Self lives at the still center.",
      supplements: [
        {
          Component: RelationalPatternsTable,
          title: "Three patterns that abandon the self",
          description:
            "Enmeshment, codependency, and disengagement look different but share a root: our needs don't get named or met. Compare them side by side across boundaries, emotional needs, independence, identity, and what each one looks like in everyday life.",
        },
      ],
    },
    flipSide: {
      Component: IdentityCompass,
      caption:
        "We carry our own compass now. Other people's opinions, labels, and expectations are still heard — but they do not redirect the needle.",
    },
    flipSideOther: {
      Component: SanctuaryToBridge,
      caption:
        "The walls that kept us safe became the walls that kept us alone. We build a bridge out — not into enmeshment, but into a fellowship that accepts us as we are.",
    },
  },
  3: {
    laundry: {
      Component: InsideDrugs,
      caption:
        "The trauma was too much for a tiny body, so we dosed ourselves with worry, fear, and pain — cortisol, adrenaline, melatonin. The feelings went numb, and the loop has been running ever since.",
    },
    other: {
      Component: AngerPendulum,
      caption:
        "Some of us flipped from avoider to aggressor — \"if we can't beat them, we'll join them.\" Cutting \"helpful\" criticism and contempt are loudest when the target reminds us of our own buried vulnerabilities.",
      supplements: [
        {
          Component: GameOfDissociation,
          title: "Trait 3 in one frame",
          description:
            "Both poles, the chemistry that powers each, the wound at the center, and the recovery move out of each — side by side. A useful map when you can't tell which position you're in.",
        },
      ],
    },
    flipSide: {
      Component: SensesGrounding,
      caption:
        "When the fear floods, the workbook offers a simple orientation. Look, listen, taste, smell, touch. Each sense tells the body: this is now, I am no longer small. Then the criticism stops being a threat.",
    },
    flipSideOther: {
      Component: SoberListening,
      caption:
        "Renewed True Self esteem leaves the false self with nothing to defend. We can hear the anger, sit with the criticism, take responsibility where it applies — and where it doesn't, let it fly.",
    },
  },
  4: {
    laundry: {
      Component: CompulsionMagnet,
      caption:
        "We don't pick the unavailable by accident. The unmet abandonment need works like a magnet for alcoholics, workaholics, rageaholics — anyone whose compulsion keeps them at arm's length, so the old abandonment can feel like home.",
      supplements: [
        {
          Component: AbandonmentStrategiesTable,
          title: "Four ways the trait gets acted out",
          description:
            "Becoming the compulsive one, marrying one, leaving first, or avoiding closeness altogether — they look different but share a root. Compare the move, the fear underneath, what it costs, and the recovery turn for each.",
        },
      ],
    },
    other: {
      Component: AbandonFirst,
      caption:
        "Two opposite-looking moves — dominate and leave first, or avoid closeness altogether. Both are ways to not get hurt, and both arrive at the same place: isolating, dissociating, and abandoning ourselves.",
      supplements: [
        {
          Component: AbandonmentGame,
          title: "Trait 4 in one frame",
          description:
            "The Game of Dissociation has three seats — rescuer, victim (the abandoned of The Laundry List), and victimizer (the abandoner of The Other Laundry List). They rotate so we never feel the wound at the center. The exit is to stop playing and comfort the child.",
        },
      ],
    },
    flipSide: {
      Component: BrokenCycle,
      caption:
        "An emotional inventory of how we bond shows us exactly where we recreate and recycle abandonment. Naming the loop is what cuts it — and a new path opens, where we can be true to ourselves and choose people who are actually available.",
    },
    flipSideOther: {
      Component: ReclaimingTheChild,
      caption:
        "The deepest move of Trait 4: the loving parent crosses back to the child it abandoned and stays. As that bond forms, the fears of being engulfed or annihilated shrink, and true intimacy becomes possible — first with our True Self, then with others.",
    },
  },
  5: {
    laundry: {
      Component: PowerPendulum,
      caption:
        "Trait 5 is, at its core, about power. As children we grew up feeling disempowered — \"blown about by the winds of the times.\" The Other Laundry List is the over-correction: \"determined to be among the winners,\" we exercise power beyond the requirements of the situation. Humble participation is the still center.",
      supplements: [
        {
          Component: FourRoleTable,
          title: "The four roles in one frame",
          description:
            "The workbook names them precisely — victim, victimizer, rescuer I, rescuer II — and reminds us there is no admission fee. Compare the move, what feels true, what it costs, and the recovery turn for each.",
        },
      ],
    },
    other: {
      Component: VictimizerLure,
      caption:
        "The Other Laundry List is unusually specific in Trait 5: we are intrigued by the under-educated, the impaired, the lost, the newcomer — anyone whose disadvantage produces a powerful surge of recognition when we help. That surge is the drug. We keep choosing people who will keep the loop running.",
      supplements: [
        {
          Component: FourRoleGame,
          title: "Trait 5 in one frame",
          description:
            "All four seats around the avoided wound, plus the exit into humble participation and the inner partnership — loving parent, critical survival parent, Inner Child, and Higher Power — that makes the new question possible.",
        },
      ],
    },
    flipSide: {
      Component: VeilOfDenial,
      caption:
        "The workbook's most beautiful image: the veil of denial once seemed like a thick, immovable tapestry; now it is a sheer satin sheet, easily moved by us when we are ready. We stop viewing life from the perspective of what is happening to us, and become a participant in our own life.",
      supplements: [
        {
          Component: PowerLadder,
          title: "The power ladder · incremental but progressive",
          description:
            "The workbook promises that ACA meetings, honest sharing, and after-meeting conversations give us opportunities to exercise greater power in incremental but progressive ways. Here is what \"incremental\" actually looks like — ten ordinary rungs, ordered from accessible to advanced. Start anywhere. Climb the way you brush your teeth.",
        },
        {
          Component: SelfTalkSpectrum,
          title: "The self-talk spectrum",
          description:
            "Laundry List Q4 asks for the phrases that swirl around in a victim's head. Flip Side Q3 asks for the self-talk you practice as a daily habit. Same situation, two voices inside. The Self-Talk Rewriter exercise builds your personal column on the right.",
        },
      ],
    },
    flipSideOther: {
      Component: HumbleParticipation,
      caption:
        "A small move with enormous reach: instead of \"How can I dominate?\" we ask \"How can I humbly participate?\" Backed by the inner partnership of loving parent, critical survival parent, Inner Child, and Higher Power — so that when someone walks away, we no longer resist, and we comfort the Inner Child instead.",
      supplements: [
        {
          Component: AloneInQuiet,
          title: "Being alone, in silence, with nothing happening",
          description:
            "The Flip Side of Other asks: how does alone feel — in childhood, before ACA, now? Are you in quiet, or surrounded by activities? Three modes show the skill being built: many activities → noticing → alone in quiet.",
        },
      ],
    },
  },
  6: {
    laundry: {
      Component: OverResponsibilityEngine,
      caption:
        "We carried an adult-sized load as children — managing moods, raising siblings, keeping the peace — and never put it down. Being concerned with others stays easier than being concerned with ourselves, and that outward focus quietly keeps the mirror turned away from our own faults.",
      supplements: [
        {
          Component: ResponsibilityPatternsTable,
          title: "Three postures of responsibility",
          description:
            "Over-responsible, self-centered, and right-sized look very different but the first two share a root. Compare them across focus, what's underneath, what each avoids, where the energy goes, and the recovery turn.",
        },
      ],
    },
    other: {
      Component: InflatedSelfShield,
      caption:
        "The opposite-looking face of the same trait: irresponsibility and self-centeredness. An inflated sense of self-worth and self-importance works like a shield — it deflects the very feedback (our deficiencies and shortcomings) that would let us see ourselves clearly.",
      supplements: [
        {
          Component: InferiorityGrandiosityPendulum,
          title: "Trait 6 in one frame",
          description:
            "The over-responsible enabler and the inflated, self-important controller are two poles of one false self — swinging between “less than” (inferiority) and “better than” (grandiosity). The in-depth inventory doesn't pick a pole; it returns us to the capable, worthwhile center the poles were hiding.",
        },
      ],
    },
    flipSide: {
      Component: EnablingEnergyLoop,
      caption:
        "Enabling is expensive: managing everyone else drains our personal energy and keeps our attention safely outward. When we let others bear the brunt of their own decisions, that energy returns — and we are finally free to look at ourselves, without grandiosity or judgment.",
    },
    flipSideOther: {
      Component: InventoryToTrueSelf,
      caption:
        "The ACA inventory is in-depth and painstaking — but its reward is relief. As we ask to have our shortcomings removed, the twin burdens of inferiority and grandiosity dissolve, and the True Self underneath is revealed: capable, worthwhile, and enough.",
    },
  },
  7: {
    laundry: {
      Component: GuiltAlarmCircuit,
      caption:
        "Perhaps the greatest loss we suffered as children was losing our ability to stand up for ourselves. The family wired an alarm: the moment our truth starts to rise, guilt fires, we give in — and the payoff of not feeling our feelings quietly recharges the circuit. Recovery cuts the wire between the impulse and the alarm.",
      supplements: [
        {
          Component: PreemptiveScan,
          title: "The preemptive scan",
          description:
            "We read body posture, tone of voice, and facial expressions so fast that we act out the submissive role before our own perception can even form. The radar keeps perfect track of everyone else's needs — while the self at the center never finishes rendering. The recovery move is a pause long enough for your own viewpoint to exist.",
        },
        {
          Component: AssertionStancesTable,
          title: "Three stances of the voice",
          description:
            "Passive (give in), aggressive (guilt them), assertive (both voices allowed) — compared across the move, the goal, the payoff, the cost, and the recovery turn. The first two are the trait; the third is the Flip Sides.",
        },
      ],
    },
    other: {
      Component: GuiltTripToolkit,
      caption:
        "The aggressor's version of the same wound: we make others feel guilty when they attempt to assert themselves — targeting especially those whose views would hold greater sway than ours. The ulterior motive is to hide our own hurts from having been similarly denounced as children; the payoff is a false sense of mastery that costs us our ability to be genuine and human.",
      supplements: [
        {
          Component: GuiltSeesaw,
          title: "Trait 7 in one frame",
          description:
            "Guilt turned inward swallows my voice; guilt turned outward silences yours. Both sit on the same fulcrum — the childhood denouncement — and the seesaw tilts forever until both voices are allowed at once. The level plank is the pair of Flip Sides.",
        },
      ],
    },
    flipSide: {
      Component: InnerCompassVoyage,
      caption:
        "We do not feel guilty when we stand up for ourselves. The voyage starts in the safe harbor of a meeting — where no one interrupts, comments, or judges — crosses the choppy waters that honest sharing can stir, and stays on course by the reconnected inner compass, with the Steps re-adjusting our bearings whenever we stray.",
    },
    flipSideOther: {
      Component: RaftToShip,
      caption:
        "The deepest Flip Side of Trait 7 is generosity with the very thing we fought for: we support and encourage others in their efforts to be assertive. Crewed by the outer team (group, fellow travelers) and the inner crew (loving parent, Inner Child, Higher Power), what started out as a raft became a boat — and is now a ship of love and goodwill.",
      supplements: [
        {
          Component: EncouragementRipple,
          title: "The encouragement ripple",
          description:
            "FSO Q3 asks how supporting a fellow traveler affected you physically, mentally, emotionally, and spiritually. One encouraged voice ripples outward — through the fellow traveler, the group, the fellowship — and the encouragement flows back through all four domains of the encourager. The Encouragement Ledger exercise tracks exactly this.",
        },
      ],
    },
  },
  8: {
    laundry: {
      Component: ExcitementThermostat,
      caption:
        "The first doses came early — sometimes before we were born — as the family's chaos kept us in a constant state of negative excitement. The thermostat got set high, and as adults we keep it there: dangerous situations, untrustworthy companions, precarious living — all while complaining about our circumstances. Tony A. originally wrote this trait as \"addicted to fear.\"",
      supplements: [
        {
          Component: BodyStaticMap,
          title: "Bracing for an impact that already happened",
          description:
            "Laundry List Q7 is a body inventory: quick shallow breathing, shoulders that rise and stay, jaws clamped by day and night, a knee that won't stop bouncing. The static is the childhood tension still running in the body. The Body Static Scanner exercise turns this map into a repeatable practice.",
        },
        {
          Component: ExcitementRolesTable,
          title: "Three taps into the same dose",
          description:
            "Negative excitement can come from being a victim, a victimizer, or a rescuer — in each role, the internal dosing leaves us emotionally intoxicated. Whether at work, home, or even at our meetings, we can conjure the familiar excitement we seem to believe is natural. Compare the three taps side by side.",
        },
      ],
    },
    other: {
      Component: NumbArmorCracks,
      caption:
        "The mirror trait: to inhibit the fear, we armored up — outside substances, a flurry of activities, a cocktail of internal chemicals — until we felt nothing, not even genuinely good feelings beyond the superficial \"okay.\" Then the inhibition stops working. Feelings slip through the cracks, and in our quiet moments we wonder: what's wrong with me that I cannot feel?",
      supplements: [
        {
          Component: ExcitementNumbPendulum,
          title: "Trait 8 in one frame",
          description:
            "Spiking on excitement and deadened into numbness look like opposites, but they swing from the same pivot — a childhood home in constant tension. Both keep the original feelings out of reach. The exit isn't either pole; it's the still center where feelings are felt instead of dosed.",
        },
      ],
    },
    flipSide: {
      Component: UpsetToWorkable,
      caption:
        "As we work the Steps, reparent ourselves, attend meetings, and process our grief, we discern the difference between positive and negative excitement — and make spiritually conscious decisions to avoid emotional intoxication. No longer dissociated or in denial, we accept when a relationship is fraught with constant upset, and we look for life-enriching relationships that further our spiritual development.",
      supplements: [
        {
          Component: ExcitementDiscernmentTable,
          title: "The discernment table",
          description:
            "Once we have our feelings and buried memories expressed, dosing ourselves with fear or excitement no longer attracts us — we are repelled by it, because it is life-robbing. Here is the discernment the Flip Side asks for: the dose, real aliveness, and the new baseline, compared across what each one costs and builds.",
        },
      ],
    },
    flipSideOther: {
      Component: ResensitizationPath,
      caption:
        "ACAs come to meetings because they hit a bottom — but that bottom is only the beginning of re-sensitization, the return of feelings. Disinhibiting is painstaking work: we unearth the hidden childhood fears, acknowledge our experiences, and express our feelings in the safe environment of our meetings. It might feel foreign at first, but eventually we feel rejuvenated and alive — perhaps for the very first time.",
      supplements: [
        {
          Component: SensesGrounding,
          title: "Orientation · be prepared to engage your senses",
          description:
            "The workbook opens Trait 8's reflections with the same somatic orientation it gave Trait 3: look at some things (actual), make a noise, eat a peach, smell some cinnamon, pat your face. Each sense is a door back to now — the opposite of both the dose and the numbness. The Sensory Reset exercise makes it a loggable practice.",
        },
      ],
    },
  },
  9: {
    laundry: {
      Component: MixedSignalsMirror,
      caption:
        "The confusion of feelings is a natural by-product of a family where the dysfunction is denied. We mimicked our caregivers and mirrored their emotional landscape — and absorbed a misalignment between pity and sympathy on one hand, and compassion and empathy on the other. So if we were heroes, we drew people who need rescuing; if we were martyrs, we became involved with lost causes — believing all the while that these were normal ups and downs.",
      supplements: [
        {
          Component: EmptinessWell,
          title: "The emptiness that \"helping\" never fills",
          description:
            "Laundry List Q7-Q8 name the engine: being raised in an alcoholic or dysfunctional home can create an emptiness that we constantly fill by \"helping\" disadvantaged people and underdogs — oblivious as to why. The bucket pours and pours, and the well stays dry, because what the emptiness actually needs is grief, not another rescue.",
        },
      ],
    },
    other: {
      Component: NeedinessRecoil,
      caption:
        "The mirror trait is blunt: we hate people who \"play\" the victim and beg to be rescued. Bombarded as children by conflicting messages, we went tone deaf and numb — and if anyone even seems ready to hoist a small packet of \"need\" onto us, we recoil or strike out. The tell: their need to be rescued is exactly the need we buried in the wasteland of our own childhood.",
      supplements: [
        {
          Component: LoseLoseOasis,
          title: "The barren oasis · an ecosystem of attraction and repulsion",
          description:
            "The psychologically and spiritually barren person becomes an inviting oasis to the underwhelmed. Both are reenacting a childhood dynamic, and each is getting what they subconsciously need to stave off recalling their losses. A win for the supposed \"loser\" and a loss for the supposed \"winner\" — a lose-lose situation.",
        },
        {
          Component: StrongChildMask,
          title: "The strong-child mask",
          description:
            "The Other Laundry List questions trace the mask back: pretending to be strong, feeling older than other children, resenting them for their \"normal\" childhood — and, as adults, contempt for winners, anger when everyone volunteers to help someone, and a locked door on asking for anything ourselves. The Ask-for-Help exercise practices opening that door.",
        },
      ],
    },
    flipSide: {
      Component: DimmerSwitch,
      caption:
        "Recovery here is dedication to clarity — disentangling what we were shown and learned as a habit from what we truly believe. When we share at meetings and space is made to speak our truth, sometimes the internal light shines suddenly; more often, like a dimmer switch, it brightens gradually. We pitied people and called it love because our families showed care toward those they felt sorry for and called it love. In our meetings we don't enable one another — we demonstrate love without pity.",
      supplements: [
        {
          Component: LovePityTable,
          title: "Love · pity · rescue — told apart",
          description:
            "Flip Side Q4 asks for the biggest difference between love and pity; Q3 asks for actions coming from love. This table holds the distinctions still long enough to learn them — where each one looks from, what it asks of the other person, and how both people end up. The Love vs. Pity Ledger exercise builds your personal version.",
        },
      ],
    },
    flipSideOther: {
      Component: DramaTriangleMap,
      caption:
        "From our emotionally sober True Self, compassion gushes forth — and we can finally see the symbiotic interconnectedness between \"victim\" and \"victimizer.\" The interplay between the adrenaline-surged hero or savior and the melatonin-induced victim or martyr is first realized in us; then, turning outward, we observe these unhealthy dynamics all around us — with compassion for anyone trapped in the drama triangle and desperately searching for a way out of insanity.",
      supplements: [
        {
          Component: StandReady,
          title: "Standing ready — not rushing in",
          description:
            "No longer compelled to rush into the flames of discord or desperation, we can stand ready for those who might turn to us and ask for help or direction. With a deep sense of gratitude and love, we share how our own pilgrimage began — a call, a book, an article, or an ACA flier found in the street seemingly by coincidence, which turned out to be an invitation to a lifetime spiritual quest.",
        },
      ],
    },
  },
};

function getGraphic(traitId: number, quadrant: Quadrant): GraphicEntry {
  return (
    TRAIT_QUADRANT_GRAPHICS[traitId]?.[quadrant] ?? DEFAULT_QUADRANT_GRAPHIC[quadrant]
  );
}

export function TraitStudyView({
  trait,
  questions,
}: {
  trait: Trait;
  questions: ReflectionQuestion[];
}) {
  return (
    <div>
      {/* Orientation strip - quadrant diagram (NOW STACKED ON MOBILE, LARGER ON DESKTOP) */}
      <Card className="p-5 md:p-8 mb-6 bg-[var(--muted)]/30">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-6 md:gap-8 items-center">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-1">
              Orientation
            </div>
            <h2 className="font-serif text-xl md:text-2xl font-semibold mb-3">
              Four quadrants of this trait
            </h2>
            <p className="text-sm md:text-base text-[var(--muted-foreground)] leading-relaxed">
              Use the tabs below to move between the original trait, how we act it out, and the
              two recovery sides. Each tab has its own reflection questions, explainer graphic,
              and related concepts.
            </p>
          </div>
          <div className="flex justify-center">
            <QuadrantDiagram className="w-full max-w-[460px] h-auto" />
          </div>
        </div>
      </Card>

      <Tabs defaultValue="laundry">
        <TabsList className="mb-8 flex-wrap">
          {QUADRANT_ORDER.map((q) => (
            <TabsTrigger key={q} value={q}>
              {QUADRANT_LABELS[q].label}
            </TabsTrigger>
          ))}
        </TabsList>

        {QUADRANT_ORDER.map((quadrant) => {
          const meta = QUADRANT_LABELS[quadrant];
          const statement = trait.statements[quadrant];
          const qs = questions.filter((q) => q.quadrant === quadrant);
          const graphic = getGraphic(trait.id, quadrant);
          const Graphic = graphic.Component;
          const caption = graphic.caption;
          const supplements = graphic.supplements ?? [];

          return (
            <TabsContent key={quadrant} value={quadrant}>
              {/* Trait statement */}
              <Card className="p-8 md:p-10 mb-6 text-center relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: meta.color }}
                />
                <div
                  className="text-[10px] uppercase tracking-widest font-semibold mb-3"
                  style={{ color: meta.color }}
                >
                  {meta.subtitle}
                </div>
                <blockquote className="font-serif text-xl md:text-2xl font-normal italic leading-relaxed text-[var(--foreground)] max-w-3xl mx-auto">
                  &ldquo;{statement}&rdquo;
                </blockquote>
              </Card>

              {/* Quadrant-specific infographic — LARGER LAYOUT.
                  Graphic is now full-width with the caption beneath it. */}
              <Card className="p-5 md:p-8 mb-8">
                <div className="mb-5">
                  <div
                    className="text-[10px] uppercase tracking-widest font-semibold mb-1"
                    style={{ color: meta.color }}
                  >
                    What&apos;s happening here
                  </div>
                  <p className="font-serif text-base md:text-lg leading-relaxed text-[var(--foreground)]/85 italic max-w-3xl">
                    {caption}
                  </p>
                </div>
                <div className="flex justify-center">
                  <Graphic className="w-full max-w-[720px] h-auto" />
                </div>
              </Card>

              {/* Supplemental graphics (optional, trait/quadrant-specific) */}
              {supplements.map((supp, i) => {
                const SuppComponent = supp.Component;
                return (
                  <Card key={i} className="p-5 md:p-8 mb-8">
                    <div className="mb-5">
                      <div
                        className="text-[10px] uppercase tracking-widest font-semibold mb-1"
                        style={{ color: meta.color }}
                      >
                        Reference
                      </div>
                      <h3 className="font-serif text-xl md:text-2xl font-semibold mb-2">
                        {supp.title}
                      </h3>
                      <p className="text-sm md:text-base text-[var(--foreground)]/80 leading-relaxed max-w-3xl">
                        {supp.description}
                      </p>
                    </div>
                    <SuppComponent className="w-full" />
                  </Card>
                );
              })}

              <div className="mb-6 flex items-baseline justify-between">
                <h2 className="font-serif text-2xl font-semibold text-[var(--foreground)]">
                  Reflection questions
                </h2>
                <span className="text-xs text-[var(--muted-foreground)]">
                  {qs.length} {qs.length === 1 ? "prompt" : "prompts"}
                </span>
              </div>

              <div className="space-y-4">
                {qs.map((q, i) => (
                  <ReflectionCard
                    key={`${q.traitId}-${q.quadrant}-${q.index}`}
                    traitId={q.traitId}
                    quadrant={q.quadrant}
                    questionIndex={q.index}
                    questionNumber={i + 1}
                    question={q.question}
                  />
                ))}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>

      <ConceptsAccordion traitId={trait.id} />
    </div>
  );
}
