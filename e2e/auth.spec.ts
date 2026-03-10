import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('shows login page on root url', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible()
  })

  test('logs in with valid credentials', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel('Email').fill('jane@test.nl')
    await page.getByLabel('Password').fill('1234')
    await page.getByRole('button', { name: 'Login' }).click()

    await page.waitForURL(/^(?!.*login)/)
    await expect(page.getByRole('heading', { name: 'Login to your account' })).not.toBeVisible()
  })

  test('shows error with invalid credentials', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel('Email').fill('wrong@email.com')
    await page.getByLabel('Password').fill('wrong')
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.getByText('Not able to login')).toBeVisible()
  })

  test('redirects unauthenticated user to login', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page).toHaveURL(/login/)
  })
})
