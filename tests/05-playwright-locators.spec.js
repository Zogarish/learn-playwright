import { test, expect } from "@playwright/test";

test("Built-in Locators", async ({ page }) => {
  await page.goto("https://www.netflix.com/");

  await expect(page).toHaveURL(/netflix.com/);

  await expect(page).toHaveTitle(/Netflix/);

  // Filling Email Using getByLabel
  await page.getByLabel("Email Address").first().fill("tempmail@gmail.com");

  // Click The First Button using getByRole
  await page.getByRole("button", { name: "Get Started" }).first().click();

  await page.waitForLoadState("networkidle");

  await page.goto("https://demoqa.com/elements");

  await expect(page).toHaveURL(/demoqa.com/);

  // Clicking Text Box using getByText
  await page.getByText("Text Box").click();

  await expect(page).toHaveURL(/text-box/);

  // Filling Name Using getByPlaceholder
  await page.getByPlaceholder("Full Name").fill("John Doe");

  const newPagePromise = page.waitForEvent("popup");
  await page.getByAltText("Build PlayWright tests with AI").click();
  const newPage = await newPagePromise;

  await newPage.waitForLoadState("networkidle");

  await expect(newPage).toHaveURL(/zerostep.com/);

  await newPage.close();
});

test("ALL Locators", async ({ page }) => {
  await page.goto("https://demoqa.com/sortable");

  await expect(page).toHaveURL(/demoqa.com/);

  // Using All() methods
  const listItems = page.locator(
    '[class="list-group-item list-group-item-action"]'
  );

  const allItems = await listItems.all();

  console.log(`Found ${allItems.length} items`);

  for (const item of allItems) {
    const text = await item.textContent();

    console.log(text);
  }

  // Checks Count
  await expect(listItems).toHaveCount(15);

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
    "Not Found",
  ];
  expect(linkTexts).toEqual(expect.arrayContaining(staticLinkTexts));

  // Check for the dynamic link text using a regular expression
  expect(linkTexts).toEqual(
    expect.arrayContaining([expect.stringMatching(/^Home[a-zA-Z0-9]{5}$/)])
  );

  await page.goto("https://demoqa.com/text-box");

  await expect(page).toHaveURL(/text-box/);

  const elementsLocator = page.locator('[class="menu-list"] li');

  const elementTexts = await elementsLocator.allTextContents();

  console.log("Element Texts", elementTexts);

  const count = await elementsLocator.count();
  console.log(`Found ${count} elements`);
  expect(elementTexts).toHaveLength(count);
  expect(elementTexts.every((text) => text.trim() !== "")).toBe(true);
});
