import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByLabel('Username:').click();
  await page.getByLabel('Username:').fill('admin1');
  await page.getByLabel('Password:').click();
  await page.getByLabel('Password:').fill('password1');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('body').click();
});