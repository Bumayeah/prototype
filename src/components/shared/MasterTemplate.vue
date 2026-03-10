<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { RouteName } from '@/router/types'
import ModeToggle from '../ModeToggle.vue'

withDefaults(
  defineProps<{
    breadcrumbs?: { label: string; route?: keyof typeof RouteName }[]
    showNavigation?: boolean
  }>(),
  {
    showNavigation: true,
  },
)
</script>
<template>
  <SidebarProvider>
    <AppSidebar v-if="showNavigation" />
    <SidebarInset>
      <header
        class="bg-background sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b px-4"
      >
        <template v-if="showNavigation">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
        </template>
        <Breadcrumb v-if="breadcrumbs">
          <BreadcrumbList>
            <BreadcrumbItem v-for="(bc, i) in breadcrumbs" :key="i">
              <template v-if="i < breadcrumbs.length - 1 && bc.route">
                <BreadcrumbLink asChild>
                  <RouterLink :to="{ name: RouteName[bc.route] }">{{ bc.label }}</RouterLink>
                </BreadcrumbLink>
                <BreadcrumbSeparator class="hidden md:block" />
              </template>
              <template v-else>
                <BreadcrumbPage>{{ bc.label }}</BreadcrumbPage>
              </template>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div class="ms-auto">
          <ModeToggle />
        </div>
      </header>

      <div class="@container/main flex flex-1 flex-col gap-2 p-4">
        <div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <slot />
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>

<style scoped></style>
