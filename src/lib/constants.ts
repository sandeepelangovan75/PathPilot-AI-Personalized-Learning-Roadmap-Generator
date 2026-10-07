import { StudentProfile, Roadmap, SkillGap, CareerReadiness, DailyPlan, Assessment, Project } from '../types';

export interface CareerRoleOption {
  id: string;
  name: string;
  badge: string;
  description: string;
  iconName: string;
  averageSalary: string;
  commonSkills: { name: string; requiredLevel: 'Beginner' | 'Intermediate' | 'Advanced'; category: 'Core' | 'Tooling' | 'Advanced' | 'Domain'; reason: string }[];
}

export const CAREER_ROLES: CareerRoleOption[] = [
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    badge: 'High Demand',
    description: 'Transform raw data into actionable business intelligence through SQL, statistical modeling, and dashboards.',
    iconName: 'BarChart3',
    averageSalary: '$85,000 - $115,000',
    commonSkills: [
      { name: 'SQL', requiredLevel: 'Advanced', category: 'Core', reason: 'Essential for querying relational data warehouses, aggregations, window functions, and joins.' },
      { name: 'Python', requiredLevel: 'Intermediate', category: 'Core', reason: 'Automates ETL pipelines, data cleaning with pandas, and statistical exploratory analysis.' },
      { name: 'Power BI', requiredLevel: 'Intermediate', category: 'Tooling', reason: 'Key corporate visualization tool for executive dashboards and DAX measures.' },
      { name: 'Statistics', requiredLevel: 'Intermediate', category: 'Domain', reason: 'Required for hypothesis testing, confidence intervals, and avoiding correlation traps.' },
      { name: 'Excel', requiredLevel: 'Advanced', category: 'Core', reason: 'Ubiquitous for quick ad-hoc modeling, pivot analysis, and business stakeholder reviews.' },
      { name: 'Data Storytelling', requiredLevel: 'Intermediate', category: 'Domain', reason: 'Converts technical analytical metrics into persuasive executive decisions.' },
    ],
  },
  {
    id: 'fullstack-dev',
    name: 'Full Stack Developer',
    badge: 'Popular',
    description: 'Architect and build complete end-to-end web applications with modern frontend and scalable backends.',
    iconName: 'Code2',
    averageSalary: '$95,000 - $135,000',
    commonSkills: [
      { name: 'React', requiredLevel: 'Advanced', category: 'Core', reason: 'Standard frontend library for reactive state, component lifecycles, and custom hooks.' },
      { name: 'Node.js', requiredLevel: 'Intermediate', category: 'Core', reason: 'Server-side runtime for REST/GraphQL microservices and middleware handling.' },
      { name: 'TypeScript', requiredLevel: 'Advanced', category: 'Core', reason: 'Eliminates runtime errors and guarantees scalable enterprise type contracts.' },
      { name: 'PostgreSQL', requiredLevel: 'Intermediate', category: 'Core', reason: 'Relational data modeling, ACID transactions, and indexing strategies.' },
      { name: 'Git', requiredLevel: 'Intermediate', category: 'Tooling', reason: 'Branching workflows, pull requests, and multi-engineer team collaboration.' },
      { name: 'Docker', requiredLevel: 'Beginner', category: 'Tooling', reason: 'Containerization for consistent local development and staging parity.' },
    ],
  },
  {
    id: 'ai-ml-engineer',
    name: 'AI / ML Engineer',
    badge: 'Top Growth',
    description: 'Train, fine-tune, and deploy machine learning models and generative AI systems into production.',
    iconName: 'BrainCircuit',
    averageSalary: '$120,000 - $170,000',
    commonSkills: [
      { name: 'Python', requiredLevel: 'Advanced', category: 'Core', reason: 'Primary ecosystem language for PyTorch, NumPy, scikit-learn, and GenAI.' },
      { name: 'PyTorch', requiredLevel: 'Intermediate', category: 'Core', reason: 'Deep learning neural network architecture construction and gradient training.' },
      { name: 'Linear Algebra', requiredLevel: 'Intermediate', category: 'Domain', reason: 'Foundation of embeddings, vector spaces, projections, and matrix decomposition.' },
      { name: 'LLM Fine-tuning & RAG', requiredLevel: 'Intermediate', category: 'Advanced', reason: 'Vector databases, retrieval augmented generation, and prompt optimization.' },
      { name: 'MLOps & Docker', requiredLevel: 'Intermediate', category: 'Tooling', reason: 'Model registry, artifact versioning, and latency-optimized inference serving.' },
    ],
  },
  {
    id: 'cybersecurity-analyst',
    name: 'Cybersecurity Analyst',
    badge: 'Critical Defense',
    description: 'Protect network perimeters, detect vulnerabilities, monitor SIEM telemetry, and respond to threats.',
    iconName: 'ShieldCheck',
    averageSalary: '$90,000 - $130,000',
    commonSkills: [
      { name: 'Network Protocols (TCP/IP)', requiredLevel: 'Advanced', category: 'Core', reason: 'Packet inspection, firewall topology, DNS, and traffic analysis.' },
      { name: 'Linux CLI', requiredLevel: 'Intermediate', category: 'Core', reason: 'Server administration, auditing file permissions, and triage forensics.' },
      { name: 'SIEM Tools (Splunk/Sentinel)', requiredLevel: 'Intermediate', category: 'Tooling', reason: 'Log aggregation, threat hunting queries, and correlation rule tuning.' },
      { name: 'Vulnerability Assessment', requiredLevel: 'Intermediate', category: 'Core', reason: 'Penetration triage, CVE impact analysis, and remediation prioritization.' },
      { name: 'Python Scripting', requiredLevel: 'Beginner', category: 'Tooling', reason: 'Security log parsing, automated threat intel scraping, and triage scripts.' },
    ],
  },
  {
    id: 'cloud-engineer',
    name: 'Cloud Engineer',
    badge: 'Enterprise Core',
    description: 'Provision, secure, and automate resilient infrastructure on AWS, Google Cloud, and Kubernetes.',
    iconName: 'Cloud',
    averageSalary: '$105,000 - $145,000',
    commonSkills: [
      { name: 'Terraform (IaC)', requiredLevel: 'Intermediate', category: 'Core', reason: 'Declarative infrastructure as code and state file lifecycle management.' },
      { name: 'AWS / GCP Core Services', requiredLevel: 'Advanced', category: 'Core', reason: 'IAM, VPC networking, serverless compute, and object storage architectures.' },
      { name: 'Docker & Kubernetes', requiredLevel: 'Intermediate', category: 'Core', reason: 'Container orchestration, pod scheduling, and ingress controllers.' },
      { name: 'CI/CD Pipelines', requiredLevel: 'Intermediate', category: 'Tooling', reason: 'Automated test runners and production deployment workflows.' },
      { name: 'Linux SysAdmin', requiredLevel: 'Intermediate', category: 'Core', reason: 'Systemd, SSH hardening, disk management, and bash automation.' },
    ],
  },
  {
    id: 'ui-ux-designer',
    name: 'UI/UX Designer',
    badge: 'Creative Tech',
    description: 'Design intuitive interfaces, interactive prototypes, design systems, and user research workflows.',
    iconName: 'Palette',
    averageSalary: '$85,000 - $120,000',
    commonSkills: [
      { name: 'Figma Auto-Layout & Tokens', requiredLevel: 'Advanced', category: 'Core', reason: 'Component libraries, design tokens, responsive constraints, and auto-layout.' },
      { name: 'User Research & Wireframing', requiredLevel: 'Intermediate', category: 'Domain', reason: 'Usability testing, journey mapping, and low-fidelity architectural wireframes.' },
      { name: 'Design Systems', requiredLevel: 'Advanced', category: 'Core', reason: 'Scalable typography, color ramp tokens, accessibility WCAG compliance.' },
      { name: 'Interactive Prototyping', requiredLevel: 'Intermediate', category: 'Tooling', reason: 'Micro-interactions, smart animation, and realistic user testing flows.' },
      { name: 'Basic HTML/CSS', requiredLevel: 'Beginner', category: 'Tooling', reason: 'Seamless developer handoff and understanding layout implementation constraints.' },
    ],
  },
  {
    id: 'devops-engineer',
    name: 'DevOps Engineer',
    badge: 'High Automation',
    description: 'Bridge engineering and operations with relentless automation, observability, and robust release velocity.',
    iconName: 'Cpu',
    averageSalary: '$110,000 - $155,000',
    commonSkills: [
      { name: 'CI/CD Automation', requiredLevel: 'Advanced', category: 'Core', reason: 'GitHub Actions, GitLab CI pipelines, automated rollbacks, and canary releases.' },
      { name: 'Kubernetes', requiredLevel: 'Advanced', category: 'Core', reason: 'Helm charts, service meshes, HPA auto-scaling, and cluster reliability.' },
      { name: 'Monitoring (Prometheus/Grafana)', requiredLevel: 'Intermediate', category: 'Tooling', reason: 'Metric collection, alerts, dashboards, and SLI/SLO tracking.' },
      { name: 'Bash & Python', requiredLevel: 'Intermediate', category: 'Core', reason: 'Scripting build steps, cloud CLI automation, and infrastructure health checks.' },
    ],
  },
  {
    id: 'mobile-developer',
    name: 'Mobile Developer',
    badge: 'Cross-Platform',
    description: 'Build responsive, fluid iOS and Android experiences using React Native, Flutter, or native swift/kotlin.',
    iconName: 'Smartphone',
    averageSalary: '$95,000 - $135,000',
    commonSkills: [
      { name: 'React Native / Flutter', requiredLevel: 'Advanced', category: 'Core', reason: 'Cross-platform reactive UI, gesture handlers, and native bridge modules.' },
      { name: 'Mobile State Management', requiredLevel: 'Intermediate', category: 'Core', reason: 'Offline persistence, caching, and atomic state synchronizations.' },
      { name: 'REST & GraphQL APIs', requiredLevel: 'Intermediate', category: 'Core', reason: 'Client-server communication, token refresh, and network retry logic.' },
      { name: 'App Store / Play Deployment', requiredLevel: 'Beginner', category: 'Tooling', reason: 'Signing certificates, Fastlane automation, and bundle optimization.' },
    ],
  },
];

export const DEMO_STUDENT_PROFILE: StudentProfile = {
  name: 'Alex Rivera',
  targetRole: 'Data Analyst',
  currentSkills: [
    { name: 'Excel', level: 'Intermediate' },
    { name: 'Python', level: 'Beginner' },
    { name: 'SQL', level: 'Beginner' },
    { name: 'Statistics', level: 'Beginner' },
  ],
  educationLevel: "Bachelor's in Business Informatics",
  previousExperience: 'Student intern with 6 months business reporting experience',
  existingProjects: 'Basic sales spreadsheet analysis and customer churn Excel workbook',
  availableHoursPerDay: '2 hours/day',
  targetTimeline: '12 weeks',
  learningStyles: ['Hands-on Projects', 'Practice Problems', 'Video', 'AI explanations'],
  streakDays: 6,
  hoursCompletedThisWeek: 9.5,
  totalHoursStudied: 34,
};

export const DEMO_SKILL_GAPS: SkillGap[] = [
  {
    skill: 'SQL',
    currentLevel: 'Beginner',
    requiredLevel: 'Advanced',
    gapSeverity: 'High',
    importanceReason: 'Vital for enterprise querying, JOIN operations, subqueries, and window functions that power daily analytical dashboards.',
    category: 'Core',
  },
  {
    skill: 'Power BI',
    currentLevel: 'None',
    requiredLevel: 'Intermediate',
    gapSeverity: 'High',
    importanceReason: 'Required for building automated visual stakeholder dashboards, DAX metrics, and published report workspaces.',
    category: 'Tooling',
  },
  {
    skill: 'Statistics',
    currentLevel: 'Beginner',
    requiredLevel: 'Intermediate',
    gapSeverity: 'Medium',
    importanceReason: 'Essential for validating sample sizes, calculating p-values, regression analysis, and preventing false-positive business conclusions.',
    category: 'Domain',
  },
  {
    skill: 'Python',
    currentLevel: 'Beginner',
    requiredLevel: 'Intermediate',
    gapSeverity: 'Medium',
    importanceReason: 'Crucial for scalable data wrangling in pandas, automated data transformations, and exploratory data visualizations.',
    category: 'Core',
  },
  {
    skill: 'Excel',
    currentLevel: 'Intermediate',
    requiredLevel: 'Advanced',
    gapSeverity: 'Low',
    importanceReason: 'You have solid foundation; you only need advanced dynamic arrays (XLOOKUP, LAMBDA) and Power Query data modeling.',
    category: 'Core',
  },
  {
    skill: 'Data Storytelling',
    currentLevel: 'None',
    requiredLevel: 'Intermediate',
    gapSeverity: 'Medium',
    importanceReason: 'Bridges technical outputs with executive stakeholder influence and presentation clarity.',
    category: 'Domain',
  },
];

export const DEMO_ROADMAP: Roadmap = {
  id: 'roadmap-alex-data-analyst',
  targetRole: 'Data Analyst',
  totalWeeks: 12,
  generatedAt: new Date().toISOString(),
  overallProgress: 28,
  adaptationCount: 0,
  phases: [
    {
      id: 'phase-1',
      phaseNumber: 1,
      title: 'Phase 1: Relational Querying & Core SQL',
      timeframe: 'Weeks 1–4',
      description: 'Master relational data extraction, aggregation, multi-table joins, subqueries, and real-world database manipulation.',
      milestones: [
        {
          id: 'ms-1',
          phaseId: 'phase-1',
          weekRange: 'Weeks 1–2',
          title: 'SQL Foundations & Relational Filters',
          skill: 'SQL',
          description: 'Master SELECT, WHERE, GROUP BY, HAVING, and fundamental relational algebra against relational tables.',
          status: 'Completed',
          progressPercent: 100,
          estimatedHours: 24,
          learningObjectives: [
            'Write clean multi-column SELECT statements with aliases',
            'Filter complex row criteria using WHERE, LIKE, IN, and BETWEEN',
            'Aggregate metric summaries with COUNT, SUM, AVG, and GROUP BY',
          ],
          topics: ['SELECT & Aliasing', 'WHERE Filtering', 'GROUP BY & HAVING', 'Aggregate Functions', 'Sorting & Limiting'],
          resources: [
            {
              id: 'r-1',
              title: 'Interactive SQL Tutorial (Khan Academy / Mode Analytics)',
              type: 'Practice',
              url: 'https://mode.com/sql-tutorial/',
              platform: 'Mode Analytics',
              estimatedMinutes: 120,
              free: true,
              selectionReason: 'Direct in-browser execution with real company dataset schemas.',
            },
            {
              id: 'r-2',
              title: 'SQL for Data Science Crash Course',
              type: 'Video',
              url: 'https://www.youtube.com',
              platform: 'YouTube Tech',
              estimatedMinutes: 90,
              free: true,
              selectionReason: 'Visual explanations for beginner relational schema concepts.',
            },
          ],
          practiceTasks: [
            'Solve 15 beginner SQL exercises on aggregation',
            'Query a sample retail database to extract top 10 selling products',
          ],
          miniProjectTitle: 'Retail Sales Query Script',
          miniProjectDesc: 'Create an extraction script summarizing store performance across 4 quarters.',
          assessmentId: 'assess-sql-1',
        },
        {
          id: 'ms-2',
          phaseId: 'phase-1',
          weekRange: 'Weeks 3–4',
          title: 'Advanced SQL: JOIN Operations & Subqueries',
          skill: 'SQL',
          description: 'Master INNER, LEFT, RIGHT, and FULL OUTER JOINs, subqueries, CTEs (Common Table Expressions), and data cleaning with CASE WHEN.',
          status: 'In Progress',
          progressPercent: 45,
          estimatedHours: 28,
          learningObjectives: [
            'Diagnose differences between INNER JOIN, LEFT JOIN, and Cartesian product risks',
            'Handle NULL values in joined datasets without dropping valid business records',
            'Build structured modular queries using WITH (Common Table Expressions)',
            'Transform raw values using CASE WHEN statements for categorization',
          ],
          topics: ['INNER & OUTER JOINs', 'Self Joins & Anti Joins', 'Subqueries & CTEs', 'CASE WHEN Transformations', 'Date & String Functions'],
          resources: [
            {
              id: 'r-3',
              title: 'Visual Guide to SQL JOINs & Venn Logic',
              type: 'Article',
              url: 'https://blog.codinghorror.com/a-visual-explanation-of-sql-joins/',
              platform: 'Coding Horror',
              estimatedMinutes: 40,
              free: true,
              selectionReason: 'High-contrast visual memory anchor for JOIN Venn logic.',
            },
            {
              id: 'r-4',
              title: 'LeetCode 50 SQL Study Plan - Joins Section',
              type: 'Practice',
              url: 'https://leetcode.com/studyplan/top-sql-50/',
              platform: 'LeetCode',
              estimatedMinutes: 180,
              free: true,
              selectionReason: 'Interview-standard question set to solidify multi-table joins.',
            },
          ],
          practiceTasks: [
            'Solve LeetCode #175, #181, #183 (Classic Join problems)',
            'Write a CTE analyzing repeat customer purchase cycles over 90 days',
          ],
          miniProjectTitle: 'Customer Churn Multi-Table Schema Audit',
          miniProjectDesc: 'Join customer accounts, transaction logs, and support ticket tables to calculate 60-day customer churn rates.',
          assessmentId: 'assess-sql-joins',
        },
      ],
    },
    {
      id: 'phase-2',
      phaseNumber: 2,
      title: 'Phase 2: Applied Statistics & Python Data Wrangling',
      timeframe: 'Weeks 5–8',
      description: 'Upgrade Python from beginner syntax to pandas/numpy exploratory data analysis and hypothesis testing.',
      milestones: [
        {
          id: 'ms-3',
          phaseId: 'phase-2',
          weekRange: 'Weeks 5–6',
          title: 'Exploratory Data Analysis with Pandas & Seaborn',
          skill: 'Python',
          description: 'Ingest messy CSVs/SQL dumps, handle missing values, reshape dataframes, and spot outliers using distributions.',
          status: 'Upcoming',
          progressPercent: 0,
          estimatedHours: 28,
          learningObjectives: [
            'Master pandas DataFrame indexing, grouping, and datetime parsing',
            'Impute or remove null entries intelligently without biasing samples',
            'Create insightful visual distributions with Seaborn and Matplotlib',
          ],
          topics: ['DataFrames & Series', 'Handling Missing Values', 'GroupBy & Pivot Tables', 'Seaborn Visualizations', 'Outlier Detection'],
          resources: [
            {
              id: 'r-5',
              title: 'Kaggle Pandas Micro-Course (Hands-on Notebooks)',
              type: 'Practice',
              url: 'https://www.kaggle.com/learn/pandas',
              platform: 'Kaggle',
              estimatedMinutes: 150,
              free: true,
              selectionReason: 'Zero-setup interactive Jupyter notebooks directly in browser.',
            },
          ],
          practiceTasks: [
            'Clean a messy 50,000-row airline flight delay dataset',
            'Compute correlation matrix between customer satisfaction and delay length',
          ],
          miniProjectTitle: 'Exploratory Airline Delay Notebook',
          miniProjectDesc: 'Produce a documented Jupyter notebook uncovering 3 major causes of airport bottleneck delays.',
          assessmentId: 'assess-python-eda',
        },
        {
          id: 'ms-4',
          phaseId: 'phase-2',
          weekRange: 'Weeks 7–8',
          title: 'Business Statistics & A/B Test Validation',
          skill: 'Statistics',
          description: 'Learn sample sizing, normal distributions, standard deviation, hypothesis testing, and p-value significance.',
          status: 'Upcoming',
          progressPercent: 0,
          estimatedHours: 24,
          learningObjectives: [
            'Calculate mean, median, standard deviation, and interquartile range',
            'Formulate null vs alternative hypotheses for marketing experiments',
            'Run two-sample t-tests and Chi-squared tests in Python scipy.stats',
          ],
          topics: ['Descriptive Statistics', 'Probability Distributions', 'Hypothesis Testing (t-test)', 'p-values & Confidence Intervals', 'A/B Test Design'],
          resources: [
            {
              id: 'r-6',
              title: 'StatQuest: Hypothesis Testing and p-values Explained Visually',
              type: 'Video',
              url: 'https://statquest.org/',
              platform: 'StatQuest',
              estimatedMinutes: 60,
              free: true,
              selectionReason: 'World-class visual intuition without heavy mathematical overload.',
            },
          ],
          practiceTasks: [
            'Run an A/B test analysis in Python to evaluate new checkout flow conversion',
            'Determine whether a 3.4% lift is statistically significant (alpha = 0.05)',
          ],
          miniProjectTitle: 'E-Commerce A/B Experiment Analysis',
          miniProjectDesc: 'Statistical report confirming or rejecting website redesign conversion impact.',
        },
      ],
    },
    {
      id: 'phase-3',
      phaseNumber: 3,
      title: 'Phase 3: Business Intelligence & Portfolio Capstone',
      timeframe: 'Weeks 9–12',
      description: 'Build enterprise Power BI dashboards with DAX, assemble your capstone project, and train for technical interviews.',
      milestones: [
        {
          id: 'ms-5',
          phaseId: 'phase-3',
          weekRange: 'Weeks 9–10',
          title: 'Power BI Dashboarding & DAX Modeling',
          skill: 'Power BI',
          description: 'Construct dimensional star schemas, calculate year-over-year revenue in DAX, and publish executive reports.',
          status: 'Locked',
          progressPercent: 0,
          estimatedHours: 26,
          learningObjectives: [
            'Build Star Schema data models with Fact and Dimension relationships',
            'Write CALCULATE, RELATED, and time-intelligence DAX expressions',
            'Design accessible UI dashboard layouts with KPI cards and cross-filtering',
          ],
          topics: ['Data Modeling & Relationships', 'DAX Measures (CALCULATE)', 'Time Intelligence Functions', 'Interactive Visuals', 'Report Publishing'],
          resources: [
            {
              id: 'r-7',
              title: 'Microsoft Power BI Guided Learning Docs',
              type: 'Documentation',
              url: 'https://learn.microsoft.com/en-us/power-bi/',
              platform: 'Microsoft Learn',
              estimatedMinutes: 180,
              free: true,
              selectionReason: 'Official documentation and certified path exercises.',
            },
          ],
          practiceTasks: [
            'Model a 4-table retail schema in Power BI Desktop',
            'Create DAX measures for Year-to-Date (YTD) Revenue and MoM growth %',
          ],
          miniProjectTitle: 'Executive Retail Performance BI Suite',
          miniProjectDesc: 'Interactive 3-page Power BI dashboard featuring dynamic slicers and drill-through KPIs.',
        },
        {
          id: 'ms-6',
          phaseId: 'phase-3',
          weekRange: 'Weeks 11–12',
          title: 'Capstone Portfolio & Technical Interview Mastery',
          skill: 'Data Storytelling',
          description: 'Publish an end-to-end portfolio project to GitHub, practice live SQL screen coding, and conduct behavioral mock interviews.',
          status: 'Locked',
          progressPercent: 0,
          estimatedHours: 30,
          learningObjectives: [
            'Synthesize SQL, Python, and Power BI into one cohesive case study',
            'Craft an executive summary slide deck and recorded video walkthrough',
            'Solve live SQL whiteboard queries under 20-minute timed conditions',
          ],
          topics: ['End-to-End Pipeline Capstone', 'GitHub Portfolio README Writing', 'Executive Slide Deck Presentation', 'Live SQL Coding Drills', 'STAR Method Interview Stories'],
          resources: [
            {
              id: 'r-8',
              title: 'How to Build a Standout Data Analyst Portfolio That Gets Hired',
              type: 'Article',
              url: 'https://towardsdatascience.com',
              platform: 'Towards Data Science',
              estimatedMinutes: 45,
              free: true,
              selectionReason: 'Actionable tips from hiring managers on portfolio reviews.',
            },
          ],
          practiceTasks: [
            'Write clean GitHub documentation with architecture diagrams and findings',
            'Practice 10 live SQL interview questions on window functions and CTEs',
          ],
          miniProjectTitle: 'Industry Capstone: SaaS Churn & Revenue Health',
          miniProjectDesc: 'Complete portfolio centerpiece demonstrating SQL warehousing, Python statistical analysis, and interactive dashboarding.',
        },
      ],
    },
  ],
};

export const DEMO_DAILY_PLAN: DailyPlan = {
  date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
  totalMinutes: 60,
  focusMilestoneId: 'ms-2',
  focusSkill: 'SQL (JOIN Operations)',
  todayGoal: 'Understand INNER JOIN and LEFT JOIN and eliminate NULL row drops in customer order queries.',
  motivationQuote: 'Consistency compounds. 60 focused minutes today bridges your highest career gap.',
  tasks: [
    {
      id: 'task-1',
      title: 'Learn SQL JOIN Mechanics & Venn Logic',
      durationMinutes: 20,
      type: 'Learn',
      completed: true,
      objective: 'Review differences between INNER, LEFT, and FULL OUTER JOINs with visual schema diagrams.',
    },
    {
      id: 'task-2',
      title: 'Solve 3 Multi-Table JOIN Problems',
      durationMinutes: 25,
      type: 'Practice',
      completed: false,
      objective: 'Join Customers, Orders, and Payments tables to calculate total revenue per customer without duplicates.',
    },
    {
      id: 'task-3',
      title: 'Take SkillPilot Adaptive Mini-Assessment',
      durationMinutes: 15,
      type: 'Assess',
      completed: false,
      objective: 'Test your understanding on NULL preservation and ON vs WHERE clause filter timings.',
    },
  ],
};

export const DEMO_CAREER_READINESS: CareerReadiness = {
  overallScore: 78,
  categories: {
    technicalSkills: 85,
    projects: 70,
    problemSolving: 80,
    communication: 60,
    interviewReadiness: 50,
  },
  statusSummary: "You're making strong progress toward your Data Analyst goal. Your foundations in Excel and basic query syntax are solid.",
  biggestGaps: [
    'Power BI & DAX Calculations (Current level: None)',
    'Behavioral & Technical Interview Communication',
    'Complex Multi-Table SQL Window Functions',
  ],
  recommendedMilestonesTo90: [
    'Complete the SQL JOINs & Subqueries assessment with >80% score',
    'Finish the Power BI Star Schema & DAX milestone',
    'Publish the SaaS Churn & Revenue Health Capstone to GitHub',
  ],
  isJobReady: false,
};

export const DEMO_ASSESSMENT_SQL: Assessment = {
  id: 'assess-sql-joins',
  title: 'SQL JOIN Operations & Relational Logic Assessment',
  skillTested: 'SQL',
  milestoneId: 'ms-2',
  passingScore: 70,
  questions: [
    {
      id: 'q1',
      question: 'Which SQL JOIN returns all rows from the left table, and the matched rows from the right table, filling unmatched right columns with NULL?',
      type: 'multiple-choice',
      options: [
        'INNER JOIN',
        'LEFT JOIN (or LEFT OUTER JOIN)',
        'RIGHT JOIN',
        'CROSS JOIN',
      ],
      correctAnswerIndex: 1,
      explanation: 'LEFT JOIN keeps every record from the left table even if there is no match in the right table. Missing values on the right table side become NULL.',
      skillSubtopic: 'JOIN Mechanics',
    },
    {
      id: 'q2',
      question: 'What is the critical difference between filtering the right table in the ON clause vs in the WHERE clause when using a LEFT JOIN?',
      type: 'multiple-choice',
      codeSnippet: `-- Query A:
SELECT c.name, o.amount FROM customers c 
LEFT JOIN orders o ON c.id = o.customer_id AND o.amount > 100;

-- Query B:
SELECT c.name, o.amount FROM customers c 
LEFT JOIN orders o ON c.id = o.customer_id 
WHERE o.amount > 100;`,
      options: [
        'There is no difference; the database optimizer treats them identically.',
        'Query A keeps customers without qualifying orders (amount becomes NULL); Query B discards customers with no orders greater than 100.',
        'Query B is invalid SQL syntax and causes a runtime parser error.',
        'Query A executes a Cartesian product whereas Query B performs an index seek.',
      ],
      correctAnswerIndex: 1,
      explanation: 'In Query B, filtering in the WHERE clause evaluates AFTER the LEFT JOIN; since non-matching customers have NULL in o.amount, the check `NULL > 100` evaluates to UNKNOWN/false, effectively converting the LEFT JOIN into an INNER JOIN!',
      skillSubtopic: 'ON vs WHERE Filtering',
    },
    {
      id: 'q3',
      question: 'Consider a table `Users` with 10 rows and `Logs` with 5 rows. An INNER JOIN query returns rows only where `Users.id = Logs.user_id`. What is the MAXIMUM possible number of rows returned?',
      type: 'multiple-choice',
      options: [
        '5 rows',
        '10 rows',
        '50 rows',
        '15 rows',
      ],
      correctAnswerIndex: 2,
      explanation: 'If all 10 users had the exact same ID, or if one user matches all 5 logs and multiple duplicate keys exist, each user could match all logs (10 * 5 = 50 rows maximum Cartesian match if keys are not unique). If user_id is a primary key on Users, the max would be 5.',
      skillSubtopic: 'Cartesian Multiplicity',
    },
    {
      id: 'q4',
      question: 'True or False: Using FULL OUTER JOIN is natively supported in MySQL without requiring UNION simulation.',
      type: 'true-false',
      options: [
        'True',
        'False',
      ],
      correctAnswerIndex: 1,
      explanation: 'MySQL does not have a native FULL OUTER JOIN keyword. In MySQL, developers simulate it by combining a LEFT JOIN and a RIGHT JOIN with UNION.',
      skillSubtopic: 'Engine Compatibility',
    },
    {
      id: 'q5',
      question: 'How do you find all Customers who have NEVER placed an order using a JOIN?',
      type: 'multiple-choice',
      codeSnippet: `SELECT c.customer_id, c.name
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE ???;`,
      options: [
        'WHERE o.customer_id IS NULL',
        'WHERE o.customer_id = 0',
        'WHERE o.order_date = NULL',
        'WHERE COUNT(o.order_id) = 0',
      ],
      correctAnswerIndex: 0,
      explanation: 'An Anti-Join pattern uses `LEFT JOIN ... WHERE right_table.key IS NULL`. This filters exclusively to the rows where no matching record was found in the right table.',
      skillSubtopic: 'Anti-Join Logic',
    },
  ],
};

export const DEMO_PROJECT_DATA: Project = {
  id: 'proj-ecommerce-analytics',
  title: 'E-Commerce Churn & Revenue Analytics Platform',
  difficulty: 'Intermediate',
  problemStatement: 'A subscription retail brand is experiencing an unexplainable 14% drop in quarterly repeat renewals. Transaction logs and customer interactions are split across disparate relational tables, leaving marketing executives unable to identify at-risk accounts before churn occurs.',
  objective: 'Build an automated SQL extraction pipeline and interactive Power BI executive dashboard that identifies key churn risk factors 30 days prior to contract expiration.',
  skillsRequired: ['Advanced SQL', 'Data Cleaning', 'Power BI / Tableau', 'Statistics', 'Data Storytelling'],
  datasetSuggestion: 'Olist Brazilian E-Commerce Public Dataset (100k real customer orders, order items, geolocation, payments, and review scores).',
  techStack: ['PostgreSQL / DuckDB', 'Python (pandas, seaborn)', 'Power BI Desktop', 'GitHub Pages'],
  tasks: [
    { step: 1, title: 'Schema Ingestion & Entity Relationship Design', details: 'Load 5 CSV tables into PostgreSQL or SQLite, verify primary keys, foreign keys, and index customer_id.', done: true },
    { step: 2, title: 'Multi-Table RFM (Recency, Frequency, Monetary) SQL Queries', details: 'Write CTEs calculating the last purchase date, total lifetime order count, and average order value per customer segment.', done: true },
    { step: 3, title: 'Churn Risk Prediction Metric Formulation', details: 'Formulate an empirical churn score based on review ratings (< 3 stars) combined with >60 days since last purchase.', done: false },
    { step: 4, title: 'Power BI Star Schema & DAX Time Intelligence', details: 'Model fact_orders and dim_customers. Create DAX measures: [MoM Churn Rate %], [Customer Lifetime Value (LTV)], and [Revenue at Risk].', done: false },
    { step: 5, title: 'Executive Presentation Slide Deck & Portfolio README', details: 'Document findings in an impactful GitHub README with screenshots, business takeaways, and video walkthrough.', done: false },
  ],
  expectedOutcome: 'A deployable, job-ready portfolio centerpiece demonstrating end-to-end data engineering, statistical segmentation, and executive visual communication.',
  evaluationCriteria: [
    'Zero Cartesian explosions or duplicate records in relational JOINs',
    'Accurate DAX time-intelligence formulas (SAMEPERIODLASTYEAR / CALCULATE)',
    'Clear business recommendations backed by data, not gut feelings',
    'Professional GitHub documentation following standard industry project blueprints',
  ],
  portfolioDescription: 'Engineered an end-to-end e-commerce analytical engine using PostgreSQL and Power BI across 100k transactions, uncovering 3 hidden churn drivers and designing an automated risk-scoring dashboard.',
  githubReadmeSnippet: `# E-Commerce Churn & Revenue Analytics Suite

## 🎯 Executive Overview
This project uncovers the root drivers behind a 14% quarterly customer churn phenomenon across 100,000 transactions. Using advanced SQL CTEs and Power BI dimensional modeling, the platform identifies at-risk accounts 30 days ahead of churn.

## 🛠 Tech Stack
- **Database:** PostgreSQL (CTEs, Window Functions, Anti-Joins)
- **Analytics:** Python 3.11 (pandas, scipy.stats)
- **Visualization:** Microsoft Power BI (Star Schema, DAX)

## 📊 Key Business Discoveries
1. Delivery delays over 4 days increased negative reviews by 340%, acting as the #1 leading churn indicator.
2. Customers with only 1 purchase had an 82% churn probability; introducing a targeted 14-day re-engagement promo reduced drop-off by 18%.
`,
  status: 'In Progress',
};
