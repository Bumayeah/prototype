import { test, expect } from '@playwright/test'

test.describe('Signup Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sign-up')
  })

  test('shows signup form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Create an account' })).toBeVisible()
    await expect(page.getByPlaceholder('John')).toBeVisible()
    await expect(page.getByPlaceholder('Doe')).toBeVisible()
    await expect(page.getByLabel('Email')).toBeVisible()
    await expect(page.getByLabel('Password', { exact: true })).toBeVisible()
    await expect(page.getByLabel('Confirm Password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Create Account' })).toBeVisible()
  })

  test('has link to login page', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Sign in' })).toBeVisible()
    await page.getByRole('link', { name: 'Sign in' }).click()
    await expect(page).toHaveURL(/login/)
  })

  test('signs up with valid data and redirects', async ({ page }) => {
    await page.getByPlaceholder('John').fill('Test')
    await page.getByPlaceholder('Doe').fill('User')
    await page.getByLabel('Email').fill(`testuser-${Date.now()}@example.com`)
    await page.getByLabel('Password', { exact: true }).fill('Password123!')
    await page.getByLabel('Confirm Password').fill('Password123!')
    await page.getByRole('button', { name: 'Create Account' }).click()

    await page.waitForURL(/^(?!.*sign-up)/)
    await expect(page.getByRole('heading', { name: 'Create an account' })).toBeHidden()
  })

  test('shows error for existing email', async ({ page }) => {
    await page.getByPlaceholder('John').fill('Jane')
    await page.getByPlaceholder('Doe').fill('Smith')
    await page.getByLabel('Email').fill('jane@example.com')
    await page.getByLabel('Password', { exact: true }).fill('Password123!')
    await page.getByLabel('Confirm Password').fill('Password123!')
    await page.getByRole('button', { name: 'Create Account' }).click()

    await expect(page.getByText('Not able to login')).toBeVisible()
  })
})
