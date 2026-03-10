import { describe, it, expect, vi, beforeEach } from 'vitest'
import { login, signup, refresh } from '@/api/authApi'

vi.mock('@/api/axiosInstance', () => ({
  default: {
    post: vi.fn(),
    put: vi.fn(),
  },
}))

import axiosInstance from '@/api/axiosInstance'

const mock = vi.mocked(axiosInstance)

beforeEach(() => {
  vi.clearAllMocks()
})

describe('login', () => {
  it('posts credentials to /auth/login and returns tokens', async () => {
    const tokens = { accessToken: 'access-123', refreshToken: 'refresh-456' }
    mock.post.mockResolvedValue({ data: tokens })

    const result = await login({ email: 'user@test.com', password: 'secret' })

    expect(mock.post).toHaveBeenCalledWith('/auth/login', {
      email: 'user@test.com',
      password: 'secret',
    })
    expect(result).toEqual(tokens)
  })

  it('propagates errors', async () => {
    mock.post.mockRejectedValue(new Error('Invalid credentials'))

    await expect(
      login({ email: 'bad@test.com', password: 'wrong' }),
    ).rejects.toThrow('Invalid credentials')
  })
})

describe('signup', () => {
  it('puts signup data to /auth/signup and returns tokens', async () => {
    const tokens = { accessToken: 'access-new', refreshToken: 'refresh-new' }
    mock.put.mockResolvedValue({ data: tokens })

    const payload = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.com',
      password: 'Pass123!',
      confirmPassword: 'Pass123!',
    }

    const result = await signup(payload)

    expect(mock.put).toHaveBeenCalledWith('/auth/signup', payload)
    expect(result).toEqual(tokens)
  })
})

describe('refresh', () => {
  it('posts refresh token to /auth/refresh and returns new tokens', async () => {
    const newTokens = { accessToken: 'new-access', refreshToken: 'new-refresh' }
    mock.post.mockResolvedValue({ data: newTokens })

    const result = await refresh('old-refresh-token')

    expect(mock.post).toHaveBeenCalledWith('/auth/refresh', {
      refreshToken: 'old-refresh-token',
    })
    expect(result).toEqual(newTokens)
  })
})
