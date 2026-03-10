<template>
  <MasterTemplate :breadcrumbs="breadcrumbs">
    <RouterView />
  </MasterTemplate>
</template>

<script setup lang="ts">
import MasterTemplate from '@/components/shared/MasterTemplate.vue'
import { RouteName } from '@/router/types'
import { computed } from 'vue'

import { useRoute } from 'vue-router'

const route = useRoute()
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const breadcrumbs = computed(() => {
  const matched = route.matched
    .filter(
      (r): r is typeof r & { meta: { sidebar: { routeName: keyof typeof RouteName } } } =>
        r.meta?.sidebar?.routeName !== undefined,
    )
    .map((r) => ({
      label: capitalize(String(r.meta.sidebar.routeName)),
      route: r.meta.sidebar.routeName,
    }))
  return matched
})
</script>

<style scoped></style>
