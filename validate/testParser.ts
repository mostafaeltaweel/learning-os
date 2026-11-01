/**
 * Test 1: Excel Parser Validation
 * Runs parseExcel against the REAL "Mostafa Mohamed Practice Plan.xlsx"
 * and prints a full validation report.
 */
import path from 'path';
import fs from 'fs';
import { parseExcel, validateRequiredColumns } from '../excelParser';

const EXCEL_FILE = path.resolve(__dirname, '..', 'Mostafa Mohamed Practice Plan.xlsx');

async function main() {
  console.log('='.repeat(60));
  console.log('  TEST 1: EXCEL PARSER VALIDATION');
  console.log('='.repeat(60));
  console.log();

  // Check file exists
  if (!fs.existsSync(EXCEL_FILE)) {
    console.error(`❌ FAIL: Excel file not found at: ${EXCEL_FILE}`);
    process.exit(1);
  }
  console.log(`✅ Excel file found: ${EXCEL_FILE}`);
  const stats = fs.statSync(EXCEL_FILE);
  console.log(`   Size: ${(stats.size / 1024).toFixed(1)} KB`);
  console.log();

  // Run parser
  try {
    const report = await parseExcel(EXCEL_FILE);

    // 1. Detected Sheets
    console.log('-'.repeat(60));
    console.log('📋 DETECTED SHEETS:');
    console.log('-'.repeat(60));
    report.sheets.forEach((sheet: any, idx: number) => {
      console.log(`  ${idx + 1}. "${sheet.name}" — ${sheet.columnCount} columns, ${sheet.sampleRows.length} sample rows`);
    });
    console.log();

    // 2. Detected Columns per sheet
    console.log('-'.repeat(60));
    console.log('📊 DETECTED COLUMNS:');
    console.log('-'.repeat(60));
    report.sheets.forEach((sheet: any) => {
      console.log(`  Sheet: "${sheet.name}"`);
      sheet.columns.forEach((col: string, i: number) => {
        console.log(`    [${i + 1}] ${col}`);
      });
      console.log();
    });

    // 3. Column Mapping — check for English required columns
    console.log('-'.repeat(60));
    console.log('🔗 COLUMN MAPPING (English Sheet):');
    console.log('-'.repeat(60));
    const englishSheet = report.sheets.find((s: any) => /english/i.test(s.name));
    if (englishSheet) {
      const requiredCols = ['date', 'activity', 'resource', 'hours'];
      // case-insensitive check
      const lowerCols = englishSheet.columns.map((c: string) => c.toLowerCase());
      requiredCols.forEach((req) => {
        const found = lowerCols.includes(req);
        console.log(`  ${found ? '✅' : '❌'} "${req}" → ${found ? 'FOUND' : 'MISSING'}`);
      });

      const missing = validateRequiredColumns(
        { ...englishSheet, columns: lowerCols },
        requiredCols
      );
      if (missing.length === 0) {
        console.log('\n  ✅ All required columns present in English sheet.');
      } else {
        console.log(`\n  ❌ Missing columns: ${missing.join(', ')}`);
      }
    } else {
      console.log('  ⚠️  No sheet matching "English" found.');
      console.log('  Available sheets:');
      report.sheets.forEach((s: any) => console.log(`    - "${s.name}"`));
    }
    console.log();

    // 4. Sample Data (first 3 rows of each sheet)
    console.log('-'.repeat(60));
    console.log('📝 SAMPLE DATA (up to 3 rows per sheet):');
    console.log('-'.repeat(60));
    report.sheets.forEach((sheet: any) => {
      console.log(`  Sheet: "${sheet.name}"`);
      sheet.sampleRows.slice(0, 3).forEach((row: any, i: number) => {
        console.log(`    Row ${i + 1}: ${JSON.stringify(row)}`);
      });
      console.log();
    });

    // 5. Check column-mapping-report.json
    const reportPath = path.resolve(path.dirname(EXCEL_FILE), 'column-mapping-report.json');
    if (fs.existsSync(reportPath)) {
      const fileSize = fs.statSync(reportPath).size;
      console.log('-'.repeat(60));
      console.log(`✅ column-mapping-report.json GENERATED`);
      console.log(`   Path: ${reportPath}`);
      console.log(`   Size: ${(fileSize / 1024).toFixed(1)} KB`);
      console.log('-'.repeat(60));
    } else {
      console.log('❌ column-mapping-report.json NOT FOUND');
    }

    // 6. Validation Errors
    console.log();
    console.log('-'.repeat(60));
    console.log('🔍 VALIDATION ERRORS:');
    console.log('-'.repeat(60));
    let hasErrors = false;
    report.sheets.forEach((sheet: any) => {
      if (sheet.columnCount === 0) {
        console.log(`  ❌ Sheet "${sheet.name}" has 0 columns`);
        hasErrors = true;
      }
      if (sheet.sampleRows.length === 0) {
        console.log(`  ⚠️  Sheet "${sheet.name}" has no data rows (may be empty or header-only)`);
      }
    });
    if (!hasErrors) {
      console.log('  ✅ No validation errors found.');
    }

    console.log();
    console.log('='.repeat(60));
    console.log('  TEST 1 RESULT: ✅ PASS');
    console.log('='.repeat(60));

  } catch (err: any) {
    console.error();
    console.error('='.repeat(60));
    console.error('  TEST 1 RESULT: ❌ FAIL');
    console.error('='.repeat(60));
    console.error(`  Error: ${err.message}`);
    console.error(`  Stack: ${err.stack}`);
    process.exit(1);
  }
}

main();
