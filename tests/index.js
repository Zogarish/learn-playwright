const { chromium } = require("playwright");
const { expect } = require("@playwright/test");

async function sortHackerNewsArticles() {
  // Launch browser in non-headless mode for visibility
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to Hacker News 'newest' page
  await page.goto("https://news.ycombinator.com/newest");

  // Make Sure that Website is Completed Loaded
  await page.waitForLoadState("networkidle");

  await Promise.all([
    // Check if URL ends with '/newest'
    await expect(page).toHaveURL(/\/newest$/),
    console.log("URL check passed: ends with '/newest'"),

    // Check if title contains 'Hacker News'
    await expect(page).toHaveTitle(/Hacker News/),
    console.log("Title check passed: contains 'Hacker News'"),

    // Assert that the navigation bar exists
    await expect(page.locator(".pagetop").nth(0)).toBeVisible(),
    console.log("Navigation bar is visible"),

    // Assert that Hacker News Is Present
    await expect(page.locator(".hnname >> a")).toHaveText("Hacker News"),
    await expect(page.locator(".hnname >> a")).toBeVisible(),
    console.log("'Hacker News' logo link is present and correct"),

    // Assert the correct number of navigation links
    await expect(page.locator(".pagetop >> a")).toHaveCount(9),
    console.log("Correct number of navigation links present"),

    // Assert that the 'new' link is selected (has class 'topsel')
    await expect(page.locator(".topsel >> a")).toHaveText("new"),
    console.log("The 'new' link is correctly highlighted as the active page"),

    // Check if there's only one selected link
    await expect(page.locator('[class="topsel"]')).toHaveCount(1),
    console.log("There is Only One 'topsel' Class"),

    // Check if the first and last news item has a rank of "1" and "30"
    await expect(page.locator('[class="rank"]').first()).toHaveText("1."),
    console.log("First news item has the correct rank"),
    await expect(page.locator('[class="rank"]').last()).toHaveText("30."),
    console.log("Last news item has the correct rank"),

    // Check for the presence of a "More" link at the bottom of the page
    await expect(page.locator('[class="morelink"]')).toBeVisible(),
    await expect(page.locator('[class="morelink"]')).toHaveText("More"),
    console.log("'More' link is present at the bottom of the page"),
  ]);

  // Get text content of all navigation links
  const navContent = await page.locator(".pagetop >> a").allTextContents();

  const navContentWords = [
    "Hacker News",
    "new",
    "past",
    "comments",
    "ask",
    "show",
    "jobs",
    "submit",
    "login",
  ];

  // Compare navContent with navContentWords
  for (let i = 0; i < navContent.length; i++) {
    console.log(`Comparing index ${i}:`);
    console.log(`  navContent[${i}]: "${navContent[i]}"`);
    console.log(`  navContentWords[${i}]: "${navContentWords[i]}"`);

    await expect(navContent[i]).toBe(
      navContentWords[i],
      `Mismatch at index ${i}: Expected "${navContentWords[i]}", but got "${navContent[i]}"`
    );

    console.log("  Match: ✅");
    console.log("------------------------");
  }

  // Assert the order of links (they should appear in the same order as navContentWords)
  for (let i = 0; i < navContent.length; i++) {
    await expect(page.locator(".pagetop >> a").nth(i)).toHaveText(
      navContentWords[i]
    );
  }
  console.log("Order Links are In the Correct Order");

  // Check if the page contains a list of news items
  const newsRow = await page.locator('[class="athing"]');
  await expect(newsRow).toHaveCount(30);
  console.log("Page contains the expected number of news items");

  // Verify that each news item has an upvote button
  for (let i = 0; i < (await newsRow.count()); i++) {
    await expect(newsRow.nth(i).locator('[class="votearrow"]')).toBeVisible();
  }
  console.log("All news items have visible upvote buttons");

  // Verify that each news item has a timestamp
  const subRows = await page.locator('[class="subline"]');
  await expect(subRows).toHaveCount(30);
  for (let i = 0; i < (await subRows.count()); i++) {
    await expect(subRows.nth(i).locator('[class="age"]')).toBeVisible();
  }
  console.log("All timestamp is visible");

  await browser.close();
}

function covertTime() {
  
}

(async () => {
  try {
    await sortHackerNewsArticles();
    console.log("All Checks Has Passed");
  } catch (error) {
    console.error(`Test failed: ${error.message}`);
    console.error(`Stack trace: ${error.stack}`);
  }
})();
