import { test, expect } from '@playwright/test'
import { login } from '../helpers.js'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await login(page)
  })

  test('sidebar shows all main nav sections', async ({ page }) => {
    await expect(page.getByText('General')).toBeVisible()
    await expect(page.getByText('Personal')).toBeVisible()
    await expect(page.getByText('Contactperson')).toBeVisible()
    await expect(page.getByText('Trainer')).toBeVisible()
  })

  test('sidebar shows main nav items', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Courses' }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: 'Education' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Subscriptions' }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: 'Certificates' }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: 'Register' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Employees' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Reports' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible()
  })

  test('navigating between pages works', async ({ page }) => {
    await page.getByRole('link', { name: 'Education' }).click()
    await expect(page).toHaveURL(/education/)

    await page.getByRole('link', { name: 'Dashboard' }).click()
    await expect(page).toHaveURL(/dashboard/)

    await page.getByRole('link', { name: 'Reports' }).click()
    await expect(page).toHaveURL(/reports/)
  })

  test('shows user info in sidebar footer', async ({ page }) => {
    // jane@test.nl logs in as userId 2 (Jane Smith, jane@test.nl in JWT)
    await expect(page.getByText('Jane Smith')).toBeVisible()
    await expect(page.getByText('jane@test.nl')).toBeVisible()
  })

  test('user dropdown shows profile links', async ({ page }) => {
    // Click the user button in sidebar footer
    await page.getByText('Jane Smith').click()

    await expect(page.getByRole('menuitem', { name: 'Profile' })).toBeVisible()
    await expect(page.getByRole('menuitem', { name: 'Membership' })).toBeVisible()
    await expect(page.getByRole('menuitem', { name: 'Notifications' })).toBeVisible()
    await expect(page.getByRole('menuitem', { name: 'Log out' })).toBeVisible()
  })

  test('logout redirects to login page', async ({ page }) => {
    await page.getByText('Jane Smith').click()
    await page.getByRole('menuitem', { name: 'Log out' }).click()

    await expect(page).toHaveURL(/login/)
  })
})

test.describe('404 Page', () => {
  test('shows 404 for unknown routes', async ({ page }) => {
    await page.goto('/this-page-does-not-exist')
    await expect(page.getByText('404')).toBeVisible()
    await expect(page.getByText('Page not found.')).toBeVisible()
  })

  test('has a link back to home', async ({ page }) => {
    await page.goto('/nonexistent-route')
    await expect(page.getByRole('link', { name: 'Go back home' })).toBeVisible()
  })
})
