import { test, expect } from '@playwright/test';

test.describe('login page test', () => {
  //Arrange
  const url = 'https://cookbook-34a7d.web.app/';

  test('get started link', async ({ page }) => {
    //Act
    await page.goto(url);
    await page.getByTestId('header-button-login').click();
    await page.waitForLoadState('domcontentloaded');

    //Assert
    await expect(page.getByTestId('login-form')).toBeVisible();
  });
});

