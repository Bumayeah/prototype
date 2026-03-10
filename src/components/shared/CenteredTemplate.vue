<template>
  <MasterTemplate :show-navigation="false">
    <div class="flex min-h-svh w-full justify-center p-6 md:p-10">
      <div class="w-full max-w-sm">
        <slot />
      </div>
    </div>
  </MasterTemplate>
</template>

<script setup lang="ts">
import MasterTemplate from './MasterTemplate.vue'
</script>

<style scoped></style>
