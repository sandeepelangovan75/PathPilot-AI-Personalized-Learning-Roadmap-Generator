import React from 'react';
import { Milestone } from '../types';
import { useApp } from '../context/AppContext';
import {
  X,
  Clock,
  BookOpen,
  CheckCircle,
  ExternalLink,
  Flame,
  BrainCircuit,
  Lock,
  ArrowRight,
} from 'lucide-react';

interface MilestoneDetailModalProps {
  milestone: Milestone;
  onClose: () => void;
}

export const MilestoneDetailModal: React.FC<MilestoneDetailModalProps> = ({
  milestone,
  onClose,
}) => {
  const { updateMilestoneProgress, setCurrentView } = useApp();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-semibold uppercase text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
              {milestone.weekRange}
            </span>
            <span className="text-xs text-slate-400 font-medium">• {milestone.skill}</span>
            {milestone.isBoosterSprint && (
              <span className="text-xs font-bold text-amber-300 bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded flex items-center gap-1">
                <Flame className="h-3 w-3 fill-amber-400" />
                Adaptive Booster
              </span>
            )}
          </div>
          <h2 className="text-2xl font-bold text-white">{milestone.title}</h2>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">{milestone.description}</p>
        </div>

        {/* Progress Adjuster */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Milestone Completion</span>
            <span className="font-bold text-cyan-400">{milestone.progressPercent}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={milestone.progressPercent}
            onChange={(e) => updateMilestoneProgress(milestone.id, parseInt(e.target.value, 10))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>Estimated {milestone.estimatedHours} hours total</span>
            <span>Status: <strong className="text-slate-300">{milestone.status}</strong></span>
          </div>
        </div>

        {/* Learning Objectives */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Learning Objectives
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {milestone.learningObjectives?.map((obj, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Topics Breakdown */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Topics Covered
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {milestone.topics?.map((topic, i) => (
              <span
                key={i}
                className="text-xs bg-slate-800 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-700/60"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Curated Resources */}
        {milestone.resources && milestone.resources.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Recommended Learning Resources
            </h3>
            <div className="space-y-2">
              {milestone.resources.map((res) => (
                <a
                  key={res.id}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 rounded-xl border border-slate-800 bg-slate-950/40 hover:border-cyan-500/40 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {res.title}
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 text-slate-500 group-hover:text-cyan-400" />
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                    <span>{res.platform}</span>
                    <span>•</span>
                    <span>{res.estimatedMinutes} mins</span>
                    <span>•</span>
                    <span className="text-slate-300 italic">{res.selectionReason}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Practice Tasks */}
        {milestone.practiceTasks && milestone.practiceTasks.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Practice Drills & Challenges
            </h3>
            <div className="space-y-1.5">
              {milestone.practiceTasks.map((task, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg border border-slate-800 bg-slate-950/30 text-xs text-slate-300 flex items-center gap-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  <span>{task}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={() => {
              onClose();
              setCurrentView('assessment');
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-colors"
          >
            <BrainCircuit className="h-4 w-4" />
            <span>Take Skill Assessment</span>
          </button>
        </div>
      </div>
    </div>
  );
};
