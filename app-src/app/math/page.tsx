"use client";
import { useState } from "react";

const PROBLEMS = [
  { id: 1, question: "3.4 + 2.7 = ?", answer: 6.1, hint: "Line up the decimal points. Add tenths first, then ones." },
  { id: 2, question: "5.8 + 1.6 = ?", answer: 7.4, hint: "8 tenths + 6 tenths = 14 tenths. Write 4, carry 1." },
  { id: 3, question: "4.25 + 3.50 = ?", answer: 7.75, hint: "Add hundredths first: 5+0=5. Then tenths: 2+5=7. Then ones: 4+3=7." },
];

const CONFIDENCE = [
  { emoji: "😊", label: "Easy", value: 5 },
  { emoji: "😐", label: "OK", value: 3 },
  { emoji: "😔", label: "Hard", value: 2 },
  { emoji: "😤", label: "Really hard", value: 1 },
];

export default function MathPage() {
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [results, setResults] = useState<("correct" | "incorrect" | null)[]>([null, null, null]);
  const [showHint, setShowHint] = useState(false);
  const [showRef, setShowRef] = useState(true);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const problem = PROBLEMS[current];
  const submitted = results[current] !== null;
  const allDone = current >= PROBLEMS.length;
  const correct = results.filter((r) => r === "correct").length;

  function checkAnswer() {
    const val = parseFloat(input);
    const isCorrect = Math.abs(val - problem.answer) < 0.001;
    const next = [...results];
    next[current] = isCorrect ? "correct" : "incorrect";
    setResults(next);
  }

  function nextProblem() {
    setCurrent((c) => c + 1);
    setInput("");
    setShowHint(false);
  }

  if (done) {
    return (
      <div className="pt-6">
        <div className="bg-violet-50 border border-violet-200 rounded-2xl p-8 text-center space-y-3">
          <p className="text-4xl">🎉</p>
          <p className="text-xl font-semibold text-violet-800">Math is done!</p>
          <p className="text-sm text-violet-700">
            You finished {correct} of {PROBLEMS.length} problems correctly. That&apos;s real math work.
          </p>
          <div className="pt-2 border-t border-violet-200">
            <p className="text-xs text-violet-600 font-medium">
              Take a break before enrichment. You earned it.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-6 space-y-4">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold text-violet-500 uppercase tracking-wide">➕ Math Block</p>
        <h1 className="text-2xl font-semibold text-slate-800 mt-0.5">Decimal Addition</h1>
        <p className="text-sm text-slate-500">~20 min · California 6th grade standard 6.NS.3</p>
      </div>

      {/* EF before */}
      {current === 0 && !submitted && (
        <div className="bg-teal-50 border border-teal-200 rounded-2xl px-4 py-3">
          <p className="text-xs font-semibold text-teal-600 mb-1">Before you start</p>
          <p className="text-sm text-teal-800">
            Today: {PROBLEMS.length} problems. One at a time. Don&apos;t look ahead —
            the reference strip is right there if you need it.
          </p>
        </div>
      )}

      {/* Progress indicator */}
      <div className="flex gap-2">
        {PROBLEMS.map((_, i) => (
          <div key={i} className={`flex-1 h-2 rounded-full transition-all
            ${i < current
              ? results[i] === "correct" ? "bg-green-400" : "bg-amber-400"
              : i === current ? "bg-violet-400" : "bg-slate-100"}`}
          />
        ))}
      </div>
      <p className="text-xs text-slate-400 -mt-2">Problem {Math.min(current + 1, PROBLEMS.length)} of {PROBLEMS.length}</p>

      {/* Reference strip */}
      <div>
        <button
          onClick={() => setShowRef(!showRef)}
          className="flex items-center gap-2 text-sm font-semibold text-violet-600 bg-violet-50 border border-violet-200 px-4 py-2 rounded-full hover:bg-violet-100 transition-colors"
        >
          📋 Reference Strip {showRef ? "▲" : "▼"}
        </button>
        {showRef && (
          <div className="mt-2 bg-violet-50 border border-violet-100 rounded-2xl p-4 space-y-2">
            <p className="text-xs font-semibold text-violet-600 uppercase tracking-wide">Decimal Addition Steps</p>
            <div className="space-y-1 text-sm text-violet-900">
              <p><span className="font-bold">1.</span> Line up the decimal points</p>
              <p><span className="font-bold">2.</span> Add from right to left</p>
              <p><span className="font-bold">3.</span> Carry if any column &gt; 9</p>
              <p><span className="font-bold">4.</span> Put the decimal in the answer</p>
            </div>
            <div className="border-t border-violet-200 pt-2">
              <p className="text-xs text-violet-600 font-medium">Example:</p>
              <p className="text-sm font-mono text-violet-900">  2.4<br />+ 1.8<br />─────<br />  4.2</p>
            </div>
          </div>
        )}
      </div>

      {/* Problem card — only show if not all done */}
      {!allDone && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <p className="text-center text-3xl font-bold text-slate-800 tracking-wide">{problem.question}</p>

          {/* Input */}
          <input
            type="number"
            step="0.01"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={submitted}
            placeholder="Your answer..."
            className="w-full text-center text-xl font-semibold border-2 border-slate-200 rounded-xl py-3
              focus:outline-none focus:border-violet-400 disabled:bg-slate-50 disabled:text-slate-500"
          />

          {/* Hint */}
          {!submitted && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="w-full text-sm text-slate-400 hover:text-slate-600 underline"
            >
              {showHint ? "Hide hint" : "Need a hint?"}
            </button>
          )}
          {showHint && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
              <p className="text-sm text-amber-800">{problem.hint}</p>
            </div>
          )}

          {/* Feedback */}
          {submitted && results[current] === "correct" && (
            <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-center">
              <p className="text-lg font-bold text-green-700">✓ That&apos;s right!</p>
              <p className="text-sm text-green-600">{problem.answer}. Nicely done.</p>
            </div>
          )}
          {submitted && results[current] === "incorrect" && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
              <p className="text-sm font-semibold text-amber-700 mb-1">Let&apos;s look at this together.</p>
              <p className="text-sm text-amber-800">The answer is <strong>{problem.answer}</strong>. {problem.hint}</p>
            </div>
          )}

          {/* Action buttons */}
          {!submitted ? (
            <button
              onClick={checkAnswer}
              disabled={!input}
              className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors
                ${input ? "bg-violet-600 text-white hover:bg-violet-700" : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={nextProblem}
              className="w-full py-3 bg-violet-600 text-white rounded-xl font-semibold text-sm hover:bg-violet-700 transition-colors"
            >
              {current < PROBLEMS.length - 1 ? `Next Problem →` : "See Results"}
            </button>
          )}
        </div>
      )}

      {/* Results + confidence check */}
      {allDone && !confidence && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
            <p className="text-sm font-semibold text-slate-700 mb-3">Results</p>
            {PROBLEMS.map((p, i) => (
              <div key={p.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <span className="text-sm text-slate-600">{p.question}</span>
                <span className={`text-sm font-bold ${results[i] === "correct" ? "text-green-600" : "text-amber-600"}`}>
                  {results[i] === "correct" ? `✓ ${p.answer}` : `${p.answer} (answer)`}
                </span>
              </div>
            ))}
            <div className="mt-3 pt-3 border-t border-slate-100 text-center">
              <p className="text-lg font-bold text-slate-800">{correct} of {PROBLEMS.length} correct</p>
            </div>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
            <p className="text-sm font-medium text-slate-700 mb-3">How did math feel today?</p>
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
        </div>
      )}

      {/* Final done */}
      {allDone && confidence && (
        <div className="space-y-3">
          <div className="bg-green-50 border border-green-200 rounded-2xl px-4 py-3">
            <p className="text-sm text-green-800">
              You did all {PROBLEMS.length} problems. Math is done for today.
            </p>
          </div>
          <button
            onClick={() => setDone(true)}
            className="w-full py-4 bg-violet-600 text-white rounded-2xl font-semibold text-base hover:bg-violet-700 transition-colors shadow-sm"
          >
            ✓ Mark Math Complete
          </button>
        </div>
      )}
    </div>
  );
}
