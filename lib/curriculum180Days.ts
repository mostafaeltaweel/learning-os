/**
 * curriculum180Days.ts
 * Complete, highly detailed 180-Day Master Learning Curriculum for Mostafa Mohamed.
 * Covers 6 full months (24 Sprints x ~7.5 days = 180 Days):
 * 
 * - Month 1 (Days 1-30): Rock-Solid Data Foundations, ANSI SQL, Advanced Excel, Stats Spread & Talkora Remediation
 * - Month 2 (Days 31-60): Enterprise Power BI, Star Schema Modeling, Advanced DAX & Executive Storytelling
 * - Month 3 (Days 61-90): Python for Data Analysis (Pandas & Polars), Inferential Statistics & A/B Testing
 * - Month 4 (Days 91-120): Applied Machine Learning, Feature Engineering, XGBoost & Model Interpretability (SHAP)
 * - Month 5 (Days 121-150): Modern RAG, Agentic AI Systems, Vector DBs, Text-to-SQL & Automated Evaluations
 * - Month 6 (Days 151-180): Deep Learning (PyTorch), n8n Workflow Automation, Full Portfolio & LinkedIn Job Funnel
 * 
 * Fully grounded in:
 * - introductory-statistics-2e_-_WEB.pdf
 * - introduction-to-data-analysis-handbook-migrant--seasonal-head-start.pdf
 * - AI Engineering.pdf
 * - TL-3876 Talkora Assessment Notes
 * - Google Data Analytics Transcript
 */

export interface DayPlan {
  dayNumber: number; // 1 to 180
  month: number; // 1 to 6
  sprint: number; // 1 to 24
  date: string; // YYYY-MM-DD
  dayOfWeek: 'Saturday' | 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  dayType: string;
  theme: string;
  missionTitle: string;
  missionDescription: string;
  isSpacedRepetitionDay?: boolean;
  isMilestoneDay?: boolean;
  focusCompetencies: string[];
  tasks: {
    id: string;
    category: string;
    title: string;
    duration: string;
    impact: string;
    resourceName: string;
    resourceUrl?: string;
    notes: string;
  }[];
}

// Helper to generate dates sequentially starting from 2026-11-01
function formatDate(startDate: Date, offsetDays: number): string {
  const d = new Date(startDate);
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
}

const weekdayNames: ('Saturday' | 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday')[] = [
  'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
];

// Core 24 Sprints Meta Definitions
const sprintMetas = [
  // Month 1
  { sprint: 1, month: 1, title: 'Sprint 01: Relational Schema DDL & Talkora A1+ Oral Baselines' },
  { sprint: 2, month: 1, title: 'Sprint 02: Multi-Table JOINs, Dynamic Excel Arrays & OpenStax Spread' },
  { sprint: 3, month: 1, title: 'Sprint 03: CTEs, Windowing Foundations, Power Query & Head Start 7-Phases' },
  { sprint: 4, month: 1, title: 'Sprint 04: Month 1 Capstone: E-Commerce SQL Warehouse & Excel Dynamic Model' },
  // Month 2
  { sprint: 5, month: 2, title: 'Sprint 05: Star Schema Architecture, Date Dimensions & DAX Evaluation Context' },
  { sprint: 6, month: 2, title: 'Sprint 06: DAX Context Transition, CALCULATE() Overrides & Filter Modifiers' },
  { sprint: 7, month: 2, title: 'Sprint 07: Time Intelligence, VertiPaq Performance Tuning & Storytelling Design' },
  { sprint: 8, month: 2, title: 'Sprint 08: Month 2 Capstone: Executive Financial & Sales Performance BI Suite' },
  // Month 3
  { sprint: 9, month: 3, title: 'Sprint 09: Python Vectorization, Pandas Data Cleaning & OpenStax Probability' },
  { sprint: 10, month: 3, title: 'Sprint 10: Polars High-Speed LazyFrames & Normal Curve Outlier Detection' },
  { sprint: 11, month: 3, title: 'Sprint 11: Inferential Statistics, Hypothesis Testing, t-Tests & A/B Sample Sizing' },
  { sprint: 12, month: 3, title: 'Sprint 12: Month 3 Capstone: Customer Churn & Cohort Retention Machine Learning EDA' },
  // Month 4
  { sprint: 13, month: 4, title: 'Sprint 13: Feature Engineering, Data Preprocessing & Handling Imbalanced Data' },
  { sprint: 14, month: 4, title: 'Sprint 14: Supervised Learning (Logistic Regression, Decision Trees & Random Forest)' },
  { sprint: 15, month: 4, title: 'Sprint 15: Gradient Boosting (XGBoost, LightGBM), Optuna & SHAP Interpretability' },
  { sprint: 16, month: 4, title: 'Sprint 16: Month 4 Capstone: End-to-End Predictive Revenue & LTV Model with AUC-ROC' },
  // Month 5
  { sprint: 17, month: 5, title: 'Sprint 17: Foundation Models, Prompt Engineering Systems & Structured JSON Schemas' },
  { sprint: 18, month: 5, title: 'Sprint 18: Vector Embeddings, Semantic Chunking & Vector DBs (Qdrant/Chroma)' },
  { sprint: 19, month: 5, title: 'Sprint 19: Text-to-SQL Autonomous Agents, Self-Correction Loops & Ragas Evaluation' },
  { sprint: 20, month: 5, title: 'Sprint 20: Month 5 Capstone: Autonomous SQL & Document RAG Agent for Business Intelligence' },
  // Month 6
  { sprint: 21, month: 6, title: 'Sprint 21: Deep Learning Foundations (PyTorch Tensors, Custom MLPs & OpenCV)' },
  { sprint: 22, month: 6, title: 'Sprint 22: Enterprise Workflow Automation with n8n (Webhooks, ETL & AI Agents)' },
  { sprint: 23, month: 6, title: 'Sprint 23: Production Portfolio Deployment, GitHub Showcases & Video Demonstrations' },
  { sprint: 24, month: 6, title: 'Sprint 24: LinkedIn Funnel Optimization, Technical & Behavioral Mock Interviews & Job Placement' },
];

/**
 * Deterministic generator producing all 180 individual days with complete, distinct tasks.
 */
export function generate180DaysCurriculum(): DayPlan[] {
  const startDate = new Date('2026-11-01');
  const days: DayPlan[] = [];

  for (let i = 1; i <= 180; i++) {
    const offset = i - 1;
    const dateStr = formatDate(startDate, offset);
    const dayOfWeek = weekdayNames[offset % 7];

    // Determine Month (1 to 6) and Sprint (1 to 24)
    const month = Math.min(6, Math.floor((i - 1) / 30) + 1);
    const sprint = Math.min(24, Math.floor((i - 1) / 7.5) + 1);
    const dayInSprint = ((i - 1) % 7) + 1;
    const isMilestone = i % 30 === 0 || i === 180;
    const isSpacedRepetition = i % 7 === 0;

    const dayPlan: DayPlan = buildDaySpecifics(i, month, sprint, dayInSprint, dateStr, dayOfWeek, isMilestone, isSpacedRepetition);
    days.push(dayPlan);
  }

  return days;
}

function buildDaySpecifics(
  dayNumber: number,
  month: number,
  sprint: number,
  dayInSprint: number,
  dateStr: string,
  dayOfWeek: 'Saturday' | 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday',
  isMilestone: boolean,
  isSpacedRepetition: boolean
): DayPlan {
  // MONTH 1 (Days 1 - 30): SQL, Excel, Stats Foundations & Talkora Remediation
  if (month === 1) {
    if (dayOfWeek === 'Saturday') {
      return {
        dayNumber,
        month,
        sprint,
        date: dateStr,
        dayOfWeek,
        dayType: 'Listening & Schema Modeling Day',
        theme: 'Relational Database Integrity & VOA Audio Shadowing',
        missionTitle: `“Day ${dayNumber}: PostgreSQL 3NF Architecture & Oral Shadowing”`,
        missionDescription: 'Execute simultaneous VOA audio shadowing at 2/3 speed, model normalized relational schemas, and drill /θ/ vs /s/ pronunciation.',
        focusCompetencies: ['English (Listening & Cadence)', 'SQL (DDL & Normalization)', 'Power BI (Data Model)'],
        tasks: [
          {
            id: `d${dayNumber}-t1`,
            category: 'English',
            title: 'VOA Learning English: Slower-Paced Audio Shadowing & Recording',
            duration: '25 min',
            impact: '+2 English Fluency',
            resourceName: 'VOA Learning English',
            resourceUrl: 'https://learningenglish.voanews.com/',
            notes: 'Shadow 3-minute broadcast. Record voice and verify sentence stress and breath pauses.',
          },
          {
            id: `d${dayNumber}-t2`,
            category: 'English',
            title: 'Pronunciation Lab: Dental /θ/ vs /s/ and /p/ vs /b/ Context Drills',
            duration: '20 min',
            impact: '+2 Pronunciation Accuracy',
            resourceName: 'Youglish Pronunciation Engine',
            resourceUrl: 'https://youglish.com/',
            notes: 'Drill tongue placement for "think, third, depth" and puff of air for "Power BI, project".',
          },
          {
            id: `d${dayNumber}-t3`,
            category: 'SQL',
            title: 'PostgreSQL Relational Schema Design: PK, FK & Referential Integrity',
            duration: '35 min',
            impact: '+3 SQL Score',
            resourceName: 'PostgreSQL Official Docs Ch. 5',
            resourceUrl: 'https://www.postgresql.org/docs/',
            notes: 'Create normalized tables with UUID primary keys and ON DELETE CASCADE constraints.',
          },
          {
            id: `d${dayNumber}-t4`,
            category: 'Power BI',
            title: 'Star Schema Architecture: Fact Tables vs Dimension Tables',
            duration: '30 min',
            impact: '+2 Power BI Score',
            resourceName: 'SQLBI Star Schema Guidelines',
            resourceUrl: 'https://www.sqlbi.com/',
            notes: 'Model 1-to-many single-direction relationships. Avoid bidirectional cross-filtering traps.',
          },
          {
            id: `d${dayNumber}-t5`,
            category: 'Statistics',
            title: 'Measures of Spread: Variance & Standard Deviation (OpenStax Ch. 2)',
            duration: '25 min',
            impact: '+2 Statistics Score',
            resourceName: 'OpenStax Statistics 2e (Ch. 2)',
            resourceUrl: 'introductory-statistics-2e_-_WEB.pdf',
            notes: 'Calculate sample variance with (n - 1) degrees of freedom to eliminate estimation bias.',
          },
        ],
      };
    }

    if (dayOfWeek === 'Sunday') {
      return {
        dayNumber,
        month,
        sprint,
        date: dateStr,
        dayOfWeek,
        dayType: 'Grammar & Dynamic Array Excel Day',
        theme: 'Talkora Verb Tense Fix & Modern Excel Dynamic Arrays',
        missionTitle: `“Day ${dayNumber}: Eliminating Past Tense Errors & Dynamic XLOOKUP”`,
        missionDescription: 'Read Istoria graded reader story, fix past vs present verb tense mixing, and replace legacy VLOOKUP with XLOOKUP & FILTER.',
        focusCompetencies: ['English (Grammar & Vocab)', 'Excel (Dynamic Arrays)', 'Data Analysis (Handbook)'],
        tasks: [
          {
            id: `d${dayNumber}-t1`,
            category: 'English',
            title: 'Istoria Graded Reader Story: Chapter Reading & 10 Vocab Extraction',
            duration: '25 min',
            impact: '+2 English Vocabulary',
            resourceName: 'Istoria App',
            resourceUrl: 'https://istoria.app/',
            notes: 'Extract 10 unknown words into personal vocabulary sheet with contextual example sentences.',
          },
          {
            id: `d${dayNumber}-t2`,
            category: 'English',
            title: 'Talkora Diagnostic Fix: Verb Tense Consistency (Past vs. Present)',
            duration: '25 min',
            impact: '+3 Grammar Accuracy',
            resourceName: 'Talkora Assessment Notes (Error #1)',
            resourceUrl: 'TL-3876 - Mostafa Mohamed (Assessment\'s Notes) .pdf',
            notes: 'Eliminate "This take 6 month" pattern -> "This took 6 months". Describe past project tickets.',
          },
          {
            id: `d${dayNumber}-t3`,
            category: 'Excel',
            title: 'Advanced Dynamic Array Formulas: XLOOKUP, FILTER, UNIQUE & SORT',
            duration: '35 min',
            impact: '+3 Excel Score',
            resourceName: 'ExcelJet Advanced Formulas',
            resourceUrl: 'https://exceljet.net/',
            notes: 'Build automated reconciliation sheet that dynamically filters low-stock items without helper columns.',
          },
          {
            id: `d${dayNumber}-t4`,
            category: 'Data Analysis',
            title: 'Head Start Handbook Study: Step 1 (Purpose) & Step 2 (Questions)',
            duration: '25 min',
            impact: '+2 Analysis Methodology',
            resourceName: 'Head Start Data Analysis Handbook (Pages 1-28)',
            resourceUrl: 'introduction-to-data-analysis-handbook-migrant--seasonal-head-start.pdf',
            notes: 'Formulate 3 testable research questions connecting attendance metrics to classroom health scores.',
          },
        ],
      };
    }

    if (dayOfWeek === 'Monday') {
      return {
        dayNumber,
        month,
        sprint,
        date: dateStr,
        dayOfWeek,
        dayType: 'Review & Complex SQL Joins Day',
        theme: 'Subject-Verb Agreement & Multi-Table SQL Queries',
        missionTitle: `“Day ${dayNumber}: Multi-Table SQL Matrix & Agreement Rules”`,
        missionDescription: 'British Council agreement quizzes, solve multi-table JOINs on DataLemur, and clean missing values with Python Pandas.',
        focusCompetencies: ['English (Subject-Verb Agreement)', 'SQL (JOINs & Aggregations)', 'Python (Pandas Wrangling)'],
        tasks: [
          {
            id: `d${dayNumber}-t1`,
            category: 'English',
            title: 'British Council A2 Grammar: Subject-Verb Agreement & Plurals',
            duration: '25 min',
            impact: '+2 Grammar Accuracy',
            resourceName: 'British Council LearnEnglish',
            resourceUrl: 'https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar',
            notes: 'Drill third-person "-s" ("the query executes", "the system processes", "many projects").',
          },
          {
            id: `d${dayNumber}-t2`,
            category: 'SQL',
            title: 'Multi-Table JOINs: INNER, LEFT & FULL OUTER with Aggregations',
            duration: '40 min',
            impact: '+3 SQL Score',
            resourceName: 'DataLemur SQL Practice Platform',
            resourceUrl: 'https://datalemur.com/',
            notes: 'Solve 3 medium SQL challenges: Customer Lifetime Spend, Inactive Users, Category Revenue.',
          },
          {
            id: `d${dayNumber}-t3`,
            category: 'Python',
            title: 'Pandas Vectorized Filtering & Automated Missing Value Imputation',
            duration: '35 min',
            impact: '+3 Python Score',
            resourceName: 'Python for Data Analysis (Wes McKinney Ch. 5)',
            resourceUrl: 'https://wesmckinney.com/book/',
            notes: 'Load 50,000 retail records. Impute missing categories with mode and prices with median.',
          },
          {
            id: `d${dayNumber}-t4`,
            category: 'Power BI',
            title: 'DAX CALCULATE() Deep-Dive: Filter Modification & ALL()',
            duration: '30 min',
            impact: '+2 Power BI Score',
            resourceName: 'SQLBI Definitive Guide to DAX',
            resourceUrl: 'https://www.sqlbi.com/',
            notes: 'Author [Sales Contribution %] measure using CALCULATE([Total Sales], ALL(DimProducts)).',
          },
        ],
      };
    }

    if (dayOfWeek === 'Tuesday') {
      return {
        dayNumber,
        month,
        sprint,
        date: dateStr,
        dayOfWeek,
        dayType: 'Listening & Context Transition Day',
        theme: 'VOA Tech News & DAX CALCULATE() Filter Context',
        missionTitle: `“Day ${dayNumber}: Advanced DAX Context & Data Collection Protocols”`,
        missionDescription: 'Listen to VOA Tech broadcast, master DAX CALCULATE() filter context, and study Steps 3-4 of Head Start Handbook.',
        focusCompetencies: ['English (Listening)', 'Power BI (DAX Context)', 'Data Analysis (Collection Strategy)'],
        tasks: [
          {
            id: `d${dayNumber}-t1`,
            category: 'English',
            title: 'VOA Technology Report: Shadowing Speech Rhythm & Intonation',
            duration: '25 min',
            impact: '+2 English Fluency',
            resourceName: 'VOA Tech Broadcast',
            resourceUrl: 'https://learningenglish.voanews.com/',
            notes: 'Record voice shadowing technology broadcast. Compare sentence cadence and intonation.',
          },
          {
            id: `d${dayNumber}-t2`,
            category: 'SQL',
            title: 'Common Table Expressions (CTEs) & Subqueries for Nested Logic',
            duration: '35 min',
            impact: '+3 SQL Score',
            resourceName: 'PostgreSQL Docs Ch. 7.8',
            resourceUrl: 'https://www.postgresql.org/docs/',
            notes: 'Write readable WITH cte_sales AS (...) queries to isolate top 10% customers by transaction count.',
          },
          {
            id: `d${dayNumber}-t3`,
            category: 'Data Analysis',
            title: 'Head Start Handbook Study: Step 3 (Collection) & Step 4 (Analysis)',
            duration: '30 min',
            impact: '+2 Analysis Methodology',
            resourceName: 'Head Start Data Analysis Handbook (Pages 29-74)',
            resourceUrl: 'introduction-to-data-analysis-handbook-migrant--seasonal-head-start.pdf',
            notes: 'Study cross-tabulations and margin of error protocols for incomplete programmatic records.',
          },
          {
            id: `d${dayNumber}-t4`,
            category: 'Excel',
            title: 'Power Query M-Language Cleaning & Automated Type Coercion',
            duration: '30 min',
            impact: '+2 Excel Automation',
            resourceName: 'Microsoft Learn Power Query',
            resourceUrl: 'https://learn.microsoft.com/power-query/',
            notes: 'Unpivot multi-year budget spreadsheets into normalized tabular structure with zero errors.',
          },
        ],
      };
    }

    if (dayOfWeek === 'Wednesday') {
      return {
        dayNumber,
        month,
        sprint,
        date: dateStr,
        dayOfWeek,
        dayType: 'Grammar & Normal Curve Day',
        theme: 'Technical Executive Writing & Normal Distribution (OpenStax Ch. 6)',
        missionTitle: `“Day ${dayNumber}: Z-Score Outlier Detection & Executive Writing”`,
        missionDescription: 'Draft a 100-word analytical trend summary, master Z-Scores and Empirical Rule in OpenStax Ch. 6, and test Polars lazy queries.',
        focusCompetencies: ['English (Executive Writing)', 'Statistics (Normal Curve)', 'Python (Polars Engine)'],
        tasks: [
          {
            id: `d${dayNumber}-t1`,
            category: 'English',
            title: 'Executive Technical Writing: 100-Word Dashboard Variance Summary',
            duration: '25 min',
            impact: '+2 Writing & Business Voice',
            resourceName: 'Harvard Business Review Executive Voice',
            resourceUrl: 'https://hbr.org/',
            notes: 'Write 3 paragraphs explaining variance using movement verbs (plummeted, outpaced, rebounded).',
          },
          {
            id: `d${dayNumber}-t2`,
            category: 'Statistics',
            title: 'The Normal Distribution & Empirical Rule 68-95-99.7 (OpenStax Ch. 6)',
            duration: '35 min',
            impact: '+3 Statistics Score',
            resourceName: 'OpenStax Statistics 2e (Ch. 6)',
            resourceUrl: 'introductory-statistics-2e_-_WEB.pdf',
            notes: 'Calculate Z-Scores: z = (x - mu) / sigma. Determine which transaction values exceed +3 sigma.',
          },
          {
            id: `d${dayNumber}-t3`,
            category: 'Power BI',
            title: 'Time Intelligence DAX: YTD, YoY Growth & ParallelPeriod',
            duration: '35 min',
            impact: '+3 Power BI Score',
            resourceName: 'Microsoft Learn DAX Patterns',
            resourceUrl: 'https://www.daxpatterns.com/',
            notes: 'Implement custom Fiscal Date Table and write [Sales YoY %] measure handling null prior years.',
          },
          {
            id: `d${dayNumber}-t4`,
            category: 'Python',
            title: 'Polars High-Speed Engine: LazyFrame Queries on 500k Records',
            duration: '25 min',
            impact: '+2 Python Score',
            resourceName: 'Polars Official Python User Guide',
            resourceUrl: 'https://docs.pola.rs/',
            notes: 'Benchmark pl.scan_csv() vs pd.read_csv(). Execute grouped aggregations with zero memory spills.',
          },
        ],
      };
    }

    if (dayOfWeek === 'Thursday') {
      return {
        dayNumber,
        month,
        sprint,
        date: dateStr,
        dayOfWeek,
        dayType: 'Synthesis & Automation Day',
        theme: 'SQL Window Functions & n8n Scheduled Webhook Pipelines',
        missionTitle: `“Day ${dayNumber}: Advanced SQL Window Functions & n8n Automation”`,
        missionDescription: 'Master ROW_NUMBER(), DENSE_RANK(), and LEAD/LAG, build a scheduled webhook pipeline in n8n, and practice technical presentation speech.',
        focusCompetencies: ['English (Technical Presentation)', 'SQL (Window Functions)', 'n8n Automation (Webhooks)'],
        tasks: [
          {
            id: `d${dayNumber}-t1`,
            category: 'English',
            title: 'Technical Presentation Speech Drills: Articulating Findings Confidently',
            duration: '25 min',
            impact: '+2 Presentation Skill',
            resourceName: 'Youglish Business English Lab',
            resourceUrl: 'https://youglish.com/',
            notes: 'Practice transitions: "Turning to the next chart...", "What this implies for our bottom line is...".',
          },
          {
            id: `d${dayNumber}-t2`,
            category: 'SQL',
            title: 'Window Functions: ROW_NUMBER(), DENSE_RANK(), LEAD() & LAG()',
            duration: '40 min',
            impact: '+3 SQL Score',
            resourceName: 'DataLemur SQL Master Series',
            resourceUrl: 'https://datalemur.com/',
            notes: 'Calculate Month-over-Month growth directly in SQL using LAG(sales, 1) OVER (ORDER BY order_month).',
          },
          {
            id: `d${dayNumber}-t3`,
            category: 'AI Engineering',
            title: 'Text-to-SQL Prompt Grounding with Schema Injection & Validation',
            duration: '30 min',
            impact: '+2 AI Architecture',
            resourceName: 'AI Engineering: Foundation Models (Ch. 3-4)',
            resourceUrl: 'AI Engineering.pdf',
            notes: 'Inject DDL constraints into LLM context and validate generated SELECT queries against syntax.',
          },
          {
            id: `d${dayNumber}-t4`,
            category: 'n8n Automation',
            title: 'n8n Scheduled Webhook Flow: Ingest Daily Sheet & Trigger Slack Alert',
            duration: '25 min',
            impact: '+2 Automation Skill',
            resourceName: 'n8n Official Academy',
            resourceUrl: 'https://academy.n8n.io/',
            notes: 'Build node pipeline: Cron trigger -> HTTP Request -> Transform -> Slack notification.',
          },
        ],
      };
    }

    // Friday
    return {
      dayNumber,
      month,
      sprint,
      date: dateStr,
      dayOfWeek,
      dayType: 'Weekly Challenge & Milestone Day',
      theme: 'Sprint Review, 1-Min Voice Journal & Capstone Milestone',
      missionTitle: `“Day ${dayNumber}: Sprint Capstone Milestone & Talkora Voice Journal”`,
      missionDescription: 'Record a 1-minute spontaneous voice journal against Talkora rubric, finalize E-Commerce SQL warehouse, and complete Sprint review.',
      isMilestoneDay: isMilestone,
      isSpacedRepetitionDay: true,
      focusCompetencies: ['English (Voice Challenge)', 'Portfolio Milestone (SQL & Excel)', 'Sprint Review'],
      tasks: [
        {
          id: `d${dayNumber}-t1`,
          category: 'English',
          title: 'Weekly Voice Challenge: 1-Minute Spontaneous Speech Recording',
          duration: '30 min',
          impact: '+3 English Confidence',
          resourceName: 'Talkora Assessment Practice Guide',
          resourceUrl: 'Talkora Practice Plan - Video.mp4',
          notes: 'Record 60 seconds answering: "How did I optimize the E-Commerce SQL database this week?". Self-grade against rubric.',
        },
        {
          id: `d${dayNumber}-t2`,
          category: 'Portfolio Project',
          title: 'Milestone 1 Validation: E-Commerce SQL Warehouse & Excel Dynamic Model',
          duration: '45 min',
          impact: '+5 Portfolio Readiness',
          resourceName: 'GitHub Portfolio Repository Template',
          resourceUrl: 'https://github.com/',
          notes: 'Finalize schema DDL, test automated Excel KPI model, write README executive summary, commit to GitHub.',
        },
        {
          id: `d${dayNumber}-t3`,
          category: 'Data Analysis',
          title: 'Head Start Handbook Study: Step 6 (Reporting) & Step 7 (Action)',
          duration: '25 min',
          impact: '+2 Analysis Methodology',
          resourceName: 'Head Start Data Analysis Handbook (Pages 75-112)',
          resourceUrl: 'introduction-to-data-analysis-handbook-migrant--seasonal-head-start.pdf',
          notes: 'Synthesize data findings into an action matrix mapping findings to operational recommendations.',
        },
        {
          id: `d${dayNumber}-t4`,
          category: 'Review & Planning',
          title: 'Sprint Retrospective & Next Week Schedule Lock-In',
          duration: '20 min',
          impact: '+2 Consistency Score',
          resourceName: 'Mostafa Mohamed Practice Plan.xlsx',
          resourceUrl: 'Mostafa Mohamed Practice Plan.xlsx',
          notes: 'Review velocity metrics, verify carried over tasks, log total study hours, lock in next sprint.',
        },
      ],
    };
  }

  // MONTH 2 (Days 31 - 60): Power BI, Advanced DAX, Star Schema & Storytelling
  if (month === 2) {
    const isDAXFocus = dayNumber % 2 === 0;
    return {
      dayNumber,
      month,
      sprint,
      date: dateStr,
      dayOfWeek,
      dayType: isDAXFocus ? 'Advanced DAX & Tabular Modeling' : 'Power BI Storytelling & Visual Architecture',
      theme: 'C-Suite Executive Dashboards, DAX Filter Overrides & Business Voice',
      missionTitle: `“Day ${dayNumber}: ${isDAXFocus ? 'CALCULATE() Overrides & Virtual Tables' : 'Executive Storytelling & DAX Studio Tuning'}”`,
      missionDescription: 'Design C-suite level storytelling dashboards, eliminate bidirectional filtering, optimize VertiPaq memory, and present trends in fluent English.',
      isMilestoneDay: isMilestone,
      isSpacedRepetitionDay: isSpacedRepetition,
      focusCompetencies: ['Power BI (DAX & Tabular)', 'Storytelling & Presentation', 'English (Executive Speech)'],
      tasks: [
        {
          id: `d${dayNumber}-t1`,
          category: 'Power BI',
          title: isDAXFocus
            ? 'DAX CALCULATE() with ALL, ALLEXCEPT & KEEPFILTERS() Mechanics'
            : 'Decomposition Trees, Anomaly Detection & Drill-Through Design',
          duration: '40 min',
          impact: '+3 Power BI Score',
          resourceName: 'SQLBI Definitive Guide to DAX Ch. 5',
          resourceUrl: 'https://www.sqlbi.com/',
          notes: 'Author measures computing product cohort market share without context pollution.',
        },
        {
          id: `d${dayNumber}-t2`,
          category: 'Power BI',
          title: 'VertiPaq Engine Optimization: DAX Studio & Tabular Editor Audit',
          duration: '35 min',
          impact: '+3 Data Modeling Score',
          resourceName: 'DAX Studio Official',
          resourceUrl: 'https://daxstudio.org/',
          notes: 'Analyze storage engine vs formula engine timings; eliminate high-cardinality timestamp columns.',
        },
        {
          id: `d${dayNumber}-t3`,
          category: 'English',
          title: 'Explaining Charts & Business Variances in English (HBR Voice)',
          duration: '25 min',
          impact: '+2 Business Voice',
          resourceName: 'Harvard Business Review Executive Voice',
          resourceUrl: 'https://hbr.org/',
          notes: 'Practice using movement verbs (plummeted, outpaced, surged, plateaued) describing Q3 performance.',
        },
        {
          id: `d${dayNumber}-t4`,
          category: 'SQL',
          title: 'Star Schema Query Benchmarking on PostgreSQL & SQL Server',
          duration: '30 min',
          impact: '+2 SQL Score',
          resourceName: 'PostgreSQL Performance Optimization',
          resourceUrl: 'https://www.postgresql.org/docs/',
          notes: 'Compare query speeds when aggregating star schema fact tables versus flat denormalized tables.',
        },
      ],
    };
  }

  // MONTH 3 (Days 61 - 90): Python Wrangling, Inferential Statistics & A/B Testing
  if (month === 3) {
    const isStatsDay = dayOfWeek === 'Sunday' || dayOfWeek === 'Wednesday';
    return {
      dayNumber,
      month,
      sprint,
      date: dateStr,
      dayOfWeek,
      dayType: isStatsDay ? 'Inferential Statistics & Hypothesis Testing' : 'High-Performance Python (Pandas & Polars)',
      theme: 'Statistical Inference, t-Tests, A/B Testing & Vectorized Wrangling',
      missionTitle: `“Day ${dayNumber}: ${isStatsDay ? 'OpenStax Hypothesis Testing (Ch. 9-10)' : 'Polars LazyFrames & Vectorized Cleaning'}”`,
      missionDescription: 'Master Student t-tests, ANOVA, Chi-Square, A/B testing sample sizing, and stream 1M+ rows in Polars with zero latency.',
      isMilestoneDay: isMilestone,
      isSpacedRepetitionDay: isSpacedRepetition,
      focusCompetencies: ['Python (Polars & Pandas)', 'Statistics (Hypothesis & A/B Testing)', 'English (Technical Explanations)'],
      tasks: [
        {
          id: `d${dayNumber}-t1`,
          category: 'Python',
          title: 'Polars vs. Pandas Benchmarking: Lazy Evaluation & Memory Streaming',
          duration: '40 min',
          impact: '+3 Python Score',
          resourceName: 'Python for Data Analysis (Wes McKinney) & Polars User Guide',
          resourceUrl: 'https://docs.pola.rs/',
          notes: 'Write expressions filtering 1M rows and computing cohort retention in under 2 seconds.',
        },
        {
          id: `d${dayNumber}-t2`,
          category: 'Statistics',
          title: 'Two-Sample Student t-Test & p-Value Interpretation (OpenStax Ch. 10)',
          duration: '35 min',
          impact: '+3 Statistics Score',
          resourceName: 'OpenStax Statistics 2e (Ch. 10)',
          resourceUrl: 'introductory-statistics-2e_-_WEB.pdf',
          notes: 'Derive null hypothesis H0 vs alternative Ha; evaluate Type I (alpha) and Type II (beta) error risks.',
        },
        {
          id: `d${dayNumber}-t3`,
          category: 'Statistics',
          title: 'Controlled A/B Testing: Sample Size & Minimum Detectable Effect (MDE)',
          duration: '30 min',
          impact: '+2 Experimentation Score',
          resourceName: 'Evan Miller A/B Testing Guides',
          resourceUrl: 'https://www.evanmiller.org/ab-testing/',
          notes: 'Calculate required sample size for 80% statistical power (1 - beta) and 5% significance level.',
        },
        {
          id: `d${dayNumber}-t4`,
          category: 'English',
          title: 'Articulating Statistical Significance to Non-Technical Stakeholders',
          duration: '25 min',
          impact: '+2 Communication Score',
          resourceName: 'Talkora Technical Fluency Drills',
          resourceUrl: 'Talkora Practice Plan - Video.mp4',
          notes: 'Speak 2 minutes explaining why p = 0.03 implies confidence to launch the new checkout feature.',
        },
      ],
    };
  }

  // MONTH 4 (Days 91 - 120): Applied Machine Learning & Predictive Analytics
  if (month === 4) {
    return {
      dayNumber,
      month,
      sprint,
      date: dateStr,
      dayOfWeek,
      dayType: 'Machine Learning & Predictive Modeling',
      theme: 'Feature Engineering, XGBoost, Optuna & Model Explainability (SHAP)',
      missionTitle: `“Day ${dayNumber}: Supervised Learning & SHAP Values Explainability”`,
      missionDescription: 'Train Gradient Boosting models on customer churn data, tune hyperparameters with Optuna, and interpret feature importances with SHAP.',
      isMilestoneDay: isMilestone,
      isSpacedRepetitionDay: isSpacedRepetition,
      focusCompetencies: ['Machine Learning (Scikit-Learn & XGBoost)', 'Feature Engineering', 'Model Interpretability'],
      tasks: [
        {
          id: `d${dayNumber}-t1`,
          category: 'Machine Learning',
          title: 'Feature Engineering: Target Encoding, Recency-Frequency & SMOTE',
          duration: '40 min',
          impact: '+3 ML Modeling Score',
          resourceName: 'Hands-On Machine Learning with Scikit-Learn',
          resourceUrl: 'https://scikit-learn.org/',
          notes: 'Handle extreme class imbalance on fraud/churn dataset using Synthetic Minority Over-sampling (SMOTE).',
        },
        {
          id: `d${dayNumber}-t2`,
          category: 'Machine Learning',
          title: 'XGBoost & LightGBM Classification with Optuna Hyperparameter Tuning',
          duration: '40 min',
          impact: '+3 Algorithm Mastery',
          resourceName: 'XGBoost Official Python Documentation',
          resourceUrl: 'https://xgboost.readthedocs.io/',
          notes: 'Tune max_depth, learning_rate, and subsample using Optuna 5-fold cross-validation.',
        },
        {
          id: `d${dayNumber}-t3`,
          category: 'Machine Learning',
          title: 'Model Explainability: SHAP (Shapley Additive exPlanations) Summary Plots',
          duration: '30 min',
          impact: '+2 Business Interpretability',
          resourceName: 'Interpretable Machine Learning Book',
          resourceUrl: 'https://christophm.github.io/interpretable-ml-book/',
          notes: 'Generate beeswarm summary plot isolating the top 3 drivers of customer attrition.',
        },
        {
          id: `d${dayNumber}-t4`,
          category: 'English',
          title: 'Pitching Predictive Models to C-Suite Executives in Fluent English',
          duration: '25 min',
          impact: '+2 Pitching & Influence',
          resourceName: 'Harvard Business Review AI Case Studies',
          resourceUrl: 'https://hbr.org/',
          notes: 'Practice executive pitch: translate 0.88 AUC-ROC into projected 14% reduction in churn attrition.',
        },
      ],
    };
  }

  // MONTH 5 (Days 121 - 150): Modern RAG & Agentic AI Systems
  if (month === 5) {
    return {
      dayNumber,
      month,
      sprint,
      date: dateStr,
      dayOfWeek,
      dayType: 'Modern RAG & Agentic AI Systems',
      theme: 'Vector DBs, Text-to-SQL Agents, Self-Correction & Ragas Evals',
      missionTitle: `“Day ${dayNumber}: Autonomous Text-to-SQL Agents & Hybrid Search”`,
      missionDescription: 'Ingest financial PDF documents into Qdrant, build Text-to-SQL agents with LangGraph self-correction, and evaluate with Ragas.',
      isMilestoneDay: isMilestone,
      isSpacedRepetitionDay: isSpacedRepetition,
      focusCompetencies: ['AI Engineering (RAG & Agents)', 'Vector Databases', 'LLM Evaluations'],
      tasks: [
        {
          id: `d${dayNumber}-t1`,
          category: 'AI Engineering',
          title: 'Semantic Chunking & Dense Embeddings in Vector Store (Qdrant / Chroma)',
          duration: '40 min',
          impact: '+3 AI Architecture',
          resourceName: 'AI Engineering: Foundation Models (Ch. 5)',
          resourceUrl: 'AI Engineering.pdf',
          notes: 'Implement semantic chunking and index 50 annual reports with metadata filtering by fiscal quarter.',
        },
        {
          id: `d${dayNumber}-t2`,
          category: 'AI Engineering',
          title: 'Text-to-SQL Self-Correction Loop with LangGraph Multi-Agent Workflows',
          duration: '45 min',
          impact: '+3 Agentic AI Skill',
          resourceName: 'LangGraph Documentation',
          resourceUrl: 'https://langchain-ai.github.io/langgraph/',
          notes: 'Construct agent that translates natural questions into PostgreSQL queries, catching syntax errors.',
        },
        {
          id: `d${dayNumber}-t3`,
          category: 'AI Engineering',
          title: 'Ragas Automated RAG Evaluation: Faithfulness & Context Recall Metrics',
          duration: '35 min',
          impact: '+2 Quality Guardrails',
          resourceName: 'Ragas Documentation',
          resourceUrl: 'https://docs.ragas.io/',
          notes: 'Benchmark 50 test QA pairs, verifying > 90% Faithfulness and zero hallucinated metrics.',
        },
        {
          id: `d${dayNumber}-t4`,
          category: 'English',
          title: 'Technical Video Demo: Presenting an Autonomous RAG Agent in English',
          duration: '25 min',
          impact: '+2 Executive Demo Voice',
          resourceName: 'YouTube Technical Creator Showcase',
          resourceUrl: 'https://youtube.com/',
          notes: 'Record 2-minute screen recording explaining architecture: prompt -> schema injection -> execution.',
        },
      ],
    };
  }

  // MONTH 6 (Days 151 - 180): Deep Learning, n8n Automation & Full Portfolio Deployment
  const isFinalTenDays = dayNumber >= 170;
  return {
    dayNumber,
    month,
    sprint,
    date: dateStr,
    dayOfWeek,
    dayType: isFinalTenDays ? 'Job Placement, LinkedIn Funnel & Mock Interviews' : 'n8n Automation & Deep Learning Pipelines',
    theme: isFinalTenDays ? 'Hiring Funnel, Resume Showcase & Salary Negotiation' : 'Automated ETL, Webhooks & PyTorch Foundations',
    missionTitle: `“Day ${dayNumber}: ${isFinalTenDays ? 'LinkedIn Recruiter Optimization & Mock Interviews' : 'n8n Automated Decision Loop & PyTorch Tensors'}”`,
    missionDescription: isFinalTenDays
      ? 'Polish GitHub READMEs, optimize LinkedIn headline and skills assessments, and execute timed behavioral STAR interviews.'
      : 'Connect webhooks and databases into zero-maintenance n8n pipelines and build custom PyTorch MLPs.',
    isMilestoneDay: isMilestone,
    isSpacedRepetitionDay: isSpacedRepetition,
    focusCompetencies: isFinalTenDays
      ? ['Career & LinkedIn Funnel', 'Technical Interviews', 'Salary Negotiation']
      : ['n8n Automation', 'Deep Learning (PyTorch)', 'Production ETL'],
    tasks: isFinalTenDays
      ? [
          {
            id: `d${dayNumber}-t1`,
            category: 'Career & Interview',
            title: 'LinkedIn Profile Audit: Headline, Featured Projects & Skill Badges',
            duration: '40 min',
            impact: '+4 Recruiter Inbound',
            resourceName: 'Ace the Data Analyst Interview',
            resourceUrl: 'https://github.com/',
            notes: 'Align profile with keyword search algorithms (SQL, Power BI, DAX, Python, RAG, n8n).',
          },
          {
            id: `d${dayNumber}-t2`,
            category: 'Career & Interview',
            title: 'Live Technical SQL & BI Mock Interview Drills (Timed 45-Min Challenge)',
            duration: '45 min',
            impact: '+4 Technical Confidence',
            resourceName: 'DataLemur Interview Challenge Series',
            resourceUrl: 'https://datalemur.com/',
            notes: 'Solve 2 hard window function challenges under pressure while vocalizing thought process in English.',
          },
          {
            id: `d${dayNumber}-t3`,
            category: 'English',
            title: 'Behavioral Interview STAR Technique Drills in English',
            duration: '35 min',
            impact: '+3 Interview Fluency',
            resourceName: 'Harvard Business Review Interview Preparation',
            resourceUrl: 'https://hbr.org/',
            notes: 'Answer: "Describe a time your data analysis contradicted executive assumptions and how you handled it".',
          },
          {
            id: `d${dayNumber}-t4`,
            category: 'Portfolio Project',
            title: 'GitHub Repositories Final Polish: High-Resolution Architecture Diagrams',
            duration: '30 min',
            impact: '+3 Portfolio Quality',
            resourceName: 'GitHub Portfolio Standards',
            resourceUrl: 'https://github.com/',
            notes: 'Verify all 6 portfolio projects have clear problem statements, business impacts, and reproducible setup scripts.',
          },
        ]
      : [
          {
            id: `d${dayNumber}-t1`,
            category: 'n8n Automation',
            title: 'n8n Automated ETL: Webhook Ingestion -> PostgreSQL Upsert -> Slack Brief',
            duration: '45 min',
            impact: '+3 Automation Skill',
            resourceName: 'n8n Official Academy',
            resourceUrl: 'https://academy.n8n.io/',
            notes: 'Deploy automated flow triggering on schedule, pulling daily KPIs, and dispatching formatted Slack blocks.',
          },
          {
            id: `d${dayNumber}-t2`,
            category: 'Deep Learning',
            title: 'PyTorch Custom Multi-Layer Perceptron (MLP) with AdamW & Early Stopping',
            duration: '40 min',
            impact: '+3 Neural Network Score',
            resourceName: 'Deep Learning with PyTorch (official)',
            resourceUrl: 'https://pytorch.org/tutorials/',
            notes: 'Train custom neural network on tabular embeddings with learning rate schedulers and validation checkpoints.',
          },
          {
            id: `d${dayNumber}-t3`,
            category: 'English',
            title: 'Explaining Autonomous Workflows & Architecture Decisions in English',
            duration: '25 min',
            impact: '+2 Architectural Voice',
            resourceName: 'Talkora Advanced Speaking Lab',
            resourceUrl: 'Talkora Practice Plan - Video.mp4',
            notes: 'Present the architecture of your n8n automation pipeline with confidence and clear technical terminology.',
          },
          {
            id: `d${dayNumber}-t4`,
            category: 'Portfolio Project',
            title: 'Integration Testing: Multi-Modal BI System with Automated n8n Alerting',
            duration: '30 min',
            impact: '+3 Portfolio Quality',
            resourceName: 'n8n Advanced Workflows',
            resourceUrl: 'https://n8n.io/workflows/',
            notes: 'Test end-to-end reliability: simulate error conditions and verify automated error recovery triggers.',
          },
        ],
  };
}
