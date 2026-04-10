"use client";
import { useState } from "react";
import { TODAY_PLAN, SUBJECT_ICONS, SUBJECT_COLORS, type Block } from "@/lib/data";

export default function TodayPage() {
  const [blocks, setBlocks] = useState<Block[]>(TODAY_PLAN.blocks);
  const [activeId, setActiveId] = useState<string | null>(
    TODAY_PLAN.blocks.find((b) => b.status !== "completed")?.id ?? null
  );
  const [showVocab, setShowVocab] = useState(false);
  const [showEF, setShowEF] = useState(false);
  const [confidenceMap, setConfidenceMap] = useState<Record<string, number>>({});
  const [celebrateId, setCelebrateId] = useState<string | null>(null);

  const completed = blocks.filter((b) => b.status === "completed").length;
  const total = blocks.length;
  const pct = Math.round((completed / total) * 100);

  function toggleStep(blockId: string, stepId: number) {
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === blockId
          ? { ...b, steps: b.steps.map((s) => s.id === stepId ? { ...s, completed: !s.completed } : s) }
          : b
      )
    );
  }

  function markBlockDone(blockId: string) {
    setBlocks((prev) =>
      prev.map((b) => b.id === blockId ? { ...b, status: "completed" } : b)
    );
    setCelebrateId(blockId);
    setTimeout(() => {
      setCelebrateId(null);
      const next = blocks.find((b) => b.status !== "completed" && b.id !== blockId);
      if (next) setActiveId(next.id);
    }, 2000);
    setShowVocab(false);
    setShowEF(false);
  }

  const CONF = ["😊 Easy", "😐 OK", "😔 Hard", "😤 Really hard"];

  return (
    <div className="pt-6 space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">Today's Plan</h1>
        <p className="text-sm text-slate-500 mt-0.5">{TODAY_PLAN.date}</p>
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          <span>{completed} of {total} complete</span>
          <span>{pct}%</span>
        </div>
        <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-teal-500 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* All done state */}
      {pct === 100 && (
        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5 text-center">
          <p className="text-3xl mb-2">🎉</p>
          <p className="text-lg font-semibold text-teal-800">You finished today's plan!</p>
          <p className="text-sm text-teal-600 mt-1">Great work, McKenna. You did it.</p>
        </div>
      )}

      {/* Block list */}
      {blocks.map((block) => {
        const isActive = block.id === activeId;
        const isDone = block.status === "completed";
        const isCelebrating = celebrateId === block.id;
        const allStepsDone = block.steps.every((s) => s.completed);
        const hasConf = ["reading", "math"].includes(block.subject);

        return (
          <div key={block.id} className="rounded-2xl overflow-hidden border shadow-sm">
            {/* Block header */}
            <button
              onClick={() => setActiveId(isActive ? null : block.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors
                ${isDone ? "bg-slate-50" : isActive ? "bg-white" : "bg-white hover:bg-slate-50"}`}
            >
              <span className="text-xl">{SUBJECT_ICONS[block.subject]}</span>
              <div className="flex-1">
                <p className={`font-medium ${isDone ? "line-through text-slate-400" : "text-slate-800"}`}>
                  {block.title}
                </p>
                <p className="text-xs text-slate-400">~{block.estimatedMinutes} min · {block.goal}</p>
              </div>
              {isDone
                ? <span className="text-green-500 text-xl">✓</span>
                : isActive
                  ? <span className="text-slate-400 text-lg">▲</span>
                  : <span className="text-slate-300 text-lg">▼</span>}
            </button>

            {/* Celebration */}
            {isCelebrating && (
              <div className="bg-teal-50 border-t border-teal-100 px-4 py-4 text-center">
                <p className="text-2xl mb-1">🎉</p>
                <p className="font-semibold text-teal-800">{block.title} is done!</p>
                <p className="text-sm text-teal-600">Great work. Moving to the next block.</p>
              </div>
            )}

            {/* Expanded content */}
            {isActive && !isDone && !isCelebrating && (
              <div className="border-t border-slate-100 bg-white px-4 py-4 space-y-4">

                {/* EF before prompt */}
                {block.efSupport?.before && (
                  <div className="bg-teal-50 border border-teal-100 rounded-xl px-3 py-2">
                    <p className="text-xs font-semibold text-teal-600 mb-0.5">Before you start</p>
                    <p className="text-sm text-teal-800">{block.efSupport.before}</p>
                  </div>
                )}

                {/* Vocab anchor (reading only) */}
                {block.vocabularyAnchors && (
                  <div>
                    <button
                      onClick={() => setShowVocab(!showVocab)}
                      className="text-xs font-semibold text-sky-600 bg-sky-50 border border-sky-200 px-3 py-1.5 rounded-full"
                    >
                      {showVocab ? "Hide" : "Show"} Vocabulary Card 📚
                    </button>
                    {showVocab && (
                      <div className="mt-2 space-y-2">
                        {block.vocabularyAnchors.map((v) => (
                          <div key={v.word} className="bg-sky-50 border border-sky-100 rounded-xl px-3 py-2">
                            <p className="text-sm font-bold text-sky-800">{v.word}</p>
                            <p className="text-sm text-sky-700">{v.meaning}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Steps */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Steps</p>
                  {block.steps.map((step) => (
                    <label key={step.id} className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={step.completed}
                        onChange={() => toggleStep(block.id, step.id)}
                        className="mt-0.5 flex-shrink-0"
                      />
                      <span className={`text-sm ${step.completed ? "line-through text-slate-400" : "text-slate-700"}`}>
                        {step.text}
                      </span>
                    </label>
                  ))}
                </div>

                {/* During support */}
                {block.efSupport?.during && (
                  <div className="bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
                    <p className="text-xs font-semibold text-amber-600 mb-0.5">While you work</p>
                    <p className="text-sm text-amber-800">{block.efSupport.during}</p>
                  </div>
                )}

                {/* Adaptation note */}
                {block.adaptation && (
                  <p className="text-xs text-slate-400 italic">{block.adaptation}</p>
                )}

                {/* Confidence check (reading + math) */}
                {hasConf && allStepsDone && !confidenceMap[block.id] && (
                  <div className="border-t border-slate-100 pt-3">
                    <p className="text-sm font-medium text-slate-600 mb-2">How did that feel?</p>
                    <div className="grid grid-cols-2 gap-2">
                      {CONF.map((c, i) => (
                        <button
                          key={c}
                          onClick={() => setConfidenceMap((m) => ({ ...m, [block.id]: i + 1 }))}
                          className="py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* After support */}
                {block.efSupport?.after && allStepsDone && (
                  <div className="bg-green-50 border border-green-100 rounded-xl px-3 py-2">
                    <p className="text-sm text-green-800">{block.efSupport.after}</p>
                  </div>
                )}

                {/* Done button */}
                <button
                  onClick={() => markBlockDone(block.id)}
                  disabled={!allStepsDone}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all
                    ${allStepsDone
                      ? "bg-teal-600 text-white hover:bg-teal-700 shadow-sm"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}
                >
                  {allStepsDone ? `✓ Mark ${block.title} Done` : `Complete all steps to continue`}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
