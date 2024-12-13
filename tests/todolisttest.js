import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/todolist');
  
  //test1 adding homework
  await page.getByPlaceholder('Enter a new To-Do').click();
  await page.getByPlaceholder('Enter a new To-Do').fill('homework');
  await page.getByRole('button', { name: 'Add your To-Do' }).click();
  await page.getByRole('button', { name: 'Delete' }).click();

//test2 adding go gym
  await page.getByPlaceholder('Enter a new To-Do').click();
  await page.getByPlaceholder('Enter a new To-Do').fill('go gym');
  await page.getByRole('button', { name: 'Add your To-Do' }).click();
  await page.getByRole('button', { name: 'Delete' }).click();

  
  await page.locator('html').click();
});