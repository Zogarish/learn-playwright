import { chromium, expect } from "@playwright/test";

async function runDropDown() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://demoqa.com/automation-practice-form");

  await page.waitForLoadState("networkidle");

  await expect(page).toHaveURL(/demoqa.com/);

  await expect(page.getByText("Select State")).toBeVisible();

  await page.getByText("Select State").click();

  await page.getByText("NCR", { exact: true }).click();

  // Assert that the selected value is correct
  const selectedValue = await page
    .locator("#state .css-1uccc91-singleValue")
    .textContent();
  await expect(selectedValue).toBe("NCR");

  await page.goto("https://the-internet.herokuapp.com/dropdown");

  await expect(page).toHaveURL(/the-internet.herokuapp.com/);

  await page.locator('[id="dropdown"]').selectOption("Option 1");

  await expect(page.locator('[id="dropdown"]')).toHaveCount(1);

  const options = await page.$$('[id="dropdown"]');

  await expect(options.length).toBe(1);

  const content = await page.locator('[id="dropdown"]').textContent();
  await expect(content.includes("Option 2")).toBeTruthy();

  await await browser.close();
}

(async () => {
  await runDropDown();
})();
