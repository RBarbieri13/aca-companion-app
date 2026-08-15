"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TRAITS } from "@/data/traits";
import { getCurrentTraitId } from "@/data/schedule";
import { formatDate, cn } from "@/lib/utils";
import { Lock, Heart, Zap, Feather, Compass, Scale, Home, Ear, Users, ShieldCheck, Crown, Moon, Pencil, Megaphone, TrendingUp, HeartHandshake, Activity, Flame, Gauge, Flower2, Radar, Triangle, HandHelping } from "lucide-react";

import { InnerChildExercise } from "@/components/exercises/inner-child";
import { FeelingsWheel } from "@/components/exercises/feelings-wheel";
import { TriggerLogView } from "@/components/exercises/trigger-log";
import { AffirmationsView } from "@/components/exercises/affirmations";
import { IdentityInventory } from "@/components/exercises/identity-inventory";
import { ValuesSort } from "@/components/exercises/values-sort";
import { SanctuaryCheckIn } from "@/components/exercises/sanctuary-check-in";
import { SoberListeningLogView } from "@/components/exercises/sober-listening-log";
import { BondingInventoryView } from "@/components/exercises/bonding-inventory";
import { SafePersonView } from "@/components/exercises/safe-person";
import { SeatCheckView } from "@/components/exercises/seat-check";
import { SoloSitView } from "@/components/exercises/solo-sit";
import { SelfTalkRewriterView } from "@/components/exercises/self-talk-rewriter";
import { ResponsibilitySorterView } from "@/components/exercises/responsibility-sorter";
import { BalanceTrackerView } from "@/components/exercises/balance-tracker";
import { StandUpLogView } from "@/components/exercises/stand-up-log";
import { GuiltDecoderView } from "@/components/exercises/guilt-decoder";
import { AssertionLadderView } from "@/components/exercises/assertion-ladder";
import { EncouragementLedgerView } from "@/components/exercises/encouragement-ledger";
import { BodyStaticScannerView } from "@/components/exercises/body-static-scanner";
import { ExcitementPullLogView } from "@/components/exercises/excitement-pull-log";
import { AlivenessMeterView } from "@/components/exercises/aliveness-meter";
import { SensoryResetView } from "@/components/exercises/sensory-reset";
import { RescueRadarView } from "@/components/exercises/rescue-radar";
import { DramaTriangleMapperView } from "@/components/exercises/drama-triangle-mapper";
import { LovePityLedgerView } from "@/components/exercises/love-pity-ledger";
import { AskForHelpView } from "@/components/exercises/ask-for-help";

type ExerciseId =
  | "inner-child"
  | "feelings"
  | "trigger"
  | "affirmations"
  | "identity-inventory"
  | "values-sort"
  | "sanctuary-check-in"
  | "sober-listening-log"
  | "bonding-inventory"
  | "safe-person"
  | "seat-check"
  | "solo-sit"
  | "self-talk-rewriter"
  | "responsibility-sorter"
  | "balance-tracker"
  | "stand-up-log"
  | "guilt-decoder"
  | "assertion-ladder"
  | "encouragement-ledger"
  | "body-static-scanner"
  | "excitement-pull-log"
  | "aliveness-meter"
  | "sensory-reset"
  | "rescue-radar"
  | "drama-triangle-mapper"
  | "love-pity-ledger"
  | "ask-for-help";

interface ExerciseMeta {
  id: ExerciseId;
  label: string;
  short: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  Component: React.ComponentType;
}

const EXERCISES: Record<ExerciseId, ExerciseMeta> = {
  "inner-child": {
    id: "inner-child",
    label: "Inner Child Dialogue",
    short: "Talk to the younger you",
    icon: Heart,
    Component: InnerChildExercise,
  },
  feelings: {
    id: "feelings",
    label: "Feelings Wheel",
    short: "Name what's actually here",
    icon: Compass,
    Component: FeelingsWheel,
  },
  trigger: {
    id: "trigger",
    label: "Trigger Log",
    short: "Capture event → response → desired response",
    icon: Zap,
    Component: TriggerLogView,
  },
  affirmations: {
    id: "affirmations",
    label: "Reparenting Affirmations",
    short: "Words the younger you needed",
    icon: Feather,
    Component: AffirmationsView,
  },
  "identity-inventory": {
    id: "identity-inventory",
    label: "Identity Inventory",
    short: "A self-authored record of who you are",
    icon: Compass,
    Component: IdentityInventory,
  },
  "values-sort": {
    id: "values-sort",
    label: "Values vs. Performance Sort",
    short: "Sort what's actually yours from what you were taught",
    icon: Scale,
    Component: ValuesSort,
  },
  "sanctuary-check-in": {
    id: "sanctuary-check-in",
    label: "Sanctuary ↔ Prison Check-in",
    short: "A weekly read on how aloneness is feeling",
    icon: Home,
    Component: SanctuaryCheckIn,
  },
  "sober-listening-log": {
    id: "sober-listening-log",
    label: "Sober Listening Log",
    short: "Receive criticism without defending the false self",
    icon: Ear,
    Component: SoberListeningLogView,
  },
  "bonding-inventory": {
    id: "bonding-inventory",
    label: "Bonding Pattern Inventory",
    short: "See exactly how you recreate or recycle abandonment",
    icon: Users,
    Component: BondingInventoryView,
  },
  "safe-person": {
    id: "safe-person",
    label: "“Safe Person” Builder",
    short: "Define what safe looks like — then check someone against it",
    icon: ShieldCheck,
    Component: SafePersonView,
  },
  "seat-check": {
    id: "seat-check",
    label: "Power Seat Check",
    short: "Which seat of the Game did you just take?",
    icon: Crown,
    Component: SeatCheckView,
  },
  "solo-sit": {
    id: "solo-sit",
    label: "Solo Sit Tracker",
    short: "Build the capacity to be alone in quiet",
    icon: Moon,
    Component: SoloSitView,
  },
  "self-talk-rewriter": {
    id: "self-talk-rewriter",
    label: "Self-Talk Rewriter",
    short: "Turn victim-thoughts into whole-and-complete self-talk",
    icon: Pencil,
    Component: SelfTalkRewriterView,
  },
  "responsibility-sorter": {
    id: "responsibility-sorter",
    label: "Whose Job Is It?",
    short: "Sort what you carry into mine / shared / theirs",
    icon: Scale,
    Component: ResponsibilitySorterView,
  },
  "balance-tracker": {
    id: "balance-tracker",
    label: "Inferiority ↔ Grandiosity Tracker",
    short: "Catch which pole you swing to — and right-size it",
    icon: Scale,
    Component: BalanceTrackerView,
  },
  "stand-up-log": {
    id: "stand-up-log",
    label: "Stand-Up Log",
    short: "Track spoke-up vs. gave-in — and watch the guilt rewire",
    icon: Megaphone,
    Component: StandUpLogView,
  },
  "guilt-decoder": {
    id: "guilt-decoder",
    label: "Guilt-Message Decoder",
    short: "Name whose voice the guilt is — then answer it",
    icon: Ear,
    Component: GuiltDecoderView,
  },
  "assertion-ladder": {
    id: "assertion-ladder",
    label: "Assertion Ladder",
    short: "Climb from easier stand-ups to harder ones",
    icon: TrendingUp,
    Component: AssertionLadderView,
  },
  "encouragement-ledger": {
    id: "encouragement-ledger",
    label: "Encouragement Ledger",
    short: "Log the voices you cheer — and the cheers you receive",
    icon: HeartHandshake,
    Component: EncouragementLedgerView,
  },
  "body-static-scanner": {
    id: "body-static-scanner",
    label: "Body Static Scanner",
    short: "Catch the body bracing for an impact that already happened",
    icon: Activity,
    Component: BodyStaticScannerView,
  },
  "excitement-pull-log": {
    id: "excitement-pull-log",
    label: "Excitement Pull Log",
    short: "Track what still pulls you toward the dose — and what you've released",
    icon: Flame,
    Component: ExcitementPullLogView,
  },
  "aliveness-meter": {
    id: "aliveness-meter",
    label: "Aliveness Meter",
    short: "A weekly read between numb, alive, and intoxicated",
    icon: Gauge,
    Component: AlivenessMeterView,
  },
  "sensory-reset": {
    id: "sensory-reset",
    label: "Sensory Reset",
    short: "Five doors back to now — look, sound, taste, smell, touch",
    icon: Flower2,
    Component: SensoryResetView,
  },
  "rescue-radar": {
    id: "rescue-radar",
    label: "Rescue Radar",
    short: "Catch the urge to swoop in — and choose love that asks first",
    icon: Radar,
    Component: RescueRadarView,
  },
  "drama-triangle-mapper": {
    id: "drama-triangle-mapper",
    label: "Drama Triangle Mapper",
    short: "Name the corner you took — and map the step out",
    icon: Triangle,
    Component: DramaTriangleMapperView,
  },
  "love-pity-ledger": {
    id: "love-pity-ledger",
    label: "Love vs. Pity Ledger",
    short: "Build your two columns: actions from love, actions from pity",
    icon: Heart,
    Component: LovePityLedgerView,
  },
  "ask-for-help": {
    id: "ask-for-help",
    label: "Ask-for-Help Experiments",
    short: "Practice the ask the strong-child mask never allowed",
    icon: HandHelping,
    Component: AskForHelpView,
  },
};

interface TraitExerciseBundle {
  blurb: string;
  exercises: ExerciseId[];
}

const TRAIT_EXERCISES: Record<number, TraitExerciseBundle> = {
  1: {
    blurb:
      "Trait 1 is about isolation and the fear of people and authority. These practices meet the wounded child who learned that other people were not safe — and the adult who is learning, slowly, that not everyone is your first family.",
    exercises: ["inner-child", "feelings", "trigger", "affirmations"],
  },
  2: {
    blurb:
      "Trait 2 is about approval seeking and lost identity — and the rigid self-sufficiency we swing to in order to protect ourselves. These practices are about reclaiming an identity that is yours, not borrowed, and testing whether aloneness is sanctuary or prison this week.",
    exercises: ["identity-inventory", "values-sort", "sanctuary-check-in", "affirmations"],
  },
  3: {
    blurb:
      "Trait 3 is about being frightened by anger and criticism — and the flip into being the angry critic ourselves. These practices help the body return to the present when fear floods, and rehearse the sober posture from the workbook: hear, sit with it, and either thank or let it fly.",
    exercises: ["sober-listening-log", "trigger", "feelings", "affirmations"],
  },
  4: {
    blurb:
      "Trait 4 is about the compulsive pull to recreate abandonment — choosing the unavailable, leaving before we're left, or avoiding closeness altogether. These practices take an honest inventory of how we bond, build a conscious sense of who is safe, and return us to the Inner Child we abandoned in the process.",
    exercises: ["bonding-inventory", "safe-person", "inner-child", "affirmations"],
  },
  5: {
    blurb:
      "Trait 5 is about power. As children we felt disempowered; as a counter-move, some of us became the controller. These practices help you notice which seat of the Game you took in any given moment, rewrite the self-talk that keeps the victim viewpoint alive, and build the deeper recovery skill named in the Flip Side: being alone, in silence, with nothing happening — and being whole.",
    exercises: ["seat-check", "self-talk-rewriter", "solo-sit", "inner-child"],
  },
  6: {
    blurb:
      "Trait 6 is the overdeveloped sense of responsibility — and its mirror, the inflated self-importance that keeps us from seeing our own shortcomings. These practices set the load down (whose job is it, really?), catch the swing between inferiority and grandiosity, and turn the in-depth inventory toward the capable, worthwhile True Self underneath.",
    exercises: ["responsibility-sorter", "balance-tracker", "inner-child", "affirmations"],
  },
  7: {
    blurb:
      "Trait 7 is the guilt alarm wired to the impulse to stand up for ourselves — and its mirror, making others feel guilty when they assert themselves. These practices watch the alarm in real time, decode whose voice the guilt actually is, and climb — one rung at a time — toward speaking up calm and guilt-free, while cheering everyone else's voice too.",
    exercises: ["stand-up-log", "guilt-decoder", "assertion-ladder", "encouragement-ledger"],
  },
  8: {
    blurb:
      "Trait 8 swings between two poles of the same wound: addicted to excitement (the dose) and deadened into numbness (the armor). These practices work both ends toward the middle — noticing the body's static in real time, naming what still pulls you toward emotional intoxication, taking a weekly read between numb and spiking, and using the workbook's own sensory orientation to come back to now, where feelings can be felt instead of dosed.",
    exercises: ["body-static-scanner", "excitement-pull-log", "aliveness-meter", "sensory-reset"],
  },
  9: {
    blurb:
      "Trait 9 is the crossed wiring between love and pity — the hero drawn to people who need rescuing, and the mirror trait's contempt for anyone who begs to be rescued. These practices untangle the wires: catching the rescue impulse before it swoops, mapping the drama triangle so you can step outside it, building your personal ledger of what love actually does, and practicing the one thing the trait forbade — asking for help yourself.",
    exercises: ["rescue-radar", "drama-triangle-mapper", "love-pity-ledger", "ask-for-help"],
  },
};

const EXERCISE_CONTEXT: Partial<Record<ExerciseId, Partial<Record<number, string>>>> = {
  "inner-child": {
    1: "When isolation or fear of authority has you activated, the child voice is often the one that's scared. Let the adult you meet them.",
    3: "The fear of anger you feel as an adult is usually the child remembering. Let the adult voice say what no one said back then: you are safe now, and we are no longer small.",
    4: "The Flip Side of Trait 4 is comforting the Inner Child we abandoned and disavowed. This is where that conversation happens — the loving parent crossing back to the child it left.",
    5: "Trait 5 names a partnership of inner figures: loving parent, critical survival parent, Inner Child, Higher Power. This is the conversation with the child at the center of that circle — the one who learned that someone walking away meant catastrophe.",
    6: "Trait 6's child was made responsible for things that were never theirs. Let the adult voice tell that child the truth: the chaos was not yours to fix, and you were always capable and worthwhile — not because of what you carried.",
    7: "Trait 7's child got in trouble for standing up — or watched someone else get in trouble for it. Let the adult voice say what the family couldn't: your voice was never the problem, and it is safe to use it now.",
  },
  feelings: {
    1: "Isolation dampens feelings into a blur. Naming the specific word pulls you out of the loop.",
    3: "The first move out of dosing is feeling. When fear of anger or criticism floods you, name what's actually here — that's the opposite of numbing.",
  },
  trigger: {
    1: "Every trigger around authority is practice. Capture the moment so the response next time can be yours, not your childhood's.",
    3: "Anger and cutting criticism are some of the loudest triggers. Capture event → response → desired response so the adrenaline of reaction stops being the steering wheel.",
    4: "The urge to leave first, dominate, or pull away is the compulsion talking. Catch it in the moment: what happened, how you reacted, and how you'd rather respond next time.",
  },
  affirmations: {
    1: "The younger part of you is still listening. These are sentences they needed, said now.",
    2: "When identity feels borrowed, return to these. They can't replace the work, but they steady the ground.",
    3: "The renewed True Self esteem the workbook describes is built one sentence at a time. These are some of those sentences.",
    4: "The Inner Child you abandoned needs to hear it will not be left again. These are sentences that rebuild that trust.",
    5: "The Flip Side of Trait 5 reflection asks: what self-talk do you practice as a daily habit? Pick a few of these and return to them — especially when the urge to dominate or collapse arrives.",
    6: "The Flip Side of the Other Laundry List asks what words your Loving Parent and Higher Power use for you — capable, worthwhile, enough. Build that vocabulary here and return to it when inferiority or grandiosity flares.",
    7: "The child who was denounced for speaking still listens for permission. These are the sentences that grant it: my voice counts, my view is allowed, standing up is not a crime. Say them before the moments where you'll need them.",
  },
  "identity-inventory": {
    2: "A slow, self-authored record of who you are — built over weeks, not minutes. This directly answers Flip Side Q1: 'Describe ways you do not depend on others to define who you are.'",
  },
  "values-sort": {
    2: "Which of these are actually yours, and which did you learn to be to stay safe? Surprising yourself here is the whole point.",
  },
  "sanctuary-check-in": {
    2: "Flip Side of the Other asks: 'When you are alone, do you feel more like it is a prison — or a sanctuary?' Answer once a week. The chart below shows your relationship to aloneness changing over time.",
  },
  "sober-listening-log": {
    3: "Direct rehearsal for the Trait 3 Flip Sides. Capture criticism, sit with the question 'is there truth here that could benefit me?', and either take it in or let it fly. Over time you'll see the false self has less and less to defend.",
  },
  "bonding-inventory": {
    4: "This is the emotional inventory the Flip Side of Trait 4 calls for. Log the relationships, jobs, and groups that mattered — the seat you played, whether a compulsion was present, how it ended, and whether it recreated the old wound. The pattern becomes visible, and then it loses its grip.",
  },
  "safe-person": {
    4: "Flip Side Q4 asks what makes a person 'safe.' Many of us studied people for danger as kids. Here you make it conscious: write your own green and red flags, then hold a specific person up to your definition — gently, as data, not a verdict.",
  },
  "seat-check": {
    5: "Trait 5 names the four roles plainly: victim, victimizer, rescuer I, rescuer II — plus the exit, humble participation. After a moment that mattered, pause and notice which seat you took. You're not grading yourself; you're building the noticing muscle. Over time, the humble-participant bar grows.",
  },
  "solo-sit": {
    5: "Flip Side of the Other asks: 'Are you able to be alone, in silence, with nothing happening?' Most of us cannot, at first — being alone meant something painful as children. The capacity is built, not granted. A few minutes at a time. The chart shows your capacity growing.",
  },
  "self-talk-rewriter": {
    5: "Laundry List Q4 asks for the phrases that swirl in a victim's head. Flip Side Q3 asks for the self-talk you practice as a daily habit. This is where the two meet — catch one swirling thought and write the whole-and-complete version next to it. Over months, the inside of your head changes.",
  },
  "responsibility-sorter": {
    6: "Trait 6 carries what was never ours. Name each thing you're holding and answer the one honest question — whose job is this, really? Watch how much of your energy is spent on the 'theirs' column, and how much comes back when you set it down.",
  },
  "balance-tracker": {
    6: "The over-responsible enabler and the inflated controller are two poles of one false self — inferiority and grandiosity. Catch which way a reaction swings, then write the right-sized response a capable AND worthwhile person would give. Over time the centered bar grows.",
  },
  "stand-up-log": {
    7: "The Laundry List asks what the payoff is for giving in and how guilt behaves when you don't. Log each moment — spoken or swallowed — with guilt sliders at the choice and an hour later. The falling trend line is the guilt alarm being rewired.",
  },
  "guilt-decoder": {
    7: "Laundry List Q1 asks what thoughts run through your head when guilt fires; Other List Q2 asks what techniques were used on you as a child. This is where they meet: catch the message, attribute the voice, and write the True Self reply. A decoded message stops being the truth and becomes a quotation.",
  },
  "assertion-ladder": {
    7: "Flip Side Q3 asks for two lists — easier and harder situations for standing up for yourself. Build them as one ladder, climb from the bottom, and rate how calm each rung felt. Incremental, but progressive — exactly how the workbook says power comes back.",
  },
  "encouragement-ledger": {
    7: "The Flip Side of the Other asks how supporting a fellow traveler affected you — physically, mentally, emotionally, and spiritually. Log both directions, mark the four domains, and watch where encouragement lands in you. Giving it away is how the raft becomes a ship.",
  },
  "body-static-scanner": {
    8: "Laundry List Q7 asks you to pay attention to your body over time — the bracing, the shallow breath, the clamped jaw, the knee that won't stop. This scanner turns that question into a repeatable practice: mark the signs, rate the tension, and compare it to what your body did back then. The static becomes visible, and visible static can be answered.",
  },
  "excitement-pull-log": {
    8: "Flip Side Q1 asks what used to attract you that you've released; Q2 asks what still pulls. This log holds both lists in one place — every pull you decline is a spiritually conscious decision, and watching the released column grow is watching the flip side come true.",
  },
  "aliveness-meter": {
    8: "Trait 8's two lists are the two ends of one dial — emotionally intoxicated on one side, deadened and numb on the other. Once a week, mark where you actually lived. The goal isn't either end; it's the middle band, where the workbook says we finally feel rejuvenated and alive.",
  },
  "sensory-reset": {
    8: "The workbook opens this trait's reflections with an orientation: be prepared to engage your senses. Look at some things (actual), make a noise, eat a peach, smell some cinnamon, pat your face. When the charge spikes — or the numbness settles in — walk through a few doors and log the before and after. The senses tell the body it is not that time anymore.",
  },
  "rescue-radar": {
    8: "Negative excitement can come from being a rescuer, too — diving into someone else's emergency is a dose. When the pull toward a crisis arrives, log it here first: the urge, what's underneath, and what you chose.",
    9: "Laundry List Q1 asks what the payoff for rescuing has been; Q7-Q8 ask whether helping has been filling an internal emptiness. This radar catches the impulse in flight — the urge, the feeling underneath it, and the action you chose. Love asks first; the log shows your asking share growing.",
  },
  "drama-triangle-mapper": {
    9: "The Flip Side of the Other asks you to explain the drama triangle and to name a time you acted out the persecutor, rescuer, or victim corner. Map real moments here — which corner you took, how the corners rotated, and the step out. The sage share of the chart is compassion learning to stay outside the triangle.",
  },
  "love-pity-ledger": {
    9: "Flip Side Q3 is deceptively simple: can you list actions coming from love? Build the list — and its shadow column of pity-and-rescue moves — over weeks. The difference stops being abstract the day you catch yourself mid-action and know exactly which column it belongs to.",
  },
  "ask-for-help": {
    9: "The Other Laundry List Q8 asks: do you find it difficult to ask others for help — and do you get mad when others ask for what you never could? The mirror trait starves us of the very thing it resents. Each small, logged ask is the strong-child mask loosening; the discomfort curve really does bend.",
  },
};

const ALL_EXERCISE_IDS: ExerciseId[] = [
  "inner-child",
  "feelings",
  "trigger",
  "affirmations",
  "identity-inventory",
  "values-sort",
  "sanctuary-check-in",
  "sober-listening-log",
  "bonding-inventory",
  "safe-person",
  "seat-check",
  "solo-sit",
  "self-talk-rewriter",
  "responsibility-sorter",
  "balance-tracker",
  "stand-up-log",
  "guilt-decoder",
  "assertion-ladder",
  "encouragement-ledger",
  "body-static-scanner",
  "excitement-pull-log",
  "aliveness-meter",
  "sensory-reset",
  "rescue-radar",
  "drama-triangle-mapper",
  "love-pity-ledger",
  "ask-for-help",
];

export function ExercisesView() {
  const searchParams = useSearchParams();
  const [selectedTrait, setSelectedTrait] = useState<number>(1);
  const [mounted, setMounted] = useState(false);
  const [activeExercise, setActiveExercise] = useState<ExerciseId | null>(null);

  useEffect(() => {
    setMounted(true);
    const urlTrait = searchParams.get("trait");
    const focus = urlTrait ? Number(urlTrait) : getCurrentTraitId();
    // Fall back to the nearest open trait
    const trait = TRAITS.find((t) => t.id === focus && t.active) ?? TRAITS.find((t) => t.active) ?? TRAITS[0];
    setSelectedTrait(trait.id);
    const bundle = TRAIT_EXERCISES[trait.id];
    setActiveExercise(bundle?.exercises[0] ?? null);
  }, [searchParams]);

  const trait = TRAITS.find((t) => t.id === selectedTrait) ?? TRAITS[0];
  const bundle = TRAIT_EXERCISES[selectedTrait];
  const isLocked = !trait.active;

  const activeMeta = activeExercise ? EXERCISES[activeExercise] : null;
  const contextCopy =
    activeExercise ? EXERCISE_CONTEXT[activeExercise]?.[selectedTrait] : null;

  const ActiveComponent = activeMeta?.Component;

  const unpickedExercises = useMemo(() => {
    const picked = new Set(bundle?.exercises ?? []);
    return ALL_EXERCISE_IDS.filter((id) => !picked.has(id));
  }, [bundle]);

  return (
    <div>
      {/* Trait menu (1-14) */}
      <Card className="p-3 md:p-4 mb-5">
        <div className="flex items-center gap-2 mb-3 px-1">
          <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium">
            Choose a trait to see its practices
          </div>
          {mounted && (
            <Badge variant="sage" className="text-[10px] ml-auto">
              Current · Trait {getCurrentTraitId()}
            </Badge>
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1" role="tablist">
          {TRAITS.map((t) => {
            const isActive = t.id === selectedTrait;
            const isCurrent = mounted && t.id === getCurrentTraitId();
            const isOpen = t.active;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setSelectedTrait(t.id);
                  const b = TRAIT_EXERCISES[t.id];
                  setActiveExercise(b?.exercises[0] ?? null);
                }}
                className={cn(
                  "group shrink-0 flex flex-col items-center gap-1 rounded-xl border px-3 py-2.5 transition-all min-w-[68px]",
                  isActive
                    ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)]"
                    : isOpen
                    ? "border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/40 text-[var(--foreground)]"
                    : "border-[var(--border)] bg-[var(--muted)]/30 text-[var(--muted-foreground)] opacity-60 cursor-pointer"
                )}
              >
                <div className="font-serif text-base font-bold leading-none">T{t.id}</div>
                <div className="text-[9px] uppercase tracking-wider font-semibold leading-none">
                  {isCurrent && !isActive ? "CURRENT" : isOpen ? "OPEN" : "LOCKED"}
                </div>
                {!isOpen && <Lock className="h-2.5 w-2.5" strokeWidth={2.5} />}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Selected trait context */}
      <Card className="p-5 md:p-6 mb-6">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <Badge variant="outline" className="text-[10px]">Trait {trait.id}</Badge>
          {mounted && trait.id === getCurrentTraitId() && (
            <Badge variant="default" className="text-[10px]">Current focus</Badge>
          )}
          {isLocked && (
            <Badge variant="muted" className="text-[10px]">
              <Lock className="h-3 w-3 mr-1" strokeWidth={2} />
              Opens {formatDate(trait.mainListDate, "short")}
            </Badge>
          )}
        </div>
        <h2 className="font-serif text-xl md:text-2xl font-semibold mb-2 leading-tight">
          {trait.shortName}
        </h2>
        {isLocked ? (
          <p className="text-sm text-[var(--muted-foreground)] max-w-3xl leading-relaxed">
            The exercises for Trait {trait.id} unlock the week of{" "}
            <strong className="text-[var(--foreground)]">
              {formatDate(trait.mainListDate)}
            </strong>
            . For now, you can still use any practice below as a cross-trait tool.
          </p>
        ) : (
          <p className="text-sm text-[var(--foreground)]/80 max-w-3xl leading-relaxed">
            {bundle?.blurb}
          </p>
        )}
      </Card>

      {!isLocked && bundle && (
        <>
          {/* Exercise picker for this trait */}
          <div className="mb-6">
            <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-3">
              Practices for Trait {trait.id}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {bundle.exercises.map((id) => {
                const meta = EXERCISES[id];
                const isActive = id === activeExercise;
                const Icon = meta.icon;
                return (
                  <button
                    key={id}
                    onClick={() => setActiveExercise(id)}
                    className={cn(
                      "text-left rounded-xl border p-4 transition-all",
                      isActive
                        ? "border-[var(--primary)] bg-[var(--primary)]/[0.05] shadow-sm"
                        : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/40"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-lg",
                          isActive ? "bg-[var(--primary)]" : "bg-[var(--muted)]"
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-4 w-4",
                            isActive
                              ? "text-[var(--primary-foreground)]"
                              : "text-[var(--primary)]"
                          )}
                          strokeWidth={1.75}
                        />
                      </div>
                    </div>
                    <div className="font-serif text-sm font-semibold leading-tight mb-1">
                      {meta.label}
                    </div>
                    <div className="text-xs text-[var(--muted-foreground)] leading-snug">
                      {meta.short}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active exercise + per-trait context blurb */}
          {activeMeta && ActiveComponent && (
            <div>
              {contextCopy && (
                <Card className="p-4 md:p-5 mb-6 border-[var(--primary)]/25 bg-[var(--primary)]/[0.04]">
                  <div className="flex items-start gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/15 mt-0.5">
                      <activeMeta.icon className="h-3.5 w-3.5 text-[var(--primary)]" strokeWidth={2} />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-[var(--primary)] font-semibold mb-1">
                        Why this practice for Trait {trait.id}
                      </div>
                      <p className="text-sm text-[var(--foreground)]/85 leading-relaxed">
                        {contextCopy}
                      </p>
                    </div>
                  </div>
                </Card>
              )}
              <div className="mb-3">
                <h3 className="font-serif text-2xl font-semibold">{activeMeta.label}</h3>
              </div>
              <ActiveComponent />
            </div>
          )}

          {/* Cross-trait practices */}
          {unpickedExercises.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[var(--border)]">
              <div className="mb-4">
                <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-medium mb-1">
                  Also available
                </div>
                <h2 className="font-serif text-xl font-semibold">Cross-trait practices</h2>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed max-w-2xl mt-1">
                  These aren&apos;t on the curated list for Trait {trait.id}, but they&apos;re
                  always here when you need them.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {unpickedExercises.map((id) => {
                  const meta = EXERCISES[id];
                  const Icon = meta.icon;
                  return (
                    <button
                      key={id}
                      onClick={() => setActiveExercise(id)}
                      className="text-left rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 hover:border-[var(--primary)]/40 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--muted)] shrink-0">
                          <Icon className="h-4 w-4 text-[var(--primary)]" strokeWidth={1.75} />
                        </div>
                        <div>
                          <div className="font-serif text-sm font-semibold leading-tight mb-0.5">
                            {meta.label}
                          </div>
                          <div className="text-xs text-[var(--muted-foreground)]">
                            {meta.short}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      {isLocked && (
        <Card className="p-8 text-center">
          <Lock className="h-8 w-8 text-[var(--muted-foreground)] mx-auto mb-3" strokeWidth={1.5} />
          <h3 className="font-serif text-lg font-semibold mb-2">Not yet</h3>
          <p className="text-sm text-[var(--muted-foreground)] max-w-md mx-auto mb-4">
            Trait {trait.id} opens on {formatDate(trait.mainListDate)}. Until then, the earlier
            traits&apos; exercises are available to any ACA working the traits in their own
            order.
          </p>
          <Link
            href={`/exercises?trait=${mounted ? getCurrentTraitId() : 1}`}
            className="text-sm font-medium text-[var(--primary)] hover:underline"
            onClick={(e) => {
              e.preventDefault();
              const t = mounted ? getCurrentTraitId() : 1;
              setSelectedTrait(t);
              const b = TRAIT_EXERCISES[t];
              setActiveExercise(b?.exercises[0] ?? null);
            }}
          >
            Jump to Trait {mounted ? getCurrentTraitId() : 1}&apos;s exercises →
          </Link>
        </Card>
      )}
    </div>
  );
}
