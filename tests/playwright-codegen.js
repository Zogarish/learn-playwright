import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://demoqa.com/text-box");
  await page.getByPlaceholder("Full Name").click();
  await page.getByPlaceholder("Full Name").fill("John Doe");
  await page.getByPlaceholder("name@example.com").click();
  await page.getByPlaceholder("name@example.com").fill("johndoe321@gmail.com");
  await page.getByPlaceholder("Current Address").click();
  await page
    .getByPlaceholder("Current Address")
    .fill("1234 Street Drive, CoolTown, New York, 12345");
  await page.locator("#permanentAddress").click();
  await page
    .locator("#permanentAddress")
    .fill("1234 Street Drive, CoolTown, New York, 12345");
  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByText("Name:John Doe").click();
  await page.getByText("Email:johndoe321@gmail.com").click();
  await page.getByText("Current Address :1234 Street").click();
  await page.getByText("Permananet Address :1234").click();

  // ---------------------
  await context.close();
  await browser.close();
})();
