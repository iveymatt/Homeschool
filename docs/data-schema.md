# Data Schema
## Homeschool SaaS — MVP v1

All schemas are represented as JSON-compatible structures. In a relational DB, these map to tables with foreign keys. In a document DB (Firestore, MongoDB), these map to collections/documents.

---

## 1. student_profiles

```json
{
  "id": "string (uuid)",
  "created_at": "timestamp",
  "updated_at": "timestamp",

  "identity": {
    "full_name": "string",
    "nickname": "string",
    "age": "integer",
    "grade_level": "string",
    "homeschool_status": "active | paused | transitioning"
  },

  "academic_snapshot": {
    "enrolled_grade": "string",
    "reading_level_estimate": "string (e.g. '6th grade')",
    "reading_grade_gap": "integer (enrolled grade minus reading level)",
    "reading_current_ladder_level": "integer (ref: READING_SKILL_LADDER)",
    "math_level_estimate": "string",
    "math_grade_gap": "integer",
    "math_current_ladder_level": "integer (ref: MATH_SKILL_LADDER)",
    "strongest_subjects": ["string"],
    "challenge_subjects": ["string"],
    "current_goals": ["string"],
    "standards_reference": "string (e.g. 'California CCSS 8th grade')",
    "standards_gap_summary": "string (plain language gap description)"
  },

  "goal_profile": {
    "30_day_goals": ["string"],
    "90_day_goals": ["string"],
    "yearly_goals": ["string"],
    "reading_goals": ["string"],
    "math_goals": ["string"],
    "routine_goals": ["string"],
    "confidence_goals": ["string"],
    "goal_last_reviewed": "date"
  },

  "cognitive_profile": {
    "attention_span_minutes": "integer",
    "preferred_lesson_length": "integer (minutes)",
    "learning_modes_preference": ["visual", "auditory", "kinesthetic", "reading_writing"],
    "visual_support_needed": "boolean",
    "audio_support_needed": "boolean",
    "movement_break_frequency_minutes": "integer",
    "transition_support_needed": "boolean",
    "frustration_triggers": ["string"],
    "confidence_reading": "1-5 integer",
    "confidence_math": "1-5 integer",
    "confidence_general": "1-5 integer",
    "reading_struggle_type": ["decoding", "fluency", "working_memory", "comprehension", "avoidance_frustration", "attention"],
    "math_difficulty_type": ["fact_fluency", "concept_gap", "multi_step_sequencing", "working_memory", "abstract_presentation", "confidence", "overwhelm"]
  },

  "interest_profile": {
    "favorite_topics": ["string"],
    "favorite_animals": ["string"],
    "favorite_books": ["string"],
    "favorite_games": ["string"],
    "favorite_shows": ["string"],
    "favorite_activities": ["string"],
    "creative_preferences": ["string"]
  },

  "routine_profile": {
    "best_learning_times": ["morning", "midday", "afternoon", "evening"],
    "ideal_start_time": "string (e.g. '9:00 AM')",
    "daily_schedule_constraints": ["string"],
    "energy_patterns": "string",
    "support_available": ["string"]
  },

  "personalization_memory": {
    "lessons_that_worked": ["string"],
    "lessons_that_failed": ["string"],
    "engagement_patterns": ["string"],
    "high_success_formats": ["string"],
    "low_success_formats": ["string"],
    "recent_wins": ["string"],
    "current_struggle_flags": ["string"]
  },

  "ef_profile": {
    "domains": {
      "task_initiation": {
        "score": "0-4 integer",
        "support_level": "0-3 integer",
        "trend": "improving | stable | declining",
        "sessions_at_level": "integer",
        "last_updated": "date",
        "notes": "string"
      },
      "planning_organization": { "...same structure..." },
      "working_memory": { "...same structure..." },
      "transitions": { "...same structure..." },
      "sustained_focus": { "...same structure..." },
      "task_completion": { "...same structure..." },
      "emotional_regulation": { "...same structure..." },
      "time_awareness": { "...same structure..." },
      "impulse_control": { "...same structure..." }
    }
  }
}
```

---

## 2. lessons

```json
{
  "lesson_id": "string (uuid)",
  "student_id": "string (ref: student_profiles.id)",
  "date": "date",
  "created_at": "timestamp",
  "updated_at": "timestamp",

  "subject": "reading | math | enrichment | review | flex",
  "title": "string",
  "objective": "string (1 sentence)",
  "estimated_time_minutes": "integer",
  "skill_target": "string",
  "current_level": "string",
  "difficulty_level": "1-5 integer",

  "materials_needed": ["string"],
  "instructions": [
    {
      "step": "integer",
      "text": "string",
      "support_note": "string | null"
    }
  ],
  "adaptation_options": ["string"],

  "ef_supports": [
    {
      "phase": "before | during | after",
      "domain": "string (ef domain name)",
      "support_type": "string",
      "display_text": "string",
      "support_level": "0-3 integer"
    }
  ],

  "support_level": "0-3 integer",
  "interest_hooks": ["string"],

  "completion": {
    "status": "not_started | in_progress | completed | skipped",
    "completed_at": "timestamp | null",
    "confidence_after": "1-5 integer | null",
    "student_response": "string | null",
    "teacher_notes": "string | null"
  },

  "success_markers": ["string"],
  "followup_recommendation": "string",

  "standards_alignment": {
    "primary_standard": {
      "id": "string (e.g. 'RF.6.4b')",
      "description": "string",
      "grade": "string",
      "domain": "string"
    },
    "secondary_standard": {
      "id": "string | null",
      "description": "string | null",
      "grade": "string | null",
      "domain": "string | null"
    },
    "grade_level_context": "string (how this lesson fits in the standards ladder)",
    "parent_note": "string (plain language for family reporting)"
  }
}
```

---

## 3. daily_plans

```json
{
  "plan_id": "string (uuid)",
  "student_id": "string (ref: student_profiles.id)",
  "date": "date",
  "created_at": "timestamp",

  "day_theme": "regular | light | catch_up | review | flex",
  "total_estimated_time_minutes": "integer",

  "blocks": [
    {
      "block_id": "string (uuid)",
      "order": "integer",
      "title": "string",
      "subject": "reading | math | enrichment | break | startup | wrap_up",
      "estimated_time_minutes": "integer",
      "goal": "string",
      "instructions": "string",
      "materials": ["string"],
      "adaptation": "string | null",
      "lesson_id": "string (ref: lessons.lesson_id) | null",
      "ef_transition_support": "string | null",
      "completion": {
        "status": "not_started | in_progress | completed | skipped",
        "completed_at": "timestamp | null",
        "notes": "string | null"
      }
    }
  ],

  "plan_metadata": {
    "reading_focus": "string",
    "math_focus": "string",
    "enrichment_theme": "string | null",
    "light_day": "boolean",
    "generated_by": "system | parent_override"
  },

  "completion_summary": {
    "total_blocks": "integer",
    "completed_blocks": "integer",
    "completion_rate": "float (0.0–1.0)",
    "total_time_spent_minutes": "integer | null"
  }
}
```

---

## 4. ef_support_logs

```json
{
  "log_id": "string (uuid)",
  "student_id": "string (ref: student_profiles.id)",
  "session_id": "string (ref: daily_plans.plan_id)",
  "lesson_id": "string (ref: lessons.lesson_id)",
  "date": "date",

  "domain_logs": [
    {
      "domain": "string (ef domain name)",
      "support_offered": "string",
      "support_level_used": "0-3 integer",
      "initiated_independently": "boolean",
      "prompts_required": "integer",
      "session_score": "0-4 integer",
      "notes": "string | null"
    }
  ],

  "session_summary": {
    "overall_ef_score": "float",
    "frustration_events": "integer",
    "task_abandoned": "boolean",
    "total_initiation_delay_minutes": "float"
  }
}
```

---

## 5. progress_records

```json
{
  "record_id": "string (uuid)",
  "student_id": "string (ref: student_profiles.id)",
  "date": "date",
  "period": "daily | weekly | monthly",

  "reading": {
    "level_current": "string",
    "level_target": "string",
    "sessions_completed": "integer",
    "pages_read": "integer",
    "fluency_score": "float | null",
    "comprehension_score": "float | null",
    "confidence_rating_avg": "float",
    "skills_worked": ["string"],
    "growth_notes": "string | null"
  },

  "math": {
    "level_current": "string",
    "level_target": "string",
    "sessions_completed": "integer",
    "problems_attempted": "integer",
    "problems_correct": "integer",
    "accuracy_rate": "float",
    "confidence_rating_avg": "float",
    "skills_worked": ["string"],
    "growth_notes": "string | null"
  },

  "ef_independence": {
    "task_initiation_avg": "float",
    "planning_avg": "float",
    "working_memory_avg": "float",
    "transitions_avg": "float",
    "focus_avg": "float",
    "completion_avg": "float",
    "overall_independence_trend": "improving | stable | declining"
  },

  "engagement": {
    "completion_rate": "float",
    "avg_confidence_overall": "float",
    "consistency_streak_days": "integer",
    "frustration_events_total": "integer",
    "high_engagement_topics": ["string"]
  }
}
```

---

## 6. parent_summaries

```json
{
  "summary_id": "string (uuid)",
  "student_id": "string (ref: student_profiles.id)",
  "student_name": "string",
  "date": "date",
  "period": "daily | weekly | monthly",
  "generated_at": "timestamp",

  "plan_summary": {
    "planned_items": ["string"],
    "completed_items": ["string"],
    "skipped_items": ["string"],
    "completion_rate": "float"
  },

  "subject_summaries": {
    "reading": {
      "focus": "string",
      "what_happened": "string",
      "skill_worked": "string",
      "confidence_note": "string"
    },
    "math": {
      "focus": "string",
      "what_happened": "string",
      "skill_worked": "string",
      "confidence_note": "string"
    },
    "enrichment": {
      "focus": "string | null",
      "what_happened": "string | null"
    }
  },

  "ef_summary": {
    "domains_activated": ["string"],
    "domain_notes": [
      {
        "domain": "string",
        "plain_label": "string",
        "what_happened": "string",
        "trend_note": "string",
        "next_step": "string"
      }
    ],
    "overall_ef_note": "string"
  },

  "progress_note": "string",
  "support_note": "string",
  "recommendation_for_tomorrow": "string",

  "tone": "encouraging | neutral | flag_concern",

  "standards_progress_card": {
    "reading_standards_worked": [
      {
        "standard": "string (id)",
        "description": "string",
        "sessions_practiced": "integer",
        "progress": "introducing | developing | solidifying | mastered"
      }
    ],
    "math_standards_worked": [
      {
        "standard": "string (id)",
        "description": "string",
        "sessions_practiced": "integer",
        "progress": "introducing | developing | solidifying | mastered"
      }
    ],
    "parent_summary_statement": "string"
  }
}
```

---

## 7. weekly_plans

```json
{
  "week_plan_id": "string (uuid)",
  "student_id": "string (ref: student_profiles.id)",
  "week_start_date": "date",
  "week_end_date": "date",
  "created_at": "timestamp",

  "reading_focus": {
    "skill": "string",
    "text_or_material": "string",
    "target_pages_or_sessions": "integer",
    "level": "string"
  },

  "math_focus": {
    "concept": "string",
    "skill_target": "string",
    "problem_set_theme": "string",
    "level": "string"
  },

  "enrichment_theme": "string | null",

  "day_plans": [
    {
      "day": "Monday | Tuesday | Wednesday | Thursday | Friday",
      "plan_id": "string (ref: daily_plans.plan_id) | null",
      "day_type": "regular | light | review | catch_up | flex | off"
    }
  ],

  "weekly_summary": {
    "total_reading_sessions": "integer",
    "total_math_sessions": "integer",
    "completion_rate": "float",
    "wins": ["string"],
    "areas_to_watch": ["string"],
    "recommendation_for_next_week": "string"
  }
}
```

---

## 8. monthly_reflections

```json
{
  "reflection_id": "string (uuid)",
  "student_id": "string (ref: student_profiles.id)",
  "month": "string (e.g. 'September 2025')",
  "month_start": "date",
  "month_end": "date",
  "generated_at": "timestamp",

  "reading": {
    "ladder_level_start": "integer",
    "ladder_level_end": "integer",
    "level_label_start": "string",
    "level_label_end": "string",
    "sessions_completed": "integer",
    "sessions_planned": "integer",
    "books_completed": "integer",
    "fluency_trend": "improving | stable | declining",
    "confidence_start": "1-5 integer",
    "confidence_end": "1-5 integer",
    "highlight": "string",
    "skills_mastered": ["string"],
    "skills_in_progress": ["string"]
  },

  "math": {
    "ladder_level_start": "integer",
    "ladder_level_end": "integer",
    "level_label_start": "string",
    "level_label_end": "string",
    "sessions_completed": "integer",
    "problems_attempted": "integer",
    "accuracy_trend": "improving | stable | declining",
    "confidence_start": "1-5 integer",
    "confidence_end": "1-5 integer",
    "highlight": "string",
    "skills_mastered": ["string"],
    "skills_in_progress": ["string"]
  },

  "ef_growth": ["string (plain language notes per domain that improved)"],

  "goal_progress": {
    "30_day_goals": [
      {
        "goal": "string",
        "status": "met | in_progress | not_met",
        "note": "string | null"
      }
    ]
  },

  "wins": ["string"],
  "areas_to_watch": ["string"],
  "recommendation_for_next_month": "string",

  "parent_summary_statement": "string (plain language monthly recap for family)"
}
```

---

## 9. skill_milestones

```json
{
  "milestone_id": "string (uuid)",
  "student_id": "string (ref: student_profiles.id)",
  "achieved_at": "timestamp",

  "subject": "reading | math",
  "milestone_label": "string (e.g. 'Reading Fluency — 6th Grade Level')",
  "skill": "string",
  "ladder_level": "integer",
  "standard_id": "string (CA CCSS standard)",
  "standard_description": "string",

  "evidence": {
    "sessions_to_achieve": "integer",
    "final_accuracy_or_score": "string",
    "confidence_at_milestone": "1-5 integer"
  },

  "celebration": {
    "triggered": "boolean",
    "type": "badge | portfolio_entry | choice_activity | parent_notification",
    "message": "string (shown to student)",
    "parent_note": "string"
  }
}
```

---

## Relationships

```
student_profiles (1)
    → daily_plans (many)
    → lessons (many)
    → ef_support_logs (many)
    → progress_records (many)
    → parent_summaries (many)
    → weekly_plans (many)
    → monthly_reflections (many)
    → skill_milestones (many)

daily_plans (1)
    → blocks[] → lesson_id → lessons (1)
    → ef_support_logs (1 per session)

lessons (1)
    → ef_supports[] (embedded)
    → standards_alignment (embedded)
    → ef_support_logs (1 per lesson instance)

skill_milestones (1)
    → triggers celebration activity in next daily_plan
    → appended to monthly_reflection.wins[]
```
