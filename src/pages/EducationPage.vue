<script setup lang="ts">
import { useEducations } from '@/composables'
import EducationCard from '@/components/blocks/education/EducationCard.vue'
import AppPagination from '@/components/AppPagination.vue'
import DataState from '@/components/DataState.vue'
import { PAGE_SIZE } from '@/constants'

const { data, isInitialLoading, isUpdating, error, setPage, setSearch, setSort, setPageSize } =
  useEducations()

setPageSize(PAGE_SIZE.LG)
</script>

<template>
  <template v-if="data">
    <div class="grid gap-4 lg:grid-cols-3 xl:grid-cols-5">
      <EducationCard
        v-for="education in data.data"
        v-bind:key="education.id"
        :education="education"
      />
    </div>
    <DataState :loading="isInitialLoading" :updating="isUpdating" :error="error">
      <AppPagination
        :pagination-info="{
          currentPage: data?.currentPage,
          pageSize: data.pageSize,
          totalItems: data.totalItems,
        }"
        @page-change="setPage"
      />
    </DataState>
  </template>
</template>
