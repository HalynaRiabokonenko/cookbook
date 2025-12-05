import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://cookbook-34a7d.web.app/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Proven Recipes - Delicious World cuisine/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://cookbook-34a7d.web.app/');

  // Click the login button
  await page.getByTestId('header-button-login').click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.url).toContain("/login")
  await expect(page.getByTestId('login-form')).toBeVisible();
});
