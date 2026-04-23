import type { Trait } from "@/lib/types";

export const TRAITS: Trait[] = [
  {
    id: 1,
    shortName: "Isolation & Fear of Authority",
    active: true,
    mainListDate: "2026-04-11",
    flipSideDate: "2026-04-18",
    statements: {
      laundry: "We became isolated and afraid of people and authority figures.",
      other:
        "To cover our fear of people and our dread of isolation we tragically become the very authority figures who frighten others and cause them to withdraw.",
      flipSide:
        "We move out of isolation and are not unrealistically afraid of other people, even authority figures.",
      flipSideOther:
        "We face and resolve our fear of people and our dread of isolation and stop intimidating others with our power and position.",
    },
  },
  {
    id: 2,
    shortName: "Approval Seeking & Lost Identity",
    active: true,
    mainListDate: "2026-04-25",
    flipSideDate: "2026-05-02",
    statements: {
      laundry: "We became approval seekers and lost our identity in the process.",
      other:
        "To avoid becoming enmeshed and entangled with other people and losing ourselves in the process, we become rigidly self-sufficient. We disdain the approval of others.",
      flipSide: "We do not depend on others to tell us who we are.",
      flipSideOther:
        "We realize the sanctuary we have built to protect the frightened and injured child within has become a prison and we become willing to risk moving out of isolation.",
    },
  },
  {
    id: 3,
    shortName: "Fear of Anger & Criticism",
    active: false,
    mainListDate: "2026-05-09",
    flipSideDate: "2026-05-16",
    statements: {
      laundry: "We are frightened by angry people and any personal criticism.",
      other: "",
      flipSide: "",
      flipSideOther: "",
    },
  },
  {
    id: 4,
    shortName: "Attraction to Compulsive Personalities",
    active: false,
    mainListDate: "2026-05-30",
    flipSideDate: "2026-06-06",
    statements: {
      laundry:
        "We either become alcoholics, marry them, or both, or find another compulsive personality to fulfill our sick abandonment needs.",
      other: "",
      flipSide: "",
      flipSideOther: "",
    },
  },
  {
    id: 5,
    shortName: "Victim Viewpoint",
    active: false,
    mainListDate: "2026-06-13",
    flipSideDate: "2026-06-20",
    statements: {
      laundry:
        "We live life from the viewpoint of victims and are attracted by that weakness in our love and friendship relationships.",
      other: "",
      flipSide: "",
      flipSideOther: "",
    },
  },
  {
    id: 6,
    shortName: "Overdeveloped Responsibility",
    active: false,
    mainListDate: "2026-06-27",
    flipSideDate: "2026-07-11",
    statements: {
      laundry:
        "We have an overdeveloped sense of responsibility and it is easier for us to be concerned with others rather than ourselves.",
      other: "",
      flipSide: "",
      flipSideOther: "",
    },
  },
  {
    id: 7,
    shortName: "Guilt When Standing Up",
    active: false,
    mainListDate: "2026-07-18",
    flipSideDate: "2026-07-25",
    statements: {
      laundry:
        "We get guilt feelings when we stand up for ourselves instead of giving in to others.",
      other: "",
      flipSide: "",
      flipSideOther: "",
    },
  },
  {
    id: 8,
    shortName: "Addicted to Excitement",
    active: false,
    mainListDate: "2026-08-01",
    flipSideDate: "2026-08-08",
    statements: {
      laundry: "We became addicted to excitement.",
      other: "",
      flipSide: "",
      flipSideOther: "",
    },
  },
  {
    id: 9,
    shortName: "Confusing Love & Pity",
    active: false,
    mainListDate: "2026-08-15",
    flipSideDate: "2026-08-22",
    statements: {
      laundry:
        "We confuse love and pity and tend to 'love' people we can pity and rescue.",
      other: "",
      flipSide: "",
      flipSideOther: "",
    },
  },
  {
    id: 10,
    shortName: "Stuffed Feelings",
    active: false,
    mainListDate: "2026-08-29",
    flipSideDate: "2026-09-12",
    statements: {
      laundry:
        "We have stuffed our feelings from our traumatic childhoods and have lost the ability to feel or express our feelings.",
      other: "",
      flipSide: "",
      flipSideOther: "",
    },
  },
  {
    id: 11,
    shortName: "Harsh Self-Judgment",
    active: false,
    mainListDate: "2026-09-19",
    flipSideDate: "2026-09-26",
    statements: {
      laundry:
        "We judge ourselves harshly and have a very low sense of self-esteem.",
      other: "",
      flipSide: "",
      flipSideOther: "",
    },
  },
  {
    id: 12,
    shortName: "Fear of Abandonment",
    active: false,
    mainListDate: "2026-10-03",
    flipSideDate: "2026-10-10",
    statements: {
      laundry:
        "We are dependent personalities who are terrified of abandonment and will do anything to hold on to a relationship.",
      other: "",
      flipSide: "",
      flipSideOther: "",
    },
  },
  {
    id: 13,
    shortName: "Para-Alcoholic Traits",
    active: false,
    mainListDate: "2026-10-17",
    flipSideDate: "2026-10-24",
    statements: {
      laundry:
        "Alcoholism is a family disease and we became para-alcoholics and took on the characteristics of that disease even though we did not pick up the drink.",
      other: "",
      flipSide: "",
      flipSideOther: "",
    },
  },
  {
    id: 14,
    shortName: "Reactors, Not Actors",
    active: false,
    mainListDate: "2026-10-31",
    flipSideDate: "2026-11-07",
    statements: {
      laundry: "Para-alcoholics are reactors rather than actors.",
      other: "",
      flipSide: "",
      flipSideOther: "",
    },
  },
];

// Thematic family each trait belongs to. Mirrors the trait constellation.
export type TraitTheme = "fear" | "identity" | "attachment" | "feeling" | "family";

export const TRAIT_THEMES: Record<number, TraitTheme> = {
  1: "fear",
  2: "identity",
  3: "fear",
  4: "attachment",
  5: "identity",
  6: "identity",
  7: "identity",
  8: "feeling",
  9: "attachment",
  10: "feeling",
  11: "identity",
  12: "attachment",
  13: "family",
  14: "family",
};

export const THEME_META: Record<
  TraitTheme,
  { name: string; color: string; description: string }
> = {
  fear: {
    name: "Fear",
    color: "var(--accent)",
    description: "Fear of people, authority, anger, criticism, abandonment.",
  },
  identity: {
    name: "Identity",
    color: "var(--primary)",
    description: "Approval seeking, lost identity, harsh self-judgment, over-responsibility.",
  },
  attachment: {
    name: "Attachment",
    color: "#8B7BA8",
    description: "Who we pick, who picks us, fear of abandonment, confusing love and pity.",
  },
  feeling: {
    name: "Feeling",
    color: "#D4A84B",
    description: "Stuffing feelings, addiction to excitement — what happens to the inner life.",
  },
  family: {
    name: "Family disease",
    color: "var(--sage)",
    description: "Para-alcoholic traits — being a carrier of the disease's shape.",
  },
};

export const QUADRANT_LABELS: Record<string, { label: string; subtitle: string; color: string }> = {
  laundry: {
    label: "The Laundry List",
    subtitle: "The original trait",
    color: "var(--primary)",
  },
  other: {
    label: "The Other Laundry List",
    subtitle: "How we act it out",
    color: "var(--accent)",
  },
  flipSide: {
    label: "Flip Side of The Laundry List",
    subtitle: "The recovery",
    color: "var(--sage)",
  },
  flipSideOther: {
    label: "Flip Side of The Other Laundry List",
    subtitle: "Recovery from acting out",
    color: "#8B7BA8",
  },
};
