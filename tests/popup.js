import { chromium, expect } from "@playwright/test";

async function runPopup() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(
    "https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_win_open"
  );

  const frames = await page.frames();

  console.log(`Number of Frames: ${frames.length}`);

  const frame = page.frame("iframeResult");

  page.on("popup", async (popup) => {
    console.log(`New Popup has been opened`);

    await popup.waitForLoadState();

    const popupUrl = await popup.url();
    console.log(`Url is: ${popupUrl}`);

    const popupTitle = await popup.title();
    console.log(`Title is: ${popupTitle}`);

    // Interact With Page If Needed

    await popup.close();
  });

  const popupPromise = page.waitForEvent("popup");

  await frame.locator("button").click();

  const popup = await popupPromise;

  await page.waitForTimeout(5000);

  await browser.close();
}

(async () => {
  await runPopup();
})();
