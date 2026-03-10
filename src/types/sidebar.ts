import type { LucideIcon } from 'lucide-vue-next'
import type { RouteName } from '@/router/types'

interface SidebarBase {
  title?: string
  routeName: keyof typeof RouteName
  icon?: LucideIcon
  parentRouteName?: keyof typeof RouteName
  items?: SidebarItem[]
}

interface SidebarParent extends SidebarBase {
  section: string
  parentRouteName?: never
}

interface SidebarSubItem extends SidebarBase {
  section?: string
  parentRouteName: keyof typeof RouteName
}

export type SidebarItem = SidebarParent | SidebarSubItem

export interface SidebarMeta {
  sidebar?: Partial<SidebarBase & { section: string }>
}
