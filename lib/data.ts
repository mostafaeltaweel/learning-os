import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = path.resolve(process.cwd(), 'output');

function readJsonFile<T>(fileName: string, fallback: T): T {
  try {
    const filePath = path.join(OUTPUT_DIR, fileName);
    if (!fs.existsSync(filePath)) return fallback;
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch (err) {
    console.error(`Error loading ${fileName}:`, err);
    return fallback;
  }
}

export interface Task {
  id: string;
  title: string;
  skill_category: string;
  planned_date: string;
  planned_hours: number;
  completed_hours: number;
  status: 'Planned' | 'In Progress' | 'Need Review' | 'Blocked' | 'Completed';
  resource?: string;
  sprint_id: string | null;
  day_type?: string;
}

export interface Sprint {
  id: string;
  sprint_number: number;
  sprint_name: string;
  goal: string;
  start_date: string;
  end_date: string;
  progress: number;
  status: string;
}

export interface Milestone {
  id: string;
  month_number: number;
  title: string;
  description: string;
  status: string;
}

export interface ModuleCompetency {
  id: string;
  module_name: string;
  current_level: string;
  target_level: string;
  progress: number;
}

export interface CompetencyHistory {
  id: string;
  module_name: string;
  score: number;
  evaluation_date: string;
  notes: string;
}

export interface ResourceItem {
  id: string;
  skillArea: string;
  resourceName: string;
  linkOrAccess: string;
}

export interface DailyTarget {
  day: string;
  tasksCompleted: boolean;
  newWordsLearned: string;
  reflection: string;
}

export interface CertificateCourse {
  num: number;
  name: string;
  status: string;
  pct: number;
  target_month: string;
}

export interface PortfolioProject {
  id: string;
  month: number;
  title: string;
  domain: string;
  tech: string;
  status: string;
  impact: string;
}

export interface CareerStage {
  stage: string;
  target: number;
  actual: number;
  rate: string;
  status: string;
}

export function getLearningData() {
  const tasks = readJsonFile<Task[]>('tasks.json', []);
  const sprints = readJsonFile<Sprint[]>('sprints.json', []);
  const milestones = readJsonFile<Milestone[]>('milestones.json', []);
  const competencies = readJsonFile<ModuleCompetency[]>('module_competency.json', []);
  const competencyHistory = readJsonFile<CompetencyHistory[]>('competency_history.json', []);
  const resources = readJsonFile<ResourceItem[]>('resources.json', []);
  const dailyTargets = readJsonFile<DailyTarget[]>('daily_targets.json', []);
  const certificateProgress = readJsonFile<CertificateCourse[]>('certificate_progress.json', []);
  const portfolioProjects = readJsonFile<PortfolioProject[]>('portfolio_projects.json', []);
  const careerTracking = readJsonFile<CareerStage[]>('career_tracking.json', []);

  // Compute Job Readiness Score (Market Weighted)
  const weights: Record<string, number> = {
    SQL: 0.25,
    'Power BI': 0.25,
    English: 0.15,
    Python: 0.15,
    Statistics: 0.10,
    'Agentic AI': 0.05,
    'Interview Skills': 0.05,
  };

  let totalWeighted = 0;
  let totalWeight = 0;
  competencies.forEach((c) => {
    const w = weights[c.module_name] || 0.05;
    totalWeighted += c.progress * w;
    totalWeight += w;
  });
  const jobReadinessScore = totalWeight > 0 ? Math.round(totalWeighted / totalWeight) : 0;

  const currentSprint = sprints.find((s) => s.status === 'In Progress') || sprints[0];
  const upcomingMilestone = milestones.find((m) => m.status === 'In Progress') || milestones[0];

  return {
    tasks,
    sprints,
    milestones,
    competencies,
    competencyHistory,
    resources,
    dailyTargets,
    certificateProgress,
    portfolioProjects,
    careerTracking,
    jobReadinessScore,
    currentSprint,
    upcomingMilestone,
  };
}
