export type ProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type GapSeverity = 'Low' | 'Medium' | 'High';
export type MilestoneStatus = 'Completed' | 'In Progress' | 'Upcoming' | 'Locked';
export type LearningStyle = 'Video' | 'Reading' | 'Hands-on Projects' | 'Practice Problems' | 'AI explanations';

export interface Skill {
  name: string;
  level: ProficiencyLevel;
}

export interface SkillGap {
  skill: string;
  currentLevel: ProficiencyLevel | 'None';
  requiredLevel: ProficiencyLevel;
  gapSeverity: GapSeverity;
  importanceReason: string;
  category: 'Core' | 'Tooling' | 'Advanced' | 'Domain';
}

export interface LearningResource {
  id: string;
  title: string;
  type: 'Video' | 'Documentation' | 'Article' | 'Practice' | 'Project';
  url: string;
  platform: string;
  estimatedMinutes: number;
  free: boolean;
  selectionReason: string;
  completed?: boolean;
}

export interface DailyTask {
  id: string;
  title: string;
  durationMinutes: number;
  type: 'Learn' | 'Practice' | 'Assess' | 'Build';
  completed: boolean;
  objective: string;
}

export interface DailyPlan {
  date: string;
  totalMinutes: number;
  focusMilestoneId: string;
  focusSkill: string;
  todayGoal: string;
  tasks: DailyTask[];
  motivationQuote?: string;
}

export interface Milestone {
  id: string;
  phaseId: string;
  weekRange: string;
  title: string;
  skill: string;
  description: string;
  status: MilestoneStatus;
  progressPercent: number;
  estimatedHours: number;
  learningObjectives: string[];
  topics: string[];
  resources: LearningResource[];
  practiceTasks: string[];
  miniProjectTitle?: string;
  miniProjectDesc?: string;
  isBoosterSprint?: boolean;
  boosterReason?: string;
  assessmentId?: string;
}

export interface RoadmapPhase {
  id: string;
  phaseNumber: number;
  title: string;
  timeframe: string;
  description: string;
  milestones: Milestone[];
}

export interface Roadmap {
  id: string;
  targetRole: string;
  totalWeeks: number;
  generatedAt: string;
  phases: RoadmapPhase[];
  overallProgress: number;
  adaptationNotice?: string;
  adaptationCount: number;
}

export interface StudentProfile {
  name: string;
  targetRole: string;
  currentSkills: Skill[];
  educationLevel: string;
  previousExperience: string;
  existingProjects: string;
  availableHoursPerDay: string; // e.g. "2 hours/day"
  targetTimeline: string; // e.g. "12 weeks"
  learningStyles: LearningStyle[];
  streakDays: number;
  hoursCompletedThisWeek: number;
  totalHoursStudied: number;
}

export interface CareerReadiness {
  overallScore: number; // 0 - 100
  categories: {
    technicalSkills: number;
    projects: number;
    problemSolving: number;
    communication: number;
    interviewReadiness: number;
  };
  statusSummary: string;
  biggestGaps: string[];
  recommendedMilestonesTo90: string[];
  isJobReady: boolean;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'scenario';
  codeSnippet?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  skillSubtopic: string;
}

export interface Assessment {
  id: string;
  title: string;
  skillTested: string;
  milestoneId: string;
  questions: AssessmentQuestion[];
  passingScore: number;
}

export interface AssessmentResult {
  assessmentId: string;
  milestoneId: string;
  skillTested: string;
  score: number; // 0 - 100
  passed: boolean;
  date: string;
  userAnswers: number[];
  strongAreas: string[];
  weakAreas: string[];
  aiAnalysis: string;
  recommendation: string;
}

export interface ProjectTask {
  step: number;
  title: string;
  details: string;
  done?: boolean;
}

export interface Project {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  problemStatement: string;
  objective: string;
  skillsRequired: string[];
  datasetSuggestion: string;
  techStack: string[];
  tasks: ProjectTask[];
  expectedOutcome: string;
  evaluationCriteria: string[];
  portfolioDescription: string;
  githubReadmeSnippet: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
}

export interface AIRecommendation {
  id: string;
  type: 'warning' | 'tip' | 'praise' | 'adaptation';
  title: string;
  message: string;
  actionText?: string;
  actionTab?: string;
  timestamp: string;
}

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedPrompts?: string[];
}
