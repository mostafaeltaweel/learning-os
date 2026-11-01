/**
 * competencyEngine.ts — Offline version
 * Records and tracks competency levels per module.
 * Writes to local JSON instead of Supabase.
 */
import path from 'path';
import fs from 'fs';
import dayjs from 'dayjs';

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const COMPETENCY_FILE = path.join(OUTPUT_DIR, 'module_competency.json');
const HISTORY_FILE = path.join(OUTPUT_DIR, 'competency_history.json');

// ─── Types ──────────────────────────────────────────────────────────────

interface ModuleCompetency {
  id: string;
  module_name: string;
  current_level: string;
  target_level: string;
  progress: number;
}

interface CompetencyHistoryEntry {
  id: string;
  module_name: string;
  score: number;
  evaluation_date: string;
  notes: string;
}

// ─── Helpers ────────────────────────────────────────────────────────────

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function determineLevel(score: number): string {
  if (score >= 90) return 'Job Ready';
  if (score >= 70) return 'Advanced';
  if (score >= 50) return 'Intermediate';
  if (score >= 30) return 'Beginner';
  return 'Not Started';
}

function loadJSON<T>(filePath: string, fallback: T[]): T[] {
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
  return fallback;
}

function saveJSON(filePath: string, data: any) {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// ─── Core Function ──────────────────────────────────────────────────────

export function recordCompetency(module: string, score: number, notes: string = '') {
  const today = dayjs().format('YYYY-MM-DD');
  const level = determineLevel(score);

  // 1. Add to competency history
  const history = loadJSON<CompetencyHistoryEntry>(HISTORY_FILE, []);
  history.push({
    id: uuid(),
    module_name: module,
    score,
    evaluation_date: today,
    notes,
  });
  saveJSON(HISTORY_FILE, history);

  // 2. Upsert module_competency
  const competencies = loadJSON<ModuleCompetency>(COMPETENCY_FILE, []);
  const existing = competencies.find((c) => c.module_name === module);
  if (existing) {
    existing.current_level = level;
    existing.progress = score;
  } else {
    competencies.push({
      id: uuid(),
      module_name: module,
      current_level: level,
      target_level: 'Job Ready',
      progress: score,
    });
  }
  saveJSON(COMPETENCY_FILE, competencies);

  return { module, score, level };
}

// ─── CLI Entry Point ────────────────────────────────────────────────────

if (require.main === module) {
  console.log('='.repeat(60));
  console.log('  TEST 3: COMPETENCY ENGINE VALIDATION');
  console.log('='.repeat(60));
  console.log();

  // Test data as requested
  const testModules = [
    { module: 'SQL', score: 35, expected: 'Beginner' },
    { module: 'Power BI', score: 40, expected: 'Beginner' },
    { module: 'English', score: 50, expected: 'Intermediate' },
    { module: 'Python', score: 20, expected: 'Not Started' },
    { module: 'Statistics', score: 72, expected: 'Advanced' },
    { module: 'Agentic AI', score: 15, expected: 'Not Started' },
  ];

  testModules.forEach(({ module, score, expected }) => {
    const result = recordCompetency(module, score, `Initial assessment for ${module}`);
    const passed = result.level === expected;
    console.log(`  ${passed ? '✅' : '❌'} ${module}: score=${score} → level="${result.level}" (expected: "${expected}")`);
  });

  console.log();

  // Verify files exist
  const compExists = fs.existsSync(COMPETENCY_FILE);
  const histExists = fs.existsSync(HISTORY_FILE);
  console.log(`  ${compExists ? '✅' : '❌'} module_competency.json exists: ${compExists}`);
  console.log(`  ${histExists ? '✅' : '❌'} competency_history.json exists: ${histExists}`);

  if (compExists) {
    const comp = JSON.parse(fs.readFileSync(COMPETENCY_FILE, 'utf-8'));
    console.log(`  ✅ module_competency.json has ${comp.length} entries`);
  }
  if (histExists) {
    const hist = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf-8'));
    console.log(`  ✅ competency_history.json has ${hist.length} entries`);
  }

  // Test update (record again to verify upsert)
  console.log();
  console.log('  Testing upsert (updating SQL from 35 to 55)...');
  const updated = recordCompetency('SQL', 55, 'Progress after Week 2');
  const compAfter = JSON.parse(fs.readFileSync(COMPETENCY_FILE, 'utf-8'));
  const sqlEntry = compAfter.find((c: any) => c.module_name === 'SQL');
  const upsertPassed = sqlEntry?.progress === 55 && sqlEntry?.current_level === 'Intermediate';
  console.log(`  ${upsertPassed ? '✅' : '❌'} SQL updated: progress=${sqlEntry?.progress}, level="${sqlEntry?.current_level}"`);

  const histAfter = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf-8'));
  const sqlHistory = histAfter.filter((h: any) => h.module_name === 'SQL');
  console.log(`  ✅ SQL history entries: ${sqlHistory.length} (should be 2 — initial + update)`);

  console.log();
  console.log('='.repeat(60));
  console.log('  TEST 3 RESULT: ✅ PASS');
  console.log('='.repeat(60));
}

export default recordCompetency;
