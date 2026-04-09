# Executive Function Support System
## Homeschool SaaS — McKenna Ray Platform

---

## 1. Executive Function Skill Areas

The platform tracks nine EF skill domains. Each domain has an independence score (0–4) and a trend direction.

| Domain | Key Question | Observable Signals |
|---|---|---|
| **task_initiation** | Can McKenna start a task without repeated prompting? | Delay before starting, requires multiple cues, avoids opening materials |
| **planning_organization** | Can she sequence steps and know what comes first? | Skips steps, starts in the middle, loses materials |
| **working_memory** | Can she hold task instructions while completing the task? | Forgets directions mid-task, loses place in reading, re-asks same question |
| **transitions** | Can she shift between subjects or activities smoothly? | Meltdowns at block changes, refuses to stop one activity, needs long wind-down |
| **sustained_focus** | Can she stay on a single task for the target duration? | Off-task behavior, task abandonment, attention drops mid-lesson |
| **task_completion** | Can she finish a task and close the loop? | Leaves work 80% done, moves on before finishing, skips reflection |
| **emotional_regulation** | Can she manage frustration when something is hard? | Crying, shutting down, aggression, refusing to continue |
| **time_awareness** | Does she have a sense of how long tasks take? | Shocked when time is up, underestimates effort, no urgency |
| **impulse_control** | Can she pause before reacting or changing direction? | Jumps to answers, changes activities without finishing, blurts |

---

## 2. Identifying Executive Function Support Needs

### 2.1 Sources of Signal

The system reads EF support needs from three sources:

**A. Student Profile Flags (static intake)**
```
frustration_triggers          → maps to emotional_regulation, task_initiation
transition_support_needed     → maps to transitions
attention_span_minutes < 15   → maps to sustained_focus
preferred_lesson_length       → maps to planning_organization, time_awareness
visual_support_needed         → maps to working_memory, planning_organization
```

**B. Session Behavior (dynamic, per-session)**
```
time_to_start > 5 minutes              → task_initiation flag
task_abandoned = true                  → task_completion flag, sustained_focus flag
frustration_rating >= 3                → emotional_regulation flag
steps_skipped > 0                      → planning_organization flag
re-read same instruction > 1x          → working_memory flag
completion_rate < 0.6                  → task_completion flag
transition_delay > 3 minutes           → transitions flag
```

**C. Trend Patterns (rolling 10-session window)**
```
If task_initiation_delay > 5min on 3+ of last 5 sessions → set task_initiation support_level += 1
If completion_rate < 0.7 on 4+ of last 7 sessions       → set task_completion support_level += 1
If frustration_rating avg > 2.5 last 5 sessions         → set emotional_regulation support_level += 1
```

### 2.2 EF Identification Decision Rules

```
RULE: Assess EF domain strength
IF (domain_score == 0 OR domain_score == 1):
    → assign "high support" tier
IF (domain_score == 2):
    → assign "moderate support" tier
IF (domain_score == 3):
    → assign "light support" tier
IF (domain_score == 4):
    → assign "monitor only" tier

RULE: New topic or first lesson of the week
    → reset all domain support to at least "light support" tier
    → do not assume carry-over of independence

RULE: Parent/guide override
    → always accept manual support_level override from parent
    → log override reason for personalization memory
```

---

## 3. Support Menu by Domain

### 3.1 Task Initiation Supports

| Support Level | Support Type | Implementation |
|---|---|---|
| High (0) | Micro-task launch | "The only thing you need to do right now is open your book to page 12." |
| High (0) | Body check-in first | 3-breath prompt before any task begins |
| Moderate (1) | First step only visible | Show only Step 1. Hide remaining steps behind a "Next" button. |
| Moderate (1) | Countdown timer | 5-minute visual timer on screen before task should begin |
| Light (2) | Motivational anchor | Display student's chosen motivational phrase at task start |
| Light (2) | Interest hook | Lead with a sentence connecting the task to a favorite topic |
| Monitor (3–4) | Autonomy prompt | "Ready when you are. Start on your own." |

### 3.2 Planning & Organization Supports

| Support Level | Support Type | Implementation |
|---|---|---|
| High (0) | Full step list | All steps pre-listed, numbered, visible before start |
| High (0) | Materials checklist | Show exactly what to gather before beginning |
| Moderate (1) | Collapsed steps | Show 3 steps at a time. Reveal next 3 on completion. |
| Moderate (1) | Time estimate anchor | "This will take about 10 minutes. That's two songs." |
| Light (2) | "Here's your plan" preview | One-sentence overview of the block before starting |
| Monitor (3–4) | Minimal structure | Task name + objective only |

### 3.3 Working Memory Supports

| Support Level | Support Type | Implementation |
|---|---|---|
| High (0) | Persistent instruction card | Key directions stay visible on screen throughout the task |
| High (0) | Vocabulary anchor | New words displayed with image throughout lesson |
| High (0) | Dual input | Instructions read aloud AND shown in text |
| Moderate (1) | Mid-task check-in | After each section: "What did you just learn? Say it out loud." |
| Moderate (1) | Reference strip | Key formula, word list, or reminder visible at bottom of screen |
| Light (2) | Recall prompt | End-of-lesson: "What was the one big idea from today?" |
| Monitor (3–4) | No scaffold | Task proceeds without memory aids |

### 3.4 Transition Supports

| Support Level | Support Type | Implementation |
|---|---|---|
| High (0) | 5-min + 2-min warning | Two warnings before every block transition |
| High (0) | Named transition phrase | "Reading is done. Your brain did good work. Now we shift to math." |
| High (0) | Physical movement between blocks | Mandatory body break built into schedule |
| Moderate (1) | Completion celebration before shift | Brief "You finished!" screen before next block loads |
| Moderate (1) | 2-min warning only | Single warning at 2 minutes |
| Light (2) | Transition label | Block title cards mark the shift: "Now: Math" |
| Monitor (3–4) | No transition support | Student moves through blocks independently |

### 3.5 Sustained Focus Supports

| Support Level | Support Type | Implementation |
|---|---|---|
| High (0) | 10-min max blocks | No single uninterrupted task longer than 10 minutes |
| High (0) | Single-task view | Only one task visible at a time. All others hidden. |
| High (0) | Interest hooks | Every block starts with a sentence tied to a favorite topic |
| High (0) | Fidget/anchor permission | "You can use your fidget toy or listen to music during this task." |
| Moderate (1) | 15-min blocks with mid-check | Built-in pause halfway through each block |
| Moderate (1) | Progress micro-bar | Visual progress bar shows how much of block is complete |
| Light (2) | Milestone callouts | Mid-task: "Halfway there!" message |
| Monitor (3–4) | Standard lesson length | 20–25 min blocks, student self-regulates |

### 3.6 Task Completion Supports

| Support Level | Support Type | Implementation |
|---|---|---|
| High (0) | Explicit "Done" confirmation | System says: "You read the whole thing. That's done." |
| High (0) | Completion checklist | Checkbox per step. Final checkbox = "I'm done with this." |
| High (0) | No optional extensions | Remove "bonus" content. One clear stopping point. |
| Moderate (1) | Completion prompt | "Is there anything left to finish, or are you done?" |
| Moderate (1) | Done button required | Student must tap "Mark Complete" to move on |
| Light (2) | Reflection question | One-word or emoji check after task: "How'd that go?" |
| Monitor (3–4) | Autonomous completion | Student closes loop independently |

---

## 4. Embedding EF Supports into Reading and Math Lessons

### 4.1 Reading Lesson EF Embed Map

```
READING LESSON STRUCTURE:

[Before]
  → task_initiation:   "Today we're reading [X]. It's only [N] pages. First step: open to page [#]."
  → planning:          Show page count and reading goal before starting
  → working_memory:    Display 2–3 vocabulary words with definitions before reading

[During — After Each Page or Chunk]
  → working_memory:    Anchor words remain visible in sidebar
  → sustained_focus:   After every 1–2 pages: "Quick pause. Take a breath."
  → impulse_control:   "Don't peek ahead yet. Finish this page first."

[After]
  → task_completion:   "You finished [X] pages. That's the whole assignment. Mark it done."
  → working_memory:    "Say one thing you remember from what you just read."
  → emotional_reg:     Confidence check: "How did that feel? Hard / OK / Easy"
  → transition:        "Reading is done. Great work. Take 2 minutes before math."
```

### 4.2 Math Lesson EF Embed Map

```
MATH LESSON STRUCTURE:

[Before]
  → planning:          "Today you'll solve 3 problems. Here they are: [1, 2, 3]. Let's do them one at a time."
  → task_initiation:   "First problem only. Don't look at the others yet."
  → working_memory:    Formula or reference strip displayed before starting

[During — Per Problem]
  → working_memory:    Formula strip stays on screen throughout
  → transitions:       Between problem types: "That was addition. Now we're doing subtraction. Different operation."
  → sustained_focus:   After 2 problems: "You've done 2 out of 3. One more."
  → emotional_reg:     If answer is wrong: "That's okay. Let's look at it together." (not "wrong, try again")

[After]
  → task_completion:   "You did all 3 problems. That's the whole math block for today."
  → planning:          "Tomorrow we'll do [next concept]. Today is done."
  → transition:        Celebration screen + clear "Go to next block" button
```

### 4.3 EF Support Injection Rules for Lessons

```
FUNCTION injectEFSupports(lesson, studentEFProfile):

    supports = []

    // Task Initiation
    IF studentEFProfile.task_initiation.score <= 2:
        supports.push({
            phase: "before",
            type: "task_initiation",
            prompt: generateFirstStepPrompt(lesson)
        })

    // Working Memory
    IF studentEFProfile.working_memory.score <= 2:
        supports.push({
            phase: "during",
            type: "working_memory",
            prompt: generateAnchorCard(lesson.key_vocabulary)
        })
        supports.push({
            phase: "during",
            type: "working_memory",
            prompt: "Instructions remain visible throughout this task."
        })

    // Focus
    IF studentEFProfile.sustained_focus.score <= 2:
        lesson.max_duration = min(lesson.estimated_time, 15)
        supports.push({
            phase: "during",
            type: "sustained_focus",
            prompt: generateMidTaskBreak(lesson)
        })

    // Transitions
    IF studentEFProfile.transitions.score <= 2:
        supports.push({
            phase: "after",
            type: "transitions",
            prompt: generateTransitionPhrase(lesson.subject, nextLesson.subject)
        })

    // Task Completion
    IF studentEFProfile.task_completion.score <= 2:
        supports.push({
            phase: "after",
            type: "task_completion",
            prompt: generateCompletionConfirmation(lesson)
        })

    lesson.ef_supports = supports
    RETURN lesson
```

---

## 5. Tracking Growth in Independence Over Time

### 5.1 Independence Score Model

Each EF domain has an independence score on a 0–4 scale:

```
0 = Full Scaffold    — Student cannot engage without significant adult or system support
1 = Guided           — Student can engage with structured prompts and visual aids
2 = Prompted         — Student engages with light reminders or cues
3 = Minimal          — Student mostly self-regulates with occasional system nudge
4 = Independent      — Student initiates, sustains, transitions, and completes without prompting
```

### 5.2 Independence Tracking Per Session

```
SESSION EF LOG (per domain, per session):

{
    session_date: "2025-09-15",
    domain: "task_initiation",
    support_level_offered: 1,
    support_level_used: 1,
    initiated_independently: false,
    time_to_start_minutes: 4,
    prompts_required: 2,
    session_score: 1
}
```

### 5.3 Rolling Independence Trend

```
FUNCTION calculateIndependenceTrend(domain, sessions_last_10):

    scores = [session.session_score for session in sessions_last_10]
    avg_score = mean(scores)
    trend = "stable"

    IF scores[-1] > scores[-5]:
        trend = "improving"
    ELSE IF scores[-1] < scores[-5]:
        trend = "declining"
    ELSE:
        trend = "stable"

    RETURN {
        domain: domain,
        current_score: scores[-1],
        rolling_avg: avg_score,
        trend: trend,
        sessions_analyzed: len(scores)
    }
```

---

## 6. Support Escalation, Maintenance, and Fading Logic

### 6.1 Decision Rules

```
RULE: FADE support (reduce by 1 level)
    Condition:
        independence_score >= 3
        AND trend == "improving"
        AND sessions_at_current_level >= 5
        AND no frustration_trigger in last 3 sessions
    Action:
        support_level -= 1
        Log: "Fading [domain] support. Student showing consistent independence."

RULE: MAINTAIN support (no change)
    Condition:
        independence_score == 2
        AND trend == "stable"
        OR recent_frustration_trigger == true
        OR new_topic_introduced == true
    Action:
        support_level unchanged
        Log: "Maintaining [domain] support. Stability before fading."

RULE: INCREASE support (increase by 1 level)
    Condition:
        independence_score <= 1
        OR trend == "declining"
        OR frustration_count > 2 in current session
        OR task_abandoned == true
    Action:
        support_level += 1
        Log: "Increasing [domain] support. Student showing signs of struggle."

RULE: RESET support on context change
    Condition:
        new_curriculum_unit == true
        OR long_break_since_last_session (> 5 days)
        OR parent_flag == "rough day"
    Action:
        For all domains where score < 4:
            support_level = max(support_level, 1)
        Log: "Support reset for context change."

RULE: Parent override
    Condition: parent manually adjusts support_level
    Action: accept immediately, log override, use as input for next recommendation
```

### 6.2 Adaptive Logic Pseudocode

```
FUNCTION updateEFSupportPlan(student, todaySession):

    ef_profile = student.ef_profile

    FOR domain IN ef_profile.domains:

        trend = calculateIndependenceTrend(domain, last_10_sessions)
        current_level = ef_profile[domain].support_level

        // Check escalation conditions
        IF (trend.trend == "declining" OR
            todaySession.frustration_count[domain] > 2 OR
            todaySession.task_abandoned == true):
            ef_profile[domain].support_level = min(current_level + 1, 3)
            ef_profile[domain].support_change_reason = "struggling"

        // Check fade conditions
        ELSE IF (trend.current_score >= 3 AND
                 trend.trend == "improving" AND
                 ef_profile[domain].sessions_at_level >= 5):
            ef_profile[domain].support_level = max(current_level - 1, 0)
            ef_profile[domain].support_change_reason = "fading — showing independence"

        // Maintain
        ELSE:
            ef_profile[domain].support_level = current_level
            ef_profile[domain].support_change_reason = "stable"

    RETURN ef_profile
```

---

## 7. Parent Summary: Plain Language EF Explanations

### 7.1 EF Summary Generation Rules

```
FUNCTION generateEFParentSummary(session, ef_profile):

    summary = {}

    FOR domain IN session.ef_domains_activated:

        support_used = session.ef_log[domain].support_level_used
        score = session.ef_log[domain].session_score
        trend = ef_profile[domain].trend

        summary[domain] = {
            plain_label: EF_PLAIN_LABELS[domain],
            what_happened: generateWhatHappened(domain, support_used, score),
            what_it_means: EF_PARENT_EXPLANATIONS[domain],
            trend_note: generateTrendNote(trend),
            next_step: generateNextStepNote(domain, score)
        }

    RETURN summary
```

### 7.2 Plain Language Label Map

```
EF_PLAIN_LABELS = {
    task_initiation:       "Getting started",
    planning_organization: "Knowing what to do and in what order",
    working_memory:        "Holding instructions in mind while working",
    transitions:           "Moving from one activity to another",
    sustained_focus:       "Staying focused during a task",
    task_completion:       "Finishing what she started",
    emotional_regulation:  "Managing frustration when something is hard",
    time_awareness:        "Understanding how long things take",
    impulse_control:       "Pausing before reacting"
}
```

### 7.3 Sample Parent Summary Phrases

```
task_initiation:
    score 0–1: "McKenna needed several reminders before she could start her reading today.
                We used a 'first step only' prompt — we only asked her to open the page,
                nothing else. She got going within 3 minutes. This is normal and something
                we'll keep supporting."
    score 2–3: "McKenna got started on her own after one reminder today. That's progress."
    score 4:   "McKenna opened her lesson and started reading without any prompting. That's
                a real sign of growth in her ability to self-start."

working_memory:
    score 0–1: "McKenna kept losing track of the reading instructions today, so we kept the
                key vocabulary words visible on the screen throughout the whole lesson. This
                is a working memory support — it reduces the mental load so she can focus on
                reading, not on remembering what words mean."
    score 2–3: "McKenna referred to the vocabulary card twice today and was able to stay on
                track. We'll keep that support available but are watching for signs she may
                need it less."
    score 4:   "McKenna completed today's reading without referencing the vocabulary card.
                She's building stronger working memory stamina."

transitions:
    score 0–1: "Switching from reading to math was hard today. We gave two warnings before
                the transition and used a short movement break in between. This kind of
                structure helps McKenna's brain shift gears — it's not stubbornness, it's
                how her nervous system works."
    score 2–3: "McKenna moved from reading to math with just one reminder today. Transitions
                are getting smoother."
    score 4:   "McKenna transitioned between subjects independently today without any
                reminders. Big progress."

task_completion:
    score 0–1: "McKenna had a hard time finishing tasks today — she tended to move on before
                fully completing them. We used explicit 'You're done' confirmation messages
                and a required Done button. This helps her brain register closure."
    score 2–3: "McKenna finished both her reading and math tasks today with one completion
                prompt. She's learning to close the loop."
    score 4:   "McKenna completed all tasks fully and independently today. No prompting needed
                to finish."
```

---

## 8. JSON Schema: EF Profile

```json
{
  "ef_profile": {
    "student_id": "mckenna-ray-001",
    "last_updated": "2025-09-15",
    "domains": {
      "task_initiation": {
        "score": 1,
        "support_level": 2,
        "trend": "improving",
        "sessions_at_level": 3,
        "last_updated": "2025-09-15",
        "notes": "Responds well to first-step-only prompts"
      },
      "planning_organization": {
        "score": 2,
        "support_level": 1,
        "trend": "stable",
        "sessions_at_level": 5,
        "last_updated": "2025-09-12",
        "notes": "Benefits from visible step lists"
      },
      "working_memory": {
        "score": 1,
        "support_level": 2,
        "trend": "stable",
        "sessions_at_level": 4,
        "last_updated": "2025-09-14",
        "notes": "Vocabulary anchors on screen are essential"
      },
      "transitions": {
        "score": 1,
        "support_level": 2,
        "trend": "improving",
        "sessions_at_level": 3,
        "last_updated": "2025-09-15",
        "notes": "2-min warnings + movement break work well"
      },
      "sustained_focus": {
        "score": 2,
        "support_level": 1,
        "trend": "stable",
        "sessions_at_level": 6,
        "last_updated": "2025-09-13",
        "notes": "Max 15-min blocks needed"
      },
      "task_completion": {
        "score": 1,
        "support_level": 2,
        "trend": "improving",
        "sessions_at_level": 3,
        "last_updated": "2025-09-15",
        "notes": "Explicit Done confirmation messages help"
      },
      "emotional_regulation": {
        "score": 2,
        "support_level": 1,
        "trend": "stable",
        "sessions_at_level": 7,
        "last_updated": "2025-09-11",
        "notes": "Gentle error framing reduces shutdown risk"
      },
      "time_awareness": {
        "score": 1,
        "support_level": 2,
        "trend": "stable",
        "sessions_at_level": 4,
        "last_updated": "2025-09-12",
        "notes": "Time analogies (songs, minutes) are helpful"
      },
      "impulse_control": {
        "score": 2,
        "support_level": 1,
        "trend": "stable",
        "sessions_at_level": 5,
        "last_updated": "2025-09-10",
        "notes": "One-task-at-a-time view helps"
      }
    }
  }
}
```

---

## 9. JSON Schema: EF Session Log

```json
{
  "ef_session_log": {
    "session_id": "session-2025-09-15-001",
    "student_id": "mckenna-ray-001",
    "date": "2025-09-15",
    "subject": "reading",
    "domain_logs": [
      {
        "domain": "task_initiation",
        "support_offered": "first_step_only_prompt",
        "support_level_used": 2,
        "initiated_independently": false,
        "time_to_start_minutes": 3,
        "prompts_required": 1,
        "session_score": 2,
        "notes": "Got started after one cue"
      },
      {
        "domain": "working_memory",
        "support_offered": "vocabulary_anchor_card",
        "support_level_used": 2,
        "referenced_anchor": true,
        "times_referenced": 3,
        "session_score": 1,
        "notes": "Relied heavily on anchor — needed repeatedly"
      },
      {
        "domain": "task_completion",
        "support_offered": "done_confirmation_screen",
        "support_level_used": 2,
        "completed_task": true,
        "required_completion_prompt": true,
        "session_score": 2,
        "notes": "Finished after Done confirmation message"
      },
      {
        "domain": "transitions",
        "support_offered": "two_minute_warning_plus_movement_break",
        "support_level_used": 2,
        "transition_time_minutes": 3,
        "meltdown_occurred": false,
        "session_score": 2,
        "notes": "Transition smooth with warning"
      }
    ],
    "overall_ef_session_score": 1.75,
    "frustration_events": 0,
    "task_abandoned": false
  }
}
```

---

## 10. JSON Schema: EF Support Object (embedded in lesson)

```json
{
  "ef_support_object": {
    "lesson_id": "lesson-reading-2025-09-15",
    "student_id": "mckenna-ray-001",
    "subject": "reading",
    "ef_supports": [
      {
        "phase": "before",
        "domain": "task_initiation",
        "support_type": "first_step_only",
        "display_text": "Today you're reading two pages from your book. First step: open to page 14.",
        "support_level": 2
      },
      {
        "phase": "before",
        "domain": "planning_organization",
        "support_type": "task_preview",
        "display_text": "Here's your plan: 1) Read pages 14–15. 2) Say one thing you remember. 3) Mark it done.",
        "support_level": 1
      },
      {
        "phase": "during",
        "domain": "working_memory",
        "support_type": "vocabulary_anchor_card",
        "vocabulary": [
          { "word": "migrate", "meaning": "to move from one place to another" },
          { "word": "habitat", "meaning": "where an animal lives" }
        ],
        "display_text": "These words will stay on your screen while you read.",
        "support_level": 2
      },
      {
        "phase": "during",
        "domain": "sustained_focus",
        "support_type": "mid_task_pause",
        "trigger": "after_page_1",
        "display_text": "Nice work. Take one slow breath. Then read page 15.",
        "support_level": 1
      },
      {
        "phase": "after",
        "domain": "task_completion",
        "support_type": "done_confirmation",
        "display_text": "You read both pages. That is the whole assignment. Tap 'Done' to finish.",
        "support_level": 2
      },
      {
        "phase": "after",
        "domain": "transitions",
        "support_type": "named_transition",
        "display_text": "Reading is done. Great work. Take 3 minutes before we start math.",
        "support_level": 2
      }
    ]
  }
}
```
