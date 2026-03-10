import { test, expect } from '@playwright/test'
import { login } from '../helpers.js'

test.describe('Employees Page', () => {
  test.beforeEach(async ({ page }) => {
    await login(page)
    await page.getByRole('link', { name: 'Employees' }).click()
    await page.waitForURL(/employees/)
  })

  test('shows employees table with correct columns', async ({ page }) => {
    await expect(page.getByRole('table')).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'First name' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Last name' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Email' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Function' })).toBeVisible()
  })

  test('displays employee rows', async ({ page }) => {
    const rows = page.locator('tbody tr')
    await expect(rows.first()).toBeVisible()
    const count = await rows.count()
    expect(count).toBeGreaterThan(0)
  })

  test('search input is present and functional', async ({ page }) => {
    await expect(page.locator('tbody tr').first()).toBeVisible()

    const searchInput = page.getByPlaceholder('Zoeken...')
    await expect(searchInput).toBeVisible()

    // Type a non-matching search to verify it filters
    await searchInput.fill('xyznonexistent')

    await expect(page.getByText('No results.')).toBeVisible()
  })

  test('has action menu with View details', async ({ page }) => {
    const firstRow = page.locator('tbody tr').first()
    await expect(firstRow).toBeVisible()

    await firstRow.getByRole('button').click()
    await expect(page.getByRole('menuitem', { name: 'View details' })).toBeVisible()
  })
})

test.describe('Employee Subscriptions Page', () => {
  test.beforeEach(async ({ page }) => {
    await login(page)
    await page.goto('/employees/employees-subscriptions')
    await page.waitForURL(/employees-subscriptions/)
  })

  test('shows employee subscriptions table', async ({ page }) => {
    await expect(page.getByRole('table')).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Employee' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Course' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Start date' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Status' })).toBeVisible()
  })

  test('displays rows', async ({ page }) => {
    const rows = page.locator('tbody tr')
    await expect(rows.first()).toBeVisible()
    const count = await rows.count()
    expect(count).toBeGreaterThan(0)
  })
})

test.describe('Employee Certificates Page', () => {
  test.beforeEach(async ({ page }) => {
    await login(page)
    await page.goto('/employees/employees-certificates')
    await page.waitForURL(/employees-certificates/)
  })

  test('shows employee certificates table', async ({ page }) => {
    await expect(page.getByRole('table')).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Employee' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: /Course/i })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Status' })).toBeVisible()
  })

  test('displays rows', async ({ page }) => {
    const rows = page.locator('tbody tr')
    await expect(rows.first()).toBeVisible()
    const count = await rows.count()
    expect(count).toBeGreaterThan(0)
  })
})
