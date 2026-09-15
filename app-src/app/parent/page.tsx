"use client";
import { MAKENA, TODAY_PLAN, EXPERIENTIAL_LIBRARY, TREND_ICONS, TREND_COLORS, type Block } from "@/lib/data";
import { useLocalStorage } from "@/lib/useLocalStorage";

export default function ParentPage() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });

  // Same storage key as the Today page, so this reflects what Makena actually completed.
  const [blocks] = useLocalStorage<Block[]>(`makena-today-blocks-${TODAY_PLAN.date}`, TODAY_PLAN.blocks);

  const completed = blocks.filter((b) => b.status === "completed").length;
  const total = blocks.length;

  const readingBlock = blocks.find((b) => b.subject === "reading");
  const mathBlock = blocks.find((b) => b.subject === "math");
  const experientialBlock = blocks.find((b) => b.subject === "experiential");

  const pct = Math.round((completed / total) * 100);
  const completedTitles = blocks.filter((b) => b.status === "completed").map((b) => b.title);
  const dailyHighlights = [
    `${completed} of ${total} planned blocks completed (${pct}%).`,
    `Reading focus: ${TODAY_PLAN.readingFocus}.`,
    `Math focus: ${TODAY_PLAN.mathFocus}.`,
    experientialBlock ? `Real-world learning: ${experientialBlock.title} — ${experientialBlock.realWorldContext ?? experientialBlock.goal}.` : null,
    completedTitles.length > 0 ? `Completed blocks: ${completedTitles.join(", ")}.` : "No blocks completed yet today.",
  ].filter(Boolean) as string[];

  return (
    <div className="pt-6 space-y-5">
      {/* Header */}
      <div>
        <p className="eyebrow">Parent Summary</p>
        <h1 className="text-2xl font-semibold text-slate-800 mt-1">{MAKENA.name}</h1>
        <p className="text-sm text-slate-500">{today}</p>
      </div>

      {/* Plan completion */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Today's Plan</p>
        <div className="flex items-center justify-between mb-2">
          <p className="text-slate-700 text-sm">Completed</p>
          <p className="font-semibold text-slate-800">{completed} of {total} blocks</p>
        </div>
        <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-sage-500 rounded-full transition-all"
            style={{ width: `${Math.round((completed / total) * 100)}%` }}
          />
        </div>
        <div className="mt-3 space-y-1">
          {blocks.map((b) => (
            <div key={b.id} className="flex items-center gap-2 text-sm">
              <span>{b.status === "completed" ? "✅" : "⬜"}</span>
              <span className={b.status === "completed" ? "text-slate-500 line-through" : "text-slate-700"}>
                {b.title} (~{b.estimatedMinutes} min)
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Daily highlights + supports used */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Daily Highlights</p>
          <p className="text-[11px] text-slate-400 mb-3">Auto-generated from today&apos;s live completion state</p>
          <ul className="space-y-2">
            {dailyHighlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="flex-shrink-0 mt-0.5 text-sage-500">•</span>
                {h}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Supports Used</p>
          <p className="text-[11px] text-slate-400 mb-3">Executive function + regulation supports</p>
          <ul className="space-y-2">
            {TODAY_PLAN.supportsUsedToday.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="flex-shrink-0 mt-0.5 text-sage-500">•</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Reading summary */}
      <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4">
        <p className="text-xs font-semibold text-sky-500 uppercase tracking-wide mb-1">📖 Reading</p>
        <p className="text-sm font-medium text-sky-800 mb-2">{TODAY_PLAN.readingFocus}</p>
        <p className="text-sm text-sky-900 leading-relaxed">
          Makena worked on oral reading fluency today — reading with expression at her current 6th grade level.
          She used the vocabulary anchor card to support word retention during the passage.
          This is aligned to California&apos;s RF.6.4b reading fluency standard and builds directly
          toward her goal of reaching 7th grade reading level.
        </p>
        <div className="mt-3 flex gap-3">
          <div className="flex-1 bg-white rounded-xl px-3 py-2 border border-sky-100">
            <p className="text-[10px] text-sky-500 font-medium uppercase">Level</p>
            <p className="text-sm font-semibold text-sky-800">{MAKENA.readingLevelEstimate}</p>
          </div>
          <div className="flex-1 bg-white rounded-xl px-3 py-2 border border-sky-100">
            <p className="text-[10px] text-sky-500 font-medium uppercase">Confidence</p>
            <p className="text-sm font-semibold text-sky-800">{"⭐".repeat(MAKENA.confidenceReading)}{"☆".repeat(5 - MAKENA.confidenceReading)}</p>
          </div>
          <div className="flex-1 bg-white rounded-xl px-3 py-2 border border-sky-100">
            <p className="text-[10px] text-sky-500 font-medium uppercase">CA Standard</p>
            <p className="text-sm font-semibold text-sky-800">{readingBlock?.standardsAlignment?.primary.id ?? "—"}</p>
          </div>
        </div>
      </div>

      {/* Math summary */}
      <div className="bg-violet-50 border border-violet-200 rounded-2xl p-4">
        <p className="text-xs font-semibold text-violet-500 uppercase tracking-wide mb-1">➕ Math</p>
        <p className="text-sm font-medium text-violet-800 mb-2">{TODAY_PLAN.mathFocus}</p>
        <p className="text-sm text-violet-900 leading-relaxed">
          Makena worked on decimal operations today, a California 6th grade math standard (6.NS.3).
          Problems were presented one at a time with a reference strip visible throughout.
          This visual scaffold reduces cognitive load and lets her focus on the math itself
          rather than holding multiple steps in working memory at once.
        </p>
        <div className="mt-3 flex gap-3">
          <div className="flex-1 bg-white rounded-xl px-3 py-2 border border-violet-100">
            <p className="text-[10px] text-violet-500 font-medium uppercase">Level</p>
            <p className="text-sm font-semibold text-violet-800">{MAKENA.mathLevelEstimate}</p>
          </div>
          <div className="flex-1 bg-white rounded-xl px-3 py-2 border border-violet-100">
            <p className="text-[10px] text-violet-500 font-medium uppercase">Confidence</p>
            <p className="text-sm font-semibold text-violet-800">{"⭐".repeat(MAKENA.confidenceMath)}{"☆".repeat(5 - MAKENA.confidenceMath)}</p>
          </div>
          <div className="flex-1 bg-white rounded-xl px-3 py-2 border border-violet-100">
            <p className="text-[10px] text-violet-500 font-medium uppercase">CA Standard</p>
            <p className="text-sm font-semibold text-violet-800">{mathBlock?.standardsAlignment?.primary.id ?? "—"}</p>
          </div>
        </div>
      </div>

      {/* Real-world learning summary */}
      {experientialBlock?.standardsAlignment && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
          <p className="text-xs font-semibold text-orange-500 uppercase tracking-wide mb-1">🐴 Real-World Learning</p>
          <p className="text-sm font-medium text-orange-800 mb-2">{experientialBlock.title}</p>
          {experientialBlock.realWorldContext && (
            <p className="text-xs text-orange-700 italic mb-2">{experientialBlock.realWorldContext}</p>
          )}
          <p className="text-sm text-orange-900 leading-relaxed">
            {experientialBlock.standardsAlignment.parentNote}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="bg-white text-orange-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-orange-200">
              {experientialBlock.standardsAlignment.primary.id} · {experientialBlock.standardsAlignment.primary.domain}
            </span>
            {experientialBlock.standardsAlignment.secondary && (
              <span className="bg-white text-orange-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-orange-200">
                {experientialBlock.standardsAlignment.secondary.id} · {experientialBlock.standardsAlignment.secondary.domain}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Real-world learning library */}
      <details className="bg-white rounded-2xl border border-slate-100 shadow-sm">
        <summary className="px-4 py-3 text-sm font-medium text-slate-600 cursor-pointer select-none">
          🐴 Real-World Learning Library
        </summary>
        <div className="px-4 pb-4 pt-1 space-y-3 border-t border-slate-50">
          <p className="text-xs text-slate-400">
            Real activities from Makena's life, mapped to standards — available to pull into any day's plan.
          </p>
          {EXPERIENTIAL_LIBRARY.map((activity) => (
            <div key={activity.id} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
              <p className="text-sm font-semibold text-slate-700">{activity.title}</p>
              {activity.realWorldContext && (
                <p className="text-xs text-slate-500 mt-0.5">{activity.realWorldContext}</p>
              )}
              {activity.standardsAlignment && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="bg-white text-slate-600 text-[10px] font-semibold px-2 py-1 rounded-full border border-slate-200">
                    {activity.standardsAlignment.primary.id}
                  </span>
                  {activity.standardsAlignment.secondary && (
                    <span className="bg-white text-slate-600 text-[10px] font-semibold px-2 py-1 rounded-full border border-slate-200">
                      {activity.standardsAlignment.secondary.id}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </details>

      {/* EF highlights */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">🌱 Executive Function</p>
        <div className="space-y-3">
          {MAKENA.efDomains.filter((d) => d.trend === "improving").map((domain) => (
            <div key={domain.key} className="flex items-start gap-3">
              <span className={`text-sm font-bold mt-0.5 ${TREND_COLORS[domain.trend]}`}>
                {TREND_ICONS[domain.trend]}
              </span>
              <div>
                <p className="text-sm font-medium text-slate-700">{domain.plainLabel}</p>
                <p className="text-xs text-slate-500 mt-0.5">{domain.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Standards context */}
      <div className="bg-slate-800 text-white rounded-2xl p-4">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">CA Standards Context</p>
        <p className="text-sm text-slate-200 leading-relaxed">
          Makena is a freshman at {MAKENA.school}, working at approximately 6th grade level in
          reading and math — about a 3-year gap. This plan bridges that gap using California
          Common Core State Standards as the target. Every lesson maps to a specific standard and
          moves her forward along a documented skill ladder. This is real, standards-based work.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {[
            { label: "Enrolled Grade", value: MAKENA.enrolledGrade },
            { label: "Reading Level", value: MAKENA.readingLevelEstimate },
            { label: "Math Level", value: MAKENA.mathLevelEstimate },
            { label: "Standards Ref", value: "CA CCSS" },
          ].map((item) => (
            <div key={item.label} className="bg-slate-700 rounded-xl px-3 py-2">
              <p className="text-[10px] text-slate-400 uppercase font-medium">{item.label}</p>
              <p className="text-sm font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* School & support team status */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">School & Support Team</p>
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-slate-500">School</span>
          <span className="font-medium text-slate-700">{MAKENA.school}</span>
        </div>
        <ul className="space-y-2 mt-2">
          {MAKENA.programNotes.map((note, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
              <span className="flex-shrink-0 mt-0.5 text-sage-500">○</span>
              {note}
            </li>
          ))}
        </ul>
      </div>

      {/* What went well / needs refinement */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
          <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">What Went Well</p>
          <p className="text-[11px] text-green-600/70 mb-3">Confidence-building wins</p>
          <ul className="space-y-2">
            {MAKENA.recentWins.map((win, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-green-800">
                <span className="flex-shrink-0 mt-0.5">✓</span>
                {win}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-1">Needs Refinement</p>
          <p className="text-[11px] text-amber-600/70 mb-3">Areas to work on together</p>
          <ul className="space-y-2">
            {MAKENA.currentStruggleFlags.map((flag, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-amber-800">
                <span className="flex-shrink-0 mt-0.5">△</span>
                {flag}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommendation */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-2">For Tomorrow</p>
        <p className="text-sm text-amber-800 leading-relaxed">
          Continue at the same reading level — focus on expression and pace.
          Move to the next decimal problem type in math if today&apos;s accuracy is 80%+.
          If today was a rough day, use a light-day plan tomorrow and increase EF supports.
        </p>
      </div>

      {/* 30-day goals */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">30-Day Goals</p>
        <ul className="space-y-2">
          {MAKENA.goals30Day.map((goal, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
              <span className="flex-shrink-0 mt-0.5 text-sage-500">○</span>
              {goal}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
