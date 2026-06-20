import type { Step } from "@/lib/types";

// ============================================================================
// The Twelve Steps — authored content.
//
// Licensing: the Step wordings in `verbatim` are the reprint-permitted short
// form from A.A. World Services and appear unchanged. Every other line here —
// essences, teaching prose, Big Book *summaries*, and share ideas — is written
// originally for this app. Big Book references are CITATIONS ONLY: chapter /
// page + our own gloss. No copyrighted source text is reproduced anywhere.
// ============================================================================

export const STEPS: Step[] = [
  {
    id: 1,
    shortName: "Powerlessness",
    verbatim:
      "We admitted we were powerless over alcohol—that our lives had become unmanageable.",
    principle: "Honesty",
    phase: "surrender",
    active: true,
    essence: {
      step: "The first honest sentence: I can't control this, and it's costing me my life.",
      principle: "Honesty is letting the truth be as big as it actually is.",
      working: "You work Step One by telling the truth out loud — to yourself, then to someone safe.",
      promise: "Naming the powerlessness is the ground the whole house gets built on.",
    },
    statements: {
      step: "Step One asks for one thing: an honest admission. Not a performance of rock bottom, not a worst-story contest — just the plain truth that drinking has stopped being a choice you can reliably make. \"Powerless over alcohol\" means that once it's in you, the wanting takes over; \"unmanageable\" means the wreckage has spread past the glass into your money, your relationships, your health, your sense of who you are. You don't have to have lost everything to qualify. You only have to be done pretending you've got it handled.",
      principle: "The principle here is honesty — and at this Step honesty is mostly subtraction. It's setting down the management story, the 'I could quit anytime,' the careful accounting of how it isn't really that bad. Honesty doesn't mean shame; it means accuracy. You let the problem be exactly the size it is, no bigger and no smaller, and you stop spending energy keeping it hidden from yourself.",
      working: "People work Step One by saying it where it can be heard: in a meeting, to a sponsor, on paper. Many write out a list of times drinking did something they'd sworn it wouldn't, and a second list of the life-areas that have gotten unmanageable. The pitfall is turning it into self-punishment — that's not the assignment. You'll know it's working when the relief of stopping the lie is bigger than the fear of admitting it. (A quiet, important note: stopping alcohol suddenly can be medically dangerous for some people. If your body has come to depend on it, please talk to a doctor about safe detox — this is care, not weakness.)",
      promise: "What Step One gives back is solid ground. Strange as it sounds, admitting you can't is where power finally enters — because you stop pouring yourself into a fight you were never going to win, and that energy becomes available for something else. The white-knuckle exhaustion eases. You're no longer alone with a secret. And you're standing exactly where Step Two can reach you.",
    },
    bigBookRefs: [
      {
        work: "Alcoholics Anonymous (the Big Book)",
        locator: "\"The Doctor's Opinion\" (front matter, ~pp. xxv–xxxii)",
        summary:
          "A physician's framing of alcoholism as more than weak will — describing a bodily reaction to alcohol paired with a mental compulsion that returns even after long stretches dry.",
        whyItMatters:
          "It reframes Step One as physiology, not moral failure: powerlessness is something that happens in the body and mind, which is why willpower alone keeps falling short.",
      },
      {
        work: "Alcoholics Anonymous (the Big Book)",
        locator: "\"Bill's Story\" (ch. 1, ~pp. 1–16)",
        summary:
          "The founder's own arc from promising beginnings into the collapse and isolation of late-stage drinking, and the first glimpse of a way out.",
        whyItMatters:
          "It models the honest first admission this Step asks for — and shows that the door opens precisely when the pretending stops.",
      },
      {
        work: "Alcoholics Anonymous (the Big Book)",
        locator: "\"More About Alcoholism\" (ch. 3, ~pp. 30–43)",
        summary:
          "A series of stories about the illusion of control — the idea that we can someday drink like other people — and how that idea quietly reasserts itself.",
        whyItMatters:
          "It names the exact lie Step One sets down: that next time will be different. Seeing the pattern on paper makes the powerlessness undeniable.",
      },
      {
        work: "Twelve Steps and Twelve Traditions",
        locator: "Step One essay",
        summary:
          "An extended reflection on why surrender — admitting complete defeat — is the firm foundation everything else is built on.",
        whyItMatters:
          "It softens the word 'defeat' into something usable: the bottom is not the end, it's the floor you finally get to stand on.",
      },
    ],
    shareIdeas: [
      "Share the moment you first knew you were powerless — not the worst story, the truest one.",
      "Describe what 'unmanageable' looked like in one ordinary area of your life — the laundry, the inbox, a friendship.",
      "Talk about the management story you told yourself the longest, and what it cost to keep it running.",
      "Name what you were afraid would happen if you admitted you couldn't control it — and what actually happened.",
      "Share the relief, if you've felt any, of finally stopping the pretending.",
      "If you're newly here: just say your name and that you're not sure — that counts as Step One too.",
    ],
  },
  {
    id: 2,
    shortName: "Coming to Believe",
    verbatim:
      "Came to believe that a Power greater than ourselves could restore us to sanity.",
    principle: "Hope",
    phase: "surrender",
    active: true,
    essence: {
      step: "After admitting you can't, you let yourself wonder whether something can.",
      principle: "Hope is the willingness to leave the door unlocked.",
      working: "You work Step Two by collecting evidence and staying open, not by manufacturing belief.",
      promise: "A door opens: maybe I don't have to be my own only hope.",
    },
    statements: {
      step: "Step Two is gentle on purpose. It doesn't say 'believe' — it says came to believe, a process, often slow, with plenty of doubt allowed. 'A Power greater than ourselves' is deliberately wide: God of your understanding, the fellowship of the group, the order of nature, love, honesty, the wisdom of people further down the road — whatever is real to you and bigger than your own stubborn will. 'Restore us to sanity' simply means: brought back to a right mind, where you no longer keep doing the thing that keeps hurting you and expecting it to go differently.",
      principle: "The principle is hope — and hope here is small and practical, not a fireworks display of faith. It's the difference between a slammed door and a door left ajar. You don't have to feel certain. You only have to become willing to consider that help exists and that you are not, in fact, the most competent thing in the universe. For people burned by religion, this is a relief: the Step asks for openness, not a creed.",
      working: "People come to believe by acting as if and watching what happens — going to meetings, asking for help, noticing the times something carried them that their own grip could not. Many keep an evidence log of moments that hint a Power is at work. A useful exercise is writing what your Higher Power is and, just as importantly, what it is NOT (not the punishing parent, not the cop in the sky). You'll know it's working when 'maybe' starts feeling less like a stretch and more like a fact.",
      promise: "Step Two returns hope to a person who had run out of it. The fight to be your own savior — the part that was so tired — can finally rest, because you're no longer the only resource in the room. Sanity starts to look possible: a life where the next right action isn't a drink. That growing 'maybe' is exactly what you'll lean your whole weight on in Step Three.",
    },
    bigBookRefs: [
      {
        work: "Alcoholics Anonymous (the Big Book)",
        locator: "\"We Agnostics\" (ch. 4, ~pp. 44–57)",
        summary:
          "A chapter written directly to skeptics, arguing that you don't need a fully formed faith to begin — only a willingness to stop slamming the door.",
        whyItMatters:
          "It's the heart of Step Two for anyone allergic to religious language: belief can start at zero and grow from honest openness.",
      },
      {
        work: "Alcoholics Anonymous (the Big Book)",
        locator: "Appendix II, \"Spiritual Experience\"",
        summary:
          "A short clarification that the awakening most people have is gradual and educational, not a sudden blinding flash.",
        whyItMatters:
          "It takes the pressure off 'coming to believe' — you're not waiting for a miracle, you're accumulating small evidence over time.",
      },
      {
        work: "Twelve Steps and Twelve Traditions",
        locator: "Step Two essay",
        summary:
          "A meditation on the wide spectrum of newcomers — the defiant, the disillusioned, the agnostic — and how each found a workable Higher Power.",
        whyItMatters:
          "It proves the Step is roomy enough for your particular skepticism; many doors lead in.",
      },
    ],
    shareIdeas: [
      "Share what 'a Power greater than yourself' means to you right now — even if the honest answer is 'I'm still working it out.'",
      "Describe one moment something carried you that your own willpower couldn't.",
      "If you've been hurt by religion, talk about what it's like to be offered openness instead of a creed.",
      "Share what 'restored to sanity' would look like in one ordinary moment of your week.",
      "Talk about the difference between a door slammed shut and a door left ajar.",
      "Name one piece of evidence, however small, that hope might be reasonable.",
    ],
  },
  {
    id: 3,
    shortName: "The Decision",
    verbatim:
      "Made a decision to turn our will and our lives over to the care of God as we understood Him.",
    principle: "Faith",
    phase: "surrender",
    active: true,
    essence: {
      step: "A decision, not a personality transplant: today, I'll let something other than self-will steer.",
      principle: "Faith is acting before you have proof, because the old way is finished.",
      working: "You work Step Three by deciding — and then by re-deciding, daily, with open hands.",
      promise: "The exhausting job of running the universe is no longer yours.",
    },
    statements: {
      step: "Step Three is a decision — a single, repeatable choice to stop white-knuckling your life and let it be cared for by the Power you met in Step Two. 'God as we understood Him' is the program insisting, again, that this is your understanding, not someone else's: the group, nature, love, a Higher Power of any name. Notice the word care. You're not handing your life to a tyrant; you're entrusting it to something that has your good in mind. And it's will and lives both — the inner driver (your willfulness, your need to control) and the outer facts (what you'll actually do today).",
      principle: "The principle is faith, which here means action ahead of certainty. You don't wait until you feel spiritual to make the decision; you make the decision and the feeling sometimes follows. Faith at Step Three is mostly a loosening of the grip — the willingness to be led when, for years, being in charge was the only safety you knew. It's countercultural and a little scary, and it's also the most rest you've had in a long time.",
      working: "People make this decision in many ways: with a sponsor, in a quiet moment, by writing their own surrender statement in plain words. (The Big Book offers a well-known Third-Step prayer; rather than reciting someone else's, many write their own — 'I'm willing to be of use; relieve me of the bondage of self.') The real work is the re-deciding: each morning, and sometimes each hour, you open your hands again. You'll know it's working when you catch yourself reaching to control and can, more often, choose to turn it over instead.",
      promise: "Step Three hands back a life that was too heavy to carry alone. The job of being the manager of everyone and everything — the job that was killing you — is one you get to resign. What replaces it is a strange, steadying lightness, and the practical clarity to do the next right thing without having to solve the whole future. With the decision made, you're ready to find out what you're actually working with: Step Four.",
    },
    bigBookRefs: [
      {
        work: "Alcoholics Anonymous (the Big Book)",
        locator: "\"How It Works\" (ch. 5, ~pp. 60–63)",
        summary:
          "The chapter that lays out the decision of Step Three and the idea that self-will run riot is at the root of most of our trouble.",
        whyItMatters:
          "It frames the turn-over as the cure for self-centeredness — the engine under most of the wreckage named in Step One.",
      },
      {
        work: "Alcoholics Anonymous (the Big Book)",
        locator: "The Third-Step idea (ch. 5, ~p. 63)",
        summary:
          "A short prayer of willingness marks the decision. We reference its location and paraphrase its spirit rather than reproduce it.",
        whyItMatters:
          "It shows the decision can be made in a sentence — and invites you to put that sentence in your own honest words.",
      },
      {
        work: "Twelve Steps and Twelve Traditions",
        locator: "Step Three essay",
        summary:
          "A reflection on willingness as the key that fits the lock — and on how a small opening of the will is enough to begin.",
        whyItMatters:
          "It right-sizes the Step: you're not promising perfection, only opening the door a crack and meaning it.",
      },
    ],
    shareIdeas: [
      "Share what you're still gripping the hardest — the thing you most want to keep managing yourself.",
      "Read or describe the surrender statement you'd write in your own words.",
      "Talk about the difference between turning your life over to a tyrant and to something that cares.",
      "Describe a time you 'turned it over' and what changed — or didn't — and what you learned.",
      "Share how you re-decide on an ordinary day when self-will comes roaring back.",
      "Name the rest you feel, if any, in no longer having to run everything.",
    ],
  },
  {
    id: 4,
    shortName: "The Inventory",
    verbatim: "Made a searching and fearless moral inventory of ourselves.",
    principle: "Courage",
    phase: "house",
    active: true,
    essence: {
      step: "You put it all on paper — resentments, fears, your part — so it stops running you from the dark.",
      principle: "Courage is looking at what you've avoided, with a steady hand.",
      working: "You work Step Four in columns: who, the cause, what it threatens, and your part.",
      promise: "What's named on paper loses its grip on you in the dark.",
    },
    statements: {
      step: "Step Four is the big writing project, and it's less frightening than it sounds. 'Searching and fearless' just means thorough and honest; 'moral inventory' is a stock-taking, the way a shop counts what's actually on its shelves — assets and liabilities both. You're not assembling evidence for the prosecution. You're getting the resentments, fears, and old behaviors out of the shadows and onto paper, where you can finally see the patterns instead of being driven by them. The classic method works in columns: who or what you resent, the cause, what it threatens in you, and — the column that changes everything — your part.",
      principle: "The principle is courage, and Step Four is where it gets concrete. It takes nerve to write down the resentment you've justified for twenty years, the fear you've never said aloud, the thing you did that you hope no one finds out. Courage here isn't fearlessness; it's doing it afraid, with a pen. And it's balanced: a fearless inventory includes your assets too — the ways you've shown up, survived, loved. You are taking honest stock, not staging a self-execution.",
      working: "People work Step Four with a notebook or a grid, usually alongside a sponsor who's done it before. Resentments first, then fears, then (gently, optionally) conduct in relationships. The trauma-aware caution matters: go at the pace of safety. If a memory is too big to hold alone, that's a signal to have support — a sponsor, a therapist — not a reason to white-knuckle through. You'll know it's working when a resentment you've carried for years starts to look less like an enemy and more like a wound with your fingerprints somewhere on it.",
      promise: "Step Four returns self-knowledge that used to be unbearable and is now just... information. The resentments stop being a haunted house; they become a list you can do something about. You start to see your part — not to drown in blame, but because your part is the only part you can change. And you've already done the hardest writing in the program. Now it only needs to be spoken aloud, which is Step Five.",
    },
    bigBookRefs: [
      {
        work: "Alcoholics Anonymous (the Big Book)",
        locator: "\"How It Works\" (ch. 5, ~pp. 63–71)",
        summary:
          "The detailed inventory method: the resentment columns, the turn toward our own part, and the fear and conduct inventories that follow.",
        whyItMatters:
          "It is the actual instruction manual for this Step — the column format most people still use today comes straight from here.",
      },
      {
        work: "Twelve Steps and Twelve Traditions",
        locator: "Step Four essay",
        summary:
          "A wider look at the inventory as a fact-finding mission rather than a verdict, with attention to the role of instincts gone overboard.",
        whyItMatters:
          "It reframes 'moral' away from shame and toward honest accounting, which makes the writing possible.",
      },
    ],
    shareIdeas: [
      "Pick one resentment: who, the cause, what it threatens in you, and — honestly — your part.",
      "Share what 'searching and fearless' brings up for you, and how you're keeping it from becoming self-attack.",
      "Talk about a fear you've never said out loud, and what it's cost to carry it silently.",
      "Describe what 'going at the pace of safety' means for your inventory — what support you've put in place.",
      "Share an asset you found — a way you survived or showed up — that the inventory surfaced.",
      "Name the difference between seeing your part and blaming yourself for everything.",
    ],
  },
  {
    id: 5,
    shortName: "Admitting",
    verbatim:
      "Admitted to God, to ourselves, and to another human being the exact nature of our wrongs.",
    principle: "Integrity",
    phase: "house",
    active: true,
    essence: {
      step: "You say the inventory out loud to one trustworthy person — and the secrets lose their power.",
      principle: "Integrity is being one person, inside and out, with nothing hidden.",
      working: "You work Step Five by reading it to someone safe, all of it, and letting yourself be heard.",
      promise: "The weight you've carried in secret finally lifts when it's witnessed.",
    },
    statements: {
      step: "Step Five takes the private writing of Step Four and makes it spoken — to your Higher Power, to yourself (no more dodging your own eyes), and crucially to another human being. That third part is the medicine. Secrets keep their power by staying secret; said aloud to someone safe, they shrink to human size. 'The exact nature of our wrongs' means specifics, not a vague 'I've made mistakes' — the real stuff, named plainly, so nothing keeps festering in the dark.",
      principle: "The principle is integrity — literally being integrated, one whole person instead of a public self and a hidden self. For people who've spent a lifetime managing what others see, this Step is terrifying and then astonishing: you tell the worst of it and the person doesn't recoil. They've usually got their own list. Integrity grows in that moment, because you've stopped maintaining the gap between who you appear to be and who you are.",
      working: "People work Step Five with a sponsor, a trusted clergy member, a counselor — someone who can keep a confidence and won't flinch. You read the inventory, out loud, all of it. Pick the person carefully (this is not a Step to do with someone who'll use it against you). A gentle, optional structure helps: what you'll read, a check-in on the weight you're carrying before, and a debrief after. You'll know it's working by the exhale — the physical lightness people describe when something they were sure would end them is simply received.",
      promise: "Step Five gives back belonging. You've been seen at your worst and not abandoned, which quietly rewrites a very old story. The energy that went into hiding comes back to you. Many people mark this as the moment they first felt part of the human race rather than a fraud sneaking among it. Lighter, more honest, you're ready to look at what you'd like to be free of — Step Six.",
    },
    bigBookRefs: [
      {
        work: "Alcoholics Anonymous (the Big Book)",
        locator: "\"Into Action\" (ch. 6, ~pp. 72–75)",
        summary:
          "The instructions for sharing the inventory with another person — how to choose them, why total honesty matters, and what to do afterward.",
        whyItMatters:
          "It's the practical 'how' of Step Five, including the reassurance that this is hard and worth it.",
      },
      {
        work: "Twelve Steps and Twelve Traditions",
        locator: "Step Five essay",
        summary:
          "A reflection on why confession to another human being breaks isolation and ends the double life that secrecy requires.",
        whyItMatters:
          "It explains the deep relief of this Step: integrity and belonging arrive together when we're finally fully known.",
      },
    ],
    shareIdeas: [
      "Share what made you choose the person you read your Fifth Step to (or how you're choosing).",
      "Talk about a secret you were sure would end you, and what happened when you said it aloud.",
      "Describe the weight you carried before, and the exhale — if you've felt it — after.",
      "Share what 'the exact nature' means: the difference between vague confession and naming it plainly.",
      "Talk about being seen at your worst and not abandoned, and what that rewrote for you.",
      "If you haven't done Step Five yet, name the fear that's in the way of it.",
    ],
  },
  {
    id: 6,
    shortName: "Entirely Ready",
    verbatim: "Were entirely ready to have God remove all these defects of character.",
    principle: "Willingness",
    phase: "house",
    active: true,
    essence: {
      step: "You get willing to let go of the very habits that once kept you safe.",
      principle: "Willingness is opening your hand around what you've been clutching.",
      working: "You work Step Six by naming each defect and the fear it's been protecting.",
      promise: "You stop defending the patterns that have been quietly costing you.",
    },
    statements: {
      step: "Step Six is a Step of the heart more than the hands — it asks whether you're entirely ready to be free of the character defects your inventory revealed. 'Defects' is old-fashioned language for the survival habits that have curdled: the control, the people-pleasing, the rage, the dishonesty that once protected a frightened person and now mostly causes harm. The Step is honest that 'entirely ready' is a tall order. Some defects you'll be glad to drop; others you'll realize you're still a little in love with, because they've felt like safety for a long time.",
      principle: "The principle is willingness, and Step Six is where you find out how partial yours still is — which is fine. Willingness isn't the same as ability; you're not removing anything by force here, just becoming willing to have it removed. The work is to notice the grip. Often a defect is guarding a fear: you cling to control because chaos once hurt you; you please because rejection felt like death. Naming the fear underneath loosens the hand around the defect.",
      working: "People work Step Six by listing the defects that surfaced in Steps Four and Five and asking, honestly, of each: am I ready to let this go? Where the answer is 'not yet,' the work is curiosity, not force — what is this protecting? A useful move is to name what you'd get to practice instead (presence instead of control, honesty instead of performance). You'll know it's working when you stop defending a pattern you used to justify, and start, even reluctantly, wanting to be free of it.",
      promise: "Step Six returns a kind of inner permission — to set down armor you've worn so long you forgot it was heavy. Nothing is removed yet, but the readiness itself changes you: you stop arguing for your own limitations. The fears that the defects were guarding come into the light where they can ease. And you arrive, hands finally opening, at the humble ask of Step Seven.",
    },
    bigBookRefs: [
      {
        work: "Alcoholics Anonymous (the Big Book)",
        locator: "\"Into Action\" (ch. 6, ~p. 76)",
        summary:
          "A brief but pivotal passage on becoming willing to let the defects go, and on asking honestly whether we're holding anything back.",
        whyItMatters:
          "It marks Step Six as a hinge of willingness — short on the page, long in the heart.",
      },
      {
        work: "Twelve Steps and Twelve Traditions",
        locator: "Step Six essay",
        summary:
          "An extended look at how 'entirely ready' is a lifelong aim, and how even partial willingness is enough to begin.",
        whyItMatters:
          "It relieves perfectionism: you don't need flawless readiness, just an honest, growing willingness.",
      },
    ],
    shareIdeas: [
      "Name one defect you're glad to be rid of — and one you're secretly still a little attached to.",
      "Pick a survival habit and trace the fear it's been protecting all this time.",
      "Share what 'entirely ready' brings up, and where your willingness is still partial.",
      "Talk about what you'd get to practice instead of a defect you're ready to release.",
      "Describe a time a 'character defect' actually kept you safe once — and why it's outlived its job.",
      "Share what it's like to stop defending a pattern you used to justify.",
    ],
  },
  {
    id: 7,
    shortName: "Humbly Asked",
    verbatim: "Humbly asked Him to remove our shortcomings.",
    principle: "Humility",
    phase: "house",
    active: true,
    essence: {
      step: "You ask for help with the things you can't fix by sheer effort.",
      principle: "Humility is right-sizing — not too big, not too small, simply true.",
      working: "You work Step Seven by asking, and by practicing the right-sized self underneath.",
      promise: "You're released from the exhausting project of fixing yourself alone.",
    },
    statements: {
      step: "Step Seven is the asking that Step Six made you ready for. Having become willing, you humbly request that the shortcomings be removed — by your Higher Power, the group, the slow grace of the process, whatever 'removal' means in your understanding. The key word is humbly. This isn't groveling. It's the simple, accurate admission that you can't think or muscle your way out of your own character; some of this you have to be given help with. (The Big Book has a Seventh-Step prayer; many people write their own honest version rather than reciting it.)",
      principle: "The principle is humility, and humility is one of the most misunderstood words in recovery. It is not self-loathing — that's just grandiosity turned inside out, still all about you. Humility is right-sizing: you are not the worst person alive and not the center of the universe, you're a human being among human beings, no more and no less. From that true size, asking for help isn't humiliating; it's just sane. You'd ask a doctor about a broken arm. This is that.",
      working: "People work Step Seven by actually asking — in prayer, in meditation, in a written request — and then by living as if help is on the way: practicing the right-sized self in small moments, catching grandiosity and self-loathing as the same coin. Removal is rarely instant. More often a shortcoming loses its grip gradually, and you notice one day that you reached for honesty before the old reflex. You'll know it's working when 'humbly asked' stops feeling like defeat and starts feeling like relief.",
      promise: "Step Seven returns you to human scale. The crushing project of self-improvement-by-willpower — the one that never worked — is no longer yours to carry alone. You can have shortcomings and still be worthy; you can need help and still be whole. From this lighter, truer place, you can finally turn outward, toward the people your drinking touched: Step Eight.",
    },
    bigBookRefs: [
      {
        work: "Alcoholics Anonymous (the Big Book)",
        locator: "\"Into Action\" (ch. 6, ~p. 76)",
        summary:
          "The short passage marking the humble request for the shortcomings to be removed, paired with the Seventh-Step idea (which we paraphrase, not quote).",
        whyItMatters:
          "It shows the asking can be plain and brief — and invites you to phrase it in your own honest words.",
      },
      {
        work: "Twelve Steps and Twelve Traditions",
        locator: "Step Seven essay",
        summary:
          "Perhaps the program's deepest meditation on humility — distinguishing it sharply from humiliation and from weakness.",
        whyItMatters:
          "It gives you a usable, non-shaming definition of humility, which is the whole hinge of this Step.",
      },
    ],
    shareIdeas: [
      "Share your own honest version of a Seventh-Step ask, in plain words.",
      "Talk about humility as right-sizing — and a time you mistook self-loathing for humility.",
      "Describe a shortcoming that's eased gradually rather than vanished overnight.",
      "Share what it's like to need help and still feel worthy.",
      "Name the exhausting self-improvement project you finally get to set down.",
      "Talk about catching grandiosity and self-loathing as the same coin in one ordinary moment.",
    ],
  },
  {
    id: 8,
    shortName: "The List",
    verbatim:
      "Made a list of all persons we had harmed, and became willing to make amends to them all.",
    principle: "Brotherly Love",
    phase: "house",
    active: true,
    essence: {
      step: "You make the list and get willing — willingness first, action later.",
      principle: "Brotherly love is letting the people you hurt back into focus as real.",
      working: "You work Step Eight by listing who, naming the harm, and rating your willingness.",
      promise: "You trade a vague cloud of guilt for a clear, workable list.",
    },
    statements: {
      step: "Step Eight has two distinct halves, and it helps to keep them separate. First, you make a list of everyone your drinking and behavior harmed — including, often, yourself. Second, you become willing to make amends to them all. Notice that this Step is not yet about doing anything to those people; it's about willingness. Your Step Four inventory already seeded this list; now you complete it honestly, resisting the urge to leave off the hard names or to start arguing about what you'll actually do.",
      principle: "The principle is brotherly love — and at Step Eight that means letting the people you harmed come back into focus as real human beings with real injuries, rather than characters in the story of how you were wronged. Willingness is the whole assignment, which is merciful, because willingness can grow where action can't yet. You can be willing to make an amends you have no idea how to make. You can become willing to forgive yourself enough to belong on your own list.",
      working: "People work Step Eight by writing the list — who, and the harm in a sentence — and then rating their willingness toward each person, honestly, from 'no way' to 'ready.' Where willingness is low, the work is not to force it but to pray for it, talk it through, and let it ripen. Importing the harms you noticed back in Step Four keeps it from being abstract. You'll know it's working when names you wanted to skip make it onto the page, and the willingness, for at least some of them, quietly rises.",
      promise: "Step Eight returns clarity in place of a fog of free-floating guilt. Instead of a vague sense of being a bad person, you have a concrete, finite list — and a list is something you can actually do something about. The people on it become real again, which is the beginning of repair. And you stand ready, willing if not yet able, at the threshold of the Step where you set things right: Step Nine.",
    },
    bigBookRefs: [
      {
        work: "Alcoholics Anonymous (the Big Book)",
        locator: "\"Into Action\" (ch. 6, ~pp. 76–77)",
        summary:
          "The transition into amends: making the list, finding the willingness, and the reminder that we already started this list back in our inventory.",
        whyItMatters:
          "It clarifies that Step Eight is preparation — list and willingness — distinct from the action of Step Nine.",
      },
      {
        work: "Twelve Steps and Twelve Traditions",
        locator: "Step Eight essay",
        summary:
          "A reflection on overcoming the reluctance to face those we've harmed, and on amends as a road back into the human family.",
        whyItMatters:
          "It addresses the resistance head-on — the pride and fear that want to keep names off the list.",
      },
    ],
    shareIdeas: [
      "Share what it's like to put yourself on your own amends list.",
      "Talk about a name you wanted to leave off — and what kept it on, or off.",
      "Describe the difference between being willing to make amends and knowing how.",
      "Share how a person you'd reduced to 'the one who wronged me' came back into focus as real.",
      "Name what helps your willingness ripen when it's stuck low.",
      "Talk about trading a fog of guilt for a clear, finite list.",
    ],
  },
  {
    id: 9,
    shortName: "Making Amends",
    verbatim:
      "Made direct amends to such people wherever possible, except when to do so would injure them or others.",
    principle: "Justice",
    phase: "house",
    active: true,
    essence: {
      step: "You clean up your side of the street — carefully, at the pace of safety.",
      principle: "Justice is repairing what you broke, without creating new harm.",
      working: "You work Step Nine amends by amends: type, the 'would it injure?' check, and a plan.",
      promise: "You walk back into rooms you'd been avoiding, with your head level.",
    },
    statements: {
      step: "Step Nine is the action: making direct amends wherever possible. Amends are more than apologies — an apology is words, an amend is changed behavior and, where appropriate, repair (the returned money, the told truth, the kept commitment). The crucial clause is 'except when to do so would injure them or others.' This is not a loophole for ducking hard conversations; it's a guardrail. Some direct amends would reopen a wound, expose a third party, or be about relieving your guilt at someone else's expense. For those, there are living amends (changed conduct over time) and indirect amends.",
      principle: "The principle is justice — setting right what you put wrong, as far as it's in your power, and no further. Justice here is balanced and careful: it asks you to face the people you harmed and also forbids you to harm them again in the name of your own cleansing. You clean your side of the street; you don't get to drag someone back through their pain because your program needs a checkmark. Go at the pace of safety — yours and theirs.",
      working: "People work Step Nine like a careful ledger: for each person, decide the type of amend (direct, living, indirect, or not-yet), run the 'would it injure?' check, make a plan, and track status from willing to planned to made — with dates. A sponsor's perspective is invaluable here, especially on the injure question and on amends involving legal or safety risk. There's no prize for speed. You'll know it's working when you can be in the same room as someone from your past with your head level — neither cringing nor defending.",
      promise: "Step Nine is where the Promises begin to come true — not as magic, but as the natural result of a cleared conscience. The dread of running into certain people loosens. Relationships sometimes heal; even when they don't, you're free of the part that was yours to carry. You stop flinching at your own past. Freedom and a new kind of peace move in — and the maintenance Steps are there to keep them.",
    },
    bigBookRefs: [
      {
        work: "Alcoholics Anonymous (the Big Book)",
        locator: "\"Into Action\" (ch. 6, ~pp. 76–84)",
        summary:
          "Detailed, situation-by-situation guidance on making amends — including the caution about harm to others and the spirit of cleaning our own side of the street.",
        whyItMatters:
          "It supplies the judgment this Step requires: how, when, and whether to approach each person.",
      },
      {
        work: "Alcoholics Anonymous (the Big Book)",
        locator: "The Promises (\"Into Action,\" ~pp. 83–84)",
        summary:
          "A famous passage describing the freedom and serenity that arrive as amends are made. We reference its location and paraphrase the promises in our own words (see the Promises page).",
        whyItMatters:
          "It tells you what Step Nine is for: not penance, but the freedom that a cleared conscience makes possible.",
      },
      {
        work: "Twelve Steps and Twelve Traditions",
        locator: "Step Nine essay",
        summary:
          "A reflection on good timing, good judgment, and courage in making amends — and on the difference between honesty and recklessness.",
        whyItMatters:
          "It helps you avoid using 'rigorous honesty' as a weapon, keeping amends genuinely repairing.",
      },
    ],
    shareIdeas: [
      "Share the difference between an apology and an amend, in your own experience.",
      "Talk about an amend you've made — direct, living, or indirect — and what it took.",
      "Describe how you're thinking through the 'would it injure?' question for a hard one.",
      "Share what 'go at the pace of safety' has meant in your Ninth-Step work.",
      "Name a Promise you've felt beginning to come true as you clean your side of the street.",
      "Talk about being in a room with someone from your past with your head level.",
    ],
  },
  {
    id: 10,
    shortName: "Daily Inventory",
    verbatim:
      "Continued to take personal inventory and when we were wrong promptly admitted it.",
    principle: "Perseverance",
    phase: "maintenance",
    active: true,
    essence: {
      step: "You keep the house clean daily, so resentment never piles up again.",
      principle: "Perseverance is doing the small thing every day, not the big thing once.",
      working: "You work Step Ten with a nightly spot-check and a prompt, low-drama correction.",
      promise: "Wreckage stops accumulating; you catch it small and set it right fast.",
    },
    statements: {
      step: "Step Ten turns the one-time housecleaning of Steps Four through Nine into a daily practice. You keep taking personal inventory — not obsessively, but regularly — and when you're wrong, you admit it promptly, before it has time to harden into a resentment or a story. 'Promptly' is the hinge word: the same amend that takes ten seconds today becomes a four-month estrangement if you let it sit. Many people do a quick spot-check through the day and a short review at night.",
      principle: "The principle is perseverance — the unglamorous virtue of keeping on. Step Ten isn't dramatic; it's a habit, like brushing your teeth. The power is entirely in the repetition. One inventory changes a life; a daily inventory keeps the change. Perseverance here also means gentleness, because a daily practice you beat yourself up with won't last. The aim is honesty maintained, not a nightly tribunal.",
      working: "People work Step Ten with a simple nightly checklist: Was I resentful, selfish, dishonest, or afraid today? Do I owe anyone an amends? And — just as important — what am I grateful for? Then they make any small correction quickly: a text, a word, a returned call. You'll know it's working when an upset that would once have ruined a week gets named and cleared the same evening, and when you notice the pile of un-dealt-with stuff simply isn't accumulating anymore.",
      promise: "Step Ten returns daily freedom. Because you're cleaning as you go, you never again wake up under a mountain of un-faced wreckage. Resentments don't get to take root; mistakes stay small. There's a lightness to ending each day current with your own life. And the practice naturally opens upward into Step Eleven, where the daily check-in deepens into conscious contact.",
    },
    bigBookRefs: [
      {
        work: "Alcoholics Anonymous (the Big Book)",
        locator: "\"Into Action\" (ch. 6, ~pp. 84–85)",
        summary:
          "The shift from one-time inventory to a continuous one — watching for resentment, selfishness, dishonesty, and fear, and setting things right at once.",
        whyItMatters:
          "It's the blueprint for the nightly spot-check, including the promptness that keeps small things small.",
      },
      {
        work: "Twelve Steps and Twelve Traditions",
        locator: "Step Ten essay",
        summary:
          "A reflection on the spot-check inventory and on emotional sobriety — staying balanced as life keeps happening.",
        whyItMatters:
          "It broadens Step Ten from error-correction into ongoing emotional maintenance.",
      },
    ],
    shareIdeas: [
      "Share what your nightly spot-check actually looks like — or what gets in the way of doing one.",
      "Talk about a time 'promptly admitted it' turned a ten-second fix into nothing — versus a time you let it harden.",
      "Describe how you keep the daily inventory gentle instead of a nightly self-trial.",
      "Share the gratitude line from a recent Tenth Step and why it mattered.",
      "Name what 'emotional sobriety' is starting to mean for you.",
      "Talk about the lightness of ending a day current with your own life.",
    ],
  },
  {
    id: 11,
    shortName: "Conscious Contact",
    verbatim:
      "Sought through prayer and meditation to improve our conscious contact with God as we understood Him, praying only for knowledge of His will for us and the power to carry that out.",
    principle: "Spiritual Awareness",
    phase: "maintenance",
    active: true,
    essence: {
      step: "You build a daily line to the Power you rely on, and listen more than you ask.",
      principle: "Spiritual awareness is the patient practice of paying attention.",
      working: "You work Step Eleven with morning intention, a quiet practice, and a night review.",
      promise: "You get a steadiness that holds even when life doesn't cooperate.",
    },
    statements: {
      step: "Step Eleven is about deepening the relationship begun in Steps Two and Three through prayer and meditation — prayer being, loosely, talking, and meditation being listening. Notice the radical narrowing of the request: not for the outcomes you want, not for the lottery numbers, but only for knowledge of your Higher Power's will and the power to carry it out. That single instruction quietly dismantles a lifetime of trying to bend reality to your plan. 'Conscious contact' can be deeply religious or as plain as a few honest minutes of stillness — whatever is real for you.",
      principle: "The principle is spiritual awareness, and its close companion is patience. You can't rush stillness; you can only show up for it. Step Eleven is a practice in the truest sense — something you do imperfectly, daily, for the rest of your life, getting a little more available to guidance each time. The point isn't a mystical experience; it's a slow recalibration toward humility and trust, so that 'thy will, not mine' becomes less a slogan and more a reflex.",
      working: "People work Step Eleven with simple bookends: a morning intention (a moment to ask for guidance and set the day toward usefulness) and a night review (looking back with honesty and gratitude). In between, some pray, some meditate, some sit quietly, some walk. A calm-before / calm-after check helps you see that the practice is actually doing something. You'll know it's working when you can pause in a hard moment and genuinely ask 'what's the next right thing?' instead of just reacting.",
      promise: "Step Eleven returns steadiness — a center that holds when circumstances don't. You stop white-knuckling outcomes because you're no longer the universe's project manager; you're asking to be useful and trusting the rest. Fear loses its grip as intuition grows. And the overflow of all this contact is something you can't keep unless you give it away — which is exactly what Step Twelve is for.",
    },
    bigBookRefs: [
      {
        work: "Alcoholics Anonymous (the Big Book)",
        locator: "\"Into Action\" (ch. 6, ~pp. 85–88)",
        summary:
          "Practical morning and evening practices for prayer and meditation, and the discipline of asking only for guidance and the strength to follow it.",
        whyItMatters:
          "It gives the actual daily structure of Step Eleven — the bookends most people still use.",
      },
      {
        work: "Twelve Steps and Twelve Traditions",
        locator: "Step Eleven essay",
        summary:
          "An extended, inclusive look at prayer and meditation that meets skeptics where they are and treats contact as a skill that grows with practice.",
        whyItMatters:
          "It keeps Step Eleven approachable for every belief and none — contact, not doctrine.",
      },
    ],
    shareIdeas: [
      "Share what 'conscious contact' looks like for you on an ordinary morning.",
      "Talk about praying only for knowledge of a Higher Power's will, not for specific outcomes.",
      "Describe a moment you paused and asked 'what's the next right thing?' instead of reacting.",
      "Share how meditation or stillness is going — including the parts that feel awkward.",
      "Name the steadiness you've gained, if any, when life hasn't cooperated.",
      "Talk about patience as a spiritual practice rather than just waiting.",
    ],
  },
  {
    id: 12,
    shortName: "Carrying It",
    verbatim:
      "Having had a spiritual awakening as the result of these Steps, we tried to carry this message to alcoholics, and to practice these principles in all our affairs.",
    principle: "Service",
    phase: "maintenance",
    active: true,
    essence: {
      step: "You keep it by giving it away, and you live the Steps everywhere, not just in meetings.",
      principle: "Service is love made practical — and it's how recovery stays alive in you.",
      working: "You work Step Twelve by helping the next person and practicing the principles all day.",
      promise: "You become the proof — for the newcomer — that the way out is real.",
    },
    statements: {
      step: "Step Twelve names what the previous eleven were quietly producing: a spiritual awakening — usually not a lightning bolt but a gradual change in how you see, react, and live. And it asks you to do two things with it. First, carry the message to alcoholics who still suffer — because the surest way to keep what you've found is to give it away. Second, practice these principles in all your affairs — meaning the Steps aren't a Sunday religion but a daily operating system, applied to work, family, money, conflict, everywhere.",
      principle: "The principle is service, which is simply love made useful. Service is also self-interested in the healthiest possible way: helping a newcomer reconnects you to your own Step One, keeps your gratitude fresh, and pulls you out of the self-obsession that fuels relapse. 'Carrying the message' isn't preaching; it's presence — showing up, telling the truth of your experience, and letting the proof of your changed life do the talking. Attraction, not promotion.",
      working: "People work Step Twelve in countless ordinary ways: answering a call at a bad hour, making coffee, sharing honestly, sponsoring, sitting with someone new. And they 'practice these principles in all their affairs' by asking, in the middle of a normal day, where they got to use one — honesty in a hard email, humility in an argument, willingness with a chore. You'll know it's working when service stops feeling like an obligation and starts feeling like the thing that keeps you well — and when the principles show up off the page, in your actual life.",
      promise: "Step Twelve returns purpose. The very wreckage of Step One becomes useful: your worst experience, honestly shared, is exactly what a newcomer needs to hear. You become living evidence that the way out is real. And the practice is a circle, not a finish line — carrying the message sends you back to a Step One newcomer, the principles keep deepening, and the freedom you found stays alive precisely because you keep handing it on.",
    },
    bigBookRefs: [
      {
        work: "Alcoholics Anonymous (the Big Book)",
        locator: "\"Working With Others\" (ch. 7, ~pp. 89–103)",
        summary:
          "A practical guide to carrying the message — how to approach someone still suffering, what helps, and the reminder that helping others is foundational to staying well.",
        whyItMatters:
          "It's the how-to of the first half of Step Twelve: presence and shared experience over preaching.",
      },
      {
        work: "Alcoholics Anonymous (the Big Book)",
        locator: "\"A Vision For You\" (ch. 11, ~pp. 151–164)",
        summary:
          "The closing chapter's picture of fellowship and a life rebuilt, and its well-known invitation to walk the road of happy destiny together.",
        whyItMatters:
          "It shows what the awakening of Step Twelve looks like lived out in community over time.",
      },
      {
        work: "Twelve Steps and Twelve Traditions",
        locator: "Step Twelve essay",
        summary:
          "A reflection on the spiritual awakening as a change in personality sufficient to recover, and on giving it away as the means of keeping it.",
        whyItMatters:
          "It defines the 'awakening' broadly and grounds the whole Step in the give-it-away-to-keep-it paradox.",
      },
    ],
    shareIdeas: [
      "Share the shape of your own spiritual awakening — gradual or sudden, and how you noticed it.",
      "Talk about a time carrying the message helped you as much as the person you were helping.",
      "Describe one place you 'practiced these principles' off the page this week.",
      "Share what 'attraction, not promotion' means in how you carry the message.",
      "Name how service guards your own recovery against self-obsession and relapse.",
      "Talk about becoming, for a newcomer, the proof that the way out is real.",
    ],
  },
];

export const FACET_LABELS: Record<
  "step" | "principle" | "working" | "promise",
  { label: string; subtitle: string; color: string }
> = {
  step: { label: "The Step", subtitle: "What it's really asking", color: "var(--primary)" },
  principle: { label: "The Principle", subtitle: "The virtue, lived", color: "#8B7BA8" },
  working: { label: "Working It", subtitle: "How people do this Step", color: "var(--accent)" },
  promise: { label: "The Promise", subtitle: "What it gives back", color: "var(--sage)" },
};

export const PHASE_META: Record<
  "surrender" | "house" | "maintenance",
  { label: string; tagline: string; steps: number[]; color: string }
> = {
  surrender: { label: "Give Up", tagline: "Surrender — Steps 1–3", steps: [1, 2, 3], color: "var(--accent)" },
  house: { label: "Clean House", tagline: "Housecleaning — Steps 4–9", steps: [4, 5, 6, 7, 8, 9], color: "var(--primary)" },
  maintenance: { label: "Keep It", tagline: "Maintain & grow — Steps 10–12", steps: [10, 11, 12], color: "var(--sage)" },
};

export function getStep(id: number): Step | undefined {
  return STEPS.find((s) => s.id === id);
}
