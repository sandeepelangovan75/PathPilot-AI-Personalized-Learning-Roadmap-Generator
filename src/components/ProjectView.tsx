import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FolderGit2,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  Code2,
  Database,
  Layers,
  Award,
  CheckCircle2,
} from 'lucide-react';

export const ProjectView: React.FC = () => {
  const { activeProject, toggleProjectTask, generateNewProject, profile } = useApp();
  const [copied, setCopied] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleCopyReadme = () => {
    navigator.clipboard.writeText(activeProject.githubReadmeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDifficultySwitch = async (level: 'Beginner' | 'Intermediate' | 'Advanced') => {
    setIsGenerating(true);
    await generateNewProject(level);
    setIsGenerating(false);
  };

  const completedSteps = activeProject.tasks.filter((t) => t.done).length;
  const progressPercent = Math.round((completedSteps / activeProject.tasks.length) * 100);

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Portfolio Engine
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Proof-of-Skill Centerpiece</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {activeProject.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Designed specifically to resolve your identified skill gaps in{' '}
            <strong className="text-white font-semibold">{profile.targetRole || 'Data Analyst'}</strong>.
          </p>
        </div>

        {/* Difficulty switcher buttons */}
        <div className="flex items-center gap-2">
          {(['Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
            <button
              key={lvl}
              disabled={isGenerating}
              onClick={() => handleDifficultySwitch(lvl)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                activeProject.difficulty === lvl
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Main Specs Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
            {activeProject.difficulty} Project
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
            {activeProject.status}
          </span>
          <span className="text-xs font-mono text-slate-400 ml-auto">
            {completedSteps} of {activeProject.tasks.length} steps completed ({progressPercent}%)
          </span>
        </div>

        {/* Problem Statement & Objective */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60">
            <span className="text-[10px] font-mono font-bold uppercase text-amber-400 tracking-wider block mb-1">
              THE PROBLEM STATEMENT
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeProject.problemStatement}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60">
            <span className="text-[10px] font-mono font-bold uppercase text-cyan-400 tracking-wider block mb-1">
              PROJECT OBJECTIVE
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeProject.objective}
            </p>
          </div>
        </div>

        {/* Tech Stack & Datasets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
              Technology Stack
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activeProject.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono bg-slate-800 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Dataset Suggestion
            </span>
            <p className="text-xs text-slate-300 font-medium">
              {activeProject.datasetSuggestion}
            </p>
          </div>
        </div>

        {/* Step-by-Step Task Checklist */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
            Step-by-Step Milestones
          </span>
          <div className="space-y-2.5">
            {activeProject.tasks.map((task) => (
              <div
                key={task.step}
                onClick={() => toggleProjectTask(task.step)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  task.done
                    ? 'border-emerald-500/30 bg-emerald-950/10'
                    : 'border-slate-800 bg-slate-950/50 hover:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  className={`mt-0.5 h-4 w-4 rounded flex items-center justify-center transition-colors shrink-0 ${
                    task.done
                      ? 'bg-emerald-500 text-slate-950'
                      : 'border border-slate-600 hover:border-slate-400'
                  }`}
                >
                  {task.done && <CheckCircle2 className="h-3.5 w-3.5" />}
                </button>

                <div className="flex-1 min-w-0">
                  <p
                    className={`text-xs font-bold ${
                      task.done ? 'line-through text-slate-500' : 'text-slate-100'
                    }`}
                  >
                    Step {task.step}: {task.title}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    {task.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resume Bullet Point Ready */}
        <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-950/20">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 mb-1">
            <Award className="h-4 w-4" />
            <span>Resume / LinkedIn Bullet Point (Ready to Paste):</span>
          </div>
          <p className="text-xs text-slate-200 italic font-medium leading-relaxed">
            "{activeProject.portfolioDescription}"
          </p>
        </div>

        {/* GitHub README Markdown Snippet */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              GitHub README.md Generator
            </span>
            <button
              onClick={handleCopyReadme}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Markdown</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto max-h-48 leading-relaxed">
            <code>{activeProject.githubReadmeSnippet}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
