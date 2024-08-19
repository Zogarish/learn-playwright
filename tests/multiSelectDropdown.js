import { chromium, expect } from "@playwright/test";

async function multiSelectDropdown() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://www.w3schools.com/tags/att_select_multiple.asp");

  await expect(page).toHaveURL(/w3schools.com/);

  const newPagePromise = page.waitForEvent("popup");
  await page.getByText("Try it Yourself").click();
  const newPage = await newPagePromise;

  await newPage.waitForLoadState("networkidle");

  await expect(newPage).toHaveURL(
    "https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select_multiple"
  );

  const frame = newPage.frameLocator("iframe#iframeResult");

  await frame.locator("select#cars").selectOption(["volvo", "audi"]);

  const selectedOptions = await frame
    .locator('[id="cars"]')
    .evaluate((select) =>
      Array.from(select.selectedOptions).map((option) => option.value)
    );

  console.log(`Selected Options ${selectedOptions}`);

  await browser.close();
}

(async () => {
  await multiSelectDropdown();
})();
