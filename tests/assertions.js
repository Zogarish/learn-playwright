import { chromium, expect } from "@playwright/test";

async function runAssertions() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto("https://demoqa.com/text-box");

    // Assertions
    await expect(page).toHaveURL(/demoqa.com/);
    await expect(page).toHaveTitle("DEMOQA");
    await expect(page.locator('[id="submit"]')).toBeVisible();
    await expect(page.locator('[id="submit"]')).toBeEnabled();

    await page.getByText("Check Box").click();

    await page.locator('[class="rct-checkbox"]').first().check();

    await expect(page.locator('[class="rct-checkbox"]')).toBeChecked();

    const checkLocator = page.locator('[id="result"] span');

    const checkWords = await checkLocator.allTextContents();

    const count = await checkLocator.count();
    await expect(checkWords).toHaveLength(count);

    await page.getByText("Links").first().click();

    await expect(page.getByText(/open new tab/)).toHaveText(
      "Following links will open new tab"
    );

    await expect(page.getByText(/api call/)).toContainText(
      "Following links will send"
    );

    await page.getByText("Text Box").click();

    await expect(page.locator('[id="submit"]')).toHaveAttribute(
      "type",
      "button"
    );

    await page.getByPlaceholder("Full Name").fill("John Doe");

    await expect(page.getByPlaceholder("Full Name")).toHaveValue("John Doe");
  } finally {
    await browser.close();
  }
}

async function runHardSoftAssertions() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Checks with All InnerTexts
    await page.goto("https://demoqa.com/links");

    const linksLocator = page.locator('[id="linkWrapper"] a');

    const linkTexts = await linksLocator.allInnerTexts();

    console.log("Link texts:", linkTexts);

    // Check for static link texts
    const staticLinkTexts = [
      "Home",
      "Created",
      "No Content",
      "Moved",
      "Bad Request",
      "Unauthorized",
      "Forbidden",
      // "Not Found",
    ];

    // Soft Assertions using .soft
    await expect
      .soft(linkTexts)
      .toEqual(expect.arrayContaining(staticLinkTexts));

    // Check for the dynamic link text using a regular expression: Hard Assertions
    await expect(linkTexts).toEqual(
      expect.arrayContaining([expect.stringMatching(/^Home[a-zA-Z0-9]{5}$/)])
    );
  } finally {
    await browser.close();
  }
}

(async () => {
  try {
    await runAssertions();
    await runHardSoftAssertions();
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
