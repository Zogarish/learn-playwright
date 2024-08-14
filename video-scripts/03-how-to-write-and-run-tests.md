# How To Write and Run Test

## Setting Up Your Test File

1. Create a new test file in your designated test folder.
2. Import the essential Playwright tools:

```
import { test, expect } from "@playwright/test";
```

## Writing Your Test

The basic structure of a Playwright test is:

```javascript
test("Your descriptive test name", async ({ page }) => {
  // Your test code goes here
});
```

Key points:

- Choose a clear, descriptive name for your test.
- The `async` keyword is crucial - it allows you to use `await` for asynchronous operations.
- The `{ page }` parameter gives you access to Playwright's powerful page object.

## Executing Your Tests

Playwright offers flexible test execution options:

- `npx playwright test`: Run all tests in headless mode across all browsers.
- `npx playwright test "filename"`: Run a specific test file.
- `npx playwright test "filename" --project=chromium`: Target a specific browser.
- `npx playwright test "filename" --project=chromium --headed`: Run in headed mode.
- `npx playwright test "filename" --project=chromium --headed --debug`: Run with debugger.

## Key Terminology

- Project: Refers to browser types (chromium, webkit, firefox)
