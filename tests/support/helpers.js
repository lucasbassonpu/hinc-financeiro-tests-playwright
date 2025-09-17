import { expect } from '@playwright/test';
import { moneyStringToNumber, percentageStringToNumber, flexibleNumberToNumber } from './formatters.js';

// Helper functions for Playwright tests

// Reads a selector, captures the text and converts to monetary number (pt-BR)
export async function readMoney(page, selector) {
  if (!selector || selector === undefined) {
    throw new Error(`Selector is undefined or null. Check elements.js for missing selectors.`);
  }
  const text = await page.locator(selector).textContent();
  return moneyStringToNumber(text);
}

// Reads a selector, captures the text and converts to number (for percentages)
export async function readNumber(page, selector) {
  if (!selector || selector === undefined) {
    throw new Error(`Selector is undefined or null. Check elements.js for missing selectors.`);
  }
  const text = await page.locator(selector).textContent();
  return flexibleNumberToNumber(text);
}

// Wait for AG-Grid to load
export async function waitForAgGrid(page) {
  await page.locator('.ag-root-wrapper').waitFor({ timeout: 10000 });
  await page.waitForTimeout(1000); // Wait for complete rendering
}

// Get data from a specific AG-Grid cell
export async function getAgGridCell(page, rowIndex, colId) {
  return page.locator(`[row-index="${rowIndex}"] [col-id="${colId}"]`);
}

// Check the number of rows in AG-Grid
export async function getAgGridRowCount(page) {
  const rows = page.locator('.ag-center-cols-container .ag-row');
  return await rows.count();
}

// Filter column in AG-Grid
export async function filterAgGridColumn(page, colId, filterValue) {
  await page.locator(`[col-id="${colId}"] .ag-header-cell-menu-button`).click();
  await page.locator('.ag-filter-filter').fill(filterValue);
  await page.locator('.ag-filter-apply-panel-button:has-text("Apply")').click();
}

// Sort column in AG-Grid
export async function sortAgGridColumn(page, colId) {
  await page.locator(`[col-id="${colId}"] .ag-header-cell-text`).click();
}

// Wait for AG-Charts to load
export async function waitForAgChart(page, selector = '.ag-chart-wrapper') {
  await page.locator(selector).waitFor({ timeout: 10000 });
  await page.locator('canvas').waitFor({ timeout: 5000 });
  await page.waitForTimeout(2000); // Wait for chart animations
}

// Get the canvas of AG-Charts
export async function getChartCanvas(page, containerSelector = '.ag-chart-wrapper') {
  return page.locator(containerSelector).locator('canvas');
}

// Interact with AG-Charts tooltips
export async function hoverChartPoint(page, x, y, containerSelector = '.ag-chart-wrapper') {
  const canvas = page.locator(containerSelector).locator('canvas');
  await canvas.hover({ position: { x, y }, force: true });
  await page.waitForTimeout(500); // Wait for tooltip to appear
}

// Verify if tooltip contains specific text
export async function assertChartTooltip(page, expectedText) {
  const tooltip = page.locator('.ag-chart-tooltip');
  await tooltip.waitFor({ timeout: 5000 });
  await expect(tooltip).toContainText(expectedText);
}

// Click on legend item
export async function clickChartLegendItem(page, legendText) {
  await page.locator('.ag-chart-legend-item').filter({ hasText: legendText }).click();
}

// Capture visual snapshot of chart
export async function captureChartSnapshot(page, name) {
  const canvas = page.locator('canvas').first();
  await canvas.screenshot({ path: `test-results/charts/${name}.png` });
}

// Verify AG-Grid data
export async function assertAgGridData(page, expectedData) {
  for (let rowIndex = 0; rowIndex < expectedData.length; rowIndex++) {
    const row = expectedData[rowIndex];
    for (const colId of Object.keys(row)) {
      const cell = await getAgGridCell(page, rowIndex, colId);
      await expect(cell).toContainText(row[colId]);
    }
  }
}

// Custom assertion for close values (equivalent to Cypress be.closeTo)
export function expectCloseTo(actual, expected, delta = 0.005) {
  const diff = Math.abs(actual - expected);
  if (diff > delta) {
    throw new Error(`Expected ${actual} to be close to ${expected} (within ${delta}), but difference was ${diff}`);
  }
}
