import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router'
import { routes } from './routes'
import { useAuthStore } from '@/stores/authStore'
import { logger } from '@/utils/logger'
import { RouteName } from './types'

export const router = createRouter({
  history:
    import.meta.env.VITE_USE_HASH === 'true'
      ? createWebHashHistory()
      : createWebHistory(import.meta.env.BASE_URL),
  routes: routes as unknown as RouteRecordRaw[],
})

// Client-side auth & role guards (UX only — the server must enforce
// authorization on every API request independently of these guards).
router.beforeEach(async (to) => {
  const authStore = useAuthStore()

  try {
    await authStore.checkAuth()
  } catch {
    return { name: RouteName.login }
  }

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return { path: '/' }
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: RouteName.login }
  }

  // Authenticated but wrong role → show forbidden, not login
  if (Array.isArray(to.meta.roles) && !to.meta.roles.includes(authStore.userRole!)) {
    return { name: RouteName.forbidden }
  }
})

router.onError((error) => {
  logger.error('ROUTER', error.message, error)
})

export default router
