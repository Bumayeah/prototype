import axios from 'axios'
import { mswReady } from '@/mocks/mswReady'
import { useAuthStore } from '@/stores/authStore'
import { AppError } from '@/utils/AppError'
import router from '@/router'
import { RouteName } from '@/router/types'

const isDev = import.meta.env.DEV || import.meta.env.MODE === 'preview'

const baseURL = import.meta.env.VITE_API_URL || ''

// In production, ensure the API URL is same-origin or an explicitly trusted host.
// This prevents cookies (withCredentials) from being sent to untrusted origins.
if (!isDev && baseURL) {
  const allowed = [location.origin]
  // Add additional trusted origins here if needed:
  // allowed.push('https://api.example.com')

  try {
    const apiOrigin = new URL(baseURL, location.origin).origin
    if (!allowed.includes(apiOrigin)) {
      throw new Error(`Untrusted API origin: ${apiOrigin}`)
    }
  } catch (e) {
    if (e instanceof TypeError) {
      throw new Error(`Invalid VITE_API_URL: ${baseURL}`)
    }
    throw e
  }
}

const axiosInstance = axios.create({
  baseURL,
  // In production the browser sends HttpOnly cookies automatically
  withCredentials: !isDev,
  timeout: 30_000,
  headers: {
    // CSRF mitigation: custom headers cannot be set by cross-origin
    // form submissions or simple requests. The server must reject any
    // mutating request that lacks this header.
    'X-Requested-With': 'XMLHttpRequest',
  },
})

let refreshPromise: Promise<void> | null = null

axiosInstance.interceptors.request.use(
  async (config) => {
    await mswReady

    const authStore = useAuthStore()

    // Skip refresh logic for the refresh endpoint itself
    const isRefreshRequest = config.url === '/auth/refresh'

    if (
      !isRefreshRequest &&
      authStore.accessToken &&
      authStore.isTokenExpired(authStore.accessToken)
    ) {
      if (authStore.refreshToken && !authStore.isTokenExpired(authStore.refreshToken)) {
        await doRefresh()
      }
    }

    if (authStore.accessToken) {
      config.headers = config.headers || {}
      config.headers['Authorization'] = `Bearer ${authStore.accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const authStore = useAuthStore()

      if (authStore.refreshToken && !authStore.isTokenExpired(authStore.refreshToken)) {
        try {
          await doRefresh()
          originalRequest.headers['Authorization'] = `Bearer ${authStore.accessToken}`
          return axiosInstance(originalRequest)
        } catch {
          // Refresh failed, logout
        }
      }

      authStore.logout()
      router.push({ name: RouteName.login })
    }
    return Promise.reject(AppError.fromAxios(error))
  },
)

async function doRefresh(): Promise<void> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const authStore = useAuthStore()
      try {
        // Uses raw axios (no interceptors) to avoid infinite refresh loops
        const { data } = await axios.post(
          '/auth/refresh',
          isDev ? { refreshToken: authStore.refreshToken } : {},
          { baseURL: axiosInstance.defaults.baseURL },
        )
        authStore.setTokens(data.accessToken, data.refreshToken)
      } catch {
        authStore.logout()
        throw new Error('Refresh failed')
      } finally {
        refreshPromise = null
      }
    })()
  }
  return refreshPromise
}

export default axiosInstance
