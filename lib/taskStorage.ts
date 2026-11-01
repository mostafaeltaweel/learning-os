/**
 * taskStorage.ts
 * Browser-persistent task execution state, 180-Day curriculum integration,
 * full CRUD controls, user reflection notes, and daily completion logs.
 */

import { generate180DaysCurriculum, DayPlan } from './curriculum180Days';
import { syncTaskToCloud } from './supabaseClient';

export interface UserTask {
  id: string;
  category: string;
  title: string;
  duration: string;
  impact: string;
  resourceName: string;
  resourceUrl?: string;
  completed: boolean;
  notes: string;
  userPersonalNote?: string;
  dateAssigned: string; // YYYY-MM-DD
  dayNumber?: number;
  carriedOver?: boolean;
}

export interface DayPerformanceLog {
  date: string; // e.g. "2026-11-01"
  dayName: string;
  dayNumber: number;
  completedCount: number;
  totalCount: number;
  completionRate: number; // 0 to 100
  studyMinutes: number;
  status: 'Excelled' | 'Good' | 'Needs Improvement';
}

const STORAGE_TASKS_KEY = 'mostafa_practice_user_tasks_180';
const STORAGE_LOGS_KEY = 'mostafa_practice_performance_logs_180';

// In-memory static cache of the 180 days curriculum
let cached180Days: DayPlan[] | null = null;

export function get180DaysCurriculum(): DayPlan[] {
  if (!cached180Days) {
    cached180Days = generate180DaysCurriculum();
  }
  return cached180Days;
}

export function getPlanForDayNumber(dayNum: number): DayPlan | undefined {
  const all = get180DaysCurriculum();
  return all.find((d) => d.dayNumber === dayNum) || all[0];
}

export function getPlanForDate(dateStr: string): DayPlan | undefined {
  const all = get180DaysCurriculum();
  return all.find((d) => d.date === dateStr) || all[0];
}

/**
 * Retrieve tasks for a specific date (or day number)
 */
export function getStoredTasksForDate(targetDate: string): UserTask[] {
  const allPlans = get180DaysCurriculum();
  const dayMeta = allPlans.find((d) => d.date === targetDate) || allPlans[0];

  const defaultTasks: UserTask[] = dayMeta.tasks.map((t) => ({
    ...t,
    completed: false,
    dateAssigned: targetDate,
    dayNumber: dayMeta.dayNumber,
  }));

  if (typeof window === 'undefined') return defaultTasks;

  try {
    const raw = localStorage.getItem(STORAGE_TASKS_KEY);
    if (!raw) {
      // Initialize with this day's tasks
      localStorage.setItem(STORAGE_TASKS_KEY, JSON.stringify(defaultTasks));
      return defaultTasks;
    }

    const saved: UserTask[] = JSON.parse(raw);
    const forDate = saved.filter((t) => t.dateAssigned === targetDate);

    if (forDate.length === 0) {
      // Add default tasks for this date into storage
      const merged = [...saved, ...defaultTasks];
      localStorage.setItem(STORAGE_TASKS_KEY, JSON.stringify(merged));
      return defaultTasks;
    }

    return forDate;
  } catch (err) {
    console.error('Error reading stored tasks:', err);
    return defaultTasks;
  }
}

export function getAllStoredTasks(): UserTask[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_TASKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

export function saveUserTaskState(tasks: UserTask[]) {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(STORAGE_TASKS_KEY);
    const existing: UserTask[] = raw ? JSON.parse(raw) : [];
    const taskMap = new Map<string, UserTask>();

    existing.forEach((t) => taskMap.set(t.id, t));
    tasks.forEach((t) => taskMap.set(t.id, t));

    const updated = Array.from(taskMap.values());
    localStorage.setItem(STORAGE_TASKS_KEY, JSON.stringify(updated));

    // Background cloud sync to Supabase (if configured)
    tasks.forEach((t) => syncTaskToCloud(t));

    if (tasks.length > 0) {
      const targetDate = tasks[0].dateAssigned;
      const tasksOnDate = updated.filter((t) => t.dateAssigned === targetDate);
      const dayNum = tasks[0].dayNumber || 1;
      updateDayPerformanceLog(targetDate, tasksOnDate, dayNum);
    }
  } catch (err) {
    console.error('Error saving task state:', err);
  }
}

export function deleteTaskFromStorage(taskId: string, targetDate: string) {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(STORAGE_TASKS_KEY);
    if (!raw) return;
    const existing: UserTask[] = JSON.parse(raw);
    const filtered = existing.filter((t) => t.id !== taskId);
    localStorage.setItem(STORAGE_TASKS_KEY, JSON.stringify(filtered));

    const remainingForDate = filtered.filter((t) => t.dateAssigned === targetDate);
    const dayPlan = getPlanForDate(targetDate);
    updateDayPerformanceLog(targetDate, remainingForDate, dayPlan?.dayNumber || 1);
  } catch (err) {
    console.error('Error deleting task:', err);
  }
}

export function updateDayPerformanceLog(dateStr: string, todayTasks: UserTask[], dayNumber: number) {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(STORAGE_LOGS_KEY);
    let logs: DayPerformanceLog[] = raw ? JSON.parse(raw) : [];

    const completed = todayTasks.filter((t) => t.completed).length;
    const total = todayTasks.length;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
    const minutes = completed * 30;

    let status: DayPerformanceLog['status'] = 'Needs Improvement';
    if (rate >= 80) status = 'Excelled';
    else if (rate >= 50) status = 'Good';

    const existingIdx = logs.findIndex((l) => l.date === dateStr);
    const newEntry: DayPerformanceLog = {
      date: dateStr,
      dayNumber,
      dayName: new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' }),
      completedCount: completed,
      totalCount: total,
      completionRate: rate,
      studyMinutes: minutes,
      status,
    };

    if (existingIdx >= 0) {
      logs[existingIdx] = newEntry;
    } else {
      logs.push(newEntry);
    }

    localStorage.setItem(STORAGE_LOGS_KEY, JSON.stringify(logs));
  } catch (err) {
    console.error('Error updating logs:', err);
  }
}

export function getPerformanceHistory(): DayPerformanceLog[] {
  const defaultHistory: DayPerformanceLog[] = [
    { date: '2026-10-25', dayNumber: 1, dayName: 'Sun', completedCount: 5, totalCount: 5, completionRate: 100, studyMinutes: 150, status: 'Excelled' },
    { date: '2026-10-26', dayNumber: 2, dayName: 'Mon', completedCount: 2, totalCount: 5, completionRate: 40, studyMinutes: 60, status: 'Needs Improvement' },
    { date: '2026-10-27', dayNumber: 3, dayName: 'Tue', completedCount: 4, totalCount: 5, completionRate: 80, studyMinutes: 120, status: 'Excelled' },
    { date: '2026-10-28', dayNumber: 4, dayName: 'Wed', completedCount: 5, totalCount: 5, completionRate: 100, studyMinutes: 150, status: 'Excelled' },
    { date: '2026-10-29', dayNumber: 5, dayName: 'Thu', completedCount: 4, totalCount: 5, completionRate: 80, studyMinutes: 120, status: 'Excelled' },
    { date: '2026-10-30', dayNumber: 6, dayName: 'Fri', completedCount: 4, totalCount: 4, completionRate: 100, studyMinutes: 120, status: 'Excelled' },
    { date: '2026-10-31', dayNumber: 7, dayName: 'Sat', completedCount: 5, totalCount: 5, completionRate: 100, studyMinutes: 150, status: 'Excelled' },
    { date: '2026-11-01', dayNumber: 8, dayName: 'Sun', completedCount: 4, totalCount: 5, completionRate: 80, studyMinutes: 120, status: 'Excelled' },
  ];

  if (typeof window === 'undefined') return defaultHistory;
  try {
    const raw = localStorage.getItem(STORAGE_LOGS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_LOGS_KEY, JSON.stringify(defaultHistory));
      return defaultHistory;
    }
    const saved: DayPerformanceLog[] = JSON.parse(raw);
    return saved.length > 0 ? saved : defaultHistory;
  } catch (err) {
    return defaultHistory;
  }
}
