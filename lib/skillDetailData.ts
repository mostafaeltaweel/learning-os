/**
 * skillDetailData.ts
 * Deep, battle-tested curriculum data grounded in real textbooks:
 * - introductory-statistics-2e_-_WEB.pdf
 * - introduction-to-data-analysis-handbook-migrant--seasonal-head-start.pdf
 * - AI Engineering.pdf
 * - TL-3876 Talkora Assessment & Error Notes
 * - Google Data Analytics Transcript
 * 
 * Provides:
 * - Structure & Fundamentals (First Principles)
 * - Daily Task Breakdown & Daily Coverage
 * - Measurable Final Portfolio Result
 * - Verified Working Links
 */

export interface SkillDayTask {
  dayNumber: number;
  dayTitle: string;
  dailyCoverage: string;
  theoreticalReference: string;
  practicalDeliverable: string;
  estimatedHours: number;
}

export interface DetailedSkill {
  id: string;
  month: number;
  title: string;
  category: 'English' | 'SQL' | 'Power BI' | 'Excel' | 'Statistics' | 'Data Analysis' | 'Python' | 'Machine Learning' | 'AI Engineering' | 'Deep Learning' | 'n8n Automation';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  targetRole: string;
  bookReference: {
    bookTitle: string;
    localFileName?: string;
    relevantChapters: string;
  };
  coreFundamentals: string[];
  dailyTasks: SkillDayTask[];
  finalMilestoneOutcome: {
    portfolioTitle: string;
    deliverableSummary: string;
    businessImpact: string;
  };
  verifiedResources: {
    name: string;
    url: string;
    isLocal: boolean;
    type: string;
  }[];
}

export const detailedSkillsData: DetailedSkill[] = [
  // MONTH 1: Foundations
  {
    id: 'skill-m1-sql',
    month: 1,
    title: 'Relational Database Design & ANSI SQL Mastery',
    category: 'SQL',
    level: 'Intermediate',
    targetRole: 'Junior BI & Data Analyst',
    bookReference: {
      bookTitle: 'PostgreSQL Relational Storage & ANSI SQL Reference',
      relevantChapters: 'Chapters 2, 5 & 7 (DDL, Constraints & Table Relationships)',
    },
    coreFundamentals: [
      'Relational Integrity: Primary Keys (PK) vs Foreign Keys (FK), NOT NULL, and UNIQUE constraints guarantee data hygiene.',
      'Database Normalization: First Normal Form (1NF: atomicity), Second Normal Form (2NF: no partial key dependencies), and Third Normal Form (3NF: no transitive dependencies).',
      'Table Cardinality: Designing clean 1-to-Many relationships and Many-to-Many junction tables to eliminate data redundancy and update anomalies.',
    ],
    dailyTasks: [
      {
        dayNumber: 1,
        dayTitle: 'Relational Schema DDL & Constraints',
        dailyCoverage: 'Creating normalized tables with UUID/SERIAL primary keys, foreign key references, and CHECK constraints (e.g. price > 0).',
        theoreticalReference: 'PostgreSQL Documentation Ch. 5 (Data Definition)',
        practicalDeliverable: 'Create DDL script for Customers, Orders, Products, and OrderItems tables.',
        estimatedHours: 3,
      },
      {
        dayNumber: 2,
        dayTitle: 'Data Ingestion & Integrity Validation',
        dailyCoverage: 'Bulk data loading using COPY / INSERT statements; handling NULL values; validating referential constraints on orphan child records.',
        theoreticalReference: 'PostgreSQL Documentation Ch. 6 (Data Manipulation)',
        practicalDeliverable: 'Ingest 15,000 retail records with zero constraint violations.',
        estimatedHours: 3,
      },
      {
        dayNumber: 3,
        dayTitle: 'Multi-Table JOINs Matrix',
        dailyCoverage: 'Deep understanding of INNER JOIN, LEFT JOIN (preserving all left rows), RIGHT JOIN, and FULL OUTER JOIN with WHERE filtering.',
        theoreticalReference: 'DataLemur SQL Master Reference & PostgreSQL Ch. 7',
        practicalDeliverable: 'Solve 3 real business queries: Inactive customers, top revenue categories, and unfulfilled shipments.',
        estimatedHours: 3,
      },
      {
        dayNumber: 4,
        dayTitle: 'Aggregations & Grouping Matrix',
        dailyCoverage: 'GROUP BY multi-column grouping, HAVING vs WHERE filters, COUNT(DISTINCT), and handling NULLs in SUM() and AVG().',
        theoreticalReference: 'ANSI SQL Standard Aggregate Mechanics',
        practicalDeliverable: 'Calculate Monthly Revenue, Average Order Value (AOV), and Customer Lifetime Value (LTV) groupings.',
        estimatedHours: 3,
      },
      {
        dayNumber: 5,
        dayTitle: 'Common Table Expressions (CTEs) & Subqueries',
        dailyCoverage: 'Writing modular SQL using WITH cte_name AS (...) blocks to avoid complex unreadable nested subqueries.',
        theoreticalReference: 'PostgreSQL Ch. 7.8 (WITH Queries / Common Table Expressions)',
        practicalDeliverable: 'Write readable multi-tier CTE identifying top 10% customers and their preferred product subcategories.',
        estimatedHours: 3,
      },
      {
        dayNumber: 6,
        dayTitle: 'Indexing & EXPLAIN ANALYZE Optimization',
        dailyCoverage: 'B-Tree indexes, composite indexes, and understanding query execution plans (Sequential Scan vs Index Scan).',
        theoreticalReference: 'PostgreSQL Ch. 11 (Indexes & Query Optimizer)',
        practicalDeliverable: 'Benchmark query performance before and after indexing foreign keys, reducing execution time by 80%.',
        estimatedHours: 3,
      },
    ],
    finalMilestoneOutcome: {
      portfolioTitle: 'Production-Grade E-Commerce Relational SQL Warehouse',
      deliverableSummary: 'Full 3NF PostgreSQL database schema, data ingestion pipeline, and 10 analytical business queries.',
      businessImpact: 'Identified $42,000 in uncollected recurring subscriptions and optimized inventory restocking alerts.',
    },
    verifiedResources: [
      { name: 'PostgreSQL Official Docs', url: 'https://www.postgresql.org/docs/', isLocal: false, type: 'Official Documentation' },
      { name: 'DataLemur SQL Platform', url: 'https://datalemur.com/', isLocal: false, type: 'Interactive Practice' },
    ],
  },

  {
    id: 'skill-m1-stats',
    month: 1,
    title: 'Descriptive Analytics & Spread (OpenStax Statistics 2e)',
    category: 'Statistics',
    level: 'Intermediate',
    targetRole: 'Data / BI Analyst',
    bookReference: {
      bookTitle: 'Introductory Statistics 2e (OpenStax Official College Edition)',
      localFileName: 'introductory-statistics-2e_-_WEB.pdf',
      relevantChapters: 'Chapters 1 & 2 (Sampling, Descriptive Statistics, Measures of Center & Spread)',
    },
    coreFundamentals: [
      'Data Types & Scales: Nominal, Ordinal, Interval, and Ratio scales. Knowing whether mean or median is mathematically valid.',
      'Measures of Central Tendency: When to use Mean (symmetric data) vs Median (skewed financial distributions) vs Mode (categorical peaks).',
      'Measures of Dispersion: Variance, Standard Deviation, and Interquartile Range (IQR = Q3 - Q1). Detecting outliers with 1.5 * IQR.',
      'Distribution Shapes: Symmetrical, Right-skewed (Mean > Median), Left-skewed (Mean < Median), and Kurtosis (tail heaviness).',
    ],
    dailyTasks: [
      {
        dayNumber: 1,
        dayTitle: 'Sampling & Data Collection Methods',
        dailyCoverage: 'Simple Random Sampling, Stratified, Cluster, and Systematic sampling. Mitigating selection and survivor bias.',
        theoreticalReference: 'OpenStax Statistics 2e (Chapter 1, Pages 11-48)',
        practicalDeliverable: 'Design unbiased sampling framework for customer satisfaction survey.',
        estimatedHours: 2.5,
      },
      {
        dayNumber: 2,
        dayTitle: 'Frequency Distributions & Visual Displays',
        dailyCoverage: 'Histograms, Box Plots, and Stem-and-Leaf displays. Bin sizing rules (Sturges’ rule).',
        theoreticalReference: 'OpenStax Statistics 2e (Chapter 2, Pages 60-85)',
        practicalDeliverable: 'Generate frequency histogram and identify multi-modal peaks in order transaction values.',
        estimatedHours: 2.5,
      },
      {
        dayNumber: 3,
        dayTitle: 'Measures of Central Tendency in Practice',
        dailyCoverage: 'Calculating Mean, Trimmed Mean, Median, and Mode. Evaluating skewness impact on business reporting.',
        theoreticalReference: 'OpenStax Statistics 2e (Chapter 2, Pages 86-105)',
        practicalDeliverable: 'Demonstrate why executive team was misled by average ticket size instead of median ticket size.',
        estimatedHours: 2.5,
      },
      {
        dayNumber: 4,
        dayTitle: 'Variance & Degrees of Freedom (n - 1)',
        dailyCoverage: 'Population variance (sigma^2) vs Sample variance (s^2). Why Bessel’s correction (n - 1) removes bias.',
        theoreticalReference: 'OpenStax Statistics 2e (Chapter 2, Pages 106-125)',
        practicalDeliverable: 'Compute standard deviation and coefficient of variation (CV) for product delivery lead times.',
        estimatedHours: 2.5,
      },
      {
        dayNumber: 5,
        dayTitle: 'Outlier Detection with Boxplots & IQR Rule',
        dailyCoverage: 'Five-number summary (Min, Q1, Median, Q3, Max) and calculating outlier fences: Q1 - 1.5*IQR and Q3 + 1.5*IQR.',
        theoreticalReference: 'OpenStax Statistics 2e (Chapter 2, Pages 126-145)',
        practicalDeliverable: 'Detect and isolate fraudulent credit card transaction spikes in a 10,000-row dataset.',
        estimatedHours: 2.5,
      },
      {
        dayNumber: 6,
        dayTitle: 'Empirical Rule (Chebyshev vs Normal)',
        dailyCoverage: 'The 68-95-99.7% rule for bell-shaped distributions vs Chebyshev’s Inequality for arbitrary distributions.',
        theoreticalReference: 'OpenStax Statistics 2e (Chapter 2, Pages 146-160)',
        practicalDeliverable: 'Draft an executive statistical briefing explaining standard deviation thresholds for server uptime.',
        estimatedHours: 2.5,
      },
    ],
    finalMilestoneOutcome: {
      portfolioTitle: 'Retail Sales Spread & Variance Distribution Analysis',
      deliverableSummary: 'Statistical distribution audit of 50,000 transactions detecting seasonal skewness and delivery latency anomalies.',
      businessImpact: 'Uncovered that 80% of shipping delays originated from top 5% high-variance fulfillment hubs.',
    },
    verifiedResources: [
      { name: 'OpenStax Statistics 2e PDF', url: 'introductory-statistics-2e_-_WEB.pdf', isLocal: true, type: 'Local Textbook' },
      { name: 'OpenStax Web Platform', url: 'https://openstax.org/details/books/introductory-statistics', isLocal: false, type: 'Open Access Platform' },
    ],
  },

  {
    id: 'skill-m1-handbook',
    month: 1,
    title: 'The 7-Phase Data Process (Head Start Analysis Handbook)',
    category: 'Data Analysis',
    level: 'Intermediate',
    targetRole: 'Data / BI Analyst',
    bookReference: {
      bookTitle: 'Introduction to Data Analysis Handbook (Migrant & Seasonal Head Start)',
      localFileName: 'introduction-to-data-analysis-handbook-migrant--seasonal-head-start.pdf',
      relevantChapters: 'Complete Handbook (112 Pages) covering the 7-step analysis loop',
    },
    coreFundamentals: [
      'The 7 Analysis Phases: 1. Purpose -> 2. Questions -> 3. Collection -> 4. Analysis -> 5. Interpretation -> 6. Reporting -> 7. Evaluation.',
      'Qualitative vs Quantitative Balance: Numbers provide the "what", but stakeholder interviews and operational notes provide the "why".',
      'Data Integrity Protocols: Cleansing missing, duplicate, and corrupted records before drawing conclusions.',
      'Action-Oriented Reporting: Every chart and metric must answer: "What operational action should management take today?".',
    ],
    dailyTasks: [
      {
        dayNumber: 1,
        dayTitle: 'Step 1: Clarifying Purpose & Defining Stakeholder Needs',
        dailyCoverage: 'Differentiating between compliance monitoring, diagnostic problem-solving, and outcome evaluation.',
        theoreticalReference: 'Head Start Handbook (Pages 1-14)',
        practicalDeliverable: 'Author Project Charter document outlining stakeholders, decision criteria, and success metrics.',
        estimatedHours: 2.5,
      },
      {
        dayNumber: 2,
        dayTitle: 'Step 2: Formulating Sharp, Measurable Research Questions',
        dailyCoverage: 'Transforming vague management concerns ("Why are registrations down?") into testable quantitative hypotheses.',
        theoreticalReference: 'Head Start Handbook (Pages 15-28)',
        practicalDeliverable: 'Write 4 research questions with specific indicators, denominators, and thresholds.',
        estimatedHours: 2.5,
      },
      {
        dayNumber: 3,
        dayTitle: 'Step 3: Data Collection Planning & Sampling Strategy',
        dailyCoverage: 'Structuring survey instruments, database extracts, and ensuring statistical representative sample sizes.',
        theoreticalReference: 'Head Start Handbook (Pages 29-50)',
        practicalDeliverable: 'Design data collection protocol matrix with frequency, responsible owners, and validation rules.',
        estimatedHours: 2.5,
      },
      {
        dayNumber: 4,
        dayTitle: 'Step 4: Data Analysis & Cross-Tabulation',
        dailyCoverage: 'Running multi-variable cross-tabulations in Excel/SQL to reveal hidden subgroup disparities.',
        theoreticalReference: 'Head Start Handbook (Pages 51-74)',
        practicalDeliverable: 'Generate cross-tabulation table analyzing attendance rates across program centers and age cohorts.',
        estimatedHours: 2.5,
      },
      {
        dayNumber: 5,
        dayTitle: 'Step 5: Interpretation & Contextualization',
        dailyCoverage: 'Comparing findings against historical trends, state averages, and target baselines.',
        theoreticalReference: 'Head Start Handbook (Pages 75-88)',
        practicalDeliverable: 'Draft interpretation memo highlighting root causes for center performance variance.',
        estimatedHours: 2.5,
      },
      {
        dayNumber: 6,
        dayTitle: 'Step 6 & 7: Visual Reporting & Program Action',
        dailyCoverage: 'Creating clear executive charts and an Action Matrix assigning specific remedies to underperforming programs.',
        theoreticalReference: 'Head Start Handbook (Pages 89-112)',
        practicalDeliverable: 'Deliver a 3-page executive presentation with visual recommendations and an accountability roadmap.',
        estimatedHours: 2.5,
      },
    ],
    finalMilestoneOutcome: {
      portfolioTitle: 'Head Start Program Information Report (PIR) Analysis Suite',
      deliverableSummary: 'End-to-end analytical report examining health services and attendance metrics for 12 regional centers.',
      businessImpact: 'Pinpointed 3 centers with critical transportation barriers, leading to 22% improvement in child attendance.',
    },
    verifiedResources: [
      { name: 'Head Start Data Analysis Handbook PDF', url: 'introduction-to-data-analysis-handbook-migrant--seasonal-head-start.pdf', isLocal: true, type: 'Local Handbook' },
    ],
  },

  {
    id: 'skill-m1-eng',
    month: 1,
    title: 'Talkora A1+ Diagnostic Repair & Oral Fluency',
    category: 'English',
    level: 'Intermediate',
    targetRole: 'Bilingual Data Analyst',
    bookReference: {
      bookTitle: 'Talkora Official Trial Assessment & Diagnostic Error Notes',
      localFileName: 'TL-3876 - Mostafa Mohamed (Assessment\'s Notes) .pdf',
      relevantChapters: '6 Target Error Categories: Verbs, Agreement, Plurals, Prepositions, Word forms, TH & P/B sounds',
    },
    coreFundamentals: [
      'Diagnostic Baseline: Current scores (Fluency 35%, Pronunciation 32%, Grammar 32%, Vocab 32%, Comprehension 35%). Target: 65% across all competencies.',
      'Verb Tense Consistency: Overcoming the habit of mixing past and present (e.g. "I work on this last year" -> "I worked on this last year").',
      'Subject-Verb Agreement: Automating third-person singular "-s" ("the query returns", "the dashboard visualizes").',
      'Acoustic Articulation: Physical tongue placement for dental fricative /θ/ ("think") and explosive bilabial /p/ vs voiced /b/.',
    ],
    dailyTasks: [
      {
        dayNumber: 1,
        dayTitle: 'Listening & Shadowing Rhythm (VOA Learning English)',
        dailyCoverage: 'Active listening without text, followed by simultaneous shadowing at 2/3 speed to internalize native sentence stress.',
        theoreticalReference: 'Talkora Video Practice Plan & VOA Audio',
        practicalDeliverable: 'Record 2-minute shadowing session and compare pauses with native speaker audio.',
        estimatedHours: 1.5,
      },
      {
        dayNumber: 2,
        dayTitle: 'Past Tense Consistency Drills (Describing Past Work)',
        dailyCoverage: 'Forming regular and irregular past simple verbs; describing past ERP support tickets and database fixes without slipping into present tense.',
        theoreticalReference: 'Talkora Error Note #1 & ZAmericanEnglish Past Simple',
        practicalDeliverable: 'Speak 5 sentences describing a technical problem you resolved last month using: investigated, discovered, updated, deployed, achieved.',
        estimatedHours: 1.5,
      },
      {
        dayNumber: 3,
        dayTitle: 'Subject-Verb Agreement & Plural Inflections',
        dailyCoverage: 'Drilling third-person "-s" on singular entities (system, table, query) and plural nouns (data points, columns, records).',
        theoreticalReference: 'Talkora Error Note #2 & British Council A2 Grammar',
        practicalDeliverable: 'Complete British Council agreement quiz with 100% score; speak 5 sentences about database processes.',
        estimatedHours: 1.5,
      },
      {
        dayNumber: 4,
        dayTitle: 'Pronunciation Lab: /θ/ vs /s/ and /p/ vs /b/',
        dailyCoverage: 'Youglish contextual drills on words frequently mispronounced: "three", "think", "method", "Power BI", "pipeline".',
        theoreticalReference: 'Talkora Error Note #6 & Youglish Search Engine',
        practicalDeliverable: 'Record voice practicing 10 technical sentences without substituting /b/ for /p/ or /s/ for /θ/.',
        estimatedHours: 1.5,
      },
      {
        dayNumber: 5,
        dayTitle: 'Technical Prepositions & Word Families',
        dailyCoverage: 'Prepositions in context (at the center, in the database, on the dashboard, by 15%) and word forms (Analyze / Analysis / Analytical).',
        theoreticalReference: 'Talkora Error Note #4 & #5',
        practicalDeliverable: 'Write and speak 3 short descriptions of an analytics dashboard using accurate prepositions.',
        estimatedHours: 1.5,
      },
      {
        dayNumber: 6,
        dayTitle: 'Weekly 1-Minute Spontaneous Voice Journal',
        dailyCoverage: 'Unscripted 60-second speech answering: "What did I learn in statistics and SQL this week?". Self-scoring against Talkora rubric.',
        theoreticalReference: 'Talkora Evaluation Rubric (Fluency, Grammar, Vocab, Pronunciation)',
        practicalDeliverable: 'Save 1-minute audio recording in practice log with self-reflection notes on fluency.',
        estimatedHours: 1.5,
      },
    ],
    finalMilestoneOutcome: {
      portfolioTitle: 'Fluent Technical Presentation & Video Walkthrough',
      deliverableSummary: '2-minute clear, professional video walkthrough of the Month 1 E-Commerce SQL project in English.',
      businessImpact: 'Overcame hesitation, demonstrating to hiring managers readiness for client-facing technical discussions.',
    },
    verifiedResources: [
      { name: 'Talkora Assessment Report PDF', url: 'TL-3876 - Mostafa Mohamed (Assessment\'s Notes) .pdf', isLocal: true, type: 'Diagnostic Report' },
      { name: 'Talkora Video Practice Plan', url: 'Talkora Practice Plan - Video.mp4', isLocal: true, type: 'Video Walkthrough' },
      { name: 'Youglish Pronunciation Engine', url: 'https://youglish.com/', isLocal: false, type: 'Interactive Tool' },
    ],
  },

  // MONTH 2: Power BI & Advanced DAX
  {
    id: 'skill-m2-pbi',
    month: 2,
    title: 'Enterprise Power BI & Star Schema Modeling',
    category: 'Power BI',
    level: 'Expert',
    targetRole: 'Power BI / BI Specialist',
    bookReference: {
      bookTitle: 'The Definitive Guide to DAX (Alberto Ferrari & Marco Russo - SQLBI)',
      relevantChapters: 'Chapters 4, 5, 8 & 9 (Context Transition, CALCULATE, and Time Intelligence)',
    },
    coreFundamentals: [
      'Evaluation Context: Row Context (iterating row by row) vs Filter Context (filters applied to the entire data model).',
      'Context Transition: How CALCULATE transforms Row Context into an equivalent Filter Context, enabling dynamic aggregations.',
      'Star Schema Rules: 1-to-many relationships pointing from Fact to Dimension. Strict avoidance of bidirectional filtering and circular dependencies.',
      'Time Intelligence Architecture: Creating a contiguous, unbroken Date Dimension table marked as Date Table.',
    ],
    dailyTasks: [
      {
        dayNumber: 1,
        dayTitle: 'Star Schema Architecture vs Snowflake Traps',
        dailyCoverage: 'Designing single-direction 1:* relationships, avoiding bidirectional cross-filtering traps, role-playing date dimensions.',
        theoreticalReference: 'SQLBI Star Schema Guidelines & Alberto Ferrari Ch. 3',
        practicalDeliverable: 'Construct Star Schema model with 1 Fact table (Sales) and 4 Dimension tables (Date, Customer, Product, Store).',
        estimatedHours: 3.5,
      },
      {
        dayNumber: 2,
        dayTitle: 'DAX CALCULATE() & Filter Context Modification',
        dailyCoverage: 'CALCULATE filter override, ALL(), ALLEXCEPT(), and KEEPFILTERS() to compute market shares and ratios.',
        theoreticalReference: 'The Definitive Guide to DAX Ch. 5',
        practicalDeliverable: 'Author [Sales Contribution %] and [All Region Sales] measures with zero context leaks.',
        estimatedHours: 3.5,
      },
      {
        dayNumber: 3,
        dayTitle: 'Context Transition & Iterator Functions',
        dailyCoverage: 'SUMX, AVERAGEX, and COUNTX mechanics. How CALCULATE inside an iterator forces context transition.',
        theoreticalReference: 'The Definitive Guide to DAX Ch. 4',
        practicalDeliverable: 'Write measure calculating average daily sales per active store using SUMX and VALUES(DimDate[Date]).',
        estimatedHours: 3.5,
      },
      {
        dayNumber: 4,
        dayTitle: 'Time Intelligence: YTD, QTD, and ParallelPeriod',
        dailyCoverage: 'TOTALYTD, SAMEPERIODLASTYEAR, DATESINPERIOD, and building custom rolling 12-month metrics.',
        theoreticalReference: 'Microsoft Learn DAX Patterns: Time Intelligence',
        practicalDeliverable: 'Build comprehensive [YoY Sales Growth %] measure handling leap years and prior-year blanks.',
        estimatedHours: 3.5,
      },
      {
        dayNumber: 5,
        dayTitle: 'DAX Performance Tuning & VertiPaq Compression',
        dailyCoverage: 'Cardinally reduction, removing high-cardinality timestamps, and analyzing query plans with DAX Studio.',
        theoreticalReference: 'SQLBI Optimizing DAX & VertiPaq Engine Mechanics',
        practicalDeliverable: 'Optimize report data model, reducing memory footprint by 45% and query execution time under 100ms.',
        estimatedHours: 3.5,
      },
      {
        dayNumber: 6,
        dayTitle: 'Fluent Dark Blue Executive Storytelling Suite',
        dailyCoverage: 'Applying visual hierarchy, Z-pattern layout, drill-through pages, bookmarks, and mobile layout design.',
        theoreticalReference: 'Microsoft Power BI Guided Storytelling & Fluent UI Kit',
        practicalDeliverable: 'Complete 5-page Executive C-Suite Dashboard with KPI cards, trend line charts, and breakdown decomposition trees.',
        estimatedHours: 3.5,
      },
    ],
    finalMilestoneOutcome: {
      portfolioTitle: 'Executive Financial & Sales Performance BI Suite',
      deliverableSummary: 'Production 5-page interactive Power BI storytelling suite connected to PostgreSQL with custom DAX library.',
      businessImpact: 'Identified top 20% high-margin product cohorts contributing to 72% of EBITDA, enabling targeted margin expansion.',
    },
    verifiedResources: [
      { name: 'SQLBI Official Portal', url: 'https://www.sqlbi.com/', isLocal: false, type: 'Industry Standard Docs' },
      { name: 'Microsoft Power BI Learn', url: 'https://learn.microsoft.com/power-bi/', isLocal: false, type: 'Official Documentation' },
    ],
  },

  // MONTH 3: Python & Statistical Inference
  {
    id: 'skill-m3-py',
    month: 3,
    title: 'Python for Data Analysis (Pandas & Polars)',
    category: 'Python',
    level: 'Advanced',
    targetRole: 'Data Analyst / Analytics Engineer',
    bookReference: {
      bookTitle: 'Python for Data Analysis (Wes McKinney - Creator of Pandas)',
      relevantChapters: 'Chapters 5, 7, 8, 9 & 10 (Data Wrangling, Aggregation & Time Series)',
    },
    coreFundamentals: [
      'Vectorization vs Iteration: Eliminating Python `for` loops in favor of SIMD-accelerated NumPy C-extensions for 100x speedup.',
      'Index Mechanics: Understanding hierarchical multi-indexing, index alignment, and zero-copy slicing.',
      'Polars LazyFrame: Expressing transformations as query execution plans, enabling predicate pushdown and parallel thread execution.',
      'Exploratory Data Analysis (EDA): Quantifying missingness, distribution skew, correlation matrices, and multivariate interactions.',
    ],
    dailyTasks: [
      {
        dayNumber: 1,
        dayTitle: 'Vectorized Filtering & Cleaning with Pandas',
        dailyCoverage: 'Boolean indexing, .loc[] vs .iloc[], string methods (.str.replace, .str.extract), and date parsing.',
        theoreticalReference: 'Wes McKinney Ch. 5 & 7',
        practicalDeliverable: 'Clean messy 50,000-row CRM export: standardize phone numbers, impute missing cities, coerce timestamps.',
        estimatedHours: 3.5,
      },
      {
        dayNumber: 2,
        dayTitle: 'Groupby Aggregations & Split-Apply-Combine',
        dailyCoverage: 'Multi-column groupby, .agg() with custom lambda functions, transform() for normalization, and window-like rank calculations.',
        theoreticalReference: 'Wes McKinney Ch. 10 (Data Aggregation and Group Operations)',
        practicalDeliverable: 'Compute customer cohort retention and average days between consecutive purchases.',
        estimatedHours: 3.5,
      },
      {
        dayNumber: 3,
        dayTitle: 'Polars High-Speed Engine & LazyFrames',
        dailyCoverage: 'Constructing pl.LazyFrame pipelines, .filter(), .with_columns(), and executing streaming collections on large CSVs.',
        theoreticalReference: 'Polars Official Python User Guide',
        practicalDeliverable: 'Process a 2GB transaction file in 1.4 seconds with zero out-of-memory errors.',
        estimatedHours: 3.5,
      },
      {
        dayNumber: 4,
        dayTitle: 'Statistical Inference with Scipy Stats',
        dailyCoverage: 'Computing two-sample Student t-tests, Mann-Whitney U tests, and Chi-Square tests of independence.',
        theoreticalReference: 'OpenStax Statistics 2e Ch. 9 & 10 + Scipy Documentation',
        practicalDeliverable: 'Test whether a marketing promotion caused a statistically significant increase in order value (p < 0.05).',
        estimatedHours: 3.5,
      },
      {
        dayNumber: 5,
        dayTitle: 'Automated EDA & Visualization with Seaborn & Plotly',
        dailyCoverage: 'Generating correlation heatmaps, pairplots, boxenplots, and interactive Plotly scatterplots with marginal distributions.',
        theoreticalReference: 'Wes McKinney Ch. 9 (Plotting and Visualization)',
        practicalDeliverable: 'Build automated EDA script outputting an HTML dashboard summarizing 25 dataset dimensions.',
        estimatedHours: 3.5,
      },
      {
        dayNumber: 6,
        dayTitle: 'Customer Churn Machine Learning Feature Engineering',
        dailyCoverage: 'Recency, Frequency, Monetary (RFM) segmentation, one-hot encoding, feature scaling (StandardScaler), and train/test split.',
        theoreticalReference: 'Hands-On Machine Learning with Scikit-Learn Ch. 2',
        practicalDeliverable: 'Deliver clean ML-ready feature store table ready for predictive churn modeling.',
        estimatedHours: 3.5,
      },
    ],
    finalMilestoneOutcome: {
      portfolioTitle: 'Customer Churn & Cohort Retention Machine Learning EDA',
      deliverableSummary: 'Production Jupyter Notebook & Executive Slide Deck analyzing 50,000 subscription customer profiles.',
      businessImpact: 'Isolated 3 critical churn predictors and designed targeted retention workflows projected to save $65,000 ARR.',
    },
    verifiedResources: [
      { name: 'Python for Data Analysis (Wes McKinney)', url: 'https://wesmckinney.com/book/', isLocal: false, type: 'Open Access Textbook' },
      { name: 'Polars Documentation', url: 'https://docs.pola.rs/', isLocal: false, type: 'Official Documentation' },
    ],
  },

  // MONTH 5: AI Engineering & Modern RAG
  {
    id: 'skill-m5-rag',
    month: 5,
    title: 'Modern RAG & Agentic AI Systems',
    category: 'AI Engineering',
    level: 'Expert',
    targetRole: 'AI / BI Solutions Architect',
    bookReference: {
      bookTitle: 'AI Engineering: Building Applications with Foundation Models',
      localFileName: 'AI Engineering.pdf',
      relevantChapters: 'Chapters 2, 3, 5 & 8 (Prompt Engineering, RAG Pipelines, Vector DBs & Evaluations)',
    },
    coreFundamentals: [
      'In-Context Learning vs Fine-Tuning: Deciding when prompt augmentation is sufficient versus when fine-tuning is required.',
      'Vector Embedding Geometry: High-dimensional dense vectors, cosine distance, HNSW indexing, and chunking strategy trade-offs.',
      'Text-to-SQL Mechanics: System prompt grounding with database schema injection, syntax validation, and automated error-correction loops.',
      'Ragas Evaluation Framework: Quantitative evaluation of Faithfulness, Answer Relevance, Context Precision, and Context Recall.',
    ],
    dailyTasks: [
      {
        dayNumber: 1,
        dayTitle: 'Prompt Systems & Structured Output Enforcement',
        dailyCoverage: 'Few-shot prompting, Chain-of-Thought (CoT), system prompt constraints, and enforcing Pydantic / JSON schema guarantees.',
        theoreticalReference: 'AI Engineering.pdf Ch. 2 & 3',
        practicalDeliverable: 'Build structured parser converting unstructured customer support tickets into validated JSON.',
        estimatedHours: 4,
      },
      {
        dayNumber: 2,
        dayTitle: 'Semantic Chunking & Vector Store Pipeline',
        dailyCoverage: 'Semantic chunking vs recursive character splitting, generating dense embeddings with text-embedding-3-large, and indexing in Qdrant/Chroma.',
        theoreticalReference: 'AI Engineering.pdf Ch. 5 (Retrieval-Augmented Generation)',
        practicalDeliverable: 'Ingest 50 PDF financial annual reports into vector database with metadata filtering by fiscal year.',
        estimatedHours: 4,
      },
      {
        dayNumber: 3,
        dayTitle: 'Hybrid Search: Dense Vectors + BM25 Lexical Keyword Search',
        dailyCoverage: 'Reciprocal Rank Fusion (RRF) to combine keyword precision (exact part numbers) with semantic nuance.',
        theoreticalReference: 'LangChain & Qdrant Advanced Retrieval Guides',
        practicalDeliverable: 'Build hybrid retrieval pipeline that answers queries with 25% higher precision than pure vector search.',
        estimatedHours: 4,
      },
      {
        dayNumber: 4,
        dayTitle: 'Text-to-SQL Agent with Self-Correction Loop',
        dailyCoverage: 'Extracting user intent, injecting DDL schemas, generating ANSI SQL, catching syntax errors in sandbox, and self-correcting query.',
        theoreticalReference: 'LangGraph Multi-Agent Workflows & AI Engineering Ch. 6',
        practicalDeliverable: 'Deploy LangGraph agent that translates plain English ("Show top 5 sales reps in Texas") into safe, executable SQL.',
        estimatedHours: 4,
      },
      {
        dayNumber: 5,
        dayTitle: 'RAG Evaluation Harness (Ragas Framework)',
        dailyCoverage: 'Benchmarking RAG pipelines with synthetic question-answer pairs; computing Faithfulness and Context Recall metrics.',
        theoreticalReference: 'AI Engineering.pdf Ch. 8 (Evaluation of LLM Systems)',
        practicalDeliverable: 'Run automated evaluation pipeline demonstrating 92% Faithfulness and zero hallucinated numbers.',
        estimatedHours: 4,
      },
      {
        dayNumber: 6,
        dayTitle: 'Production Deployment & Rate Limit Handling',
        dailyCoverage: 'Asynchronous streaming responses, exponential backoff retries, prompt caching, and cost-per-query tracking.',
        theoreticalReference: 'AI Engineering.pdf Ch. 9 (Production MLOps)',
        practicalDeliverable: 'Deploy FastAPI endpoint serving RAG agent with sub-second time-to-first-token (TTFT).',
        estimatedHours: 4,
      },
    ],
    finalMilestoneOutcome: {
      portfolioTitle: 'Autonomous SQL & Document RAG Agent for Business Intelligence',
      deliverableSummary: 'Production multi-agent pipeline allowing non-technical executives to query 10 years of database records and PDF reports in natural English.',
      businessImpact: 'Reduced ad-hoc SQL report requests from business teams by 60%, delivering answers in 3 seconds instead of 4 hours.',
    },
    verifiedResources: [
      { name: 'AI Engineering PDF', url: 'AI Engineering.pdf', isLocal: true, type: 'Local Master Reference' },
      { name: 'LangChain Documentation', url: 'https://python.langchain.com/', isLocal: false, type: 'Framework Docs' },
      { name: 'LangGraph Multi-Agent Guide', url: 'https://langchain-ai.github.io/langgraph/', isLocal: false, type: 'Agent Architecture' },
    ],
  },

  // MONTH 6: Automation & Multi-Modal Workflows
  {
    id: 'skill-m6-n8n',
    month: 6,
    title: 'Enterprise Workflow Automation with n8n',
    category: 'n8n Automation',
    level: 'Expert',
    targetRole: 'Senior Data & AI Systems Specialist',
    bookReference: {
      bookTitle: 'n8n Workflow Automation Architecture & Self-Hosted Orchestration',
      relevantChapters: 'Webhooks, Node Data Routing, Function Transformation & AI Sub-Nodes',
    },
    coreFundamentals: [
      'Event-Driven Architecture: Trigger nodes (Webhooks, Cron Schedules, Database CDC / Listeners) vs polling.',
      'Data Transformation Mechanics: Processing multi-item arrays in JavaScript/Python code nodes without memory bloat.',
      'Idempotency & Failure Recovery: Handling retries, error workflows, and guaranteed delivery for business-critical pipelines.',
      'AI Node Integration: Embedding LLM nodes directly into automated operational chains to synthesize unstructured data.',
    ],
    dailyTasks: [
      {
        dayNumber: 1,
        dayTitle: 'n8n Setup, Webhook Triggers & Payload Extraction',
        dailyCoverage: 'Configuring webhook endpoints, authenticating with HMAC/Bearer tokens, and parsing complex nested JSON payloads.',
        theoreticalReference: 'n8n Official Documentation: Webhook Nodes',
        practicalDeliverable: 'Build webhook pipeline that receives incoming order events from web forms and verifies signatures.',
        estimatedHours: 3.5,
      },
      {
        dayNumber: 2,
        dayTitle: 'Automated Database ETL (PostgreSQL / Supabase)',
        dailyCoverage: 'Upserting data into relational tables, batch insertions, transaction rollback handling, and schema mapping.',
        theoreticalReference: 'n8n Postgres Node & Database Best Practices',
        practicalDeliverable: 'Automate daily ingestion of 5 partner CSV feeds into normalized PostgreSQL tables without manual intervention.',
        estimatedHours: 3.5,
      },
      {
        dayNumber: 3,
        dayTitle: 'Data Transformation with JavaScript / Python Code Nodes',
        dailyCoverage: 'Filtering arrays, regex data extraction, date format conversions, and calculating rolling metrics in memory.',
        theoreticalReference: 'n8n Code Node Execution Guide',
        practicalDeliverable: 'Write code node that cleans messy customer address fields and deduplicates records by email hash.',
        estimatedHours: 3.5,
      },
      {
        dayNumber: 4,
        dayTitle: 'AI Agent Nodes: LLM Summarization of Analytics',
        dailyCoverage: 'Connecting OpenAI / Gemini nodes with Memory and Tools inside n8n to generate natural language executive briefings.',
        theoreticalReference: 'n8n Advanced AI Workflows Guide',
        practicalDeliverable: 'Configure workflow that queries SQL database for yesterday\'s sales anomalies and generates a 3-bullet CEO summary.',
        estimatedHours: 3.5,
      },
      {
        dayNumber: 5,
        dayTitle: 'Multi-Channel Stakeholder Alerting (Slack, Discord, Email)',
        dailyCoverage: 'Formatting rich Slack Block Kit messages, sending automated HTML email reports, and dispatching SMS alerts.',
        theoreticalReference: 'Slack Block Kit Builder & n8n Email/Slack Nodes',
        practicalDeliverable: 'Deploy automated daily 8:00 AM executive brief to Discord/Slack with interactive approval buttons.',
        estimatedHours: 3.5,
      },
      {
        dayNumber: 6,
        dayTitle: 'Error Workflows & Production Monitoring',
        dailyCoverage: 'Configuring "Error Trigger" workflows, alerting engineering channels on failed node executions, and audit logging.',
        theoreticalReference: 'n8n Enterprise Reliability & Error Handling',
        practicalDeliverable: 'Create centralized error-catcher flow that logs failures to database and pings support team instantly.',
        estimatedHours: 3.5,
      },
    ],
    finalMilestoneOutcome: {
      portfolioTitle: 'Enterprise Multi-Modal BI System with n8n Workflow Automation',
      deliverableSummary: '100% automated end-to-end data pipeline from raw file ingestion to SQL warehousing, AI executive summarization, and Slack briefing.',
      businessImpact: 'Saved operations team 15 hours per week of manual reporting and eliminated human data entry errors completely.',
    },
    verifiedResources: [
      { name: 'n8n Official Academy', url: 'https://academy.n8n.io/', isLocal: false, type: 'Official Training' },
      { name: 'n8n Documentation', url: 'https://docs.n8n.io/', isLocal: false, type: 'Documentation' },
    ],
  },
];
