import { test, expect } from '@playwright/test'
import { login } from '../helpers.js'

test.describe('Reports Page', () => {
  test.beforeEach(async ({ page }) => {
    await login(page)
    await page.getByRole('link', { name: 'Reports' }).click()
    await page.waitForURL(/reports/)
  })

  test('shows subscriptions chart card', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Subscriptions' })).toBeVisible()
    await expect(page.getByText(/Personal v.s. employee subscriptions/)).toBeVisible()
  })

  test('has time range selector', async ({ page }) => {
    const selector = page.getByRole('combobox').or(page.locator('select'))
    await expect(selector).toBeVisible()
  })

  test('shows chart visualization', async ({ page }) => {
    // The chart should render an SVG element
    const chart = page.locator('svg').first()
    await expect(chart).toBeVisible()
  })
})
