import { test, expect } from '@playwright/test'
import { login } from '../helpers.js'

test.describe('Register Page', () => {
  test.beforeEach(async ({ page }) => {
    await login(page)
    await page.getByRole('link', { name: 'Register' }).click()
    await page.waitForURL(/register/)
  })

  test('shows register table with correct columns', async ({ page }) => {
    await expect(page.getByRole('table')).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Title' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Start Date' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Graduation Date' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Status' })).toBeVisible()
  })

  test('displays register rows', async ({ page }) => {
    const rows = page.locator('tbody tr')
    await expect(rows.first()).toBeVisible()
    const count = await rows.count()
    expect(count).toBeGreaterThan(0)
  })

  test('shows status badges (Active, Pending, Denied)', async ({ page }) => {
    await expect(page.locator('tbody tr').first()).toBeVisible()
    const badges = page.locator('tbody [data-slot="badge"]')
    const count = await badges.count()
    expect(count).toBeGreaterThan(0)
  })

  test('has action menu with options', async ({ page }) => {
    const firstRow = page.locator('tbody tr').first()
    await expect(firstRow).toBeVisible()

    await firstRow.getByRole('button').click()
    await expect(page.getByRole('menuitem', { name: 'View Details' })).toBeVisible()
    await expect(page.getByRole('menuitem', { name: 'Edit' })).toBeVisible()
  })
})

test.describe('PE Activities Page', () => {
  test.beforeEach(async ({ page }) => {
    await login(page)
    await page.goto('/register/pe-activities')
    await page.waitForURL(/pe-activities/)
  })

  test('shows pe-activities table with correct columns', async ({ page }) => {
    await expect(page.getByRole('table')).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Title' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Provider' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Hours' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Points' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Status' })).toBeVisible()
  })

  test('displays pe-activity rows', async ({ page }) => {
    const rows = page.locator('tbody tr')
    await expect(rows.first()).toBeVisible()
    const count = await rows.count()
    expect(count).toBeGreaterThan(0)
  })

  test('has action menu with options', async ({ page }) => {
    const firstRow = page.locator('tbody tr').first()
    await expect(firstRow).toBeVisible()

    await firstRow.getByRole('button').click()
    await expect(page.getByRole('menuitem', { name: 'View Details' })).toBeVisible()
    await expect(page.getByRole('menuitem', { name: 'Edit' })).toBeVisible()
  })
})

test.describe('Cycles Page', () => {
  test.beforeEach(async ({ page }) => {
    await login(page)
    await page.goto('/register/cycles')
    await page.waitForURL(/cycles/)
  })

  test('shows cycles table with correct columns', async ({ page }) => {
    await expect(page.getByRole('table')).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Title' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Registered' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Remaining' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Hours' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Points' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Status' })).toBeVisible()
  })

  test('displays cycle rows', async ({ page }) => {
    const rows = page.locator('tbody tr')
    await expect(rows.first()).toBeVisible()
    const count = await rows.count()
    expect(count).toBeGreaterThan(0)
  })

  test('has action menu with options', async ({ page }) => {
    const firstRow = page.locator('tbody tr').first()
    await expect(firstRow).toBeVisible()

    await firstRow.getByRole('button').click()
    await expect(page.getByRole('menuitem', { name: 'View Details' })).toBeVisible()
    await expect(page.getByRole('menuitem', { name: 'Download Report' })).toBeVisible()
  })
})
