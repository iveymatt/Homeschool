# App Pages — Core Screens and Purpose
## Homeschool SaaS — MVP v1

---

## Page List

| # | Page | Primary User | Purpose |
|---|---|---|---|
| 1 | Home Dashboard | Student + Parent | Overview of the day, quick status |
| 2 | Today's Plan | Student + Guide | Step-by-step daily execution |
| 3 | Reading | Student | Reading lesson delivery with EF supports |
| 4 | Math | Student | Math lesson delivery with EF supports |
| 5 | Weekly Plan | Parent + Guide | Weekly rhythm, goals, themes |
| 6 | Progress | Parent + Student | Skill growth over time |
| 7 | Student Profile | Admin/Parent | Identity, academic, cognitive, interest data |
| 8 | Parent Summary | Parent | Daily + weekly plain-language reports |
| 9 | Executive Function | Parent + Guide | EF domain scores, support levels, trends |
| 10 | Settings | Admin/Parent | Personalization controls, schedule config |

---

## Page Descriptions

### 1. Home Dashboard

**Who uses it:** Student at start of day, Parent for quick check

**What it shows:**
- Today's date and a personalized greeting ("Good morning, McKenna!")
- Today's schedule: 3–5 blocks listed with status chips (not started / in progress / done)
- "Next Task" card — single prominent call to action
- Reading focus of the day (one sentence)
- Math focus of the day (one sentence)
- Mini progress bar: "Today: X of Y tasks done"
- Motivational check-in: emoji or phrase the student picks at start
- Parent quick view: yesterday's summary in 2 lines

**UX requirements:**
- Cards only. No tables.
- Max 5 visible items before scroll
- Calm colors, large clear text
- "Start Your Day" button prominently displayed

---

### 2. Today's Plan

**Who uses it:** Student + Guide during the learning day

**What it shows:**
- Chronological block list (e.g., Startup, Reading, Break, Math, Enrichment, Wrap-Up)
- Each block shows: title, estimated time, status chip
- Tapping a block opens it inline (expand/collapse)
- Inside each block: short instructions, step list, Done button
- EF supports render in-context (not as separate notices)
- Break reminders built into the timeline
- "Done for today" state when all blocks complete

**UX requirements:**
- One block focused at a time (others collapsed)
- No scrolling to find current task
- Clear visual separation between blocks
- Completion is satisfying (checkmark, color change, brief celebration)

---

### 3. Reading

**Who uses it:** Student during reading block

**What it shows:**
- Lesson title and objective (1 sentence)
- Estimated time
- Current reading level and target
- Step-by-step instructions (pre-broken into micro-steps)
- Vocabulary anchor card (visible throughout, collapsible)
- Audio read-along option (if audio_support_needed == true)
- Mid-task pause prompts
- Confidence check after completion
- "Done" confirmation screen

**UX requirements:**
- Max 2–3 sentences of instruction visible at once
- Clean reading typography (large, readable font)
- No sidebars or competing elements during active reading
- Vocabulary card is sticky but dismissible

---

### 4. Math

**Who uses it:** Student during math block

**What it shows:**
- Lesson title and concept
- Estimated time
- Problem count (e.g., "3 problems today")
- One problem visible at a time (others hidden)
- Reference strip (formula, worked example, or key steps)
- Input area for answer or work
- Feedback after each answer (gentle, never harsh)
- Progress indicator: "Problem 2 of 3"
- Completion screen with confidence check

**UX requirements:**
- One problem per screen. No scrolling past current problem.
- Reference strip stays visible
- Wrong answers get: "Let's look at this together" — not a red X
- Completion screen must feel like a win

---

### 5. Weekly Plan

**Who uses it:** Parent and Guide at start of week

**What it shows:**
- Days of the week with block summaries
- This week's reading focus (skill + text)
- This week's math focus (concept + problems)
- Enrichment theme
- Review day (usually Friday or end of week)
- Flex/catch-up day slot
- Last week's wins and areas to watch

**UX requirements:**
- Calendar-style or card-per-day layout
- Parent can tap any day to see/edit that day's plan
- Easy to add a light-day or catch-up day flag

---

### 6. Progress

**Who uses it:** Parent and Student (different views)

**Student view:**
- Visual progress tracker: "You've read X pages this month"
- Stars or badges for milestones (not grades)
- Simple streak counter

**Parent view:**
- Reading level trend chart
- Math skill growth table
- Completion rate over time
- EF independence trends by domain
- Consistency heatmap (which days had sessions)
- Confidence ratings over time

**UX requirements:**
- No letter grades
- Visual-first (charts, bars, streaks)
- Positive framing: "Here's what's grown" before "Here's what needs work"

---

### 7. Student Profile

**Who uses it:** Parent/Admin for setup and updates

**What it shows:**
- Identity section (name, age, grade)
- Academic snapshot (reading level, math level, goals)
- Cognitive and learning preferences
- Interest profile
- Routine profile
- Personalization memory (recent wins, struggle flags)

**UX requirements:**
- Form-style with clear sections
- Save on each section independently
- Collapsible advanced fields
- "Last updated" timestamp per section

---

### 8. Parent Summary

**Who uses it:** Parent (daily and weekly review)

**What it shows:**
- Date and student name
- What was planned vs. what was completed
- Reading focus today
- Math focus today
- EF summary in plain language
- Progress note ("Here's what we noticed today")
- Recommendation for tomorrow
- "Share this summary" button (copy or email)

**UX requirements:**
- Plain English only. No jargon.
- Short paragraphs (max 3 sentences each)
- Print-friendly layout
- Timestamps on all notes

---

### 9. Executive Function

**Who uses it:** Parent/Guide for understanding and adjusting supports

**What it shows:**
- EF domain grid: all 9 domains with current score and trend arrow
- Tapping a domain opens: current score, support level, last 5 sessions chart, what support is being used
- Overall EF independence score
- Recent EF events (e.g., "Task initiation improved on 3 of last 5 sessions")
- Parent controls: manually adjust support level, add a note

**UX requirements:**
- Color-coded scores (not red/green — use neutral tones)
- Trend arrows (up / stable / down)
- Plain language at every level — no clinical terminology
- One-tap parent override for any domain

---

### 10. Settings / Personalization

**Who uses it:** Admin/Parent

**What it shows:**
- Schedule configuration (start time, block lengths, break frequency)
- Interest profile editor
- EF support master override
- Lesson format preferences
- Light-day toggle (simplify today's plan)
- Notification preferences

**UX requirements:**
- Grouped into collapsible sections
- Changes apply to next session (not retroactively)
- "Reset to defaults" available but requires confirmation
