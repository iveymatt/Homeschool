"use client";
import { MCKENNA, TODAY_PLAN, TREND_ICONS, TREND_COLORS } from "@/lib/data";

export default function ParentPage() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });

  const completed = TODAY_PLAN.blocks.filter((b) => b.status === "completed").length;
  const total = TODAY_PLAN.blocks.length;

  return (
    <div className="pt-6 space-y-5">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Parent Summary</p>
        <h1 className="text-2xl font-semibold text-slate-800 mt-0.5">McKenna Ray</h1>
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
            className="h-full bg-teal-500 rounded-full transition-all"
            style={{ width: `${Math.round((completed / total) * 100)}%` }}
          />
        </div>
        <div className="mt-3 space-y-1">
          {TODAY_PLAN.blocks.map((b) => (
            <div key={b.id} className="flex items-center gap-2 text-sm">
              <span>{b.status === "completed" ? "✅" : "⬜"}</span>
              <span className={b.status === "completed" ? "text-slate-500 line-through" : "text-slate-700"}>
                {b.title} (~{b.estimatedMinutes} min)
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reading summary */}
      <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4">
        <p className="text-xs font-semibold text-sky-500 uppercase tracking-wide mb-1">📖 Reading</p>
        <p className="text-sm font-medium text-sky-800 mb-2">{TODAY_PLAN.readingFocus}</p>
        <p className="text-sm text-sky-900 leading-relaxed">
          McKenna worked on oral reading fluency today — reading with expression at her current 6th grade level.
          She used the vocabulary anchor card to support word retention during the passage.
          This is aligned to California&apos;s RF.6.4b reading fluency standard and builds directly
          toward her goal of reaching 7th grade reading level.
        </p>
        <div className="mt-3 flex gap-3">
          <div className="flex-1 bg-white rounded-xl px-3 py-2 border border-sky-100">
            <p className="text-[10px] text-sky-500 font-medium uppercase">Level</p>
            <p className="text-sm font-semibold text-sky-800">{MCKENNA.readingLevelEstimate}</p>
          </div>
          <div className="flex-1 bg-white rounded-xl px-3 py-2 border border-sky-100">
            <p className="text-[10px] text-sky-500 font-medium uppercase">Confidence</p>
            <p className="text-sm font-semibold text-sky-800">{"⭐".repeat(MCKENNA.confidenceReading)}{"☆".repeat(5 - MCKENNA.confidenceReading)}</p>
          </div>
          <div className="flex-1 bg-white rounded-xl px-3 py-2 border border-sky-100">
            <p className="text-[10px] text-sky-500 font-medium uppercase">CA Standard</p>
            <p className="text-sm font-semibold text-sky-800">RF.6.4b</p>
          </div>
        </div>
      </div>

      {/* Math summary */}
      <div className="bg-violet-50 border border-violet-200 rounded-2xl p-4">
        <p className="text-xs font-semibold text-violet-500 uppercase tracking-wide mb-1">➕ Math</p>
        <p className="text-sm font-medium text-violet-800 mb-2">{TODAY_PLAN.mathFocus}</p>
        <p className="text-sm text-violet-900 leading-relaxed">
          McKenna worked on decimal operations today, a California 6th grade math standard (6.NS.3).
          Problems were presented one at a time with a reference strip visible throughout.
          This visual scaffold reduces cognitive load and lets her focus on the math itself
          rather than holding multiple steps in working memory at once.
        </p>
        <div className="mt-3 flex gap-3">
          <div className="flex-1 bg-white rounded-xl px-3 py-2 border border-violet-100">
            <p className="text-[10px] text-violet-500 font-medium uppercase">Level</p>
            <p className="text-sm font-semibold text-violet-800">{MCKENNA.mathLevelEstimate}</p>
          </div>
          <div className="flex-1 bg-white rounded-xl px-3 py-2 border border-violet-100">
            <p className="text-[10px] text-violet-500 font-medium uppercase">Confidence</p>
            <p className="text-sm font-semibold text-violet-800">{"⭐".repeat(MCKENNA.confidenceMath)}{"☆".repeat(5 - MCKENNA.confidenceMath)}</p>
          </div>
          <div className="flex-1 bg-white rounded-xl px-3 py-2 border border-violet-100">
            <p className="text-[10px] text-violet-500 font-medium uppercase">CA Standard</p>
            <p className="text-sm font-semibold text-violet-800">6.NS.3</p>
          </div>
        </div>
      </div>

      {/* EF highlights */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">🌱 Executive Function</p>
        <div className="space-y-3">
          {MCKENNA.efDomains.filter((d) => d.trend === "improving").map((domain) => (
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
          McKenna is enrolled in 8th grade and working at approximately 6th grade level in reading
          and math — a 2-year gap. This homeschool plan is closing that gap using California Common
          Core State Standards as the target. Every lesson maps to a specific standard and moves her
          forward along a documented skill ladder. This is real, standards-based curriculum.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {[
            { label: "Enrolled Grade", value: "8th" },
            { label: "Reading Level", value: MCKENNA.readingLevelEstimate },
            { label: "Math Level", value: MCKENNA.mathLevelEstimate },
            { label: "Standards Ref", value: "CA CCSS" },
          ].map((item) => (
            <div key={item.label} className="bg-slate-700 rounded-xl px-3 py-2">
              <p className="text-[10px] text-slate-400 uppercase font-medium">{item.label}</p>
              <p className="text-sm font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent wins */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
        <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2">Recent Wins</p>
        <ul className="space-y-2">
          {MCKENNA.recentWins.map((win, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-green-800">
              <span className="flex-shrink-0 mt-0.5">✓</span>
              {win}
            </li>
          ))}
        </ul>
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
          {MCKENNA.goals30Day.map((goal, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
              <span className="flex-shrink-0 mt-0.5 text-teal-500">○</span>
              {goal}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
