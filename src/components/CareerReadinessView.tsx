import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Award,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Target,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export const CareerReadinessView: React.FC = () => {
  const { careerReadiness, profile, setCurrentView } = useApp();

  const isJobReady = careerReadiness.overallScore >= 90;

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Employment Benchmark
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Industry Hiring Bar</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Career Readiness Index
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Holistic assessment of your market competitiveness for{' '}
            <strong className="text-white font-semibold">{profile.targetRole || 'Data Analyst'}</strong>.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('roadmap')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-cyan-500/20"
        >
          <span>Continue Roadmap</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Hero Score Card */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            {/* Big Circular Score */}
            <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl bg-slate-950 border-2 border-emerald-500/40 p-2 shadow-2xl shadow-emerald-500/20">
              <div className="text-center">
                <span className="text-3xl sm:text-4xl font-extrabold text-white">
                  {careerReadiness.overallScore}
                </span>
                <span className="block text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                  / 100
                </span>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-300 mb-2">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>{isJobReady ? '🎯 JOB READY' : 'In Flight to Job Ready'}</span>
              </div>
              <h2 className="text-2xl font-bold text-white">
                {isJobReady
                  ? 'Congratulations! You Have Reached Job-Ready Status'
                  : "You're Making Strong Progress Toward Hireability"}
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                {careerReadiness.statusSummary}
              </p>
            </div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl shrink-0 text-right">
            <span className="text-xs text-slate-400 block mb-0.5">Benchmark Target</span>
            <span className="text-lg font-bold text-emerald-400">90 / 100 (Job Ready)</span>
            <span className="text-[11px] text-slate-500 block mt-1">
              {Math.max(90 - careerReadiness.overallScore, 0)} points remaining
            </span>
          </div>
        </div>
      </div>

      {/* Category Breakdown Bars */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
        <h3 className="text-base font-bold text-white">Five Pillars of Career Readiness</h3>

        <div className="space-y-4">
          {[
            { label: 'Technical Skills', val: careerReadiness.categories.technicalSkills, desc: 'SQL, Python, Power BI and statistical analysis fundamentals' },
            { label: 'Applied Projects', val: careerReadiness.categories.projects, desc: 'Verifiable multi-table analytical dashboards and Git repositories' },
            { label: 'Problem Solving', val: careerReadiness.categories.problemSolving, desc: 'Edge-case debugging, anti-joins, query optimization' },
            { label: 'Communication & Storytelling', val: careerReadiness.categories.communication, desc: 'Translating raw numbers into executive business impact' },
            { label: 'Technical Interview Readiness', val: careerReadiness.categories.interviewReadiness, desc: 'Live whiteboard querying and behavioral response confidence' },
          ].map((cat) => (
            <div key={cat.label} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200">{cat.label}</span>
                <span className="font-mono font-bold text-white">{cat.val}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${cat.val}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400">{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Next 3 Milestones to Reach 90% */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <div className="flex items-center gap-2 text-rose-400 text-sm font-bold">
            <AlertCircle className="h-4 w-4" />
            <span>Highest Remaining Career Gaps:</span>
          </div>
          <div className="space-y-2">
            {careerReadiness.biggestGaps.map((gap, i) => (
              <div
                key={i}
                className="p-3 rounded-xl border border-slate-800 bg-slate-950/60 text-xs text-slate-300 flex items-center gap-2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0" />
                <span>{gap}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
            <Target className="h-4 w-4" />
            <span>Complete These to Exceed 90% Readiness:</span>
          </div>
          <div className="space-y-2">
            {careerReadiness.recommendedMilestonesTo90.map((milestone, i) => (
              <div
                key={i}
                className="p-3 rounded-xl border border-slate-800 bg-slate-950/60 text-xs text-slate-300 flex items-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{milestone}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
