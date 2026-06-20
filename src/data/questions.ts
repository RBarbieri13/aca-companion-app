import type { ReflectionQuestion } from "@/lib/types";

// Reflection bank — original prompts, distributed across the four facets.
// Keyed at render time as `stepId::facet::index`.

type Q = ReflectionQuestion;
const q = (stepId: number, facet: Q["facet"], index: number, question: string): Q => ({
  stepId,
  facet,
  index,
  question,
});

export const QUESTIONS: Q[] = [
  // ----- Step 1 -----
  q(1, "step", 0, "Describe a time your drinking did something you'd promised yourself it wouldn't — what did it cost?"),
  q(1, "step", 1, "Where in your life has 'I can handle it' quietly stopped being true?"),
  q(1, "principle", 0, "What is the management story you've told the longest about your drinking?"),
  q(1, "principle", 1, "What feels accurate, not shameful, about the sentence 'I am powerless over alcohol'?"),
  q(1, "working", 0, "List three areas — money, relationships, health, mood, time — where things have become unmanageable, and one concrete example each."),
  q(1, "working", 1, "Who is someone safe you could say the truth of Step One out loud to, and what holds you back?"),
  q(1, "promise", 0, "What might become possible if you stopped spending energy controlling the uncontrollable?"),
  q(1, "promise", 1, "What relief, if any, have you felt simply from stopping the pretending?"),

  // ----- Step 2 -----
  q(2, "step", 0, "What does 'a Power greater than ourselves' honestly mean to you right now — even if the answer is 'I'm not sure'?"),
  q(2, "step", 1, "What does 'restored to sanity' look like in one ordinary moment of your week?"),
  q(2, "principle", 0, "Where is hope hard for you, and what would 'leaving the door ajar' look like there?"),
  q(2, "principle", 1, "If you've been hurt by religion, what's it like to be offered openness instead of a creed?"),
  q(2, "working", 0, "Write down one moment something carried you that your own willpower could not."),
  q(2, "working", 1, "What is your Higher Power NOT? (Name the old image you need to set down.)"),
  q(2, "promise", 0, "What would change if you were no longer your own only source of rescue?"),
  q(2, "promise", 1, "Where has a small 'maybe' started to feel a little more like a fact?"),

  // ----- Step 3 -----
  q(3, "step", 0, "What are you gripping the hardest — the part of life you most want to keep managing yourself?"),
  q(3, "step", 1, "Write a surrender statement in your own plain words. What would you actually say?"),
  q(3, "principle", 0, "Where could you act in faith — before you feel certain — because the old way is finished?"),
  q(3, "principle", 1, "What does it mean to you that you're turning your life over to *care*, not to a tyrant?"),
  q(3, "working", 0, "Describe a time you 'turned it over' and what changed — or didn't."),
  q(3, "working", 1, "How will you re-decide on an ordinary day when self-will comes roaring back?"),
  q(3, "promise", 0, "What rest might be waiting in no longer having to run everything?"),
  q(3, "promise", 1, "What's one next right thing you could do today without solving the whole future?"),

  // ----- Step 4 -----
  q(4, "step", 0, "Pick one resentment: who, the cause, what it threatens in you, and your part."),
  q(4, "step", 1, "What have you been avoiding looking at, and what makes it feel unsafe to see?"),
  q(4, "principle", 0, "Where do you need courage to be honest without sliding into self-attack?"),
  q(4, "principle", 1, "Name one asset — a way you've survived, shown up, or loved — that belongs in a fearless inventory."),
  q(4, "working", 0, "What support (sponsor, therapist, friend) is in place so you can go at the pace of safety?"),
  q(4, "working", 1, "Choose one fear and trace it: the fear, why it's there, what it costs you, and a faith-or-action response."),
  q(4, "promise", 0, "What might it feel like to have these resentments be a list you can work, rather than a haunted house?"),
  q(4, "promise", 1, "What's the difference, for you, between seeing your part and blaming yourself for everything?"),

  // ----- Step 5 -----
  q(5, "step", 0, "What is the one thing you most hope you'll never have to say out loud — and what does keeping it cost?"),
  q(5, "step", 1, "What does 'the exact nature of our wrongs' ask of you that a vague 'I've made mistakes' does not?"),
  q(5, "principle", 0, "Where do you keep a gap between the self you show and the self you are?"),
  q(5, "principle", 1, "What would 'being one whole person, nothing hidden' feel like in your body?"),
  q(5, "working", 0, "Who could you read your inventory to — someone who can keep a confidence and won't flinch? Why them?"),
  q(5, "working", 1, "Rate the weight on your chest right now (0–100). What do you imagine it might be after?"),
  q(5, "promise", 0, "Where might you start to feel part of the human race rather than a fraud sneaking among it?"),
  q(5, "promise", 1, "What energy could come back to you once it's no longer spent on hiding?"),

  // ----- Step 6 -----
  q(6, "step", 0, "Name one defect you're glad to be rid of, and one you're secretly still a little attached to."),
  q(6, "step", 1, "What survival habit once kept you safe and now mostly causes harm?"),
  q(6, "principle", 0, "Where is your willingness still partial, and can you let that be honest rather than forced?"),
  q(6, "principle", 1, "Pick a defect and name the fear it's been protecting all this time."),
  q(6, "working", 0, "For one defect you're ready to release, what would you get to practice instead?"),
  q(6, "working", 1, "Where do you catch yourself defending a pattern you used to justify?"),
  q(6, "promise", 0, "What armor have you worn so long you forgot it was heavy?"),
  q(6, "promise", 1, "What changes when you stop arguing for your own limitations?"),

  // ----- Step 7 -----
  q(7, "step", 0, "Write your own honest version of a Seventh-Step ask, in plain words."),
  q(7, "step", 1, "What in your character can't be fixed by sheer effort, no matter how hard you've tried?"),
  q(7, "principle", 0, "Where have you mistaken self-loathing for humility?"),
  q(7, "principle", 1, "What would 'right-sized' look like for you — neither the worst person alive nor the center of the universe?"),
  q(7, "working", 0, "Describe a shortcoming that has eased gradually rather than vanished overnight."),
  q(7, "working", 1, "Where could you ask for help today as plainly as you'd ask a doctor about a broken arm?"),
  q(7, "promise", 0, "What exhausting self-improvement project do you finally get to set down?"),
  q(7, "promise", 1, "What's it like to need help and still feel worthy?"),

  // ----- Step 8 -----
  q(8, "step", 0, "What's it like to put yourself on your own amends list?"),
  q(8, "step", 1, "Whose name do you most want to leave off the list — and what's keeping it on, or off?"),
  q(8, "principle", 0, "Pick one person you harmed and describe them as a real human with a real injury, not a character in your story."),
  q(8, "principle", 1, "Where could brotherly love mean letting someone back into focus as a person again?"),
  q(8, "working", 0, "Draft your list: name, the harm in a sentence, and your honest willingness (0–100) for each."),
  q(8, "working", 1, "For a name where willingness is low, what might help it ripen — prayer, time, conversation?"),
  q(8, "promise", 0, "What's the difference between a fog of free-floating guilt and a clear, finite list?"),
  q(8, "promise", 1, "What becomes possible once willingness — not yet action — is genuinely present?"),

  // ----- Step 9 -----
  q(9, "step", 0, "In your own experience, what's the difference between an apology and an amend?"),
  q(9, "step", 1, "For one amends, work the 'would it injure them or others?' question honestly. What does it tell you?"),
  q(9, "principle", 0, "Where might 'rigorous honesty' actually be a way to harm someone — and how do you avoid that?"),
  q(9, "principle", 1, "What does cleaning *only* your side of the street ask you to let go of?"),
  q(9, "working", 0, "Choose one amend: type (direct / living / indirect / not-yet), the plan, and the next small step."),
  q(9, "working", 1, "What does 'go at the pace of safety' mean for your Ninth-Step work right now?"),
  q(9, "promise", 0, "Which Promise have you felt beginning to come true as you make amends?"),
  q(9, "promise", 1, "Where would it feel different to be in a room with someone from your past with your head level?"),

  // ----- Step 10 -----
  q(10, "step", 0, "What would a 30-second nightly spot-check look like for you — and what gets in the way of doing it?"),
  q(10, "step", 1, "Where has letting something sit turned a ten-second fix into a long estrangement?"),
  q(10, "principle", 0, "What helps you keep a daily inventory gentle instead of a nightly self-trial?"),
  q(10, "principle", 1, "Where in your life is the slow power of repetition more useful than one dramatic effort?"),
  q(10, "working", 0, "Run tonight's check: were you resentful, selfish, dishonest, or afraid? Do you owe an amends?"),
  q(10, "working", 1, "Write one gratitude for today — small is fine."),
  q(10, "promise", 0, "What's it like to end a day current with your own life, nothing piling up?"),
  q(10, "promise", 1, "What is 'emotional sobriety' starting to mean for you?"),

  // ----- Step 11 -----
  q(11, "step", 0, "What does 'conscious contact' look like for you on an ordinary morning?"),
  q(11, "step", 1, "What's it like to pray only for knowledge of a Higher Power's will, not for the outcomes you want?"),
  q(11, "principle", 0, "Where do you need patience as a practice rather than just waiting for something to change?"),
  q(11, "principle", 1, "What does paying attention — really attending — open up that hurrying closes down?"),
  q(11, "working", 0, "Design your bookends: a morning intention and a night review. What would each include?"),
  q(11, "working", 1, "Describe a recent moment you paused and asked 'what's the next right thing?' instead of reacting."),
  q(11, "promise", 0, "Where have you felt a steadiness that held even when circumstances didn't cooperate?"),
  q(11, "promise", 1, "What loosens its grip as intuition and trust grow?"),

  // ----- Step 12 -----
  q(12, "step", 0, "Describe the shape of your own spiritual awakening — gradual or sudden, and how you noticed it."),
  q(12, "step", 1, "Where could you 'practice these principles' off the page — at work, at home, in conflict — this week?"),
  q(12, "principle", 0, "How does service guard your recovery against self-obsession and relapse?"),
  q(12, "principle", 1, "What does 'attraction, not promotion' mean for how you carry the message?"),
  q(12, "working", 0, "Name one ordinary act of service you could do this week — a call, a chair, an honest share."),
  q(12, "working", 1, "Which principle did you actually use today, and where?"),
  q(12, "promise", 0, "How could the very wreckage of your Step One become useful to a newcomer?"),
  q(12, "promise", 1, "What does it mean to keep your recovery by giving it away?"),
];

export function questionsForStep(stepId: number): Q[] {
  return QUESTIONS.filter((x) => x.stepId === stepId);
}
