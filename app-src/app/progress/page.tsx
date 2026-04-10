"use client";
import { MCKENNA } from "@/lib/data";

const READING_LADDER = [
  { level: 1, skill: "Phonics & Decoding", grade: "3rd" },
  { level: 2, skill: "Sight Word Fluency", grade: "4th" },
  { level: 3, skill: "Oral Reading Fluency", grade: "5th" },
  { level: 4, skill: "Fluency with Expression", grade: "6th", current: true },
  { level: 5, skill: "Vocabulary in Context", grade: "6th–7th" },
  { level: 6, skill: "Main Idea & Comprehension", grade: "7th" },
  { level: 7, skill: "Inferencing", grade: "7th" },
  { level: 8, skill: "Text Structure Analysis", grade: "8th" },
  { level: 9, skill: "Author's Purpose & Craft", grade: "8th" },
];

const MATH_LADDER = [
  { level: 1, skill: "Number Sense", grade: "3rd–4th" },
  { level: 2, skill: "Addition & Subtraction", grade: "4th" },
  { level: 3, skill: "Multiplication & Division", grade: "4th–5th" },
  { level: 4, skill: "Fractions (intro)", grade: "4th–5th" },
  { level: 5, skill: "Fraction Operations", grade: "5th" },
  { level: 6, skill: "Decimals & Percentages", grade: "6th", current: true },
  { level: 7, skill: "Ratios & Proportions", grade: "6th" },
  { level: 8, skill: "Variables & Expressions", grade: "6th–7th" },
  { level: 9, skill: "One-Step Equations", grade: "7th" },
  { level: 10, skill: "Two-Step Equations", grade: "7th" },
  { level: 11, skill: "Geometry Basics", grade: "7th–8th" },
  { level: 12, skill: "Linear Equations", grade: "8th" },
];

function LadderBar({ levels, currentLevel, color }: {
  levels: { level: number; skill: string; grade: string; current?: boolean }[];
  currentLevel: number;
  color: string;
}) {
  return (
    <div className="space-y-1.5">
      {levels.map((item) => {
        const done = item.level < currentLevel;
        const active = item.level === currentLevel;
        return (
          <div key={item.level} className={`flex items-center gap-3 rounded-xl px-3 py-2 border
            ${active ? `${color} shadow-sm` : done ? "bg-slate-50 border-slate-100 opacity-60" : "bg-white border-slate-100"}`}>
            <span className={`text-xs font-bold w-5 text-center ${active ? "" : done ? "text-slate-400" : "text-slate-300"}`}>
              {done ? "✓" : active ? "▶" : item.level}
            </span>
            <div className="flex-1">
              <p className={`text-sm font-medium ${active ? "" : done ? "text-slate-400" : "text-slate-400"}`}>
                {item.skill}
              </p>
            </div>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full
              ${active ? "bg-white bg-opacity-60" : "text-slate-400"}`}>
              {item.grade}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function ProgressPage() {
  return (
    <div className="pt-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">Progress</h1>
        <p className="text-sm text-slate-500 mt-0.5">McKenna&apos;s skill ladder — updated each session</p>
      </div>

      {/* Streak + overview */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white border border-slate-100 rounded-2xl p-3 text-center shadow-sm">
          <p className="text-2xl font-bold text-teal-600">5</p>
          <p className="text-xs text-slate-500 mt-0.5">Day streak</p>
        </div>
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-3 text-center">
          <p className="text-2xl font-bold text-sky-700">Lv 4</p>
          <p className="text-xs text-sky-600 mt-0.5">Reading</p>
        </div>
        <div className="bg-violet-50 border border-violet-200 rounded-2xl p-3 text-center">
          <p className="text-2xl font-bold text-violet-700">Lv 6</p>
          <p className="text-xs text-violet-600 mt-0.5">Math</p>
        </div>
      </div>

      {/* Reading ladder */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">📖 Reading Ladder</h2>
          <span className="text-xs text-sky-600 font-medium bg-sky-50 border border-sky-200 px-2 py-1 rounded-full">
            Level {MCKENNA.readingLadderLevel} of {READING_LADDER.length}
          </span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full mb-3 overflow-hidden">
          <div
            className="h-full bg-sky-400 rounded-full"
            style={{ width: `${((MCKENNA.readingLadderLevel - 1) / (READING_LADDER.length - 1)) * 100}%` }}
          />
        </div>
        <LadderBar levels={READING_LADDER} currentLevel={MCKENNA.readingLadderLevel} color="bg-sky-50 border-sky-300 text-sky-800" />
      </div>

      {/* Math ladder */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">➕ Math Ladder</h2>
          <span className="text-xs text-violet-600 font-medium bg-violet-50 border border-violet-200 px-2 py-1 rounded-full">
            Level {MCKENNA.mathLadderLevel} of {MATH_LADDER.length}
          </span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full mb-3 overflow-hidden">
          <div
            className="h-full bg-violet-400 rounded-full"
            style={{ width: `${((MCKENNA.mathLadderLevel - 1) / (MATH_LADDER.length - 1)) * 100}%` }}
          />
        </div>
        <LadderBar levels={MATH_LADDER} currentLevel={MCKENNA.mathLadderLevel} color="bg-violet-50 border-violet-300 text-violet-800" />
      </div>

      {/* Recent wins */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
        <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-3">Recent Wins</p>
        <ul className="space-y-2">
          {MCKENNA.recentWins.map((win, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-green-800">
              <span className="flex-shrink-0 mt-0.5">🏆</span> {win}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
