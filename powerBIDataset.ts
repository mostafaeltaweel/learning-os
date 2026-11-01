/**
 * powerBIDataset.ts — Phase 3A Full Extension
 * Generates all datasets required to power the 9-Page Power BI Storytelling Dashboard.
 */
import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const DATASETS_DIR = path.join(OUTPUT_DIR, 'datasets');

function loadJSON(fileName: string): any[] {
  const filePath = path.join(OUTPUT_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export async function generateAllPowerBIDatasets() {
  if (!fs.existsSync(DATASETS_DIR)) {
    fs.mkdirSync(DATASETS_DIR, { recursive: true });
  }

  const tasks = loadJSON('tasks.json');
  const competency = loadJSON('competency_history.json');
  const moduleComp = loadJSON('module_competency.json');
  const resources = loadJSON('resources.json');
  const milestones = loadJSON('milestones.json');
  const sprints = loadJSON('sprints.json');
  const dailyTargets = loadJSON('daily_targets.json');

  // ────────────────────────────────────────────────────────────────
  // 1️⃣ schedule.xlsx — Tasks, Sprints, Milestones, and Date Dimension
  // ────────────────────────────────────────────────────────────────
  const scheduleWb = new ExcelJS.Workbook();
  
  // Sheet 1: Tasks
  const wsTasks = scheduleWb.addWorksheet('Fact_Tasks');
  wsTasks.columns = [
    { header: 'Task_ID', key: 'id', width: 38 },
    { header: 'Title', key: 'title', width: 60 },
    { header: 'Skill_Category', key: 'skill_category', width: 25 },
    { header: 'Planned_Date', key: 'planned_date', width: 14 },
    { header: 'Planned_Hours', key: 'planned_hours', width: 14 },
    { header: 'Completed_Hours', key: 'completed_hours', width: 16 },
    { header: 'Status', key: 'status', width: 12 },
    { header: 'Day_Type', key: 'day_type', width: 22 },
    { header: 'Sprint_ID', key: 'sprint_id', width: 38 },
  ];
  wsTasks.getRow(1).font = { bold: true };
  tasks.forEach((t: any) => wsTasks.addRow(t));

  // Sheet 2: Dim_Sprints
  const wsSprints = scheduleWb.addWorksheet('Dim_Sprints');
  wsSprints.columns = [
    { header: 'Sprint_ID', key: 'id', width: 38 },
    { header: 'Sprint_Number', key: 'sprint_number', width: 12 },
    { header: 'Sprint_Name', key: 'sprint_name', width: 16 },
    { header: 'Goal', key: 'goal', width: 35 },
    { header: 'Start_Date', key: 'start_date', width: 14 },
    { header: 'End_Date', key: 'end_date', width: 14 },
    { header: 'Progress', key: 'progress', width: 10 },
    { header: 'Status', key: 'status', width: 12 },
  ];
  wsSprints.getRow(1).font = { bold: true };
  sprints.forEach((s: any) => wsSprints.addRow(s));

  // Sheet 3: Dim_Milestones
  const wsMilestones = scheduleWb.addWorksheet('Dim_Milestones');
  wsMilestones.columns = [
    { header: 'Milestone_ID', key: 'id', width: 38 },
    { header: 'Month_Number', key: 'month_number', width: 12 },
    { header: 'Title', key: 'title', width: 20 },
    { header: 'Description', key: 'description', width: 65 },
    { header: 'Status', key: 'status', width: 15 },
  ];
  wsMilestones.getRow(1).font = { bold: true };
  milestones.forEach((m: any) => wsMilestones.addRow(m));

  // Sheet 4: Dim_Date (Master Calendar)
  const wsCalendar = scheduleWb.addWorksheet('Dim_Date');
  wsCalendar.columns = [
    { header: 'Date', key: 'date', width: 14 },
    { header: 'Year', key: 'year', width: 10 },
    { header: 'Month_Name', key: 'month_name', width: 14 },
    { header: 'Month_Number', key: 'month_num', width: 12 },
    { header: 'Week_Number', key: 'week_num', width: 12 },
    { header: 'Day_Name', key: 'day_name', width: 12 },
    { header: 'Is_Weekend', key: 'is_weekend', width: 12 },
  ];
  wsCalendar.getRow(1).font = { bold: true };

  const calStart = dayjs('2025-11-01');
  for (let i = 0; i < 210; i++) {
    const cur = calStart.add(i, 'day');
    wsCalendar.addRow({
      date: cur.format('YYYY-MM-DD'),
      year: cur.year(),
      month_name: cur.format('MMMM'),
      month_num: cur.month() + 1,
      week_num: cur.isoWeek(),
      day_name: cur.format('dddd'),
      is_weekend: cur.day() === 5 || cur.day() === 6 ? 'Yes' : 'No', // Fri/Sat weekend
    });
  }

  await scheduleWb.xlsx.writeFile(path.join(DATASETS_DIR, 'schedule.xlsx'));

  // ────────────────────────────────────────────────────────────────
  // 2️⃣ skill_tracker.xlsx — Competencies, History, and Radar Weights
  // ────────────────────────────────────────────────────────────────
  const skillWb = new ExcelJS.Workbook();
  const wsHistory = skillWb.addWorksheet('Fact_CompetencyHistory');
  wsHistory.columns = [
    { header: 'Module_Name', key: 'module_name', width: 20 },
    { header: 'Score', key: 'score', width: 12 },
    { header: 'Evaluation_Date', key: 'evaluation_date', width: 16 },
    { header: 'Notes', key: 'notes', width: 45 },
  ];
  wsHistory.getRow(1).font = { bold: true };
  competency.forEach((c: any) => wsHistory.addRow(c));

  const wsCurrent = skillWb.addWorksheet('Dim_CompetencyMatrix');
  wsCurrent.columns = [
    { header: 'Module_Name', key: 'module_name', width: 20 },
    { header: 'Current_Level', key: 'current_level', width: 16 },
    { header: 'Target_Level', key: 'target_level', width: 14 },
    { header: 'Progress', key: 'progress', width: 10 },
    { header: 'Job_Weight', key: 'weight', width: 12 }, // Weight for Job Readiness Score
  ];
  wsCurrent.getRow(1).font = { bold: true };
  const weights: Record<string, number> = {
    SQL: 0.25,
    'Power BI': 0.25,
    Python: 0.15,
    Statistics: 0.10,
    English: 0.15,
    'Agentic AI': 0.05,
    'Interview Skills': 0.05,
  };
  moduleComp.forEach((m: any) => {
    wsCurrent.addRow({
      ...m,
      weight: weights[m.module_name] || 0.1,
    });
  });

  await skillWb.xlsx.writeFile(path.join(DATASETS_DIR, 'skill_tracker.xlsx'));

  // ────────────────────────────────────────────────────────────────
  // 3️⃣ progress_log.xlsx — Daily Journal & English Immersion Metrics
  // ────────────────────────────────────────────────────────────────
  const progressWb = new ExcelJS.Workbook();
  const wsDaily = progressWb.addWorksheet('Fact_DailyJournal');
  wsDaily.columns = [
    { header: 'Day', key: 'day', width: 14 },
    { header: 'Tasks_Completed', key: 'tasksCompleted', width: 16 },
    { header: 'New_Words_Learned', key: 'newWordsLearned', width: 45 },
    { header: 'Reflection', key: 'reflection', width: 45 },
    { header: 'Vocabulary_Count', key: 'vocab_count', width: 16 },
    { header: 'Speaking_Practice_Min', key: 'speaking_min', width: 22 },
  ];
  wsDaily.getRow(1).font = { bold: true };
  dailyTargets.forEach((d: any) => {
    // derive metrics: each journal day with entry adds ~3 target words
    const hasWords = d.newWordsLearned && d.newWordsLearned.length > 25;
    wsDaily.addRow({
      day: d.day,
      tasksCompleted: d.tasksCompleted ? 'Completed' : 'Pending',
      newWordsLearned: d.newWordsLearned || '',
      reflection: d.reflection || '',
      vocab_count: d.tasksCompleted ? 3 : 0,
      speaking_min: d.tasksCompleted ? 15 : 0,
    });
  });

  await progressWb.xlsx.writeFile(path.join(DATASETS_DIR, 'progress_log.xlsx'));

  // ────────────────────────────────────────────────────────────────
  // 4️⃣ career_and_portfolio.xlsx — Pages 2, 6, 7, 8 & 9 Support
  // ────────────────────────────────────────────────────────────────
  const careerWb = new ExcelJS.Workbook();

  // Sheet 1: Page 6 - Portfolio Projects
  const wsPortfolio = careerWb.addWorksheet('Dim_PortfolioProjects');
  wsPortfolio.columns = [
    { header: 'Project_ID', key: 'id', width: 12 },
    { header: 'Month', key: 'month', width: 10 },
    { header: 'Title', key: 'title', width: 35 },
    { header: 'Focus_Domain', key: 'domain', width: 25 },
    { header: 'Tech_Stack', key: 'tech', width: 30 },
    { header: 'Status', key: 'status', width: 15 },
    { header: 'Business_Impact', key: 'impact', width: 45 },
  ];
  wsPortfolio.getRow(1).font = { bold: true };
  const projects = [
    { id: 'PRJ-M1', month: 1, title: 'Retail Sales & Inventory SQL Warehouse', domain: 'E-Commerce / Retail', tech: 'SQL Server, Schema Design', status: 'Completed', impact: 'Clean database schema with 10 complex KPIs' },
    { id: 'PRJ-M2', month: 2, title: 'Executive Sales & Finance Power BI Dashboard', domain: 'Business Intelligence', tech: 'Power BI, DAX, Storytelling', status: 'In Progress', impact: 'Interactive multi-page board for C-suite' },
    { id: 'PRJ-M3', month: 3, title: 'Customer Churn & Retention Statistical EDA', domain: 'Telecom / Subscription', tech: 'Python (Pandas, Seaborn), Stats', status: 'Planned', impact: 'Cohort retention curves & churn drivers' },
    { id: 'PRJ-M4', month: 4, title: 'End-to-End Automated ETL & Analytics Pipeline', domain: 'Data Engineering', tech: 'Python, PostgreSQL, Fastify', status: 'Planned', impact: 'Daily automated data refresh pipeline' },
    { id: 'PRJ-M5', month: 5, title: 'Healthcare Patient Attendance Analytics', domain: 'Healthcare Operations', tech: 'Power BI, SQL, Python', status: 'Planned', impact: 'No-show prediction & resource optimization' },
    { id: 'PRJ-M6', month: 6, title: 'Enterprise BI Capstone & Agentic AI Assistant', domain: 'BI + Agentic AI', tech: 'Power BI, LLM / LangChain, SQL', status: 'Planned', impact: 'Natural language Q&A over enterprise datasets' },
  ];
  projects.forEach((p) => wsPortfolio.addRow(p));

  // Sheet 2: Page 7 - Career Tracking Pipeline
  const wsCareer = careerWb.addWorksheet('Fact_CareerTracking');
  wsCareer.columns = [
    { header: 'Stage', key: 'stage', width: 25 },
    { header: 'Target_Count', key: 'target', width: 15 },
    { header: 'Actual_Count', key: 'actual', width: 15 },
    { header: 'Conversion_Rate', key: 'rate', width: 18 },
  ];
  wsCareer.getRow(1).font = { bold: true };
  const careerStages = [
    { stage: '1. LinkedIn Profile Optimization', target: 100, actual: 85, rate: '85%' },
    { stage: '2. Professional Connections', target: 500, actual: 210, rate: '42%' },
    { stage: '3. Job Applications Sent', target: 60, actual: 12, rate: '20%' },
    { stage: '4. HR / Recruiter Screenings', target: 15, actual: 3, rate: '20%' },
    { stage: '5. Technical BI Interviews', target: 8, actual: 1, rate: '12.5%' },
    { stage: '6. Final Job Offers', target: 2, actual: 0, rate: '0%' },
  ];
  careerStages.forEach((cs) => wsCareer.addRow(cs));

  // Sheet 3: Page 8 - Google Data Analytics Certificate Progress
  const wsCert = careerWb.addWorksheet('Dim_GoogleCertificate');
  wsCert.columns = [
    { header: 'Course_Number', key: 'num', width: 14 },
    { header: 'Course_Name', key: 'name', width: 45 },
    { header: 'Status', key: 'status', width: 15 },
    { header: 'Completion_Percent', key: 'pct', width: 20 },
    { header: 'Target_Month', key: 'target_month', width: 15 },
  ];
  wsCert.getRow(1).font = { bold: true };
  const certCourses = [
    { num: 1, name: 'Foundations: Data, Data, Everywhere', status: 'Completed', pct: 1.0, target_month: 'Month 1' },
    { num: 2, name: 'Ask Questions to Make Data-Driven Decisions', status: 'Completed', pct: 1.0, target_month: 'Month 1' },
    { num: 3, name: 'Prepare Data for Exploration', status: 'In Progress', pct: 0.65, target_month: 'Month 2' },
    { num: 4, name: 'Process Data from Dirty to Clean', status: 'Planned', pct: 0.0, target_month: 'Month 2' },
    { num: 5, name: 'Analyze Data to Answer Questions', status: 'Planned', pct: 0.0, target_month: 'Month 3' },
    { num: 6, name: 'Share Data Through the Art of Visualization', status: 'Planned', pct: 0.0, target_month: 'Month 4' },
    { num: 7, name: 'Data Analysis with R Programming', status: 'Planned', pct: 0.0, target_month: 'Month 5' },
    { num: 8, name: 'Google Data Analytics Capstone Project', status: 'Planned', pct: 0.0, target_month: 'Month 6' },
  ];
  certCourses.forEach((c) => wsCert.addRow(c));

  // Sheet 4: Page 2 & 9 - Learning Journey & Future Roadmap
  const wsJourney = careerWb.addWorksheet('Dim_CareerRoadmap');
  wsJourney.columns = [
    { header: 'Phase', key: 'phase', width: 18 },
    { header: 'Track_Name', key: 'track', width: 30 },
    { header: 'Role_Target', key: 'role', width: 25 },
    { header: 'Key_Competencies', key: 'skills', width: 45 },
    { header: 'Timeline', key: 'timeline', width: 18 },
  ];
  wsJourney.getRow(1).font = { bold: true };
  const journey = [
    { phase: 'Past Baseline', track: 'ERP Technical Support', role: 'Technical Support Specialist', skills: 'Databases, Troubleshooting, Customer Systems', timeline: 'Pre-2025' },
    { phase: 'Current Program', track: 'Data & BI Analyst Track', role: 'BI / Data Analyst', skills: 'SQL, Power BI, Statistics, Python, English Storytelling', timeline: 'Month 1 - 6' },
    { phase: 'Post-Employment (Future)', track: 'Advanced AI & Deep Learning', role: 'AI / BI Engineer', skills: 'Deep Learning, CNN, Transformers, Computer Vision, RAG', timeline: 'Year 2' },
  ];
  journey.forEach((j) => wsJourney.addRow(j));

  await careerWb.xlsx.writeFile(path.join(DATASETS_DIR, 'career_and_portfolio.xlsx'));

  console.log('✅ All Phase 3A Power BI datasets compiled successfully!');
}

if (require.main === module) {
  generateAllPowerBIDatasets().catch(console.error);
}

export default generateAllPowerBIDatasets;
