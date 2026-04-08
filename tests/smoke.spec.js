import { expect, test } from '@playwright/test';

test('public route clamps units to the active piece and can save defaults', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('#start-overlay')).toBeVisible();
  await expect(page.locator('#audience-guide')).toBeVisible();
  await page.evaluate(() => document.getElementById('start-overlay')?.classList.add('hidden'));

  await page.locator('#operator-toggle').click();
  await expect(page.locator('#operator-panel')).toBeVisible();

  await page.selectOption('#op-piece', 'the-glade');
  const unitsInput = page.locator('#op-units');
  await expect(unitsInput).toHaveAttribute('max', '46');
  await expect(unitsInput).toHaveValue('46');

  await unitsInput.evaluate((input) => {
    input.value = '999';
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });
  await expect(unitsInput).toHaveValue('46');

  await page.locator('#op-save-defaults').click();
  await expect(page.locator('#op-session-status')).toContainText('Saved defaults updated');

  const savedSettings = await page.evaluate(() => JSON.parse(localStorage.getItem('inC_settings')));
  expect(savedSettings.piece).toBe('the-glade');
  expect(savedSettings.totalUnits).toBe(46);
});

test('operator route pins the control surface', async ({ page }) => {
  await page.goto('/operator.html');

  await expect(page.locator('body')).toHaveClass(/operator-route/);
  await expect(page.locator('#operator-panel')).toBeVisible();
  await expect(page.locator('#operator-toggle')).toBeHidden();
  await expect(page.locator('#start-overlay')).toBeHidden();
  await expect(page.locator('.route-operator-only')).toHaveText('Audience View');
  await expect(page.locator('#op-session-status')).toContainText('temporary');
});
