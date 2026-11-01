'use client';

import { useState } from 'react';
import {
  BookOpen,
  Search,
  FileText,
  Video,
  ExternalLink,
  Layers,
  GraduationCap,
  Sparkles,
  Bookmark,
  Code2,
  BarChart3,
  Database,
  Cpu,
  Workflow,
  CheckCircle2,
  FileCheck,
  FolderArchive,
  ChevronRight,
  Info,
} from 'lucide-react';

interface ResourceItem {
  id: string;
  category: string;
  subCategory?: string;
  title: string;
  type: 'Local Master PDF' | 'Local Diagnostic File' | 'Local Video' | 'Local Transcript' | 'Interactive Platform' | 'Official Documentation';
  locationOrUrl: string;
  isLocal: boolean;
  fileSize?: string;
  pagesOrDuration?: string;
  description: string;
  keyTopics: string[];
  recommendedSprint?: string;
  actionNote?: string;
}

const masterResources: ResourceItem[] = [
  // Local Handbooks & Files
  {
    id: 'res-local-1',
    category: 'Data Analysis',
    subCategory: 'Local Master Handbook',
    title: 'Introduction to Data Analysis Handbook (Migrant & Seasonal Head Start)',
    type: 'Local Master PDF',
    locationOrUrl: 'introduction-to-data-analysis-handbook-migrant--seasonal-head-start.pdf',
    isLocal: true,
    fileSize: '1.1 MB',
    pagesOrDuration: '112 Pages',
    description: 'Comprehensive field handbook covering the 7 essential phases of the data analysis cycle, quantitative vs qualitative methodologies, sampling, and actionable reporting.',
    keyTopics: [
      '7-Phase Data Process (Purpose -> Questions -> Collection -> Analysis -> Interpretation -> Reporting -> Evaluation)',
      'Balancing Qualitative (interviews, observations) and Quantitative (surveys, test scores)',
      'Measures of Central Tendency & Variance (Mean, Median, Standard Deviation, Margins of Error)',
      'Practical Excel Pivot Tables, Cross-tabulations & Visual Storytelling for Stakeholders',
    ],
    recommendedSprint: 'Sprints 01-04 (Months 1 & 2)',
    actionNote: 'Use as the practical guide for defining business questions and building the Month 1 & Month 3 portfolio case studies.',
  },
  {
    id: 'res-local-2',
    category: 'Statistics',
    subCategory: 'Official College Textbook',
    title: 'Introductory Statistics 2e (OpenStax Official College Edition)',
    type: 'Local Master PDF',
    locationOrUrl: 'introductory-statistics-2e_-_WEB.pdf',
    isLocal: true,
    fileSize: '23.5 MB',
    pagesOrDuration: '13 Chapters',
    description: 'Gold-standard comprehensive textbook on inferential statistics, probability distributions, hypothesis testing, and regression analysis for data science.',
    keyTopics: [
      'Chapter 1-2: Sampling, Descriptive Statistics & Data Display',
      'Chapter 3-5: Probability Topics, Discrete & Continuous Random Variables',
      'Chapter 6-7: The Normal Distribution & The Central Limit Theorem',
      'Chapter 8-10: Confidence Intervals, Single-Sample & Two-Sample Hypothesis Testing',
      'Chapter 11-13: The Chi-Square Distribution, Linear Regression, Correlation & F-Distribution / ANOVA',
    ],
    recommendedSprint: 'Sprints 01-08 (Months 1 & 2)',
    actionNote: 'Direct source for solving daily statistics tasks: Z-Scores, p-values, Null Hypothesis, and A/B test confidence intervals.',
  },
  {
    id: 'res-local-3',
    category: 'AI Engineering',
    subCategory: 'Production Architecture Guide',
    title: 'AI Engineering: Building Applications with Foundation Models',
    type: 'Local Master PDF',
    locationOrUrl: 'AI Engineering.pdf',
    isLocal: true,
    fileSize: '5.9 MB',
    pagesOrDuration: 'Deep Reference',
    description: 'Essential guide for transitioning from basic scripts to production-grade AI applications, RAG pipelines, evaluations, and structured outputs.',
    keyTopics: [
      'Foundation Models & Prompt Engineering Systems',
      'Retrieval-Augmented Generation (RAG) Architecture & Vector Embeddings',
      'Automated Evaluation Harnesses & LLM Benchmarking',
      'Fine-Tuning vs In-Context Learning Trade-offs & Agentic Routing',
    ],
    recommendedSprint: 'Sprints 17-24 (Months 5 & 6)',
    actionNote: 'Master text for the Month 5 RAG Knowledge Agent and Month 6 Autonomous Workflow Orchestrator.',
  },
  {
    id: 'res-local-4',
    category: 'English',
    subCategory: 'Diagnostic Assessment & Notes',
    title: 'Talkora Diagnostic Assessment (Trial Session & Error Patterns Analysis)',
    type: 'Local Diagnostic File',
    locationOrUrl: 'TL-3876 - Mostafa Mohamed (Assessment\'s Notes) .pdf',
    isLocal: true,
    fileSize: '83 KB',
    pagesOrDuration: '2 Diagnostic Reports',
    description: 'Initial assessment results (A1+ baseline) diagnosing exactly what Mostafa needs to fix in fluency, grammar, vocabulary, and pronunciation.',
    keyTopics: [
      'Fluency: 35% | Pronunciation: 32% | Grammar: 32% | Vocab: 32% | Comprehension: 35%',
      'Verb Tense Consistency: Fixing past vs present mixing (e.g., "this take 6 month" -> "this took 6 months")',
      'Subject-Verb Agreement & Singular/Plural inflections (e.g., "many project" -> "many projects")',
      'Articles (a/an/the) and Preposition accuracy in technical discourse',
      'Pronunciation drills: Dental fricatives "TH" (/θ/ and /ð/) and bilabial plosives "P" vs "B"',
    ],
    recommendedSprint: 'Continuous Across All 24 Sprints',
    actionNote: 'Every daily English sprint task directly targets one of these 6 diagnosed error patterns.',
  },
  {
    id: 'res-local-5',
    category: 'English',
    subCategory: 'Audio-Visual Practice Guide',
    title: 'Talkora Practice Plan - Interactive Video Walkthrough',
    type: 'Local Video',
    locationOrUrl: 'Talkora Practice Plan - Video.mp4',
    isLocal: true,
    fileSize: '16.5 MB',
    pagesOrDuration: 'Video Walkthrough',
    description: 'Video explanation of Mostafa\'s custom 7-day practice schedule, shadowing protocol, and audio recording techniques.',
    keyTopics: [
      '7-Day Weekly Rhythm (Listening, Grammar, Review, Challenge Days)',
      'Shadowing technique for natural speech cadence and rhythm',
      'Daily 1-minute voice journal recording and feedback self-review',
    ],
    recommendedSprint: 'Continuous Daily Reference',
    actionNote: 'Watch to refresh proper shadowing pacing and speech delivery.',
  },
  {
    id: 'res-local-6',
    category: 'Google Certificate',
    subCategory: 'Full Course Transcript (Dec 2025)',
    title: 'Google Data Analytics Professional Certificate Transcript (30,000 Lines)',
    type: 'Local Transcript',
    locationOrUrl: '[English (auto-generated)] Google Data Analytics Professional Certificate Full Course (December 2025 Update) [DownSub.com].txt',
    isLocal: true,
    fileSize: '1.1 MB',
    pagesOrDuration: '8 Full Courses',
    description: 'Complete word-for-word transcript of the 8 Google Professional Certificate courses, searchable for any concept, definition, or interview explanation.',
    keyTopics: [
      'Course 1: Foundations: Data, Data, Everywhere',
      'Course 2: Ask Questions to Make Data-Driven Decisions',
      'Course 3: Prepare Data for Exploration',
      'Course 4: Process Data from Dirty to Clean',
      'Course 5: Analyze Data to Answer Questions',
      'Course 6: Share Data Through the Art of Visualization',
      'Course 7: Data Analysis with R Programming',
      'Course 8: Google Data Analytics Capstone Project',
    ],
    recommendedSprint: 'Supporting Track (Months 1-3)',
    actionNote: 'Search transcript for real-world analyst terminology and Google interview framing.',
  },

  // Technical Platforms & Documentation
  {
    id: 'res-tech-sql',
    category: 'SQL',
    subCategory: 'Querying & Warehousing',
    title: 'PostgreSQL & SQL Server Documentation + DataLemur Challenges',
    type: 'Interactive Platform',
    locationOrUrl: 'https://datalemur.com/',
    isLocal: false,
    description: 'Hands-on interactive SQL platform containing real FAANG & enterprise SQL interview questions, window functions, and indexing practice.',
    keyTopics: [
      'Window Functions: ROW_NUMBER(), RANK(), DENSE_RANK(), NTILE(), LEAD(), LAG()',
      'Common Table Expressions (CTEs), Recursive CTEs, and Subqueries',
      'Indexing Strategies: B-Tree, Hash, GIN, Covering Indexes & EXPLAIN ANALYZE',
      'Star Schema Modeling: Fact Tables, Dimension Tables & Slowly Changing Dimensions (SCD)',
    ],
    recommendedSprint: 'Sprints 01-08 (Months 1 & 2)',
    actionNote: 'Solve 2 problems daily during SQL sprints.',
  },
  {
    id: 'res-tech-pbi',
    category: 'Power BI',
    subCategory: 'BI & Storytelling',
    title: 'Microsoft Power BI Official Docs & SQLBI DAX Patterns',
    type: 'Official Documentation',
    locationOrUrl: 'https://learn.microsoft.com/power-bi/',
    isLocal: false,
    description: 'The definitive architectural guide to DAX (Data Analysis Expressions), Filter Context, Context Transition, and enterprise data modeling.',
    keyTopics: [
      'CALCULATE(), ALL(), ALLEXCEPT(), KEEPFILTERS() & Context Transition',
      'Time Intelligence: SAMEPERIODLASTYEAR, TOTALYTD, DATESINPERIOD',
      'Star Schema Design: Fact vs Dimension relationships, 1-to-many, active vs inactive',
      'Fluent Dark Blue Theme JSON & Executive Storytelling Dashboard Layouts',
    ],
    recommendedSprint: 'Sprints 05-12 (Months 2 & 3)',
    actionNote: 'Reference when authoring custom DAX measures and building Power BI templates.',
  },
  {
    id: 'res-tech-py',
    category: 'Python',
    subCategory: 'Data Wrangling & Analysis',
    title: 'Python for Data Analysis (3rd Edition - Wes McKinney) & Polars Guide',
    type: 'Official Documentation',
    locationOrUrl: 'https://wesmckinney.com/book/',
    isLocal: false,
    description: 'Open access reference by the creator of Pandas, covering data structures, cleaning, grouping, time series, and the high-speed Polars engine.',
    keyTopics: [
      'Pandas Vectorization vs. Iteration, DataFrames & Series mechanics',
      'Polars ultra-fast lazy evaluation, expressions, and memory-efficient streaming',
      'Data Cleansing: Handling nulls, outliers, string manipulation, date parsing',
      'Exploratory Data Analysis (EDA) with Seaborn & Plotly interactive charts',
    ],
    recommendedSprint: 'Sprints 09-16 (Months 3 & 4)',
    actionNote: 'Reference for building reproducible data wrangling scripts.',
  },
  {
    id: 'res-tech-n8n',
    category: 'Automation',
    subCategory: 'Workflow Automation',
    title: 'n8n Workflow Automation Engine & Community Nodes',
    type: 'Official Documentation',
    locationOrUrl: 'https://docs.n8n.io/',
    isLocal: false,
    description: 'Fair-code workflow automation tool allowing you to connect databases, APIs, LLMs, and webhooks into automated self-executing pipelines.',
    keyTopics: [
      'Trigger Nodes: Webhooks, Cron Schedules, Database polling',
      'Data Transformation: JavaScript/Python code nodes, JSON schema mapping',
      'AI Agent Nodes: Integrating OpenAI/Gemini/Anthropic with Tools and Memory',
      'Automated Reporting: Generating daily PDF summaries and Slack/Email alerts',
    ],
    recommendedSprint: 'Sprints 21-24 (Month 6)',
    actionNote: 'Core engine for the Month 6 Enterprise ETL & Automation project.',
  },
  {
    id: 'res-eng-istoria',
    category: 'English',
    subCategory: 'Language Learning App',
    title: 'Istoria App (Graded Reader Stories with Oxford 3000 Vocabulary)',
    type: 'Interactive Platform',
    locationOrUrl: 'https://istoria.app/',
    isLocal: false,
    description: 'Graded reading application designed to build reading comprehension, vocabulary recall, and sentence structures naturally through engaging narratives.',
    keyTopics: [
      'Daily 15-minute graded story reading',
      'Extracting 5-10 unknown words and recording them in the personal glossary',
      'Translating passive recognition into active speech use',
    ],
    recommendedSprint: 'Daily English Practice (Sundays, Wednesdays)',
    actionNote: 'Primary resource for Sunday and Wednesday English reading modules.',
  },
  {
    id: 'res-eng-voa',
    category: 'English',
    subCategory: 'Listening & Pronunciation',
    title: 'VOA Learning English (American English Audio at 2/3 Speed)',
    type: 'Interactive Platform',
    locationOrUrl: 'https://learningenglish.voanews.com/',
    isLocal: false,
    description: 'Clear, slower-paced American English broadcasts with word-for-word transcripts, ideal for shadowing, accent reduction, and rhythm calibration.',
    keyTopics: [
      'Listening without transcript (gist comprehension)',
      'Shadowing practice (speaking simultaneously with the speaker)',
      'Intonation, stress patterns, and clear vowel enunciations',
    ],
    recommendedSprint: 'Daily English Practice (Saturdays, Tuesdays)',
    actionNote: 'Primary resource for Saturday and Tuesday listening & shadowing sessions.',
  },
  {
    id: 'res-eng-youglish',
    category: 'English',
    subCategory: 'Pronunciation in Context',
    title: 'YouGlish (Real Native YouTube Pronunciation Search Engine)',
    type: 'Interactive Platform',
    locationOrUrl: 'https://youglish.com/',
    isLocal: false,
    description: 'Search engine that finds any English word or technical term spoken in authentic YouTube videos with contextual subtitles.',
    keyTopics: [
      'Pronouncing technical vocabulary (e.g., "hierarchy", "variance", "coefficient", "query")',
      'Distinguishing between /θ/ and /ð/ ("think" vs "this")',
      'Observing mouth movements and connected speech patterns',
    ],
    recommendedSprint: 'Continuous Daily Reference',
    actionNote: 'Use whenever encountering an unfamiliar word in statistics or SQL.',
  },
  {
    id: 'res-eng-bc',
    category: 'English',
    subCategory: 'Grammar Drills',
    title: 'British Council LearnEnglish Grammar Reference',
    type: 'Official Documentation',
    locationOrUrl: 'https://learnenglish.britishcouncil.org/grammar',
    isLocal: false,
    description: 'Structured explanations and quizzes covering English verb tenses, conditional clauses, passive voice, and prepositions.',
    keyTopics: [
      'Past Simple vs Present Perfect in technical project summaries',
      'Subject-Verb Agreement rules and irregular nouns',
      'Modal verbs for expressing certainty and recommendations (must, should, could)',
    ],
    recommendedSprint: 'Daily English Practice (Sundays, Wednesdays)',
    actionNote: 'Complete short grammar quizzes on target error areas.',
  },
  {
    id: 'res-career-dl',
    category: 'Career & Interview',
    subCategory: 'Interview Preparation',
    title: 'Ace the Data Analyst Interview & Portfolio Showcase Standards',
    type: 'Interactive Platform',
    locationOrUrl: 'https://github.com/',
    isLocal: false,
    description: 'Guidelines, templates, and rubrics for writing technical case studies, README files, and presenting analytics findings to executives.',
    keyTopics: [
      'STAR Method for Technical Behavioral Interviews (Situation, Task, Action, Result)',
      'Executive Summary framing: "So What?" and bottom-line dollar impact',
      'Structuring GitHub repositories with clean documentation and reproducible setups',
    ],
    recommendedSprint: 'Sprints 13-24 (Months 4-6)',
    actionNote: 'Use for polishing the 6 portfolio projects before recruiter review.',
  },
];

const categoryList = [
  'All',
  'Local Workbooks & Handbooks',
  'English & Talkora',
  'Data Analysis',
  'Statistics',
  'SQL',
  'Power BI',
  'Python',
  'AI Engineering',
  'Automation',
  'Google Certificate',
  'Career & Interview',
];

export default function ResourceLibraryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'catalog' | 'handbook-guide' | 'talkora-guide'>('catalog');

  const filteredResources = masterResources.filter((res) => {
    // Category match
    let matchCat = true;
    if (selectedCategory === 'Local Workbooks & Handbooks') {
      matchCat = res.isLocal;
    } else if (selectedCategory !== 'All') {
      matchCat = res.category.toLowerCase().includes(selectedCategory.toLowerCase());
    }

    // Query match
    const q = searchQuery.toLowerCase().trim();
    const matchQuery =
      !q ||
      res.title.toLowerCase().includes(q) ||
      res.description.toLowerCase().includes(q) ||
      res.category.toLowerCase().includes(q) ||
      res.keyTopics.some((t) => t.toLowerCase().includes(q));

    return matchCat && matchQuery;
  });

  const localCount = masterResources.filter((r) => r.isLocal).length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#002050] flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#0078D4]" />
            Resource Library & Knowledge Hub
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Curated textbooks, local handbooks, Talkora diagnostic reports, and technical platforms for Mostafa Mohamed
          </p>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2">
            <FolderArchive className="w-4 h-4 text-emerald-600" />
            <span>Local Master Files: <strong className="text-emerald-700 font-bold">{localCount}</strong></span>
          </div>
          <div className="text-xs text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#0078D4]" />
            <span>Total Cataloged: <strong className="text-[#002050] font-bold">{masterResources.length}</strong></span>
          </div>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 ${
            activeTab === 'catalog'
              ? 'border-[#0078D4] text-[#0078D4]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Curated Catalog ({filteredResources.length})
        </button>
        <button
          onClick={() => setActiveTab('handbook-guide')}
          className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 flex items-center gap-1.5 ${
            activeTab === 'handbook-guide'
              ? 'border-[#0078D4] text-[#0078D4]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-4 h-4 text-blue-600" />
          Data Analysis Handbook Guide (112 Pages)
        </button>
        <button
          onClick={() => setActiveTab('talkora-guide')}
          className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 flex items-center gap-1.5 ${
            activeTab === 'talkora-guide'
              ? 'border-[#0078D4] text-[#0078D4]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          Talkora Diagnostic Remediation
        </button>
      </div>

      {activeTab === 'catalog' && (
        <>
          {/* Search & Categories Bar */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search resources, topics (e.g. 'Hypothesis Testing', 'Talkora', 'DAX', 'Pivot Tables', 'RAG', 'JOINs')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0078D4] shadow-sm text-slate-800"
              />
            </div>

            {/* Category Chips */}
            <div className="flex flex-wrap gap-2">
              {categoryList.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#0078D4] text-white shadow-sm'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((item) => {
              return (
                <div
                  key={item.id}
                  className={`fluent-card p-5 flex flex-col justify-between hover:shadow-md transition-all ${
                    item.isLocal ? 'border-l-4 border-l-emerald-500' : 'border-l-4 border-l-[#0078D4]'
                  }`}
                >
                  <div>
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {item.category}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          item.isLocal
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}
                      >
                        {item.type}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-base font-bold text-[#002050] mb-1.5 leading-snug">
                      {item.title}
                    </h4>

                    {/* Metadata if local */}
                    {(item.fileSize || item.pagesOrDuration) && (
                      <div className="flex items-center gap-3 text-xs text-slate-500 mb-2 font-medium">
                        {item.fileSize && <span>Size: <strong>{item.fileSize}</strong></span>}
                        {item.pagesOrDuration && <span>Length: <strong>{item.pagesOrDuration}</strong></span>}
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Key Topics */}
                    <div className="mb-3 space-y-1 bg-slate-50 p-2.5 rounded border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        Core Syllabus & Topics:
                      </span>
                      {item.keyTopics.map((topic, tidx) => (
                        <div key={tidx} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0078D4] shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Note */}
                    {item.actionNote && (
                      <div className="p-2 rounded bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900 mb-2">
                        <strong className="font-bold">Action: </strong> {item.actionNote}
                      </div>
                    )}
                  </div>

                  {/* Footer & Link */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">
                      {item.recommendedSprint || 'Continuous Track'}
                    </span>

                    {item.isLocal ? (
                      <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200 flex items-center gap-1">
                        <FileCheck className="w-3.5 h-3.5" />
                        In Workspace Folder
                      </span>
                    ) : (
                      <a
                        href={item.locationOrUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 rounded bg-[#0078D4] text-white hover:bg-[#106EBE] font-semibold flex items-center gap-1 transition-colors"
                      >
                        Access Link
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Handbook Deep Guide Tab */}
      {activeTab === 'handbook-guide' && (
        <div className="fluent-card p-6 space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0078D4]">
              Local Master Study Guide
            </span>
            <h3 className="text-xl font-bold text-[#002050] mt-1">
              Introduction to Data Analysis Handbook (Migrant & Seasonal Head Start)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              File: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">introduction-to-data-analysis-handbook-migrant--seasonal-head-start.pdf</code> (112 Pages)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-[#002050] flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#0078D4]" />
                The 7 Major Phases of the Data Analysis Process
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                The handbook provides a rigorous, field-tested 7-phase framework for turning raw programmatic data into high-stakes executive decisions:
              </p>

              <ol className="space-y-2 text-xs text-slate-700">
                <li className="p-2.5 rounded bg-slate-50 border border-slate-200">
                  <strong className="text-[#002050]">1. Clarifying the Purpose:</strong> Deciding whether the analysis aims to monitor compliance, evaluate program outcomes, or uncover root causes of bottlenecks.
                </li>
                <li className="p-2.5 rounded bg-slate-50 border border-slate-200">
                  <strong className="text-[#002050]">2. Formulating Specific Questions:</strong> Narrowing high-level goals into quantitative and measurable research inquiries.
                </li>
                <li className="p-2.5 rounded bg-slate-50 border border-slate-200">
                  <strong className="text-[#002050]">3. Data Collection Planning:</strong> Selecting data sources, determining sampling sizes, and structuring collection protocols.
                </li>
                <li className="p-2.5 rounded bg-slate-50 border border-slate-200">
                  <strong className="text-[#002050]">4. Data Analysis & Cleansing:</strong> Computing summary statistics (frequencies, percentages, means, variance) and cross-tabulations.
                </li>
                <li className="p-2.5 rounded bg-slate-50 border border-slate-200">
                  <strong className="text-[#002050]">5. Interpretation of Findings:</strong> Contextualizing figures against historical benchmarks, peer groups, and external targets.
                </li>
                <li className="p-2.5 rounded bg-slate-50 border border-slate-200">
                  <strong className="text-[#002050]">6. Visual Reporting & Storytelling:</strong> Designing charts, executive summaries, and action matrices for non-technical stakeholders.
                </li>
                <li className="p-2.5 rounded bg-slate-50 border border-slate-200">
                  <strong className="text-[#002050]">7. Programmatic Action & Evaluation:</strong> Modifying operational processes based on findings and re-measuring outcomes.
                </li>
              </ol>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold text-[#002050] flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-emerald-600" />
                Key Analytical Techniques & Formulas in the Handbook
              </h4>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3 rounded bg-blue-50/50 border border-blue-200">
                  <h5 className="font-bold text-[#002050] mb-1">Qualitative vs. Quantitative Triangulation</h5>
                  <p className="text-slate-600">
                    Never rely solely on numerical metrics. Combine quantitative metrics (attendance, scores, test counts) with qualitative feedback (interviews, observation forms) to understand the &quot;Why&quot; behind the numbers.
                  </p>
                </div>

                <div className="p-3 rounded bg-purple-50/50 border border-purple-200">
                  <h5 className="font-bold text-[#002050] mb-1">Variance & Standard Deviation</h5>
                  <p className="text-slate-600">
                    Averages alone are misleading. The handbook teaches calculating variance to understand the spread and detect polarized clusters within service centers.
                  </p>
                </div>

                <div className="p-3 rounded bg-amber-50/50 border border-amber-200">
                  <h5 className="font-bold text-[#002050] mb-1">Pivot Tables & Cross-Tabulations in Excel</h5>
                  <p className="text-slate-600">
                    Step-by-step instructions for breaking down multi-variable tables (e.g. Center Location × Health Check Status × Age Cohort) to identify underperforming sectors.
                  </p>
                </div>

                <div className="p-3 rounded bg-emerald-50/50 border border-emerald-200">
                  <h5 className="font-bold text-[#002050] mb-1">Portfolio Application (Month 1 & Month 3)</h5>
                  <p className="text-slate-600">
                    Mostafa will reproduce the Head Start PIR (Program Information Report) dataset as an end-to-end Power BI report demonstrating real non-profit/social services impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Talkora Diagnostic Remediation Tab */}
      {activeTab === 'talkora-guide' && (
        <div className="fluent-card p-6 space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Personalized Linguistic Blueprint
            </span>
            <h3 className="text-xl font-bold text-[#002050] mt-1">
              Talkora Diagnostic Assessment Remediation Plan
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Based on official assessment reports: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">TL-3876 - Mostafa Mohamed (Assessment&apos;s Notes) .pdf</code>
            </p>
          </div>

          {/* Diagnostic Scores Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { label: 'Fluency', score: '35%', target: '65%' },
              { label: 'Pronunciation', score: '32%', target: '60%' },
              { label: 'Grammar', score: '32%', target: '65%' },
              { label: 'Vocabulary', score: '32%', target: '65%' },
              { label: 'Comprehension', score: '35%', target: '70%' },
            ].map((metric) => (
              <div key={metric.label} className="p-3 rounded bg-slate-50 border border-slate-200 text-center">
                <span className="text-[11px] text-slate-500 font-bold block">{metric.label}</span>
                <span className="text-lg font-bold text-[#002050]">{metric.score}</span>
                <span className="text-[10px] text-emerald-600 font-semibold block">Target: {metric.target}</span>
              </div>
            ))}
          </div>

          {/* 6 Target Errors Breakdown */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#002050]">
              The 6 Critical Error Patterns Identified in the Assessment:
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded bg-rose-50/60 border border-rose-200 space-y-1">
                <h5 className="font-bold text-rose-900">1. Past vs. Present Verb Confusion</h5>
                <p className="text-slate-600">
                  <strong>Assessment observation:</strong> Saying &quot;This take 6 month&quot; or &quot;I work on this last year&quot; instead of using simple past forms.
                </p>
                <p className="text-emerald-700 font-semibold">
                  Fix: Use &quot;This took 6 months&quot;, &quot;I worked on this last year&quot;. Daily recording of past experiences.
                </p>
              </div>

              <div className="p-3.5 rounded bg-rose-50/60 border border-rose-200 space-y-1">
                <h5 className="font-bold text-rose-900">2. Subject-Verb Agreement</h5>
                <p className="text-slate-600">
                  <strong>Assessment observation:</strong> Omitting third-person &quot;-s&quot; (e.g. &quot;He go to office&quot;) or mismatched plural verbs.
                </p>
                <p className="text-emerald-700 font-semibold">
                  Fix: Practice &quot;He goes&quot;, &quot;The system processes&quot;, &quot;The query executes&quot; in technical speech.
                </p>
              </div>

              <div className="p-3.5 rounded bg-rose-50/60 border border-rose-200 space-y-1">
                <h5 className="font-bold text-rose-900">3. Singular vs. Plural Inflections</h5>
                <p className="text-slate-600">
                  <strong>Assessment observation:</strong> Saying &quot;many project&quot; or &quot;several task&quot; omitting plural &quot;-s&quot;.
                </p>
                <p className="text-emerald-700 font-semibold">
                  Fix: Always enunciate &quot;many projects&quot;, &quot;several tasks&quot;, &quot;two datasets&quot;.
                </p>
              </div>

              <div className="p-3.5 rounded bg-rose-50/60 border border-rose-200 space-y-1">
                <h5 className="font-bold text-rose-900">4. Article Usage (a / an / the)</h5>
                <p className="text-slate-600">
                  <strong>Assessment observation:</strong> Leaving out articles entirely before singular countable nouns.
                </p>
                <p className="text-emerald-700 font-semibold">
                  Fix: &quot;I created <strong>a</strong> dashboard for <strong>the</strong> stakeholder.&quot;
                </p>
              </div>

              <div className="p-3.5 rounded bg-rose-50/60 border border-rose-200 space-y-1">
                <h5 className="font-bold text-rose-900">5. Word Family Confusion (Noun vs. Verb vs. Adjective)</h5>
                <p className="text-slate-600">
                  <strong>Assessment observation:</strong> Using nouns as verbs or verbs as adjectives inappropriately.
                </p>
                <p className="text-emerald-700 font-semibold">
                  Fix: Practice word forms (Analyze / Analysis / Analytical; Automate / Automation / Automated).
                </p>
              </div>

              <div className="p-3.5 rounded bg-rose-50/60 border border-rose-200 space-y-1">
                <h5 className="font-bold text-rose-900">6. Pronunciation: TH Sounds & P vs. B</h5>
                <p className="text-slate-600">
                  <strong>Assessment observation:</strong> Replacing /θ/ with &quot;s&quot; or &quot;t&quot; (think &rarr; sink/tink) and confusing /p/ with /b/.
                </p>
                <p className="text-emerald-700 font-semibold">
                  Fix: Tongue between teeth for &quot;TH&quot; and puff of air for &quot;P&quot; (Power BI, Pipeline, Project).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
