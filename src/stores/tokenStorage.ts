/**
 * Token storage abstraction.
 *
 * - Development (MSW): tokens are stored in localStorage because MSW
 *   cannot set HttpOnly cookies. The frontend decodes the JWT itself.
 *
 * - Production: the backend sets HttpOnly cookies. The frontend cannot
 *   read these. Tokens are NOT stored locally — the browser sends them
 *   automatically via withCredentials. User info comes from the response
 *   body or a /auth/me endpoint.
 */

interface TokenStorage {
  getAccessToken(): string
  getRefreshToken(): string
  setTokens(accessToken: string, refreshToken: string): void
  clear(): void
}

const localStorageStrategy: TokenStorage = {
  getAccessToken: () => localStorage.getItem('access_token') || '',
  getRefreshToken: () => localStorage.getItem('refresh_token') || '',
  setTokens(accessToken, refreshToken) {
    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('refresh_token', refreshToken)
  },
  clear() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  },
}

// In production with HttpOnly cookies the frontend stores nothing.
// The backend sets cookies, the browser sends them automatically.
const cookieStrategy: TokenStorage = {
  getAccessToken: () => '',
  getRefreshToken: () => '',
  setTokens() {},
  clear() {},
}

export const tokenStorage: TokenStorage = import.meta.env.DEV
  ? localStorageStrategy
  : cookieStrategy
