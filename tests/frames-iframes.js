import { chromium, expect } from "@playwright/test";

async function runFrames() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(
    "https://www.globalsqa.com/demo-site/frames-and-windows/#iFrame"
  );

  // Frames
  const frames = await page.frames();
  console.log(`Number of Frames: ${frames.length}`);

  // Get Frame By URL
  const frameURL = await page.frame({
    url: "https://www.globalsqa.com/trainings/",
  });

  // Get Frame By Name
  const frameName = await page.frame("globalSqa");

  // Get Frame By Locator
  const frameLocator = await page.frame('[name="globalSqa"]');

  await frameName.locator('[placeholder="Search..."]').fill("Hello");

  await expect(frameName.locator('[placeholder="Search..."]')).toHaveValue(
    "Hello"
  );

  await page.waitForTimeout(5000);

  await browser.close();
}

async function runInnerFrames() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://demoqa.com/nestedframes");

  // Frames
  const frames = await page.frames();
  console.log(`Number of Frames: ${frames.length}`);

  // Get Frame By URL
  const frameURL = await page.frame({
    url: "https://demoqa.com/sampleiframe",
  });

  await expect(frameURL.getByText("Parent frame")).toBeVisible();

  const childFrame = await frameURL.childFrames();
  await expect(childFrame[0].getByText("Child Iframe")).toBeVisible;

  await browser.close();
}

(async () => {
  await runFrames();
  await runInnerFrames();
})();
