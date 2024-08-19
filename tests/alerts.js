import { chromium, expect } from "@playwright/test";

async function runAlertsOk() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("I am a JS Alert");
    await dialog.accept();
  });

  await page.getByText("Click For JS Alert").click();

  await page.waitForTimeout(5000);

  await browser.close();
}

async function runAlertsConfirmation() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("confirm");
    expect(dialog.message()).toContain("I am a JS Confirm");
    await dialog.accept(); // Accept
    // await dialog.dismiss(); // Cancel
  });

  await page.getByText("Click For JS Confirm").click();

  await page.waitForTimeout(5000);

  await browser.close();
}

async function runAlertsPrompt() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("prompt");
    expect(dialog.message()).toContain("I am a JS prompt");
    // expect(dialog.defaultValue()).toContain("John Doe");
    await dialog.accept("John Doe"); // Accept
    // await dialog.dismiss(); // Cancel
  });

  await page.getByText("Click For JS Prompt").click();

  await page.waitForTimeout(5000);

  await browser.close();
}

(async () => {
  await runAlertsOk();
  await runAlertsConfirmation();
  await runAlertsPrompt();
})();
