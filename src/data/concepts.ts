import type { Concept } from "@/lib/types";

export const CONCEPTS: Concept[] = [
  {
    id: "dissociation",
    name: "Dissociation",
    shortDefinition: "A mechanism that allows the mind to separate or compartmentalize memories or thoughts from normal consciousness.",
    longDefinition: "Dissociation is a survival mechanism learned in childhood to cope with chaos or trauma. The split-off mental contents are not erased — they resurface spontaneously or get triggered by objects or events. In ACA we see dissociation as the engine behind many Laundry List traits: we master the moves of isolating, fearing, and then acting out — running a loop we can't see from inside it. Related terms: 'learned dissociation,' 'continuum of dissociation,' 'involuntary dissociation.'",
    relatedTraits: [1, 10, 14],
  },
  {
    id: "false-self",
    name: "False Self",
    shortDefinition: "The performed version of ourselves we developed to stay safe in an unsafe family.",
    longDefinition: "We buried, hid, denied, abandoned, and betrayed our True Self to present something more acceptable to the adults around us. The false self is the armor — people pleaser, problem solver, quick thinker, decision maker, hero, martyr. Outwardly it can look like success. Inwardly it requires constant adrenaline to maintain.",
    relatedTraits: [1, 2, 11],
  },
  {
    id: "true-self",
    name: "True Self",
    shortDefinition: "Who we actually are underneath the survival performance.",
    longDefinition: "The True Self is what got buried to survive. Recovery work — especially reparenting and the ACA Twelve Steps — is the process of meeting it again, often for the first time since childhood. It tends to show up quiet at first: in the pause before a reactive 'yes,' in a real preference, in a feeling we'd normally override.",
    relatedTraits: [1, 2, 10, 11],
  },
  {
    id: "reparenting",
    name: "Reparenting",
    shortDefinition: "Becoming the loving parent we needed — to ourselves, now.",
    longDefinition: "Reparenting is the daily practice of giving ourselves what our caregivers couldn't: safety, consistency, gentleness, accurate reflection, protection, and permission. It's how we interrupt the childhood reactions that still run us and choose an adult response instead. Non-dominant handwriting and Inner Child dialogue are classic reparenting tools.",
    relatedTraits: [1, 2, 3, 6, 7, 11, 12],
  },
  {
    id: "inner-child",
    name: "Inner Child",
    shortDefinition: "The younger part of us that still carries the original wounds and the original aliveness.",
    longDefinition: "In ACA the Inner Child is not metaphor — it's the part of our psyche that got frozen in the moments we couldn't process. She/he still holds the fear, the grief, the creativity, and the joy. We learn to listen and respond rather than silencing or overriding.",
    relatedTraits: [1, 10, 11, 12],
  },
  {
    id: "loving-parent",
    name: "Loving Parent",
    shortDefinition: "The grown-up inside us who can hold the Inner Child with steadiness.",
    longDefinition: "The Loving Parent is the adult self we cultivate through recovery — the one who can say 'I've got you' and mean it. In many meetings it's also called the Higher Self. Reparenting is the Loving Parent doing the work with the Inner Child.",
    relatedTraits: [1, 6, 11, 12],
  },
  {
    id: "acting-out",
    name: "Acting Out",
    shortDefinition: "Behaving out a subconscious conflict instead of feeling it.",
    longDefinition: "Mental health professionals use 'acting out' to describe behavior driven by a conflict we can't yet see or name. In ACA, The Other Laundry List captures the acting-out half of each trait: fearing authority and then becoming the intimidating authority, fearing abandonment and then abandoning first, and so on.",
    relatedTraits: [1, 2, 3, 4, 6, 9, 12, 14],
  },
  {
    id: "para-alcoholic",
    name: "Para-Alcoholic",
    shortDefinition: "Someone who picked up the characteristics of alcoholism without picking up the drink.",
    longDefinition: "Alcoholism is a family disease. Adult children often inherit the patterns — reactivity, control, denial, rigidity, extremes — even if we never drink. Traits 13 and 14 address the para-alcoholic directly: we became carriers of the disease's shape, not its substance.",
    relatedTraits: [13, 14],
  },
  {
    id: "hypervigilance",
    name: "Hypervigilance",
    shortDefinition: "A nervous system stuck scanning for threat.",
    longDefinition: "Hypervigilance is the adaptation that let us survive unpredictable caregivers — always reading the room, always ready to brace. In adulthood it fuels isolation, over-responsibility, and exhaustion. Somatic practices and consistent ACA work help the system learn new information: it's not that time anymore, and we are no longer small.",
    relatedTraits: [1, 3, 6, 8],
  },
  {
    id: "twelve-steps",
    name: "The ACA Twelve Steps",
    shortDefinition: "The program of action that moves us from survival into recovery.",
    longDefinition: "ACA adapts the original Twelve Steps to the adult-child experience. They are the tool the Flip Side of every trait points to — admitting powerlessness over the effects, coming to believe, deciding, taking inventory, making amends, and carrying the message. In this workbook, the Flip Sides explicitly ask which Steps helped with which trait.",
    relatedTraits: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  },
];

export function getConcept(id: string) {
  return CONCEPTS.find((c) => c.id === id);
}

export function getConceptsForTrait(traitId: number) {
  return CONCEPTS.filter((c) => c.relatedTraits.includes(traitId));
}
