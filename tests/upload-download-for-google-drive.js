import { chromium, expect } from "@playwright/test";
import dotenv from "dotenv";

// Loading ENV File To Use
dotenv.config();

async function runGoogleDrive() {
  // Setting Up Browser and Page
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Username and Password from env
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;

  page.on("popup", async (popup) => {
    console.log("New Page Has been Opened");

    await popup.waitForLoadState("networkidle");

    const pageURL = await popup.url();
    const pageTitle = await popup.title();
    console.log(`The page url is: ${pageURL}`);
    console.log(`The Title of the Page is: ${pageTitle}`);

    await popup.locator('[id="identifierId"]').fill(username);
  });

  // Going To Google Drive
  await page.goto("https://www.google.com/drive/");

  // Wait for the page to fully load
  await page.waitForLoadState();

  // Checking URL Is Correct
  await expect(page).toHaveURL(/google.com/);

  // Checking Title Is Correct
  await expect(page).toHaveTitle(/Personal Cloud Storage/);

  // Checking If H1 is loading and has the text
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Easy and secure access to your content"
  );

  const popupPromise = page.waitForEvent("popup");

  await page.locator('[data-label="hero"]').nth(1).click();

  const popup = await popupPromise;

  //   await browser.close();
}

(async () => {
  await runGoogleDrive();
})();

// import { test, expect } from "@playwright/test";
// import { readFile } from "node:fs";
// import { json } from "stream/consumers";

// const cookies = await context.cookies();
// const fse = await import("node:fs/promises");
// const fse.writeFile("c://bao/cookies.txt", JSON.stringify(cookies))
// const oldCookies =  await fse.readFile("c://bao/cookies.txt", "utf-8")

// const context.addCookies(JSON())
