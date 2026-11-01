/**
 * curriculum180Days.ts
 * Complete, highly detailed 190-Day Master Learning Curriculum for Mostafa Mohamed.
 * Combines:
 * 1. The Exact Daily English Practice Plan & Google Tasks Routine (Sunday & Thursday Grammar/Reading,
 *    Saturday & Tuesday Listening/Speaking, Monday & Wednesday Sessions & Recaps, Friday Challenge Day).
 * 2. 6-Month Technical Stacks (SQL, Power BI, Advanced Excel, Statistics, Python, ML, RAG, n8n).
 * 3. Textbooks: OpenStax Statistics 2e, Head Start Data Analysis Handbook, AI Engineering, Talkora Notes.
 */

export interface DayPlan {
  dayNumber: number; // 1 to 190
  month: number; // 1 to 6
  sprint: number; // 1 to 25
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

function formatDate(startDate: Date, offsetDays: number): string {
  const d = new Date(startDate);
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
}

const weekdayNames: ('Saturday' | 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday')[] = [
  'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
];

/**
 * EXACT Daily English Tasks Protocol as structured in Google Tasks and Excel Practice Plan:
 */
export function getExactEnglishTasks(dayNumber: number, dayOfWeek: string): DayPlan['tasks'] {
  // 1. Sunday & Thursday: Grammar & Reading Routine (8:00 PM - 25 min)
  if (dayOfWeek === 'Sunday' || dayOfWeek === 'Thursday') {
    return [
      {
        id: `d${dayNumber}-eng-grammar-reading`,
        category: 'English',
        title: 'روتين الإنجليزي: القواعد والقراءة (Grammar & Reading - 8:00 PM)',
        duration: '25 min',
        impact: '+3 Grammar & Vocabulary Score',
        resourceName: 'ZAmericanEnglish + Istoria / The Little Prince + Youglish + ChatGPT',
        resourceUrl: 'https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar',
        notes: `📚 خطوات الممارسة اليومية (25 دقيقة):
1️⃣ القواعد (Grammar): متابعة درس من قناة ZAmericanEnglish (https://www.youtube.com/watch?v=jXgOjgokSgI&list=PLp22-4PivYmLBmV2wctgqyyRlIs1MhmNr) أو مراجعة قاعدة من British Council (https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar)
2️⃣ القراءة (Reading - 5 دقائق فقط): قراءة لمدة 5 دقائق من تطبيق Istoria أو الكتاب الصوتي The Little Prince (https://youtu.be/Uyx5Lzn1yAs?si=2wbRGfCbXcbVb-Fs)، واستخراج 3 كلمات جديدة وكتابتها في الدفتر بعد معرفة معناها.
3️⃣ النطق والبحث (Vocabulary & Pronunciation): البحث عن الكلمات في Youglish (https://youglish.com/) لسماع النطق في سياقات مختلفة، ثم استخدام ChatGPT:
Prompt: "Explain these words: [write the 3 words here]. Give me 2 clear example sentences for each word, one in a simple daily context and one in a professional context."
4️⃣ التطبيق الكتابي (Writing - ربط مهني كـ Power BI أو Pandas أو Vibe coding): كتابة قصة قصيرة عن نفسك تتضمن الكلمات الثلاث الجديدة وقاعدة الجرامر ومراجعتها مع ChatGPT:
Prompt: "Here is my short story using these words [list words] and applying this grammar lesson [write lesson]. Please correct it and give me feedback on grammar, vocabulary, and style."
5️⃣ سرعة الكتابة (Typing - دقيقة واحدة): اختبار مدته دقيقة لتنشيط الذاكرة في إملاء الكلمات الجديدة (https://www.speedtypingonline.com/typing-test).
6️⃣ التحدث الموجه (Speaking): استخدام ميزة التسجيل الصوتي في ChatGPT لسرد نفس القصة:
Spoken Prompt: "Please listen to my recording and give me corrections for grammar, vocabulary, and pronunciation, with examples for improvement."
✅ لا تنسَ تحديث شيت الـ Daily Targets بتسجيل (True) والكلمات الثلاث والقصة!`,
      },
    ];
  }

  // 2. Saturday & Tuesday: Listening & Speaking Routine (8:00 PM - 25 min)
  if (dayOfWeek === 'Saturday' || dayOfWeek === 'Tuesday') {
    return [
      {
        id: `d${dayNumber}-eng-listening-speaking`,
        category: 'English',
        title: 'روتين الإنجليزي: الاستماع والتحدث (Listening & Speaking - 8:00 PM)',
        duration: '25 min',
        impact: '+3 Fluency & Shadowing Cadence',
        resourceName: 'VOA Learning English + Easy English + Youglish + ChatGPT',
        resourceUrl: 'https://learningenglish.voanews.com/',
        notes: `🎧 خطوات الممارسة اليومية (25 دقيقة):
1️⃣ الاستماع والمحاكاة (Listening & Shadowing - 6 دقائق): الاستماع لفيديو تعليمي 5 دقائق ثم الترديد خلف المتحدث (Shadowing) دقيقة لمخارج الحروف واستخراج 3 كلمات جديدة:
• Easy English: https://youtube.com/@easyenglish551?si=9OI1jdyLIDx7cojj
• VOA Learning English Level 1: https://youtube.com/playlist?list=PLDVFLkhb3siL0jBXp2Ao5tkTTq1B5HBqg&si=f8qXKvy5w7r7qM52
• Listening Time Podcast: https://www.youtube.com/@listeningtimepodcast
2️⃣ النطق والبحث (Vocabulary & Pronunciation): البحث في Youglish (https://youglish.com/) + برومبت ChatGPT:
Prompt: "Explain these words from the listening activity: [write the 3 words here]. Give me 2 clear example sentences for each word, one in a simple daily context and one in a professional context."
3️⃣ التطبيق الكتابي (Writing - ربط مهني كـ Power BI أو Pandas): تأليف قصة قصيرة بالكلمات الثلاث والجرامر ومراجعتها مع ChatGPT:
Prompt: "Here is my short story using these words [list words] and applying this grammar lesson [write lesson]. Please correct it and give me feedback on grammar, vocabulary, and style."
4️⃣ سرعة الكتابة (Typing - دقيقة واحدة): اختبار كتابة دقيقة واحدة (https://www.speedtypingonline.com/typing-test) لتثبيت الإملاء.
5️⃣ التحدث الموجه (Speaking): فتح التسجيل الصوتي في ChatGPT لسرد القصة وتقييم النطق والقواعد:
Spoken Prompt: "Please listen to my recording and give me corrections for grammar, vocabulary, and pronunciation, with examples for improvement."
✅ لا تنسَ تحديث شيت الـ Daily Targets بتسجيل (True) والكلمات الثلاث والقصة!`,
      },
    ];
  }

  // 3. Monday & Wednesday: Session Day (9:00 PM) + Recap (11:00 PM)
  if (dayOfWeek === 'Monday' || dayOfWeek === 'Wednesday') {
    return [
      {
        id: `d${dayNumber}-eng-live-session`,
        category: 'English',
        title: 'محاضرة الإنجليزي الرسمية المباشرة (English Session - 9:00 إلى 11:00 PM)',
        duration: '120 min',
        impact: '+5 Live Speaking & Coaching',
        resourceName: 'Live Interactive Session',
        resourceUrl: 'https://tasks.google.com/task/IdlqtuA01Et-JSs_?sa=DLSA_GEMINI',
        notes: `🎓 يوم المحاضرة (Session Day - مدة المحاضرة ساعتان من 9:00 إلى 11:00 مساءً):
• حضور محاضرة الإنجليزي والتركيز على تدوين الملاحظات المهمة، القواعد، والمفردات الجديدة أثناء الشرح والمشاركة الفعالة مع المدرب والزملاء.`,
      },
      {
        id: `d${dayNumber}-eng-session-recap`,
        category: 'English',
        title: 'روتين الإنجليزي: مراجعة وتلخيص المحاضرة (Session Recap - 11:00 PM)',
        duration: '15 min',
        impact: '+2 Retention & Word Lock',
        resourceName: 'Lecture Notes & Daily Targets',
        resourceUrl: 'https://tasks.google.com/task/L88i-vNnz1N_CDTh?sa=DLSA_GEMINI',
        notes: `📝 خطوات مراجعة ما بعد المحاضرة (Session Recap - 15 دقيقة فور انتهاء المحاضرة 11:00 PM):
1️⃣ مراجعة وتلخيص الملاحظات أو المواد التعليمية الخاصة بمحاضرة اليوم (Recap on session’s notes or material).
2️⃣ استخراج أهم الكلمات والتعبيرات الجديدة وتدوينها في الدفتر.
3️⃣ فتح تبويب Daily Targets في ملف الإكسل لتسجيل الإنجاز (True) وكتابة الكلمات المستفادة.`,
      },
    ];
  }

  // 4. Friday: Challenge Day & Weekly Recap (8:00 PM - 20 min)
  return [
    {
      id: `d${dayNumber}-eng-challenge-day`,
      category: 'English',
      title: 'روتين الإنجليزي: يوم التحدي والمراجعة الأسبوعية (Challenge Day - 8:00 PM)',
      duration: '20 min',
      impact: '+4 Cambridge Certification & Confidence',
      resourceName: 'Cambridge Write & Improve + Wordwall Conversation Wheel',
      resourceUrl: 'https://writeandimprove.com/workbooks#/wi-workbooks/7485eb41-a047-4d23-ae25-5afb7387eba9/tasks/67ef8314-5989-427e-b14a-c05479be1115',
      notes: `🏆 خطوات يوم التحدي والمراجعة الأسبوعية (Challenge Day - 20 دقيقة):
1️⃣ التحدي الكتابي (Writing Challenge): منصة Cambridge Write & Improve للكتابة في الموضوع المحدد وإرساله لتلقي تقييم فوري وملاحظات التصحيح:
• Write & Improve: https://writeandimprove.com/workbooks#/wi-workbooks/7485eb41-a047-4d23-ae25-5afb7387eba9/tasks/67ef8314-5989-427e-b14a-c05479be1115
2️⃣ المحادثة العفوية (Conversation Wheel): فتح عجلة المحادثة والضغط على Spin للحصول على سؤال عشوائي، ثم التحدث 60–90 ثانية عبر التسجيل الصوتي في ChatGPT:
• Conversation Wheel: https://wordwall.net/resource/562434/conversation-wheel
• Spoken Prompt: "Please listen to my answer to this question: [say the question]. Correct my grammar, vocabulary, and pronunciation, and suggest more natural ways to express my ideas."
3️⃣ التجميع والمراجعة الأسبوعية (Weekly Recap): مراجعة الـ 12 كلمة جديدة والدرسين النحويين (Grammar lessons) وتحديث شيت Daily Targets.`,
    },
  ];
}

/**
 * Deterministic generator producing all 190 individual days with complete, distinct tasks.
 */
export function generate180DaysCurriculum(): DayPlan[] {
  const startDate = new Date('2026-11-01');
  const days: DayPlan[] = [];

  for (let i = 1; i <= 190; i++) {
    const offset = i - 1;
    const dateStr = formatDate(startDate, offset);
    const dayOfWeek = weekdayNames[offset % 7];

    const month = Math.min(6, Math.floor((i - 1) / 30) + 1);
    const sprint = Math.min(25, Math.floor((i - 1) / 7.5) + 1);
    const dayInSprint = ((i - 1) % 7) + 1;
    const isMilestone = i % 30 === 0 || i === 190;
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
  const englishTasks = getExactEnglishTasks(dayNumber, dayOfWeek);

  // MONTH 1 (Days 1 - 30): SQL, Excel, Stats Foundations & Talkora Remediation
  if (month === 1) {
    if (dayOfWeek === 'Saturday') {
      return {
        dayNumber,
        month,
        sprint,
        date: dateStr,
        dayOfWeek,
        dayType: 'Listening & Schema Modeling Day (8:00 PM)',
        theme: 'Relational Database Integrity & VOA Audio Shadowing',
        missionTitle: `“Day ${dayNumber}: PostgreSQL 3NF Architecture & Oral Shadowing”`,
        missionDescription: 'Execute simultaneous VOA audio shadowing at 2/3 speed, model normalized relational schemas, and drill /θ/ vs /s/ pronunciation.',
        focusCompetencies: ['English (Listening & Shadowing)', 'SQL (DDL & Normalization)', 'Power BI (Data Model)'],
        tasks: [
          ...englishTasks,
          {
            id: `d${dayNumber}-t-sql`,
            category: 'SQL',
            title: 'PostgreSQL Relational Schema Design: PK, FK & Referential Integrity',
            duration: '35 min',
            impact: '+3 SQL Score',
            resourceName: 'PostgreSQL Official Docs Ch. 5',
            resourceUrl: 'https://www.postgresql.org/docs/',
            notes: 'Create normalized tables with UUID primary keys and ON DELETE CASCADE constraints.',
          },
          {
            id: `d${dayNumber}-t-pbi`,
            category: 'Power BI',
            title: 'Star Schema Architecture: Fact Tables vs Dimension Tables',
            duration: '30 min',
            impact: '+2 Power BI Score',
            resourceName: 'SQLBI Star Schema Guidelines',
            resourceUrl: 'https://www.sqlbi.com/',
            notes: 'Model 1-to-many single-direction relationships. Avoid bidirectional cross-filtering traps.',
          },
          {
            id: `d${dayNumber}-t-stats`,
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
        dayType: 'Grammar & Dynamic Array Excel Day (8:00 PM)',
        theme: 'Talkora Verb Tense Fix & Modern Excel Dynamic Arrays',
        missionTitle: `“Day ${dayNumber}: Eliminating Past Tense Errors & Dynamic XLOOKUP”`,
        missionDescription: 'Read Istoria / The Little Prince, fix past vs present verb tense mixing, and replace legacy VLOOKUP with XLOOKUP & FILTER.',
        focusCompetencies: ['English (Grammar & Reading)', 'Excel (Dynamic Arrays)', 'Data Analysis (Handbook)'],
        tasks: [
          ...englishTasks,
          {
            id: `d${dayNumber}-t-excel`,
            category: 'Excel',
            title: 'Advanced Dynamic Array Formulas: XLOOKUP, FILTER, UNIQUE & SORT',
            duration: '35 min',
            impact: '+3 Excel Score',
            resourceName: 'ExcelJet Advanced Formulas',
            resourceUrl: 'https://exceljet.net/',
            notes: 'Build automated reconciliation sheet that dynamically filters low-stock items without helper columns.',
          },
          {
            id: `d${dayNumber}-t-handbook`,
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
        dayType: 'Live Session Day & Complex SQL Joins (9:00 PM)',
        theme: 'English Live Session & Multi-Table SQL Queries',
        missionTitle: `“Day ${dayNumber}: English Live Session & Multi-Table SQL Matrix”`,
        missionDescription: 'Attend live English session (9:00-11:00 PM), do 15-min recap, and solve multi-table JOINs on DataLemur.',
        focusCompetencies: ['English (Live Session & Recap)', 'SQL (JOINs & Aggregations)', 'Python (Pandas Wrangling)'],
        tasks: [
          ...englishTasks,
          {
            id: `d${dayNumber}-t-sql`,
            category: 'SQL',
            title: 'Multi-Table JOINs: INNER, LEFT & FULL OUTER with Aggregations',
            duration: '40 min',
            impact: '+3 SQL Score',
            resourceName: 'DataLemur SQL Practice Platform',
            resourceUrl: 'https://datalemur.com/',
            notes: 'Solve 3 medium SQL challenges: Customer Lifetime Spend, Inactive Users, Category Revenue.',
          },
          {
            id: `d${dayNumber}-t-py`,
            category: 'Python',
            title: 'Pandas Vectorized Filtering & Automated Missing Value Imputation',
            duration: '35 min',
            impact: '+3 Python Score',
            resourceName: 'Python for Data Analysis (Wes McKinney Ch. 5)',
            resourceUrl: 'https://wesmckinney.com/book/',
            notes: 'Load 50,000 retail records. Impute missing categories with mode and prices with median.',
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
        dayType: 'Listening & Context Transition Day (8:00 PM)',
        theme: 'VOA Tech News & DAX CALCULATE() Filter Context',
        missionTitle: `“Day ${dayNumber}: Advanced DAX Context & Data Collection Protocols”`,
        missionDescription: 'Execute 6-step listening & speaking routine at 8:00 PM, master DAX CALCULATE(), and study Head Start Handbook.',
        focusCompetencies: ['English (Listening & Speaking)', 'Power BI (DAX Context)', 'Data Analysis (Collection Strategy)'],
        tasks: [
          ...englishTasks,
          {
            id: `d${dayNumber}-t-sql`,
            category: 'SQL',
            title: 'Common Table Expressions (CTEs) & Subqueries for Nested Logic',
            duration: '35 min',
            impact: '+3 SQL Score',
            resourceName: 'PostgreSQL Docs Ch. 7.8',
            resourceUrl: 'https://www.postgresql.org/docs/',
            notes: 'Write readable WITH cte_sales AS (...) queries to isolate top 10% customers by transaction count.',
          },
          {
            id: `d${dayNumber}-t-handbook`,
            category: 'Data Analysis',
            title: 'Head Start Handbook Study: Step 3 (Collection) & Step 4 (Analysis)',
            duration: '30 min',
            impact: '+2 Analysis Methodology',
            resourceName: 'Head Start Data Analysis Handbook (Pages 29-74)',
            resourceUrl: 'introduction-to-data-analysis-handbook-migrant--seasonal-head-start.pdf',
            notes: 'Study cross-tabulations and margin of error protocols for incomplete programmatic records.',
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
        dayType: 'Live Session Day & Normal Curve (9:00 PM)',
        theme: 'English Live Session & Normal Distribution (OpenStax Ch. 6)',
        missionTitle: `“Day ${dayNumber}: English Live Session & Normal Curve (OpenStax Ch. 6)”`,
        missionDescription: 'Attend live English session (9:00-11:00 PM), do 15-min recap, and master Z-Scores in OpenStax Ch. 6.',
        focusCompetencies: ['English (Live Session & Recap)', 'Statistics (Normal Curve)', 'Python (Polars Engine)'],
        tasks: [
          ...englishTasks,
          {
            id: `d${dayNumber}-t-stats`,
            category: 'Statistics',
            title: 'The Normal Distribution & Empirical Rule 68-95-99.7 (OpenStax Ch. 6)',
            duration: '35 min',
            impact: '+3 Statistics Score',
            resourceName: 'OpenStax Statistics 2e (Ch. 6)',
            resourceUrl: 'introductory-statistics-2e_-_WEB.pdf',
            notes: 'Calculate Z-Scores: z = (x - mu) / sigma. Determine which transaction values exceed +3 sigma.',
          },
          {
            id: `d${dayNumber}-t-pbi`,
            category: 'Power BI',
            title: 'Time Intelligence DAX: YTD, YoY Growth & ParallelPeriod',
            duration: '35 min',
            impact: '+3 Power BI Score',
            resourceName: 'Microsoft Learn DAX Patterns',
            resourceUrl: 'https://www.daxpatterns.com/',
            notes: 'Implement custom Fiscal Date Table and write [Sales YoY %] measure handling null prior years.',
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
        dayType: 'Grammar & Window Functions Day (8:00 PM)',
        theme: 'English Grammar & Reading Routine + SQL Window Functions',
        missionTitle: `“Day ${dayNumber}: Grammar & Reading Routine + SQL Window Functions”`,
        missionDescription: 'Execute 6-step grammar & reading routine at 8:00 PM, and master ROW_NUMBER(), DENSE_RANK(), and LEAD/LAG.',
        focusCompetencies: ['English (Grammar & Reading)', 'SQL (Window Functions)', 'n8n Automation (Webhooks)'],
        tasks: [
          ...englishTasks,
          {
            id: `d${dayNumber}-t-sql`,
            category: 'SQL',
            title: 'Window Functions: ROW_NUMBER(), DENSE_RANK(), LEAD() & LAG()',
            duration: '40 min',
            impact: '+3 SQL Score',
            resourceName: 'DataLemur SQL Master Series',
            resourceUrl: 'https://datalemur.com/',
            notes: 'Calculate Month-over-Month growth directly in SQL using LAG(sales, 1) OVER (ORDER BY order_month).',
          },
          {
            id: `d${dayNumber}-t-n8n`,
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
      dayType: 'Challenge Day & Capstone Milestone (8:00 PM)',
      theme: 'Cambridge Write & Improve + Conversation Wheel + Sprint Milestone',
      missionTitle: `“Day ${dayNumber}: English Challenge Day & Capstone Milestone”`,
      missionDescription: 'Execute Cambridge Write & Improve, spin Conversation Wheel for 90-sec speech, and finalize sprint milestone.',
      isMilestoneDay: isMilestone,
      isSpacedRepetitionDay: true,
      focusCompetencies: ['English (Challenge & Voice Wheel)', 'Portfolio Milestone (SQL & Excel)', 'Sprint Review'],
      tasks: [
        ...englishTasks,
        {
          id: `d${dayNumber}-t-portfolio`,
          category: 'Portfolio Project',
          title: 'Milestone 1 Validation: E-Commerce SQL Warehouse & Excel Dynamic Model',
          duration: '45 min',
          impact: '+5 Portfolio Readiness',
          resourceName: 'GitHub Portfolio Repository Template',
          resourceUrl: 'https://github.com/',
          notes: 'Finalize schema DDL, test automated Excel KPI model, write README executive summary, commit to GitHub.',
        },
        {
          id: `d${dayNumber}-t-review`,
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

  // MONTHS 2 - 6: Complete 190 Days Curriculum with the EXACT English Protocol Integrated
  const technicalTasks: DayPlan['tasks'] = [];

  if (month === 2) {
    technicalTasks.push(
      {
        id: `d${dayNumber}-t-pbi`,
        category: 'Power BI',
        title: dayNumber % 2 === 0
          ? 'DAX CALCULATE() with ALL, ALLEXCEPT & Context Transition'
          : 'Executive Storytelling: Decomposition Trees & Anomaly Detection',
        duration: '40 min',
        impact: '+3 Power BI Score',
        resourceName: 'SQLBI Definitive Guide to DAX Ch. 5',
        resourceUrl: 'https://www.sqlbi.com/',
        notes: 'Author measures computing product cohort market share without context pollution.',
      },
      {
        id: `d${dayNumber}-t-pbi-opt`,
        category: 'Power BI',
        title: 'VertiPaq Engine Optimization: DAX Studio & Tabular Editor Audit',
        duration: '35 min',
        impact: '+3 Data Modeling Score',
        resourceName: 'DAX Studio Official',
        resourceUrl: 'https://daxstudio.org/',
        notes: 'Analyze storage engine vs formula engine timings; eliminate high-cardinality timestamps.',
      }
    );
  } else if (month === 3) {
    technicalTasks.push(
      {
        id: `d${dayNumber}-t-py`,
        category: 'Python',
        title: 'Polars vs. Pandas Benchmarking: Lazy Evaluation & Memory Streaming',
        duration: '40 min',
        impact: '+3 Python Score',
        resourceName: 'Python for Data Analysis (Wes McKinney) & Polars User Guide',
        resourceUrl: 'https://docs.pola.rs/',
        notes: 'Write expressions filtering 1M rows and computing cohort retention in under 2 seconds.',
      },
      {
        id: `d${dayNumber}-t-stats`,
        category: 'Statistics',
        title: 'Two-Sample Student t-Test & p-Value Interpretation (OpenStax Ch. 10)',
        duration: '35 min',
        impact: '+3 Statistics Score',
        resourceName: 'OpenStax Statistics 2e (Ch. 10)',
        resourceUrl: 'introductory-statistics-2e_-_WEB.pdf',
        notes: 'Derive null hypothesis H0 vs alternative Ha; evaluate Type I and Type II error risks.',
      }
    );
  } else if (month === 4) {
    technicalTasks.push(
      {
        id: `d${dayNumber}-t-ml`,
        category: 'Machine Learning',
        title: 'Feature Engineering: Target Encoding, Recency-Frequency & SMOTE',
        duration: '40 min',
        impact: '+3 ML Modeling Score',
        resourceName: 'Hands-On Machine Learning with Scikit-Learn',
        resourceUrl: 'https://scikit-learn.org/',
        notes: 'Handle extreme class imbalance on fraud/churn dataset using Synthetic Minority Over-sampling (SMOTE).',
      },
      {
        id: `d${dayNumber}-t-xgb`,
        category: 'Machine Learning',
        title: 'XGBoost & LightGBM Classification with Optuna Hyperparameter Tuning',
        duration: '40 min',
        impact: '+3 Algorithm Mastery',
        resourceName: 'XGBoost Official Python Documentation',
        resourceUrl: 'https://xgboost.readthedocs.io/',
        notes: 'Tune max_depth, learning_rate, and subsample using Optuna 5-fold cross-validation.',
      }
    );
  } else if (month === 5) {
    technicalTasks.push(
      {
        id: `d${dayNumber}-t-rag`,
        category: 'AI Engineering',
        title: 'Semantic Chunking & Dense Embeddings in Vector Store (Qdrant / Chroma)',
        duration: '40 min',
        impact: '+3 AI Architecture',
        resourceName: 'AI Engineering: Foundation Models (Ch. 5)',
        resourceUrl: 'AI Engineering.pdf',
        notes: 'Implement semantic chunking and index annual reports with metadata filtering by fiscal quarter.',
      },
      {
        id: `d${dayNumber}-t-langgraph`,
        category: 'AI Engineering',
        title: 'Text-to-SQL Self-Correction Loop with LangGraph Multi-Agent Workflows',
        duration: '45 min',
        impact: '+3 Agentic AI Skill',
        resourceName: 'LangGraph Documentation',
        resourceUrl: 'https://langchain-ai.github.io/langgraph/',
        notes: 'Construct agent that translates natural questions into PostgreSQL queries, catching syntax errors.',
      }
    );
  } else {
    // Month 6 & Beyond (up to 190 days)
    const isInterviewPhase = dayNumber >= 170;
    if (isInterviewPhase) {
      technicalTasks.push(
        {
          id: `d${dayNumber}-t-career`,
          category: 'Career & Interview',
          title: 'LinkedIn Profile Audit: Headline, Featured Projects & Skill Badges',
          duration: '40 min',
          impact: '+4 Recruiter Inbound',
          resourceName: 'Ace the Data Analyst Interview',
          resourceUrl: 'https://github.com/',
          notes: 'Align profile with keyword search algorithms (SQL, Power BI, DAX, Python, RAG, n8n).',
        },
        {
          id: `d${dayNumber}-t-mock`,
          category: 'Career & Interview',
          title: 'Live Technical SQL & BI Mock Interview Drills (Timed 45-Min Challenge)',
          duration: '45 min',
          impact: '+4 Technical Confidence',
          resourceName: 'DataLemur Interview Challenge Series',
          resourceUrl: 'https://datalemur.com/',
          notes: 'Solve 2 hard window function challenges under pressure while vocalizing thought process in English.',
        }
      );
    } else {
      technicalTasks.push(
        {
          id: `d${dayNumber}-t-n8n`,
          category: 'n8n Automation',
          title: 'n8n Automated ETL: Webhook Ingestion -> PostgreSQL Upsert -> Slack Brief',
          duration: '45 min',
          impact: '+3 Automation Skill',
          resourceName: 'n8n Official Academy',
          resourceUrl: 'https://academy.n8n.io/',
          notes: 'Deploy automated flow triggering on schedule, pulling daily KPIs, and dispatching formatted Slack blocks.',
        },
        {
          id: `d${dayNumber}-t-dl`,
          category: 'Deep Learning',
          title: 'PyTorch Custom Multi-Layer Perceptron (MLP) with AdamW & Early Stopping',
          duration: '40 min',
          impact: '+3 Neural Network Score',
          resourceName: 'Deep Learning with PyTorch (official)',
          resourceUrl: 'https://pytorch.org/tutorials/',
          notes: 'Train custom neural network on tabular embeddings with learning rate schedulers and validation checkpoints.',
        }
      );
    }
  }

  return {
    dayNumber,
    month,
    sprint,
    date: dateStr,
    dayOfWeek,
    dayType: `${dayOfWeek} Routine & ${month === 2 ? 'Power BI' : month === 3 ? 'Python & Stats' : month === 4 ? 'Machine Learning' : month === 5 ? 'RAG & AI' : 'Automation & Placement'}`,
    theme: `Month ${month} Sprint ${sprint.toString().padStart(2, '0')} Master Execution`,
    missionTitle: `“Day ${dayNumber}: ${dayOfWeek} Master Routine & Technical Execution”`,
    missionDescription: `Execute your dedicated ${dayOfWeek} English protocol with all prompts, links, and timing, combined with today's advanced technical modules.`,
    isMilestoneDay: isMilestone,
    isSpacedRepetitionDay: isSpacedRepetition,
    focusCompetencies: ['English Immersion', 'Technical Specialization', 'Daily Targets Reflection'],
    tasks: [...englishTasks, ...technicalTasks],
  };
}
