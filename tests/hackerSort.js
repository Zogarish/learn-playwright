import { chromium } from "playwright";

function convertRelativeTime(relativeTime) {
  console.log(`\nConverting relative time: "${relativeTime}"`);
  const now = new Date();
  console.log(`Current time: ${now.toISOString()}`);

  const parts = relativeTime.split(" ");
  const amount = parseInt(parts[0], 10);
  const unit = parts[1];

  console.log(`Parsed amount: ${amount}, unit: ${unit}`);

  let convertedTime;
  switch (unit) {
    case "minute":
    case "minutes":
      convertedTime = new Date(now.getTime() - amount * 60 * 1000);
      break;
    case "hour":
    case "hours":
      convertedTime = new Date(now.getTime() - amount * 60 * 60 * 1000);
      break;
    case "day":
    case "days":
      convertedTime = new Date(now.getTime() - amount * 24 * 60 * 60 * 1000);
      break;
    case "month":
    case "months":
      convertedTime = new Date(now.setMonth(now.getMonth() - amount));
      break;
    case "year":
    case "years":
      convertedTime = new Date(now.setFullYear(now.getFullYear() - amount));
      break;
    default:
      console.warn(`Unhandled time unit: ${unit}`);
      convertedTime = now;
  }

  console.log(`Converted time: ${convertedTime.toISOString()}`);
  return convertedTime;
}

async function collectHackerNewsData() {
  console.log("Starting data collection process...");

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log("Navigating to Hacker News 'newest' page...");
  await page.goto("https://news.ycombinator.com/newest");

  const articles = [];
  const totalArticlesToCollect = 100;

  console.log(`Aiming to collect ${totalArticlesToCollect} articles...`);

  while (articles.length < totalArticlesToCollect) {
    console.log(`\nCurrently on page ${Math.floor(articles.length / 30) + 1}`);
    console.log("Collecting articles from current page...");

    const newArticles = await page.evaluate(() => {
      const items = document.querySelectorAll(".athing");
      return Array.from(items).map((item) => {
        const titleElement = item.querySelector(".titleline > a");
        const metaRow = item.nextElementSibling;
        const ageElement = metaRow.querySelector(".age");

        return {
          id: item.id,
          title: titleElement.innerText,
          age: ageElement.innerText,
        };
      });
    });

    console.log(`Collected ${newArticles.length} articles from this page.`);
    articles.push(...newArticles);
    console.log(`Total articles collected so far: ${articles.length}`);

    if (articles.length < totalArticlesToCollect) {
      console.log("Attempting to navigate to next page...");
      const moreLink = page.locator('[rel="next"]');
      const moreLinkCount = await moreLink.count();
      if (moreLinkCount > 0) {
        await moreLink.click();
        await page.waitForLoadState("networkidle");
        console.log("Successfully navigated to next page.");
      } else {
        console.log("No 'More' link found. Ending collection.");
        break;
      }
    }
  }

  console.log("\nData collection complete. Closing browser...");
  await browser.close();

  console.log(`Returning ${totalArticlesToCollect} articles.`);
  return articles.slice(0, totalArticlesToCollect);
}

function validateSorting(articles) {
  console.log("\nStarting sorting validation...");
  console.log(`Total articles to validate: ${articles.length}`);

  const toleranceMs = 1000; // 1 second tolerance
  console.log(`Using tolerance of ${toleranceMs}ms for timestamp comparisons`);

  for (let i = 1; i < articles.length; i++) {
    const prevArticle = articles[i - 1];
    const currArticle = articles[i];

    console.log(`\nComparing articles at index ${i - 1} and ${i}:`);
    console.log(
      `Previous article: "${prevArticle.title}" (${prevArticle.age}) ID: ${prevArticle.id}`
    );
    console.log(
      `Current article: "${currArticle.title}" (${currArticle.age}) ID: ${currArticle.id}`
    );

    const prevTimestamp = convertRelativeTime(prevArticle.age);
    const currTimestamp = convertRelativeTime(currArticle.age);

    console.log(`Previous timestamp: ${prevTimestamp.toISOString()}`);
    console.log(`Current timestamp: ${currTimestamp.toISOString()}`);

    const timeDifference = prevTimestamp.getTime() - currTimestamp.getTime();
    console.log(`Time difference: ${timeDifference}ms`);

    if (timeDifference < -toleranceMs) {
      console.error(`Sorting error detected!`);
      console.error(
        `Article at index ${
          i - 1
        } is significantly newer than article at index ${i}`
      );
      console.error(
        `  Article ${i - 1}: ${prevArticle.title} (${prevArticle.age}) ID: ${
          prevArticle.id
        }`
      );
      console.error(
        `  Article ${i}: ${currArticle.title} (${currArticle.age}) ID: ${currArticle.id}`
      );
      console.error(
        `  Time difference: ${timeDifference}ms (exceeds tolerance of ${toleranceMs}ms)`
      );
      return false;
    } else {
      console.log(
        `Order is correct. Time difference (${timeDifference}ms) is within tolerance.`
      );
    }
  }

  console.log("\nValidation complete. All articles are correctly sorted.");
  return true;
}

async function main() {
  try {
    console.log("Starting main function...");
    const articles = await collectHackerNewsData();
    console.log(`\nSuccessfully collected ${articles.length} articles.`);

    console.log("\nValidating article sorting...");
    const isSorted = validateSorting(articles);

    if (isSorted) {
      console.log("All articles are correctly sorted from newest to oldest.");
    } else {
      console.log("Articles are not correctly sorted.");
    }

    console.log("\nFirst 5 articles:");
    console.log(articles.slice(0, 5));
    console.log("...");
    console.log("Last 5 articles:");
    console.log(articles.slice(-5));
  } catch (error) {
    console.error("An error occurred:", error);
    console.error(error.stack);
  }
}

main();
