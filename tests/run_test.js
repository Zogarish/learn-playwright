import { chromium, expect } from "@playwright/test";

async function runTests() {
  console.log("Starting tests with Chrome...");
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();

  // Netflix Home Page Test
  async function testNetflixHomePage() {
    console.log("Running Netflix Home Page test...");
    const page = await context.newPage();
    await page.goto("https://www.netflix.com/");

    // Check for title
    await expect(page).toHaveTitle(/Netflix/);

    // Check for URL
    await expect(page).toHaveURL("https://www.netflix.com/");

    // Check using toHaveText and getByRole
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Unlimited movies, TV shows, and more"
    );

    // Checking using getByLabel
    await page.getByLabel("Email Address").nth(1).fill("abc@gmail.com");

    // Checks If Login Button Is Visible
    await expect(page.locator('[id="signIn"]')).toBeVisible();

    console.log("Netflix Home Page test passed");
    await page.close();
  }

  // Netflix Login Test With Email
  async function testNetflixLogin() {
    console.log("Running Netflix Login test...");
    const page = await context.newPage();
    await page.goto("https://www.netflix.com/");

    // Check Title Using getByTitle
    await expect(page).toHaveTitle(/Netflix/);

    // Checks if Login Button is Visible and Clickable
    await expect(page.locator('[id="signIn"]')).toBeVisible();
    await expect(page.locator('[id="signIn"]')).toBeEnabled();

    // Click Login Button
    await page.locator('[id="signIn"]').click();

    // Check if we're on the login page
    await expect(page).toHaveURL("https://www.netflix.com/login");

    // Check Using getByText
    await expect(page.getByText("New to Netflix?")).toBeVisible();

    await page.waitForTimeout(3000);

    // Fill In Email
    await page.locator('[autocomplete="email"]').fill("yoMail@gmail.com");

    // Slow Down Fill
    await page.waitForTimeout(3000);

    // Fill In Password
    await page.locator('[autocomplete="password"]').fill("123qweasdzxc");

    // Checks for Sign In Button is Visible and Clickable
    await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign In" })).toBeEnabled();

    // Click On Sign In After Email and Password
    await page.getByRole("button", { name: "Sign In" }).click();

    await expect(
      page.getByText("Incorrect password for yoMail@gmail.com")
    ).toBeVisible();

    console.log("Netflix Login test passed");
    await page.close();
  }

  // Netflix Login Test With Phone
  async function testNetflixLogin2() {
    console.log("Running Netflix Login 2 test...");
    const page = await context.newPage();
    await page.goto("https://www.netflix.com/");

    // Check Title Using getByTitle
    await expect(page).toHaveTitle(/Netflix/);

    // Checks if Login Button is Visible and Clickable
    await expect(page.locator('[id="signIn"]')).toBeVisible();
    await expect(page.locator('[id="signIn"]')).toBeEnabled();

    // Click Login Button
    await page.locator('[id="signIn"]').click();

    // Check if we're on the login page
    await expect(page).toHaveURL("https://www.netflix.com/login");

    // Check Using getByText
    await expect(page.getByText("New to Netflix?")).toBeVisible();

    await page.waitForTimeout(3000);

    // Fill In Email
    await page.locator('[autocomplete="email"]').fill("302-321-5642");

    // Slow Down Fill
    await page.waitForTimeout(3000);

    // Fill In Password
    await page.locator('[autocomplete="password"]').fill("123qweasdzxc");

    // Checks for Sign In Button is Visible and Clickable
    await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign In" })).toBeEnabled();

    // Click On Sign In After Email and Password
    await page.getByRole("button", { name: "Sign In" }).click();

    await expect(
      page.getByText("Incorrect password for 302-321-5642")
    ).toBeVisible();

    console.log("Netflix Login test passed");
    await page.close();
  }

  // Netflix Login Test Assertions Checking If Email Or Phone Number is Fill; Same With Password
  async function testNetflixLoginValidation() {
    console.log("Running Netflix Login Validation test...");
    const page = await context.newPage();
    await page.goto("https://www.netflix.com/login");

    // Check Title Using getByTitle
    await expect(page).toHaveTitle(/Netflix/);

    // Check if we're on the login page
    await expect(page).toHaveURL("https://www.netflix.com/login");

    // Check Using getByText
    await expect(page.getByText("New to Netflix?")).toBeVisible();

    // Click email field and then click away to trigger validation
    await page.locator('[autocomplete="email"]').click();
    await page.locator("body").click();

    // Wait for and check email validation message
    await expect(page.locator('[id=":r1:"]')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('[id=":r1:"]')).toContainText(
      "Please enter a valid email or phone number"
    );

    // Click password field and then click away to trigger validation
    await page.locator('[autocomplete="password"]').click();
    await page.getByRole("heading", { level: 1 }).click();

    // Wait for and check password validation message
    await expect(page.locator('[id=":r4:"]')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('[id=":r4:"]')).toContainText(
      "Your password must contain between 4 and 60 characters."
    );

    console.log("Netflix Login Validation test passed");
    await page.close();
  }

  // Netflix Login Test Assertions Checking If Email Or Phone Number is Fill; Same With Password But Invalid
  async function testNetflixLoginValidation2() {
    console.log("Running Netflix Login Validation test...");
    const page = await context.newPage();

    // Go to Netflix Login Page
    await page.goto("https://www.netflix.com/login");

    // Go Check If Correct URL
    await expect(page).toHaveURL("https://www.netflix.com/login");

    // Check If Title Is Correct
    await expect(page).toHaveTitle("Netflix");

    // Fill In Invalid Email
    await page.locator('[autocomplete="email"]').fill("abc");
    await page.waitForTimeout(5000);

    // Fill In Invalid Password
    await page.locator('[autocomplete="password"]').fill("123");
    await page.waitForTimeout(5000);

    // Click On Sign In
    await page.getByRole("button", { name: "Sign In" }).click();

    // Check Email validation message
    await expect(page.locator('[id=":r1:"]')).toBeVisible({ timeout: 3000 });
    await expect(page.locator('[id=":r1:"]')).toContainText(
      "Please enter a valid email"
    );

    // Check Password Validation Message
    await expect(page.locator('[id=":r4:"]')).toBeVisible({ timeout: 3000 });
    await expect(page.locator('[id=":r4:"]')).toContainText(
      "Your password must contain between 4 and 60 characters."
    );

    console.log("Netflix Login Validation test 2 passed");
    await page.close();
  }

  // Netflix Login Test Assertions Checking If Email Or Phone Number is Fill; Same With Password But Invalid
  async function testNetflixLoginValidation3() {
    console.log("Running Netflix Login Validation test...");
    const page = await context.newPage();

    // Go to Netflix Login Page
    await page.goto("https://www.netflix.com/login");

    // Go Check If Correct URL
    await expect(page).toHaveURL("https://www.netflix.com/login");

    // Check If Title Is Correct
    await expect(page).toHaveTitle("Netflix");

    // Fill In Invalid Email
    await page.locator('[autocomplete="email"]').fill("123");
    await page.waitForTimeout(5000);

    // Fill In Invalid Password
    await page.locator('[autocomplete="password"]').fill("123");
    await page.waitForTimeout(5000);

    // Click On Sign In
    await page.getByRole("button", { name: "Sign In" }).click();

    // Check Email validation message
    await expect(page.locator('[id=":r1:"]')).toBeVisible({ timeout: 3000 });
    await expect(page.locator('[id=":r1:"]')).toContainText(
      "Please enter a valid phone number."
    );

    // Check Password Validation Message
    await expect(page.locator('[id=":r4:"]')).toBeVisible({ timeout: 3000 });
    await expect(page.locator('[id=":r4:"]')).toContainText(
      "Your password must contain between 4 and 60 characters."
    );

    console.log("Netflix Login Validation test 2 passed");
    await page.close();
  }

  try {
    await testNetflixHomePage();
    await testNetflixLogin();
    await testNetflixLogin2();
    await testNetflixLoginValidation();
    await testNetflixLoginValidation2();
    await testNetflixLoginValidation3();
    console.log("All tests passed successfully.");
  } catch (error) {
    console.error("Test failed:", error.message);
  }

  console.log("Tests completed.");
  await browser.close();
  console.log("Browser closed.");
}

runTests().catch(console.error);
