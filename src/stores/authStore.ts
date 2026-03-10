import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { decodeJwt } from 'jose'
import { tokenStorage } from './tokenStorage'
import type { TokenPayload, Role, UserInfo } from '@/types/auth'
import { refresh, fetchMe } from '@/api'
import { useRouter } from 'vue-router'
import { RouteName } from '@/router/types'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref(tokenStorage.getAccessToken())
  const refreshToken = ref(tokenStorage.getRefreshToken())
  const authChecked = ref(false)
  const router = useRouter()

  // Server-verified user info (populated by /auth/me)
  const user = ref<UserInfo | null>(null)

  const userRole = computed<Role | null>(() => user.value?.role ?? null)

  // Only used for expiry checks (UX optimisation, not a security boundary).
  // The server validates the real token on every request.
  function isTokenExpired(token: string): boolean {
    if (!token) return true
    try {
      const payload = decodeJwt(token) as TokenPayload
      if (!payload?.exp) return true
      return Date.now() >= payload.exp * 1000
    } catch {
      return true
    }
  }

  const isAuthenticated = computed(() => !!accessToken.value && !isTokenExpired(accessToken.value))

  function setTokens(access: string, refreshVal: string) {
    accessToken.value = access
    refreshToken.value = refreshVal
    tokenStorage.setTokens(access, refreshVal)
  }

  // Fetch server-verified user info after login/signup/refresh
  async function loadUser() {
    try {
      user.value = await fetchMe()
    } catch {
      user.value = null
    }
  }

  function logout() {
    accessToken.value = ''
    refreshToken.value = ''
    user.value = null
    tokenStorage.clear()
    router.push({ name: RouteName.login })
  }

  async function checkAuth() {
    if (authChecked.value) return

    if (refreshToken.value && isTokenExpired(accessToken.value)) {
      try {
        const data = await refresh(refreshToken.value)
        setTokens(data.accessToken, data.refreshToken)
      } catch {
        logout()
        throw new Error('Refresh failed')
      }
    }

    // Fetch verified user info from the server if we have a valid token
    if (accessToken.value && !isTokenExpired(accessToken.value) && !user.value) {
      await loadUser()
    }

    authChecked.value = true
  }

  return {
    accessToken,
    refreshToken,
    isAuthenticated,
    user,
    userRole,
    isTokenExpired,
    setTokens,
    loadUser,
    logout,
    checkAuth,
  }
})
