import { chromium, expect } from "@playwright/test";

async function hiddenDropdown() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://testautomationpractice.blogspot.com/");

  await browser.close();
}

(async () => {
  await hiddenDropdown();
})();

// https://demoqa.com/date-picker
// https://the-internet.herokuapp.com/
