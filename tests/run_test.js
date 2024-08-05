import { chromium, expect } from "@playwright/test";

async function runTests() {
  console.log("Starting tests with Chrome...");
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();

  // Netflix Home Page Test
  async function testNetflixHomePage() {
    console.log("Running Netflix Home Page test...");
    const page = await context.newPage();
    await page.goto("https://www.netflix.com/");

    // Check for title
    await expect(page).toHaveTitle(/Netflix/);

    // Check for URL
    await expect(page).toHaveURL("https://www.netflix.com/");

    // Check using toHaveText
    await expect(
      page.locator('[data-uia="nmhp-card-hero-text-title"]')
    ).toHaveText("Unlimited movies, TV shows, and more");

    // Checks If Login Button Is Visible
    await expect(page.locator('[id="signIn"]')).toBeVisible();

    console.log("Netflix Home Page test passed");
    await page.close();
  }

  // Netflix Login Test
  async function testNetflixLogin() {
    console.log("Running Netflix Login test...");
    const page = await context.newPage();
    await page.goto("https://www.netflix.com/");

    // Checks if Login Button is Visible and Clickable
    await expect(page.locator('[id="signIn"]')).toBeVisible();
    await expect(page.locator('[id="signIn"]')).toBeEnabled();

    // Click Login Button
    await page.locator('[id="signIn"]').click();

    // Check if we're on the login page
    await expect(page).toHaveURL("https://www.netflix.com/login");

    // Check for "Sign In" text on login page
    await expect(page.locator('[data-uia="login-page-title"]')).toHaveText(
      "Sign In"
    );

    console.log("Netflix Login test passed");
    await page.close();
  }

  // Run tests
  try {
    await testNetflixHomePage();
    await testNetflixLogin();
    console.log("All tests passed successfully.");
  } catch (error) {
    console.error("Test failed:", error.message);
  }

  console.log("Tests completed.");
  await browser.close();
  console.log("Browser closed.");
}

runTests().catch(console.error);
