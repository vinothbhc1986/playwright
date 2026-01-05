import { test, expect } from '@playwright/test';


test.describe('Recording', () => {
  
  test('video recording and screenshots', async ({ page }) => {
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

  test('trace recording', async ({ page, context }) => {
    // Start tracing
  //  await context.tracing.start({ screenshots: true, snapshots: true });
    
    try {
      await page.goto('https://playwright.dev/');
      
      // Perform some actions
      await page.getByRole('link', { name: 'API' }).click();
      await page.waitForLoadState('networkidle');
      
      // Verify something
      await expect(page).toHaveURL(/.*appi/);
      
    } finally {
      // Stop tracing and save
     // await context.tracing.stop({ path: 'traces/trace2.zip' });

    }
  });
});

