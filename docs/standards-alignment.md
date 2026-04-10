# California State Standards Alignment
## Homeschool SaaS — McKenna Ray Platform

---

## Purpose

California's Common Core State Standards (CCSS) are used here as a **reporting and comparison framework** — not as the curriculum driver.

The platform's job is to teach McKenna from where she actually is and move her forward at a pace that builds confidence and competence. The standards show her family *where 8th grade expectations sit* and demonstrate that the homeschool plan is working toward a recognized, measurable goal.

**How standards appear in this platform:**
- In parent summaries: "Here's what California expects at 8th grade, here's where McKenna is, here's the bridge."
- In goal-setting: target standards give shape to 90-day and yearly goals
- In progress tracking: skills mastered are mapped to grade-level standards to show documented growth
- They are never shown to McKenna as "you're behind" — they are used by the adult layer only

---

## Part 1: California 8th Grade ELA Standards — McKenna's Gap Map

### CA CCSS ELA 8th Grade Key Standards

**Reading: Literature and Informational Text (RI/RL.8)**

| Standard ID | Description | McKenna's Status |
|---|---|---|
| RL.8.1 | Cite textual evidence to support analysis | Developing — can identify evidence with sentence frames |
| RL.8.2 | Determine theme/central idea; analyze development | Developing — can identify main idea, not yet theme |
| RL.8.3 | Analyze how dialogue/incidents reveal character | Emerging — needs modeling |
| RL.8.4 | Determine word meaning; figurative language | Developing — vocabulary anchor cards in use |
| RL.8.5 | Compare structure in different texts | Not yet introduced |
| RL.8.6 | Analyze differences in character/narrator POV | Emerging |
| RI.8.1 | Cite evidence in informational text | Developing |
| RI.8.2 | Central idea + objective summary | Developing — sentence frames needed |
| RI.8.4 | Vocabulary in technical/domain-specific contexts | Developing |
| RI.8.8 | Evaluate author's argument + evidence | Not yet introduced |

**Reading Foundational Skills (approaching from 6th grade)**

| Standard ID | Description | McKenna's Status |
|---|---|---|
| RF.6.4a | Read grade-level text with purpose and understanding | Approaching |
| RF.6.4b | Read orally with accuracy, rate, expression | Active target — working on fluency |
| RF.6.4c | Use context to confirm/self-correct | Developing |

**Language (L.8)**

| Standard ID | Description | McKenna's Status |
|---|---|---|
| L.8.4 | Determine word meaning via context, affixes, roots | Developing |
| L.8.5 | Figurative language, word relationships | Emerging |
| L.8.6 | Acquire/use grade-appropriate vocabulary | Developing — 6th grade target |

---

### CA CCSS 8th Grade Math — McKenna's Gap Map

| Domain | Standard ID | Description | McKenna's Status |
|---|---|---|---|
| The Number System | 8.NS.1 | Rational vs irrational numbers | Not yet introduced |
| Expressions & Equations | 8.EE.1 | Integer exponents | Not yet introduced |
| Expressions & Equations | 8.EE.7 | Solve linear equations | Not yet introduced |
| Functions | 8.F.1 | Understand function concept | Not yet introduced |
| Statistics | 8.SP.1 | Scatter plots | Not yet introduced |
| **6th Grade (active bridge)** | | | |
| Ratios/Proportions | 6.RP.1 | Ratio concepts | Approaching |
| Ratios/Proportions | 6.RP.3 | Solve ratio/rate problems | Emerging |
| Number System | 6.NS.1 | Divide fractions | Developing |
| Number System | 6.NS.3 | Operations with decimals | Active target |
| Expressions | 6.EE.1 | Write/evaluate expressions | Emerging |
| Expressions | 6.EE.5 | Solve equations | Emerging |

---

## Part 2: Standards Gap Summary

### Reading
McKenna is working at approximately **6th grade ELA level** in a student enrolled in 8th grade.

| Metric | Value |
|---|---|
| Enrolled grade | 8th |
| Current reading level | ~6th grade |
| Grade gap | ~2 years |
| Priority standards to bridge | RF.6.4b (fluency), RL.7.2 (central idea), L.7.4 (vocabulary) |
| Bridge timeline (estimate) | 12–18 months with consistent daily reading support |

### Math
McKenna is working at approximately **5th–6th grade math level** in a student enrolled in 8th grade.

| Metric | Value |
|---|---|
| Enrolled grade | 8th |
| Current math level | ~5th–6th grade |
| Grade gap | ~2 years |
| Priority standards to bridge | 6.NS (decimals/fractions), 6.RP (ratios), 6.EE (expressions) |
| Bridge timeline (estimate) | 12–18 months with consistent daily math support |

---

## Part 3: Standards Mapping in the Curriculum Engine

Each lesson the curriculum engine generates includes a standards reference field. This is used for parent reporting only — it never appears in the student-facing lesson view.

### Lesson Standards Field

```json
{
  "lesson_id": "lesson-reading-2025-09-15",
  "standards_alignment": {
    "primary_standard": {
      "id": "RF.6.4b",
      "description": "Read grade-level prose and poetry orally with accuracy, appropriate rate, and expression",
      "grade": "6th",
      "domain": "Reading Foundational Skills"
    },
    "secondary_standard": {
      "id": "RL.7.4",
      "description": "Determine the meaning of words and phrases as they are used in text",
      "grade": "7th",
      "domain": "Reading: Literature"
    },
    "grade_level_context": "This skill is a 6th grade foundational standard. McKenna is working to solidify this before advancing to 7th grade reading standards.",
    "parent_note": "Today's lesson targets a California 6th grade reading skill. McKenna is building this as a bridge toward 8th grade expectations."
  }
}
```

### Math Lesson Standards Field

```json
{
  "lesson_id": "lesson-math-2025-09-15",
  "standards_alignment": {
    "primary_standard": {
      "id": "6.NS.3",
      "description": "Fluently add, subtract, multiply, and divide multi-digit decimals",
      "grade": "6th",
      "domain": "The Number System"
    },
    "grade_level_context": "This is a 6th grade California math standard. McKenna is working to master it as part of bridging toward 7th and 8th grade math.",
    "parent_note": "Today's math lesson covers a California 6th grade standard. Once this skill is solid, we'll move to 7th grade ratio and proportion concepts."
  }
}
```

---

## Part 4: Parent Summary — Standards Language

### How the platform explains standards to parents (plain language)

The parent summary includes a **Standards Context** section written in plain English:

```
STANDARDS CONTEXT (in parent summary)

Reading:
"Today's reading lesson worked on [skill].
In California, this skill is part of the [X]th grade reading standards.
McKenna is working at approximately [Y]th grade level,
which means she's building toward grade-level expectations on a steady path.
Each time she completes a lesson like this, she moves closer to that target."

Math:
"Today's math lesson covered [skill].
California's [X]th grade standards include this concept as part of [domain].
McKenna is working through this skill now as a bridge to grade-level math.
Her accuracy today was [Z]%, which [shows solid progress / means we'll
practice this skill more before moving forward]."
```

---

## Part 5: Weekly and Monthly Standards Reporting

The weekly parent summary includes a **Standards Progress Card** that can be shown to family:

```json
{
  "standards_progress_card": {
    "student": "McKenna Ray",
    "week_of": "September 15–19, 2025",
    "grade_enrolled": "8th",

    "reading_standards_worked": [
      {
        "standard": "RF.6.4b",
        "description": "Read with accuracy, rate, and expression",
        "sessions_practiced": 4,
        "progress": "solidifying"
      }
    ],

    "math_standards_worked": [
      {
        "standard": "6.NS.3",
        "description": "Decimal operations",
        "sessions_practiced": 3,
        "progress": "developing"
      }
    ],

    "parent_summary_statement": "This week McKenna worked on two California state standards: one in reading fluency (6th grade level) and one in math operations with decimals (6th grade level). Both skills are part of her bridge plan toward 8th grade expectations. This is real, standards-based curriculum — customized to where McKenna is and where she's going."
  }
}
```

---

## Part 6: Standards-Based Milestone Map

The following milestones mark McKenna's path from current level to grade-level readiness:

### Reading Milestones

| Milestone | Standard Target | Description | Estimated Timeframe |
|---|---|---|---|
| M1 | RF.6.4b | Consistent fluency at 6th grade level | Month 1–2 |
| M2 | RL.6.2 | Identify main idea + key details | Month 2–3 |
| M3 | L.6.4 | Vocabulary via context clues | Month 3–4 |
| M4 | RL.7.1 | Cite evidence with analysis | Month 4–6 |
| M5 | RL.7.2 | Analyze theme development | Month 5–7 |
| M6 | RI.7.1 | Evidence in informational text | Month 6–8 |
| M7 | RL.8.1 | 8th grade textual analysis | Month 9–12 |

### Math Milestones

| Milestone | Standard Target | Description | Estimated Timeframe |
|---|---|---|---|
| M1 | 5.NF.1 | Fractions: add/subtract unlike denominators | Month 1 |
| M2 | 6.NS.3 | Decimal operations | Month 1–2 |
| M3 | 6.RP.1 | Ratios and unit rates | Month 2–3 |
| M4 | 6.EE.1 | Expressions and order of operations | Month 3–4 |
| M5 | 6.EE.5 | Solve one-step equations | Month 4–5 |
| M6 | 7.RP.1 | Proportional relationships | Month 5–7 |
| M7 | 7.EE.4 | Two-step equations | Month 7–9 |
| M8 | 8.EE.7 | Linear equations | Month 10–14 |

Each milestone is a **celebration point** in the platform. When McKenna hits a milestone, the system:
- Notifies the parent with a milestone card
- Adds a win to McKenna's learning profile
- Generates a short celebration activity
- Updates the standards progress report for family records
