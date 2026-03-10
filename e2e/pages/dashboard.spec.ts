import { test, expect } from '@playwright/test'
import { login } from '../helpers.js'

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, 'jane@test.nl', '1234')
    await page.getByRole('link', { name: 'Dashboard' }).click()
    await page.waitForURL(/dashboard/)
  })

  test('shows trainer courses table', async ({ page }) => {
    await expect(page.getByRole('table')).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Title' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Start date' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Status' })).toBeVisible()
  })

  test('shows filter tabs', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'All' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Invited' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Planned' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Pending' })).toBeVisible()
  })

  test('filters by Invited status', async ({ page }) => {
    await page.getByRole('button', { name: 'Invited' }).click()

    const rows = page.locator('tbody tr')
    await expect(rows.first()).toBeVisible()

    const statusCells = page.getByRole('cell').filter({ hasText: /^Invited$/ })
    const count = await statusCells.count()
    expect(count).toBeGreaterThan(0)

    await expect(page.getByRole('cell').filter({ hasText: /^Planned$/ })).toHaveCount(0)
    await expect(page.getByRole('cell').filter({ hasText: /^Pending$/ })).toHaveCount(0)
  })

  test('filters by Planned status', async ({ page }) => {
    await page.getByRole('button', { name: 'Planned' }).click()

    const statusCells = page.getByRole('cell').filter({ hasText: /^Planned$/ })
    const count = await statusCells.count()
    expect(count).toBeGreaterThan(0)

    await expect(page.getByRole('cell').filter({ hasText: /^Invited$/ })).toHaveCount(0)
  })

  test('All filter shows all courses', async ({ page }) => {
    await page.getByRole('button', { name: 'Invited' }).click()
    await expect(page.locator('tbody tr').first()).toBeVisible()

    await page.getByRole('button', { name: 'All' }).click()

    // Wait for table to reload with more rows than the Invited filter (4)
    await expect(page.locator('tbody tr')).not.toHaveCount(4)
    const count = await page.locator('tbody tr').count()
    expect(count).toBeGreaterThanOrEqual(10)
  })

  test('Apply action changes status from Invited to Pending', async ({ page }) => {
    await page.getByRole('button', { name: 'Invited' }).click()

    const firstRow = page.locator('tbody tr').first()
    const title = await firstRow.locator('td').first().textContent()

    // Open action menu on first row
    await firstRow.getByRole('button').click()
    await page.getByRole('menuitem', { name: 'Apply' }).click()

    // After applying, the row should no longer show as Invited
    // Switch to All to find it with Pending status
    await page.getByRole('button', { name: 'All' }).click()

    const updatedRow = page.locator('tbody tr', { hasText: title! })
    await expect(updatedRow.getByText('Pending')).toBeVisible()
  })

  test('search filters courses by title', async ({ page }) => {
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

  test('shows no courses for non-trainer user', async ({ page }) => {
    // Clear auth state and login as non-trainer (Manager, no trainer courses)
    await page.evaluate(() => localStorage.clear())
    await login(page, 'test@test.nl', '1234')
    await page.getByRole('link', { name: 'Dashboard' }).click()
    await page.waitForURL(/dashboard/)

    await expect(page.getByText('No results.')).toBeVisible()
  })
})
