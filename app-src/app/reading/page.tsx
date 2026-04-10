"use client";
import { useState } from "react";

const VOCAB = [
  { word: "fluency", meaning: "reading smoothly, not stopping and starting a lot" },
  { word: "expression", meaning: "changing your voice to match what's happening in the story" },
  { word: "habitat", meaning: "where an animal lives and gets what it needs to survive" },
];

const STEPS = [
  "Open your book to the right page",
  "Read the first page out loud — take your time",
  "Take one slow breath",
  "Read the second page out loud",
  "Say one thing you remember from those pages",
];

const CONFIDENCE = [
  { emoji: "😊", label: "Easy", value: 5 },
  { emoji: "😐", label: "OK", value: 3 },
  { emoji: "😔", label: "Hard", value: 2 },
  { emoji: "😤", label: "Really hard", value: 1 },
];

export default function ReadingPage() {
  const [showVocab, setShowVocab] = useState(true);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [confidence, setConfidence] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const allDone = completedSteps.size === STEPS.length;

  function toggleStep(i: number) {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  if (done) {
    return (
      <div className="pt-6">
        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-8 text-center space-y-3">
          <p className="text-4xl">🎉</p>
          <p className="text-xl font-semibold text-teal-800">Reading is done!</p>
          <p className="text-sm text-teal-700">
            You read both pages. That&apos;s the whole assignment for today. Great work.
          </p>
          <div className="pt-2 border-t border-teal-200">
            <p className="text-xs text-teal-600 font-medium">Take a 3-minute break before math. You earned it.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-6 space-y-4">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold text-sky-500 uppercase tracking-wide">📖 Reading Block</p>
        <h1 className="text-2xl font-semibold text-slate-800 mt-0.5">Today&apos;s Reading</h1>
        <p className="text-sm text-slate-500">~20 min · Fluency with expression</p>
      </div>

      {/* EF — before */}
      <div className="bg-teal-50 border border-teal-200 rounded-2xl px-4 py-3">
        <p className="text-xs font-semibold text-teal-600 mb-1">Before you start</p>
        <p className="text-sm text-teal-800">
          Today you&apos;re reading just two pages. That&apos;s it.
          First step: open to the right page. Nothing else yet.
        </p>
      </div>

      {/* Vocab card */}
      <div>
        <button
          onClick={() => setShowVocab(!showVocab)}
          className="flex items-center gap-2 text-sm font-semibold text-sky-600 bg-sky-50 border border-sky-200 px-4 py-2 rounded-full hover:bg-sky-100 transition-colors"
        >
          📚 Vocabulary Card {showVocab ? "▲" : "▼"}
        </button>
        {showVocab && (
          <div className="mt-2 space-y-2">
            {VOCAB.map((v) => (
              <div key={v.word} className="bg-sky-50 border border-sky-100 rounded-xl px-4 py-3">
                <p className="text-sm font-bold text-sky-800">{v.word}</p>
                <p className="text-sm text-sky-700 mt-0.5">{v.meaning}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Steps */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-3">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Steps</p>
        {STEPS.map((step, i) => (
          <label key={i} className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={completedSteps.has(i)}
              onChange={() => toggleStep(i)}
              className="mt-0.5 flex-shrink-0"
            />
            <span className={`text-sm leading-relaxed ${completedSteps.has(i) ? "line-through text-slate-400" : "text-slate-700"}`}>
              {step}
            </span>
          </label>
        ))}
      </div>

      {/* Mid-lesson note */}
      {completedSteps.has(1) && !completedSteps.has(3) && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
          <p className="text-sm text-amber-800">
            Nice work on page one. Take one breath — then read page two.
          </p>
        </div>
      )}

      {/* Progress */}
      <div>
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          <span>{completedSteps.size} of {STEPS.length} steps</span>
          <span>{Math.round((completedSteps.size / STEPS.length) * 100)}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-sky-400 rounded-full transition-all"
            style={{ width: `${(completedSteps.size / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Confidence check */}
      {allDone && !confidence && (
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
          <p className="text-sm font-medium text-slate-700 mb-3">How did reading feel today?</p>
          <div className="grid grid-cols-2 gap-2">
            {CONFIDENCE.map((c) => (
              <button
                key={c.value}
                onClick={() => setConfidence(c.value)}
                className="py-3 flex flex-col items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <span className="text-2xl">{c.emoji}</span>
                <span className="text-xs text-slate-600">{c.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* After EF + Done */}
      {allDone && confidence && (
        <div className="space-y-3">
          <div className="bg-green-50 border border-green-200 rounded-2xl px-4 py-3">
            <p className="text-sm text-green-800">
              You read both pages. That is the whole reading assignment. You&apos;re done with reading today.
            </p>
          </div>
          <button
            onClick={() => setDone(true)}
            className="w-full py-4 bg-sky-600 text-white rounded-2xl font-semibold text-base hover:bg-sky-700 transition-colors shadow-sm"
          >
            ✓ Mark Reading Complete
          </button>
        </div>
      )}

      {/* Done button (before confidence) */}
      {!allDone && (
        <button
          disabled
          className="w-full py-4 bg-slate-100 text-slate-400 rounded-2xl font-semibold text-base cursor-not-allowed"
        >
          Complete all steps to finish
        </button>
      )}
    </div>
  );
}
