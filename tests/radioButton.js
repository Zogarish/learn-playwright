import { chromium, expect } from "@playwright/test";
import exp from "constants";

async function runRadio() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto("https://demoqa.com/radio-button");

    await expect(page).toHaveURL(/demoqa.com/);

    await page.getByText("Yes").check();

    await expect(page.getByText("Yes")).toBeChecked();

    await expect(page.getByText("You have selected Yes")).toBeVisible();

    await page.getByText("Impressive").check;

    await expect(page.getByText("Impressive")).toBeChecked();

    await expect(page.getByText("You have selected Impressive")).toBeVisible();
  } finally {
    await browser.close();
  }
}

(async () => {
  try {
    await runRadio();
  } catch {}
})();
