import { test, expect } from '@playwright/test';

test.describe('home page tests', () => {


  test('has title', async ({ page }) => {
    //Arrange
    const url = 'https://cookbook-34a7d.web.app/';
    const title = /Proven Recipes - Delicious World cuisine/;

    //Act
    await page.goto(url);

    //Assert
    await expect(page).toHaveTitle(title);
  });

  test('get started link', async ({ page }) => {
    //Arrange
    const url = 'https://cookbook-34a7d.web.app/';

    //Act
    await page.goto(url);
    await page.getByTestId('header-button-login').click();
    await page.waitForLoadState('domcontentloaded');

    //Assert
    await expect(page).toHaveURL(/.*login/);
  });
});

