<script setup lang="ts">
import { MoreHorizontal } from 'lucide-vue-next'
import DropdownMenu from './ui/dropdown-menu/DropdownMenu.vue'
import DropdownMenuTrigger from './ui/dropdown-menu/DropdownMenuTrigger.vue'
import Button from './ui/button/Button.vue'
import DropdownMenuContent from './ui/dropdown-menu/DropdownMenuContent.vue'
import DropdownMenuItem from './ui/dropdown-menu/DropdownMenuItem.vue'
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="data-[state=open]:bg-muted flex h-8 w-8 p-0">
        <MoreHorizontal class="h-4 w-4" />
        <span class="sr-only">Open menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-40">
      <DropdownMenuItem>Edit</DropdownMenuItem>
      <DropdownMenuItem>Make a copy</DropdownMenuItem>
      <DropdownMenuItem>Favorite</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
