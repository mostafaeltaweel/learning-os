/**
 * technicalCurriculum.ts
 * Comprehensive 24-Sprint Technical Curriculum for Data & BI Analyst
 * Synthesizes: SQL, Power BI, Python, Statistics, Google Data Analytics, AI & English.
 */

export interface CurriculumTopic {
  id: string;
  name: string;
  status: 'Completed' | 'In Progress' | 'Remaining';
}

export interface ModuleCurriculum {
  module: string;
  weight: number;
  currentLevel: string;
  targetLevel: string;
  topics: CurriculumTopic[];
}

export interface SprintCurriculum {
  sprintNumber: number;
  sprintName: string;
  weekTheme: string;
  goals: {
    english: string;
    sql: string;
    powerBi: string;
    python: string;
    statistics: string;
    aiOrGoogle: string;
  };
  dailyPlan: {
    dayName: string;
    dayType: string;
    tasks: {
      category: 'English' | 'SQL' | 'Power BI' | 'Python' | 'Statistics' | 'AI / Google Analytics';
      title: string;
      hours: number;
      impact: string;
      details: string;
      resource: string;
    }[];
  }[];
}

export const technicalCurriculumData: ModuleCurriculum[] = [
  {
    module: 'SQL',
    weight: 0.25,
    currentLevel: 'Beginner',
    targetLevel: 'Job Ready',
    topics: [
      { id: 'sql-1', name: 'SELECT, DISTINCT & WHERE Filters', status: 'Completed' },
      { id: 'sql-2', name: 'ORDER BY, LIMIT & Aliasing', status: 'Completed' },
      { id: 'sql-3', name: 'Aggregations: COUNT, SUM, AVG, MIN, MAX', status: 'Completed' },
      { id: 'sql-4', name: 'GROUP BY & HAVING Clauses', status: 'Completed' },
      { id: 'sql-5', name: 'INNER JOIN & LEFT/RIGHT OUTER JOINs', status: 'In Progress' },
      { id: 'sql-6', name: 'Multi-table JOINs & Self JOINs', status: 'In Progress' },
      { id: 'sql-7', name: 'Subqueries & Correlated Subqueries', status: 'Remaining' },
      { id: 'sql-8', name: 'Common Table Expressions (CTEs & Recursive)', status: 'Remaining' },
      { id: 'sql-9', name: 'Window Functions: ROW_NUMBER, RANK, DENSE_RANK', status: 'Remaining' },
      { id: 'sql-10', name: 'Window Functions: LEAD, LAG & Running Totals', status: 'Remaining' },
      { id: 'sql-11', name: 'Schema Design, Foreign Keys & Constraints', status: 'Remaining' },
      { id: 'sql-12', name: 'Query Optimization, Indexing & EXPLAIN Plans', status: 'Remaining' },
    ],
  },
  {
    module: 'Power BI',
    weight: 0.25,
    currentLevel: 'Beginner',
    targetLevel: 'Job Ready',
    topics: [
      { id: 'pbi-1', name: 'Power Query ETL & Data Cleansing', status: 'Completed' },
      { id: 'pbi-2', name: 'Star Schema & 1-to-Many Relationships', status: 'Completed' },
      { id: 'pbi-3', name: 'Calculated Columns vs. DAX Measures', status: 'In Progress' },
      { id: 'pbi-4', name: 'DAX CALCULATE() & Filter Context Transition', status: 'In Progress' },
      { id: 'pbi-5', name: 'Time Intelligence: YTD, MTD, SAMEPERIODLASTYEAR', status: 'Remaining' },
      { id: 'pbi-6', name: 'ALL(), ALLEXCEPT() & FILTER() Mastery', status: 'Remaining' },
      { id: 'pbi-7', name: 'Executive Storytelling & Visual Hierarchy', status: 'Remaining' },
      { id: 'pbi-8', name: 'Drill-Through, Tooltips & Bookmarks Navigation', status: 'Remaining' },
      { id: 'pbi-9', name: 'Row-Level Security (RLS) & Workspace Governance', status: 'Remaining' },
      { id: 'pbi-10', name: 'Automated Scheduled Refresh & Gateway Config', status: 'Remaining' },
    ],
  },
  {
    module: 'English',
    weight: 0.15,
    currentLevel: 'Intermediate (A1+)',
    targetLevel: 'Job Ready (B2/C1)',
    topics: [
      { id: 'eng-1', name: 'Verb Tenses Consistency (Past vs. Present)', status: 'In Progress' },
      { id: 'eng-2', name: 'Subject-Verb Agreement (Singular/Plural rules)', status: 'In Progress' },
      { id: 'eng-3', name: 'Articles (a/an/the) & Countable Nouns', status: 'In Progress' },
      { id: 'eng-4', name: 'Sentence Natural Flow (am/is/are & Prepositions)', status: 'In Progress' },
      { id: 'eng-5', name: 'Word Families: fluent, fluently, fluency', status: 'Remaining' },
      { id: 'eng-6', name: 'Pronunciation: /b/ vs. /p/ & TH sound clarity', status: 'In Progress' },
      { id: 'eng-7', name: 'Speed Typing & Spelling Automation', status: 'Completed' },
      { id: 'eng-8', name: 'Business Presentation & Storytelling Fluency', status: 'Remaining' },
      { id: 'eng-9', name: 'Technical Interview Mock Drills', status: 'Remaining' },
    ],
  },
  {
    module: 'Python',
    weight: 0.15,
    currentLevel: 'Not Started',
    targetLevel: 'Job Ready',
    topics: [
      { id: 'py-1', name: 'Python Basics, Data Types & Control Flow', status: 'In Progress' },
      { id: 'py-2', name: 'Pandas DataFrames: Filtering & Slicing', status: 'Remaining' },
      { id: 'py-3', name: 'Data Cleaning: Missing Values, Duplicates & Types', status: 'Remaining' },
      { id: 'py-4', name: 'GroupBy, Aggregation & Pivot Tables', status: 'Remaining' },
      { id: 'py-5', name: 'Merging, Joining & Concatenating Datasets', status: 'Remaining' },
      { id: 'py-6', name: 'Matplotlib & Seaborn Data Visualization', status: 'Remaining' },
      { id: 'py-7', name: 'Automated Exploratory Data Analysis (EDA)', status: 'Remaining' },
      { id: 'py-8', name: 'Streamlit Interactive Dashboard Development', status: 'Remaining' },
    ],
  },
  {
    module: 'Statistics',
    weight: 0.10,
    currentLevel: 'Advanced',
    targetLevel: 'Job Ready',
    topics: [
      { id: 'stat-1', name: 'Measures of Central Tendency (Mean, Median, Mode)', status: 'Completed' },
      { id: 'stat-2', name: 'Variance, Standard Deviation & IQR', status: 'Completed' },
      { id: 'stat-3', name: 'Normal Distribution & Z-Scores', status: 'Completed' },
      { id: 'stat-4', name: 'Sampling Distributions & Central Limit Theorem', status: 'Completed' },
      { id: 'stat-5', name: 'Confidence Intervals & Margin of Error', status: 'In Progress' },
      { id: 'stat-6', name: 'Hypothesis Testing (p-value, Type I & II errors)', status: 'Remaining' },
      { id: 'stat-7', name: 'A/B Testing Design & Sample Size Calculation', status: 'Remaining' },
      { id: 'stat-8', name: 'Correlation vs. Causation & Regression Models', status: 'Remaining' },
    ],
  },
  {
    module: 'Agentic AI & Google Cert',
    weight: 0.10,
    currentLevel: 'Beginner',
    targetLevel: 'Job Ready',
    topics: [
      { id: 'ai-1', name: 'Google Cert: Ask Questions & Data-Driven Decisions', status: 'Completed' },
      { id: 'ai-2', name: 'Google Cert: Prepare Data for Exploration', status: 'In Progress' },
      { id: 'ai-3', name: 'Google Cert: Process Data from Dirty to Clean', status: 'Remaining' },
      { id: 'ai-4', name: 'Google Cert: Analyze Data to Answer Questions', status: 'Remaining' },
      { id: 'ai-5', name: 'Prompt Engineering for Data Analysts (CoT & Few-shot)', status: 'Completed' },
      { id: 'ai-6', name: 'RAG Architecture: Natural Language to SQL generation', status: 'Remaining' },
      { id: 'ai-7', name: 'Building an Autonomous BI Assistant Agent', status: 'Remaining' },
    ],
  },
];
