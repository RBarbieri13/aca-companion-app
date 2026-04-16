import type { ReflectionQuestion } from "@/lib/types";

export const TRAIT_1_QUESTIONS: ReflectionQuestion[] = [
  // The Laundry List
  { traitId: 1, quadrant: "laundry", index: 0, question: "When have I been isolated and afraid of people and authority figures?" },
  { traitId: 1, quadrant: "laundry", index: 1, question: "Where and when has this occurred?" },
  { traitId: 1, quadrant: "laundry", index: 2, question: "How does my body react when I am in fear?" },
  { traitId: 1, quadrant: "laundry", index: 3, question: "What do I do to help my body come back to a calm inner state?" },
  { traitId: 1, quadrant: "laundry", index: 4, question: "Has isolation become almost comfortable? If so, how?" },
  { traitId: 1, quadrant: "laundry", index: 5, question: "List all the people or types of people you perceive today as authority figures." },
  { traitId: 1, quadrant: "laundry", index: 6, question: "This trait says \"we became afraid of people\". Who have you been afraid of in the past and who are you afraid of now? This might be certain people with names or it might be types of people." },

  // The Other Laundry List
  { traitId: 1, quadrant: "other", index: 0, question: "How do I cover my fear of people?" },
  { traitId: 1, quadrant: "other", index: 1, question: "What situations in my life cause me to dread isolation?" },
  { traitId: 1, quadrant: "other", index: 2, question: "When have I been an authority figure who frightens or intimidates others?" },
  { traitId: 1, quadrant: "other", index: 3, question: "When I am acting as an authority figure, who have I caused to withdraw?" },
  { traitId: 1, quadrant: "other", index: 4, question: "Who dominated or intimidated me when I was a child?" },
  { traitId: 1, quadrant: "other", index: 5, question: "What have I done to purposely frighten or dominate a person?" },
  { traitId: 1, quadrant: "other", index: 6, question: "Describe a relationship in detail you've been involved in where one person dominated." },

  // The Flip Side of The Laundry List
  { traitId: 1, quadrant: "flipSide", index: 0, question: "What tools have I used to move out of isolation?" },
  { traitId: 1, quadrant: "flipSide", index: 1, question: "Which ACA Steps have helped me gauge when it was appropriate to be afraid of other people, even authority figures?" },
  { traitId: 1, quadrant: "flipSide", index: 2, question: "Which people in my life do I consider an authority figure? Can these people's status change over time?" },
  { traitId: 1, quadrant: "flipSide", index: 3, question: "Since finding ACA, what phases have I gone through in coming out of isolation?" },

  // The Flip Side of The Other Laundry List
  { traitId: 1, quadrant: "flipSideOther", index: 0, question: "How has the ACA program helped me face and resolve my fear of people and dread of isolation?" },
  { traitId: 1, quadrant: "flipSideOther", index: 1, question: "What principles of the ACA program have allowed me to stop intimidating others with my power and position?" },
  { traitId: 1, quadrant: "flipSideOther", index: 2, question: "How do I appropriately act within my power and position without intimidating others?" },
  { traitId: 1, quadrant: "flipSideOther", index: 3, question: "What specific fears of people and authority figures have lessened for me?" },
  { traitId: 1, quadrant: "flipSideOther", index: 4, question: "Are there people who are realistically fearsome? If so, make a list of those people or types of people and why they are on your list." },
];

export const ALL_QUESTIONS: ReflectionQuestion[] = [...TRAIT_1_QUESTIONS];

export function getQuestionsForTrait(traitId: number) {
  return ALL_QUESTIONS.filter((q) => q.traitId === traitId);
}

export function getQuestionsForQuadrant(traitId: number, quadrant: string) {
  return ALL_QUESTIONS.filter((q) => q.traitId === traitId && q.quadrant === quadrant);
}
