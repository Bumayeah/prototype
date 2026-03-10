import { test, expect } from '@playwright/test'
import { login } from '../helpers.js'

test.describe('Education Page', () => {
  test.beforeEach(async ({ page }) => {
    await login(page)
    await page.getByRole('link', { name: 'Education' }).click()
    await page.waitForURL(/education/)
  })

  test('shows education cards', async ({ page }) => {
    // Education page renders a grid of cards, not a table
    const cards = page.locator('[data-slot="card"]')
    await expect(cards.first()).toBeVisible()
    const count = await cards.count()
    expect(count).toBeGreaterThan(0)
  })

  test('education cards have title and description', async ({ page }) => {
    const firstCard = page.locator('[data-slot="card"]').first()
    await expect(firstCard).toBeVisible()

    // Cards should have some text content
    const text = await firstCard.textContent()
    expect(text?.length).toBeGreaterThan(0)
  })
})
