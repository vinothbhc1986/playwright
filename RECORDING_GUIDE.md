# Playwright Recording Examples Guide

This guide demonstrates various recording capabilities in Playwright.

## Recording Features

### 1. Video Recording

Videos are automatically recorded based on the configuration in `playwright.config.js`:

```javascript
video: 'retain-on-failure' // Records video and keeps it only if test fails
```

**Options:**
- `'off'` - No video recording
- `'on'` - Always record video
- `'retain-on-failure'` - Record video but only keep it if test fails (default recommended)
- `'on-first-retry'` - Record video only when retrying a failed test

Videos are saved in the `test-results/` directory.

### 2. Screenshot Recording

Screenshots can be taken manually or automatically on failure:

```javascript
// Manual screenshot
await page.screenshot({ path: 'screenshots/my-screenshot.png' });

// Full page screenshot
await page.screenshot({ path: 'screenshots/full-page.png', fullPage: true });

// Element screenshot
await element.screenshot({ path: 'screenshots/element.png' });
```

Configuration in `playwright.config.js`:
```javascript
screenshot: 'only-on-failure' // Takes screenshot automatically on failure
```

### 3. Trace Recording

Traces capture a complete timeline of your test execution:

```javascript
// Start tracing
await context.tracing.start({ 
  screenshots: true, 
  snapshots: true,
  sources: true 
});

// ... perform actions ...

// Stop and save trace
await context.tracing.stop({ path: 'traces/trace.zip' });
```

View traces with:
```bash
npx playwright show-trace traces/trace.zip
```

### 4. Using Playwright Codegen (Interactive Recording)

Generate test code by recording your interactions:

```bash
# Record in Chromium
npx playwright codegen https://playwright.dev

# Record in specific browser
npx playwright codegen --target=javascript --browser=firefox https://example.com

# Record with specific viewport
npx playwright codegen --viewport-size=800,600 https://example.com
```

## Running the Examples

### Run all recording examples:
```bash
npx playwright test tests/recording-example.spec.js
```

### Run with UI mode (interactive):
```bash
npx playwright test --ui
```

### Run specific test:
```bash
npx playwright test tests/recording-example.spec.js -g "example with video"
```

### View test report:
```bash
npx playwright show-report
```

## Output Locations

- **Videos**: `test-results/[test-name]/video.webm`
- **Screenshots**: `screenshots/` (manual) or `test-results/[test-name]/` (automatic)
- **Traces**: `traces/` (manual) or `test-results/[test-name]/trace.zip` (automatic)
- **HTML Report**: `playwright-report/index.html`

## Best Practices

1. **Use `retain-on-failure` for videos** - Saves disk space while keeping videos for debugging failures
2. **Take screenshots at key points** - Helps debug issues and document test flow
3. **Use traces for complex debugging** - Traces provide complete timeline with network, DOM, and console logs
4. **Clean up old recordings** - Regularly clean `test-results/` and `screenshots/` directories
5. **Use codegen for initial test creation** - Record interactions first, then refine the generated code

## Example Workflow

1. **Record initial test** with codegen:
   ```bash
   npx playwright codegen https://example.com
   ```

2. **Refine the generated test** in your test file

3. **Add manual screenshots** at important checkpoints

4. **Run tests** with recording enabled:
   ```bash
   npx playwright test
   ```

5. **Review failures** using videos, screenshots, and traces:
   ```bash
   npx playwright show-report
   npx playwright show-trace test-results/[test-name]/trace.zip
   ```

