import { useAuthStore } from '@/stores/authStore'
import { login as loginApi, signup as signUpApi, refresh as refreshApi } from '@/api/authApi'
import { useAsync } from '../useAsync'
import type { AuthResponse, LoginPayload, SignupPayload } from '@/types'

export function useAuth() {
  const authStore = useAuthStore()
  const { data, loading, error, execute } = useAsync<AuthResponse>()

  const login = (payload: LoginPayload) => {
    return execute(async () => {
      const res = await loginApi(payload)
      authStore.setTokens(res.accessToken, res.refreshToken)
      await authStore.loadUser()
      return res
    })
  }

  const logout = () => authStore.logout()

  const signup = (payload: SignupPayload) => {
    return execute(async () => {
      const res = await signUpApi(payload)
      authStore.setTokens(res.accessToken, res.refreshToken)
      await authStore.loadUser()
      return res
    })
  }

  const refresh = (payload: string) => {
    return execute(async () => {
      const res = await refreshApi(payload)
      authStore.setTokens(res.accessToken, res.refreshToken)
      await authStore.loadUser()
      return res
    })
  }

  return { login, logout, signup, refresh, data, loading, error }
}
