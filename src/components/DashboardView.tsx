import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Flame,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Play,
  TrendingUp,
  BrainCircuit,
  Award,
  Layers,
  ChevronRight,
  ExternalLink,
  Zap,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    profile,
    roadmap,
    skillGaps,
    dailyPlan,
    careerReadiness,
    currentAssessment,
    assessmentHistory,
    setCurrentView,
    setSelectedMilestone,
    toggleDailyTask,
    adaptiveNotice,
    dismissAdaptiveNotice,
    setCopilotOpen,
    activeProject,
  } = useApp();

  const currentPhase = roadmap.phases?.[0];
  const currentMilestone =
    currentPhase?.milestones?.find((m) => m.status === 'In Progress') ||
    currentPhase?.milestones?.[0];

  const highestGaps = skillGaps.filter((g) => g.gapSeverity === 'High');

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* ADAPTIVE NOTIFICATION BANNER (When AI adapted the schedule) */}
      {adaptiveNotice && (
        <div className="relative overflow-hidden rounded-2xl border border-amber-500/50 bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/20 p-5 shadow-xl shadow-amber-950/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="h-10 w-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0 mt-0.5 sm:mt-0">
                <Flame className="h-5 w-5 fill-amber-400 text-amber-400 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                    AI Adaptive Engine Active
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  <span className="text-xs text-amber-300">Schedule Auto-Adjusted</span>
                </div>
                <h3 className="text-base font-bold text-white mt-0.5">{adaptiveNotice.title}</h3>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  {adaptiveNotice.message}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <button
                onClick={() => setCurrentView('roadmap')}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors"
              >
                View Adapted Roadmap
              </button>
              <button
                onClick={dismissAdaptiveNotice}
                className="p-2 text-slate-400 hover:text-white text-xs"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Welcome Back
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Adaptive Career Navigator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Good morning, {profile.name || 'Alex'}
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Your journey toward <strong className="text-white font-semibold">{profile.targetRole || 'Data Analyst'}</strong> is on track.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentView('assessment')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20"
          >
            <BrainCircuit className="h-4 w-4" />
            <span>Take Skill Assessment</span>
          </button>
          <button
            onClick={() => setCopilotOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-cyan-500/30 bg-cyan-950/40 hover:bg-cyan-950/70 text-cyan-300 text-xs font-semibold transition-all"
          >
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span>Ask Copilot</span>
          </button>
        </div>
      </div>

      {/* Key Metric Gauges Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Career Readiness */}
        <div
          onClick={() => setCurrentView('readiness')}
          className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-emerald-500/40 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Career Readiness</span>
            <Award className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">
              {careerReadiness.overallScore}
            </span>
            <span className="text-xs text-slate-500 font-medium">/ 100</span>
          </div>
          <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-1.5 rounded-full"
              style={{ width: `${careerReadiness.overallScore}%` }}
            />
          </div>
          <p className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Target: 90% Job Ready</span>
            <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform">→</span>
          </p>
        </div>

        {/* Metric 2: Overall Roadmap Progress */}
        <div
          onClick={() => setCurrentView('roadmap')}
          className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:border-cyan-500/40 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Roadmap Progress</span>
            <TrendingUp className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">
              {roadmap.overallProgress}%
            </span>
            <span className="text-xs text-slate-500 font-medium">completed</span>
          </div>
          <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-cyan-400 h-1.5 rounded-full"
              style={{ width: `${roadmap.overallProgress}%` }}
            />
          </div>
          <p className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Phase 1 of 3</span>
            <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform">→</span>
          </p>
        </div>

        {/* Metric 3: Learning Streak */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Active Streak</span>
            <Flame className="h-4 w-4 text-amber-400 fill-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">
              {profile.streakDays || 6}
            </span>
            <span className="text-xs text-slate-500 font-medium">days in a row</span>
          </div>
          <div className="mt-3 flex gap-1">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <div
                key={day}
                className={`h-1.5 flex-1 rounded-full ${
                  day <= (profile.streakDays || 6) ? 'bg-amber-400' : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
          <p className="mt-2 text-[11px] text-amber-300">
            Keep streak active today (+60m)
          </p>
        </div>

        {/* Metric 4: Weekly Hours Studied */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Weekly Hours</span>
            <Clock className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">
              {profile.hoursCompletedThisWeek || 9.5}h
            </span>
            <span className="text-xs text-slate-500 font-medium">/ 14h goal</span>
          </div>
          <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-indigo-400 h-1.5 rounded-full"
              style={{ width: `${Math.min(((profile.hoursCompletedThisWeek || 9.5) / 14) * 100, 100)}%` }}
            />
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            {profile.availableHoursPerDay || '2 hours/day'} pace
          </p>
        </div>
      </div>

      {/* Main Two-Column Row: Today's Plan & Current Milestone */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Today's Plan (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Today's AI Plan</h3>
                  <p className="text-xs text-slate-400">{dailyPlan.date} • {dailyPlan.totalMinutes} minutes allocated</p>
                </div>
              </div>
              <button
                onClick={() => setCurrentView('daily')}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
              >
                <span>Full Plan</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Today's Goal callout */}
            <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-3.5 mb-4">
              <span className="text-[10px] font-mono uppercase font-semibold text-emerald-400 tracking-wider">
                TODAY'S OBJECTIVE
              </span>
              <p className="text-xs font-medium text-slate-200 mt-0.5 leading-relaxed">
                "{dailyPlan.todayGoal}"
              </p>
            </div>

            {/* Task list with interactive checkmarks */}
            <div className="space-y-2.5">
              {dailyPlan.tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleDailyTask(task.id)}
                  className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                    task.completed
                      ? 'border-emerald-500/30 bg-emerald-950/15 text-slate-400'
                      : 'border-slate-800 bg-slate-950/40 hover:border-slate-700 text-slate-200'
                  }`}
                >
                  <button
                    type="button"
                    className={`mt-0.5 h-4 w-4 rounded flex items-center justify-center transition-colors ${
                      task.completed
                        ? 'bg-emerald-500 text-slate-950'
                        : 'border border-slate-600 hover:border-slate-400'
                    }`}
                  >
                    {task.completed && <CheckCircle2 className="h-3.5 w-3.5" />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className={`text-xs font-semibold ${
                          task.completed ? 'line-through text-slate-500' : 'text-slate-100'
                        }`}
                      >
                        {task.title}
                      </p>
                      <span className="text-[11px] font-mono text-slate-400 shrink-0">
                        {task.durationMinutes} min
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                      {task.objective}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>
              {dailyPlan.tasks.filter((t) => t.completed).length} of {dailyPlan.tasks.length} tasks completed
            </span>
            <span className="text-emerald-400 font-medium">Keep going!</span>
          </div>
        </div>

        {/* Right Column: Current Milestone (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-cyan-400" />
                Active Milestone
              </span>
              <span className="text-xs font-mono text-slate-400">{currentMilestone?.weekRange}</span>
            </div>

            <h3 className="text-lg font-bold text-white mb-1.5">{currentMilestone?.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {currentMilestone?.description}
            </p>

            <div className="space-y-3 mb-5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Milestone Progress</span>
                <span className="font-bold text-white">{currentMilestone?.progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-2 rounded-full"
                  style={{ width: `${currentMilestone?.progressPercent}%` }}
                />
              </div>
            </div>

            {/* Topics covered */}
            <div className="mb-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Core Topics:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {currentMilestone?.topics?.slice(0, 4).map((topic) => (
                  <span
                    key={topic}
                    className="text-[11px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded border border-slate-700/60"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-3 border-t border-slate-800/80">
            <button
              onClick={() => {
                setSelectedMilestone(currentMilestone || null);
                setCurrentView('roadmap');
              }}
              className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors text-center"
            >
              Milestone Details
            </button>
            <button
              onClick={() => setCurrentView('assessment')}
              className="flex-1 py-2 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-xs font-bold text-slate-950 transition-colors text-center"
            >
              Test Knowledge
            </button>
          </div>
        </div>
      </div>

      {/* Row: Skill Gap Snapshot & Active Portfolio Project */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top Skill Gaps (6 cols) */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-white text-base">Priority Skill Gaps</h3>
              <p className="text-xs text-slate-400">Skills requiring most elevation to match industry bar</p>
            </div>
            <button
              onClick={() => setCurrentView('skillgap')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {highestGaps.slice(0, 3).map((gap) => (
              <div
                key={gap.skill}
                className="p-3 rounded-xl border border-slate-800/90 bg-slate-950/50 flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{gap.skill}</span>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      High Gap
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">{gap.importanceReason}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[11px] text-slate-400">
                    <span className="text-amber-400">{gap.currentLevel}</span> →{' '}
                    <span className="text-emerald-400 font-bold">{gap.requiredLevel}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Portfolio Project Preview (6 cols) */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <BrainCircuit className="h-3.5 w-3.5" />
                Recommended Portfolio Project
              </span>
              <span className="text-[10px] bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-medium px-2 py-0.5 rounded-full">
                {activeProject.difficulty}
              </span>
            </div>

            <h4 className="font-bold text-white text-base mb-1">{activeProject.title}</h4>
            <p className="text-xs text-slate-400 line-clamp-2 mb-3">
              {activeProject.problemStatement}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {activeProject.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
            <span className="text-xs text-slate-400">
              {activeProject.tasks.filter((t) => t.done).length} of {activeProject.tasks.length} tasks ready
            </span>
            <button
              onClick={() => setCurrentView('projects')}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <span>Open Project Spec</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
