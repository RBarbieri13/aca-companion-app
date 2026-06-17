import { Step1Exercise } from "./step1";
import { Step2Exercise } from "./step2";
import { Step3Exercise } from "./step3";
import { Step4Exercise } from "./step4";
import { Step5Exercise } from "./step5";
import { Step6Exercise } from "./step6";
import { Step7Exercise } from "./step7";
import { Step8Exercise } from "./step8";
import { Step9Exercise } from "./step9";
import { Step10Exercise } from "./step10";
import { Step11Exercise } from "./step11";
import { Step12Exercise } from "./step12";

export interface ExerciseMeta {
  title: string;
  why: string;
  Component: React.ComponentType;
}

export const STEP_EXERCISES: Record<number, ExerciseMeta> = {
  1: { title: "Powerlessness Workshop", why: "Get the powerlessness and unmanageability out of your head and onto the page — the honest ground Step 1 is built on.", Component: Step1Exercise },
  2: { title: "Coming-to-Believe Builder", why: "Belief grows from evidence and openness, not willpower. Sketch your Higher Power and collect the moments that hint a Power is at work.", Component: Step2Exercise },
  3: { title: "Turning-It-Over Practice", why: "Step 3 is a decision you re-make daily. Name what you're gripping, write your own surrender statement, and check in.", Component: Step3Exercise },
  4: { title: "The Inventory", why: "The big one. Resentments, fears, conduct, and harms — in columns, at the pace of safety. This seeds Steps 5, 6, and 8.", Component: Step4Exercise },
  5: { title: "Sharing the Inventory", why: "Step 5's medicine is being heard. Prepare what to read, weigh the load before, and track the relief after.", Component: Step5Exercise },
  6: { title: "Entire Readiness", why: "For each defect, find the fear it protects and what you'd practice instead — and read your honest readiness.", Component: Step6Exercise },
  7: { title: "Humility & Shortcomings", why: "Name the shortcomings, reframe them to right-sized self-views, and practice the daily humble ask.", Component: Step7Exercise },
  8: { title: "The Amends List & Willingness", why: "Build the list (importing harms from Step 4), name the harm, and rate your willingness — willingness first.", Component: Step8Exercise },
  9: { title: "Amends Ledger", why: "Work amends one at a time: type, the 'would it injure?' check, a plan, and status from willing to made. Go at the pace of safety.", Component: Step9Exercise },
  10: { title: "Daily Tenth-Step", why: "A nightly spot-check that keeps the house clean — resentful? selfish? dishonest? afraid? — plus a gratitude line.", Component: Step10Exercise },
  11: { title: "Conscious Contact", why: "Morning intention, a quiet practice with a before/after calm reading, and a night review. Capacity grows with repetition.", Component: Step11Exercise },
  12: { title: "Carrying the Message", why: "Log service and the principles you practiced off the page. You keep it by giving it away.", Component: Step12Exercise },
};
