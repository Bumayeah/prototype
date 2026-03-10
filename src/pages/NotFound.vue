<template>
  <CenteredTemplate>
    <div class="grid gap-4">
      <h1>404</h1>
      <p>Page not found.</p>
      <Button as-child>
        <RouterLink to="/" class="">Go back home</RouterLink>
      </Button>
    </div>
  </CenteredTemplate>
</template>

<script setup lang="ts">
import CenteredTemplate from '@/components/shared/CenteredTemplate.vue'
import Button from '@/components/ui/button/Button.vue'
import { RouterLink } from 'vue-router'
</script>
