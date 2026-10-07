import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Flame,
  Bot,
  Compass,
  RotateCcw,
  Menu,
  X,
  Target,
  Zap,
} from 'lucide-react';

interface NavbarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const {
    profile,
    careerReadiness,
    copilotOpen,
    setCopilotOpen,
    loadDemoMode,
    resetAll,
    currentView,
    setCurrentView,
    hasGeminiKey,
    setDemoTourOpen,
  } = useApp();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView(profile.name ? 'dashboard' : 'landing')}
            className="group flex items-center gap-2.5 text-left focus:outline-none"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-500 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
                <Compass className="h-5 w-5 text-cyan-400 group-hover:rotate-45 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-tight text-white text-lg font-['Plus_Jakarta_Sans']">
                  SkillPilot<span className="text-cyan-400">.ai</span>
                </span>
                <span className="inline-flex items-center rounded-full bg-cyan-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-cyan-300 ring-1 ring-inset ring-cyan-500/30">
                  AI Navigator
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block -mt-0.5">
                Adaptive Career Path Engine
              </p>
            </div>
          </button>
        </div>

        {/* Middle Stats Badges (visible when in app) */}
        {currentView !== 'landing' && currentView !== 'onboarding' && (
          <div className="hidden md:flex items-center gap-3">
            {/* Target Role Badge */}
            <div className="flex items-center gap-2 rounded-lg bg-slate-900/90 border border-slate-800 px-3 py-1.5 text-xs">
              <Target className="h-3.5 w-3.5 text-indigo-400" />
              <span className="text-slate-400">Target Role:</span>
              <span className="font-semibold text-white">{profile.targetRole || 'Data Analyst'}</span>
            </div>

            {/* Streak Counter */}
            <div className="flex items-center gap-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 px-2.5 py-1.5 text-xs text-amber-300 font-medium">
              <Flame className="h-4 w-4 text-amber-400 fill-amber-400 animate-pulse" />
              <span>{profile.streakDays || 6} Day Streak</span>
            </div>

            {/* Career Readiness Mini Badge */}
            <button
              onClick={() => setCurrentView('readiness')}
              className="flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-xs text-emerald-300 font-semibold hover:bg-emerald-500/20 transition-colors"
            >
              <Zap className="h-3.5 w-3.5 text-emerald-400" />
              <span>Readiness: {careerReadiness.overallScore}%</span>
            </button>
          </div>
        )}

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Model Indicator */}
          <div
            title={hasGeminiKey ? 'Powered by Gemini 3.8 Flash' : 'Running on Self-Contained AI Engine'}
            className="hidden lg:flex items-center gap-1.5 rounded-full bg-slate-900 border border-slate-800 px-2.5 py-1 text-[11px] text-slate-400"
          >
            <span className={`h-1.5 w-1.5 rounded-full ${hasGeminiKey ? 'bg-emerald-400 animate-ping' : 'bg-cyan-400'}`} />
            <span>{hasGeminiKey ? 'Gemini 3.8 Flash' : 'AI Engine: Active'}</span>
          </div>

          {/* Judge Demo Flow button */}
          <button
            onClick={() => setDemoTourOpen(true)}
            className="hidden sm:flex items-center gap-1.5 rounded-lg border border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20 px-3 py-1.5 text-xs font-semibold text-purple-300 transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            <span>Judge Guide</span>
          </button>

          {/* Demo Button */}
          <button
            onClick={loadDemoMode}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors"
          >
            <span>Try Demo</span>
          </button>

          {/* Copilot Assistant Trigger */}
          <button
            onClick={() => setCopilotOpen(!copilotOpen)}
            className={`relative flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              copilotOpen
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white hover:brightness-110 shadow-sm'
            }`}
          >
            <Bot className="h-4 w-4" />
            <span className="hidden sm:inline">AI Copilot</span>
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
          </button>

          {/* Reset button (visible in app) */}
          {currentView !== 'landing' && (
            <button
              onClick={resetAll}
              title="Reset profile and start new path"
              className="text-slate-500 hover:text-slate-300 p-1.5 rounded-md hover:bg-slate-900 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
