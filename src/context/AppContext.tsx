import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  StudentProfile,
  Roadmap,
  SkillGap,
  DailyPlan,
  CareerReadiness,
  Assessment,
  AssessmentResult,
  Project,
  AIRecommendation,
  CopilotMessage,
  Milestone,
} from '../types';
import {
  DEMO_STUDENT_PROFILE,
  DEMO_SKILL_GAPS,
  DEMO_ROADMAP,
  DEMO_DAILY_PLAN,
  DEMO_CAREER_READINESS,
  DEMO_ASSESSMENT_SQL,
  DEMO_PROJECT_DATA,
} from '../lib/constants';

export type ActiveView =
  | 'landing'
  | 'onboarding'
  | 'dashboard'
  | 'roadmap'
  | 'skillgap'
  | 'daily'
  | 'assessment'
  | 'projects'
  | 'resources'
  | 'readiness';

interface AppContextType {
  profile: StudentProfile;
  roadmap: Roadmap;
  skillGaps: SkillGap[];
  dailyPlan: DailyPlan;
  careerReadiness: CareerReadiness;
  currentAssessment: Assessment;
  assessmentHistory: AssessmentResult[];
  activeProject: Project;
  aiRecommendations: AIRecommendation[];
  currentView: ActiveView;
  selectedMilestone: Milestone | null;
  copilotOpen: boolean;
  copilotMessages: CopilotMessage[];
  isGenerating: boolean;
  adaptiveNotice: { title: string; message: string; type: 'booster' | 'fast-track' } | null;
  hasGeminiKey: boolean;
  demoTourOpen: boolean;
  setCurrentView: (view: ActiveView) => void;
  setSelectedMilestone: (milestone: Milestone | null) => void;
  setCopilotOpen: (open: boolean) => void;
  setDemoTourOpen: (open: boolean) => void;
  dismissAdaptiveNotice: () => void;
  loadDemoMode: () => void;
  resetAll: () => void;
  generateRoadmap: (onboardingData: Partial<StudentProfile>) => Promise<void>;
  submitAssessment: (score: number, weakAreas: string[], strongAreas: string[], userAnswers: number[]) => Promise<void>;
  toggleDailyTask: (taskId: string) => void;
  toggleProjectTask: (stepNumber: number) => void;
  updateMilestoneProgress: (milestoneId: string, progress: number) => void;
  sendCopilotMessage: (message: string) => Promise<void>;
  generateNewProject: (difficulty: 'Beginner' | 'Intermediate' | 'Advanced') => Promise<void>;
}

const LOCAL_STORAGE_KEY = 'skillpilot_v1_state';

const defaultCopilotMessages: CopilotMessage[] = [
  {
    id: 'msg-1',
    sender: 'assistant',
    text: "Hello! I'm SkillPilot Copilot. I'm actively tracking your progress toward becoming a **Data Analyst**. I know your current skills, your 2-hour daily study window, and your milestone targets. How can I help you accelerate today?",
    timestamp: 'Just now',
    suggestedPrompts: [
      "What should I learn today?",
      "Explain SQL JOINs simply",
      "Can I skip this topic?",
      "I only have 30 minutes today",
      "Am I ready for an internship?",
    ],
  },
];

const defaultRecommendations: AIRecommendation[] = [
  {
    id: 'rec-1',
    type: 'adaptation',
    title: 'High Priority Skill Gap: SQL',
    message: 'SQL represents your largest career hurdle. Focus on Phase 1 JOIN operations before starting dashboarding.',
    actionText: 'View Milestone',
    actionTab: 'roadmap',
    timestamp: 'Today',
  },
  {
    id: 'rec-2',
    type: 'tip',
    title: 'Maintain 6-Day Streak',
    message: 'Studying 60 focused minutes today keeps your learning velocity in the top 10% of students.',
    actionText: "Today's Plan",
    actionTab: 'daily',
    timestamp: 'Today',
  },
];

async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs = 8000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<StudentProfile>(DEMO_STUDENT_PROFILE);
  const [roadmap, setRoadmap] = useState<Roadmap>(DEMO_ROADMAP);
  const [skillGaps, setSkillGaps] = useState<SkillGap[]>(DEMO_SKILL_GAPS);
  const [dailyPlan, setDailyPlan] = useState<DailyPlan>(DEMO_DAILY_PLAN);
  const [careerReadiness, setCareerReadiness] = useState<CareerReadiness>(DEMO_CAREER_READINESS);
  const [currentAssessment, setCurrentAssessment] = useState<Assessment>(DEMO_ASSESSMENT_SQL);
  const [assessmentHistory, setAssessmentHistory] = useState<AssessmentResult[]>([]);
  const [activeProject, setActiveProject] = useState<Project>(DEMO_PROJECT_DATA);
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>(defaultRecommendations);
  const [currentView, setCurrentView] = useState<ActiveView>('landing');
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [copilotOpen, setCopilotOpen] = useState<boolean>(false);
  const [demoTourOpen, setDemoTourOpen] = useState<boolean>(false);
  const [copilotMessages, setCopilotMessages] = useState<CopilotMessage[]>(defaultCopilotMessages);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [adaptiveNotice, setAdaptiveNotice] = useState<{ title: string; message: string; type: 'booster' | 'fast-track' } | null>(null);
  const [hasGeminiKey, setHasGeminiKey] = useState<boolean>(false);

  // Check health and initialize from local storage on mount
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data.hasGeminiKey) {
          setHasGeminiKey(true);
        }
      })
      .catch(() => {});

    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.profile) setProfile(parsed.profile);
        if (parsed.roadmap) setRoadmap(parsed.roadmap);
        if (parsed.skillGaps) setSkillGaps(parsed.skillGaps);
        if (parsed.dailyPlan) setDailyPlan(parsed.dailyPlan);
        if (parsed.careerReadiness) setCareerReadiness(parsed.careerReadiness);
        if (parsed.currentAssessment) setCurrentAssessment(parsed.currentAssessment);
        if (parsed.assessmentHistory) setAssessmentHistory(parsed.assessmentHistory);
        if (parsed.activeProject) setActiveProject(parsed.activeProject);
        if (parsed.currentView && parsed.currentView !== 'onboarding') setCurrentView(parsed.currentView);
      }
    } catch (e) {
      console.warn('Could not load cached session:', e);
    }
  }, []);

  // Save to local storage on changes
  useEffect(() => {
    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          profile,
          roadmap,
          skillGaps,
          dailyPlan,
          careerReadiness,
          currentAssessment,
          assessmentHistory,
          activeProject,
          currentView,
        })
      );
    } catch (e) {
      // Storage quota or disabled
    }
  }, [profile, roadmap, skillGaps, dailyPlan, careerReadiness, currentAssessment, assessmentHistory, activeProject, currentView]);

  const loadDemoMode = () => {
    setProfile(DEMO_STUDENT_PROFILE);
    setRoadmap(DEMO_ROADMAP);
    setSkillGaps(DEMO_SKILL_GAPS);
    setDailyPlan(DEMO_DAILY_PLAN);
    setCareerReadiness(DEMO_CAREER_READINESS);
    setCurrentAssessment(DEMO_ASSESSMENT_SQL);
    setActiveProject(DEMO_PROJECT_DATA);
    setAdaptiveNotice(null);
    setCurrentView('dashboard');

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  const resetAll = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setProfile({
      name: '',
      targetRole: 'Data Analyst',
      currentSkills: [],
      educationLevel: '',
      previousExperience: '',
      existingProjects: '',
      availableHoursPerDay: '2 hours/day',
      targetTimeline: '12 weeks',
      learningStyles: ['Hands-on Projects', 'Practice Problems'],
      streakDays: 1,
      hoursCompletedThisWeek: 0,
      totalHoursStudied: 0,
    });
    setAdaptiveNotice(null);
    setCurrentView('landing');
  };

  const dismissAdaptiveNotice = () => {
    setAdaptiveNotice(null);
  };

  // Generate Custom Roadmap via backend API
  const generateRoadmap = async (onboardingData: Partial<StudentProfile>) => {
    setIsGenerating(true);
    try {
      const response = await fetchWithTimeout('/api/generate-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(onboardingData),
      });

      const res = await response.json();
      const generated = res.data;

      if (generated) {
        if (generated.skillGaps) setSkillGaps(generated.skillGaps);
        if (generated.roadmap) {
          const rm = generated.roadmap;
          setRoadmap({
            id: `rm-${Date.now()}`,
            targetRole: onboardingData.targetRole || 'Software Engineer',
            totalWeeks: rm.totalWeeks || 12,
            generatedAt: new Date().toISOString(),
            overallProgress: 0,
            phases: rm.phases || [],
            adaptationCount: 0,
          });
        }
        if (generated.initialCareerReadiness) {
          setCareerReadiness({
            overallScore: generated.initialCareerReadiness.overallScore || 50,
            categories: generated.initialCareerReadiness.categories || {
              technicalSkills: 55,
              projects: 40,
              problemSolving: 50,
              communication: 45,
              interviewReadiness: 35,
            },
            statusSummary: generated.initialCareerReadiness.statusSummary || `Roadmap successfully architected for ${onboardingData.targetRole}.`,
            biggestGaps: generated.initialCareerReadiness.biggestGaps || [],
            recommendedMilestonesTo90: generated.initialCareerReadiness.recommendedMilestonesTo90 || [],
            isJobReady: false,
          });
        }

        // Update profile
        setProfile((prev) => ({
          ...prev,
          ...onboardingData,
          name: onboardingData.name || 'Student',
          streakDays: 1,
          hoursCompletedThisWeek: 0,
          totalHoursStudied: 0,
        }));

        // Build dynamic daily plan
        const firstMilestone = generated.roadmap?.phases?.[0]?.milestones?.[0];
        setDailyPlan({
          date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
          totalMinutes: 60,
          focusMilestoneId: firstMilestone?.id || 'ms-1',
          focusSkill: firstMilestone?.skill || 'Core Foundations',
          todayGoal: `Kickstart your roadmap: Complete initial lessons in ${firstMilestone?.title || 'Phase 1'}.`,
          motivationQuote: 'The secret of getting ahead is getting started.',
          tasks: [
            {
              id: 'task-1',
              title: `Learn ${firstMilestone?.skill || 'Core'} Fundamentals`,
              durationMinutes: 25,
              type: 'Learn',
              completed: false,
              objective: 'Cover core syntax and primary mental models.',
            },
            {
              id: 'task-2',
              title: 'Solve 2 Introductory Practice Exercises',
              durationMinutes: 25,
              type: 'Practice',
              completed: false,
              objective: 'Apply concepts through hands-on practice problems.',
            },
            {
              id: 'task-3',
              title: 'Initial Check-in Reflection',
              durationMinutes: 10,
              type: 'Assess',
              completed: false,
              objective: 'Log notes and prepare for milestone progress tracking.',
            },
          ],
        });

        setCurrentView('skillgap');
        confetti({ particleCount: 75, spread: 80, origin: { y: 0.5 } });
      }
    } catch (err) {
      console.error('Failed to generate roadmap:', err);
      loadDemoMode();
    } finally {
      setIsGenerating(false);
    }
  };

  // Submit assessment and trigger adaptive roadmap engine
  const submitAssessment = async (score: number, weakAreas: string[], strongAreas: string[], userAnswers: number[]) => {
    const passed = score >= (currentAssessment.passingScore || 70);
    const newResult: AssessmentResult = {
      assessmentId: currentAssessment.id,
      milestoneId: currentAssessment.milestoneId,
      skillTested: currentAssessment.skillTested,
      score,
      passed,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      userAnswers,
      strongAreas,
      weakAreas,
      aiAnalysis: passed
        ? `Superb execution! You demonstrated mastery of ${currentAssessment.skillTested} concepts.`
        : `AI detected a skill gap in ${currentAssessment.skillTested}. Difficulty with ${weakAreas.join(', ')}.`,
      recommendation: passed
        ? 'You have cleared this milestone gate and unlocked advanced topics.'
        : 'SkillPilot has adapted your schedule by inserting a targeted 3-day booster sprint.',
    };

    setAssessmentHistory((prev) => [newResult, ...prev]);

    try {
      // Call adaptive engine
      const response = await fetchWithTimeout('/api/adapt-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentRoadmap: roadmap,
          assessmentResult: newResult,
          studentProfile: profile,
        }),
      });

      const res = await response.json();
      const adaptData = res.data;

      if (adaptData) {
        if (score < 70 && adaptData.boosterMilestone) {
          // Insert the booster milestone into Phase 1 right after ms-2
          setRoadmap((prev) => {
            const updatedPhases = prev.phases.map((phase) => {
              if (phase.id === 'phase-1') {
                const existing = phase.milestones.filter((m) => !m.isBoosterSprint);
                return {
                  ...phase,
                  milestones: [existing[0], existing[1], adaptData.boosterMilestone, ...existing.slice(2)].filter(Boolean),
                };
              }
              return phase;
            });

            return {
              ...prev,
              phases: updatedPhases,
              adaptationCount: prev.adaptationCount + 1,
              adaptationNotice: adaptData.headline,
            };
          });

          setAdaptiveNotice({
            title: adaptData.headline,
            message: adaptData.reason,
            type: 'booster',
          });

          // Update daily plan to target the booster sprint
          setDailyPlan((prev) => ({
            ...prev,
            todayGoal: `Targeted 3-Day Sprint: Master ${weakAreas[0] || 'SQL JOIN logic'} before continuing.`,
            focusSkill: `${currentAssessment.skillTested} (Booster)`,
            tasks: [
              {
                id: `b-task-1-${Date.now()}`,
                title: `Review ${weakAreas[0] || 'JOIN Logic'} Venn Mechanics`,
                durationMinutes: 20,
                type: 'Learn',
                completed: false,
                objective: 'Study how NULL values behave across INNER vs LEFT JOINs.',
              },
              {
                id: `b-task-2-${Date.now()}`,
                title: 'Solve 3 Anti-Join & NULL Preservation Exercises',
                durationMinutes: 30,
                type: 'Practice',
                completed: false,
                objective: 'Fix queries where unmatched rows were accidentally dropped.',
              },
              {
                id: `b-task-3-${Date.now()}`,
                title: 'Quick 10-Minute Knowledge Check',
                durationMinutes: 10,
                type: 'Assess',
                completed: false,
                objective: 'Verify retention of ON clause vs WHERE clause execution order.',
              },
            ],
          }));

          // Adjust career readiness slightly to reflect detected gap
          setCareerReadiness((prev) => ({
            ...prev,
            overallScore: Math.max(prev.overallScore + (adaptData.readinessDelta || -2), 35),
            categories: {
              ...prev.categories,
              technicalSkills: Math.max(prev.categories.technicalSkills - 5, 40),
            },
            statusSummary: `AI Adaptive Engine active: Reinforcing ${weakAreas.join(', ')} via a 3-Day Booster Sprint.`,
          }));
        } else {
          // Student passed!
          confetti({ particleCount: 100, spread: 90, origin: { y: 0.6 } });

          setAdaptiveNotice({
            title: `Assessment Passed (${score}%) — Fast Track Activated`,
            message: `Outstanding! You have cleared this gate. Next modules have been streamlined to accelerate your career readiness.`,
            type: 'fast-track',
          });

          setCareerReadiness((prev) => ({
            ...prev,
            overallScore: Math.min(prev.overallScore + 6, 95),
            categories: {
              ...prev.categories,
              technicalSkills: Math.min(prev.categories.technicalSkills + 8, 100),
              problemSolving: Math.min(prev.categories.problemSolving + 5, 100),
            },
            statusSummary: `Exceptional mastery demonstrated! Career readiness increased to ${Math.min(prev.overallScore + 6, 95)}%.`,
          }));
        }
      }
    } catch (e) {
      console.warn('Adaptive roadmap engine fallback:', e);
    }
  };

  const toggleDailyTask = (taskId: string) => {
    setDailyPlan((prev) => {
      const updatedTasks = prev.tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t));
      const newlyCompleted = updatedTasks.find((t) => t.id === taskId)?.completed;

      if (newlyCompleted) {
        confetti({ particleCount: 25, spread: 50, origin: { y: 0.8 } });
      }

      return {
        ...prev,
        tasks: updatedTasks,
      };
    });
  };

  const toggleProjectTask = (stepNumber: number) => {
    setActiveProject((prev) => {
      const updated = prev.tasks.map((t) => (t.step === stepNumber ? { ...t, done: !t.done } : t));
      const allDone = updated.every((t) => t.done);
      return {
        ...prev,
        tasks: updated,
        status: allDone ? 'Completed' : 'In Progress',
      };
    });
  };

  const updateMilestoneProgress = (milestoneId: string, progress: number) => {
    setRoadmap((prev) => {
      const updatedPhases = prev.phases.map((phase) => ({
        ...phase,
        milestones: phase.milestones.map((m) => {
          if (m.id === milestoneId) {
            const newProgress = Math.min(Math.max(progress, 0), 100);
            return {
              ...m,
              progressPercent: newProgress,
              status: newProgress === 100 ? 'Completed' : newProgress > 0 ? 'In Progress' : m.status,
            };
          }
          return m;
        }),
      }));

      // Calculate new overall progress
      let totalMilestones = 0;
      let sumProgress = 0;
      updatedPhases.forEach((p) => {
        p.milestones.forEach((m) => {
          totalMilestones++;
          sumProgress += m.progressPercent;
        });
      });

      return {
        ...prev,
        phases: updatedPhases,
        overallProgress: totalMilestones > 0 ? Math.round(sumProgress / totalMilestones) : prev.overallProgress,
      };
    });
  };

  const sendCopilotMessage = async (userText: string) => {
    const userMsg: CopilotMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: 'Just now',
    };

    setCopilotMessages((prev) => [...prev, userMsg]);

    try {
      const response = await fetchWithTimeout('/api/copilot-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          studentProfile: profile,
          currentMilestone: roadmap.phases?.[0]?.milestones?.find((m) => m.status === 'In Progress') || roadmap.phases?.[0]?.milestones?.[0],
          assessmentHistory,
        }),
      });

      const res = await response.json();
      const botReply = res.reply || "I'm analyzing your learning telemetry. Let's conquer your current milestone!";

      setCopilotMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: botReply,
          timestamp: 'Just now',
        },
      ]);
    } catch (e) {
      setCopilotMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: `Focus on completing your daily plan for **${profile.targetRole}**. Consistency with your current milestone will bridge your skill gap rapidly!`,
          timestamp: 'Just now',
        },
      ]);
    }
  };

  const generateNewProject = async (difficulty: 'Beginner' | 'Intermediate' | 'Advanced') => {
    try {
      const response = await fetchWithTimeout('/api/generate-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetRole: profile.targetRole,
          difficulty,
          skillGaps: skillGaps.map((g) => g.skill),
        }),
      });

      const res = await response.json();
      if (res.data) {
        setActiveProject(res.data);
        confetti({ particleCount: 40, spread: 60 });
      }
    } catch (e) {
      console.warn('Project generation failed:', e);
    }
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        roadmap,
        skillGaps,
        dailyPlan,
        careerReadiness,
        currentAssessment,
        assessmentHistory,
        activeProject,
        aiRecommendations,
        currentView,
        selectedMilestone,
        copilotOpen,
        demoTourOpen,
        copilotMessages,
        isGenerating,
        adaptiveNotice,
        hasGeminiKey,
        setCurrentView,
        setSelectedMilestone,
        setCopilotOpen,
        setDemoTourOpen,
        dismissAdaptiveNotice,
        loadDemoMode,
        resetAll,
        generateRoadmap,
        submitAssessment,
        toggleDailyTask,
        toggleProjectTask,
        updateMilestoneProgress,
        sendCopilotMessage,
        generateNewProject,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
