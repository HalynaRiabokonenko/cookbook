import { test, expect } from '@playwright/test';

test.describe('login page test', () => {
  //Arrange
  const url = '/#/login';

  test('get started link', async ({ page }) => {
    //Act
    await page.goto(url);
    await page.getByTestId('header-button-login').click();
    await page.waitForLoadState('domcontentloaded');

    //Assert
    await expect(page.getByTestId('login-form')).toBeVisible();
  });

  test('login success', async ({ page }) => {

    //Arrange
    const url = '/#/login';
    const username = process.env.E2E_USERNAME;
    const password = process.env.E2E_PASSWORD;

    if (!username || !password) {
      throw new Error('E2E_USERNAME or E2E_PASSWORD is not defined');
    }

    //Act
    await page.goto(url);
    await page.getByTestId('header-button-login').click();
    await page.waitForLoadState('domcontentloaded');
    await page.getByTestId('input-email').fill(username);
    await page.getByTestId('input-password').fill(password);
    await page.getByTestId('button-submit').click();
    await page.waitForLoadState('domcontentloaded');

    //Assert
    await expect(page.getByTestId('header__account-container')).toBeVisible();
  });

  test('login fail', async ({ page }) => {
    //Arrange
    const url = '/#/login';
    const invalidUsername = 'invalid-user@example.com';
    const invalidPassword = 'invalid-password';

    //Act
    await page.goto(url);
    await page.getByTestId('header-button-login').click();
    await page.waitForLoadState('domcontentloaded');
    await page.getByTestId('input-email').fill(invalidUsername);
    await page.getByTestId('input-password').fill(invalidPassword);
    await page.getByTestId('button-submit').click();

    //Assert
    await expect(page.locator('.Toastify__toast-icon')).toBeVisible();
    await expect(page.getByText('Incorrect credentials')).toBeVisible();
    await expect(page.getByTestId('header__account-container')).not.toBeVisible();
  });
});
