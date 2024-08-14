import { test, expect } from "@playwright/test"; // Importing two essential functions from Playwright Test

// Defining a test
test("Writing Test", async ({ page }) => {
  // Navigating to the URL
  await page.goto("https://www.opensource-socialnetwork.org/demo");

  // Checking if the URL is correct
  await expect(page).toHaveURL("https://www.opensource-socialnetwork.org/demo");

  // Checking if the title of the page is correct
  await expect(page).toHaveTitle(/Demo/);

  // Close the browser
  await page.close();
});
