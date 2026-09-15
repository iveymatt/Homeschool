// ─── Types ──────────────────────────────────────────────────────────────────

export type SubjectType = "reading" | "math" | "enrichment" | "experiential" | "break" | "startup" | "wrap_up";
export type StatusType = "not_started" | "in_progress" | "completed" | "skipped";
export type TrendType = "improving" | "stable" | "declining";

export interface Step {
  id: number;
  text: string;
  completed: boolean;
}

export interface EFSupport {
  before?: string;
  during?: string;
  after?: string;
}

// Standards are for the parent/adult layer only — never surfaced in student-facing views.
// See docs/standards-alignment.md: standards show the bridge from where Makena is to
// 8th grade expectations, they are never shown to Makena as "you're behind."
export interface StandardRef {
  id: string;
  description: string;
  grade: string;
  domain: string;
}

export interface StandardsAlignment {
  primary: StandardRef;
  secondary?: StandardRef;
  gradeLevelContext: string;
  parentNote: string;
}

export interface Block {
  id: string;
  order: number;
  title: string;
  subject: SubjectType;
  estimatedMinutes: number;
  goal: string;
  instructions: string;
  steps: Step[];
  adaptation?: string;
  status: StatusType;
  efSupport?: EFSupport;
  vocabularyAnchors?: { word: string; meaning: string }[];
  confidenceAfter?: number;
  lessonId?: string;
  // What she actually did in real life that this block captures/maps to standards.
  realWorldContext?: string;
  standardsAlignment?: StandardsAlignment;
}

export interface DailyPlan {
  date: string;
  theme: "regular" | "light" | "review" | "catch_up";
  readingFocus: string;
  mathFocus: string;
  enrichmentTheme?: string;
  // EF/regulation supports actually built into today's blocks — parent-facing only.
  supportsUsedToday: string[];
  blocks: Block[];
}

export interface EFDomain {
  key: string;
  label: string;
  plainLabel: string;
  score: number;        // 0–4
  supportLevel: number; // 0–3
  trend: TrendType;
  sessions_at_level: number;
  notes: string;
  lastUpdated: string;
  recentScores: number[];
  whatWeAreDoing: string[];
  supportDescription: string;
}

export interface GoalProgress {
  goal: string;
  status: "met" | "in_progress" | "not_met";
}

export interface StudentProfile {
  id: string;
  name: string;
  nickname: string;
  age: number;
  enrolledGrade: string;
  school: string;
  // California school-based, not a homeschool enrollment — Freshman year at Casa Grande.
  programNotes: string[];
  readingLevelEstimate: string;
  readingGradeGap: number;
  mathLevelEstimate: string;
  mathGradeGap: number;
  readingLadderLevel: number;
  mathLadderLevel: number;
  confidenceReading: number;
  confidenceMath: number;
  confidenceGeneral: number;
  readingStruggleTypes: string[];
  mathDifficultyTypes: string[];
  interests: string[];
  goals30Day: string[];
  goals90Day: string[];
  efDomains: EFDomain[];
  recentWins: string[];
  currentStruggleFlags: string[];
}

// ─── Makena's Profile ───────────────────────────────────────────────────────

export const MAKENA: StudentProfile = {
  id: "makena-ray-001",
  name: "Makena Ray",
  nickname: "Makena",
  age: 14,
  enrolledGrade: "9th (Freshman)",
  school: "Casa Grande High School — Petaluma, CA",
  programNotes: [
    "School psychologist assessment scheduled to evaluate for an IEP and/or 504 plan.",
    "Starting counseling and executive function coaching with EmpowerED — will refine specific class structure and independent-study details once that work begins.",
  ],
  readingLevelEstimate: "6th grade",
  readingGradeGap: 3,
  mathLevelEstimate: "5th–6th grade",
  mathGradeGap: 3,
  readingLadderLevel: 4,
  mathLadderLevel: 6,
  confidenceReading: 2,
  confidenceMath: 2,
  confidenceGeneral: 3,
  readingStruggleTypes: ["fluency", "working_memory", "avoidance_frustration"],
  mathDifficultyTypes: ["abstract_presentation", "multi_step_sequencing", "confidence"],
  interests: ["dogs", "wolves", "horses", "art", "drawing", "nature", "animals", "fashion"],
  goals30Day: [
    "Complete at least 20 of 22 scheduled school days",
    "Read 2 full books at 6th grade level or above",
    "Demonstrate fluency on 3 consecutive reading sessions",
    "Solve 10-problem mixed operations sets with 80%+ accuracy",
  ],
  goals90Day: [
    "Reach 7th grade independent reading level",
    "Master 6th grade math: ratios, percentages, one-step equations",
    "Build consistent daily school routine with minimal prompting",
    "Complete one project-based unit tied to animal interest",
  ],
  recentWins: [
    "Completed 5 reading sessions in a row without skipping",
    "Solved regrouping problems independently on 2 consecutive days",
    "Started reading block without prompting on Friday",
  ],
  currentStruggleFlags: [
    "Often needs multiple prompts to begin math block",
    "Frequently leaves reading tasks 90% done without clicking Done",
    "Transitions from reading to math are bumpy",
  ],
  efDomains: [
    {
      key: "task_initiation",
      label: "Task Initiation",
      plainLabel: "Getting Started",
      score: 1,
      supportLevel: 2,
      trend: "improving",
      sessions_at_level: 3,
      notes: "First-step-only prompts work well. Getting started within 2–3 min on good days.",
      lastUpdated: "2025-09-15",
      recentScores: [1, 1, 2, 2, 2],
      whatWeAreDoing: [
        "Showing only the first step at task start",
        "Connecting tasks to favorite topics",
        "Using a personal motivational phrase",
      ],
      supportDescription:
        "Makena sometimes needs a gentle push to start a task. We show her one small first step — not the whole thing — and she gets going.",
    },
    {
      key: "planning_organization",
      label: "Planning & Organization",
      plainLabel: "Knowing What to Do",
      score: 2,
      supportLevel: 1,
      trend: "stable",
      sessions_at_level: 5,
      notes: "Benefits from visible step list before starting. Can follow a pre-set plan.",
      lastUpdated: "2025-09-12",
      recentScores: [2, 2, 2, 3, 2],
      whatWeAreDoing: [
        "Pre-listing all steps before the task begins",
        "Showing time estimates up front",
        "Giving a one-sentence preview of the block",
      ],
      supportDescription:
        "Makena does well when she can see the whole plan before starting. We lay out the steps so there are no surprises.",
    },
    {
      key: "working_memory",
      label: "Working Memory",
      plainLabel: "Holding Instructions in Mind",
      score: 1,
      supportLevel: 2,
      trend: "stable",
      sessions_at_level: 4,
      notes: "Vocabulary anchor cards are essential. Re-asks instructions frequently without them.",
      lastUpdated: "2025-09-14",
      recentScores: [1, 1, 1, 2, 1],
      whatWeAreDoing: [
        "Keeping vocabulary words visible on screen during reading",
        "Keeping reference strips visible during math",
        "Using read-aloud + visual instructions together",
      ],
      supportDescription:
        "Makena benefits from having key information stay visible while she works — it reduces the mental load so she can focus on the actual task.",
    },
    {
      key: "transitions",
      label: "Transitions",
      plainLabel: "Moving Between Activities",
      score: 1,
      supportLevel: 2,
      trend: "improving",
      sessions_at_level: 3,
      notes: "2-min warnings + named transition phrase + movement break = smooth transitions.",
      lastUpdated: "2025-09-15",
      recentScores: [1, 1, 2, 2, 2],
      whatWeAreDoing: [
        "Giving a 2-minute warning before every block change",
        "Using a named transition phrase ('Reading is done. Now we shift to math.')",
        "Building a movement break between subjects",
      ],
      supportDescription:
        "Switching between activities can be hard for Makena. We give advance notice and a clear naming of what's changing — it's not resistance, it's how her brain shifts gears.",
    },
    {
      key: "sustained_focus",
      label: "Sustained Focus",
      plainLabel: "Staying Focused",
      score: 2,
      supportLevel: 1,
      trend: "stable",
      sessions_at_level: 6,
      notes: "15-min max blocks. Interest hooks at start of each block help.",
      lastUpdated: "2025-09-13",
      recentScores: [2, 2, 2, 2, 3],
      whatWeAreDoing: [
        "Keeping blocks under 15 minutes",
        "Starting each block with a topic tied to her interests",
        "Showing one task at a time — not the whole lesson",
      ],
      supportDescription:
        "Makena focuses best in shorter bursts with a clear endpoint. We keep lessons brief and always open with something connected to what she cares about.",
    },
    {
      key: "task_completion",
      label: "Task Completion",
      plainLabel: "Finishing What She Started",
      score: 1,
      supportLevel: 2,
      trend: "improving",
      sessions_at_level: 3,
      notes: "Done confirmation screens help her register closure.",
      lastUpdated: "2025-09-15",
      recentScores: [1, 1, 2, 2, 2],
      whatWeAreDoing: [
        "Using an explicit 'You finished — mark it done' confirmation",
        "Requiring a Done button tap to close each task",
        "Removing bonus/optional content that blurs the finish line",
      ],
      supportDescription:
        "Makena sometimes moves on before fully finishing. We use a clear 'done' moment so her brain can register closure and feel the win.",
    },
    {
      key: "emotional_regulation",
      label: "Emotional Regulation",
      plainLabel: "Managing Frustration",
      score: 2,
      supportLevel: 1,
      trend: "stable",
      sessions_at_level: 7,
      notes: "Gentle error framing is essential. No red X.",
      lastUpdated: "2025-09-11",
      recentScores: [2, 2, 2, 3, 2],
      whatWeAreDoing: [
        "Framing wrong answers as 'Let's look at this together'",
        "Never using red X or 'wrong, try again' language",
        "Building in reflection after frustrating moments",
      ],
      supportDescription:
        "When something is hard, Makena can shut down. We keep error feedback gentle and focus on 'let's figure it out together' rather than right/wrong.",
    },
    {
      key: "time_awareness",
      label: "Time Awareness",
      plainLabel: "Sense of Time",
      score: 1,
      supportLevel: 2,
      trend: "stable",
      sessions_at_level: 4,
      notes: "Responds well to time analogies ('about as long as 2 songs').",
      lastUpdated: "2025-09-12",
      recentScores: [1, 1, 1, 2, 1],
      whatWeAreDoing: [
        "Using relatable time analogies ('This is about 2 songs long')",
        "Showing estimated time before each block",
        "Giving a 2-minute warning before blocks end",
      ],
      supportDescription:
        "Makena's sense of how long tasks take is still developing. We anchor time in things she understands — like how many songs or minutes of a show.",
    },
    {
      key: "impulse_control",
      label: "Impulse Control",
      plainLabel: "Pausing Before Reacting",
      score: 2,
      supportLevel: 1,
      trend: "stable",
      sessions_at_level: 5,
      notes: "One-task-at-a-time view reduces jumping ahead.",
      lastUpdated: "2025-09-10",
      recentScores: [2, 2, 2, 2, 2],
      whatWeAreDoing: [
        "Showing one step at a time — hiding future steps",
        "Using a single-problem view in math",
        "Building in pause moments mid-lesson",
      ],
      supportDescription:
        "Makena sometimes jumps ahead before finishing the current step. Showing only one thing at a time helps her slow down and complete before moving on.",
    },
  ],
};

// ─── Today's Daily Plan ──────────────────────────────────────────────────────

export const TODAY_PLAN: DailyPlan = {
  date: new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }),
  theme: "regular",
  readingFocus: "Fluency — read 2 pages of Dog Man with expression",
  mathFocus: "Decimal operations — 3 problems with reference strip",
  enrichmentTheme: "Ranch & farrier work — hoof care log",
  supportsUsedToday: [
    "Visible step-by-step checklist — one step shown at a time",
    "2-minute transition warning before each block change",
    "Vocabulary anchor card kept on screen during reading",
    "Reference strip visible throughout the math block",
    "Movement break scheduled between reading and math",
    "Gentle error framing — no red X, \"let's look at this together\"",
  ],
  blocks: [
    {
      id: "block-startup",
      order: 1,
      title: "Startup",
      subject: "startup",
      estimatedMinutes: 10,
      goal: "Get settled and feel ready",
      instructions: "Take 3 slow breaths, gather your materials, and look at today's plan.",
      steps: [
        { id: 1, text: "Take 3 slow breaths", completed: false },
        { id: 2, text: "Get your book and pencil", completed: false },
        { id: 3, text: "Look at today's full plan", completed: false },
        { id: 4, text: "Tap Ready when you're set", completed: false },
      ],
      status: "not_started",
      efSupport: {
        before: "Today you'll do: Reading → Math → Enrichment. Let's start easy.",
      },
    },
    {
      id: "block-reading",
      order: 2,
      title: "Reading",
      subject: "reading",
      estimatedMinutes: 20,
      goal: "Read 2 pages of Dog Man with expression",
      instructions: "Open to page 14. Read pages 14 and 15 out loud. Try to change your voice for different characters.",
      steps: [
        { id: 1, text: "Open Dog Man to page 14", completed: false },
        { id: 2, text: "Read page 14 out loud", completed: false },
        { id: 3, text: "Take one slow breath", completed: false },
        { id: 4, text: "Read page 15 out loud", completed: false },
        { id: 5, text: "Say one thing you remember from those pages", completed: false },
      ],
      adaptation: "If 2 pages feels like too much, 1 page is okay. Tell your guide.",
      status: "not_started",
      vocabularyAnchors: [
        { word: "expression", meaning: "reading with feeling — changing your voice to match the story" },
        { word: "fluency", meaning: "reading smoothly, not stopping and starting a lot" },
      ],
      efSupport: {
        before: "Today you're reading just two pages. First step: open to page 14.",
        during: "Vocabulary words stay on screen. Take a breath between pages.",
        after: "You read both pages. That's the whole assignment. Tap Done.",
      },
      standardsAlignment: {
        primary: {
          id: "RF.6.4b",
          description: "Read grade-level prose and poetry orally with accuracy, appropriate rate, and expression",
          grade: "6th",
          domain: "Reading Foundational Skills",
        },
        secondary: {
          id: "RL.7.4",
          description: "Determine the meaning of words and phrases as they are used in text, including figurative language",
          grade: "7th",
          domain: "Reading: Literature",
        },
        gradeLevelContext: "This is a 6th grade foundational reading standard. Makena is solidifying it now as the bridge toward high school reading expectations at Casa Grande.",
        parentNote: "Today's reading lesson targets a California 6th grade fluency standard. Each session like this moves Makena closer to grade-level reading.",
      },
    },
    {
      id: "block-break-1",
      order: 3,
      title: "Movement Break",
      subject: "break",
      estimatedMinutes: 5,
      goal: "Reset and move",
      instructions: "Stand up. Shake out your hands. Walk around for 2 minutes. Drink some water.",
      steps: [
        { id: 1, text: "Stand up and stretch", completed: false },
        { id: 2, text: "Walk around for 2 minutes", completed: false },
        { id: 3, text: "Drink some water", completed: false },
      ],
      status: "not_started",
      efSupport: {
        after: "Ready for math when you are.",
      },
    },
    {
      id: "block-math",
      order: 4,
      title: "Math",
      subject: "math",
      estimatedMinutes: 20,
      goal: "Solve 3 decimal addition problems",
      instructions: "Today: 3 problems. One at a time. Reference strip is available. Take your time.",
      steps: [
        { id: 1, text: "Look at the reference strip", completed: false },
        { id: 2, text: "Solve problem 1", completed: false },
        { id: 3, text: "Solve problem 2", completed: false },
        { id: 4, text: "Solve problem 3", completed: false },
      ],
      adaptation: "If 3 problems feels like too much, do 2 and flag for your guide.",
      status: "not_started",
      efSupport: {
        before: "Today: 3 problems. Here they are. One at a time — don't look ahead.",
        during: "Reference strip stays visible. You're doing great.",
        after: "Math is done. That was real work. Take a breath.",
      },
      standardsAlignment: {
        primary: {
          id: "6.NS.3",
          description: "Fluently add, subtract, multiply, and divide multi-digit decimals",
          grade: "6th",
          domain: "The Number System",
        },
        gradeLevelContext: "This is a 6th grade California math standard. Makena is working to master it as part of bridging toward high school math.",
        parentNote: "Today's math lesson covers a California 6th grade decimals standard. Once this is solid, we'll move to 7th grade ratio and proportion concepts.",
      },
    },
    {
      id: "block-enrichment",
      order: 5,
      title: "Ranch & Farrier Work",
      subject: "experiential",
      estimatedMinutes: 20,
      goal: "Log today's hoof care work with the farrier",
      instructions: "After your farrier session, write down what you measured and did — hoof length, any trimming, and one thing you noticed about how the hoof is built.",
      steps: [
        { id: 1, text: "Write down the hoof measurements you took today", completed: false },
        { id: 2, text: "Note anything the farrier explained about hoof structure", completed: false },
        { id: 3, text: "Draw or describe one part of the hoof you learned about", completed: false },
      ],
      status: "not_started",
      realWorldContext: "Measuring and recording hoof trims with the farrier at the ranch, and learning hoof anatomy.",
      standardsAlignment: {
        primary: {
          id: "6.NS.3",
          description: "Fluently add, subtract, multiply, and divide multi-digit decimals",
          grade: "6th",
          domain: "The Number System",
        },
        secondary: {
          id: "NGSS MS-LS1-3",
          description: "Use argument supported by evidence for how the body is a system of interacting subsystems composed of groups of cells",
          grade: "6th–8th",
          domain: "Life Science — Structure & Function",
        },
        gradeLevelContext: "Real ranch work: measuring hoof trims in decimal inches practices the same 6th grade decimals skill as her math block, and the hoof-anatomy discussion applies middle school life science structure-and-function concepts hands-on.",
        parentNote: "Makena's farrier work today wasn't just a hobby — the measuring practiced her math standard (6.NS.3, decimals) and the anatomy discussion touched middle school life science (structure & function). Real-world experience, real academic credit.",
      },
      efSupport: {
        before: "You just got done at the ranch — nice work. Let's capture what you did while it's fresh.",
        after: "That's real science and math work. Tap Done.",
      },
    },
    {
      id: "block-wrapup",
      order: 6,
      title: "Wrap-Up",
      subject: "wrap_up",
      estimatedMinutes: 10,
      goal: "Close the day and reflect",
      instructions: "You're almost done. Answer: what was the best part of today?",
      steps: [
        { id: 1, text: "Answer: what was the best part of today?", completed: false },
        { id: 2, text: "Tap Finish Today", completed: false },
      ],
      status: "not_started",
    },
  ],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const SUBJECT_COLORS: Record<SubjectType, string> = {
  reading: "bg-sky-50 border-sky-200 text-sky-700",
  math: "bg-violet-50 border-violet-200 text-violet-700",
  enrichment: "bg-amber-50 border-amber-200 text-amber-700",
  experiential: "bg-orange-50 border-orange-200 text-orange-700",
  break: "bg-green-50 border-green-200 text-green-700",
  startup: "bg-slate-50 border-slate-200 text-slate-600",
  wrap_up: "bg-rose-50 border-rose-200 text-rose-700",
};

export const SUBJECT_ICONS: Record<SubjectType, string> = {
  reading: "📖",
  math: "➕",
  enrichment: "🎨",
  experiential: "🐴",
  break: "🌿",
  startup: "☀️",
  wrap_up: "✅",
};

export const TREND_ICONS: Record<TrendType, string> = {
  improving: "↑",
  stable: "→",
  declining: "↓",
};

export const TREND_COLORS: Record<TrendType, string> = {
  improving: "text-green-600",
  stable: "text-slate-500",
  declining: "text-amber-600",
};

export const SCORE_LABELS: Record<number, string> = {
  0: "High Support",
  1: "High Support",
  2: "Building",
  3: "Almost There",
  4: "Independent",
};

export const SCORE_COLORS: Record<number, string> = {
  0: "bg-slate-200 text-slate-700",
  1: "bg-sky-100 text-sky-800",
  2: "bg-teal-100 text-teal-800",
  3: "bg-green-100 text-green-800",
  4: "bg-emerald-100 text-emerald-800",
};

// ─── Real-World Learning Library ────────────────────────────────────────────
// Real activities from Makena's life, mapped to California standards for
// parent/team reporting. Not all of these are in today's plan — they're
// available to pull into any day's Experiential block. Standards are shown
// to the parent/team layer only, never to Makena as "you're behind."

export const EXPERIENTIAL_LIBRARY: Block[] = [
  {
    id: "exp-farrier",
    order: 0,
    title: "Ranch & Farrier Work",
    subject: "experiential",
    estimatedMinutes: 20,
    goal: "Log today's hoof care work with the farrier",
    instructions: "Record hoof measurements and trims, and one thing learned about hoof structure.",
    steps: [
      { id: 1, text: "Write down the hoof measurements you took today", completed: false },
      { id: 2, text: "Note anything the farrier explained about hoof structure", completed: false },
      { id: 3, text: "Draw or describe one part of the hoof you learned about", completed: false },
    ],
    status: "not_started",
    realWorldContext: "Measuring and recording hoof trims with the farrier at the ranch, and learning hoof anatomy.",
    standardsAlignment: {
      primary: {
        id: "6.NS.3",
        description: "Fluently add, subtract, multiply, and divide multi-digit decimals",
        grade: "6th",
        domain: "The Number System",
      },
      secondary: {
        id: "NGSS MS-LS1-3",
        description: "Use argument supported by evidence for how the body is a system of interacting subsystems composed of groups of cells",
        grade: "6th–8th",
        domain: "Life Science — Structure & Function",
      },
      gradeLevelContext: "Measuring hoof trims in decimal inches practices the same 6th grade decimals skill as her math block; the anatomy discussion applies middle school life science structure-and-function concepts hands-on.",
      parentNote: "Makena's farrier work isn't just a hobby — the measuring practices her math standard (6.NS.3, decimals) and the anatomy discussion touches middle school life science (structure & function).",
    },
  },
  {
    id: "exp-equine-anatomy",
    order: 0,
    title: "Equine Leg Anatomy Study",
    subject: "experiential",
    estimatedMinutes: 30,
    goal: "Record observations from the leg dissection at the Junior College",
    instructions: "Follow the dissection steps with the instructor. Write down each structure found and what it does.",
    steps: [
      { id: 1, text: "List the structures identified during dissection, in order", completed: false },
      { id: 2, text: "Write one sentence about what each structure does", completed: false },
      { id: 3, text: "Note one connection to hoof or leg health", completed: false },
    ],
    status: "not_started",
    realWorldContext: "Equine leg dissection at the Junior College, studying anatomy structure and function.",
    standardsAlignment: {
      primary: {
        id: "NGSS MS-LS1-3",
        description: "Use argument supported by evidence for how the body is a system of interacting subsystems composed of groups of cells",
        grade: "6th–8th",
        domain: "Life Science — Structure & Function",
      },
      secondary: {
        id: "RST.6-8.3",
        description: "Follow precisely a multistep procedure when carrying out experiments, taking measurements, or performing technical tasks",
        grade: "6th–8th",
        domain: "Science & Technical Literacy",
      },
      gradeLevelContext: "A hands-on college-level dissection lab applies middle school life science structure-and-function standards directly, and following the dissection procedure builds the technical-literacy skill of following a multistep process.",
      parentNote: "This wasn't a worksheet — Makena worked through an actual college-level dissection lab. That's authentic application of standards most students only see in a textbook.",
    },
    efSupport: {
      before: "This is hands-on and might be intense — that's okay. Go at your own pace.",
      after: "You worked through a real anatomy lab. That's advanced work.",
    },
  },
  {
    id: "exp-gymnastics",
    order: 0,
    title: "Gymnastics Coaching Reflection",
    subject: "experiential",
    estimatedMinutes: 15,
    goal: "Reflect on coaching younger gymnasts today",
    instructions: "Think about the instructions given to the younger gymnasts today. Write down one thing explained clearly and one thing to explain differently next time.",
    steps: [
      { id: 1, text: "Write one instruction you gave today", completed: false },
      { id: 2, text: "Describe how the gymnast responded", completed: false },
      { id: 3, text: "Note one thing you'd say differently next time", completed: false },
    ],
    status: "not_started",
    realWorldContext: "Assistant coaching younger gymnasts at the gym — giving instructions and feedback.",
    standardsAlignment: {
      primary: {
        id: "SL.9-10.1",
        description: "Initiate and participate effectively in a range of collaborative discussions, expressing ideas clearly and persuasively",
        grade: "9th–10th",
        domain: "Speaking & Listening",
      },
      secondary: {
        id: "SL.6.4",
        description: "Present claims and findings, sequencing ideas logically",
        grade: "6th",
        domain: "Speaking & Listening",
      },
      gradeLevelContext: "Giving clear, sequenced verbal instructions to younger athletes is grade-level speaking-and-listening work — a standard where Makena's real-world coaching experience meets or exceeds her enrolled grade band, not behind it.",
      parentNote: "Makena's coaching today is genuine high school-level speaking-and-listening practice — explaining steps clearly to someone else is a more demanding skill than just following instructions herself.",
    },
    efSupport: {
      after: "Teaching someone else means you really know it. Nice work today.",
    },
  },
  {
    id: "exp-babysitting",
    order: 0,
    title: "Babysitting Log",
    subject: "experiential",
    estimatedMinutes: 15,
    goal: "Log today's babysitting job",
    instructions: "Record start and end time, what was done, and any math involved (snacks, schedules, pay).",
    steps: [
      { id: 1, text: "Write start and end time and total hours", completed: false },
      { id: 2, text: "Note any measuring, counting, or money math you did", completed: false },
      { id: 3, text: "Write one thing that went well", completed: false },
    ],
    status: "not_started",
    realWorldContext: "Babysitting — managing time, snacks/measurements, and responsibility for another child.",
    standardsAlignment: {
      primary: {
        id: "6.RP.3",
        description: "Use ratio and rate reasoning to solve real-world and mathematical problems",
        grade: "6th",
        domain: "Ratios & Proportional Relationships",
      },
      secondary: {
        id: "W.9-10.4",
        description: "Produce clear and coherent writing in which the development, organization, and style are appropriate to task, purpose, and audience",
        grade: "9th–10th",
        domain: "Writing",
      },
      gradeLevelContext: "Tracking hours, pay, and quantities while babysitting practices the same rate-and-ratio reasoning as her math bridge work, and writing up the log practices clear, organized writing at grade level.",
      parentNote: "Babysitting is real responsibility and real math — hourly pay, timing, and measuring are practical applications of the ratio skills Makena is building toward in her math block.",
    },
  },
];
