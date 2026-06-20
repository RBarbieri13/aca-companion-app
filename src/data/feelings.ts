export interface FeelingCategory {
  name: string;
  color: string;
  feelings: string[];
}

export const FEELING_WHEEL: FeelingCategory[] = [
  {
    name: "Sad",
    color: "#6B8AB8",
    feelings: [
      "Lonely",
      "Hurt",
      "Ashamed",
      "Disappointed",
      "Guilty",
      "Grief",
      "Empty",
      "Hopeless",
    ],
  },
  {
    name: "Angry",
    color: "#C97B5E",
    feelings: [
      "Frustrated",
      "Resentful",
      "Irritated",
      "Bitter",
      "Jealous",
      "Furious",
      "Powerless",
      "Betrayed",
    ],
  },
  {
    name: "Afraid",
    color: "#8B7BA8",
    feelings: [
      "Anxious",
      "Insecure",
      "Overwhelmed",
      "Trapped",
      "Worried",
      "Panicked",
      "Vulnerable",
      "Small",
    ],
  },
  {
    name: "Happy",
    color: "#D4A84B",
    feelings: [
      "Content",
      "Grateful",
      "Proud",
      "Hopeful",
      "Excited",
      "Peaceful",
      "Loving",
      "Connected",
    ],
  },
  {
    name: "Tender",
    color: "#A8B8A0",
    feelings: [
      "Compassionate",
      "Trusting",
      "Soft",
      "Open",
      "Moved",
      "Present",
      "Held",
      "Safe",
    ],
  },
  {
    name: "Numb",
    color: "#9CA3AF",
    feelings: [
      "Disconnected",
      "Blank",
      "Frozen",
      "Distant",
      "Flat",
      "Spaced out",
      "Checked out",
      "Dissociated",
    ],
  },
];
