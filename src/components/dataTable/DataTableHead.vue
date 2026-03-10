<script setup lang="ts">
import { type HTMLAttributes } from 'vue'
import { cn } from '../../lib/utils'
import draggable from 'remixicon/icons/Editor/draggable.svg?url'
import pushpin from 'remixicon/icons/Map/pushpin-2-fill.svg?url'
import sort from 'remixicon/icons/Arrows/expand-up-down-fill.svg?url'
import { Dropdown } from 'opal'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    isDraggable?: boolean
    isPinned?: boolean
    headerMenuItems?: { label: string; onClick: () => void }[]
    isCustomHeader?: boolean
  }>(),
  {
    isDraggable: false,
    isPinned: false,
    headerMenuItems: undefined,
    isCustomHeader: false,
  },
)
</script>

<template>
  <th
    data-slot="table-head"
    :class="
      cn(
        'relative h-11 px-3 min-w-32 text-left align-middle font-medium whitespace-nowrap [&:has([type=checkbox])]:min-w-auto [&:has([type=checkbox])]:w-10 [&:has([type=checkbox])]:pr-0 [&>[type=checkbox]]:translate-y-0.5 [&>div>div>button>div]:truncate [&>div>div>button>div]:max-w-16 [&_button]:border-0 [&>div>div>button]:p-0',
        props.class,
      )
    "
  >
    <div class="flex items-center gap-1 min-w-0">
      <img v-if="isDraggable" class="size-3.5 cursor-grab" :src="draggable" />

      <template v-if="isCustomHeader">
        <slot />
      </template>

      <template v-else>
        <div class="truncate me-auto">
          <slot />
        </div>
      </template>

      <img v-if="isPinned" class="size-3.5 ms-auto" :src="pushpin" />

      <div v-if="headerMenuItems" class="relative" ref="menuRef">
        <Dropdown
          :trigger-icon="sort"
          label=""
          menu-align="right"
          class="[&_button>div_div]:hidden [&_button]:border-0 [&_button>div]:px-0"
          :items="headerMenuItems"
        />
      </div>
    </div>
  </th>
</template>
