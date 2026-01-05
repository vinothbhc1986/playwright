import { test, expect } from '@playwright/test';


test.describe('Recording Examples', () => {
  
  test('example with video recording and screenshots', async ({ page }) => {
    // Navigate to a page
    await page.goto('https://playwright.dev/');
    
    // Take a screenshot at a specific point
    await page.screenshot({ path: 'screenshots/homepage.png', fullPage: true });
    
    // Interact with the page
    await page.getByRole('link', { name: 'Get started' }).click();
    
    // Wait for navigation
    await page.waitForLoadState('networkidle');
    
    // Take another screenshot after interaction
    await page.screenshot({ path: 'screenshots/get-started.png', fullPage: true });
    
    // Verify the page content
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
    
    // Take a screenshot of a specific element
    const heading = page.getByRole('heading', { name: 'Installation' });
    await heading.screenshot({ path: 'screenshots/installation-heading.png' });
  });
});

