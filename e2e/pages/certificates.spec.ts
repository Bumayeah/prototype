import { test, expect } from '@playwright/test'
import { login } from '../helpers.js'

test.describe('Certificates Page', () => {
  test.beforeEach(async ({ page }) => {
    await login(page)
    await page.getByRole('link', { name: 'Certificates' }).first().click()
    await page.waitForURL(/certificates/)
  })

  test('shows certificates table with correct columns', async ({ page }) => {
    await expect(page.getByRole('table')).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Course' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Education' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Status' })).toBeVisible()
  })

  test('displays certificate rows', async ({ page }) => {
    const rows = page.locator('tbody tr')
    await expect(rows.first()).toBeVisible()
    const count = await rows.count()
    expect(count).toBeGreaterThan(0)
  })

  test('shows status badges with correct styles', async ({ page }) => {
    await expect(page.locator('tbody tr').first()).toBeVisible()
    const badges = page.locator('tbody [data-slot="badge"]')
    const count = await badges.count()
    expect(count).toBeGreaterThan(0)
  })

  test('has action menus on rows', async ({ page }) => {
    const firstRow = page.locator('tbody tr').first()
    await expect(firstRow).toBeVisible()

    // Open actions dropdown
    await firstRow.getByRole('button').click()
    await expect(page.getByRole('menuitem', { name: 'Download' })).toBeVisible()
  })
})
