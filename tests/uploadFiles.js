import { chromium, expect } from "@playwright/test";
import path from "path";

async function uploadFilesSingle() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://the-internet.herokuapp.com/upload");

  await page.waitForSelector('[id="file-upload"]');

  await page
    .locator('[id="file-upload"]')
    .setInputFiles("C:\\Users\\nguye\\Downloads\\105182886_p0_master1200.jpg");

  await page.waitForTimeout(5000);

  await page.locator('[id="file-upload"]').setInputFiles([]);

  await page.waitForTimeout(5000);

  await page
    .locator('[id="file-upload"]')
    .setInputFiles("C:\\Users\\nguye\\Downloads\\105182886_p0_master1200.jpg");

  await page.locator('[id="file-submit"]').click();

  await expect(page.getByText("File Uploaded!")).toBeVisible();

  await page.waitForTimeout(5000);

  await browser.close();
}

async function uploadFilesMultiple() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://davidwalsh.name/demo/multiple-file-upload.php");

  const files = [
    path.join("C:\\Users\\nguye\\Downloads\\105182886_p0_master1200.jpg"),
    path.join("C:\\Users\\nguye\\Downloads\\1291341.png"),
  ];

  await page.locator('[id="filesToUpload"]').setInputFiles(files);

  await expect(page.locator('[id="fileList"]')).toContainText("1291341.png");

  await expect(page.locator('[id="fileList"]')).toContainText(
    "105182886_p0_master1200.jpg"
  );

  await page.waitForTimeout(5000);

  await browser.close();
}

(async () => {
  await uploadFilesSingle();
  await uploadFilesMultiple();
})();
