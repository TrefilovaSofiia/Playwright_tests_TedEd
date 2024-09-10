import { test, expect } from '@playwright/test';
import path from 'path';

const authFile = path.resolve(__dirname, './state.json');

test('Tests using Storage State', async({page}) => {

      // Sign In
      await page.goto('https://ed.ted.com/lessons?direction=desc&sort=featured-position');
      await page.getByRole('button', { name: 'Confirm My Choices' }).click();
      await page.getByRole('link', { name: 'How did ancient civilizations' }).click();
      await page.getByRole('link', { name: 'Customize this lesson' }).click();
      await page.getByRole('button', { name: 'Confirm My Choices' }).click();
      await page.getByTestId('lookup__username__1').click();
      await page.getByTestId('lookup__username__1').fill('criobubble@gmail.com');
      await page.getByTestId('lookup__continue__3').click();
      await page.getByTestId('credentials__password__2').click();
      await page.getByTestId('credentials__password__2').fill('Test123!');
      await page.getByTestId('credentials__continue__3').click();
      await page.getByRole('link', { name: 'Customize this lesson' }).click();

    await page.context().storageState({ path: authFile });
  });
