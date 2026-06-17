import type { Facet } from "@/lib/types";
import * as S1 from "./step1";
import * as S2 from "./step2";
import * as S3 from "./step3";
import * as S4 from "./step4";
import * as S5 from "./step5";
import * as S6 from "./step6";
import * as S7 from "./step7";
import * as S8 from "./step8";
import * as S9 from "./step9";
import * as S10 from "./step10";
import * as S11 from "./step11";
import * as S12 from "./step12";

export type Graphic = {
  Component: React.ComponentType<{ className?: string }>;
  caption: string;
};

// Each Step contributes three custom SVG infographics, wired across the four
// facets (the "step" and "promise" facets share the centerpiece graphic with
// different teaching captions).
export const STEP_GRAPHICS: Record<number, Record<Facet, Graphic>> = {
  1: {
    step: { Component: S1.CycleOfAddiction, caption: "Addiction runs as a loop: relief, then craving, then consequence, then the relief that starts it over. Powerlessness is not seeing a flaw in the loop — it's that the loop runs you." },
    principle: { Component: S1.PowerlessnessQuadrant, caption: "Two honest axes: how much control you've lost over the drink, and how unmanageable life has become around it. Step One is simply telling the truth about where you actually sit." },
    working: { Component: S1.FirstDrinkCraving, caption: "For many, one drink is not one drink — it sets off a craving that argues for the next. Naming that mechanism is the practical heart of admitting powerlessness." },
    promise: { Component: S1.CycleOfAddiction, caption: "When you stop trying to win the fight inside the loop and admit you can't, the energy you were burning becomes available for a different kind of help. That's where the ground gets solid." },
  },
  2: {
    step: { Component: S2.SelfWillPendulum, caption: "Self-will swings between forcing and collapsing — and exhausts you either way. Step Two offers a still point: a Power greater than the swinging." },
    principle: { Component: S2.ComingToBelieveGradient, caption: "Belief isn't a switch. It's a gradient from disbelief through willingness to faith — and you only have to move one shade toward open." },
    working: { Component: S2.HigherPowerRing, caption: "A Higher Power can be the group, nature, love, honesty, or God of your understanding. The ring shows there are many doors in — pick the one that's real to you." },
    promise: { Component: S2.ComingToBelieveGradient, caption: "Hope returns by degrees. Each small piece of evidence nudges the gradient, until 'maybe' quietly becomes the ground you stand on for Step Three." },
  },
  3: {
    step: { Component: S3.DecisionGate, caption: "Step Three is a gate, not a transformation: a single decision, made and re-made, to let care rather than self-will steer." },
    principle: { Component: S3.WillHandoff, caption: "Two things get handed over: the inner driver (your will) and the outer facts (your life) — entrusted to a Power that has your good in mind." },
    working: { Component: S3.OpenHandRelease, caption: "The practice is a clenched fist becoming an open hand. You don't do it once; you open your hands again each morning, and sometimes each hour." },
    promise: { Component: S3.DecisionGate, caption: "Walk through the gate and the job of managing the universe is no longer yours. What replaces it is a steadying lightness and a clear next right thing." },
  },
  4: {
    step: { Component: S4.ResentmentAnatomy, caption: "The classic four columns: who you resent, the cause, what it threatens in you, and your part. The last column is the one that sets you free." },
    principle: { Component: S4.FearThread, caption: "Fear is the thread running under most resentments. Pull it gently and a tangled grievance starts to come apart into something you can actually work." },
    working: { Component: S4.InventoryRooms, caption: "Think of the inventory as walking the rooms of a house: resentments, fears, conduct, harms. You're taking stock, not staging a trial — go at the pace of safety." },
    promise: { Component: S4.ResentmentAnatomy, caption: "Once it's on paper, a resentment stops being a haunted house and becomes a list. Seeing your part — not to drown in blame — is the only part you can change." },
  },
  5: {
    step: { Component: S5.WeightLifted, caption: "The weight you've carried in secret, before and after it's spoken. Step Five's medicine is the second figure: another human being who simply receives it." },
    principle: { Component: S5.ConfessionTriangle, caption: "Three witnesses — your Higher Power, yourself, and another person. Integrity is being one whole person across all three, with nothing hidden in any corner." },
    working: { Component: S5.SecretsFunnel, caption: "Secrets keep their power by staying secret. Spoken aloud to someone safe, they pass through the funnel and come out human-sized." },
    promise: { Component: S5.WeightLifted, caption: "The exhale is real. Seen at your worst and not abandoned, you begin to feel part of the human race rather than a fraud sneaking among it." },
  },
  6: {
    step: { Component: S6.ReadinessGauge, caption: "Entire readiness is a gauge, not a switch. Some defects you'll gladly drop; others you're still attached to. Honest willingness is the reading that matters." },
    principle: { Component: S6.DefectAssetMirror, caption: "Most defects are a strength overgrown — control was once protection, pleasing was once survival. The mirror shows the asset hiding inside each liability." },
    working: { Component: S6.FearEachDefectProtects, caption: "Behind each defect is a fear it was built to guard. Name the fear and your hand loosens around the defect, almost on its own." },
    promise: { Component: S6.ReadinessGauge, caption: "The readiness itself changes you. You stop arguing for your own limitations, and the fears the defects were guarding come into the light where they can ease." },
  },
  7: {
    step: { Component: S7.HumilityScale, caption: "Humility is right-sizing: not self-loathing (grandiosity inside-out), not grandiosity — just true. From that center, asking for help is simply sane." },
    principle: { Component: S7.ShortcomingsFlow, caption: "The flow of Step Seven: become willing, then humbly ask, then let removal happen gradually — noticing one day you reached for honesty before the old reflex." },
    working: { Component: S7.OpenHandsGlyph, caption: "Open hands, asking. Many write their own honest version of the request rather than reciting a set prayer — plain words, meant sincerely." },
    promise: { Component: S7.HumilityScale, caption: "You're returned to human scale. The crushing project of self-improvement-by-willpower is no longer yours to carry alone — you can have shortcomings and still be worthy." },
  },
  8: {
    step: { Component: S8.HarmsLedger, caption: "The list: who was harmed, and the harm in a sentence — often including yourself. Keep the hard names on it; willingness, not action, is the whole assignment here." },
    principle: { Component: S8.WillingnessSpectrum, caption: "Willingness runs on a spectrum from 'no way' to 'ready.' Where it's low, you don't force it — you let it ripen with time, prayer, and conversation." },
    working: { Component: S8.ListBeforeAmends, caption: "Step Eight is preparation; Step Nine is action. The sequence matters: first the honest list and real willingness, then — and only then — the amends." },
    promise: { Component: S8.HarmsLedger, caption: "A fog of free-floating guilt becomes a clear, finite list — and a list is something you can actually do something about. The people on it become real again." },
  },
  9: {
    step: { Component: S9.AmendsDecisionTree, caption: "For each amend: direct, living, or indirect — and the crucial branch, 'would it injure them or others?' The clause is a guardrail, not a loophole." },
    principle: { Component: S9.CleanYourSide, caption: "Justice here means cleaning only your side of the street — repairing what you broke without dragging anyone back through their pain to do it." },
    working: { Component: S9.PromisesBridge, caption: "Amends are the bridge into the Promises. As your side of the street comes clean, freedom and a new kind of peace begin — not as a reward, but as a natural result." },
    promise: { Component: S9.PromisesBridge, caption: "You stop flinching at your own past. The dread of running into certain people loosens, and you can be in a room with your head level — neither cringing nor defending." },
  },
  10: {
    step: { Component: S10.MaintenanceLoop, caption: "The daily loop: spot-check, admit, correct, continue. The whole power is in the repetition — one inventory changes a life; a daily one keeps the change." },
    principle: { Component: S10.PromptlyCurve, caption: "'Promptly' matters: the same amend that takes ten seconds today becomes a four-month wall if you let it sit. The cost curve climbs steeply with delay." },
    working: { Component: S10.EarlyWarningRadar, caption: "A nightly radar — resentful? selfish? dishonest? afraid? — catches small upsets before they harden. Kept gently, it's a habit, not a tribunal." },
    promise: { Component: S10.MaintenanceLoop, caption: "Because you clean as you go, you never again wake under a mountain of un-faced wreckage. There's a lightness to ending each day current with your own life." },
  },
  11: {
    step: { Component: S11.ConsciousContactCircles, caption: "Conscious contact as signal strength: practice widens the circles and clears the line to the Power you rely on — religious or as plain as honest stillness." },
    principle: { Component: S11.WillAndPower, caption: "The radical narrowing of the request: not the outcomes you want, but only knowledge of a Higher Power's will, and the power to carry it out." },
    working: { Component: S11.MorningNightBookends, caption: "Two simple bookends hold the day: a morning intention toward usefulness, and a night review in honesty and gratitude. Show up imperfectly, daily." },
    promise: { Component: S11.ConsciousContactCircles, caption: "A center that holds when circumstances don't. You stop white-knuckling outcomes; fear loses its grip as intuition grows, and the overflow asks to be given away." },
  },
  12: {
    step: { Component: S12.SpiralOfService, caption: "Service is a spiral, not a finish line: you keep what you've found by giving it away, and carrying the message sends you back to a Step One newcomer." },
    principle: { Component: S12.AwakeningSpectrum, caption: "The awakening runs on a spectrum from gradual/educational to sudden. For most it's a slow change others notice first — real either way, and enough." },
    working: { Component: S12.PrinciplesRadial, caption: "'Practice these principles in all our affairs': the Steps radiate into every life-domain — work, family, money, conflict — not just the meeting room." },
    promise: { Component: S12.SpiralOfService, caption: "Your worst experience, honestly shared, becomes exactly what a newcomer needs. You become living proof that the way out is real — and stay well by handing it on." },
  },
};
