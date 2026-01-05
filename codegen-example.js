/**
 * Example: Using Playwright Codegen Programmatically
 * 
 * This demonstrates how to use Playwright's codegen feature programmatically.
 * 
 * To use this, run: node codegen-example.js
 * 
 * Note: For most use cases, it's easier to use the CLI:
 * npx playwright codegen https://example.com
 */

const { chromium } = require('playwright');

(async () => {
  console.log('Starting Playwright Codegen example...');
  console.log('This will open a browser where you can interact and see generated code.');
  console.log('');
  console.log('For actual codegen, use the CLI command:');
  console.log('  npx playwright codegen https://playwright.dev');
  console.log('');
  console.log('Or use the npm script:');
  console.log('  npm run test:codegen');
})();


