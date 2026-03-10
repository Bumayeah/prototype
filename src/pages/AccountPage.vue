<template>
  <MasterTemplate
    :breadcrumbs="[{ label: 'Portal', route: RouteName.portal }, { label: 'Account' }]"
  >
  </MasterTemplate>
</template>

<script setup lang="ts">
import MasterTemplate from '@/components/shared/MasterTemplate.vue'
import { RouteName } from '@/router/types'
</script>

<style scoped></style>
