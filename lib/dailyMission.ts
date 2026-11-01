export interface DailyMissionTask {
  id: string;
  category: 'English' | 'SQL' | 'Power BI' | 'Python' | 'Statistics' | 'AI / Google Analytics';
  trackPercentage: string; // e.g. "30%"
  title: string;
  duration: string; // e.g. "30 min"
  impact: string; // e.g. "+2 Grammar Score"
  resourceName: string;
  resourceUrl?: string;
  completed: boolean;
  notes: string;
}

export interface DayMissionPlan {
  dayName: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  dayType: string;
  quote: string;
  primaryFocus: string;
  targetJobReadinessGain: string;
  tasks: DailyMissionTask[];
  tomorrowPreview: {
    dayName: string;
    dayType: string;
    highlights: string[];
  };
}

export const dailyPlans: Record<string, DayMissionPlan> = {
  Sunday: {
    dayName: 'Sunday',
    dayType: 'Grammar & Vocabulary Day',
    quote: 'Become 1% Better Than Yesterday',
    primaryFocus: 'Grammar Accuracy & SQL Relational Joins',
    targetJobReadinessGain: '+0.5% Today',
    tasks: [
      {
        id: 'sun-1',
        category: 'English',
        trackPercentage: '30%',
        title: 'Grammar Lesson: Verb Tenses Consistency (Past vs. Present)',
        duration: '25 min',
        impact: '+2 Grammar Score',
        resourceName: 'ZAmericanEnglish + Talkora Diagnostic Notes',
        resourceUrl: 'https://www.youtube.com/watch?v=jXgOjgokSgI&list=PLp22-4PivYmLBmV2wctgqyyRlIs1MhmNr',
        completed: true,
        notes: 'Fix pattern: "This take 6 month" -> "This took 6 months"',
      },
      {
        id: 'sun-2',
        category: 'English',
        trackPercentage: '30%',
        title: 'Istoria Reading & Extract 3 Words with Youglish Pronunciation',
        duration: '20 min',
        impact: '+2 Vocab & Speaking',
        resourceName: 'Istoria App + Youglish.com',
        resourceUrl: 'https://youglish.com/',
        completed: true,
        notes: 'Pronounce TH in think/things and verify with native clips',
      },
      {
        id: 'sun-3',
        category: 'SQL',
        trackPercentage: '20%',
        title: 'Master INNER JOIN vs. LEFT OUTER JOIN on Orders & Customers',
        duration: '35 min',
        impact: '+2 SQL Score',
        resourceName: 'SQL Practice Warehouse / DataLemur',
        resourceUrl: 'https://datalemur.com/',
        completed: true,
        notes: 'Solve 3 multi-table query exercises',
      },
      {
        id: 'sun-4',
        category: 'Power BI',
        trackPercentage: '20%',
        title: 'DAX CALCULATE() with FILTER() Context Transition Drill',
        duration: '30 min',
        impact: '+2 Power BI Score',
        resourceName: 'Microsoft Learn Power BI DAX Guide',
        resourceUrl: 'https://learn.microsoft.com/power-bi/',
        completed: false,
        notes: 'Calculate Total Sales for Europe only using CALCULATE',
      },
      {
        id: 'sun-5',
        category: 'Python',
        trackPercentage: '15%',
        title: 'Pandas DataFrame Filtering with .loc[] and Boolean Masks',
        duration: '25 min',
        impact: '+1 Python Score',
        resourceName: 'Python for Data Analysis Book',
        resourceUrl: 'https://wesmckinney.com/book/',
        completed: false,
        notes: 'Filter customers with purchases > $500',
      },
      {
        id: 'sun-6',
        category: 'Statistics',
        trackPercentage: '10%',
        title: 'Central Limit Theorem & Sampling Error Practical Understanding',
        duration: '20 min',
        impact: '+1 Statistics Score',
        resourceName: 'OpenStax Introductory Statistics',
        resourceUrl: 'https://openstax.org/details/books/introductory-statistics',
        completed: false,
        notes: 'Understand why sample size n >= 30 yields normal distribution',
      },
      {
        id: 'sun-7',
        category: 'AI / Google Analytics',
        trackPercentage: '5%',
        title: 'Google Data Analytics Course 3: Data Integrity & Cleaning Ethics',
        duration: '20 min',
        impact: '+0.5% Google Certificate',
        resourceName: 'Google Data Analytics Transcript (Dec 2025)',
        resourceUrl: 'https://grow.google/certificates/data-analytics/',
        completed: false,
        notes: 'Verify missing data handling principles',
      },
    ],
    tomorrowPreview: {
      dayName: 'Monday',
      dayType: 'Session Review & Star Schema Day',
      highlights: [
        'English: Talkora Session Notes Recap & Plural Noun rules',
        'SQL: Multi-table JOINs across 3 normalized tables',
        'Power BI: Star Schema 1-to-many relationship cardinality',
        'Python: Handling missing values with .dropna() and .fillna()',
      ],
    },
  },
  Monday: {
    dayName: 'Monday',
    dayType: 'Session Review & Star Schema Day',
    quote: 'Consolidate Fundamentals Before Scaling',
    primaryFocus: 'Notes Recap & Dimensional Modeling',
    targetJobReadinessGain: '+0.4% Today',
    tasks: [
      {
        id: 'mon-1',
        category: 'English',
        trackPercentage: '30%',
        title: 'Session Notes Recap: Plural Nouns & Subject-Verb Agreement',
        duration: '25 min',
        impact: '+2 English Review',
        resourceName: 'Talkora Trail Session Diagnostic Sheet',
        completed: false,
        notes: 'Check: "There is a lot of things" -> "There are a lot of things"',
      },
      {
        id: 'mon-2',
        category: 'SQL',
        trackPercentage: '20%',
        title: 'Multi-Table JOINs on 3 Normalized Tables (Sales, Products, Stores)',
        duration: '35 min',
        impact: '+2 SQL Score',
        resourceName: 'SQL Server Labs',
        completed: false,
        notes: 'Write complex JOINs with aliases and filtering',
      },
      {
        id: 'mon-3',
        category: 'Power BI',
        trackPercentage: '20%',
        title: 'Star Schema Design: Fact Sales vs. Dim Customers & Dim Dates',
        duration: '30 min',
        impact: '+2 Power BI Score',
        resourceName: 'DAX Data Modeling Guide',
        completed: false,
        notes: 'Eliminate bidirectional cross-filtering to optimize speed',
      },
      {
        id: 'mon-4',
        category: 'Python',
        trackPercentage: '15%',
        title: 'Data Cleaning: Handling Nulls and Casting Data Types in Pandas',
        duration: '25 min',
        impact: '+1 Python Score',
        resourceName: 'Pandas Cleaning Documentation',
        completed: false,
        notes: 'Clean messy currency and date strings',
      },
      {
        id: 'mon-5',
        category: 'Statistics',
        trackPercentage: '10%',
        title: 'Variance & Standard Deviation Calculation in Business Context',
        duration: '20 min',
        impact: '+1 Statistics Score',
        resourceName: 'Business Analytics Primer',
        completed: false,
        notes: 'Understand standard deviation in revenue volatility',
      },
    ],
    tomorrowPreview: {
      dayName: 'Tuesday',
      dayType: 'Listening & Self JOINs Day',
      highlights: [
        'English: Listening Time podcast + /b/ vs. /p/ pronunciation',
        'SQL: Self JOINs and hierarchical employee-manager queries',
        'Power BI: Time Intelligence YTD and MTD measures',
      ],
    },
  },
};

export function getTodayMission(dayOverride?: string): DayMissionPlan {
  if (dayOverride && dailyPlans[dayOverride]) {
    return dailyPlans[dayOverride];
  }
  // Default to Sunday as our primary rich execution model
  return dailyPlans['Sunday'];
}
