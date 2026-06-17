import type { StepConnection } from "@/lib/types";

// The relationships drawn as labeled edges on the Step Map.
export const CONNECTIONS: StepConnection[] = [
  // Surrender triad — "give up"
  { from: 1, to: 2, kind: "surrender", label: "admitting opens the door to believing" },
  { from: 2, to: 3, kind: "surrender", label: "belief makes the decision possible" },

  // Housecleaning chain — "clean house"
  { from: 4, to: 5, kind: "house", label: "inventory → shared aloud" },
  { from: 5, to: 6, kind: "house", label: "what's named, we can become ready to release" },
  { from: 6, to: 7, kind: "house", label: "ready → ask" },
  { from: 7, to: 8, kind: "house", label: "freed up, we turn toward others" },
  { from: 8, to: 9, kind: "house", label: "list → amends" },

  // Bridge from surrender into housecleaning
  { from: 3, to: 4, kind: "house", label: "decision made, we look at what we're working with" },
  // Bridge into maintenance
  { from: 9, to: 10, kind: "maintenance", label: "amends made, we keep the house clean" },
  { from: 10, to: 11, kind: "maintenance", label: "the daily check-in deepens into contact" },
  { from: 11, to: 12, kind: "maintenance", label: "the overflow is given away" },

  // Feedback edges — the circle
  { from: 10, to: 4, kind: "feedback", label: "inventory continues, daily" },
  { from: 11, to: 3, kind: "feedback", label: "we turn it over again each morning" },
  { from: 12, to: 1, kind: "feedback", label: "we carry the message back to a newcomer at Step 1" },
];
