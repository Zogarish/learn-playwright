# Locating and Interacting With Elements

## Locating Elements: Your Treasure Map 🗺️

Playwright offers multiple ways to find elements.

1. **By Properties**: Use More Define Attributes

   ```javascript
   await page.locator('[name="login-button"]').click();
   ```

2. **CSS Selectors**: id="user-name" --> #user-name

   ```javascript
   await page.locator("#user-name").fill("locked_out_user");
   ```

3. **XPath**: //Something[@locator]
   ```javascript
   await page.locator('//input[@id="password"]').fill("secret_sauce");
   ```

## Single Element Operations: One-on-One Interaction 🎯

### Clicking Elements

```javascript
await page.locator('[id="login-button"]').click();
```

### Filling Input Boxes

```javascript
await page.locator('[placeholder="Username"]').fill("standard_user");
```

## Multiple Elements

Using `evaluate()` is an efficient way to interact with multiple elements:

```javascript
const itemsInfo = await page.evaluate(() => {
  // Select all elements of interest
  const items = Array.from(document.querySelectorAll('.inventory_item'));
  
  // Map over the elements to extract desired information
  return items.map(item => ({
    name: item.querySelector('.inventory_item_name').textContent,
    price: item.querySelector('.inventory_item_price').textContent
  }));
});

console.log(`Found ${itemsInfo.length} items!`);

// Process the extracted information
itemsInfo.forEach(item => {
  console.log(`Item: ${item.name}, Price: ${item.price}`);
});
