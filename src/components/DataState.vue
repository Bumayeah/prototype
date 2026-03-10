<script setup lang="ts">
import type { AppError } from '@/utils/AppError'
import Skeleton from './ui/skeleton/Skeleton.vue'
import Spinner from './ui/spinner/Spinner.vue'

defineProps<{
  loading?: boolean
  error?: AppError | null
  empty?: boolean
  updating?: boolean
}>()
</script>

<template>
  <!-- Loading -->
  <template v-if="loading">
    <slot name="loading">
      <!-- fallback skeleton -->
      <Skeleton v-for="i in 16" :key="i" class="h-8.5 w-full" />
    </slot>
  </template>

  <!-- Error -->
  <template v-else-if="error">
    <slot name="error">
      <div class="text-destructive">
        {{ error }}
      </div>
    </slot>
  </template>

  <!-- Empty -->
  <template v-else-if="empty">
    <slot name="empty">
      <div class="text-muted-foreground">No data found</div>
    </slot>
  </template>

  <!-- Content -->

  <template v-else>
    <div class="relative">
      <Transition
        enter-active-class="transition-opacity duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="updating"
          class="absolute inset-0 z-40 flex items-center justify-center rounded-sm bg-black/10 backdrop-blur-sm"
        >
          <Spinner />
        </div>
      </Transition>
      <slot />
    </div>
  </template>
</template>
