import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Milestone } from '../types';
import { MilestoneDetailModal } from './MilestoneDetailModal';
import {
  Compass,
  CheckCircle2,
  Clock,
  Lock,
  Flame,
  BrainCircuit,
  Sparkles,
  ChevronRight,
  Filter,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const RoadmapView: React.FC = () => {
  const {
    roadmap,
    selectedMilestone,
    setSelectedMilestone,
    setCurrentView,
    profile,
  } = useApp();

  const [phaseFilter, setPhaseFilter] = useState<string>('all');

  const filteredPhases =
    phaseFilter === 'all'
      ? roadmap.phases
      : roadmap.phases.filter((p) => p.id === phaseFilter);

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Personalized Pathway
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Adaptive Milestone Timeline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {roadmap.targetRole || profile.targetRole} Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Structured for {roadmap.totalWeeks} weeks at {profile.availableHoursPerDay || '2 hours/day'} pace.
          </p>
        </div>

        {/* Phase Filter Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setPhaseFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              phaseFilter === 'all'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            All Phases
          </button>
          {roadmap.phases.map((p) => (
            <button
              key={p.id}
              onClick={() => setPhaseFilter(p.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                phaseFilter === p.id
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Phase {p.phaseNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Adaptive notice indicator if milestones adapted */}
      {roadmap.adaptationCount > 0 && (
        <div className="rounded-xl border border-amber-500/40 bg-amber-950/20 p-3.5 flex items-center gap-3">
          <Flame className="h-5 w-5 text-amber-400 fill-amber-400 shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-amber-300">
              Roadmap adapted {roadmap.adaptationCount} {roadmap.adaptationCount === 1 ? 'time' : 'times'} by AI Engine:
            </span>{' '}
            <span className="text-slate-300">
              {roadmap.adaptationNotice || 'Custom booster sprints were inserted based on your assessment results.'}
            </span>
          </div>
        </div>
      )}

      {/* Timeline Phases */}
      <div className="space-y-12">
        {filteredPhases.map((phase) => (
          <div key={phase.id} className="relative">
            {/* Phase Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-9 w-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm">
                0{phase.phaseNumber}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">{phase.title}</h2>
                  <span className="text-xs font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                    {phase.timeframe}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{phase.description}</p>
              </div>
            </div>

            {/* Milestones Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {phase.milestones.map((milestone) => {
                const isCompleted = milestone.status === 'Completed';
                const isInProgress = milestone.status === 'In Progress';
                const isLocked = milestone.status === 'Locked';
                const isBooster = milestone.isBoosterSprint;

                return (
                  <div
                    key={milestone.id}
                    onClick={() => setSelectedMilestone(milestone)}
                    className={`group relative rounded-2xl border p-5 transition-all cursor-pointer flex flex-col justify-between ${
                      isBooster
                        ? 'border-amber-500/50 bg-gradient-to-b from-amber-950/25 to-slate-900/90 shadow-lg shadow-amber-950/20'
                        : isInProgress
                        ? 'border-cyan-500/50 bg-gradient-to-b from-cyan-950/20 to-slate-900/80 ring-1 ring-cyan-500/30 shadow-lg shadow-cyan-950/30'
                        : isCompleted
                        ? 'border-emerald-500/30 bg-slate-900/50 hover:border-emerald-500/50'
                        : isLocked
                        ? 'border-slate-800/80 bg-slate-950/40 opacity-70 hover:opacity-90'
                        : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            {milestone.weekRange}
                          </span>
                          <span className="text-xs font-semibold text-cyan-400">
                            {milestone.skill}
                          </span>
                        </div>

                        {/* Status Icon */}
                        <div>
                          {isBooster ? (
                            <span className="text-[11px] font-bold text-amber-300 bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Flame className="h-3 w-3 fill-amber-400" />
                              Booster Sprint
                            </span>
                          ) : isCompleted ? (
                            <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                              Completed
                            </span>
                          ) : isInProgress ? (
                            <span className="text-[11px] font-semibold text-cyan-300 bg-cyan-500/15 border border-cyan-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Clock className="h-3 w-3 text-cyan-400 animate-pulse" />
                              In Progress
                            </span>
                          ) : isLocked ? (
                            <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                              <Lock className="h-3 w-3" />
                              Locked
                            </span>
                          ) : (
                            <span className="text-[11px] font-medium text-slate-400">
                              Upcoming
                            </span>
                          )}
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                        {milestone.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">
                        {milestone.description}
                      </p>

                      {/* Topics */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {milestone.topics.slice(0, 3).map((topic) => (
                          <span
                            key={topic}
                            className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded"
                          >
                            {topic}
                          </span>
                        ))}
                        {milestone.topics.length > 3 && (
                          <span className="text-[10px] text-slate-500 px-1 py-0.5">
                            +{milestone.topics.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      {/* Progress Bar */}
                      <div className="space-y-1.5 mb-4">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-400">Progress</span>
                          <span className="font-semibold text-white">
                            {milestone.progressPercent}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-1.5 rounded-full ${
                              isBooster
                                ? 'bg-amber-400'
                                : isCompleted
                                ? 'bg-emerald-400'
                                : 'bg-cyan-400'
                            }`}
                            style={{ width: `${milestone.progressPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-800/80">
                        <span className="text-slate-400 text-[11px]">
                          ~{milestone.estimatedHours} study hours
                        </span>
                        <span className="text-cyan-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                          <span>Inspect</span>
                          <ChevronRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Milestone Detail Modal */}
      {selectedMilestone && (
        <MilestoneDetailModal
          milestone={selectedMilestone}
          onClose={() => setSelectedMilestone(null)}
        />
      )}
    </div>
  );
};
