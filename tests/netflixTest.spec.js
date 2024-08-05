import { test, expect } from "@playwright/test";

test("Netflix Home Page", async ({ page }) => {
  // Going to Page
  await page.goto("https://www.netflix.com/");

  // Checks For Title
  await expect(page).toHaveTitle(/Netflix/);

  // Check URL
  await expect(page).toHaveURL("https://www.netflix.com/");

  // Check Using toHaveText
  await expect(
    page.locator('[data-uia="nmhp-card-hero-text-title"]')
  ).toHaveText("Unlimited movies, TV shows, and more");

  // Check Using toContainText
  await expect(
    page.locator('[data-uia="nmhp-card-faq-text-title"]')
  ).toContainText("Question");

  // Checks If Login Button Is Visible
  await expect(page.locator('[id="signIn"]')).toBeVisible();

  // Checks If Login Button is Clickable
  await expect(page.locator('[id="signIn"]')).toBeEnabled();

  // Check Get Started Button Using toHaveAttribute
  await expect(
    page.locator('[data-uia="nmhp-card-cta+hero_fuji"]')
  ).toHaveAttribute("type", "submit");

  // Closing the Page
  await page.close();
});

test("Netflix Login", async ({ page }) => {
  // Go to Netflix
  await page.goto("https://www.netflix.com/");

  // Checks if we are in Netflix
  await expect(page).toHaveTitle(/Netflix/);

  // Check URL
  await expect(page).toHaveURL("https://www.netflix.com/");

  // Checks if Button is Visible
  await expect(page.locator('[id="signIn"]')).toBeVisible();

  // Clicks On Button
  await page.locator('[id="signIn"]').click();

  // Checks If We are in the Login Page
  await expect(page).toHaveURL("https://www.netflix.com/login");

  // Check For New Title
  await expect(page).toHaveTitle("Netflix");

  // Check Text
  await expect(page.locator('[data-uia="login-page-title"]')).toHaveText(
    "Sign In"
  );

  // Click Button
  await page.locator('[data-uia="login-submit-button"]').click();

  await expect(page.locator('[id=":r1:"]')).toHaveText(
    "Please enter a valid email or phone number."
  );

  // Fill In Email Wrong
  await page.locator('[data-uia="login-field"]').fill("yoMail@gmail.com");

  // Checks If Email Is Fill
  await expect(page.locator('[data-uia="login-field"]')).toHaveValue(
    "yoMail@gmail.com"
  );

  // Fill In Password Wrong
  await page
    .locator('[autocomplete="password"]')
    .fill("asdfahbsdjfbahbsdfhkbkhj");

  // Check If Password In Fill
  await expect(page.locator('[autocomplete="password"]')).toHaveValue(
    "asdfahbsdjfbahbsdfhkbkhj"
  );
});
