# Build Order — Vibe Coding in Gemini AI Studio
## Homeschool SaaS — MVP v1

---

## Philosophy

Build the tightest daily loop first. Every phase should result in something usable — not just scaffolding. Each phase ends with a real working feature a parent and student can use.

**Loop to close first:** Student wakes up → sees today's plan → does a reading lesson with EF supports → does a math lesson with EF supports → parent sees what happened.

Close that loop before building anything else.

---

## Phase 1 — Foundation (Days 1–3)
*Goal: Student profile + basic daily plan display*

### 1.1 Student Profile Schema
- Define and implement `student_profiles` schema (see `data-schema.md`)
- Build the parent-facing setup form (5-step intake flow)
- Store profile in local state (no auth required yet)
- Output: parent can fill out McKenna's profile and save it

### 1.2 Static Home Dashboard
- Build the Home Dashboard layout (see `wireframes.md`)
- Hardcode a sample daily plan to prove the layout
- Include: greeting, today's plan block list, next task CTA, reading/math focus
- No data wiring yet — just the shell
- Output: Home Dashboard renders correctly

### 1.3 Today's Plan Screen (static)
- Build the block list layout
- Show expand/collapse per block
- Add status chips (not started / active / done)
- Add Done button per block (no backend action yet)
- Output: full Today's Plan layout renders and blocks can be marked done

---

## Phase 2 — Core Lesson Loop (Days 4–7)
*Goal: Reading and math lessons can be delivered end-to-end*

### 2.1 Lesson Object Schema
- Implement `lessons` schema
- Create 2 sample reading lessons and 2 sample math lessons manually
- Wire lessons into daily plan blocks
- Output: today's plan blocks link to real lesson objects

### 2.2 Reading Lesson Delivery
- Build the Reading lesson screen (see `wireframes.md`)
- Display: title, objective, step-by-step instructions (one step at a time)
- Add vocabulary anchor card (sticky, dismissible)
- Add confidence check after completion
- Add Done confirmation screen
- Output: full reading lesson can be run start to finish

### 2.3 Math Lesson Delivery
- Build the Math lesson screen
- Display: concept, problem count, one problem at a time
- Add reference strip (collapsible)
- Add per-answer gentle feedback
- Add problem progression (1 of 3, 2 of 3, 3 of 3)
- Add Done confirmation screen
- Output: full math lesson can be run start to finish

### 2.4 Completion Tracking
- Wire Done buttons to update block completion status
- Calculate and display daily completion rate
- Show completion state on Home Dashboard
- Output: completing blocks updates the dashboard in real time

---

## Phase 3 — EF Support System (Days 8–12)
*Goal: EF supports are embedded in lessons and tracked per session*

### 3.1 EF Profile Schema
- Implement EF domain tracking within student profile
- Set default support levels for McKenna based on intake answers
- Output: EF profile is stored and readable

### 3.2 EF Support Injection
- Implement `injectEFSupports()` function (see `executive-function-system.md`)
- Apply to reading and math lessons at lesson load time
- Before/during/after phases render correctly in lesson UI
- Output: EF supports display at the right moment in every lesson

### 3.3 EF Session Logging
- Implement `ef_support_logs` schema
- Log: support used, prompts needed, session score per domain
- Log fires on lesson completion
- Output: every completed lesson writes an EF session log

### 3.4 EF Screen (Parent View)
- Build the Executive Function screen (domain grid)
- Show: all 9 domains, score, trend arrow, current support level
- Build domain detail view (tap to expand)
- Add parent +/- controls for manual override
- Output: parent can view and adjust EF supports

### 3.5 EF Adaptive Logic
- Implement `updateEFSupportPlan()` (see `executive-function-system.md`)
- Run after each session: calculate trends, decide fade/maintain/increase
- Apply results to next lesson's support level
- Output: EF support levels adapt automatically after each session

---

## Phase 4 — Parent Summary & Progress (Days 13–16)
*Goal: Parent has clear visibility into what happened and what's growing*

### 4.1 Daily Parent Summary
- Implement `parent_summaries` schema
- Generate summary after day's plan is complete
- Include: plan summary, subject summaries, EF notes in plain language
- Output: parent summary generates and displays after daily completion

### 4.2 Progress Tracking
- Implement `progress_records` schema
- Track: reading sessions, math sessions, completion rates, confidence trends
- Build basic Progress screen (parent view first)
- Show: reading level trend, math skill progress, EF independence trends
- Output: progress screen shows meaningful data after 5+ sessions

### 4.3 Student Progress View
- Build student-facing version of Progress
- Show: pages read, streak, simple badges (not grades)
- Output: student can see their own growth in a positive, visual way

---

## Phase 5 — Personalization Engine (Days 17–21)
*Goal: The system adapts its recommendations based on session history*

### 5.1 Personalization Memory
- Track: `lessons_that_worked`, `engagement_patterns`, `current_struggle_flags`
- Update after each session
- Output: personalization memory is stored and growing

### 5.2 Curriculum Adaptation Rules
- Implement: if confidence low → reduce difficulty + increase support
- Implement: if completion rate high → allow advancement
- Implement: if format works → prioritize it in next lesson
- Implement: if frustration high → trigger light-day recommendation
- Output: lesson recommendations shift based on recent data

### 5.3 Weekly Plan Generation
- Build weekly plan view
- Auto-generate next week from: curriculum progress + EF trends + personalization memory
- Parent can accept or customize
- Output: weekly plan screen is functional

### 5.4 Light Day Mode
- Implement light-day toggle on Home Dashboard
- Rebuild daily plan with simplified blocks on trigger
- Output: one-tap switch to light day works end-to-end

---

## Phase 6 — Polish & Stability (Days 22–25)
*Goal: MVP is clean, stable, and trustworthy enough to use daily*

### 6.1 UX Polish
- Review all screens against `wireframes.md` design notes
- Ensure typography, spacing, color, and tone are consistent
- Add loading states, empty states, error states
- Remove any cluttered or confusing UI

### 6.2 Data Persistence
- Ensure student profile, session logs, and progress records persist across page loads
- Add local storage or simple backend (Firebase / Supabase recommended)
- Output: data survives refresh and next-day session

### 6.3 Sample Data for Demo
- Load McKenna's full profile (see `json/student-profile-mckenna.json`)
- Load sample week of lessons
- Load sample parent summaries
- Output: platform can be demonstrated without going through full setup

### 6.4 Mobile Responsiveness
- Test all screens at mobile viewport (375px wide minimum)
- Fix any layout breaks
- Ensure all tap targets are 44x44px minimum

---

## Recommended Stack for Gemini AI Studio Vibe Coding

| Layer | Recommendation | Why |
|---|---|---|
| Frontend | React (Next.js) or plain HTML/JS | Fast to prototype, easy to iterate |
| Styling | Tailwind CSS | Rapid layout, easy responsive design |
| State | Zustand or React Context | Simple, no boilerplate |
| Database | Supabase (Postgres) or Firebase (Firestore) | Free tier, fast setup, real-time capable |
| Auth | Supabase Auth or skip for MVP | Skip auth for first demo |
| AI/Generation | Gemini API or Claude API | Generate lesson content, EF summaries |
| Hosting | Vercel | One-command deploy |

---

## Prompt Approach for Gemini AI Studio

When generating features with AI assistance:

1. **Feed the schema first** — paste the relevant JSON schema into context before asking for implementation
2. **One screen at a time** — ask for one complete screen, not the whole app
3. **Specify the UX rules** — reference `wireframes.md` design notes in your prompt
4. **Test the loop** — after each phase, manually run the core loop (start lesson → complete lesson → see summary) before moving on
5. **Commit often** — small commits per feature so you can revert cleanly

---

## Phase Summary

| Phase | Focus | Output |
|---|---|---|
| 1 | Foundation | Profile + dashboard shell |
| 2 | Core loop | Reading + math lessons end-to-end |
| 3 | EF system | Supports injected + tracked |
| 4 | Parent visibility | Summaries + progress |
| 5 | Personalization | Adaptive recommendations |
| 6 | Polish | Clean, stable, demo-ready |
