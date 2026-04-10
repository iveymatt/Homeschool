# Curriculum Engine Logic
## Homeschool SaaS — McKenna Ray Platform

---

## Overview

The curriculum engine does three things:
1. **Identifies** what McKenna needs based on her profile and recent sessions
2. **Selects** appropriate skill targets and lesson formats
3. **Adapts** tomorrow's plan based on what happened today

The engine drives reading first, math second. Everything else supports those two.

---

## Part 1: Reading Curriculum Logic

### 1.1 Reading Struggle Identification

Before selecting a reading lesson, the engine classifies the *type* of reading challenge. Different types need different supports.

```
FUNCTION identifyReadingStruggleType(student, recentSessions):

    signals = []

    // Decoding
    IF student.reads_slowly AND makes_substitution_errors:
        signals.push("decoding")

    // Fluency
    IF student.reads_word_by_word AND lacks_expression:
        signals.push("fluency")

    // Working Memory
    IF student.loses_place_frequently OR re-reads_same_line OR forgets_earlier_content:
        signals.push("working_memory")

    // Comprehension
    IF student.can_read_aloud_but_cannot_summarize:
        signals.push("comprehension")

    // Avoidance / Frustration
    IF student.task_initiation_score <= 1 AND subject == "reading":
        signals.push("avoidance_frustration")

    // Attention
    IF student.attention_span_minutes <= 10 AND reading_abandon_rate > 0.3:
        signals.push("attention")

    RETURN signals  // may be multiple
```

**McKenna's reading struggle types (from profile):**
- `fluency` — reads at below-grade pace, expression is flat
- `working_memory` — loses track of vocabulary mid-passage
- `avoidance_frustration` — delay before starting reading tasks

### 1.2 Reading Skill Progression (Ordered)

The engine moves McKenna forward through this sequence. She does not skip levels. She may circle back if accuracy drops.

```
READING_SKILL_LADDER = [
    { level: 1, skill: "phonics_decoding",      target_grade: "3rd" },
    { level: 2, skill: "sight_word_fluency",    target_grade: "4th" },
    { level: 3, skill: "oral_reading_fluency",  target_grade: "5th" },
    { level: 4, skill: "fluency_with_expression", target_grade: "6th" },   ← McKenna is here
    { level: 5, skill: "vocabulary_in_context", target_grade: "6th-7th" },
    { level: 6, skill: "main_idea_comprehension", target_grade: "7th" },
    { level: 7, skill: "inferencing",           target_grade: "7th" },
    { level: 8, skill: "text_structure_analysis", target_grade: "8th" },
    { level: 9, skill: "author_purpose_craft",  target_grade: "8th" }
]
```

### 1.3 Reading Lesson Generation Rules

```
FUNCTION generateReadingLesson(student):

    struggle_types = identifyReadingStruggleType(student, last_5_sessions)
    current_level = student.academic_snapshot.reading_current_ladder_level
    confidence = student.cognitive_profile.confidence_reading
    attention = student.cognitive_profile.attention_span_minutes
    interests = student.interest_profile.favorite_topics

    // Step 1: Set text length
    IF attention <= 10:
        text_length = "1 page or 150–200 words"
    ELSE IF attention <= 15:
        text_length = "2 pages or 300–400 words"
    ELSE:
        text_length = "3–4 pages or 500–600 words"

    // Step 2: Set difficulty
    IF confidence <= 2:
        text_level = current_ladder_level - 1  // start easier, build confidence
    ELSE:
        text_level = current_ladder_level

    // Step 3: Select text topic
    // Always prefer interest-matched content
    topic = selectTopicFromInterests(interests)  // returns e.g. "wolves", "animal rescue"

    // Step 4: Assign skill target based on struggle type
    IF "fluency" IN struggle_types:
        skill_target = "oral_reading_fluency"
        activity = "read_aloud_with_expression"
        support = "model_first_then_echo_read"

    ELSE IF "working_memory" IN struggle_types:
        skill_target = "vocabulary_in_context"
        activity = "read_with_anchor_vocabulary_visible"
        support = "vocabulary_card + mid-passage recall check"

    ELSE IF "avoidance_frustration" IN struggle_types:
        skill_target = "fluency_with_confidence"
        activity = "choice_reading_from_preferred_list"
        support = "student_selects_topic + first_step_only_prompt"

    ELSE IF "comprehension" IN struggle_types:
        skill_target = "main_idea_identification"
        activity = "read_then_retell"
        support = "sentence_frames_for_summary"

    // Step 5: Add interest hook
    lesson.opening_hook = "Today we're reading about [topic]. You picked this one."

    // Step 6: Set lesson structure
    lesson = {
        subject: "reading",
        skill_target: skill_target,
        text_level: text_level,
        text_topic: topic,
        text_length: text_length,
        activity_type: activity,
        support_level: mapConfidenceToSupport(confidence),
        ef_supports: injectEFSupports(lesson, student.ef_profile),
        estimated_time: attention + 5  // skill time + setup
    }

    RETURN lesson
```

### 1.4 Reading Assessment (Light Touch)

The engine does not give formal reading tests. It infers mastery from session data.

```
READING_MASTERY_SIGNALS = {
    fluency: {
        advance_if: "reads_at_target_pace AND expression_present for 3+ sessions",
        review_if:  "error_rate > 1_per_sentence OR pace_significantly_below_target"
    },
    vocabulary: {
        advance_if: "uses_target_word_correctly in recall prompt 2+ times",
        review_if:  "cannot_recall_word_meaning after 3 sessions with anchor support"
    },
    comprehension: {
        advance_if: "accurately_summarizes_main_idea without prompting",
        review_if:  "cannot_identify_main_idea even_with_sentence_frames"
    }
}
```

---

## Part 2: Math Curriculum Logic

### 2.1 Math Difficulty Identification

```
FUNCTION identifyMathDifficultyType(student, recentSessions):

    signals = []

    // Fact fluency
    IF student.makes_calculation_errors_on_basic_facts:
        signals.push("fact_fluency")

    // Concept gaps
    IF student.cannot_explain_what_operation_to_use:
        signals.push("concept_gap")

    // Sequencing / multi-step
    IF student.skips_steps OR loses_track_of_where_they_are_in_problem:
        signals.push("multi_step_sequencing")

    // Working memory
    IF student.forgets_earlier_steps_mid_problem:
        signals.push("working_memory")

    // Abstract presentation
    IF student.performs_better_with_visual_than_abstract:
        signals.push("abstract_presentation")

    // Confidence
    IF student.confidence_math <= 2 AND avoids_starting:
        signals.push("confidence")

    // Overwhelm
    IF student.completion_rate_math < 0.5:
        signals.push("overwhelm")

    RETURN signals
```

**McKenna's math difficulty types (from profile):**
- `abstract_presentation` — needs visual or concrete models
- `multi_step_sequencing` — benefits from step-by-step scaffolding
- `confidence` — avoidance before starting math blocks

### 2.2 Math Skill Ladder (Ordered)

```
MATH_SKILL_LADDER = [
    { level: 1,  skill: "number_sense_whole_numbers",    target_grade: "3rd-4th" },
    { level: 2,  skill: "addition_subtraction_regrouping", target_grade: "4th" },
    { level: 3,  skill: "multiplication_division_fluency", target_grade: "4th-5th" },
    { level: 4,  skill: "fractions_intro",               target_grade: "4th-5th" },
    { level: 5,  skill: "fractions_operations",          target_grade: "5th" },
    { level: 6,  skill: "decimals_and_percentages",      target_grade: "6th" },    ← McKenna approaches here
    { level: 7,  skill: "ratios_and_proportions",        target_grade: "6th" },
    { level: 8,  skill: "intro_to_variables_expressions", target_grade: "6th-7th" },
    { level: 9,  skill: "one_step_equations",            target_grade: "7th" },
    { level: 10, skill: "two_step_equations",            target_grade: "7th" },
    { level: 11, skill: "geometry_basics",               target_grade: "7th-8th" },
    { level: 12, skill: "linear_equations",              target_grade: "8th" }
]
```

### 2.3 Math Lesson Generation Rules

```
FUNCTION generateMathLesson(student):

    difficulty_types = identifyMathDifficultyType(student, last_5_sessions)
    current_level = student.academic_snapshot.math_current_ladder_level
    confidence = student.cognitive_profile.confidence_math
    attention = student.cognitive_profile.attention_span_minutes
    interests = student.interest_profile.favorite_topics

    // Step 1: Set problem count
    IF confidence <= 1:
        problem_count = 2
    ELSE IF confidence == 2:
        problem_count = 3
    ELSE:
        problem_count = 5

    // Step 2: Set difficulty
    IF confidence <= 2:
        skill_level = current_ladder_level - 1  // build from solid ground
    ELSE:
        skill_level = current_ladder_level

    // Step 3: Determine visual support
    IF "abstract_presentation" IN difficulty_types:
        visual_support = "required"
        lesson.reference_strip = generateVisualModel(skill_level)
        lesson.worked_example = true

    // Step 4: Determine step scaffolding
    IF "multi_step_sequencing" IN difficulty_types:
        lesson.steps_shown = "one_at_a_time"
        lesson.step_labels = true  // "Step 1: Look at the ones column"

    // Step 5: Create interest-based word problems
    topic = selectTopicFromInterests(interests)  // e.g. "You have 3 dogs. Each needs 2 cups of food..."
    lesson.problems = generateInterestHookedProblems(skill_level, problem_count, topic)

    // Step 6: Set lesson structure
    lesson = {
        subject: "math",
        skill_target: MATH_SKILL_LADDER[skill_level].skill,
        problem_count: problem_count,
        visual_support: visual_support,
        reference_strip: lesson.reference_strip,
        problems: lesson.problems,
        support_level: mapConfidenceToSupport(confidence),
        ef_supports: injectEFSupports(lesson, student.ef_profile),
        estimated_time: problem_count * 5 + 5  // ~5 min per problem + setup
    }

    RETURN lesson
```

### 2.4 Visual Support Examples by Skill

| Skill | Visual Support |
|---|---|
| Fractions | Pie chart, number line, fraction bars |
| Decimals | Place value chart with tenths/hundredths labeled |
| Ratios | Two-column comparison table, tape diagrams |
| Equations | Balance scale visual, step-by-step strip |
| Percentages | "Out of 100" grid, percent bar |
| Multiplication | Array diagrams, skip-count chart |

---

## Part 3: Daily Lesson Assembly

### 3.1 Daily Plan Generation Rules

```
FUNCTION generateDailyPlan(student, date):

    day_of_week = getDayOfWeek(date)
    recent_completion = getCompletionRate(student, last_5_sessions)
    recent_frustration = getFrustrationAvg(student, last_3_sessions)
    recent_confidence = getConfidenceAvg(student, last_5_sessions)

    // Step 1: Choose day theme
    IF isReviewDay(day_of_week, student.weekly_plan):
        day_theme = "review"
    ELSE IF recent_completion < 0.6 OR recent_frustration > 2.5:
        day_theme = "light"
    ELSE IF parent_flag == "light_day":
        day_theme = "light"
    ELSE:
        day_theme = "regular"

    // Step 2: Generate reading lesson
    reading_lesson = generateReadingLesson(student)

    // Step 3: Generate math lesson
    math_lesson = generateMathLesson(student)

    // Step 4: Generate enrichment (if not light day)
    IF day_theme != "light":
        enrichment = generateEnrichmentActivity(student)

    // Step 5: Set block lengths
    IF day_theme == "light":
        reading_time = 10  // shorter
        math_time = 10
        enrichment = null
    ELSE:
        reading_time = reading_lesson.estimated_time
        math_time = math_lesson.estimated_time

    // Step 6: Build block order
    plan.blocks = [
        buildBlock("startup", 10),
        buildBlock("reading", reading_time, reading_lesson),
        buildBlock("break", 5),
        buildBlock("math", math_time, math_lesson),
        buildBlock("break", 10),
        enrichment ? buildBlock("enrichment", 20, enrichment) : null,
        buildBlock("wrap_up", 10)
    ].filter(Boolean)

    plan.total_estimated_time = sum(block.time for block in plan.blocks)

    RETURN plan
```

### 3.2 Interest Injection into Lessons

```
FUNCTION selectTopicFromInterests(interests):
    // Rotate through interest topics week by week
    // Never use the same topic 2 days in a row
    // Prefer highest-engagement topics (from personalization_memory)

    top_interests = interests.favorite_topics.filter(
        topic => topic NOT IN last_2_days_topics
    )
    RETURN top_interests[0]  // or random from top 3

FUNCTION generateInterestHookedProblems(skill_level, count, topic):
    // Wrap math problems in the student's topic
    // Example: topic = "dogs"
    // Skill: ratios
    // Problem: "A dog shelter has 3 small dogs for every 5 large dogs.
    //           If there are 24 dogs total, how many are small?"

    problems = []
    FOR i IN range(count):
        problems.push(wrapProblemInContext(MATH_SKILL_LADDER[skill_level], topic))

    RETURN problems
```

---

## Part 4: Progress → Next Day Adaptation

### 4.1 End-of-Session Update Rules

```
FUNCTION updateCurriculumAfterSession(student, session):

    // Reading adaptation
    reading_accuracy = session.reading.accuracy_rate
    reading_confidence = session.reading.confidence_after
    reading_completion = session.reading.completed

    IF reading_accuracy >= 0.8 AND sessions_at_level >= 3:
        student.reading_ladder_level += 1
        flag = "advance_reading"

    ELSE IF reading_accuracy < 0.6:
        student.reading_ladder_level = max(1, student.reading_ladder_level - 1)
        flag = "step_back_reading"

    ELSE IF reading_confidence < 3:
        // Don't advance yet — stay at level, increase support
        student.reading_support_level = min(3, student.reading_support_level + 1)
        flag = "maintain_with_more_support"

    // Math adaptation
    math_accuracy = session.math.accuracy_rate
    math_confidence = session.math.confidence_after
    problems_completed = session.math.problems_completed

    IF math_accuracy >= 0.8 AND sessions_at_level >= 3:
        student.math_ladder_level += 1
        flag = "advance_math"

    ELSE IF math_accuracy < 0.6:
        student.math_ladder_level = max(1, student.math_ladder_level - 1)
        flag = "step_back_math"

    // Engagement / frustration adaptation
    IF session.frustration_events >= 2:
        tomorrow.day_theme = "light"
        tomorrow.ef_support_level = "increase_all"

    IF session.completion_rate == 1.0 AND session.confidence_after >= 4:
        student.personalization_memory.recent_wins.push(
            generateWinNote(session)
        )

    // Format adaptation
    IF session.format worked well:
        student.personalization_memory.high_success_formats.add(format)

    IF session.format failed:
        student.personalization_memory.low_success_formats.add(format)

    RETURN updated student profile
```

### 4.2 Review / Repeat / Advance Decision Rules

```
RULE: ADVANCE to next skill level
    Condition: accuracy >= 80% AND confidence >= 3 AND sessions_at_level >= 3
    Action: increment skill ladder level, note win, celebrate

RULE: REPEAT at same level (with variation)
    Condition: accuracy 60–79% OR confidence < 3
    Action: stay at current level, change problem format or topic

RULE: STEP BACK one level
    Condition: accuracy < 60% on 2+ consecutive sessions
    Action: decrement skill ladder level, add visual support, increase EF support

RULE: REVIEW day (whole-day)
    Condition: end of week OR 3+ new skills introduced this week
    Action: generate review day with mixed practice across recent skills

RULE: CELEBRATION day (end of unit)
    Condition: student completes full skill unit (all levels in a sequence)
    Action: generate celebration plan with reflection, portfolio addition, and choice activity
```

---

## Part 5: Parent Summary Generation

### 5.1 Parent Summary Rules

```
FUNCTION generateParentSummary(student, session):

    summary = {}

    // What happened
    summary.plan_overview = {
        planned: session.blocks.length,
        completed: session.blocks.filter(b => b.status == "completed").length,
        completion_rate: session.completion_summary.completion_rate
    }

    // Reading
    summary.reading = {
        focus: session.reading_lesson.skill_target,
        what_happened: generateReadingNote(session.reading),
        confidence_rating: session.reading.confidence_after,
        level_status: getReadingLevelStatus(student)
    }

    // Math
    summary.math = {
        focus: session.math_lesson.skill_target,
        what_happened: generateMathNote(session.math),
        accuracy: session.math.accuracy_rate,
        confidence_rating: session.math.confidence_after
    }

    // EF
    summary.ef = generateEFParentSummary(session, student.ef_profile)

    // Tone selection
    IF session.completion_rate >= 0.8 AND session.frustration_events == 0:
        summary.tone = "encouraging"
    ELSE IF session.completion_rate < 0.5 OR session.frustration_events >= 2:
        summary.tone = "flag_concern"
    ELSE:
        summary.tone = "neutral"

    // Recommendation
    summary.recommendation_for_tomorrow = generateNextDayRecommendation(student, session)

    RETURN summary
```

### 5.2 Parent Summary Plain Language Templates

**Reading:**
```
// High confidence + high completion
"McKenna read [X pages / passage topic] today.
 She worked on [skill_target]. She read with more expression than last week.
 Confidence check: [rating]/5."

// Low confidence
"McKenna worked on [skill_target] today. She needed extra support
 getting started, and we used [support_type] to help her engage.
 This is normal and part of building stamina. The important thing
 is she did it."

// Advance triggered
"Today McKenna demonstrated strong enough fluency that we're
 moving her to the next reading skill: [next_skill]. That's
 a real milestone."
```

**Math:**
```
// Strong session
"McKenna solved [N] problems on [skill] today and got [X] right
 on the first try. She used the reference strip independently,
 which is growth. Math confidence check: [rating]/5."

// Struggle session
"Math was harder today. McKenna worked on [skill] and we noticed
 [difficulty_type]. We kept the support high and she finished
 all [N] problems. A harder day doesn't erase the growth she's built."
```

---

## Part 6: Weekly Curriculum Rhythm

### 6.1 Default Weekly Plan Structure

| Day | Theme | Focus |
|---|---|---|
| Monday | New skill introduction | Introduce new reading + math skill. Light enrichment. |
| Tuesday | Practice | Repeat skill with variation. Same topic, different format. |
| Wednesday | Practice + enrichment | Continue skill work. Full enrichment block. |
| Thursday | Challenge + extend | Slightly harder version. Interest-rich context. |
| Friday | Review + celebrate | Mixed review. Reflection. Celebrate wins. |

### 6.2 Weekly Rhythm Rules

```
RULE: Monday always introduces or re-introduces
    → EF support: HIGH (new = unfamiliar = needs more scaffolding)
    → Lesson length: shorter than mid-week

RULE: Tuesday/Wednesday are core practice days
    → EF support: MODERATE
    → Lesson length: full

RULE: Thursday is challenge day
    → Only if confidence >= 3 and completion rate >= 0.8 this week
    → Otherwise: extra practice day

RULE: Friday is always review + celebrate
    → Never introduce new skills on Friday
    → Always include a win summary
    → Include one choice activity (student picks)

RULE: If the week had 2+ hard days
    → Replace Thursday challenge with extra practice
    → Make Friday a full light-and-celebrate day
```

### 6.3 Monthly Learning Reflection

At the end of each month, the system generates a monthly reflection that:
- Summarizes skills covered
- Shows reading level progress (start vs. end of month)
- Shows math skill ladder movement
- Celebrates top moments
- Identifies areas to focus on next month
- Updates goal progress toward 30/90/day targets

```json
{
  "monthly_reflection": {
    "student_id": "mckenna-ray-001",
    "month": "September 2025",
    "reading": {
      "started_at": "fluency_with_expression (level 4)",
      "ended_at": "fluency_with_expression (level 4, solidifying)",
      "sessions_completed": 18,
      "books_completed": 1,
      "fluency_trend": "improving",
      "confidence_start": 2,
      "confidence_end": 3,
      "highlight": "Completed 5 consecutive reading sessions — longest streak yet"
    },
    "math": {
      "started_at": "fractions_operations (level 5)",
      "ended_at": "decimals_and_percentages (level 6, beginning)",
      "sessions_completed": 16,
      "problems_attempted": 58,
      "accuracy_trend": "improving",
      "confidence_start": 2,
      "confidence_end": 2,
      "highlight": "Mastered fraction addition — ready for decimals"
    },
    "ef_growth": [
      "Task initiation improved on 12 of 18 sessions",
      "Task completion improving — fewer incomplete tasks",
      "Transitions smoother with 2-minute warnings in place"
    ],
    "30_day_goal_check": {
      "complete_20_of_22_days": { "status": "met", "actual": 18 },
      "read_2_books": { "status": "in_progress", "actual": 1 },
      "fluency_on_3_consecutive": { "status": "met" },
      "math_80pct_accuracy": { "status": "approaching", "actual": "74%" }
    },
    "recommendation_for_next_month": "Stay on decimals/percentages in math. Push into vocabulary-in-context for reading. Begin one project-based enrichment unit."
  }
}
```
