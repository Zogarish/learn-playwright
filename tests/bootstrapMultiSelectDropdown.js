import { chromium, expect } from "@playwright/test";

async function bootstrapMultiSelectDropdown() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://codepen.io/bruce0205/pen/dvZJeJ");

  await expect(page).toHaveURL("https://codepen.io/bruce0205/pen/dvZJeJ");

  const frame = page.frameLocator('[id="result"]');

  await expect(frame.locator('[title="None selected"]')).toBeVisible();

  await expect(frame.locator('[title="None selected"]')).toHaveText(
    "None selected"
  );

  await frame.getByText("None selected").click();

  // Select options containing "PHP" or ".Net"
  const options = frame.locator(
    '[class="multiselect-container dropdown-menu"] [class="checkbox"]:not([class*="multiselect-group"])'
  );
  const optionsCount = await options.count();

  for (let i = 0; i < optionsCount; i++) {
    const optionText = await options.nth(i).innerText();
    if (optionText.includes("PHP") || optionText.includes(".Net")) {
      await options.nth(i).click();
    }
  }

  await await page.waitForTimeout(5000);

  await browser.close();
}

(async () => {
  await bootstrapMultiSelectDropdown();
})();
