<script setup lang="ts">
import type { LucideIcon } from 'lucide-vue-next'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

defineProps<{
  projects: {
    name: string
    routeName: string
    icon: LucideIcon
  }[]
}>()
</script>

<template>
  <SidebarGroup class="group-data-[collapsible=icon]:hidden">
    <SidebarGroupLabel>Trainerportal</SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem v-for="item in projects" :key="item.name">
        <SidebarMenuButton as-child>
          <a :href="item.routeName">
            <component :is="item.icon" />
            <span>{{ item.name }}</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>
