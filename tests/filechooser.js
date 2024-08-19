import { chromium, expect } from "@playwright/test";
import path from "path";

async function handleFileUpload() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(
    "https://www.w3schools.com/howto/tryit.asp?filename=tryhow_html_file_upload_button"
  );

  page.on("filechooser", async (fileChooser) => {
    console.log("File Chooser Opened");

    const files = path.join("C:\\Users\\nguye\\Downloads\\1291341.png");

    await fileChooser.setFiles(files);

    console.log("File Has Been Upload");
  });

  const frames = page.frames();
  console.log(`Frames on the Page is ${frames.length}`);

  const frame = page.frame("iframeResult");

  await frame.locator('[id="myFile"]').click();

  await page.waitForTimeout(5000);

  await browser.close();
}

(async () => {
  await handleFileUpload();
})();
