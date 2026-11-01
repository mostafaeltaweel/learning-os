/**
 * Deep inspection of the Excel file to understand the REAL structure.
 * Reads ALL rows (not just 5 samples) and reports:
 * - Merged cells
 * - Actual row count
 * - All unique values in key columns
 * - Data patterns
 */
import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs';

const EXCEL_FILE = path.resolve(__dirname, '..', 'Mostafa Mohamed Practice Plan.xlsx');

async function main() {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(EXCEL_FILE);

  wb.eachSheet((ws) => {
    console.log('='.repeat(70));
    console.log(`SHEET: "${ws.name}"`);
    console.log(`  Row count: ${ws.rowCount}`);
    console.log(`  Column count: ${ws.columnCount}`);
    console.log(`  Actual row count (actualRowCount): ${ws.actualRowCount}`);
    console.log(`  Actual column count (actualColumnCount): ${ws.actualColumnCount}`);
    console.log();

    // Print merged cells info
    const mergedCells = (ws as any)._merges || {};
    const mergeKeys = Object.keys(mergedCells);
    if (mergeKeys.length > 0) {
      console.log(`  Merged cells (${mergeKeys.length}):`);
      mergeKeys.slice(0, 20).forEach((k) => {
        console.log(`    ${k}`);
      });
      if (mergeKeys.length > 20) console.log(`    ... and ${mergeKeys.length - 20} more`);
      console.log();
    }

    // Print ALL rows with actual data
    console.log('  ALL ROWS:');
    console.log('  ' + '-'.repeat(68));
    ws.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      const cells: string[] = [];
      row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
        let val = cell.value;
        // Extract text from richText
        if (val && typeof val === 'object' && 'richText' in (val as any)) {
          val = (val as any).richText.map((rt: any) => rt.text).join('');
        }
        // Extract text from hyperlink objects
        if (val && typeof val === 'object' && 'text' in (val as any)) {
          const inner = (val as any).text;
          if (typeof inner === 'object' && 'richText' in inner) {
            val = inner.richText.map((rt: any) => rt.text).join('');
          } else {
            val = inner;
          }
        }
        // Truncate long strings
        let str = String(val);
        if (str.length > 80) str = str.substring(0, 77) + '...';
        cells.push(`[C${colNumber}]=${str}`);
      });
      console.log(`  R${rowNumber}: ${cells.join(' | ')}`);
    });
    console.log();
  });
}

main().catch(console.error);
