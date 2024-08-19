import { chromium, expect } from "@playwright/test";

async function hideenDropdown() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto();

  await browser.close();
}

(async () => {
  await hideenDropdown();
})();
