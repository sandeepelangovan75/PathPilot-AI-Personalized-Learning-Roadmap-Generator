import React from 'react';
import { useApp } from '../context/AppContext';
import { CAREER_ROLES } from '../lib/constants';
import {
  Compass,
  ArrowRight,
  Sparkles,
  BarChart3,
  GitFork,
  BrainCircuit,
  Award,
  Zap,
  CheckCircle,
  Clock,
  Play,
  Layers,
  Flame,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentView, loadDemoMode, setDemoTourOpen } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Background radial glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-cyan-600/15 via-indigo-600/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[40rem] -left-48 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[60rem] -right-48 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Innovation Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-300 mb-8 backdrop-blur-md shadow-lg shadow-cyan-500/10 animate-fade-in">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          <span>Your Goal. Your Skills. Your AI-Powered Path.</span>
          <span className="h-1 w-1 rounded-full bg-cyan-400" />
          <span className="text-cyan-200">Adaptive Milestone Engine</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1] mb-6 font-['Plus_Jakarta_Sans']">
          Turn Your Career Goal Into a{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
            Personalized Learning Path.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
          Tell SkillPilot AI where you are and where you want to go. Our AI analyzes your skill gaps and builds a time-bound roadmap designed specifically for you — that adapts as you learn.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
          <button
            onClick={() => setCurrentView('onboarding')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold px-8 py-4 text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all cursor-pointer group"
          >
            <span>Build My Roadmap</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={loadDemoMode}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold px-7 py-4 text-base backdrop-blur-md transition-all cursor-pointer"
          >
            <Play className="h-4 w-4 text-cyan-400 fill-cyan-400" />
            <span>Explore Demo</span>
          </button>
        </div>

        {/* Hackathon Judge Banner */}
        <div className="max-w-3xl mx-auto rounded-2xl border border-purple-500/30 bg-purple-950/20 backdrop-blur-md p-4 text-left flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl shadow-purple-950/30">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Competition Demo Flow</p>
              <p className="text-xs text-purple-200/80">
                Test the full flow in 2 minutes: Onboarding → Skill Gap → Adaptive Assessment test (intentional weak score) → Automatic Booster insertion!
              </p>
            </div>
          </div>
          <button
            onClick={() => setDemoTourOpen(true)}
            className="shrink-0 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-colors"
          >
            View Demo Guide
          </button>
        </div>

        {/* Visual Roadmap Preview Card */}
        <div className="mt-14 relative mx-auto max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-6 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-rose-500" />
              <div className="h-3 w-3 rounded-full bg-amber-500" />
              <div className="h-3 w-3 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono text-slate-400 ml-2">skillpilot-roadmap-preview.ai</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Personalized for Data Analyst</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {/* Step 1 Preview Card */}
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Weeks 1–2 • Completed</span>
                <CheckCircle className="h-4 w-4 text-emerald-400" />
              </div>
              <h4 className="font-bold text-white text-sm mb-1">SQL Foundations & Relational Filters</h4>
              <p className="text-xs text-slate-400 mb-3">SELECT, WHERE, GROUP BY, aggregations on retail database.</p>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-400 h-1.5 rounded-full w-full" />
              </div>
            </div>

            {/* Step 2 Preview Card */}
            <div className="rounded-xl border border-cyan-500/40 bg-cyan-950/20 p-4 ring-1 ring-cyan-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">Weeks 3–4 • In Progress</span>
                <Clock className="h-4 w-4 text-cyan-400 animate-pulse" />
              </div>
              <h4 className="font-bold text-white text-sm mb-1">Advanced SQL: JOINs & Subqueries</h4>
              <p className="text-xs text-slate-400 mb-3">Multi-table CTEs, Anti-joins, preventing duplicate records.</p>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-cyan-400 h-1.5 rounded-full w-[45%]" />
              </div>
            </div>

            {/* Step 3 Preview Card (Booster Sprint Preview) */}
            <div className="rounded-xl border border-amber-500/40 bg-amber-950/20 p-4 relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                  <Flame className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                  AI Adaptive Booster
                </span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-mono">3 Days</span>
              </div>
              <h4 className="font-bold text-white text-sm mb-1">Targeted JOIN & NULL Safety Sprint</h4>
              <p className="text-xs text-slate-400 mb-3">Inserted automatically after assessment detected weakness.</p>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-amber-400 h-1.5 rounded-full w-0" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Flow Banner: CURRENT SKILLS → AI GAP → ROADMAP → ADAPTIVE → JOB READY */}
      <section className="border-y border-slate-800/80 bg-slate-900/40 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-cyan-400 mb-8">
            The Autonomous Career Navigation Loop
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
            {[
              { label: 'Current Skills', icon: Layers, desc: 'Logged proficiencies' },
              { label: 'Skill Gap AI', icon: BarChart3, desc: 'Market benchmark' },
              { label: 'Personalized Path', icon: GitFork, desc: 'Time-bound phases' },
              { label: 'Daily Micro-Plan', icon: Clock, desc: 'Realistic 60m drills' },
              { label: 'AI Assessment', icon: BrainCircuit, desc: 'Mistake diagnosis' },
              { label: 'Adaptive Engine', icon: Sparkles, desc: 'Automatic schedule tweak' },
              { label: 'Career Ready', icon: Award, desc: 'Target 90%+ score' },
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.label}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 hover:border-slate-700 transition-colors"
                >
                  <div className="h-8 w-8 mx-auto rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-2">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 mb-0.5">STEP 0{idx + 1}</div>
                  <h4 className="text-xs font-bold text-white mb-0.5">{step.label}</h4>
                  <p className="text-[11px] text-slate-400">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Deep Dive Sections */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Engineered to Solve the Student Career Dilemma
          </h2>
          <p className="text-slate-400 text-base">
            Students know their target role, but struggle with order of operations, missing skills, and unrealistic schedules. SkillPilot AI bridges every gap with intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 hover:border-cyan-500/40 transition-colors">
            <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-5">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">AI Skill Gap Analysis</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Compares your exact current capabilities against real-world employer requirements for your chosen role. Highlights High, Medium, and Low severity gaps with natural language explanations.
            </p>
            <div className="text-xs font-semibold text-cyan-400 flex items-center gap-1">
              <span>Weighted Match Scoring</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 hover:border-indigo-500/40 transition-colors">
            <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-5">
              <BrainCircuit className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">True Adaptive Learning</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Take AI-generated milestone assessments. If you struggle (e.g., 42% on SQL JOINs), the AI automatically inserts a targeted 3-day booster sprint. If you ace it, it fast-tracks you to advanced material.
            </p>
            <div className="text-xs font-semibold text-indigo-400 flex items-center gap-1">
              <span>Self-Healing Roadmaps</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 hover:border-emerald-500/40 transition-colors">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Career Readiness Index</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              A comprehensive readiness score (0–100) spanning Technical Skills, Projects, Problem Solving, Communication, and Interview Readiness so you know when you are genuinely job-ready.
            </p>
            <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
              <span>Targeting 90%+ Job Ready</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* Supported Career Paths Grid */}
      <section className="py-16 bg-slate-900/30 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">Supported Career Trajectories</p>
              <h2 className="text-3xl font-extrabold text-white">Target Any Tech Discipline</h2>
            </div>
            <p className="text-slate-400 text-sm max-w-md mt-2 sm:mt-0">
              Select or customize any career trajectory. SkillPilot AI synthesizes required skills, projects, and timelines instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CAREER_ROLES.map((role) => (
              <div
                key={role.id}
                onClick={() => setCurrentView('onboarding')}
                className="group rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-cyan-500/40 p-4 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {role.badge}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-400">{role.averageSalary}</span>
                  </div>
                  <h4 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors mb-1">
                    {role.name}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                    {role.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 pt-3 border-t border-slate-800/60">
                  {role.commonSkills.slice(0, 3).map((sk) => (
                    <span
                      key={sk.name}
                      className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded border border-slate-700/60"
                    >
                      {sk.name}
                    </span>
                  ))}
                  {role.commonSkills.length > 3 && (
                    <span className="text-[10px] text-slate-500 px-1 py-0.5">
                      +{role.commonSkills.length - 3}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-10 bg-slate-950 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Compass className="h-4 w-4 text-cyan-400" />
            <span className="font-bold text-slate-300">SkillPilot AI</span>
            <span>— Personalized AI Learning Roadmap Generator</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Built for AI Hackathons</span>
            <span>•</span>
            <span>Powered by Google AI</span>
            <span>•</span>
            <button onClick={loadDemoMode} className="hover:text-cyan-400 underline">
              Launch Demo
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
