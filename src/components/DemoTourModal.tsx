import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Sparkles,
  ArrowRight,
  Flame,
  CheckCircle,
  BrainCircuit,
  Bot,
  Award,
  Layers,
  CalendarCheck,
} from 'lucide-react';

export const DemoTourModal: React.FC = () => {
  const {
    demoTourOpen,
    setDemoTourOpen,
    loadDemoMode,
    setCurrentView,
    setCopilotOpen,
  } = useApp();

  if (!demoTourOpen) return null;

  const tourSteps = [
    {
      num: '01',
      title: 'Load Complete Alex Demo Profile',
      desc: 'Sets up Alex Rivera (Goal: Data Analyst, 2h/day, 12 weeks, Beginner in SQL/Python/Stats).',
      actionText: 'Load Demo Data',
      action: () => loadDemoMode(),
    },
    {
      num: '02',
      title: 'Inspect AI Skill Gap Benchmark',
      desc: 'See current 47% career match, High vs Low gaps, and natural language diagnosis.',
      actionText: 'View Skill Gaps',
      action: () => setCurrentView('skillgap'),
    },
    {
      num: '03',
      title: 'Explore Structured Milestone Roadmap',
      desc: 'View Phase 1 to Phase 3 chronological milestones, estimated study hours, and resources.',
      actionText: 'Open Roadmap',
      action: () => setCurrentView('roadmap'),
    },
    {
      num: '04',
      title: "Review Today's 60-Minute Plan",
      desc: 'See realistic daily micro-plan (20m Learn, 25m Practice, 15m Assess).',
      actionText: "View Today's Plan",
      action: () => setCurrentView('daily'),
    },
    {
      num: '05',
      title: 'Test Adaptive Engine (The AI Wow Factor)',
      desc: 'Take the SQL Assessment, click "Simulate Gap Score (42%)" to watch the AI automatically insert a 3-Day JOIN Booster Sprint!',
      actionText: 'Launch Assessment',
      action: () => setCurrentView('assessment'),
      highlight: true,
    },
    {
      num: '06',
      title: 'Inspect Generated Portfolio Project',
      desc: 'Check the E-Commerce Analytics project spec, checklist, and GitHub README generator.',
      actionText: 'View Project',
      action: () => setCurrentView('projects'),
    },
    {
      num: '07',
      title: 'Review Career Readiness Index',
      desc: 'Check the 78/100 score, 5 readiness pillars, and path toward 🎯 Job Ready.',
      actionText: 'View Readiness',
      action: () => setCurrentView('readiness'),
    },
    {
      num: '08',
      title: 'Ask SkillPilot Copilot',
      desc: 'Chat with the AI assistant about today’s plan, skipping topics, or internship readiness.',
      actionText: 'Open Copilot',
      action: () => setCopilotOpen(true),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-purple-500/40 bg-slate-900 p-6 sm:p-8 shadow-2xl relative space-y-6">
        {/* Close Button */}
        <button
          onClick={() => setDemoTourOpen(false)}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 border border-purple-500/30 px-3 py-1 text-xs font-semibold text-purple-300 mb-2">
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            <span>AI Battle & Hackathon Walkthrough Guide</span>
          </div>
          <h2 className="text-2xl font-bold text-white">2-Minute Judge Demonstration Flow</h2>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Follow these sequential steps to evaluate all core features of SkillPilot AI — from skill gap analysis to real-time adaptive schedule restructuring.
          </p>
        </div>

        {/* Steps List */}
        <div className="space-y-3">
          {tourSteps.map((step) => (
            <div
              key={step.num}
              className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                step.highlight
                  ? 'border-amber-500/50 bg-amber-950/20 shadow-md shadow-amber-950/30'
                  : 'border-slate-800 bg-slate-950/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-xs font-mono font-bold text-purple-400 px-2 py-0.5 rounded bg-purple-500/10 shrink-0 mt-0.5">
                  {step.num}
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{step.title}</span>
                    {step.highlight && (
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-mono font-semibold">
                        ★ Critical Feature
                      </span>
                    )}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  step.action();
                  setDemoTourOpen(false);
                }}
                className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors self-end sm:self-center ${
                  step.highlight
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                {step.actionText} →
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
          <span>Self-contained and fully functional with or without external API keys.</span>
          <button
            onClick={() => setDemoTourOpen(false)}
            className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs"
          >
            Got It, Let's Explore
          </button>
        </div>
      </div>
    </div>
  );
};
