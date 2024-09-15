import { chromium, expect } from "@playwright/test";

async function datePicker() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://testautomationpractice.blogspot.com/");

  //   await page.locator('[id="datepicker"]').fill("08/21/2024");

  //   await expect(page.locator('[id="datepicker"]')).toHaveValue("08/21/2024");

  // Date Picker
  const year = "2024";
  const month = "October";
  const day = "1";

  await page.locator('[id="datepicker"]').click();

  while (true) {
    const currentYear = await page.locator(".ui-datepicker-year").textContent();

    const currentMonth = await page
      .locator(".ui-datepicker-month")
      .textContent();

    if (currentYear == year && month == currentMonth) {
      break;
    }

    await page.locator('[title="Next"]').click;
  }

  //   await page.waitForTimeout(5000);

  await browser.close();
}

(async () => {
  await datePicker();
})();
