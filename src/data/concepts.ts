import type { Concept } from "@/lib/types";

export const CONCEPTS: Concept[] = [
  {
    id: "dissociation",
    name: "Dissociation",
    shortDefinition: "A mechanism that allows the mind to separate or compartmentalize memories or thoughts from normal consciousness.",
    longDefinition: "Dissociation is a survival mechanism learned in childhood to cope with chaos or trauma. The split-off mental contents are not erased — they resurface spontaneously or get triggered by objects or events. In ACA we see dissociation as the engine behind many Laundry List traits: we master the moves of isolating, fearing, and then acting out — running a loop we can't see from inside it. In Trait 3 the workbook names the 'Game of Dissociation' directly: the avoider position numbs us with worry, fear and pain, while the aggressor position numbs us with the adrenaline of controlling others — both keep the original hurt out of view. In Trait 4 the Game lets us play either the abandoned (victim) of The Laundry List or the abandoner (victimizer) of The Other Laundry List — an endlessly repetitive cycle that keeps us from remembering our traumatic childhood.",
    relatedTraits: [1, 2, 3, 4, 10, 14],
  },
  {
    id: "false-self",
    name: "False Self",
    shortDefinition: "The performed version of ourselves we developed to stay safe in an unsafe family.",
    longDefinition: "We buried, hid, denied, abandoned, and betrayed our True Self to present something more acceptable to the adults around us. The false self is the armor — people pleaser, problem solver, quick thinker, decision maker, hero, martyr. Outwardly it can look like success. Inwardly it requires constant adrenaline to maintain. In Trait 2 the workbook names this directly as the 'people-pleasing false self' that feels like a solution but is dishonest, and leads to despair, anger, and trying to control the uncontrollable. In Trait 3, the false self is what we wield anger to defend — 'tough love,' cutting 'helpful' criticism, contempt and ridicule — until our renewed True Self esteem makes that defense unnecessary.",
    relatedTraits: [1, 2, 3, 11],
  },
  {
    id: "true-self",
    name: "True Self",
    shortDefinition: "Who we actually are underneath the survival performance.",
    longDefinition: "The True Self is what got buried to survive. Recovery work — especially reparenting and the ACA Twelve Steps — is the process of meeting it again, often for the first time since childhood. It tends to show up quiet at first: in the pause before a reactive 'yes,' in a real preference, in a feeling we'd normally override. In Trait 2 we begin to free our True Self from the 'intricate web of denial' and become part of a fellowship that celebrates our individuality. In Trait 3 the renewed True Self esteem and worth allow us to admit we are human and likely to make mistakes — so criticism is no longer a threat to who we are.",
    relatedTraits: [1, 2, 3, 10, 11],
  },
  {
    id: "reparenting",
    name: "Reparenting",
    shortDefinition: "Becoming the loving parent we needed — to ourselves, now.",
    longDefinition: "Reparenting is the daily practice of giving ourselves what our caregivers couldn't: safety, consistency, gentleness, accurate reflection, protection, and permission. It's how we interrupt the childhood reactions that still run us and choose an adult response instead. Non-dominant handwriting and Inner Child dialogue are classic reparenting tools. Trait 4 reminds us that reparenting is more than getting in touch with feelings and buried memories — it is a steady, ongoing commitment that, over time, lets us create true and lasting intimacy first with our True Self and then with others who are equally available to bond.",
    relatedTraits: [1, 2, 3, 4, 6, 7, 11, 12],
  },
  {
    id: "inner-child",
    name: "Inner Child",
    shortDefinition: "The younger part of us that still carries the original wounds and the original aliveness.",
    longDefinition: "In ACA the Inner Child is not metaphor — it's the part of our psyche that got frozen in the moments we couldn't process. She/he still holds the fear, the grief, the creativity, and the joy. We learn to listen and respond rather than silencing or overriding. In Trait 2 the workbook speaks of the 'frightened and injured child within' — the one we built our sanctuary of isolation to protect. In Trait 4 the Flip Side names the recovery directly: we accept and comfort the isolated and hurt Inner Child we have abandoned and disavowed. In Trait 5, when someone starts to walk away from us, we no longer resist their leaving — instead we use the Steps and reparenting to comfort the Inner Child who fears being alone.",
    relatedTraits: [1, 2, 4, 5, 10, 11, 12],
  },
  {
    id: "loving-parent",
    name: "Loving Parent",
    shortDefinition: "The grown-up inside us who can hold the Inner Child with steadiness.",
    longDefinition: "The Loving Parent is the adult self we cultivate through recovery — the one who can say 'I've got you' and mean it. In many meetings it's also called the Higher Self. Reparenting is the Loving Parent doing the work with the Inner Child. In Trait 4 it is the inner loving parent that finally stops abandoning the child within. In Trait 5 the Flip Side names a partnership of inner figures: the inner loving parent, the critical survival inner parent, the Inner Child, and our Higher Power — and that partnership is where wholeness and completeness come from.",
    relatedTraits: [1, 2, 4, 5, 6, 11, 12],
  },
  {
    id: "acting-out",
    name: "Acting Out",
    shortDefinition: "Behaving out a subconscious conflict instead of feeling it.",
    longDefinition: "Mental health professionals use 'acting out' to describe behavior driven by a conflict we can't yet see or name. In ACA, The Other Laundry List captures the acting-out half of each trait: fearing authority and then becoming the intimidating authority, fearing abandonment and then abandoning first, and so on. In Trait 2 it shows up as the swing from enmeshment to rigid self-sufficiency — both of which abandon the self. In Trait 3 it is the flip from anger and criticism avoider to angry critic — 'if we can't beat them, we'll join them' — usually triggered when someone reminds us of our own buried vulnerabilities.",
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
  {
    id: "reversed-flow",
    name: "Reversed Flow (Game of Dissociation)",
    shortDefinition: "When the child works to earn the parent's approval instead of receiving it.",
    longDefinition: "Children need, seek, and expect that parents will approve of them. When a parent is emotionally, physically, or spiritually absent, the relationship's current flow reverses: the child becomes the one working to gain approval by acting however seems to get attention and love. This is the initiation of the 'Game of Dissociation.' Our true identities are hidden from our caregivers and, more importantly, from ourselves. We lose an essential ingredient to healthy development — to be valued for who we are versus who our caregivers wanted us to be. We placate, and we become an unwilling victim in the Game.",
    relatedTraits: [2, 11],
  },
  {
    id: "enmeshment",
    name: "Enmeshment",
    shortDefinition: "Losing yourself inside a relationship; boundaries treated as betrayal.",
    longDefinition: "Enmeshment is the merging of selves that happens when boundaries were unsafe or unknown in childhood. We don't care about boundaries — we are focused on holding others hostage. We become tangled up in others and lose our identities. The fear of enmeshment is what Trait 2's Other Laundry List names as the fuel for the opposite extreme: rigid self-sufficiency. Both poles leave the self behind.",
    relatedTraits: [2, 4, 9, 12],
  },
  {
    id: "rigid-self-sufficiency",
    name: "Rigid Self-Sufficiency",
    shortDefinition: "The sanctuary we built to avoid needing anyone — which quietly becomes a prison.",
    longDefinition: "To avoid enmeshment and the risk of losing ourselves, we swing to the opposite pole. We are the lonely 'self starters' who are a 'pleasure to work with' because we require little or no supervision; the quiet neighbor who rarely talks to anyone; the compliant partner in relationships. The payoff is warding off disappointment by not allowing ourselves to express any needs or to admit that we need anything. The denial of our needs feels like a small price to pay — until the sanctuary becomes a prison, and we are willing to risk moving out of isolation.",
    relatedTraits: [2, 6],
  },
  {
    id: "inside-drugs",
    name: "Inside Drugs (Self-Dosing)",
    shortDefinition: "Worry, fear, and pain used as the body's own numbing chemicals.",
    longDefinition: "When the trauma and loss we experienced as children were too great for our tiny bodies to withstand, we 'dosed' ourselves with the inside drugs of worry (cortisol), fear (adrenaline), and pain (melatonin) to numb our feelings. As adults we keep the prescription running — sometimes by avoiding anger and criticism (the victim position), sometimes by becoming angry and critical ourselves and 'dosing' on the adrenaline of taking charge and controlling others. Either way, the chemistry blocks our painful memories and the original hurt. Recovery means feeling the feelings instead of dosing them away.",
    relatedTraits: [3, 8, 10],
  },
  {
    id: "sober-listening",
    name: "Sober Listening",
    shortDefinition: "Hearing criticism from True Self esteem instead of childhood fear.",
    longDefinition: "On the Flip Side of Trait 3 we learn to hear anger and criticism without being petrified by it. We can stand in the present, ask ourselves what — if anything — we did to harm the person, and take responsibility when we are in the wrong. If nothing is of our doing we simply say, 'Thank you for sharing. I am sorry you feel that way.' We sit with the observation, look for any truth that could benefit us, and if it doesn't resonate we set it aside: 'If it doesn't apply, let it fly.' The renewed True Self esteem makes this possible — we no longer need to defend the false self with anger.",
    relatedTraits: [3, 11],
  },
  {
    id: "engage-your-senses",
    name: "Engage Your Senses",
    shortDefinition: "A grounding practice that brings the body back to the present.",
    longDefinition: "When the fear of anger or criticism floods the system, the workbook offers a simple orientation: look at some things (actual), make a noise, eat a peach, smell some cinnamon, pat your face. Each one tells the nervous system 'I am here, now, in an adult body.' It interrupts the dissociative pull and the urge to dose ourselves with worry, fear, or pain. It is a small, repeatable reparenting move — the Loving Parent helping the Inner Child come back into the room.",
    relatedTraits: [1, 3, 4, 10],
  },
  {
    id: "compulsive-personality",
    name: "Compulsive Personality",
    shortDefinition: "The driven, unavailable kind of person we are unconsciously drawn to — or become.",
    longDefinition: "Trait 4 says we either become alcoholics, marry them, or both, or find another compulsive personality — a workaholic, a rageaholic, a substance abuser — to fulfill our 'sick abandonment needs.' The compulsion is the point: a partner whose drive keeps them emotionally unavailable lets us replay the abandonment we knew as children. In a real sense we 'chose to be with partners who would help us play out the abandonment we experienced.' Naming the compulsions in our family of origin — and in ourselves — is how we stop the casting call.",
    relatedTraits: [4, 8],
  },
  {
    id: "recreating-abandonment",
    name: "Recreating Abandonment",
    shortDefinition: "The compulsive pull to rebuild the original wound so it feels familiar.",
    longDefinition: "Children who were abandoned learn that abandonment is what love feels like. As adults we recreate it — choosing unavailable people, provoking the leaving, or leaving first. The Flip Side of Trait 4 is stated plainly: 'We do not have a compulsive need to recreate abandonment.' Recovery is taking an emotional inventory of our patterns of bonding to see exactly how we recreate or recycle abandonment, then choosing differently — being true to ourselves instead of true to the old script.",
    relatedTraits: [4, 12],
  },
  {
    id: "victim-victimizer",
    name: "Victim · Victimizer · Rescuer",
    shortDefinition: "The four rotating roles of the Game of Dissociation.",
    longDefinition: "Trait 5 says it plainly: there is no admission fee to the Game of Dissociation. Every member of a dysfunctional family is, unfortunately, given one of four roles — victim, victimizer, rescuer I, or rescuer II. We first assumed rescuer, and in time became victim or victimizer. Trait 4 maps these onto the lists (abandoned vs. abandoner). Trait 5 makes the dynamic about power: the victim lives life from the viewpoint of being acted upon; the victimizer (and rescuer II) exercises power beyond the requirements of the situation. The roles rotate endlessly so we never feel the original hurt. Seeing which seat we're in — gently, without shame — is the first move out of the Game.",
    relatedTraits: [4, 5],
  },
  {
    id: "self-abandonment",
    name: "Self-Abandonment",
    shortDefinition: "Abandoning ourselves to avoid being abandoned by anyone else.",
    longDefinition: "The Other Laundry List of Trait 4 ends with the deepest cut: 'To avoid being hurt, we isolate and dissociate and thereby abandon ourselves.' When we dominate, avoid dependent people, or keep everyone at arm's length, we protect the True Self by building a false self to hide our authentic needs and wants — and in doing so we disavow the very child within. The Flip Side is to stop abandoning that child: to accept and comfort the isolated, hurt Inner Child we had abandoned and disavowed.",
    relatedTraits: [2, 4],
  },
  {
    id: "double-winner",
    name: "Double Winner",
    shortDefinition: "Someone in recovery from both addiction and the family disease of ACA.",
    longDefinition: "Those of us fortunate to have recovery from alcohol or other substances (so-called 'dry goods') refer to ourselves as 'double winners' — having been an addict or alcoholic, and having begun recovery from addiction by the time we reached ACA, we found we still had more work to do. For some of us the idea of becoming an alcoholic was turned upside down: instead of becoming dependent on an outside substance, we chose to dose ourselves with an internal concoction of pain, fear and excitement, becoming the dominant player who controls the ebb and flow of relationships.",
    relatedTraits: [4, 13, 14],
  },
  {
    id: "critical-survival-parent",
    name: "Critical Survival Inner Parent",
    shortDefinition: "The internalized voice that scolds and steers — the one that kept us alive as kids.",
    longDefinition: "The critical survival inner parent is the inner voice that took over for caregivers who couldn't reliably guide us. It is sharp, watchful, often punishing — and as children, it kept us alive. In recovery we don't banish it. We pair it with the inner loving parent, the Inner Child, and our Higher Power. The Flip Side of Trait 5 names this directly: we have been learning and applying the concepts of critical survival inner parent, inner loving parent, Inner Child, and Higher Power — and from that partnership comes a sense of wholeness and completeness.",
    relatedTraits: [5, 11],
  },
  {
    id: "power-reclamation",
    name: "Power Reclamation",
    shortDefinition: "Stepping out of the victim and victimizer seats into honest, right-sized power.",
    longDefinition: "Trait 5 is, at its core, about power. As children we felt disempowered and blown about by the winds of the times. Some of us became determined to be 'among the winners' and exercised power beyond the requirements of the situation — that is the victimizer / rescuer II seat. Power reclamation is the move out of both. ACA meetings, honest sharing, and the Steps give us incremental, progressive opportunities to exercise true power — neither helpless nor dominant — until we can see ourselves as a participant in our own life rather than someone life is happening to.",
    relatedTraits: [5, 7, 11],
  },
  {
    id: "veil-of-denial",
    name: "Veil of Denial",
    shortDefinition: "The cloth that hid the truth from us — and that recovery slowly makes translucent.",
    longDefinition: "Trait 5 gives us a beautiful image: the veil of denial once seemed like a thick, immovable tapestry, and now seems like a sheer satin sheet, easily moved by us when we are ready. The denial isn't a moral failure; it was a survival membrane. We don't tear it down — we let recovery thin it. As the weave loosens we begin to see the opportunities to stop viewing life from the perspective of what is happening to us, and become able to see ourselves as a participant in those instances.",
    relatedTraits: [5, 10, 11],
  },
  {
    id: "humble-participation",
    name: "Humble Participation",
    shortDefinition: "Changing the question from “how can I dominate?” to “how can I humbly participate?”",
    longDefinition: "The Flip Side of the Other Laundry List of Trait 5 names a small move with enormous reach: when tempted or lured into a situation where control and manipulation seem to be the answer, we change the question. Instead of 'How can I dominate?' we ask, 'How can I humbly participate?' The shift refuses both seats of the Game — neither helpless victim nor over-functioning victimizer — and re-enters the moment as a fellow traveler.",
    relatedTraits: [5, 6, 7],
  },
  {
    id: "wholeness-completeness",
    name: "Wholeness & Completeness",
    shortDefinition: "The Trait 5 Flip Side gift: needing no one outside us to feel complete inside us.",
    longDefinition: "Trait 5's recovery promise is that we become whole and complete. Because of that wholeness, we no longer try to control others through manipulation and force or bind them to us with fear in order to avoid feeling isolated and alone. Wholeness here is not perfection — it is the felt sense, built over time through Step work and the inner partnership (loving parent · critical survival parent · Inner Child · Higher Power), that we are not missing a piece that another person must supply.",
    relatedTraits: [2, 5, 11, 12],
  },
];

export function getConcept(id: string) {
  return CONCEPTS.find((c) => c.id === id);
}

export function getConceptsForTrait(traitId: number) {
  return CONCEPTS.filter((c) => c.relatedTraits.includes(traitId));
}
