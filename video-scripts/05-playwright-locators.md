# Playwright Locators

**Built-in Locators**
   - page.getByRole()
   - page.getByText()
   - page.getByLabel()
   - page.getByPlaceholder()
   - page.getByAltText()
   - page.getByTitle()
   - page.getByTestId()

**Chaining Locators**
   - Combining locators for more precise element selection
   - Using `filter()`, `nth()`, `first()`, `last()`

**Locator Actions**
   - click()
   - fill()
   - press()
   - check()
   - selectOption()
   - etc.

**Assertions with Locators**
   - expect(locator).toBeVisible()
   - expect(locator).toHaveText()
   - Other common assertions

**Advanced Locator Techniques**
   - Using `and()` and `or()` for complex selections
   - Handling shadow DOM
   - Working with iframes

## Additional Resources

- [Playwright Locator Documentation](https://playwright.dev/docs/locators)
- [Playwright API - Locator](https://playwright.dev/docs/api/class-locator)