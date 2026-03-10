import type { LucideIcon } from 'lucide-vue-next'
import type { RouteName } from '@/router/types'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    sidebar?: {
      title?: string
      routeName: keyof typeof RouteName
      icon?: LucideIcon
      section?: string
      parentRouteName?: keyof typeof RouteName
    }
  }
}
