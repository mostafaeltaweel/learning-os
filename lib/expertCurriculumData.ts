/**
 * expertCurriculumData.ts
 * Complete 6-Month Master Curriculum + Advanced Post-Hire AI / MLOps Horizon
 * Tracks:
 * - English Immersion (Talkora A1+ diagnostic fix -> C1 Professional)
 * - Advanced Excel (Power Query, DAX in Excel, Dynamic Arrays, Financial Modeling)
 * - Modern SQL (PostgreSQL, Window Functions, CTEs, Indexing, Performance Optimization)
 * - Enterprise Power BI (DAX CALCULATE, Time Intelligence, Tabular Editor, Storytelling)
 * - Python for Data Analysis (Pandas, Polars, NumPy, Automated EDA, Seaborn)
 * - Statistics & Probability (A/B Testing, Bayesian, Hypothesis, Inferential Stats)
 * - Machine Learning (Scikit-Learn, Feature Engineering, XGBoost, Cross-validation)
 * - Deep Learning & Neural Networks (PyTorch, CNN, RNN/LSTM, Transformers, Vision)
 * - Modern RAG & Agentic AI (LangChain, LangGraph, Vector DBs Qdrant/Chroma, Function Calling)
 * - n8n Workflow Automation (Webhooks, Automated ETL, AI-agent nodes, Alerts)
 */

export interface TrackModule {
  id: string;
  name: string;
  category: 'English' | 'Excel' | 'SQL' | 'Power BI' | 'Python' | 'Statistics' | 'Machine Learning' | 'Deep Learning' | 'RAG & Agentic AI' | 'n8n Automation';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  month: number;
  topics: {
    title: string;
    description: string;
    codeOrPrompt?: string;
    resourceName: string;
    resourceUrl: string;
    hours: number;
  }[];
}

export interface MonthRoadmap {
  month: number;
  title: string;
  phase: 'Short-Term (Hire Ready)' | 'Long-Term (AI & Automation Expert)';
  focusRole: string;
  milestoneProject: {
    title: string;
    tech: string;
    deliverable: string;
    businessImpact: string;
  };
  modules: TrackModule[];
}

export const expert6MonthsRoadmap: MonthRoadmap[] = [
  {
    month: 1,
    title: 'Month 1: Rock-Solid Data Foundations & Diagnostic Repair',
    phase: 'Short-Term (Hire Ready)',
    focusRole: 'Junior BI & Data Analyst',
    milestoneProject: {
      title: 'E-Commerce SQL Warehouse & Excel Dynamic Modeling',
      tech: 'PostgreSQL, Advanced Excel, Power Query',
      deliverable: 'Normalized 3NF Relational Database + Automated KPI Reconciliation Workbook',
      businessImpact: 'Uncovered 14% inventory discrepancies and automated weekly reporting from 6 hours to 5 minutes.',
    },
    modules: [
      {
        id: 'm1-eng',
        name: 'English: Talkora A1+ Diagnostic Repair',
        category: 'English',
        level: 'Intermediate',
        month: 1,
        topics: [
          {
            title: 'Verb Tenses Consistency (Past vs. Present)',
            description: 'Eliminate "This take 6 month" pattern -> "This took 6 months". Describing past projects consistently.',
            resourceName: 'Talkora Diagnostic Notes + ZAmericanEnglish',
            resourceUrl: 'https://www.youtube.com/watch?v=jXgOjgokSgI&list=PLp22-4PivYmLBmV2wctgqyyRlIs1MhmNr',
            hours: 15,
          },
          {
            title: 'Subject-Verb Agreement & Plurals',
            description: 'Fix "There is a lot of friends" -> "There are a lot of friends", "I work in a lot of companies".',
            resourceName: 'British Council A2 Grammar',
            resourceUrl: 'https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar',
            hours: 12,
          },
          {
            title: 'Pronunciation /b/ vs. /p/ & TH Sound Drill',
            description: 'Tongue placement drills on Youglish for: think, things, youth, picture, still, base.',
            resourceName: 'Youglish Pronunciation Lab',
            resourceUrl: 'https://youglish.com/',
            hours: 10,
          },
        ],
      },
      {
        id: 'm1-sql',
        name: 'Relational Database Design & ANSI SQL Mastery',
        category: 'SQL',
        level: 'Intermediate',
        month: 1,
        topics: [
          {
            title: 'Relational Architecture & Constraints',
            description: 'PK, FK, CHECK, 1-to-many & many-to-many junction tables, ERD design.',
            resourceName: 'PostgreSQL Official Docs',
            resourceUrl: 'https://www.postgresql.org/docs/',
            hours: 16,
          },
          {
            title: 'Multi-Table JOINs & Filtering Matrix',
            description: 'INNER, LEFT, RIGHT, FULL OUTER, CROSS JOINs with aggregate GROUP BY & HAVING.',
            resourceName: 'DataLemur SQL Master Series',
            resourceUrl: 'https://datalemur.com/',
            hours: 18,
          },
        ],
      },
      {
        id: 'm1-excel',
        name: 'Advanced Excel & Power Query Automation',
        category: 'Excel',
        level: 'Advanced',
        month: 1,
        topics: [
          {
            title: 'Dynamic Array Formulas (XLOOKUP, FILTER, UNIQUE, SORT)',
            description: 'Rebuilding legacy VLOOKUP sheets into zero-maintenance dynamic models.',
            resourceName: 'ExcelJet Advanced Formulas',
            resourceUrl: 'https://exceljet.net/',
            hours: 14,
          },
          {
            title: 'Power Query M-Language Cleaning',
            description: 'Unpivoting, merging messy data, automated type coercion, folder-based multi-file ingestion.',
            resourceName: 'Microsoft Learn Power Query',
            resourceUrl: 'https://learn.microsoft.com/power-query/',
            hours: 15,
          },
        ],
      },
      {
        id: 'm1-stats',
        name: 'Descriptive Analytics & Probability Fundamentals',
        category: 'Statistics',
        level: 'Intermediate',
        month: 1,
        topics: [
          {
            title: 'Measures of Spread & Distribution Shape',
            description: 'Mean, Median, Mode, Variance, Standard Deviation, Skewness, Kurtosis, Interquartile Range (IQR).',
            resourceName: 'OpenStax Statistics Vol. 1',
            resourceUrl: 'https://openstax.org/details/books/introductory-statistics',
            hours: 12,
          },
        ],
      },
    ],
  },
  {
    month: 2,
    title: 'Month 2: Enterprise Power BI, Advanced DAX & Storytelling',
    phase: 'Short-Term (Hire Ready)',
    focusRole: 'BI Analyst / Dashboard Specialist',
    milestoneProject: {
      title: 'Executive Financial & Sales Performance BI Suite',
      tech: 'Power BI, DAX, Tabular Editor, Figma for BI',
      deliverable: '5-Page C-Suite Storytelling Dashboard with Drill-through & RLS',
      businessImpact: 'Identified top 20% high-margin product cohorts contributing to 72% of EBITDA.',
    },
    modules: [
      {
        id: 'm2-pbi',
        name: 'Enterprise Power BI & Star Schema Modeling',
        category: 'Power BI',
        level: 'Expert',
        month: 2,
        topics: [
          {
            title: 'Star Schema Architecture vs. Snowflakes',
            description: 'Single-direction 1:* relationships, avoiding bidirectional cross-filtering traps, role-playing dates.',
            resourceName: 'SQLBI Star Schema Guidelines',
            resourceUrl: 'https://www.sqlbi.com/',
            hours: 20,
          },
          {
            title: 'DAX CALCULATE() & Filter Context Transition',
            description: 'ALL, ALLEXCEPT, KEEPFILTERS, USERELATIONSHIP, Virtual Tables (SUMMARIZE, ADDCOLUMNS).',
            resourceName: 'Definitive Guide to DAX by Alberto Ferrari',
            resourceUrl: 'https://www.sqlbi.com/books/the-definitive-guide-to-dax-2nd-edition/',
            hours: 25,
          },
          {
            title: 'Time Intelligence In-Depth',
            description: 'YTD, QTD, YoY Growth, ParallelPeriod, Custom 4-4-5 Fiscal Calendars.',
            resourceName: 'Microsoft Learn DAX Patterns',
            resourceUrl: 'https://www.daxpatterns.com/',
            hours: 18,
          },
        ],
      },
      {
        id: 'm2-eng',
        name: 'English: Business Presentation & Storytelling',
        category: 'English',
        level: 'Intermediate',
        month: 2,
        topics: [
          {
            title: 'Explaining Charts & Business Trends',
            description: 'Using verbs of movement (surged, plummeted, plateaued, outpaced) and contextualizing variance.',
            resourceName: 'Harvard Business Review Executive Voice',
            resourceUrl: 'https://hbr.org/',
            hours: 14,
          },
        ],
      },
    ],
  },
  {
    month: 3,
    title: 'Month 3: Python for Data Analysis & Statistical Inference',
    phase: 'Short-Term (Hire Ready)',
    focusRole: 'Data Analyst / Analytics Engineer',
    milestoneProject: {
      title: 'Customer Churn & Cohort Retention Machine Learning EDA',
      tech: 'Python, Pandas, NumPy, Seaborn, Scipy Stats',
      deliverable: 'Jupyter Notebook + Executive Storytelling Report analyzing 50,000 customer records',
      businessImpact: 'Isolated 3 critical churn predictors and designed targeted re-engagement strategies.',
    },
    modules: [
      {
        id: 'm3-py',
        name: 'Python for Data Analysis & Wrangling',
        category: 'Python',
        level: 'Advanced',
        month: 3,
        topics: [
          {
            title: 'High-Performance Pandas & Polars',
            description: 'Vectorized operations, query optimization, handling memory bottlenecks on 1M+ rows.',
            resourceName: 'Python for Data Analysis (Wes McKinney)',
            resourceUrl: 'https://wesmckinney.com/book/',
            hours: 24,
          },
          {
            title: 'Automated Exploratory Data Analysis (EDA)',
            description: 'Missing value imputation, outlier detection with Z-score & Isolation Forest, Seaborn heatmaps.',
            resourceName: 'Real Python Data Science Path',
            resourceUrl: 'https://realpython.com/',
            hours: 20,
          },
        ],
      },
      {
        id: 'm3-stats',
        name: 'Inferential Statistics & Hypothesis Testing',
        category: 'Statistics',
        level: 'Advanced',
        month: 3,
        topics: [
          {
            title: 'Hypothesis Testing & p-Value Interpretation',
            description: 'Null vs Alternative hypothesis, Type I/II errors, Student t-test, ANOVA, Chi-Square tests.',
            resourceName: 'PennState STAT 500 Applied Statistics',
            resourceUrl: 'https://online.stat.psu.edu/stat500/',
            hours: 18,
          },
          {
            title: 'Controlled A/B Testing & Sample Sizing',
            description: 'Minimum Detectable Effect (MDE), Statistical Power (1 - beta), Randomization checks.',
            resourceName: 'Evan Miller A/B Testing Calculator & Guides',
            resourceUrl: 'https://www.evanmiller.org/ab-testing/',
            hours: 14,
          },
        ],
      },
    ],
  },
  {
    month: 4,
    title: 'Month 4: Machine Learning & Predictive Analytics',
    phase: 'Short-Term (Hire Ready)',
    focusRole: 'Associate Data Scientist / Advanced Analyst',
    milestoneProject: {
      title: 'End-to-End Predictive Model for Revenue & Customer LTV',
      tech: 'Scikit-Learn, XGBoost, Streamlit, Fastify/FastAPI',
      deliverable: 'Production Model Pipeline + Interactive Streamlit Forecasting App',
      businessImpact: 'Achieved 87% AUC-ROC score, enabling sales team to prioritize high-value prospects.',
    },
    modules: [
      {
        id: 'm4-ml',
        name: 'Applied Machine Learning for Business',
        category: 'Machine Learning',
        level: 'Advanced',
        month: 4,
        topics: [
          {
            title: 'Feature Engineering & Data Preprocessing',
            description: 'One-hot encoding, target encoding, scaling, handling imbalanced datasets (SMOTE).',
            resourceName: 'Scikit-Learn Documentation',
            resourceUrl: 'https://scikit-learn.org/',
            hours: 20,
          },
          {
            title: 'Supervised Learning Algorithms',
            description: 'Logistic Regression, Random Forest, XGBoost, LightGBM, Hyperparameter tuning with Optuna.',
            resourceName: 'Hands-On Machine Learning with Scikit-Learn & PyTorch',
            resourceUrl: 'https://github.com/ageron/handson-ml3',
            hours: 25,
          },
          {
            title: 'Model Evaluation & Interpretability',
            description: 'Precision, Recall, F1, ROC-AUC, SHAP values (Shapley Additive exPlanations) for business trust.',
            resourceName: 'Interpretable Machine Learning Book',
            resourceUrl: 'https://christophm.github.io/interpretable-ml-book/',
            hours: 16,
          },
        ],
      },
    ],
  },
  {
    month: 5,
    title: 'Month 5: Modern RAG & Agentic AI Systems',
    phase: 'Long-Term (AI & Automation Expert)',
    focusRole: 'AI / BI Solutions Architect',
    milestoneProject: {
      title: 'Autonomous SQL & Document RAG Agent for Business Intelligence',
      tech: 'LangChain, LangGraph, Qdrant / ChromaDB, OpenAI / Gemini API',
      deliverable: 'Agentic Chatbot that queries internal company database, writes SQL, validates results, and renders charts.',
      businessImpact: 'Democratized data access: non-technical executives can query 10 years of data in natural language.',
    },
    modules: [
      {
        id: 'm5-rag',
        name: 'RAG Architecture & Semantic Search',
        category: 'RAG & Agentic AI',
        level: 'Expert',
        month: 5,
        topics: [
          {
            title: 'Document Chunking, Embedding Models & Vector Stores',
            description: 'Semantic text splitters, text-embedding-3-large, cosine similarity search in Qdrant & Chroma.',
            resourceName: 'LangChain RAG Architecture Guide',
            resourceUrl: 'https://python.langchain.com/docs/use_cases/question_answering/',
            hours: 22,
          },
          {
            title: 'Text-to-SQL Agents with Self-Correction',
            description: 'Prompt templates, schema injection, SQL syntax validation, executing queries safely.',
            resourceName: 'LangGraph Multi-Agent Workflows',
            resourceUrl: 'https://langchain-ai.github.io/langgraph/',
            hours: 25,
          },
          {
            title: 'Evaluation of RAG (Ragas Framework)',
            description: 'Faithfulness, Answer Relevance, Context Recall & Precision benchmarking.',
            resourceName: 'Ragas Documentation',
            resourceUrl: 'https://docs.ragas.io/',
            hours: 15,
          },
        ],
      },
    ],
  },
  {
    month: 6,
    title: 'Month 6: Deep Learning, n8n Automation & Full Portfolio Deployment',
    phase: 'Long-Term (AI & Automation Expert)',
    focusRole: 'Senior Data & AI Systems Specialist',
    milestoneProject: {
      title: 'Enterprise Multi-Modal BI System with n8n Workflow Automation',
      tech: 'PyTorch, Transformers, n8n, Webhooks, Docker, Power BI Embedded',
      deliverable: 'Autonomous n8n pipeline triggering automated daily ETL, sentiment analysis, and executive alerts.',
      businessImpact: '100% automated decision loop from raw data ingestion to Discord/Slack stakeholder briefing.',
    },
    modules: [
      {
        id: 'm6-dl',
        name: 'Deep Learning & Neural Network Foundations',
        category: 'Deep Learning',
        level: 'Expert',
        month: 6,
        topics: [
          {
            title: 'PyTorch Tensor Operations & Backpropagation',
            description: 'Building custom Multi-Layer Perceptrons (MLP), loss functions, optimizers (AdamW), learning rate schedulers.',
            resourceName: 'Deep Learning with PyTorch (official)',
            resourceUrl: 'https://pytorch.org/tutorials/',
            hours: 22,
          },
          {
            title: 'Computer Vision & Convolutional Neural Networks (CNN)',
            description: 'Image preprocessing with OpenCV, Transfer Learning with ResNet/YOLO for document analysis.',
            resourceName: 'Fast.ai Practical Deep Learning for Coders',
            resourceUrl: 'https://course.fast.ai/',
            hours: 20,
          },
          {
            title: 'Transformers & Attention Mechanisms',
            description: 'Self-attention, Multi-head attention, Hugging Face transformers fine-tuning.',
            resourceName: 'Hugging Face NLP Course',
            resourceUrl: 'https://huggingface.co/learn/nlp-course/',
            hours: 20,
          },
        ],
      },
      {
        id: 'm6-n8n',
        name: 'Enterprise Workflow Automation with n8n',
        category: 'n8n Automation',
        level: 'Expert',
        month: 6,
        topics: [
          {
            title: 'Automated ETL & Webhook Pipelines in n8n',
            description: 'Triggering flows on schedule or webhook, parsing JSON, transforming data, writing to PostgreSQL/Supabase.',
            resourceName: 'n8n Official Academy',
            resourceUrl: 'https://academy.n8n.io/',
            hours: 18,
          },
          {
            title: 'AI Agent Nodes & Automated Stakeholder Alerts',
            description: 'Integrating OpenAI/Gemini nodes inside n8n to summarize daily sales and send executive briefs to Slack/Email.',
            resourceName: 'n8n Advanced AI Workflows',
            resourceUrl: 'https://n8n.io/workflows/',
            hours: 18,
          },
        ],
      },
    ],
  },
];
