import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SkillGap, GapSeverity } from '../types';
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Filter,
  Sparkles,
  Layers,
  Zap,
} from 'lucide-react';

export const SkillGapView: React.FC = () => {
  const { skillGaps, profile, setCurrentView } = useApp();
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  // Compute overall match score from gaps
  const totalSkills = skillGaps.length;
  const highGaps = skillGaps.filter((g) => g.gapSeverity === 'High').length;
  const medGaps = skillGaps.filter((g) => g.gapSeverity === 'Medium').length;
  const lowGaps = skillGaps.filter((g) => g.gapSeverity === 'Low').length;

  // Weighted match formula: Low gap = 90% match, Med gap = 55% match, High gap = 20% match
  const matchPercentage =
    totalSkills > 0
      ? Math.round(
          ((lowGaps * 0.9 + medGaps * 0.55 + highGaps * 0.2) / totalSkills) * 100
        )
      : 45;

  const filteredGaps =
    categoryFilter === 'All'
      ? skillGaps
      : skillGaps.filter((g) => g.category === categoryFilter);

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Diagnostic Benchmark
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Current vs Required Level</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            AI Skill Gap Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Benchmarked against current industry hiring requirements for{' '}
            <strong className="text-white font-semibold">{profile.targetRole || 'Data Analyst'}</strong>.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('roadmap')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-cyan-500/20"
        >
          <span>View Bridging Roadmap</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Hero Match Score Summary Card */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Circular score gauge */}
            <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-slate-950 border border-slate-800 p-2 shadow-inner">
              <div className="text-center">
                <span className="text-2xl font-extrabold text-white">{matchPercentage}%</span>
                <span className="block text-[9px] uppercase font-bold text-cyan-400 tracking-wider">
                  Match
                </span>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-300 mb-1.5">
                <Sparkles className="h-3 w-3 text-cyan-400" />
                <span>Overall Career Alignment</span>
              </div>
              <h2 className="text-xl font-bold text-white">Current Career Match: {matchPercentage}%</h2>
              <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                You already possess a strong foundation in Excel and basic query concepts. Your biggest hurdles to clear are <strong className="text-rose-400">Advanced SQL</strong>, <strong className="text-rose-400">Power BI</strong>, and <strong className="text-amber-400">Statistics</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-center px-4 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-xs font-bold text-rose-400 block">{highGaps}</span>
              <span className="text-[10px] text-slate-400">High Gaps</span>
            </div>
            <div className="text-center px-4 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-xs font-bold text-amber-400 block">{medGaps}</span>
              <span className="text-[10px] text-slate-400">Medium Gaps</span>
            </div>
            <div className="text-center px-4 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-xs font-bold text-emerald-400 block">{lowGaps}</span>
              <span className="text-[10px] text-slate-400">Low Gaps</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {['All', 'Core', 'Tooling', 'Domain'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              categoryFilter === cat
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {cat} Skills
          </button>
        ))}
      </div>

      {/* Comparative Cards / Table */}
      <div className="space-y-4">
        {filteredGaps.map((gap) => {
          const isHigh = gap.gapSeverity === 'High';
          const isMed = gap.gapSeverity === 'Medium';

          return (
            <div
              key={gap.skill}
              className={`rounded-2xl border p-5 transition-all ${
                isHigh
                  ? 'border-rose-500/30 bg-gradient-to-r from-rose-950/15 via-slate-900/60 to-slate-900/40'
                  : isMed
                  ? 'border-amber-500/20 bg-gradient-to-r from-amber-950/10 via-slate-900/60 to-slate-900/40'
                  : 'border-slate-800 bg-slate-900/40'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Skill Details */}
                <div className="flex-1">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <h3 className="font-bold text-white text-base">{gap.skill}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {gap.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isHigh
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                          : isMed
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      }`}
                    >
                      {gap.gapSeverity} Severity
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                    {gap.importanceReason}
                  </p>
                </div>

                {/* Level Comparison */}
                <div className="flex items-center gap-4 bg-slate-950/60 border border-slate-800/80 p-3 rounded-xl shrink-0">
                  <div className="text-center min-w-16">
                    <span className="text-[10px] uppercase font-semibold text-slate-500 block mb-0.5">
                      Current
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        gap.currentLevel === 'None'
                          ? 'text-slate-500'
                          : gap.currentLevel === 'Beginner'
                          ? 'text-amber-400'
                          : 'text-cyan-400'
                      }`}
                    >
                      {gap.currentLevel}
                    </span>
                  </div>

                  <span className="text-slate-600 font-bold">→</span>

                  <div className="text-center min-w-16">
                    <span className="text-[10px] uppercase font-semibold text-slate-500 block mb-0.5">
                      Required
                    </span>
                    <span className="text-xs font-bold text-emerald-400">
                      {gap.requiredLevel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
