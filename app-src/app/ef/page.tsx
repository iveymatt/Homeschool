"use client";
import { useState } from "react";
import { MCKENNA, TREND_ICONS, TREND_COLORS, SCORE_LABELS, SCORE_COLORS, type EFDomain } from "@/lib/data";

function ScorePip({ filled }: { filled: boolean }) {
  return (
    <span className={`inline-block w-4 h-4 rounded-full border-2 ${filled ? "bg-teal-500 border-teal-500" : "bg-white border-slate-300"}`} />
  );
}

function DomainRow({ domain, onSelect }: { domain: EFDomain; onSelect: (d: EFDomain) => void }) {
  return (
    <button
      onClick={() => onSelect(domain)}
      className="w-full flex items-center gap-3 bg-white border border-slate-100 rounded-xl px-4 py-3 hover:border-teal-200 hover:shadow-sm transition-all text-left"
    >
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-800">{domain.plainLabel}</p>
      </div>
      {/* Score pips */}
      <div className="flex gap-1 mr-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <ScorePip key={i} filled={i < domain.score} />
        ))}
      </div>
      {/* Trend */}
      <span className={`text-sm font-bold ${TREND_COLORS[domain.trend]}`}>
        {TREND_ICONS[domain.trend]}
      </span>
    </button>
  );
}

function DomainDetail({ domain, onBack }: { domain: EFDomain; onBack: () => void }) {
  const [support, setSupport] = useState(domain.supportLevel);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="text-teal-600 font-medium text-sm">← Back</button>
        <h2 className="text-lg font-semibold text-slate-800">{domain.plainLabel}</h2>
      </div>

      {/* Score + trend */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">Independence Score</p>
            <div className="flex gap-1.5 mt-1.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <ScorePip key={i} filled={i < domain.score} />
              ))}
            </div>
          </div>
          <div className="text-right">
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${SCORE_COLORS[domain.score]}`}>
              {SCORE_LABELS[domain.score]}
            </span>
            <p className={`text-sm font-bold mt-1 ${TREND_COLORS[domain.trend]}`}>
              {TREND_ICONS[domain.trend]} {domain.trend}
            </p>
          </div>
        </div>

        {/* Last 5 sessions */}
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-wide font-medium mb-2">Last 5 Sessions</p>
          <div className="flex gap-2">
            {domain.recentScores.map((s, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-md bg-teal-500 opacity-80"
                  style={{ height: `${(s / 4) * 48 + 8}px` }}
                />
                <span className="text-[10px] text-slate-400">{s}/4</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What this means */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">What this means</p>
        <p className="text-sm text-slate-700 leading-relaxed">{domain.supportDescription}</p>
      </div>

      {/* What we're doing */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">What we&apos;re doing now</p>
        <ul className="space-y-2">
          {domain.whatWeAreDoing.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
              <span className="text-teal-500 mt-0.5 flex-shrink-0">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Notes */}
      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
        <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-1">Guide notes</p>
        <p className="text-sm text-amber-800">{domain.notes}</p>
      </div>

      {/* Parent support level control */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Support Level</p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSupport((s) => Math.max(0, s - 1))}
            className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 font-bold text-lg hover:bg-slate-200 transition-colors"
          >
            −
          </button>
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-teal-600">{support}</p>
            <p className="text-xs text-slate-400">
              {support === 0 ? "High scaffold" : support === 1 ? "Moderate prompts" : support === 2 ? "Light cues" : "Monitor only"}
            </p>
          </div>
          <button
            onClick={() => setSupport((s) => Math.min(3, s + 1))}
            className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 font-bold text-lg hover:bg-slate-200 transition-colors"
          >
            +
          </button>
        </div>
        <p className="text-xs text-slate-400 text-center mt-2">Updated at next session</p>
      </div>
    </div>
  );
}

export default function EFPage() {
  const [selected, setSelected] = useState<EFDomain | null>(null);
  const domains = MCKENNA.efDomains;

  const overallScore = domains.reduce((sum, d) => sum + d.score, 0) / domains.length;
  const improving = domains.filter((d) => d.trend === "improving").length;

  if (selected) {
    return (
      <div className="pt-6">
        <DomainDetail domain={selected} onBack={() => setSelected(null)} />
      </div>
    );
  }

  return (
    <div className="pt-6 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">Executive Function</h1>
        <p className="text-sm text-slate-500 mt-0.5">McKenna's independence across 9 skill areas</p>
      </div>

      {/* Overall card */}
      <div className="bg-teal-600 rounded-2xl p-4 text-white shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-teal-200 uppercase tracking-wide font-medium">Overall Score</p>
            <p className="text-3xl font-bold mt-0.5">{overallScore.toFixed(1)} <span className="text-lg text-teal-200">/ 4</span></p>
          </div>
          <div className="text-right">
            <p className="text-xs text-teal-200 uppercase tracking-wide font-medium">Improving</p>
            <p className="text-3xl font-bold mt-0.5">{improving} <span className="text-lg text-teal-200">areas</span></p>
          </div>
        </div>
        <div className="mt-3 h-2.5 bg-teal-700 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full" style={{ width: `${(overallScore / 4) * 100}%` }} />
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-3 text-xs text-slate-500">
        <span className="flex items-center gap-1"><span className="text-green-600 font-bold">↑</span> Improving</span>
        <span className="flex items-center gap-1"><span className="text-slate-500 font-bold">→</span> Stable</span>
        <span className="flex items-center gap-1"><span className="text-amber-600 font-bold">↓</span> Declining</span>
        <span className="flex items-center gap-1"><span>●●●○○</span> Score out of 4</span>
      </div>

      {/* Score key */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { score: "0–1", label: "High Support", color: "bg-sky-50 text-sky-700 border-sky-200" },
          { score: "2", label: "Building", color: "bg-teal-50 text-teal-700 border-teal-200" },
          { score: "3", label: "Almost There", color: "bg-green-50 text-green-700 border-green-200" },
          { score: "4", label: "Independent", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
        ].map((item) => (
          <div key={item.score} className={`border rounded-xl px-3 py-2 text-xs font-medium ${item.color}`}>
            <span className="font-bold">{item.score}</span> = {item.label}
          </div>
        ))}
      </div>

      {/* Domain list */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Tap any skill for details</p>
        {domains.map((domain) => (
          <DomainRow key={domain.key} domain={domain} onSelect={setSelected} />
        ))}
      </div>
    </div>
  );
}
