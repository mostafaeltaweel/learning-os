// src/utils/excelParser.ts
import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs';
import { z } from 'zod';

/**
 * Schema for a generic row – will be inferred dynamically from the header.
 * We use Zod only to ensure the required fields exist after mapping.
 */
const genericRowSchema = z.object({}).passthrough();

/**
 * Parses an Excel file, discovers all sheets and their columns.
 * Returns a detailed report used for validation and for the schedule generator.
 */
export async function parseExcel(filePath: string) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const report: any = { sheets: [] };

  workbook.eachSheet((worksheet) => {
    const headerRow = worksheet.getRow(1);
    const columns: string[] = [];
    headerRow.eachCell({ includeEmpty: false }, (cell) => {
      const header = String(cell.value).trim();
      columns.push(header);
    });

    // Validate that at least one column exists
    if (columns.length === 0) {
      throw new Error(`Sheet "${worksheet.name}" has no header row`);
    }

    // Collect a sample of up to 5 rows for quick validation
    const sampleRows: any[] = [];
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber === 1) return; // skip header
      if (sampleRows.length >= 5) return;
      const rowObj: any = {};
      columns.forEach((colName, idx) => {
        const cell = row.getCell(idx + 1);
        rowObj[colName] = cell.value;
      });
      // Use Zod to ensure we have an object (any shape accepted)
      const parsed = genericRowSchema.safeParse(rowObj);
      if (parsed.success) {
        sampleRows.push(rowObj);
      }
    });

    report.sheets.push({
      name: worksheet.name,
      columnCount: columns.length,
      columns,
      sampleRows,
    });
  });

  // Write a Column Mapping Report next to the Excel file for user inspection
  const reportPath = path.resolve(path.dirname(filePath), 'column-mapping-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');

  return report;
}

/**
 * Simple validation helper – checks that a required column exists in a given sheet.
 * Returns an array of missing columns (empty if all present).
 */
export function validateRequiredColumns(sheet: any, required: string[]) {
  const missing = required.filter((col) => !sheet.columns.includes(col));
  return missing;
}
