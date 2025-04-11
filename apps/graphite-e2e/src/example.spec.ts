import { test, expect } from '@playwright/test';

test.describe('App navigation', () => {
  test('should navigate through pages', async ({ page }) => {
    // Go to the home page
    await page.goto('http://localhost:4200');

    // Assert that the home page is loaded
    const homePageContent = await page.locator('h1');
    await expect(homePageContent).toHaveText(
      ' Hello there, Welcome @react-monorepo/graphite 👋'
    );

    // Navigate to AnalyticsApi page
    await page.click('text=AnalyticsApi');

    // Wait for the AnalyticsApi component to load (ensure it's rendered correctly)
    const analyticsApiContent = await page.locator('h1');
    await expect(analyticsApiContent).toHaveText('Analytics API Page'); // Modify based on your actual component's heading text

    // Navigate to ReferenceData page
    await page.click('text=ReferenceData');

    // Wait for the ReferenceData component to load (ensure it's rendered correctly)
    const referenceDataContent = await page.locator('h1');
    await expect(referenceDataContent).toHaveText('Reference Data Page'); // Modify based on your actual component's heading text
  });
});
