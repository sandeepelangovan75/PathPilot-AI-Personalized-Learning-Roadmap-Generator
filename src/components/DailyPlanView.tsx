import React from 'react';
import { useApp } from '../context/AppContext';
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  BrainCircuit,
  BookOpen,
  Code2,
  Sparkles,
  Flame,
  ArrowRight,
} from 'lucide-react';

export const DailyPlanView: React.FC = () => {
  const { dailyPlan, toggleDailyTask, setCurrentView, profile } = useApp();

  const completedCount = dailyPlan.tasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / dailyPlan.tasks.length) * 100);

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'Learn':
        return BookOpen;
      case 'Practice':
        return Code2;
      case 'Assess':
        return BrainCircuit;
      default:
        return Sparkles;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Daily Action Blueprint
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">What's My Plan Today?</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Today's Learning Plan
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Calibrated for {profile.availableHoursPerDay || '2 hours/day'} • Focus Skill:{' '}
            <strong className="text-cyan-300 font-semibold">{dailyPlan.focusSkill}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-300">
            <Flame className="h-4 w-4 fill-amber-400 text-amber-400 animate-pulse" />
            <span>{profile.streakDays || 6} Day Streak Active</span>
          </div>
        </div>
      </div>

      {/* Main Goal Card */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/30 p-6 shadow-xl relative">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-300">
              <Sparkles className="h-3 w-3 text-cyan-400" />
              <span>{dailyPlan.date} — {dailyPlan.totalMinutes} MINUTES ALLOCATED</span>
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white max-w-2xl leading-snug">
              Today's Goal: "{dailyPlan.todayGoal}"
            </h2>
            {dailyPlan.motivationQuote && (
              <p className="text-xs text-slate-400 italic">
                "{dailyPlan.motivationQuote}"
              </p>
            )}
          </div>

          {/* Progress circle */}
          <div className="flex items-center gap-4 bg-slate-950/70 border border-slate-800 p-4 rounded-xl shrink-0">
            <div className="text-right">
              <span className="text-xl font-extrabold text-white">{completedCount} / {dailyPlan.tasks.length}</span>
              <span className="block text-[11px] text-slate-400">Tasks Complete</span>
            </div>
            <div className="h-12 w-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-extrabold text-sm">
              {progressPercent}%
            </div>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Actionable Tasks for Today:
        </h3>

        <div className="space-y-3">
          {dailyPlan.tasks.map((task, idx) => {
            const Icon = getTaskIcon(task.type);
            return (
              <div
                key={task.id}
                onClick={() => toggleDailyTask(task.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                  task.completed
                    ? 'border-emerald-500/30 bg-emerald-950/10'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                {/* Checkbox */}
                <button
                  type="button"
                  className={`mt-1 h-5 w-5 rounded-md flex items-center justify-center transition-colors shrink-0 ${
                    task.completed
                      ? 'bg-emerald-500 text-slate-950'
                      : 'border-2 border-slate-600 hover:border-slate-400'
                  }`}
                >
                  {task.completed && <CheckCircle2 className="h-4 w-4" />}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                        Task 0{idx + 1}
                      </span>
                      <h4
                        className={`text-base font-bold ${
                          task.completed ? 'line-through text-slate-500' : 'text-white'
                        }`}
                      >
                        {task.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{task.durationMinutes} min</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-3">
                    {task.objective}
                  </p>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {task.type} Module
                    </span>
                    {task.type === 'Assess' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentView('assessment');
                        }}
                        className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                      >
                        <span>Launch Assessment</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
