import { test, expect } from '@playwright/test'
import { login } from '../helpers.js'

test.describe('Courses Page', () => {
  test.beforeEach(async ({ page }) => {
    await login(page)
    await page.getByRole('link', { name: 'Courses' }).first().click()
    await page.waitForURL(/courses/)
  })

  test('shows courses table with correct columns', async ({ page }) => {
    await expect(page.getByRole('table')).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Title' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Start date' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'End date' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Type' })).toBeVisible()
  })

  test('displays course rows', async ({ page }) => {
    const rows = page.locator('tbody tr')
    await expect(rows.first()).toBeVisible()
    const count = await rows.count()
    expect(count).toBeGreaterThan(0)
  })

  test('search filters courses', async ({ page }) => {
    // Set up response listener before typing to catch the debounced API call
    const responsePromise = page.waitForResponse((resp) => resp.url().includes('search='))
    await page.getByPlaceholder('Zoeken...').fill('Vue')
    await responsePromise

    const rows = page.locator('tbody tr')
    await expect(rows.first()).toBeVisible()

    const count = await rows.count()
    expect(count).toBeGreaterThan(0)

    for (let i = 0; i < count; i++) {
      const text = await rows.nth(i).textContent()
      expect(text?.toLowerCase()).toContain('vue')
    }
  })

  test('pagination is visible when enough items', async ({ page }) => {
    await expect(page.locator('tbody tr').first()).toBeVisible()
    // Courses page uses pageSize 20, mock has 50 courses, so pagination should appear
    await expect(page.getByRole('button', { name: /next/i }).or(page.locator('[aria-label="Go to next page"]'))).toBeVisible()
  })
})
