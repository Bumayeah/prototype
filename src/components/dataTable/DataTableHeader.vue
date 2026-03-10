<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <thead
    data-slot="table-header"
    :class="
      cn(
        '[&_tr]:border-b [&_tr]:border-border-base-soft border-t border-border-base-soft [&_th:not(:first-child)]:border-l [&_th:not(:first-child)]:border-l-border-base-soft/40 shadow-[0_1px_4px_0_rgba(0,0,0,0.1)] [&_th:last-child]:pr-12!',
        props.class,
      )
    "
  >
    <slot />
  </thead>
</template>
