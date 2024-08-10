# How To Write and Run Tests:

## How To Setup Test File
- Create a Test File In Test Folder
- Import Playwright with Test and Expect
  import { test, expect } from "@playwright/test";

## How to Write Test
- Normal test layout:
  test("Name of test", async ({ page }) => {})
  Explain:
  - You write the name of what you want to call your test.
  - Have the async in the function because this make it as an asynchronous operations. You can use the word await to have the function. Which cause the code to pause here until that operation completes before moving to the next line.
  - By having "page", you are telling Playwright, you want to work with the page object in this test to interact with it.
