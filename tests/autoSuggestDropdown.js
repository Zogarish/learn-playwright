import { chromium, expect } from "@playwright/test";

async function autoSuggestDropdown() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://www.hotels.com/");

  await expect(page).toHaveURL(/hotels.com/);

  await page.locator('[aria-label="Where to?"]').click();

  await page.locator('[id="destination_form_field"]').fill("Japan");

  await page.waitForTimeout(1000);

  await page.waitForSelector('[class="uitk-action-list no-bullet"] li', {
    state: "visible",
  });

  const nameOptions = page.locator(
    '[class="uitk-action-list no-bullet"] li .uitk-typeahead-button-label .uitk-text span strong'
  );
  const locationOptions = page.locator(
    '[class="uitk-action-list no-bullet"] li .uitk-typeahead-button-label .is-subText'
  );

  const names = await nameOptions.allInnerTexts();
  const locations = await locationOptions.allInnerTexts();

  for (let i = 0; i < names.length; i++) {
    console.log(`Name: ${names[i]}, Location: ${locations[i] || "N/A"}`);
  }

  const suggestionButtons = page.locator(
    '[data-stid="destination_form_field-result-item-button"]'
  );

  const count = await suggestionButtons.count();

  const optionIndex = 1;

  if (optionIndex < 0 || optionIndex >= count) {
    throw new Error(`Invalid option index. Must be between 0 and ${count - 1}`);
  }

  await suggestionButtons.nth(optionIndex).click();

  // Log the selected option
  const selectedOption = await page
    .locator('[id="destination_form_field"]')
    .inputValue();
  console.log(`Selected option (index ${optionIndex}):`, selectedOption);

  await page.waitForTimeout(5000);

  await browser.close();
}

(async () => {
  await autoSuggestDropdown();
})();
