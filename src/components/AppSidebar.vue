<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'
import NavMain from '@/components/NavMain.vue'
import NavUser from '@/components/NavUser.vue'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import EudonetIcon from '@/assets/eudonet.svg'
import SidebarMenu from './ui/sidebar/SidebarMenu.vue'
import SidebarMenuItem from './ui/sidebar/SidebarMenuItem.vue'
import { RouteName } from '@/router/types'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { SidebarItem } from '@/types/sidebar'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})

const router = useRouter()

const sidebarSections = computed(() => {
  const routes = router.getRoutes()

  const items: SidebarItem[] = routes
    .filter((r) => r.meta?.sidebar && r.meta.sidebar?.title)
    .map((r) => {
      const meta = r.meta.sidebar!
      return {
        title: meta.title || '',
        routeName: meta.routeName,
        icon: meta.icon,
        section: meta.section ?? 'default-section',
        parentRouteName: meta.parentRouteName,
        items: [] as SidebarItem[],
      }
    })

  const parents = items.filter((i) => !i.parentRouteName)

  const structured: SidebarItem[] = parents.map((parent) => ({
    ...parent,
    items: items.filter((i) => i.parentRouteName === parent.routeName),
  }))

  const grouped: Record<string, SidebarItem[]> = {}

  structured.forEach((item) => {
    const key = item.section ?? 'default'

    if (!grouped[key]) {
      grouped[key] = []
    }

    grouped[key].push(item)
  })

  return grouped
})
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" as-child>
            <RouterLink :to="{ name: RouteName.portal }">
              <div class="flex aspect-square size-8 items-center justify-center rounded-lg">
                <EudonetIcon class="size-36 translate-y-px fill-white" />
              </div>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-medium">Eudonet</span>
                <span class="text-sidebar-foreground/30 truncate text-xs">Portaal</span>
              </div>
            </RouterLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <template v-for="(items, section) in sidebarSections" :key="section">
        <NavMain :title="section" :items="items" />
      </template>
    </SidebarContent>
    <SidebarFooter>
      <NavUser />
    </SidebarFooter>
  </Sidebar>
</template>
