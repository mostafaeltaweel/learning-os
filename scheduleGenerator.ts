/**
 * scheduleGenerator.ts — Rewritten for the REAL Excel structure.
 *
 * Excel Structure (Mostafa Mohamed Practice Plan.xlsx):
 * ─────────────────────────────────────────────────────
 * Sheet 1: "Daily Plan"
 *   Rows 2-5 contain the weekly learning plan:
 *     R2: Mon & Thur (Session Days) — 2 days/week, recap session notes
 *     R3: Sun & Wed               — Grammar, Istoria, Youglish, Writing, Speed Test, Speaking
 *     R4: Sat & Tue               — Listening, Youglish, Writing, Speed Test, Speaking
 *     R5: Fri (Challenge Day)     — Cambridge Write&Improve, Conversation Wheel, Recap
 *   Column mapping:  C2=priority, C3=stepCount, C4=dayNames, C5-C10=steps 1-6
 *
 * Sheet 2: "Resources"
 *   R1 = header, R2+ = resources
 *   C2=Skill Area, C3=Resource Name, C4=Link/Access
 *
 * Sheet 3: "Daily Targets"
 *   R1 = header, R2+ = journal entries (one per day, ~30 days)
 *   C2=Day(date), C3=Tasks Completed(bool), C4=New Words, C5=Reflection
 *
 * This generator works OFFLINE — writes JSON files instead of Supabase.
 * When Supabase is ready, swap the write functions.
 */
import ExcelJS from 'exceljs';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import path from 'path';
import fs from 'fs';

dayjs.extend(isoWeek);

// ─── Helpers ────────────────────────────────────────────────────────────

function extractText(val: any): string {
  if (val === null || val === undefined) return '';
  if (typeof val === 'string') return val.trim();
  if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
  if (typeof val === 'number') return String(val);
  if (val instanceof Date) return val.toISOString();
  if (typeof val === 'object') {
    if ('richText' in val) return val.richText.map((rt: any) => rt.text).join('').trim();
    if ('text' in val) {
      const inner = val.text;
      if (typeof inner === 'object' && 'richText' in inner)
        return inner.richText.map((rt: any) => rt.text).join('').trim();
      return String(inner).trim();
    }
    if ('hyperlink' in val) return val.hyperlink;
  }
  return String(val).trim();
}

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

// ─── Interfaces ─────────────────────────────────────────────────────────

interface DayPlan {
  dayNames: string[];   // e.g. ["Sun", "Wed"]
  label: string;        // e.g. "Sun & Wed" or "Fri \"Challenge Day\""
  priority: number;     // sorting order from C2
  stepCount: number;    // from C3
  steps: string[];      // text of each step
}

interface Resource {
  id: string;
  skillArea: string;
  resourceName: string;
  linkOrAccess: string;
}

interface DailyTarget {
  day: string;          // ISO date
  tasksCompleted: boolean;
  newWordsLearned: string;
  reflection: string;
}

interface Milestone {
  id: string;
  month_number: number;
  title: string;
  description: string;
  status: string;
}

interface Sprint {
  id: string;
  sprint_number: number;
  sprint_name: string;
  goal: string;
  start_date: string;
  end_date: string;
  progress: number;
  status: string;
}

interface Task {
  id: string;
  title: string;
  skill_category: string;
  planned_date: string;
  planned_hours: number;
  completed_hours: number;
  status: string;
  resource: string;
  sprint_id: string | null;
  day_type: string;     // "Session", "Grammar & Vocab", "Listening & Vocab", "Challenge"
}

// ─── 1. Parse Daily Plan ────────────────────────────────────────────────

function parseDailyPlan(ws: ExcelJS.Worksheet): DayPlan[] {
  const plans: DayPlan[] = [];

  // Rows 2-5 contain the 4 day types
  for (let rn = 2; rn <= 5; rn++) {
    const row = ws.getRow(rn);
    const priorityRaw = extractText(row.getCell(2).value);
    const stepCountRaw = extractText(row.getCell(3).value);
    const dayNamesRaw = extractText(row.getCell(4).value);

    if (!dayNamesRaw) continue;

    // Parse day names: "Sun & Wed" → ["Sun", "Wed"]
    // Also handle multiline like "Mon & Thur\n\"Session days\""
    const firstLine = dayNamesRaw.split('\n')[0].trim();
    const dayNames = firstLine.split('&').map((d) => d.trim().replace(/"/g, ''));

    // Collect steps from C5-C10
    const steps: string[] = [];
    for (let c = 5; c <= 10; c++) {
      const step = extractText(row.getCell(c).value);
      if (step) steps.push(step);
    }

    plans.push({
      dayNames,
      label: dayNamesRaw.replace(/\n/g, ' ').trim(),
      priority: parseInt(priorityRaw) || rn,
      stepCount: parseInt(stepCountRaw) || steps.length,
      steps,
    });
  }

  return plans;
}

// ─── 2. Parse Resources ────────────────────────────────────────────────

function parseResources(ws: ExcelJS.Worksheet): Resource[] {
  const resources: Resource[] = [];

  ws.eachRow({ includeEmpty: false }, (row, rn) => {
    if (rn === 1) return; // header
    const skillArea = extractText(row.getCell(2).value);
    const resourceName = extractText(row.getCell(3).value);
    const linkOrAccess = extractText(row.getCell(4).value);

    if (!resourceName && !skillArea) return;

    resources.push({
      id: uuid(),
      skillArea: skillArea || '—',
      resourceName: resourceName || '—',
      linkOrAccess: linkOrAccess || '—',
    });
  });

  return resources;
}

// ─── 3. Parse Daily Targets ─────────────────────────────────────────────

function parseDailyTargets(ws: ExcelJS.Worksheet): DailyTarget[] {
  const targets: DailyTarget[] = [];

  ws.eachRow({ includeEmpty: false }, (row, rn) => {
    if (rn === 1) return; // header
    const dayRaw = extractText(row.getCell(2).value);
    if (!dayRaw) return;

    const day = dayjs(dayRaw).format('YYYY-MM-DD');
    if (day === 'Invalid Date') return;

    targets.push({
      day,
      tasksCompleted: extractText(row.getCell(3).value) === 'TRUE',
      newWordsLearned: extractText(row.getCell(4).value),
      reflection: extractText(row.getCell(5).value),
    });
  });

  return targets;
}

// ─── 4. Generate Milestones ─────────────────────────────────────────────

function generateMilestones(startDate: dayjs.Dayjs): Milestone[] {
  const milestones: Milestone[] = [];
  const monthDescriptions = [
    'Foundation: Grammar basics, Reading habit, Vocabulary building',
    'Building: Grammar intermediate, Listening practice, Writing sentences',
    'Expanding: Complex grammar, Longer reading, Speaking confidence',
    'Strengthening: Advanced grammar, Fluent reading, Daily speaking',
    'Polishing: Professional writing, Presentation skills, Interview prep',
    'Mastery: Job-ready English, Technical vocabulary, Confident communication',
  ];

  for (let m = 1; m <= 6; m++) {
    milestones.push({
      id: uuid(),
      month_number: m,
      title: `Month ${m}`,
      description: monthDescriptions[m - 1],
      status: m === 1 ? 'In Progress' : 'Planned',
    });
  }
  return milestones;
}

// ─── 5. Generate Sprints ────────────────────────────────────────────────

function generateSprints(startDate: dayjs.Dayjs): Sprint[] {
  const sprints: Sprint[] = [];
  for (let i = 1; i <= 24; i++) {
    const sprintStart = startDate.add((i - 1) * 7, 'day');
    const sprintEnd = sprintStart.add(6, 'day');
    sprints.push({
      id: uuid(),
      sprint_number: i,
      sprint_name: `Sprint ${i}`,
      goal: `Week ${i} learning goals`,
      start_date: sprintStart.format('YYYY-MM-DD'),
      end_date: sprintEnd.format('YYYY-MM-DD'),
      progress: 0,
      status: i === 1 ? 'In Progress' : 'Planned',
    });
  }
  return sprints;
}

// ─── 6. Generate Daily Tasks ────────────────────────────────────────────

function mapDayToPlan(dayOfWeek: number, plans: DayPlan[]): DayPlan | null {
  // dayOfWeek: 0=Sunday, 1=Monday, ... 6=Saturday
  const dayAbbr: Record<number, string[]> = {
    0: ['Sun'],
    1: ['Mon'],
    2: ['Tue'],
    3: ['Wed'],
    4: ['Thur', 'Thu'],
    5: ['Fri'],
    6: ['Sat'],
  };

  const abbrs = dayAbbr[dayOfWeek] || [];
  for (const plan of plans) {
    for (const pDay of plan.dayNames) {
      if (abbrs.some((a) => pDay.toLowerCase().includes(a.toLowerCase()))) {
        return plan;
      }
    }
  }
  return null;
}

function determineDayType(plan: DayPlan): string {
  const label = plan.label.toLowerCase();
  if (label.includes('session')) return 'Session Day';
  if (label.includes('challenge')) return 'Challenge Day';
  if (plan.steps.some((s) => s.toLowerCase().includes('grammar'))) return 'Grammar & Vocab Day';
  if (plan.steps.some((s) => s.toLowerCase().includes('listen'))) return 'Listening & Vocab Day';
  return 'Practice Day';
}

function generateTasks(
  plans: DayPlan[],
  sprints: Sprint[],
  startDate: dayjs.Dayjs,
  totalDays: number
): Task[] {
  const tasks: Task[] = [];

  for (let d = 0; d < totalDays; d++) {
    const currentDate = startDate.add(d, 'day');
    const dayOfWeek = currentDate.day(); // 0-6
    const dateStr = currentDate.format('YYYY-MM-DD');

    const plan = mapDayToPlan(dayOfWeek, plans);
    if (!plan) continue; // no plan for this day

    // Find matching sprint
    const sprint = sprints.find(
      (s) => dateStr >= s.start_date && dateStr <= s.end_date
    );

    const dayType = determineDayType(plan);

    // Create one task per step
    plan.steps.forEach((step, idx) => {
      // Determine skill category from step content
      let skillCategory = 'English';
      const stepLower = step.toLowerCase();
      if (stepLower.includes('speak') || stepLower.includes('chatgpt recording') || stepLower.includes('conversation wheel'))
        skillCategory = 'English - Speaking';
      else if (stepLower.includes('grammar lesson'))
        skillCategory = 'English - Grammar';
      else if (stepLower.includes('youglish') || stepLower.includes('pronunciation') || stepLower.includes('vocabulary'))
        skillCategory = 'English - Vocabulary';
      else if (stepLower.includes('read') || stepLower.includes('istoria'))
        skillCategory = 'English - Reading';
      else if (stepLower.includes('listen') || stepLower.includes('video'))
        skillCategory = 'English - Listening';
      else if (stepLower.includes('writ') || stepLower.includes('story') || stepLower.includes('speed typing'))
        skillCategory = 'English - Writing';
      else if (stepLower.includes('recap'))
        skillCategory = 'English - Review';

      tasks.push({
        id: uuid(),
        title: step.length > 200 ? step.substring(0, 197) + '...' : step,
        skill_category: skillCategory,
        planned_date: dateStr,
        planned_hours: 0.5, // ~30 min per step
        completed_hours: 0,
        status: 'Planned',
        resource: '',
        sprint_id: sprint?.id ?? null,
        day_type: dayType,
      });
    });
  }

  return tasks;
}

// ─── MAIN ───────────────────────────────────────────────────────────────

export async function generateSchedule(excelFilePath: string, outputDir: string) {
  console.log('='.repeat(60));
  console.log('  SCHEDULE GENERATOR — Processing Real Excel Data');
  console.log('='.repeat(60));
  console.log();

  // Ensure output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Read workbook
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(excelFilePath);

  // 1. Parse Daily Plan
  const dailyPlanSheet = wb.getWorksheet('Daily Plan');
  if (!dailyPlanSheet) throw new Error('Sheet "Daily Plan" not found');
  const plans = parseDailyPlan(dailyPlanSheet);
  console.log(`✅ Daily Plan parsed: ${plans.length} day types found`);
  plans.forEach((p) => {
    console.log(`   • ${p.label} → ${p.steps.length} steps`);
  });
  console.log();

  // 2. Parse Resources
  const resourcesSheet = wb.getWorksheet('Resources');
  if (!resourcesSheet) throw new Error('Sheet "Resources" not found');
  const resources = parseResources(resourcesSheet);
  console.log(`✅ Resources parsed: ${resources.length} resources found`);
  resources.forEach((r) => {
    console.log(`   • [${r.skillArea}] ${r.resourceName}`);
  });
  console.log();

  // 3. Parse Daily Targets (progress tracking)
  const dailyTargetsSheet = wb.getWorksheet('Daily Targets');
  if (!dailyTargetsSheet) throw new Error('Sheet "Daily Targets" not found');
  const dailyTargets = parseDailyTargets(dailyTargetsSheet);
  const completedCount = dailyTargets.filter((t) => t.tasksCompleted).length;
  console.log(`✅ Daily Targets parsed: ${dailyTargets.length} days tracked (${completedCount} completed)`);
  console.log();

  // 4. Generate structure
  const startDate = dayjs('2025-11-01'); // First date from Daily Targets
  const totalDays = 180; // 6 months

  const milestones = generateMilestones(startDate);
  console.log(`✅ Milestones generated: ${milestones.length}`);

  const sprints = generateSprints(startDate);
  console.log(`✅ Sprints generated: ${sprints.length}`);

  const tasks = generateTasks(plans, sprints, startDate, totalDays);
  console.log(`✅ Tasks generated: ${tasks.length}`);
  console.log();

  // Count tasks by category
  const categoryCount: Record<string, number> = {};
  tasks.forEach((t) => {
    categoryCount[t.skill_category] = (categoryCount[t.skill_category] || 0) + 1;
  });
  console.log('📊 Tasks by category:');
  Object.entries(categoryCount)
    .sort(([, a], [, b]) => b - a)
    .forEach(([cat, count]) => {
      console.log(`   ${cat}: ${count}`);
    });
  console.log();

  // Count tasks by day type
  const dayTypeCount: Record<string, number> = {};
  tasks.forEach((t) => {
    dayTypeCount[t.day_type] = (dayTypeCount[t.day_type] || 0) + 1;
  });
  console.log('📊 Tasks by day type:');
  Object.entries(dayTypeCount).forEach(([type, count]) => {
    console.log(`   ${type}: ${count}`);
  });
  console.log();

  // 5. Write output files (local JSON — replace with Supabase later)
  const outputData = {
    milestones,
    sprints,
    tasks,
    resources,
    dailyTargets,
    summary: {
      totalMilestones: milestones.length,
      totalSprints: sprints.length,
      totalTasks: tasks.length,
      totalResources: resources.length,
      totalDailyTargets: dailyTargets.length,
      completedDays: completedCount,
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: startDate.add(totalDays, 'day').format('YYYY-MM-DD'),
      tasksByCategory: categoryCount,
      tasksByDayType: dayTypeCount,
    },
  };

  // Write individual files
  fs.writeFileSync(path.join(outputDir, 'milestones.json'), JSON.stringify(milestones, null, 2));
  fs.writeFileSync(path.join(outputDir, 'sprints.json'), JSON.stringify(sprints, null, 2));
  fs.writeFileSync(path.join(outputDir, 'tasks.json'), JSON.stringify(tasks, null, 2));
  fs.writeFileSync(path.join(outputDir, 'resources.json'), JSON.stringify(resources, null, 2));
  fs.writeFileSync(path.join(outputDir, 'daily_targets.json'), JSON.stringify(dailyTargets, null, 2));
  fs.writeFileSync(path.join(outputDir, 'summary.json'), JSON.stringify(outputData.summary, null, 2));

  console.log('─'.repeat(60));
  console.log(`✅ All data written to: ${outputDir}`);
  console.log('   • milestones.json');
  console.log('   • sprints.json');
  console.log('   • tasks.json');
  console.log('   • resources.json');
  console.log('   • daily_targets.json');
  console.log('   • summary.json');
  console.log('─'.repeat(60));

  return outputData;
}

// ─── CLI Entry Point ────────────────────────────────────────────────────
if (require.main === module) {
  const excelFile = path.resolve(__dirname, 'Mostafa Mohamed Practice Plan.xlsx');
  const outputDir = path.resolve(__dirname, 'output');
  generateSchedule(excelFile, outputDir).catch((err) => {
    console.error('❌ FAILED:', err.message);
    process.exit(1);
  });
}

export default generateSchedule;
