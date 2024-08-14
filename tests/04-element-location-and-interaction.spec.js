import { test, expect } from "@playwright/test";

test("Element Location Techniques", async ({ page }) => {
  // Navigate to a sample website
  await page.goto("https://www.saucedemo.com/");

  // Check Url
  await expect(page).toHaveURL(/saucedemo.com/);

  // Locate By Property
  await expect(page.locator('[data-test="login-password"]')).toHaveText(
    /secret_sauce/
  );

  // Locate By CSS
  await page.locator("#user-name").fill("locked_out_user");

  // Locate By XPath
  await page.locator('//input[@id="password"]').fill("secret_sauce");

  // Check If Login Button is Visible
  await expect(page.locator('[name="login-button"]')).toBeVisible();

  // Click On Login
  await page.locator('[name="login-button"]').click();
});

test("Interacting with Single Elements and Filling Input Box", async ({
  page,
}) => {
  // Navigate to a sample website
  await page.goto("https://www.saucedemo.com/");

  // Check Title
  await expect(page).toHaveTitle(/Swag Labs/);

  // Check URL
  await expect(page).toHaveURL(/saucedemo.com/);

  // Fill Email
  await page.locator('[placeholder="Username"]').fill("standard_user");

  // Check Email
  await expect(page.locator('[placeholder="Username"]')).toHaveValue(
    "standard_user"
  );

  // Fill Password
  await page.locator('[placeholder="Password"]').fill("secret_sauce");

  // Check Password
  await expect(page.locator('[placeholder="Password"]')).toHaveValue(
    "secret_sauce"
  );

  // Checks If Login Button is Visible
  await expect(page.locator('[id="login-button"]')).toBeVisible();

  // Clicking On Login
  await page.locator('[id="login-button"]').click();

  // Checks Login URL
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
});

test("Handling Multiple Elements", async ({ page }) => {
  // Navigate to a sample website
  await page.goto("https://www.saucedemo.com/");

  // Check Title
  await expect(page).toHaveTitle(/Swag Labs/);

  // Check URL
  await expect(page).toHaveURL(/saucedemo.com/);

  // Fill Email
  await page.locator('[placeholder="Username"]').fill("standard_user");

  // Check Email
  await expect(page.locator('[placeholder="Username"]')).toHaveValue(
    "standard_user"
  );

  // Fill Password
  await page.locator('[placeholder="Password"]').fill("secret_sauce");

  // Check Password
  await expect(page.locator('[placeholder="Password"]')).toHaveValue(
    "secret_sauce"
  );

  // Checks If Login Button is Visible
  await expect(page.locator('[id="login-button"]')).toBeVisible();

  // Clicking On Login
  await page.locator('[id="login-button"]').click();

  // Checks Login URL
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

  // Checks Multiple Elements
  const itemsInfo = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll(".inventory_item"));

    return items.map((item) => ({
      name: item.querySelector(".inventory_item_name").textContent,
      price: item.querySelector(".inventory_item_price").textContent,
      description: item.querySelector(".inventory_item_desc").textContent,
    }));
  });

  console.log(itemsInfo);

  // Checks the Array if it's has data
  await expect(itemsInfo.length).toBeGreaterThan(0);

  // Checks If Array has Name, Price and Description
  await expect(itemsInfo[0]).toHaveProperty("name");
  await expect(itemsInfo[0]).toHaveProperty("price");
  await expect(itemsInfo[0]).toHaveProperty("description");
});
