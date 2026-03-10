<template>
  <CenteredTemplate>
    <div class="grid gap-4">
      <h1>403</h1>
      <p>You do not have permission to access this page.</p>
      <Button as-child>
        <RouterLink to="/">Go back home</RouterLink>
      </Button>
    </div>
  </CenteredTemplate>
</template>

<script setup lang="ts">
import CenteredTemplate from '@/components/shared/CenteredTemplate.vue'
import Button from '@/components/ui/button/Button.vue'
import { RouterLink } from 'vue-router'
</script>
