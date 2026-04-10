"use client";
import { useState } from "react";
import Link from "next/link";
import { MCKENNA, TODAY_PLAN, SUBJECT_ICONS, SUBJECT_COLORS } from "@/lib/data";

const MOODS = [
  { emoji: "😊", label: "Good" },
  { emoji: "😐", label: "OK" },
  { emoji: "😔", label: "Tired" },
  { emoji: "😤", label: "Frustrated" },
];

export default function HomePage() {
  const [mood, setMood] = useState<string | null>(null);
  const [moodDone, setMoodDone] = useState(false);

  const completed = TODAY_PLAN.blocks.filter((b) => b.status === "completed").length;
  const total = TODAY_PLAN.blocks.length;
  const pct = Math.round((completed / total) * 100);

  const nextBlock = TODAY_PLAN.blocks.find((b) => b.status !== "completed" && b.status !== "skipped");

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="pt-6 space-y-5">
      {/* Header */}
      <div>
        <p className="text-sm text-slate-500 font-medium">{today}</p>
        <h1 className="text-2xl font-semibold text-slate-800 mt-0.5">
          Good morning, {MCKENNA.nickname}! ☀️
        </h1>
      </div>

      {/* Mood check-in */}
      {!moodDone && (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <p className="text-sm font-medium text-slate-600 mb-3">How are you feeling today?</p>
          <div className="flex gap-2">
            {MOODS.map((m) => (
              <button
                key={m.emoji}
                onClick={() => setMood(m.emoji)}
                className={`flex-1 flex flex-col items-center py-2 rounded-xl border-2 transition-all
                  ${mood === m.emoji
                    ? "border-teal-400 bg-teal-50"
                    : "border-slate-100 bg-slate-50 hover:border-slate-200"}`}
              >
                <span className="text-2xl">{m.emoji}</span>
                <span className="text-[10px] text-slate-500 mt-0.5">{m.label}</span>
              </button>
            ))}
          </div>
          {mood && (
            <button
              onClick={() => setMoodDone(true)}
              className="mt-3 w-full py-2 bg-teal-600 text-white rounded-xl text-sm font-medium hover:bg-teal-700 transition-colors"
            >
              Start My Day →
            </button>
          )}
        </div>
      )}

      {/* Progress */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium text-slate-700">Today's Plan</p>
          <p className="text-sm text-slate-500">{completed} of {total} done</p>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-teal-500 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        {pct === 100 && (
          <p className="text-center text-sm font-medium text-teal-600 mt-2">
            🎉 All done for today!
          </p>
        )}
      </div>

      {/* Next task CTA */}
      {nextBlock && (
        <Link href="/today">
          <div className="bg-teal-600 rounded-2xl p-4 shadow-sm text-white cursor-pointer hover:bg-teal-700 transition-colors">
            <p className="text-xs font-medium text-teal-200 uppercase tracking-wide mb-1">Up Next</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">{SUBJECT_ICONS[nextBlock.subject]} {nextBlock.title}</p>
                <p className="text-sm text-teal-100 mt-0.5">~{nextBlock.estimatedMinutes} min · {nextBlock.goal}</p>
              </div>
              <span className="text-2xl">→</span>
            </div>
          </div>
        </Link>
      )}

      {/* Block list */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide px-1">Today's Schedule</p>
        {TODAY_PLAN.blocks.map((block) => (
          <div
            key={block.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border
              ${block.status === "completed"
                ? "bg-slate-50 border-slate-100 opacity-60"
                : block.id === nextBlock?.id
                  ? "bg-white border-teal-200 shadow-sm"
                  : "bg-white border-slate-100"}`}
          >
            <span className="text-xl">{SUBJECT_ICONS[block.subject]}</span>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${block.status === "completed" ? "line-through text-slate-400" : "text-slate-800"}`}>
                {block.title}
              </p>
              <p className="text-xs text-slate-400">~{block.estimatedMinutes} min</p>
            </div>
            {block.status === "completed" && (
              <span className="text-green-500 text-lg">✓</span>
            )}
            {block.id === nextBlock?.id && (
              <span className="text-[10px] font-semibold text-teal-600 bg-teal-50 px-2 py-1 rounded-full border border-teal-200">
                NOW
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Focus cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-3">
          <p className="text-[10px] font-semibold text-sky-500 uppercase tracking-wide">Reading</p>
          <p className="text-sm text-sky-800 mt-1 font-medium">{TODAY_PLAN.readingFocus}</p>
        </div>
        <div className="bg-violet-50 border border-violet-200 rounded-2xl p-3">
          <p className="text-[10px] font-semibold text-violet-500 uppercase tracking-wide">Math</p>
          <p className="text-sm text-violet-800 mt-1 font-medium">{TODAY_PLAN.mathFocus}</p>
        </div>
      </div>

      {/* Parent snapshot */}
      <details className="bg-white rounded-2xl border border-slate-100 shadow-sm">
        <summary className="px-4 py-3 text-sm font-medium text-slate-600 cursor-pointer select-none">
          👩 Parent Snapshot
        </summary>
        <div className="px-4 pb-4 pt-1 space-y-2 border-t border-slate-50">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Reading confidence</span>
            <span className="font-medium text-slate-700">{"⭐".repeat(MCKENNA.confidenceReading)}{"☆".repeat(5 - MCKENNA.confidenceReading)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Math confidence</span>
            <span className="font-medium text-slate-700">{"⭐".repeat(MCKENNA.confidenceMath)}{"☆".repeat(5 - MCKENNA.confidenceMath)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Reading level</span>
            <span className="font-medium text-slate-700">{MCKENNA.readingLevelEstimate}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Enrolled grade</span>
            <span className="font-medium text-slate-700">{MCKENNA.enrolledGrade} grade</span>
          </div>
          <Link href="/parent" className="block mt-2 text-center text-sm text-teal-600 font-medium py-2 bg-teal-50 rounded-xl">
            View Full Parent Summary →
          </Link>
        </div>
      </details>
    </div>
  );
}
