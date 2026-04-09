# User Flows
## Homeschool SaaS — MVP v1

---

## Flow 1: Parent Setup (First-Time Onboarding)

```
START
  │
  ▼
1. Welcome Screen
   "Let's set up McKenna's learning profile."
   [Begin Setup] button
  │
  ▼
2. Identity Setup
   - Enter: name, nickname, age, grade level
   - Select: homeschool status
   [Save & Continue]
  │
  ▼
3. Academic Snapshot
   - Select current reading level (range options, no tests)
   - Select current math level
   - Flag strongest and hardest subjects
   - Enter 1–3 current goals in plain language
   [Save & Continue]
  │
  ▼
4. Learning Style & Cognitive Profile
   - Attention span slider (5–60 min)
   - Preferred lesson length slider
   - Select learning modes (visual / audio / movement / reading)
   - Toggle: needs visual supports
   - Toggle: benefits from audio
   - Movement break frequency
   - Toggle: transition support needed
   - Enter frustration triggers (text field, with suggestions)
   - Rate confidence in reading, math, overall (1–5 stars)
   [Save & Continue]
  │
  ▼
5. Interest Profile
   - Enter favorite topics (tag input with suggestions)
   - Enter favorite animals
   - Enter favorite books
   - Enter favorite games/shows/activities
   [Save & Continue]
  │
  ▼
6. Routine Setup
   - Select best learning times (morning / midday / afternoon / evening)
   - Set ideal start time
   - Note any schedule constraints
   - Describe energy patterns (dropdown: steady / front-loaded / slow-start / variable)
   [Save & Continue]
  │
  ▼
7. Schedule Preview
   System generates suggested daily schedule
   Parent can drag/drop block order, adjust times
   [Looks Good] or [Customize]
  │
  ▼
8. EF Support Baseline
   "Based on what you told us, here are the supports we're starting with."
   Show: EF domain grid with default support levels
   Parent can adjust any domain manually
   [Confirm Supports]
  │
  ▼
9. Setup Complete
   "McKenna's profile is ready."
   [Go to Today's Plan]

END
```

---

## Flow 2: Daily Use (Student + Guide)

```
START (beginning of school day)
  │
  ▼
1. Home Dashboard
   - Guide reviews: today's plan summary, reading focus, math focus
   - Student checks in: taps emoji for mood/energy (optional)
   - "Start Your Day" button
  │
  ▼
2. Startup Block
   - Duration: 5–10 min
   - Instructions: brief centering routine, gather materials
   - EF support: "Today you'll do X, Y, Z. Let's start with X."
   - [Mark Done]
  │
  ▼
3. Reading Block (Today's Plan → Reading)
   - Load reading lesson
   - Display: title, objective, estimated time, step 1
   - EF support: task_initiation prompt fires first
   - Student follows steps; each step has a small checkmark
   - Mid-task pause fires at halfway point
   - Vocabulary anchor visible throughout
   - Student reaches final step → [Mark Done]
   - Confidence check: "How did reading feel today?" (emoji scale)
   - Transition support: "Reading is done. Take a 3-minute break."
  │
  ▼
4. Movement Break
   - Timer displays (e.g. 5 min)
   - Brief movement suggestion (optional)
   - Break ends → notification: "Ready for math when you are."
  │
  ▼
5. Math Block (Today's Plan → Math)
   - Load math lesson
   - Display: concept, problem count, first problem only
   - Planning support: "Today: 3 problems. Problem 1 of 3."
   - Reference strip visible
   - Student answers → system responds gently
   - Next problem reveals after current complete
   - Final problem → [Mark Done]
   - Confidence check: "How did math feel today?" (emoji scale)
   - Transition support fires
  │
  ▼
6. Enrichment Block (optional)
   - Load enrichment activity
   - Interest-based connection visible
   - Completion → [Mark Done]
  │
  ▼
7. Wrap-Up Block
   - "You're almost done for today."
   - Reflection prompt: "What was the best part of today?"
   - Student taps response (3 options + write-in)
   - System generates completion summary: "Today you completed X of Y blocks."
   - [Finish Today]
  │
  ▼
8. Completion State
   - Dashboard shows: all blocks completed
   - Mini celebration (confetti, badge, or streak update — calm, not overwhelming)
   - Parent notified: "McKenna finished today's plan."

END
```

---

## Flow 3: EF Support During the Day

```
EF SUPPORT TRIGGER DURING LESSON
  │
  ▼
1. Lesson Loads
   - System checks student's EF profile
   - injectEFSupports() runs on lesson object
   - EF supports embedded into lesson phases (before / during / after)
  │
  ▼
2. Before Phase
   - Task initiation prompt displays first
   - Planning preview shows (if score ≤ 2)
   - Materials checklist shows (if planning score ≤ 1)
   - Student acknowledges → lesson steps appear
  │
  ▼
3. During Phase
   - Vocabulary/reference anchor visible
   - Mid-task pause fires at trigger point
   - Progress micro-bar shows (if focus score ≤ 2)
   - If student is on the page > 3x the expected time → gentle nudge: "Still working? That's okay."
  │
  ▼
4. After Phase
   - Completion confirmation screen fires
   - Confidence check (1-click emoji)
   - Transition phrase displays before next block loads
  │
  ▼
5. Session Logging
   - EF session log created for each domain that was activated
   - Log: support used, prompts needed, session score
   - ef_profile updated with new session data
   - Trend recalculated
   - Support level decisions run (fade / maintain / increase)
  │
  ▼
6. Escalation Path (if struggle detected)
   - If frustration_events >= 2 in one session:
     → Surface to parent: "McKenna had a hard time with [X] today. Here are some options."
     → Options: take a break / switch to light-day mode / skip to enrichment
   - Parent/Guide makes the call
   - Choice logged in personalization memory

END
```

---

## Flow 4: Weekly Review (Parent)

```
START (end of week, usually Friday or Sunday)
  │
  ▼
1. Parent navigates to Weekly Plan
   - View: all 5 days, completion status per day
   - Days show: green (complete) / yellow (partial) / gray (skipped)
  │
  ▼
2. Weekly Summary Card
   - Reading: sessions completed, level status, confidence trend
   - Math: sessions completed, skill mastered, confidence trend
   - EF: domains that improved / held steady / declined
   - Engagement: completion rate, frustration events, high-engagement moments
  │
  ▼
3. Parent Summary Report
   - Plain language summary of the week
   - "Here's what McKenna worked on this week"
   - "Here's what went well"
   - "Here's what we noticed and will adjust"
   - EF notes in plain language
  │
  ▼
4. Recommendations for Next Week
   - System generates: "Based on this week, here's what we recommend next week"
   - Reading: continue / reinforce / advance
   - Math: continue / reinforce / advance
   - EF supports: maintain / fade / increase (per domain)
   - Day theme suggestions: regular / light / review
   [Accept Recommendations] or [Customize]
  │
  ▼
5. Next Week Preview
   - Generated weekly plan loads
   - Parent can adjust day themes, block order, topics
   - [Confirm Next Week]

END
```

---

## Flow 5: Light Day / Low Energy Override

```
TRIGGER: Parent taps "Light Day" toggle on Home Dashboard
  │
  ▼
1. Confirmation
   "Switch to light day? This will simplify today's plan."
   [Confirm Light Day]
  │
  ▼
2. Plan Adapts
   - Remove or defer enrichment block
   - Shorten reading block (1 page vs standard)
   - Shorten math block (1–2 problems vs standard)
   - Add extra break block
   - Reduce EF support demands (all supports activate at max level)
   - Today's theme = "light"
  │
  ▼
3. Student sees simplified plan
   "Today is a lighter day. We'll do a little of everything."
   Fewer blocks. Shorter tasks. More breathing room.
  │
  ▼
4. Completion logged as "light_day"
   - Not penalized in completion rate
   - Noted in parent summary
   - Does not reset curriculum progress

END
```
