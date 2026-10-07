import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '10mb' }));

// Server-side initialization of Gemini client according to SKILL.md guidelines
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(apiKey && apiKey.length > 5),
    model: 'gemini-3.8-flash',
  });
});

// Helper for safe JSON extraction from Gemini text
function safeJsonParse(text: string): any {
  try {
    // Check if wrapped in markdown code blocks ```json ... ```
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    const raw = jsonMatch ? jsonMatch[1] : text;
    return JSON.parse(raw.trim());
  } catch (err) {
    // Try finding the first '{' and last '}'
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start !== -1 && end !== -1 && end > start) {
      try {
        return JSON.parse(text.substring(start, end + 1));
      } catch (innerErr) {
        // Failed
      }
    }
    return null;
  }
}

// 1. Generate Personalized Learning Roadmap & Skill Gaps
app.post('/api/generate-roadmap', async (req: Request, res: Response) => {
  const {
    targetRole,
    currentSkills,
    educationLevel,
    previousExperience,
    existingProjects,
    availableHoursPerDay,
    targetTimeline,
    learningStyles,
  } = req.body;

  if (!targetRole) {
    res.status(400).json({ error: 'Target role is required' });
    return;
  }

  // Attempt Gemini API call
  if (ai) {
    try {
      const prompt = `
You are SkillPilot AI, an elite career architect and learning engineer.
A student needs a hyper-personalized, realistic, time-bound learning roadmap and skill gap analysis.

STUDENT PROFILE:
- Target Career Role: ${targetRole}
- Current Skills & Proficiencies: ${JSON.stringify(currentSkills || [])}
- Education Level: ${educationLevel || 'Not specified'}
- Previous Experience: ${previousExperience || 'None'}
- Existing Projects: ${existingProjects || 'None'}
- Available Study Time: ${availableHoursPerDay || '2 hours/day'}
- Target Deadline/Timeline: ${targetTimeline || '12 weeks'}
- Preferred Learning Styles: ${JSON.stringify(learningStyles || ['Hands-on Projects'])}

CRITICAL AI PRINCIPLES:
1. Do NOT dump an overwhelming list of 50 tools. Prioritize what matters most for their specific starting point.
2. Compare their current level against realistic industry standards for ${targetRole}.
3. Create a sequential, chronological roadmap with distinct phases and milestones (estimate 4 to 6 milestones total).
4. Each milestone must have realistic estimated hours, specific topics, high quality learning resources (with realistic URLs, platform, type, and selection reason), practice tasks, and a mini-project.
5. Compute a realistic Skill Match % (e.g. 35% - 55% for a transitioning student) and natural language diagnosis.

Return ONLY a valid JSON object with the following schema:
{
  "skillGaps": [
    {
      "skill": "SQL",
      "currentLevel": "Beginner" | "Intermediate" | "Advanced" | "None",
      "requiredLevel": "Beginner" | "Intermediate" | "Advanced",
      "gapSeverity": "Low" | "Medium" | "High",
      "importanceReason": "string explanation why this skill is vital for ${targetRole}",
      "category": "Core" | "Tooling" | "Advanced" | "Domain"
    }
  ],
  "overallSkillMatch": 45,
  "matchAnalysis": "Natural language explanation of current foundations and top gap priorities",
  "roadmap": {
    "targetRole": "${targetRole}",
    "totalWeeks": 12,
    "phases": [
      {
        "id": "phase-1",
        "phaseNumber": 1,
        "title": "Phase 1: Title",
        "timeframe": "Weeks 1–4",
        "description": "Phase description",
        "milestones": [
          {
            "id": "ms-1",
            "phaseId": "phase-1",
            "weekRange": "Weeks 1–2",
            "title": "Milestone Title",
            "skill": "Skill Name",
            "description": "Milestone description",
            "status": "In Progress" | "Upcoming" | "Locked",
            "progressPercent": 0,
            "estimatedHours": 20,
            "learningObjectives": ["Obj 1", "Obj 2", "Obj 3"],
            "topics": ["Topic 1", "Topic 2", "Topic 3"],
            "resources": [
              {
                "id": "r-1",
                "title": "Resource title",
                "type": "Video" | "Documentation" | "Article" | "Practice" | "Project",
                "url": "https://example.com",
                "platform": "Platform Name",
                "estimatedMinutes": 90,
                "free": true,
                "selectionReason": "Why chosen for this student"
              }
            ],
            "practiceTasks": ["Task 1", "Task 2"],
            "miniProjectTitle": "Mini Project Name",
            "miniProjectDesc": "Mini Project description"
          }
        ]
      }
    ]
  },
  "initialCareerReadiness": {
    "overallScore": 55,
    "categories": {
      "technicalSkills": 60,
      "projects": 50,
      "problemSolving": 55,
      "communication": 50,
      "interviewReadiness": 40
    },
    "statusSummary": "Short status sentence",
    "biggestGaps": ["Gap 1", "Gap 2"],
    "recommendedMilestonesTo90": ["Rec 1", "Rec 2"]
  }
}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      });

      const parsed = safeJsonParse(response.text || '');
      if (parsed && parsed.roadmap && parsed.skillGaps) {
        res.json({
          success: true,
          aiPowered: true,
          data: parsed,
        });
        return;
      }
    } catch (err: any) {
      console.warn('Gemini generate-roadmap error, falling back to intelligent generator:', err?.message);
    }
  }

  // Graceful fallback: dynamically synthesize based on input role & skills
  const fallbackData = generateDynamicFallbackRoadmap(
    targetRole,
    currentSkills || [],
    availableHoursPerDay || '2 hours/day',
    targetTimeline || '12 weeks'
  );

  res.json({
    success: true,
    aiPowered: false,
    fallbackReason: apiKey ? 'Live AI responded with non-JSON format, used structured engine' : 'Running in demo mode with intelligent local AI engine',
    data: fallbackData,
  });
});

// 2. Generate Assessment
app.post('/api/generate-assessment', async (req: Request, res: Response) => {
  const { targetRole, skillTested, milestoneId, difficulty = 'Intermediate' } = req.body;

  if (ai) {
    try {
      const prompt = `
You are SkillPilot AI Assessment Engine.
Create a high-quality 5-question technical assessment for a student aiming for '${targetRole}', currently testing their mastery on '${skillTested}' at '${difficulty}' difficulty.

Include:
- 3 multiple-choice conceptual/problem-solving questions
- 1 code/query snippet analysis question
- 1 true/false or edge-case scenario question
For each question provide 4 options (or 2 for true/false), the 0-indexed correct answer, a thorough educational explanation, and subtopic tag.

Return ONLY a valid JSON object matching:
{
  "id": "assess-${Date.now()}",
  "title": "${skillTested} Mastery Assessment",
  "skillTested": "${skillTested}",
  "milestoneId": "${milestoneId || 'current'}",
  "passingScore": 70,
  "questions": [
    {
      "id": "q1",
      "question": "question text",
      "type": "multiple-choice" | "true-false" | "scenario",
      "codeSnippet": "optional code snippet",
      "options": ["opt 0", "opt 1", "opt 2", "opt 3"],
      "correctAnswerIndex": 0,
      "explanation": "educational explanation",
      "skillSubtopic": "subtopic"
    }
  ]
}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      });

      const parsed = safeJsonParse(response.text || '');
      if (parsed && Array.isArray(parsed.questions) && parsed.questions.length > 0) {
        res.json({ success: true, aiPowered: true, data: parsed });
        return;
      }
    } catch (err: any) {
      console.warn('Gemini generate-assessment error:', err?.message);
    }
  }

  // Fallback assessment
  res.json({
    success: true,
    aiPowered: false,
    data: getFallbackAssessment(skillTested || 'SQL', milestoneId || 'ms-2'),
  });
});

// 3. AI Adaptive Roadmap Engine
app.post('/api/adapt-roadmap', async (req: Request, res: Response) => {
  const { currentRoadmap, assessmentResult, studentProfile } = req.body;

  const score = assessmentResult?.score ?? 50;
  const skillTested = assessmentResult?.skillTested || 'SQL';
  const weakAreas = assessmentResult?.weakAreas || ['Core syntax'];

  if (ai) {
    try {
      const prompt = `
You are the SkillPilot AI Adaptive Engine.
A student just completed an assessment on '${skillTested}' with a score of ${score}%.
Passing score is 70%.
Weak Areas detected: ${JSON.stringify(weakAreas)}
Strong Areas: ${JSON.stringify(assessmentResult?.strongAreas || [])}

ROADMAP ADAPTATION RULES:
- If score < 70%: AI MUST detect the learning gap and automatically insert a 3-Day Targeted Booster Sprint milestone right before advancing, and adjust future milestone deadlines.
- If score >= 85%: AI should recommend fast-tracking or skipping preliminary refresher tasks to save time, and unlock advanced capstone tasks early.

Generate the adaptive modifications in JSON format:
{
  "adaptationDetected": true,
  "adaptationType": "${score < 70 ? 'Remedial Booster Sprint' : 'Accelerated Fast-Track'}",
  "headline": "AI detected a learning gap in ${skillTested} (${score}%)",
  "reason": "Detailed explanation of why the roadmap is modifying and which specific topics need reinforcement",
  "boosterMilestone": {
    "id": "booster-${Date.now()}",
    "title": "3-Day Mastery Booster Sprint: ${weakAreas[0] || skillTested} Practice",
    "skill": "${skillTested}",
    "description": "High-intensity targeted reinforcement sprint to resolve identified gaps before proceeding.",
    "isBoosterSprint": true,
    "boosterReason": "Score was ${score}% on recent assessment",
    "status": "In Progress",
    "progressPercent": 0,
    "estimatedHours": 8,
    "learningObjectives": ["Master ${weakAreas[0] || skillTested} edge cases", "Eliminate common syntax pitfalls", "Retake check-in quiz"],
    "topics": ["Targeted drills", "Error diagnostics", "Pattern recognition"],
    "resources": [
      {
        "id": "b-r1",
        "title": "Interactive Targeted Drills: ${weakAreas[0] || skillTested}",
        "type": "Practice",
        "url": "https://leetcode.com",
        "platform": "SkillPilot Practice Lab",
        "estimatedMinutes": 60,
        "free": true,
        "selectionReason": "Directly attacks the weaknesses identified in your recent quiz."
      }
    ],
    "practiceTasks": ["Complete 5 targeted practice exercises on ${weakAreas[0] || skillTested}", "Audit past mistake explanations"],
    "miniProjectTitle": "${skillTested} Debugging Lab",
    "miniProjectDesc": "Fix 3 intentionally broken queries with JOIN / logic errors."
  },
  "readinessDelta": ${score < 70 ? -3 : 6},
  "copilotMessage": "Encouraging mentor comment about the adaptation."
}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      });

      const parsed = safeJsonParse(response.text || '');
      if (parsed && parsed.headline) {
        res.json({ success: true, aiPowered: true, data: parsed });
        return;
      }
    } catch (err: any) {
      console.warn('Gemini adapt-roadmap error:', err?.message);
    }
  }

  // Deterministic high-quality adaptation
  const fallbackAdaptation = {
    adaptationDetected: true,
    adaptationType: score < 70 ? 'Remedial Booster Sprint' : 'Accelerated Fast-Track',
    headline: score < 70
      ? `AI detected a learning gap in ${skillTested} (${score}%)`
      : `High performance unlocked in ${skillTested} (${score}%)`,
    reason: score < 70
      ? `Your assessment indicated difficulty with ${weakAreas.join(' and ')}. Advancing without mastering this would risk failure in the upcoming portfolio project. A 3-day targeted booster sprint has been inserted.`
      : `Outstanding comprehension demonstrated! Preliminary lessons in subsequent modules have been streamlined to accelerate your career readiness.`,
    boosterMilestone: score < 70 ? {
      id: `booster-ms-${Date.now()}`,
      phaseId: 'phase-1',
      weekRange: 'Supplemental (3 Days)',
      title: `3-Day Booster Sprint: ${weakAreas[0] || 'JOIN Operations'} Reinforcement`,
      skill: skillTested,
      description: `High-intensity targeted reinforcement sprint inserted by AI to master ${weakAreas[0] || 'JOIN operations and null safety'}.`,
      status: 'In Progress',
      progressPercent: 0,
      estimatedHours: 6,
      isBoosterSprint: true,
      boosterReason: `AI detected score of ${score}% with weakness in ${weakAreas.join(', ')}`,
      learningObjectives: [
        `Dissect the differences between INNER JOIN, LEFT JOIN, and Cartesian product traps`,
        `Fix NULL preservation issues in multi-table queries`,
        `Re-test with confidence before resuming the primary roadmap`,
      ],
      topics: [
        'Venn Diagram Logic & SQL Execution Order',
        'Filtering in ON clause vs WHERE clause',
        'Anti-Join patterns with IS NULL',
      ],
      resources: [
        {
          id: `br-1-${Date.now()}`,
          title: 'Mastering SQL JOINs: Edge Cases & Common Pitfalls',
          type: 'Article',
          url: 'https://mode.com/sql-tutorial/sql-joins/',
          platform: 'Mode SQL Lab',
          estimatedMinutes: 45,
          free: true,
          selectionReason: 'Direct visual remedy for the exact join logic missed in your assessment.',
        },
        {
          id: `br-2-${Date.now()}`,
          title: 'Targeted Multi-Table Query Practice Drills',
          type: 'Practice',
          url: 'https://leetcode.com',
          platform: 'SQL Exercises',
          estimatedMinutes: 60,
          free: true,
          selectionReason: 'Five interactive drills focusing exclusively on NULL preservation.',
        },
      ],
      practiceTasks: [
        'Complete 5 targeted practice exercises on JOIN null checks',
        'Re-read explanations for the questions missed in your assessment',
      ],
      miniProjectTitle: 'JOIN Debugging & Anti-Join Challenge',
      miniProjectDesc: 'Debug 3 queries that suffer from accidental row loss and duplicate multiplicity.',
    } : null,
    readinessDelta: score < 70 ? -2 : 5,
    copilotMessage: score < 70
      ? `Don't be discouraged! Detecting gaps now is the entire purpose of SkillPilot. This 3-day booster will cement your foundation so you excel in interviews.`
      : `Fantastic work! You aced this assessment. I've tuned your path so you can progress faster toward your portfolio project.`,
  };

  res.json({
    success: true,
    aiPowered: false,
    data: fallbackAdaptation,
  });
});

// 4. Generate Portfolio Project
app.post('/api/generate-project', async (req: Request, res: Response) => {
  const { targetRole, difficulty = 'Intermediate', skillGaps = [] } = req.body;

  if (ai) {
    try {
      const prompt = `
You are the SkillPilot AI Portfolio Architect.
Generate a competition-grade, resume-worthy portfolio project tailored for a student aiming for '${targetRole}' at '${difficulty}' difficulty.
The project must directly strengthen these identified skill gaps: ${JSON.stringify(skillGaps)}.

Return ONLY a valid JSON object matching:
{
  "id": "proj-${Date.now()}",
  "title": "Project Title",
  "difficulty": "${difficulty}",
  "problemStatement": "Realistic business/technical problem statement",
  "objective": "Clear project objective",
  "skillsRequired": ["Skill 1", "Skill 2", "Skill 3"],
  "datasetSuggestion": "Specific realistic dataset recommendation",
  "techStack": ["Tech 1", "Tech 2", "Tech 3"],
  "tasks": [
    { "step": 1, "title": "Step 1 title", "details": "Step 1 details", "done": false },
    { "step": 2, "title": "Step 2 title", "details": "Step 2 details", "done": false },
    { "step": 3, "title": "Step 3 title", "details": "Step 3 details", "done": false },
    { "step": 4, "title": "Step 4 title", "details": "Step 4 details", "done": false },
    { "step": 5, "title": "Step 5 title", "details": "Step 5 details", "done": false }
  ],
  "expectedOutcome": "What the student walks away with",
  "evaluationCriteria": ["Criterion 1", "Criterion 2", "Criterion 3"],
  "portfolioDescription": "1-2 sentence resume bullet point ready for LinkedIn/CV",
  "githubReadmeSnippet": "# Markdown formatted README snippet for GitHub",
  "status": "In Progress"
}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.4,
        },
      });

      const parsed = safeJsonParse(response.text || '');
      if (parsed && parsed.title && parsed.tasks) {
        res.json({ success: true, aiPowered: true, data: parsed });
        return;
      }
    } catch (err: any) {
      console.warn('Gemini generate-project error:', err?.message);
    }
  }

  // Fallback project
  res.json({
    success: true,
    aiPowered: false,
    data: getFallbackProject(targetRole || 'Data Analyst', difficulty),
  });
});

// 5. SkillPilot Copilot Chat
app.post('/api/copilot-chat', async (req: Request, res: Response) => {
  const { message, studentProfile, currentMilestone, assessmentHistory } = req.body;

  if (!message) {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  if (ai) {
    try {
      const prompt = `
You are "SkillPilot Copilot", an empathetic, highly knowledgeable senior engineering mentor and career strategist.
You are assisting a student inside the SkillPilot AI platform.

STUDENT CONTEXT:
- Name: ${studentProfile?.name || 'Alex'}
- Target Role: ${studentProfile?.targetRole || 'Data Analyst'}
- Available Time: ${studentProfile?.availableHoursPerDay || '2 hours/day'}
- Target Timeline: ${studentProfile?.targetTimeline || '12 weeks'}
- Current Learning Milestone: ${currentMilestone?.title || 'Advanced SQL: JOIN Operations & Subqueries'}
- Current Milestone Skill: ${currentMilestone?.skill || 'SQL'}
- Recent Assessment History: ${JSON.stringify(assessmentHistory || [])}

USER MESSAGE:
"${message}"

INSTRUCTIONS:
1. Always ground your answer in their actual career role (${studentProfile?.targetRole || 'Data Analyst'}) and current progress.
2. If they ask "What should I learn today?", give a crisp 3-part micro-plan tailored to their available daily time.
3. If they ask a technical question (like explaining SQL JOINs, DAX, Docker, etc.), provide clean visual metaphors and bullet points.
4. Keep the tone encouraging, laser-focused, professional, and practical. Keep it concise (under 250 words unless detailed code is requested).
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          temperature: 0.5,
        },
      });

      if (response.text) {
        res.json({
          success: true,
          aiPowered: true,
          reply: response.text,
        });
        return;
      }
    } catch (err: any) {
      console.warn('Gemini copilot error:', err?.message);
    }
  }

  // Fallback intelligent copilot answers
  const fallbackReply = generateFallbackCopilotReply(message, studentProfile, currentMilestone);
  res.json({
    success: true,
    aiPowered: false,
    reply: fallbackReply,
  });
});

// Helper Fallback functions
function generateDynamicFallbackRoadmap(role: string, currentSkills: any[], availableHours: string, timeline: string) {
  const roleLower = role.toLowerCase();
  const isData = roleLower.includes('data') || roleLower.includes('bi') || roleLower.includes('analytics');
  const isDev = roleLower.includes('web') || roleLower.includes('full') || roleLower.includes('front') || roleLower.includes('back');
  const isAI = roleLower.includes('ai') || roleLower.includes('ml') || roleLower.includes('machine') || roleLower.includes('deep');

  if (isData) {
    return {
      skillGaps: [
        {
          skill: 'SQL',
          currentLevel: 'Beginner',
          requiredLevel: 'Advanced',
          gapSeverity: 'High',
          importanceReason: 'Foundational for extracting and transforming data from relational warehouses.',
          category: 'Core',
        },
        {
          skill: 'Power BI / Tableau',
          currentLevel: 'None',
          requiredLevel: 'Intermediate',
          gapSeverity: 'High',
          importanceReason: 'Vital for delivering interactive visual KPI dashboards to business leaders.',
          category: 'Tooling',
        },
        {
          skill: 'Python (Pandas)',
          currentLevel: 'Beginner',
          requiredLevel: 'Intermediate',
          gapSeverity: 'Medium',
          importanceReason: 'Critical for exploratory data analysis, data wrangling, and statistical checks.',
          category: 'Core',
        },
        {
          skill: 'Statistics & A/B Testing',
          currentLevel: 'Beginner',
          requiredLevel: 'Intermediate',
          gapSeverity: 'Medium',
          importanceReason: 'Ensures data conclusions are mathematically sound and not random variance.',
          category: 'Domain',
        },
        {
          skill: 'Excel Modeling',
          currentLevel: 'Intermediate',
          requiredLevel: 'Advanced',
          gapSeverity: 'Low',
          importanceReason: 'You have solid foundation; just advance into dynamic arrays and Power Query.',
          category: 'Core',
        },
      ],
      overallSkillMatch: 47,
      matchAnalysis: `You possess a good initial base in Excel and basic syntax. However, to be competitive for ${role}, your top priorities must be mastering multi-table SQL queries, dimensional data modeling in Power BI, and statistical analysis in Python.`,
      roadmap: {
        targetRole: role,
        totalWeeks: 12,
        phases: [
          {
            id: 'phase-1',
            phaseNumber: 1,
            title: 'Phase 1: Relational Querying & SQL Mastery',
            timeframe: 'Weeks 1–4',
            description: 'Master relational extraction, complex JOINs, CTEs, subqueries, and window functions.',
            milestones: [
              {
                id: 'ms-1',
                phaseId: 'phase-1',
                weekRange: 'Weeks 1–2',
                title: 'SQL Fundamentals & Relational Filters',
                skill: 'SQL',
                description: 'Master SELECT, WHERE, GROUP BY, HAVING, and fundamental relational algebra.',
                status: 'Completed',
                progressPercent: 100,
                estimatedHours: 24,
                learningObjectives: ['Write clean multi-column queries', 'Aggregate metrics with GROUP BY', 'Filter rows with complex boolean logic'],
                topics: ['SELECT & Aliasing', 'WHERE Filtering', 'GROUP BY & HAVING', 'Aggregations', 'Sorting'],
                resources: [
                  {
                    id: 'r-1',
                    title: 'Interactive SQL Tutorial',
                    type: 'Practice',
                    url: 'https://mode.com/sql-tutorial/',
                    platform: 'Mode Analytics',
                    estimatedMinutes: 120,
                    free: true,
                    selectionReason: 'Direct in-browser execution with real company schemas.',
                  },
                ],
                practiceTasks: ['Solve 15 beginner SQL exercises', 'Extract top 10 products from retail database'],
                miniProjectTitle: 'Retail Sales Extraction Script',
                miniProjectDesc: 'Produce quarterly revenue reports across product categories.',
              },
              {
                id: 'ms-2',
                phaseId: 'phase-1',
                weekRange: 'Weeks 3–4',
                title: 'Advanced SQL: JOIN Operations & Subqueries',
                skill: 'SQL',
                description: 'Master INNER, LEFT, RIGHT, FULL JOINs, subqueries, CTEs, and CASE WHEN logic.',
                status: 'In Progress',
                progressPercent: 45,
                estimatedHours: 28,
                learningObjectives: ['Differentiate INNER vs LEFT JOIN null mechanics', 'Write Common Table Expressions (WITH clauses)', 'Prevent duplicate rows in one-to-many joins'],
                topics: ['INNER & OUTER JOINs', 'Anti-Joins with NULL checks', 'Common Table Expressions (CTEs)', 'CASE WHEN logic'],
                resources: [
                  {
                    id: 'r-2',
                    title: 'Visual Guide to SQL JOINs',
                    type: 'Article',
                    url: 'https://blog.codinghorror.com/a-visual-explanation-of-sql-joins/',
                    platform: 'Coding Horror',
                    estimatedMinutes: 40,
                    free: true,
                    selectionReason: 'Visual memory anchor for relational joins.',
                  },
                ],
                practiceTasks: ['Solve LeetCode #175, #181, #183', 'Write a CTE analyzing customer retention'],
                miniProjectTitle: 'Customer Churn Multi-Table Schema Audit',
                miniProjectDesc: 'Join customer accounts, payments, and activity to identify 60-day churn.',
              },
            ],
          },
          {
            id: 'phase-2',
            phaseNumber: 2,
            title: 'Phase 2: Applied Python & Statistical Analysis',
            timeframe: 'Weeks 5–8',
            description: 'Leverage Python pandas and seaborn for exploratory data analysis and hypothesis testing.',
            milestones: [
              {
                id: 'ms-3',
                phaseId: 'phase-2',
                weekRange: 'Weeks 5–6',
                title: 'Exploratory Data Analysis with Pandas & Seaborn',
                skill: 'Python',
                description: 'Clean messy dataframes, handle nulls, reshape tables, and uncover correlations.',
                status: 'Upcoming',
                progressPercent: 0,
                estimatedHours: 28,
                learningObjectives: ['Manipulate DataFrames using pandas', 'Impute missing values reliably', 'Plot distribution charts with Seaborn'],
                topics: ['DataFrames', 'Handling Nulls', 'GroupBy Operations', 'Seaborn Heatmaps', 'Outlier Detection'],
                resources: [
                  {
                    id: 'r-3',
                    title: 'Kaggle Pandas Interactive Course',
                    type: 'Practice',
                    url: 'https://www.kaggle.com/learn/pandas',
                    platform: 'Kaggle',
                    estimatedMinutes: 150,
                    free: true,
                    selectionReason: 'Zero-setup interactive Jupyter notebooks.',
                  },
                ],
                practiceTasks: ['Clean 50k airline flight delay records', 'Generate correlation heatmap'],
                miniProjectTitle: 'Airline Bottleneck Delay Analysis',
                miniProjectDesc: 'Uncover 3 primary causes of runway departures delay.',
              },
              {
                id: 'ms-4',
                phaseId: 'phase-2',
                weekRange: 'Weeks 7–8',
                title: 'Business Statistics & A/B Test Validation',
                skill: 'Statistics',
                description: 'Apply hypothesis testing, p-values, confidence intervals, and experiment design.',
                status: 'Upcoming',
                progressPercent: 0,
                estimatedHours: 24,
                learningObjectives: ['Calculate normal distributions and z-scores', 'Formulate null and alternative hypotheses', 'Run two-sample t-tests in scipy.stats'],
                topics: ['Descriptive Stats', 'Probability Distributions', 'Hypothesis Testing', 'p-values', 'A/B Test Design'],
                resources: [
                  {
                    id: 'r-4',
                    title: 'StatQuest: Hypothesis Testing Made Easy',
                    type: 'Video',
                    url: 'https://statquest.org/',
                    platform: 'StatQuest',
                    estimatedMinutes: 60,
                    free: true,
                    selectionReason: 'Intuitive visual explanation without math jargon.',
                  },
                ],
                practiceTasks: ['Analyze A/B test conversion rate data in Python', 'Calculate p-value and statistical significance'],
                miniProjectTitle: 'E-Commerce Checkout Flow A/B Test',
                miniProjectDesc: 'Formal statistical report on whether checkout redesign improved sales.',
              },
            ],
          },
          {
            id: 'phase-3',
            phaseNumber: 3,
            title: 'Phase 3: Business Intelligence & Portfolio Capstone',
            timeframe: 'Weeks 9–12',
            description: 'Design enterprise Power BI dashboards with DAX, assemble your capstone, and prepare for interviews.',
            milestones: [
              {
                id: 'ms-5',
                phaseId: 'phase-3',
                weekRange: 'Weeks 9–10',
                title: 'Power BI Dashboarding & DAX Modeling',
                skill: 'Power BI',
                description: 'Construct star schemas, write CALCULATE measures, and publish interactive reports.',
                status: 'Locked',
                progressPercent: 0,
                estimatedHours: 26,
                learningObjectives: ['Build Star Schemas with 1-to-many relationships', 'Write DAX time-intelligence formulas', 'Design executive KPI dashboards with drilldowns'],
                topics: ['Star Schema Modeling', 'DAX Measures', 'CALCULATE & RELATED', 'Interactive Slicers'],
                resources: [
                  {
                    id: 'r-5',
                    title: 'Microsoft Power BI Guided Learning',
                    type: 'Documentation',
                    url: 'https://learn.microsoft.com/en-us/power-bi/',
                    platform: 'Microsoft Learn',
                    estimatedMinutes: 180,
                    free: true,
                    selectionReason: 'Official Microsoft certification curriculum.',
                  },
                ],
                practiceTasks: ['Model 4-table retail schema in Power BI Desktop', 'Create DAX measures for YTD Revenue'],
                miniProjectTitle: 'Executive Retail Performance BI Suite',
                miniProjectDesc: 'Interactive 3-page Power BI dashboard with dynamic filters.',
              },
              {
                id: 'ms-6',
                phaseId: 'phase-3',
                weekRange: 'Weeks 11–12',
                title: 'Capstone Portfolio & Technical Interview Mastery',
                skill: 'Data Storytelling',
                description: 'Assemble end-to-end case study on GitHub and practice live technical interview queries.',
                status: 'Locked',
                progressPercent: 0,
                estimatedHours: 30,
                learningObjectives: ['Synthesize SQL, Python, and Power BI into one project', 'Publish structured GitHub repository', 'Solve live whiteboard SQL challenges'],
                topics: ['Capstone Synthesis', 'GitHub Documentation', 'Live SQL Coding', 'STAR Method Interviews'],
                resources: [
                  {
                    id: 'r-6',
                    title: 'Building a Standout Data Portfolio',
                    type: 'Article',
                    url: 'https://towardsdatascience.com',
                    platform: 'Towards Data Science',
                    estimatedMinutes: 45,
                    free: true,
                    selectionReason: 'Hiring manager advice on technical interview rounds.',
                  },
                ],
                practiceTasks: ['Publish complete case study to GitHub', 'Practice 10 live SQL interview questions'],
                miniProjectTitle: 'Industry Capstone: SaaS Churn & Revenue Health',
                miniProjectDesc: 'Complete portfolio centerpiece demonstrating SQL, Python, and Power BI.',
              },
            ],
          },
        ],
      },
      initialCareerReadiness: {
        overallScore: 52,
        categories: {
          technicalSkills: 60,
          projects: 45,
          problemSolving: 55,
          communication: 50,
          interviewReadiness: 40,
        },
        statusSummary: `Solid foundation established. Closing your SQL and Power BI gaps will rapidly push readiness above 80%.`,
        biggestGaps: ['Power BI DAX Modeling', 'Multi-table SQL Window Functions', 'Technical Interview Screen Coding'],
        recommendedMilestonesTo90: [
          'Pass the SQL JOINs assessment with >80%',
          'Build the Power BI Star Schema Dashboard',
          'Complete the SaaS Churn Portfolio Project',
        ],
      },
    };
  }

  // Default generic tech role fallback
  return {
    skillGaps: [
      {
        skill: isAI ? 'PyTorch' : isDev ? 'TypeScript & React' : 'Core Architecture',
        currentLevel: 'Beginner',
        requiredLevel: 'Advanced',
        gapSeverity: 'High',
        importanceReason: `Required core technology for ${role} production environments.`,
        category: 'Core',
      },
      {
        skill: isAI ? 'Vector Databases & RAG' : isDev ? 'Backend APIs & Databases' : 'Cloud Infrastructure',
        currentLevel: 'None',
        requiredLevel: 'Intermediate',
        gapSeverity: 'High',
        importanceReason: 'Essential for modern application workflows.',
        category: 'Core',
      },
      {
        skill: 'Git & Collaboration',
        currentLevel: 'Beginner',
        requiredLevel: 'Intermediate',
        gapSeverity: 'Medium',
        importanceReason: 'Standard for all professional software engineering teams.',
        category: 'Tooling',
      },
    ],
    overallSkillMatch: 42,
    matchAnalysis: `You have an entry foundation in software concepts. Focusing sequentially on the highest severity gaps will maximize your study velocity.`,
    roadmap: {
      targetRole: role,
      totalWeeks: 12,
      phases: [
        {
          id: 'phase-1',
          phaseNumber: 1,
          title: `Phase 1: Foundations of ${role}`,
          timeframe: 'Weeks 1–4',
          description: 'Solidify fundamental syntax, architecture patterns, and version control.',
          milestones: [
            {
              id: 'ms-1',
              phaseId: 'phase-1',
              weekRange: 'Weeks 1–2',
              title: 'Core Fundamentals & Architecture',
              skill: isAI ? 'Python & Math' : isDev ? 'Modern TypeScript' : 'System Foundations',
              description: 'Master core primitives, data structures, and async programming.',
              status: 'In Progress',
              progressPercent: 30,
              estimatedHours: 24,
              learningObjectives: ['Understand architectural patterns', 'Build structured modules', 'Implement unit tests'],
              topics: ['Primitives', 'Control Flow', 'Data Structures', 'Modularity'],
              resources: [
                {
                  id: 'r-1',
                  title: 'Core Documentation & Interactive Guide',
                  type: 'Documentation',
                  url: 'https://developer.mozilla.org',
                  platform: 'Web Docs',
                  estimatedMinutes: 120,
                  free: true,
                  selectionReason: 'Official comprehensive reference.',
                },
              ],
              practiceTasks: ['Build 3 fundamental utility modules', 'Write automated tests'],
              miniProjectTitle: 'Module Architecture Challenge',
              miniProjectDesc: 'Deploy a clean standalone component adhering to industry patterns.',
            },
            {
              id: 'phase-1-ms-2',
              phaseId: 'phase-1',
              weekRange: 'Weeks 3–4',
              title: 'Data Integration & API Communication',
              skill: isAI ? 'Embeddings' : isDev ? 'REST & Database APIs' : 'Networking & APIs',
              description: 'Connect frontend interfaces with backend services and storage.',
              status: 'Upcoming',
              progressPercent: 0,
              estimatedHours: 26,
              learningObjectives: ['Fetch and transform remote data', 'Handle loading and error states', 'Design clean schema contracts'],
              topics: ['HTTP & REST', 'CRUD Operations', 'State Management'],
              resources: [
                {
                  id: 'r-2',
                  title: 'API Integration Best Practices',
                  type: 'Article',
                  url: 'https://github.com',
                  platform: 'Engineering Blog',
                  estimatedMinutes: 60,
                  free: true,
                  selectionReason: 'Industry best practices.',
                },
              ],
              practiceTasks: ['Build an API client with retry handling'],
              miniProjectTitle: 'Data Integration Dashboard',
              miniProjectDesc: 'A live dashboard querying and caching remote telemetry.',
            },
          ],
        },
        {
          id: 'phase-2',
          phaseNumber: 2,
          title: 'Phase 2: Advanced Engineering & Scale',
          timeframe: 'Weeks 5–8',
          description: 'Deep dive into performance optimization, security, and complex state.',
          milestones: [
            {
              id: 'ms-3',
              phaseId: 'phase-2',
              weekRange: 'Weeks 5–6',
              title: 'Performance Optimization & State',
              skill: 'Architecture',
              description: 'Profile memory, optimize render cycles, and streamline storage.',
              status: 'Locked',
              progressPercent: 0,
              estimatedHours: 24,
              learningObjectives: ['Audit performance bottlenecks', 'Implement memoization and caching'],
              topics: ['Caching', 'State Machines', 'Profiling'],
              resources: [],
              practiceTasks: ['Refactor high-latency queries'],
              miniProjectTitle: 'Optimized Data Service',
              miniProjectDesc: 'Refactor an application to achieve sub-100ms response times.',
            },
          ],
        },
        {
          id: 'phase-3',
          phaseNumber: 3,
          title: 'Phase 3: Production Capstone & Job Readiness',
          timeframe: 'Weeks 9–12',
          description: 'Build your capstone application and prepare for technical interviews.',
          milestones: [
            {
              id: 'ms-4',
              phaseId: 'phase-3',
              weekRange: 'Weeks 9–12',
              title: 'Full Production Capstone & Interview Drills',
              skill: 'End-to-End Delivery',
              description: 'Deploy a complete production application and rehearse technical interview questions.',
              status: 'Locked',
              progressPercent: 0,
              estimatedHours: 35,
              learningObjectives: ['Deploy to cloud hosting', 'Implement CI/CD pipeline', 'Ace behavioral and technical interview questions'],
              topics: ['Cloud Deployment', 'Testing & CI/CD', 'Interview Prep'],
              resources: [],
              practiceTasks: ['Write comprehensive README and record demo video'],
              miniProjectTitle: `${role} Portfolio Showcase`,
              miniProjectDesc: 'Production-ready project demonstrating all core skills.',
            },
          ],
        },
      ],
    },
    initialCareerReadiness: {
      overallScore: 45,
      categories: {
        technicalSkills: 50,
        projects: 40,
        problemSolving: 50,
        communication: 45,
        interviewReadiness: 35,
      },
      statusSummary: `Path created. Completing Phase 1 will boost your technical confidence significantly.`,
      biggestGaps: ['Production Architecture', 'Testing & CI/CD', 'Interview Whiteboarding'],
      recommendedMilestonesTo90: ['Complete Phase 1 foundations', 'Deploy a verified capstone project'],
    },
  };
}

function getFallbackAssessment(skill: string, milestoneId: string) {
  return {
    id: `assess-${Date.now()}`,
    title: `${skill} Mastery & Relational Logic Assessment`,
    skillTested: skill,
    milestoneId: milestoneId,
    passingScore: 70,
    questions: [
      {
        id: 'q1',
        question: 'Which SQL statement keeps all rows from the left table and only matched rows from the right table, populating missing matches with NULL?',
        type: 'multiple-choice',
        options: ['INNER JOIN', 'LEFT JOIN (LEFT OUTER JOIN)', 'RIGHT JOIN', 'CROSS JOIN'],
        correctAnswerIndex: 1,
        explanation: 'A LEFT JOIN guarantees every record from the left table is returned. Columns from the right table will contain NULL if there is no matching foreign key.',
        skillSubtopic: 'JOIN Fundamentals',
      },
      {
        id: 'q2',
        question: 'What occurs when you filter on the right table inside a WHERE clause instead of inside the ON clause of a LEFT JOIN?',
        type: 'multiple-choice',
        codeSnippet: `SELECT c.name, o.amount FROM customers c 
LEFT JOIN orders o ON c.id = o.customer_id 
WHERE o.amount > 100;`,
        options: [
          'It executes as a true LEFT JOIN keeping non-matching customers.',
          'It unintentionally turns the query into an INNER JOIN because NULL > 100 evaluates to False/Unknown, discarding customers with no orders.',
          'It throws a syntax error on PostgreSQL.',
          'It generates an infinite Cartesian product.',
        ],
        correctAnswerIndex: 1,
        explanation: 'Filtering in the WHERE clause happens AFTER the join. If a customer had no orders, o.amount is NULL; condition NULL > 100 evaluates to UNKNOWN, discarding that customer.',
        skillSubtopic: 'ON vs WHERE Filtering',
      },
      {
        id: 'q3',
        question: 'If table A has 10 rows and table B has 5 rows, what is the maximum number of rows that an INNER JOIN could return if key columns contain duplicate values?',
        type: 'multiple-choice',
        options: ['5 rows', '10 rows', '50 rows', '15 rows'],
        correctAnswerIndex: 2,
        explanation: 'If all keys in A match all keys in B, an INNER JOIN produces 10 * 5 = 50 rows (a Cartesian product).',
        skillSubtopic: 'Multiplicity',
      },
      {
        id: 'q4',
        question: 'True or False: An Anti-Join pattern can be effectively implemented using `LEFT JOIN ... WHERE right_table.id IS NULL`.',
        type: 'true-false',
        options: ['True', 'False'],
        correctAnswerIndex: 0,
        explanation: 'True. Checking for IS NULL on the right table’s primary key isolates only the records in the left table that have zero corresponding records in the right table.',
        skillSubtopic: 'Anti-Join Logic',
      },
      {
        id: 'q5',
        question: 'Which clause in SQL executes BEFORE the SELECT clause in the official logical query processing order?',
        type: 'multiple-choice',
        options: ['FROM and WHERE', 'ORDER BY', 'LIMIT', 'OFFSET'],
        correctAnswerIndex: 0,
        explanation: 'In SQL execution order, FROM, JOIN, WHERE, GROUP BY, and HAVING evaluate before SELECT. ORDER BY and LIMIT evaluate after SELECT.',
        skillSubtopic: 'Logical Query Processing',
      },
    ],
  };
}

function getFallbackProject(role: string, difficulty: string) {
  return {
    id: `proj-${Date.now()}`,
    title: `${role} Analytics & Churn Intelligence Engine`,
    difficulty: difficulty || 'Intermediate',
    problemStatement: `An enterprise platform is facing a 14% quarterly retention drop. Critical data is fragmented across relational databases and flat files, hindering executive decision-making.`,
    objective: `Build an automated data extraction and modeling pipeline that identifies churn indicators 30 days before contract expiration and surfaces them on an executive dashboard.`,
    skillsRequired: ['Advanced SQL', 'Data Cleaning', 'Power BI / Tableau', 'Statistics', 'Data Storytelling'],
    datasetSuggestion: 'Olist E-Commerce Public Dataset (100k transactions across orders, payments, and customer reviews).',
    techStack: ['PostgreSQL / DuckDB', 'Python (pandas, seaborn)', 'Power BI Desktop', 'GitHub Pages'],
    tasks: [
      { step: 1, title: 'Schema Ingestion & Entity Relationship Design', details: 'Ingest 5 CSV tables into PostgreSQL, verify primary/foreign keys and index customer_id.', done: true },
      { step: 2, title: 'Multi-Table RFM (Recency, Frequency, Monetary) SQL Queries', details: 'Write CTEs calculating last purchase date, total lifetime order count, and average order value per segment.', done: true },
      { step: 3, title: 'Churn Risk Prediction Metric Formulation', details: 'Formulate an empirical churn score based on review ratings and purchase inactivity.', done: false },
      { step: 4, title: 'Executive BI Star Schema & DAX Time Intelligence', details: 'Model fact_orders and dim_customers. Create DAX measures for MoM Churn Rate % and Revenue at Risk.', done: false },
      { step: 5, title: 'Executive Presentation Slide Deck & Portfolio Documentation', details: 'Document findings in an impactful GitHub README with architecture diagrams and business recommendations.', done: false },
    ],
    expectedOutcome: 'A deployable, job-ready portfolio centerpiece demonstrating data engineering, statistical segmentation, and executive visual communication.',
    evaluationCriteria: [
      'Zero duplicate rows or Cartesian explosions in relational joins',
      'Accurate time-intelligence calculations',
      'Actionable business recommendations supported by data',
      'Professional GitHub portfolio documentation following industry standards',
    ],
    portfolioDescription: `Engineered an end-to-end analytical engine using PostgreSQL and Power BI across 100k transactions, identifying 3 key churn drivers and designing an automated risk-scoring dashboard.`,
    githubReadmeSnippet: `# ${role} Analytics & Churn Intelligence Platform

## Overview
Analyzed 100,000+ customer transactions to isolate leading churn risk factors. Built modular SQL CTE pipelines and an executive dashboard highlighting revenue at risk.

## Key Outcomes
- Isolated top 3 customer friction points causing 68% of cancellations
- Modeled dimensional star schema enabling sub-second executive KPI slicing
`,
    status: 'In Progress',
  };
}

function generateFallbackCopilotReply(message: string, profile: any, currentMilestone: any) {
  const msg = message.toLowerCase();
  const role = profile?.targetRole || 'Data Analyst';
  const name = profile?.name || 'Alex';

  if (msg.includes('today') || msg.includes('plan')) {
    return `Hey ${name}! Here is your personalized daily plan for today based on your ${profile?.availableHoursPerDay || '2 hours/day'} schedule:

⏱️ **40 Minutes — Active Learning:**
Work through ${currentMilestone?.title || 'SQL JOIN Operations & Subqueries'}. Focus on when to use LEFT JOIN vs INNER JOIN.

💻 **50 Minutes — Hands-On Practice:**
Solve 3 multi-table join problems connecting customer records with transaction tables. Check for NULL values.

🎯 **30 Minutes — Assessment Check-in:**
Take the SkillPilot mini-assessment to verify your mastery. If you score above 75%, we will advance your milestone!`;
  }

  if (msg.includes('join') || msg.includes('sql')) {
    return `Here is the clean mental model for SQL JOINs:

🔹 **INNER JOIN:** Only returns rows that exist in BOTH tables (the exact intersection).
🔹 **LEFT JOIN:** Keeps EVERY row from the left table. If the right table has no match, those columns become \`NULL\`.
🔹 **FULL OUTER JOIN:** Keeps all rows from both tables, filling mismatches with \`NULL\`.

⚠️ **Crucial Pitfall:** Putting a condition on the right table in your \`WHERE\` clause can accidentally turn a \`LEFT JOIN\` into an \`INNER JOIN\`! Always put right-table filters inside the \`ON\` clause if you want to keep all left-table rows.`;
  }

  if (msg.includes('skip') || msg.includes('can i skip')) {
    return `For ${role}, I recommend **not skipping** the current topic (${currentMilestone?.skill || 'SQL'}). 

Our skill gap analysis identified this as a **High Severity Gap** with only Beginner proficiency currently logged. Over 80% of technical interview screens for ${role} test this directly. 

However, if you feel confident, take the **Milestone Assessment** right now! If you score 85%+, SkillPilot's adaptive engine will automatically fast-track you to advanced modules.`;
  }

  if (msg.includes('30 min') || msg.includes('little time') || msg.includes('short')) {
    return `Got it! High focus over high duration. Here is your **30-Minute Sprint**:

1. **15 mins:** Review the "Visual Guide to SQL JOINs" in your resources.
2. **15 mins:** Solve 1 LeetCode SQL problem (#175 Combine Two Tables).

You'll keep your **${profile?.streakDays || 6}-day learning streak** alive and keep moving toward your target!`;
  }

  if (msg.includes('ready') || msg.includes('internship') || msg.includes('job')) {
    return `Based on your profile, your Career Readiness is currently **78/100**.

You are **very close to internship-ready**! Your foundations in Excel and basic querying are solid. 

To reach **Job Ready (90%+)**, complete:
1. The **Power BI Star Schema & DAX** module.
2. The **E-Commerce Analytics Portfolio Project** with a published GitHub README.

Once those are checked off, you will have verifiable proof to present to hiring managers!`;
  }

  return `Great question, ${name}! As you prepare for your career as a ${role}, staying consistent with your daily goals in **${currentMilestone?.title || 'the current roadmap'}** is key. 

Would you like me to generate a targeted practice problem for this topic, explain a tricky concept, or simulate a technical interview question?`;
}

// Development server with Vite middleware OR Production static server
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`SkillPilot AI server running on http://0.0.0.0:${port} [${isProd ? 'production' : 'development'}]`);
  });
}

startServer();
