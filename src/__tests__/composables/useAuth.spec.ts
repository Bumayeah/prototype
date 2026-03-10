import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAuth } from '@/composables/auth/useAuth'

const mockSetTokens = vi.fn()
const mockLogout = vi.fn()
const mockLoadUser = vi.fn()

vi.mock('@/stores/authStore', () => ({
  useAuthStore: () => ({
    setTokens: mockSetTokens,
    logout: mockLogout,
    loadUser: mockLoadUser,
  }),
}))

vi.mock('@/api/authApi', () => ({
  login: vi.fn(),
  signup: vi.fn(),
  refresh: vi.fn(),
}))

import * as authApi from '@/api/authApi'

const mockLogin = vi.mocked(authApi.login)
const mockSignup = vi.mocked(authApi.signup)
const mockRefresh = vi.mocked(authApi.refresh)

beforeEach(() => {
  setActivePinia(createPinia())
  vi.clearAllMocks()
})

describe('useAuth', () => {
  describe('login', () => {
    it('calls loginApi and stores tokens on success', async () => {
      const tokens = { accessToken: 'access-1', refreshToken: 'refresh-1' }
      mockLogin.mockResolvedValue(tokens)

      const { login } = useAuth()
      await login({ email: 'test@test.com', password: 'pass' })

      expect(mockLogin).toHaveBeenCalledWith({ email: 'test@test.com', password: 'pass' })
      expect(mockSetTokens).toHaveBeenCalledWith('access-1', 'refresh-1')
    })

    it('sets data on successful login', async () => {
      const tokens = { accessToken: 'access-1', refreshToken: 'refresh-1' }
      mockLogin.mockResolvedValue(tokens)

      const { login, data } = useAuth()
      await login({ email: 'test@test.com', password: 'pass' })

      expect(data.value).toEqual(tokens)
    })

    it('sets error on failed login', async () => {
      mockLogin.mockRejectedValue(new Error('Invalid credentials'))

      const { login, error } = useAuth()
      await login({ email: 'test@test.com', password: 'wrong' })

      expect(error.value).not.toBeNull()
    })

    it('does not store tokens on failure', async () => {
      mockLogin.mockRejectedValue(new Error('fail'))

      const { login } = useAuth()
      await login({ email: 'test@test.com', password: 'wrong' })

      expect(mockSetTokens).not.toHaveBeenCalled()
    })
  })

  describe('signup', () => {
    it('calls signupApi and stores tokens on success', async () => {
      const tokens = { accessToken: 'access-new', refreshToken: 'refresh-new' }
      mockSignup.mockResolvedValue(tokens)

      const payload = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@test.com',
        password: 'Pass123!',
        confirmPassword: 'Pass123!',
      }

      const { signup } = useAuth()
      await signup(payload)

      expect(mockSignup).toHaveBeenCalledWith(payload)
      expect(mockSetTokens).toHaveBeenCalledWith('access-new', 'refresh-new')
    })

    it('sets data on successful signup', async () => {
      const tokens = { accessToken: 'a', refreshToken: 'r' }
      mockSignup.mockResolvedValue(tokens)

      const { signup, data } = useAuth()
      await signup({
        firstName: 'J',
        lastName: 'D',
        email: 'j@t.com',
        password: 'p',
        confirmPassword: 'p',
      })

      expect(data.value).toEqual(tokens)
    })
  })

  describe('refresh', () => {
    it('calls refreshApi and stores new tokens', async () => {
      const tokens = { accessToken: 'new-access', refreshToken: 'new-refresh' }
      mockRefresh.mockResolvedValue(tokens)

      const { refresh } = useAuth()
      await refresh('old-refresh')

      expect(mockRefresh).toHaveBeenCalledWith('old-refresh')
      expect(mockSetTokens).toHaveBeenCalledWith('new-access', 'new-refresh')
    })
  })

  describe('logout', () => {
    it('calls authStore.logout', () => {
      const { logout } = useAuth()
      logout()

      expect(mockLogout).toHaveBeenCalled()
    })
  })

  describe('loading state', () => {
    it('is false initially', () => {
      const { loading } = useAuth()
      expect(loading.value).toBe(false)
    })
  })
})
