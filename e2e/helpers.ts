import type { Page } from '@playwright/test'

export async function login(page: Page, email = 'jane@test.nl', password = '1234') {
  await page.goto('/login')
  await page.getByLabel('Email').fill(email)
  await page.getByLabel('Password').fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
  await page.waitForURL(/^(?!.*login)/)
}
