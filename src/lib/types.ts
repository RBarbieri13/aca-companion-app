export type Quadrant = "laundry" | "other" | "flipSide" | "flipSideOther";

export interface Trait {
  id: number;
  shortName: string;
  statements: Record<Quadrant, string>;
  active: boolean;
  mainListDate: string;
  flipSideDate: string;
}

export interface ReflectionQuestion {
  traitId: number;
  quadrant: Quadrant;
  index: number;
  question: string;
}

export interface JournalEntry {
  id: string;
  traitId: number;
  quadrant: Quadrant;
  questionIndex: number;
  content: string;
  tags: string[];
  intensity?: number;
  updatedAt: string;
}

export interface Session {
  date: string;
  traitId: number | null;
  quadrant: "mainList" | "flipSide" | null;
  type: "session" | "break" | "wrapup";
  label?: string;
  attended?: boolean;
  notes?: string;
}

export interface FeelingLog {
  id: string;
  feeling: string;
  category: string;
  note: string;
  timestamp: string;
}

export interface TriggerLog {
  id: string;
  event: string;
  traitId?: number;
  response: string;
  desiredResponse: string;
  timestamp: string;
}

export interface InnerChildEntry {
  id: string;
  adultVoice: string;
  childVoice: string;
  updatedAt: string;
}

export type IdentityCategory =
  | "values"
  | "strengths"
  | "enjoy"
  | "rolesVsSelf"
  | "knownInternally";

export interface IdentityEntry {
  id: string;
  category: IdentityCategory;
  content: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Trait 2 weekly check-in: when alone this week, was it more sanctuary or prison?
 * Slider: 0 = fully prison, 100 = fully sanctuary.
 */
export interface SanctuaryCheckIn {
  id: string;
  weekOf: string; // ISO date (the Sunday of the week)
  value: number; // 0-100
  note: string;
  timestamp: string;
}

/**
 * Trait 3 reflection log: receiving anger or criticism from True Self esteem.
 * Mirrors the workbook's "Thank you for sharing / If it doesn't apply, let it fly" flow.
 */
export interface SoberListeningEntry {
  id: string;
  source: string;          // Who said it / context
  criticism: string;       // What was said
  hadTruth: boolean | null; // null = haven't decided yet
  truthFound: string;      // What's true here that could benefit me
  responseTaken: string;   // What I did or plan to do
  selfWorth: number;       // 0-100 sober self-worth in the moment after
  timestamp: string;
}

/**
 * Trait 4 bonding-pattern inventory: an emotional inventory of how we bond, to reveal where
 * we recreate or recycle abandonment. Each entry is one relationship / job / group / event.
 */
export type BondingRole = "rescuer" | "victim" | "victimizer" | "avoider";
export type BondingEnding = "left-first" | "they-left" | "faded" | "ongoing";

export interface BondingInventoryEntry {
  id: string;
  who: string;              // who / what (person, job, group, event)
  role: BondingRole;        // the seat we played in the Game of Dissociation
  compulsion: string;       // compulsion present (alcoholic, workaholic, none, etc.)
  ending: BondingEnding;    // how it ended
  recreatedAbandonment: boolean; // did this recreate the old wound?
  note: string;
  timestamp: string;
}

/**
 * Trait 4 "safe person" work: building a personal, conscious definition of what makes a
 * person safe vs. unsafe (Flip Side Q4), then optionally checking a specific person against it.
 */
export type SafeFlagKind = "green" | "red";

export interface SafePersonCriterion {
  id: string;
  text: string;
  kind: SafeFlagKind;
}

export interface SafePersonCheck {
  id: string;
  who: string;
  greens: string[]; // text snapshots of green flags present
  reds: string[];   // text snapshots of red flags present
  note: string;
  timestamp: string;
}

/**
 * Trait 5 power-seat check: in a given situation, which seat of the Game did I take?
 * Mirrors the four roles named in the workbook + the recovery seat (humble participant).
 */
export type GameSeat = "victim" | "victimizer" | "rescuer-1" | "rescuer-2" | "humble";

export interface SeatCheckEntry {
  id: string;
  situation: string;
  seat: GameSeat;
  fearUnderneath: string;
  desiredResponse: string;
  timestamp: string;
}

/**
 * Trait 5 solo-sit tracker: a session of intentional quiet, to build the capacity to be
 * alone in silence with nothing happening. Slider values: 0 = restless, 100 = settled.
 */
export interface SoloSitEntry {
  id: string;
  durationMinutes: number;
  beforeState: number; // 0-100
  afterState: number;  // 0-100
  hadActivity: boolean; // false = pure quiet; true = activity (music, walk, etc.)
  note: string;
  timestamp: string;
}

/**
 * Trait 5 self-talk library: each entry captures a victim-viewpoint phrase (the kind that
 * swirls in the head) and an empowered, whole/complete rewrite.
 */
export interface SelfTalkRewrite {
  id: string;
  victimPhrase: string;
  empoweredRewrite: string;
  context: string; // optional — where it shows up
  isFavorite: boolean;
  timestamp: string;
}

/**
 * Trait 6 responsibility sorter ("Whose job is it?"): each entry is a thing we're carrying,
 * sorted by who it actually belongs to, with the energy it costs us.
 */
export type ResponsibilityOwner = "mine" | "shared" | "theirs";

export interface ResponsibilityItem {
  id: string;
  item: string;
  owner: ResponsibilityOwner;
  energyCost: number; // 0-100, how much it drains me
  note: string;
  timestamp: string;
}

/**
 * Trait 6 inferiority ↔ grandiosity tracker: log a reaction and which pole it swung to,
 * plus the right-sized (capable & worthwhile) response.
 */
export type BalancePole = "inferiority" | "centered" | "grandiosity";

export interface BalanceEntry {
  id: string;
  situation: string;
  pole: BalancePole;
  rightSizedResponse: string;
  timestamp: string;
}

/**
 * Trait 7 stand-up log: one moment where assertion was on the table — did I speak up or
 * give in, and what did the guilt do? Sliders 0-100.
 */
export type StandUpAction = "spoke-up" | "gave-in";

export interface StandUpEntry {
  id: string;
  situation: string;
  action: StandUpAction;
  guiltBefore: number; // 0-100 guilt at the moment of choice
  guiltAfter: number;  // 0-100 guilt an hour later
  saidOrWished: string; // what I said — or wish I'd said
  timestamp: string;
}

/**
 * Trait 7 guilt-message decoder: the guilt thought, whose voice originally said it,
 * and the True Self reply.
 */
export interface GuiltMessageEntry {
  id: string;
  message: string;      // the guilt thought running through my mind
  voiceSource: string;  // whose voice installed it (parent, teacher, religious figure...)
  trueSelfReply: string;
  timestamp: string;
}

/**
 * Trait 7 assertion ladder: a personal ladder of standing-up situations from easier to
 * harder (Flip Side Q3), with rungs marked as tried and rated for calm.
 */
export interface LadderRung {
  id: string;
  situation: string;
  difficulty: number;       // 1 (easier) - 10 (harder)
  tried: boolean;
  calmRating: number | null; // 0-100 how calm it felt when tried
  timestamp: string;
}

/**
 * Trait 7 encouragement ledger: moments of supporting/encouraging someone's assertiveness
 * (or receiving that support), with the workbook's four impact domains.
 */
export type EncouragementDirection = "gave" | "received";
export type ImpactDomain = "physically" | "mentally" | "emotionally" | "spiritually";

export interface EncouragementEntry {
  id: string;
  direction: EncouragementDirection;
  who: string;   // fellow traveler, group member, friend...
  what: string;  // what happened
  impacts: ImpactDomain[]; // how it affected me
  timestamp: string;
}

/**
 * Trait 8 body static scan (Laundry List Q7): noticing when the body is braced
 * for impact — quick shallow breathing, raised shoulders, clamped jaws, restless
 * movement — as if still living in the tense childhood home.
 */
export type BodySign =
  | "shallow-breath"
  | "raised-shoulders"
  | "clamped-jaw-day"
  | "clamped-jaw-night"
  | "teeth-grinding"
  | "bouncing-knee"
  | "tapping-foot"
  | "nail-digging"
  | "skin-chewing";

export type BodyScanState = "numb" | "calm" | "buzzing" | "spiking";

export interface BodyScanEntry {
  id: string;
  signs: BodySign[];
  tension: number; // 0-100 how braced the body feels right now
  state: BodyScanState;
  childhoodEcho: string; // what did I do back then, physically?
  note: string;
  timestamp: string;
}

/**
 * Trait 8 excitement pull log (Flip Side Q1-Q2): situations that used to attract
 * us — or still do — because of the emotional intoxication, and what we chose.
 */
export type PullStatus = "still-pulls" | "released";
export type PullChoice = "engaged" | "declined" | "noticing";

export interface ExcitementPullEntry {
  id: string;
  situation: string;
  pull: number; // 0-100 strength of the attraction in the moment
  status: PullStatus;
  choice: PullChoice;
  aftermath: string; // how it felt afterward
  timestamp: string;
}

/**
 * Trait 8 weekly aliveness check-in. The trait swings between two poles:
 * 0 = deadened/numb, 100 = emotionally intoxicated. 50 = calm and alive —
 * the middle is the recovery, not either end.
 */
export interface AlivenessCheckIn {
  id: string;
  weekOf: string; // ISO date (the Sunday of the week)
  value: number; // 0-100
  note: string;
  timestamp: string;
}

/**
 * Trait 8 sensory reset session — the workbook's Orientation practice
 * (look at some things, make a noise, eat a peach, smell some cinnamon,
 * pat your face) logged with before/after charge.
 */
export type SenseDoor = "sight" | "sound" | "taste" | "smell" | "touch";

export interface SensoryResetEntry {
  id: string;
  doors: SenseDoor[];
  before: number; // 0-100 charge before (0 = numb, 100 = spiking)
  after: number;  // 0-100 charge after
  note: string;
  timestamp: string;
}

/**
 * Trait 9 rescue radar: catching the rescue impulse in real time — the urge,
 * the feeling underneath it, and what we actually did.
 */
export type RescueAction = "rescued" | "paused" | "asked-first" | "compassion";

export interface RescueImpulseEntry {
  id: string;
  situation: string;
  urge: number; // 0-100 strength of the pull to rescue
  feelingUnderneath: string; // emptiness, importance, being needed...
  action: RescueAction;
  note: string;
  timestamp: string;
}

/**
 * Trait 9 drama triangle mapper: one drama, the corner we took
 * (persecutor / rescuer / victim), how the corners rotated, and the
 * compassionate step out.
 */
export type TriangleRole = "persecutor" | "rescuer" | "victim" | "outside";

export interface DramaTriangleEntry {
  id: string;
  situation: string;
  myRole: TriangleRole;
  rotation: string; // who played what, and how the roles rotated
  exitMove: string; // the step out — compassion without joining the insanity
  timestamp: string;
}

/**
 * Trait 9 love/pity ledger (Flip Side Q3): a growing two-column list of
 * actions coming from love vs. actions coming from pity/rescue.
 */
export type LoveLedgerKind = "love" | "pity";

export interface LoveActionItem {
  id: string;
  text: string;
  kind: LoveLedgerKind;
}

/**
 * Trait 9 ask-for-help experiment (Other Laundry List Q8): practicing the very
 * thing the trait forbids — asking — with discomfort measured before and after.
 */
export interface AskHelpEntry {
  id: string;
  request: string;
  who: string;
  discomfortBefore: number; // 0-100
  discomfortAfter: number;  // 0-100
  outcome: string;
  timestamp: string;
}

export interface Concept {
  id: string;
  name: string;
  shortDefinition: string;
  longDefinition: string;
  relatedTraits: number[];
}
