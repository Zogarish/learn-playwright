import { chromium, expect } from "@playwright/test";

async function runTable() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://the-internet.herokuapp.com/tables");

  const table = await page.locator('[id="table2"]');

  // Total Number of rows and columns
  const numColumns = await page.locator("#table2 >> thead >> .header");

  console.log(`Number of Column: ${await numColumns.count()}`);
  await expect(numColumns).toHaveCount(6);
  await expect(await numColumns.count()).toBe(6);

  const numRows = await page.locator("#table2 >> tbody >> tr");

  console.log(`Number of Rows: ${await numRows.count()}`);
  await expect(numRows).toHaveCount(4);

  // Select One Element
  const matchRow = numRows.filter({
    has: page.locator("td"),
    hasText: "Doe",
  });

  const website = await matchRow.locator(".web-site").textContent();

  console.log(website);

  // Select Multiple Element
  await selectElement(numRows, page, "Smith");
  await selectElement(numRows, page, "Bach");
  await selectElement(numRows, page, "Conway");

  await page.goto("https://news.ycombinator.com/newest");

  await page.waitForLoadState("networkidle");

  

  await browser.close();
}

async function selectElement(numRows, page, name) {
  const matchRow = numRows.filter({
    has: page.locator("td"),
    hasText: name,
  });
  let websiteName = await matchRow.locator(".web-site").textContent();

  console.log(websiteName);
}

(async () => {
  await runTable();
})();
