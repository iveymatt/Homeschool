# Wireframe Descriptions
## Homeschool SaaS — MVP v1
### Home Dashboard, Today's Plan, Executive Function Screen

---

## Screen 1: Home Dashboard

```
┌─────────────────────────────────────────────────┐
│  [Logo]                      [Parent View]  [⚙] │
├─────────────────────────────────────────────────┤
│                                                 │
│  Good morning, McKenna! ☀️                      │
│  Wednesday, September 15                        │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  HOW ARE YOU FEELING TODAY?                     │
│  😊  😐  😔  😤  [Skip]                         │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  TODAY'S PLAN          ████░░░░  3 of 6 done    │
│                                                 │
│  ┌──────────────────────────────────────────┐   │
│  │ ✅  Startup Routine          Done         │   │
│  │ ✅  Reading                  Done         │   │
│  │ ✅  Break                    Done         │   │
│  │ ▶   Math                     Up Next      │   │
│  │     Enrichment               Not Started  │   │
│  │     Wrap-Up                  Not Started  │   │
│  └──────────────────────────────────────────┘   │
│                                                 │
│  ┌──────────────────────────────────────────┐   │
│  │          ▶  START MATH                   │   │
│  └──────────────────────────────────────────┘   │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  TODAY'S FOCUS                                  │
│  📖 Reading: Fluency — 2 pages, "Dog Man"       │
│  ➕ Math: Addition with regrouping — 3 problems  │
│                                                 │
├─────────────────────────────────────────────────┤
│  PARENT SNAPSHOT  [tap to expand]               │
│  Yesterday: 5/6 blocks completed ✓              │
│  Reading confidence: 4/5  Math confidence: 3/5  │
└─────────────────────────────────────────────────┘
```

**Design notes:**
- Greeting is warm, dated, personal
- Mood check-in is optional (skip always available)
- Progress bar is visual, prominent, not grade-y
- Today's Plan list is compact — current task highlighted
- Single CTA button: Start [Current Task]
- Reading + math focus in plain, short sentences
- Parent snapshot is collapsed by default (keeps student view clean)
- Max 2 colors: soft neutral background + one accent color for active task

---

## Screen 2: Today's Plan

```
┌─────────────────────────────────────────────────┐
│  ← Back         TODAY'S PLAN                   │
│  Wednesday, Sept 15    ████░░░░  50% complete   │
├─────────────────────────────────────────────────┤
│                                                 │
│  ✅  Startup Routine              (10 min)  ✓   │
│                                                 │
│  ✅  Reading Block                (20 min)  ✓   │
│                                                 │
│  ✅  Movement Break               (5 min)   ✓   │
│                                                 │
├─────────────── ▶ ACTIVE BLOCK ─────────────────┤
│                                                 │
│  ┌──────────────────────────────────────────┐   │
│  │  ➕ Math Block               ~15 min      │   │
│  │                                          │   │
│  │  Today: Addition with regrouping         │   │
│  │  3 problems · Reference strip available  │   │
│  │                                          │   │
│  │  STEP 1 of 3                             │   │
│  │  ┌────────────────────────────────────┐  │   │
│  │  │  Here's your first problem.        │  │   │
│  │  │  Look at the reference strip       │  │   │
│  │  │  if you need it. Take your time.   │  │   │
│  │  └────────────────────────────────────┘  │   │
│  │                                          │   │
│  │  [📋 Show Reference Strip]               │   │
│  │                                          │   │
│  │         [Mark This Step Done →]          │   │
│  └──────────────────────────────────────────┘   │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│       Enrichment         (20 min)   Not yet     │
│       Wrap-Up            (10 min)   Not yet     │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Design notes:**
- Completed blocks are collapsed (just a checkmark row)
- Active block is expanded and prominent
- Future blocks are visible but muted
- One step shown at a time (hides cognitive load)
- Reference strip is pull-out, not always visible
- "Mark This Step Done" moves to next step
- No scrolling required to see current step
- Block estimated time shown; no hard countdown (reduces anxiety)
- After all steps done: completion screen before moving on

---

### Math Block — Active Lesson View (inline within Today's Plan)

```
┌─────────────────────────────────────────────────┐
│  ➕ MATH BLOCK              Problem 2 of 3       │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────── Reference Strip ──────────────┐  │
│  │  Regrouping: when ones > 9, carry 1 ten   │  │
│  │  Example: 47 + 36 → add ones: 7+6=13      │  │
│  │                    write 3, carry 1        │  │
│  └────────────────────────────────────────────┘  │
│                                                 │
│  Problem 2:                                     │
│  ┌──────────────────────────────────────────┐   │
│  │                                          │   │
│  │         58                               │   │
│  │       + 27                               │   │
│  │       ─────                              │   │
│  │       [  ?  ]   ← student types here     │   │
│  │                                          │   │
│  └──────────────────────────────────────────┘   │
│                                                 │
│  ┌──────────────────────────────────────────┐   │
│  │              [Check Answer]              │   │
│  └──────────────────────────────────────────┘   │
│                                                 │
│  "Take your time. The reference strip is        │
│   right there if you need it."                  │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Answer feedback:**
- Correct: "Yes! 85. That's right. Ready for the last one?"
- Incorrect: "Let's look at this together. Check your ones column first."
  → Step-by-step worked example reveals on request

---

## Screen 3: Executive Function Screen (Parent View)

```
┌─────────────────────────────────────────────────┐
│  ← Back      EXECUTIVE FUNCTION SUPPORTS        │
│              McKenna Ray · Updated Today         │
├─────────────────────────────────────────────────┤
│                                                 │
│  OVERALL INDEPENDENCE SCORE                     │
│  ████████░░░░  Level 1.8 / 4                    │
│  Trend: ↑ Improving in 3 areas                  │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  SKILL AREAS              Score   Trend  Level  │
│  ─────────────────────────────────────────────  │
│  Getting Started             1    ↑        2    │
│  Knowing What To Do          2    →        1    │
│  Holding Instructions        1    →        2    │
│  Moving Between Tasks        1    ↑        2    │
│  Staying Focused             2    →        1    │
│  Finishing Tasks             1    ↑        2    │
│  Managing Frustration        2    →        1    │
│  Sense of Time               1    →        2    │
│  Pause Before Reacting       2    →        1    │
│                                                 │
│  ↑ = improving   → = stable   ↓ = declining     │
│  Score: 0=high support needed · 4=independent   │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  [TAP ANY SKILL FOR DETAILS]                    │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

### EF Domain Detail View (expanded on tap)

```
┌─────────────────────────────────────────────────┐
│  ← EF Overview                                  │
│  GETTING STARTED (Task Initiation)               │
├─────────────────────────────────────────────────┤
│                                                 │
│  Current Score: 1 / 4                           │
│  Support Level: 2 (Moderate prompts)            │
│  Trend: ↑ Improving                             │
│                                                 │
│  ┌──────────────────────────────────────────┐   │
│  │  WHAT THIS MEANS                         │   │
│  │  McKenna often needs encouragement to    │   │
│  │  start a task on her own. This is        │   │
│  │  common and improvable with consistent   │   │
│  │  support.                                │   │
│  └──────────────────────────────────────────┘   │
│                                                 │
│  WHAT WE'RE DOING NOW                           │
│  • Showing only the first step at task start    │
│  • Using a personal motivational phrase         │
│  • Connecting tasks to favorite topics          │
│                                                 │
│  LAST 5 SESSIONS                                │
│  Mon  Tue  Wed  Thu  Fri                        │
│   1    1    2    2    2    ← session scores     │
│                                                 │
│  RECENT NOTE                                    │
│  "Responded well to 'first step only' prompt.   │
│   Got started within 2 min on 3/5 days."        │
│                                                 │
├─────────────────────────────────────────────────┤
│  PARENT ADJUSTMENTS                             │
│                                                 │
│  Support Level:  [− Less]  [2 Moderate]  [+ More]│
│                                                 │
│  Add a note: [________________________]         │
│                          [Save Changes]         │
└─────────────────────────────────────────────────┘
```

**Design notes:**
- Plain language everywhere — no clinical terms
- Score is shown with a label, not just a number
- Last 5 sessions shown as a simple score list (no complex charts in MVP)
- Parent can nudge support level with +/- buttons
- Note field for parent observations
- Trend is shown as plain words + arrow (not statistical language)

---

## Shared Design System Notes

**Typography:**
- Headings: 20–24px, medium weight, dark neutral
- Body: 16–18px, regular weight, high contrast
- Labels: 12–14px, uppercase, medium weight, muted color
- No font smaller than 14px on any screen

**Color:**
- Background: off-white or very light cream (not pure white)
- Primary accent: one calm color (suggested: teal or slate blue)
- Success states: soft green (not neon)
- Warning: soft amber
- Error: soft red — never harsh
- Avoid red/green as the only differentiator (accessibility)

**Spacing:**
- Generous padding in all cards (16–24px minimum)
- Cards have visible but soft borders or drop shadows
- Whitespace between sections: 24–32px minimum

**Interactions:**
- All primary actions are single large buttons
- Completion is always satisfying (not just a disappearing item)
- No floating menus or tooltips in student view
- Tap targets minimum 44x44px (mobile-friendly)
