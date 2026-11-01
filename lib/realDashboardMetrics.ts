/**
 * realDashboardMetrics.ts
 * 100% Real, Dynamic Analytics Engine for Mostafa Mohamed Learning OS.
 * No hardcoded fake data, no simulated dates.
 * Everything is derived dynamically from:
 * 1. The 180-Day Curriculum (curriculum180Days.ts)
 * 2. Real user task completions and localStorage states (taskStorage.ts)
 */

import { DayPlan } from './curriculum180Days';
import { get180DaysCurriculum, getAllStoredTasks, getStoredTasksForDate, UserTask } from './taskStorage';

export interface RealCategoryDistribution {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

export interface RealSkillProficiency {
  skill: string;
  category: string;
  baseline: number;
  current: number;
  target: number;
  gap: number;
  completedTasks: number;
  totalTasks: number;
}

export interface RealDayVelocity {
  date: string;
  dayNumber: number;
  dayName: string;
  completedCount: number;
  totalCount: number;
  completionRate: number;
  status: 'Excelled' | 'Good' | 'Needs Improvement' | 'Pending';
}

export interface RealDashboardSummary {
  totalCurriculumTasks: number;
  totalCompletedTasks: number;
  overallProgressPercentage: number;
  activeDayNumber: number;
  activeDate: string;
  todayCompletedCount: number;
  todayTotalCount: number;
  todayProgressPercentage: number;
  realJobReadinessScore: number;
  categoryDistribution: RealCategoryDistribution[];
  skillProficiency: RealSkillProficiency[];
  velocityHistory: RealDayVelocity[];
  todayTasks: UserTask[];
}

const categoryColors: Record<string, string> = {
  SQL: '#0078D4',
  'Power BI': '#FFB900',
  Excel: '#107C41',
  Python: '#6B69D6',
  Statistics: '#8764B8',
  'Data Analysis': '#00B7C3',
  'Machine Learning': '#E3008C',
  'AI Engineering': '#004E8C',
  'Deep Learning': '#4F4B7E',
  'n8n Automation': '#D83B01',
  English: '#107C41',
  'Portfolio Project': '#D13438',
  'Career & Interview': '#008272',
  'Review & Planning': '#797775',
};

// Official baselines from Talkora assessment and initial skills review
const baselineScores: Record<string, number> = {
  English: 35, // Talkora A1+ Diagnostic baseline
  SQL: 40,
  Excel: 55,
  'Power BI': 30,
  Python: 20,
  Statistics: 35,
  'Data Analysis': 40,
  'Machine Learning': 15,
  'AI Engineering': 15,
  'Deep Learning': 10,
  'n8n Automation': 10,
  'Portfolio Project': 10,
  'Career & Interview': 20,
};

const targetScores: Record<string, number> = {
  English: 75,
  SQL: 90,
  Excel: 85,
  'Power BI': 90,
  Python: 85,
  Statistics: 85,
  'Data Analysis': 90,
  'Machine Learning': 80,
  'AI Engineering': 85,
  'Deep Learning': 75,
  'n8n Automation': 80,
  'Portfolio Project': 95,
  'Career & Interview': 90,
};

export function computeRealDashboardMetrics(activeDayNumber = 1): RealDashboardSummary {
  const allCurriculum = get180DaysCurriculum();
  const allStored = getAllStoredTasks();

  // 1. Total Curriculum Tasks
  let totalCurriculumTasks = 0;
  const categoryCountMap: Record<string, number> = {};

  allCurriculum.forEach((day) => {
    day.tasks.forEach((t) => {
      totalCurriculumTasks++;
      categoryCountMap[t.category] = (categoryCountMap[t.category] || 0) + 1;
    });
  });

  // 2. Real Completed Tasks Map
  const completedTaskMap = new Set<string>();
  const completedByCategory: Record<string, number> = {};

  allStored.forEach((t) => {
    if (t.completed) {
      completedTaskMap.add(t.id);
      completedByCategory[t.category] = (completedByCategory[t.category] || 0) + 1;
    }
  });

  const totalCompletedTasks = completedTaskMap.size;
  const overallProgressPercentage =
    totalCurriculumTasks > 0 ? Math.round((totalCompletedTasks / totalCurriculumTasks) * 100) : 0;

  // 3. Real Category Distribution for Pie Chart (100% from actual curriculum)
  const categoryDistribution: RealCategoryDistribution[] = Object.entries(categoryCountMap).map(
    ([catName, count]) => ({
      name: catName,
      count,
      percentage: Math.round((count / totalCurriculumTasks) * 100),
      color: categoryColors[catName] || '#0078D4',
    })
  );

  // 4. Real Skill Proficiency for Bar Chart (Calculated from completed tasks)
  const majorSkills = [
    'SQL',
    'Power BI',
    'Excel',
    'Statistics',
    'Python',
    'English',
    'Machine Learning',
    'AI Engineering',
    'n8n Automation',
  ];

  const skillProficiency: RealSkillProficiency[] = majorSkills.map((skill) => {
    const totalInCat = categoryCountMap[skill] || 1;
    const doneInCat = completedByCategory[skill] || 0;
    const base = baselineScores[skill] || 25;
    const target = targetScores[skill] || 85;

    // Progress moves from baseline toward target as tasks are checked off
    const earned = Math.round((doneInCat / totalInCat) * (target - base));
    const current = Math.min(target, base + earned);
    const gap = Math.max(0, target - current);

    return {
      skill,
      category: skill,
      baseline: base,
      current,
      target,
      gap,
      completedTasks: doneInCat,
      totalTasks: totalInCat,
    };
  });

  // 5. Real Job Readiness Score (Market Weighted)
  const marketWeights: Record<string, number> = {
    SQL: 0.25,
    'Power BI': 0.25,
    Excel: 0.15,
    English: 0.15,
    Python: 0.10,
    Statistics: 0.10,
  };

  let weightedSum = 0;
  let totalWeight = 0;
  skillProficiency.forEach((sp) => {
    const w = marketWeights[sp.skill];
    if (w) {
      weightedSum += sp.current * w;
      totalWeight += w;
    }
  });
  const realJobReadinessScore = totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 38;

  // 6. Active Day & Today's Real Tasks
  const activePlan: DayPlan = allCurriculum.find((d) => d.dayNumber === activeDayNumber) || allCurriculum[0];
  const todayTasks: UserTask[] = getStoredTasksForDate(activePlan.date);
  const todayCompletedCount = todayTasks.filter((t) => t.completed).length;
  const todayTotalCount = todayTasks.length;
  const todayProgressPercentage =
    todayTotalCount > 0 ? Math.round((todayCompletedCount / todayTotalCount) * 100) : 0;

  // 7. Real Sprint 01 Velocity History (7 Real Days starting 2026-11-01)
  // Instead of fake dummy history from October, this reflects the REAL 7 days of Sprint 01!
  const sprint01Plans = allCurriculum.filter((d) => d.sprint === 1);
  const velocityHistory: RealDayVelocity[] = sprint01Plans.map((d) => {
    const dayTasks = getStoredTasksForDate(d.date);
    const completed = dayTasks.filter((t) => t.completed).length;
    const total = dayTasks.length;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

    let status: RealDayVelocity['status'] = 'Pending';
    if (completed > 0) {
      if (rate >= 80) status = 'Excelled';
      else if (rate >= 50) status = 'Good';
      else status = 'Needs Improvement';
    }

    return {
      date: d.date,
      dayNumber: d.dayNumber,
      dayName: d.dayOfWeek.slice(0, 3) + ' ' + d.date.slice(5),
      completedCount: completed,
      totalCount: total,
      completionRate: rate,
      status,
    };
  });

  return {
    totalCurriculumTasks,
    totalCompletedTasks,
    overallProgressPercentage,
    activeDayNumber: activePlan.dayNumber,
    activeDate: activePlan.date,
    todayCompletedCount,
    todayTotalCount,
    todayProgressPercentage,
    realJobReadinessScore,
    categoryDistribution,
    skillProficiency,
    velocityHistory,
    todayTasks,
  };
}
