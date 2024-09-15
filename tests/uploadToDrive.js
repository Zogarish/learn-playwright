import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileToUpload = path.join(__dirname, "..", "data", "your_file.txt");
const userDataDir = path.join(__dirname, "..", "user-data-dir");

async function uploadToDrive() {
  const browser = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  try {
    console.log("Navigating to Google Drive...");
    await page.goto("https://drive.google.com", {
      waitUntil: "networkidle",
      timeout: 60000,
    });
    console.log("Current URL:", page.url());

    // Check if we're logged in
    const loggedIn = await page.evaluate(() => {
      return !document.querySelector('input[type="email"]');
    });

    if (!loggedIn) {
      console.log(
        "Not logged in. Please log in manually in the browser window."
      );
      console.log("After logging in, press Enter in this console to continue.");
      await new Promise((resolve) => process.stdin.once("data", resolve));
      await page.reload({ waitUntil: "networkidle" });
    }

    console.log("Checking login status...");
    const currentUrl = page.url();
    console.log("Current URL after potential login:", currentUrl);

    if (currentUrl.includes("accounts.google.com")) {
      console.log("Login unsuccessful. Please try again.");
      return;
    } else {
      console.log("Logged in successfully.");
    }

    // File upload process
    try {
      console.log("Waiting for 'New' button...");
      await page.waitForSelector('button[aria-label="New"]', {
        state: "visible",
        timeout: 60000,
      });
      console.log("'New' button found. Clicking...");
      await page.click('button[aria-label="New"]');

      console.log("Waiting for 'File upload' option...");
      await page.waitForSelector(
        'div[role="menuitem"][data-tooltip="Upload files"]',
        { state: "visible", timeout: 30000 }
      );
      console.log("'File upload' option found. Clicking...");
      await page.click('div[role="menuitem"][data-tooltip="Upload files"]');

      console.log("Waiting for file input...");
      const fileInput = await page.waitForSelector('input[type="file"]');
      console.log("File input found. Uploading file...");
      await fileInput.setInputFiles(fileToUpload);

      console.log("Waiting for upload confirmation...");
      await page.waitForSelector('div[role="alert"][aria-live="polite"]', {
        state: "visible",
        timeout: 60000,
      });
      console.log("File uploaded successfully");
    } catch (error) {
      console.error("Error during file upload:", error);
    }

    console.log("Waiting for 5 seconds...");
    await page.waitForTimeout(5000);
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    console.log("Closing browser...");
    await browser.close();
  }
}

uploadToDrive();
