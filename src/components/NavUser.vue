<script setup lang="ts">
import { BadgeCheck, Bell, IdCardLanyard, ChevronsUpDown, LogOut } from 'lucide-vue-next'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { useAuthStore } from '@/stores/authStore'
import { RouteName } from '@/router/types'
import { computed } from 'vue'

const { user, logout } = useAuthStore()

const { isMobile } = useSidebar()

const initials = computed(() => `${user?.firstName[0]}${user?.lastName[0]}`)
const fullName = computed(() => `${user?.firstName} ${user?.lastName}`)
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar v-if="user" class="h-8 w-8 rounded-lg">
              <AvatarFallback class="rounded-lg">{{ initials }} </AvatarFallback>
            </Avatar>
            <div v-if="user" class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">{{ fullName }}</span>
              <span class="truncate text-xs">{{ user.email }}</span>
            </div>
            <ChevronsUpDown class="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          :side="isMobile ? 'bottom' : 'right'"
          align="end"
          :side-offset="4"
        >
          <DropdownMenuLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar class="h-8 w-8 self-start rounded-lg">
                <!-- <AvatarImage :src="user?.avatar" :alt="user?.lastName" /> -->
                <AvatarFallback class="rounded-lg">{{ initials }}</AvatarFallback>
              </Avatar>
              <div v-if="user" class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">{{ fullName }}</span>
                <span class="truncate text-xs">{{ user.email }}</span>
                <span class="text-sidebar-foreground/70 truncate pt-1.5 text-xs">{{
                  user?.role
                }}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem as-child>
              <RouterLink :to="{ name: RouteName.profile }">
                <BadgeCheck />
                Profile
              </RouterLink>
            </DropdownMenuItem>
            <DropdownMenuItem as-child>
              <RouterLink :to="{ name: RouteName.membership }">
                <IdCardLanyard />
                Membership
              </RouterLink>
            </DropdownMenuItem>
            <DropdownMenuItem as-child>
              <RouterLink :to="{ name: RouteName.notifications }">
                <Bell />
                Notifications
              </RouterLink>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="logout">
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
