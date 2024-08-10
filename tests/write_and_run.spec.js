import { test, expect } from "@playwright/test"; 

test("Writing Test", async ({ page }) => {
  await page.goto("https://www.opensource-socialnetwork.org/demo");
  await expect(page).toHaveURL("https://www.opensource-socialnetwork.org/demo");
});
