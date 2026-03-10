<script setup lang="ts">
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import type { PaginationInfo } from '@/types/api'

interface Props {
  paginationInfo: PaginationInfo
}

const { paginationInfo } = defineProps<Props>()

const emit = defineEmits<{ 'page-change': [page: number] }>()

const goToPage = (page: number) => {
  emit('page-change', page)
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <Pagination
      v-slot="{ page }"
      :items-per-page="paginationInfo.pageSize"
      :total="paginationInfo.totalItems"
      :page="paginationInfo.currentPage"
      @update:page="goToPage"
      class="justify-end"
    >
      <PaginationContent v-slot="{ items }">
        <PaginationPrevious />

        <template v-for="(item, index) in items" :key="index">
          <PaginationItem
            v-if="item.type === 'page'"
            :value="item.value"
            :is-active="item.value === page"
          >
            {{ item.value }}
          </PaginationItem>
        </template>

        <PaginationNext />
      </PaginationContent>
    </Pagination>
  </div>
</template>
