import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AssessmentQuestion } from '../types';
import {
  BrainCircuit,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Flame,
  ArrowRight,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Zap,
} from 'lucide-react';

export const AssessmentView: React.FC = () => {
  const {
    currentAssessment,
    submitAssessment,
    setCurrentView,
    assessmentHistory,
    profile,
  } = useApp();

  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [weakAreas, setWeakAreas] = useState<string[]>([]);
  const [strongAreas, setStrongAreas] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSelectOption = (qId: string, optionIdx: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleManualSubmit = async () => {
    setIsSubmitting(true);
    let correctCount = 0;
    const detectedWeak: string[] = [];
    const detectedStrong: string[] = [];
    const answersArray: number[] = [];

    currentAssessment.questions.forEach((q) => {
      const userChoice = selectedAnswers[q.id];
      answersArray.push(userChoice !== undefined ? userChoice : -1);
      if (userChoice === q.correctAnswerIndex) {
        correctCount++;
        if (!detectedStrong.includes(q.skillSubtopic)) detectedStrong.push(q.skillSubtopic);
      } else {
        if (!detectedWeak.includes(q.skillSubtopic)) detectedWeak.push(q.skillSubtopic);
      }
    });

    const score = Math.round((correctCount / currentAssessment.questions.length) * 100);
    setCurrentScore(score);
    setWeakAreas(detectedWeak.length > 0 ? detectedWeak : ['Edge case execution']);
    setStrongAreas(detectedStrong.length > 0 ? detectedStrong : ['Fundamental syntax']);

    await submitAssessment(
      score,
      detectedWeak.length > 0 ? detectedWeak : ['JOIN Operations & Logic'],
      detectedStrong.length > 0 ? detectedStrong : ['Basic Filtering'],
      answersArray
    );

    setSubmitted(true);
    setIsSubmitting(false);
  };

  // Preset button for Hackathon demonstration of Weak score (42%)
  const handleSimulateWeakScore = async () => {
    setIsSubmitting(true);
    // Simulate answering q1 correct, and missing q2, q3, q4, q5
    const simulatedAnswers: { [qId: string]: number } = {
      q1: 1, // correct
      q2: 0, // incorrect (missed ON vs WHERE)
      q3: 0, // incorrect (missed Cartesian multiplicity)
      q4: 0, // incorrect
      q5: 2, // incorrect (missed Anti-join null check)
    };
    setSelectedAnswers(simulatedAnswers);

    const score = 42;
    const weak = ['SQL JOIN logic & NULL preservation', 'ON vs WHERE execution timing', 'Anti-Join patterns'];
    const strong = ['Basic JOIN Definitions'];

    setCurrentScore(score);
    setWeakAreas(weak);
    setStrongAreas(strong);

    await submitAssessment(score, weak, strong, [1, 0, 0, 0, 2]);

    setSubmitted(true);
    setIsSubmitting(false);
  };

  // Preset button for Hackathon demonstration of High score (95%)
  const handleSimulateHighScore = async () => {
    setIsSubmitting(true);
    const simulatedAnswers: { [qId: string]: number } = {
      q1: 1,
      q2: 1,
      q3: 2,
      q4: 1,
      q5: 0,
    };
    setSelectedAnswers(simulatedAnswers);

    const score = 100;
    const weak: string[] = [];
    const strong = ['JOIN Mechanics', 'ON vs WHERE Filtering', 'Cartesian Multiplicity', 'Engine Compatibility', 'Anti-Join Logic'];

    setCurrentScore(score);
    setWeakAreas(weak);
    setStrongAreas(strong);

    await submitAssessment(score, weak, strong, [1, 1, 2, 1, 0]);

    setSubmitted(true);
    setIsSubmitting(false);
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setCurrentScore(0);
    setWeakAreas([]);
    setStrongAreas([]);
  };

  const allAnswered = currentAssessment.questions.every((q) => selectedAnswers[q.id] !== undefined);

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
              Active Assessment Engine
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Milestone Mastery Check</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {currentAssessment.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Skill: <strong className="text-white font-semibold">{currentAssessment.skillTested}</strong> • Passing Score:{' '}
            <strong className="text-emerald-400 font-semibold">{currentAssessment.passingScore}%</strong>
          </p>
        </div>

        {/* Hackathon Judge Simulation Presets */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleSimulateWeakScore}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-xs font-semibold text-amber-300 transition-colors"
            title="Demonstrates AI detecting the weak score and auto-inserting the 3-day booster sprint"
          >
            <Flame className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
            <span>Simulate Gap Score (42%)</span>
          </button>

          <button
            onClick={handleSimulateHighScore}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-xs font-semibold text-emerald-300 transition-colors"
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>Simulate Ace Score (100%)</span>
          </button>
        </div>
      </div>

      {/* Submitted Result Scorecard */}
      {submitted && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div
                className={`h-16 w-16 rounded-2xl flex items-center justify-center font-extrabold text-2xl ${
                  currentScore >= (currentAssessment.passingScore || 70)
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                }`}
              >
                {currentScore}%
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Assessment Result
                </span>
                <h2 className="text-xl font-bold text-white">
                  {currentScore >= (currentAssessment.passingScore || 70)
                    ? 'Milestone Gate Cleared!'
                    : 'AI Detected a Learning Gap'}
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  {currentScore >= (currentAssessment.passingScore || 70)
                    ? 'Superb performance! Your schedule has been accelerated to unlock advanced tasks.'
                    : `Score: ${currentScore}%. Weakness identified in ${weakAreas.join(', ')}.`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRetake}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Retake</span>
              </button>
              <button
                onClick={() => setCurrentView('roadmap')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20"
              >
                <span>View Adapted Roadmap</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* AI Adaptive Feedback Box */}
          <div
            className={`rounded-xl p-4 border ${
              currentScore < 70
                ? 'border-amber-500/50 bg-amber-950/20 text-amber-200'
                : 'border-emerald-500/50 bg-emerald-950/20 text-emerald-200'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-bold mb-1">
              <Sparkles className="h-4 w-4" />
              <span>
                {currentScore < 70
                  ? 'AI Adaptive Action Triggered: 3-Day Targeted Booster Sprint Added'
                  : 'Fast-Track Enabled: Milestone 2 Checked Off'}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-300">
              {currentScore < 70
                ? `Because your score fell below 70%, advancing directly to Capstone modeling would cause frustration. SkillPilot has autonomously inserted a 3-Day Reinforcement Module into your roadmap focusing on ${weakAreas.join(
                    ' & '
                  )}.`
                : `You demonstrated complete mastery over JOIN operations and relational filtering. Your Career Readiness index has been increased.`}
            </p>
          </div>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-6">
        {currentAssessment.questions.map((q, idx) => {
          const userChoice = selectedAnswers[q.id];
          const isCorrect = userChoice === q.correctAnswerIndex;
          const showAnswer = submitted;

          return (
            <div
              key={q.id}
              className={`rounded-2xl border p-5 sm:p-6 transition-all ${
                showAnswer
                  ? isCorrect
                    ? 'border-emerald-500/40 bg-emerald-950/10'
                    : 'border-rose-500/40 bg-rose-950/10'
                  : 'border-slate-800 bg-slate-900/60'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    Question 0{idx + 1}
                  </span>
                  <span className="text-[11px] font-semibold text-indigo-400">
                    {q.skillSubtopic}
                  </span>
                </div>

                {showAnswer && (
                  <div>
                    {isCorrect ? (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" />
                        Correct
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
                        <XCircle className="h-4 w-4" />
                        Incorrect
                      </span>
                    )}
                  </div>
                )}
              </div>

              <h3 className="text-base font-bold text-white mb-3 leading-snug">{q.question}</h3>

              {/* Code snippet if present */}
              {q.codeSnippet && (
                <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto mb-4">
                  <code>{q.codeSnippet}</code>
                </pre>
              )}

              {/* Options */}
              <div className="space-y-2 mb-3">
                {q.options.map((option, optIdx) => {
                  const isSelected = userChoice === optIdx;
                  const isThisCorrect = optIdx === q.correctAnswerIndex;

                  let optionStyles = 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700';

                  if (showAnswer) {
                    if (isThisCorrect) {
                      optionStyles = 'border-emerald-500 bg-emerald-950/30 text-white font-medium ring-1 ring-emerald-500';
                    } else if (isSelected && !isThisCorrect) {
                      optionStyles = 'border-rose-500 bg-rose-950/30 text-slate-300 line-through';
                    } else {
                      optionStyles = 'border-slate-800/60 bg-slate-950/30 text-slate-500';
                    }
                  } else if (isSelected) {
                    optionStyles = 'border-cyan-500 bg-cyan-950/30 text-white ring-1 ring-cyan-500 font-medium';
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={submitted}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${optionStyles}`}
                    >
                      <span className="font-mono text-xs opacity-60 mt-0.5">
                        {String.fromCharCode(65 + optIdx)}.
                      </span>
                      <span className="flex-1">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation after submission */}
              {showAnswer && (
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <div className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                    <span>AI Educational Explanation:</span>
                  </div>
                  <p className="leading-relaxed text-slate-300">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      {!submitted && (
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-800">
          <button
            type="button"
            disabled={!allAnswered || isSubmitting}
            onClick={handleManualSubmit}
            className={`flex items-center gap-2 px-7 py-3 rounded-xl text-xs font-bold transition-all ${
              allAnswered
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 shadow-xl shadow-cyan-500/25 cursor-pointer'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <BrainCircuit className="h-4 w-4" />
            <span>{isSubmitting ? 'Evaluating with AI...' : 'Submit Assessment & Analyze'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
