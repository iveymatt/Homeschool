# Product Requirements Document
## Homeschool SaaS — MVP v1
### Student: McKenna Ray

---

## Overview

A personalized homeschool operating system for McKenna Ray. This platform replaces ad-hoc worksheets with a structured, adaptive, neurodivergent-friendly daily learning system. It gives her mother and grandmother visible proof that homeschooling is organized, tracked, and working.

**Not:** a testing app, a school-at-home clone, or a generic edtech product.
**Is:** a calm, structured daily learning home base built around one student.

---

## Problem Statement

McKenna Ray needs a homeschool structure that:
- Matches her cognitive profile and likely neurodivergent needs
- Builds reading and math skills without overwhelming her
- Creates visible routine and predictable daily flow
- Shows her family that progress is real and measurable
- Adapts over time as she grows

No existing tool does all of this without heavy customization or feeling clinical.

---

## Goals

| Goal | Priority |
|---|---|
| Create a structured daily homeschool routine | Critical |
| Build reading confidence through gradual skill-building | Critical |
| Build math confidence through visual, concrete lessons | Critical |
| Reduce overwhelm via simple, low-clutter design | Critical |
| Provide parent-visible progress and reporting | Critical |
| Personalize learning based on interests and EF profile | High |
| Track skill growth over time | High |
| Embed executive function supports into lessons | High |
| Generate adaptive curriculum recommendations | Medium |
| Support multiple students in future versions | Low (MVP out of scope) |

---

## Users

### Student (McKenna Ray)
- Needs: simple dashboard, clear daily steps, low clutter, visual progress, encouraging tone
- Interaction: daily learner, follows Today's Plan, completes tasks, does confidence checks

### Parent/Guide (Mom or Grandma)
- Needs: daily plan visibility, progress summaries, simple controls, confidence in the structure
- Interaction: daily review, plan adjustments, weekly summary review, EF notes

### Admin/Builder
- Needs: editable student profile, configurable curriculum logic, expandable architecture
- Interaction: setup, profile updates, rule adjustments

---

## MVP Scope

### In Scope
- Student Profile (intake + ongoing update)
- Daily Plan generation and tracking
- Reading lesson delivery with EF supports
- Math lesson delivery with EF supports
- Executive Function support system
- Parent Summary (daily + weekly)
- Progress tracking (completion, confidence, EF independence)
- Basic personalization engine

### Out of Scope (v1)
- Multiple students
- Voice support
- Standards mapping / state reporting
- Print-ready exports
- Third-party integrations

---

## Success Metrics

| Metric | Target |
|---|---|
| Daily plan completion rate | ≥ 70% of blocks completed per day |
| Reading confidence rating | Trending upward over 30 days |
| Math confidence rating | Trending upward over 30 days |
| EF independence scores | At least 2 domains improving after 30 days |
| Parent engagement | Parent reviews summary ≥ 4x per week |
| Task initiation time | Decreasing trend over 30 days |

---

## Non-Functional Requirements

- **UX tone:** Calm, clean, confidence-building, never clinical
- **Text density:** Minimal. Short sentences. No paragraphs on task screens.
- **Performance:** Daily plan loads in < 2 seconds
- **Accessibility:** High contrast option, readable fonts, no info conveyed by color alone
- **Data persistence:** Student profile and session logs persist across sessions
- **Adaptability:** System must update recommendations based on recent session data

---

## Constraints

- MVP builds for one student (McKenna Ray)
- Must run as a web app (no native app required for MVP)
- Must be operable by a non-technical adult guide
- Lesson delivery must not require internet-dependent external content in core flow
