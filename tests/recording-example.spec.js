import { test, expect } from '@playwright/test';

/**
 * Playwright Recording Example
 * 
 * This example demonstrates various recording capabilities:
 * 1. Video recording (automatic with config)
 * 2. Screenshot capture
 * 3. Trace recording
 * 4. Full page screenshots
 */

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

  test('example with trace recording', async ({ page, context }) => {
    // Start tracing
    await context.tracing.start({ screenshots: true, snapshots: true });
    
    try {
      await page.goto('https://playwright.dev/');
      
      // Perform some actions
      await page.getByRole('link', { name: 'API' }).click();
      await page.waitForLoadState('networkidle');
      
      // Verify something
      await expect(page).toHaveURL(/.*api/);
      
    } finally {
      // Stop tracing and save
      await context.tracing.stop({ path: 'traces/trace.zip' });
    }
  });

  test('example with multiple recording methods', async ({ page, context }) => {
    // Start tracing with all options
    await context.tracing.start({
      screenshots: true,
      snapshots: true,
      sources: true,
    });
    
    try {
      // Navigate
      await page.goto('https://playwright.dev/');
      
      // Take a screenshot
      await page.screenshot({ path: 'screenshots/full-example-1.png' });
      
      // Search for something
      const searchButton = page.getByRole('button', { name: 'Search' });
      if (await searchButton.isVisible()) {
        await searchButton.click();
        await page.waitForTimeout(500);
        await page.screenshot({ path: 'screenshots/full-example-2.png' });
      }
      
      // Navigate to docs
      await page.getByRole('link', { name: 'Docs' }).click();
      await page.waitForLoadState('networkidle');
      
      // Final screenshot
      await page.screenshot({ path: 'screenshots/full-example-3.png', fullPage: true });
      
    } finally {
      // Save trace
      await context.tracing.stop({ path: 'traces/full-example-trace.zip' });
    }
  });

  test('example with video recording on failure', async ({ page }) => {
    // This test will record video automatically if it fails
    // Video recording is configured in playwright.config.js
    
    await page.goto('https://playwright.dev/');
    
    // This assertion might fail, triggering video recording
    await expect(page.getByRole('heading', { name: 'Non-existent Heading' })).toBeVisible();
  });
});

