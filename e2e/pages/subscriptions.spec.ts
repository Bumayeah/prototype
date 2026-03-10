import { test, expect } from '@playwright/test'
import { login } from '../helpers.js'

test.describe('Subscriptions Page', () => {
  test.beforeEach(async ({ page }) => {
    await login(page)
    await page.getByRole('link', { name: 'Subscriptions' }).first().click()
    await page.waitForURL(/subscriptions/)
  })

  test('shows subscriptions table with correct columns', async ({ page }) => {
    await expect(page.getByRole('table')).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Courses' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: /Education/i })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Status' })).toBeVisible()
  })

  test('displays subscription rows', async ({ page }) => {
    const rows = page.locator('tbody tr')
    await expect(rows.first()).toBeVisible()
    const count = await rows.count()
    expect(count).toBeGreaterThan(0)
  })

  test('shows status badges', async ({ page }) => {
    await expect(page.locator('tbody tr').first()).toBeVisible()
    // Status should be either "subscribed" or "cancelled"
    const badges = page.locator('tbody [data-slot="badge"]')
    const count = await badges.count()
    expect(count).toBeGreaterThan(0)
  })

  test('search filters subscriptions', async ({ page }) => {
    await expect(page.locator('tbody tr').first()).toBeVisible()
    const initialCount = await page.locator('tbody tr').count()

    await page.getByPlaceholder('Zoeken...').fill('xyznonexistent')

    // Wait for debounce by asserting the "No results." message appears
    await expect(page.getByText('No results.')).toBeVisible()
  })
})
