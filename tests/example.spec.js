import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

// Examples demonstrating page.selectOption usage

test.describe('selectOption examples', () => {
  test('select option by value', async ({ page }) => {
    await page.setContent(`
      <select id="color">
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
      </select>
    `);

    await page.selectOption('#color', 'green');
    const value = await page.locator('#color').inputValue();
    expect(value).toBe('green');
  });

  test('select option by label', async ({ page }) => {
    await page.setContent(`
      <select id="color">
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
      </select>
    `);

    await page.selectOption('#color', { label: 'Blue' });
    const value = await page.$eval('#color', el => el.value);
    expect(value).toBe('blue');
  });

  test('select by index', async ({ page }) => {
    await page.setContent(`
      <select id="color">
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
      </select>
    `);

    await page.selectOption('#color', { index: 0 });
    const value = await page.$eval('#color', el => el.value);
    expect(value).toBe('red');
  });

  test('select multiple options', async ({ page }) => {
    await page.setContent(`
      <select id="fruits" multiple>
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="cherry">Cherry</option>
      </select>
    `);

    const selected = await page.selectOption('#fruits', ['banana', 'cherry']);
    expect(selected).toEqual(['banana', 'cherry']);

    const values = await page.locator('#fruits option:checked').evaluateAll(opts => opts.map(o => o.value));
    expect(values).toEqual(['banana', 'cherry']);
  });
});

``