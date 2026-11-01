/**
 * Focused extraction: only the meaningful rows (non-null data) from each sheet.
 */
import ExcelJS from 'exceljs';
import path from 'path';

const EXCEL_FILE = path.resolve(__dirname, '..', 'Mostafa Mohamed Practice Plan.xlsx');

function extractText(val: any): string {
  if (val === null || val === undefined) return '';
  if (typeof val === 'string') return val.trim();
  if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
  if (typeof val === 'number') return String(val);
  if (val instanceof Date) return val.toISOString();
  if (typeof val === 'object') {
    if ('richText' in val) {
      return val.richText.map((rt: any) => rt.text).join('').trim();
    }
    if ('text' in val) {
      const inner = val.text;
      if (typeof inner === 'object' && 'richText' in inner) {
        return inner.richText.map((rt: any) => rt.text).join('').trim();
      }
      return String(inner).trim();
    }
    if ('hyperlink' in val) return val.hyperlink;
  }
  return String(val).trim();
}

async function main() {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(EXCEL_FILE);

  // ============ DAILY PLAN ============
  console.log('='.repeat(70));
  console.log('SHEET: "Daily Plan" — MEANINGFUL DATA ONLY');
  console.log('='.repeat(70));
  const dp = wb.getWorksheet('Daily Plan')!;
  dp.eachRow({ includeEmpty: false }, (row, rn) => {
    // Check if any cell in columns 1-10 has non-null real data
    let hasData = false;
    for (let c = 1; c <= 10; c++) {
      const v = extractText(row.getCell(c).value);
      if (v && v !== 'null') { hasData = true; break; }
    }
    if (!hasData) return;

    const cells: string[] = [];
    for (let c = 1; c <= 10; c++) {
      const v = extractText(row.getCell(c).value);
      if (v && v !== 'null') {
        const short = v.length > 100 ? v.substring(0, 97) + '...' : v;
        cells.push(`C${c}="${short}"`);
      }
    }
    console.log(`  R${rn}: ${cells.join(' | ')}`);
  });

  // ============ RESOURCES ============
  console.log();
  console.log('='.repeat(70));
  console.log('SHEET: "Resources" — ALL ROWS');
  console.log('='.repeat(70));
  const res = wb.getWorksheet('Resources')!;
  res.eachRow({ includeEmpty: false }, (row, rn) => {
    let hasData = false;
    for (let c = 1; c <= 4; c++) {
      const v = extractText(row.getCell(c).value);
      if (v && v !== 'null') { hasData = true; break; }
    }
    if (!hasData) return;

    const cells: string[] = [];
    for (let c = 1; c <= 4; c++) {
      const v = extractText(row.getCell(c).value);
      cells.push(v || '—');
    }
    console.log(`  R${rn}: ${cells.join(' | ')}`);
  });

  // ============ DAILY TARGETS ============
  console.log();
  console.log('='.repeat(70));
  console.log('SHEET: "Daily Targets" — FIRST 20 ROWS');
  console.log('='.repeat(70));
  const dt = wb.getWorksheet('Daily Targets')!;
  let dtCount = 0;
  let dtTotal = 0;
  dt.eachRow({ includeEmpty: false }, (row, rn) => {
    let hasData = false;
    for (let c = 1; c <= 5; c++) {
      const v = extractText(row.getCell(c).value);
      if (v && v !== 'null') { hasData = true; break; }
    }
    if (!hasData) return;
    dtTotal++;
    if (dtCount >= 20) return;
    dtCount++;

    const cells: string[] = [];
    for (let c = 1; c <= 5; c++) {
      const v = extractText(row.getCell(c).value);
      const short = v.length > 60 ? v.substring(0, 57) + '...' : v;
      cells.push(short || '—');
    }
    console.log(`  R${rn}: ${cells.join(' | ')}`);
  });
  console.log(`  ... Total rows with data: ${dtTotal}`);
}

main().catch(console.error);
