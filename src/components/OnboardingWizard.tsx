import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CAREER_ROLES } from '../lib/constants';
import { Skill, ProficiencyLevel, LearningStyle } from '../types';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Plus,
  Trash2,
  Clock,
  Calendar,
  Layers,
  Brain,
  Cpu,
  Zap,
} from 'lucide-react';

export const OnboardingWizard: React.FC = () => {
  const { generateRoadmap, setCurrentView, isGenerating } = useApp();

  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState<string>('Alex Rivera');
  const [targetRole, setTargetRole] = useState<string>('Data Analyst');
  const [customRoleInput, setCustomRoleInput] = useState<string>('');

  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([
    { name: 'Excel', level: 'Intermediate' },
    { name: 'Python', level: 'Beginner' },
    { name: 'SQL', level: 'Beginner' },
    { name: 'Statistics', level: 'Beginner' },
  ]);

  const [newSkillName, setNewSkillName] = useState<string>('');
  const [availableHours, setAvailableHours] = useState<string>('2 hours/day');
  const [targetTimeline, setTargetTimeline] = useState<string>('12 weeks');
  const [educationLevel, setEducationLevel] = useState<string>("Bachelor's in Business Informatics");
  const [previousExperience, setPreviousExperience] = useState<string>('Student with basic data reporting internships');
  const [existingProjects, setExistingProjects] = useState<string>('Simple sales spreadsheet analysis in Excel');

  const [learningStyles, setLearningStyles] = useState<LearningStyle[]>([
    'Hands-on Projects',
    'Practice Problems',
    'Video',
    'AI explanations',
  ]);

  const suggestedSkills = [
    'Python',
    'JavaScript',
    'HTML & CSS',
    'SQL',
    'Excel',
    'Power BI',
    'Tableau',
    'React',
    'Git',
    'Statistics',
    'Machine Learning',
    'Docker',
    'Linux CLI',
    'PostgreSQL',
    'AWS / Cloud Basics',
  ];

  const handleToggleSkill = (skillName: string) => {
    const exists = selectedSkills.some((s) => s.name.toLowerCase() === skillName.toLowerCase());
    if (exists) {
      setSelectedSkills(selectedSkills.filter((s) => s.name.toLowerCase() !== skillName.toLowerCase()));
    } else {
      setSelectedSkills([...selectedSkills, { name: skillName, level: 'Beginner' }]);
    }
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    if (!selectedSkills.some((s) => s.name.toLowerCase() === newSkillName.trim().toLowerCase())) {
      setSelectedSkills([...selectedSkills, { name: newSkillName.trim(), level: 'Beginner' }]);
    }
    setNewSkillName('');
  };

  const handleUpdateSkillLevel = (skillName: string, level: ProficiencyLevel) => {
    setSelectedSkills(
      selectedSkills.map((s) => (s.name === skillName ? { ...s, level } : s))
    );
  };

  const handleRemoveSkill = (skillName: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s.name !== skillName));
  };

  const handleToggleLearningStyle = (style: LearningStyle) => {
    if (learningStyles.includes(style)) {
      setLearningStyles(learningStyles.filter((s) => s !== style));
    } else {
      setLearningStyles([...learningStyles, style]);
    }
  };

  const handleFinalSubmit = async () => {
    await generateRoadmap({
      name,
      targetRole: customRoleInput.trim() || targetRole,
      currentSkills: selectedSkills,
      educationLevel,
      previousExperience,
      existingProjects,
      availableHoursPerDay: availableHours,
      targetTimeline,
      learningStyles,
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-slate-950">
      <div className="w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative">
        {/* Progress header */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Sparkles className="h-4 w-4" />
              <span>Step {step} of 6</span>
            </span>
            <span>{Math.round((step / 6) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: TARGET ROLE */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">What is your target career role?</h2>
              <p className="text-sm text-slate-400">
                Select from popular market roles or enter your custom dream position.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CAREER_ROLES.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => {
                    setTargetRole(role.name);
                    setCustomRoleInput('');
                  }}
                  className={`text-left p-3.5 rounded-xl border transition-all ${
                    targetRole === role.name && !customRoleInput
                      ? 'border-cyan-500 bg-cyan-950/30 text-white shadow-md shadow-cyan-500/10 ring-1 ring-cyan-500'
                      : 'border-slate-800 bg-slate-900/50 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm">{role.name}</span>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                      {role.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1">{role.description}</p>
                </button>
              ))}
            </div>

            <div className="pt-2">
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Or enter a custom role:
              </label>
              <input
                type="text"
                value={customRoleInput}
                onChange={(e) => setCustomRoleInput(e.target.value)}
                placeholder="e.g. Quantitative Risk Analyst, NLP Researcher..."
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Your name:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Rivera"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
          </div>
        )}

        {/* STEP 2: WHAT DO YOU ALREADY KNOW? */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">What skills do you already have?</h2>
              <p className="text-sm text-slate-400">
                Click skills to add them to your profile. Be honest — SkillPilot will pinpoint your exact starting line.
              </p>
            </div>

            {/* Selected skills list */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Selected Skills ({selectedSkills.length}):
              </p>
              <div className="flex flex-wrap gap-2 min-h-12 p-3 rounded-xl border border-slate-800 bg-slate-950/70">
                {selectedSkills.length === 0 ? (
                  <span className="text-xs text-slate-500 italic">No skills selected yet. Click from below or add custom.</span>
                ) : (
                  selectedSkills.map((skill) => (
                    <span
                      key={skill.name}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/30 px-3 py-1 text-xs font-semibold text-cyan-200"
                    >
                      <span>{skill.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill.name)}
                        className="text-cyan-400 hover:text-rose-400 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Suggested skill chips */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Click to add common skills:
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestedSkills.map((sk) => {
                  const isSelected = selectedSkills.some((s) => s.name.toLowerCase() === sk.toLowerCase());
                  return (
                    <button
                      key={sk}
                      type="button"
                      onClick={() => handleToggleSkill(sk)}
                      className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-all ${
                        isSelected
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                          : 'bg-slate-800/80 border-slate-700 hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}
                      {sk}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Add custom skill input */}
            <form onSubmit={handleAddCustomSkill} className="flex gap-2">
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="Type any other skill (e.g. Scikit-learn, Figma, C++)..."
                className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 flex items-center gap-1"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add</span>
              </button>
            </form>
          </div>
        )}

        {/* STEP 3: PROFICIENCY LEVELS */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">How strong are you in each skill?</h2>
              <p className="text-sm text-slate-400">
                Set your self-assessed proficiency. This controls where your roadmap begins.
              </p>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {selectedSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border border-slate-800 bg-slate-950/70 gap-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-sm">{skill.name}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {(['Beginner', 'Intermediate', 'Advanced'] as ProficiencyLevel[]).map((level) => {
                      const isActive = skill.level === level;
                      return (
                        <button
                          key={level}
                          type="button"
                          onClick={() => handleUpdateSkillLevel(skill.name, level)}
                          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                            isActive
                              ? level === 'Beginner'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                                : level === 'Intermediate'
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                          }`}
                        >
                          {level}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: TIME AVAILABILITY */}
        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">What is your daily availability?</h2>
              <p className="text-sm text-slate-400">
                SkillPilot will size milestones and daily practice blocks to match your real schedule.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: '30 minutes/day', desc: 'Light pace for busy working professionals', hours: '0.5h' },
                { label: '1 hour/day', desc: 'Balanced steady progress (7 hours/week)', hours: '1h' },
                { label: '2 hours/day', desc: 'Recommended sprint pace (14 hours/week)', hours: '2h', popular: true },
                { label: '3+ hours/day', desc: 'Full-time immersion bootcamp velocity', hours: '3+h' },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setAvailableHours(item.label)}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    availableHours === item.label
                      ? 'border-cyan-500 bg-cyan-950/30 text-white ring-1 ring-cyan-500 shadow-lg shadow-cyan-500/10'
                      : 'border-slate-800 bg-slate-900/50 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm flex items-center gap-2">
                      <Clock className="h-4 w-4 text-cyan-400" />
                      {item.label}
                    </span>
                    {item.popular && (
                      <span className="text-[10px] font-semibold bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </button>
              ))}
            </div>

            <div className="pt-2">
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Existing projects or background context:
              </label>
              <textarea
                rows={2}
                value={existingProjects}
                onChange={(e) => setExistingProjects(e.target.value)}
                placeholder="e.g. Built an Excel sales reporting workbook, completed an intro CS course..."
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* STEP 5: TARGET TIMELINE */}
        {step === 5 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">What is your target deadline?</h2>
              <p className="text-sm text-slate-400">
                When do you want to be job/internship ready for {customRoleInput || targetRole}?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: '4 weeks (1 month)', sub: 'Fast-track crash course for candidates with existing foundations' },
                { label: '12 weeks (3 months)', sub: 'Comprehensive standard roadmap (Optimal for career shift)', recommended: true },
                { label: '24 weeks (6 months)', sub: 'In-depth mastery with extensive portfolio and interview prep' },
                { label: '52 weeks (1 year)', sub: 'Long-term university degree accompaniment' },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setTargetTimeline(item.label)}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    targetTimeline === item.label
                      ? 'border-cyan-500 bg-cyan-950/30 text-white ring-1 ring-cyan-500 shadow-lg shadow-cyan-500/10'
                      : 'border-slate-800 bg-slate-900/50 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-indigo-400" />
                      {item.label}
                    </span>
                    {item.recommended && (
                      <span className="text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{item.sub}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 6: LEARNING PREFERENCES */}
        {step === 6 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Your preferred learning styles</h2>
              <p className="text-sm text-slate-400">
                SkillPilot will prioritize curated resources that fit your natural cognitive preferences.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { style: 'Hands-on Projects', desc: 'Learn by building working code and products' },
                { style: 'Practice Problems', desc: 'LeetCode, interactive drills, and coding katas' },
                { style: 'Video', desc: 'Engaging visual explanations and screencasts' },
                { style: 'Reading', desc: 'Official documentation and deep technical articles' },
                { style: 'AI explanations', desc: 'Conversational Socratic coaching from SkillPilot Copilot' },
              ].map((item) => {
                const isSelected = learningStyles.includes(item.style as LearningStyle);
                return (
                  <button
                    key={item.style}
                    type="button"
                    onClick={() => handleToggleLearningStyle(item.style as LearningStyle)}
                    className={`text-left p-3.5 rounded-xl border transition-all ${
                      isSelected
                        ? 'border-cyan-500 bg-cyan-950/30 text-white ring-1 ring-cyan-500'
                        : 'border-slate-800 bg-slate-900/50 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm">{item.style}</span>
                      {isSelected && <Check className="h-4 w-4 text-cyan-400" />}
                    </div>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </button>
                );
              })}
            </div>

            {/* Ready to generate banner */}
            <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 to-indigo-950/40 p-4 flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-cyan-400 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-white">Ready for Neural Synthesis</p>
                <p className="text-[11px] text-slate-300">
                  Target: <strong className="text-cyan-300">{customRoleInput || targetRole}</strong> • {availableHours} • {targetTimeline}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Loading Overlay while generating */}
        {isGenerating && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center p-6 text-center z-20 animate-fade-in">
            <div className="relative mb-6">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-500 p-1 animate-spin">
                <div className="h-full w-full bg-slate-950 rounded-xl" />
              </div>
              <Cpu className="h-10 w-10 text-cyan-400 absolute inset-0 m-auto" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Synthesizing Adaptive Roadmap...</h3>
            <p className="text-xs text-slate-400 max-w-sm mb-4 leading-relaxed">
              Evaluating skill gap severities, sequencing prerequisite topics, and calculating career readiness models.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 bg-cyan-950/50 border border-cyan-500/30 px-3 py-1.5 rounded-full">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Analyzing market requirements for {customRoleInput || targetRole}</span>
            </div>
          </div>
        )}

        {/* Navigation bottom bar */}
        <div className="flex items-center justify-between pt-8 border-t border-slate-800/80 mt-8">
          <button
            type="button"
            onClick={() => (step === 1 ? setCurrentView('landing') : setStep(step - 1))}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{step === 1 ? 'Cancel' : 'Back'}</span>
          </button>

          {step < 6 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-cyan-500/20"
            >
              <span>Next Step</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isGenerating}
              onClick={handleFinalSubmit}
              className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 text-xs font-extrabold transition-all shadow-xl shadow-cyan-500/30 cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>Generate My AI Roadmap</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
