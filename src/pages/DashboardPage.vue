<script setup lang="ts">
import { ref } from 'vue'
import { useTrainerCourses } from '@/composables/course/useTrainerCourses'
import AppTable from '@/components/AppTable.vue'
import type { Course } from '@/types/course'
import { TrainerStatus } from '@/types/status'
import type { ColumnDef } from '@tanstack/vue-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { h } from 'vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-vue-next'
import { PAGE_SIZE } from '@/constants'

const {
  data,
  isInitialLoading,
  isUpdating,
  error,
  setPage,
  setSearch,
  setSort,
  setPageSize,
  setFilter,
  applyForCourse,
} = useTrainerCourses()

setPageSize(PAGE_SIZE.SM)

const activeFilter = ref<TrainerStatus | 'All'>('All')

const statusFilters: (TrainerStatus | 'All')[] = [
  'All',
  TrainerStatus.INVITED,
  TrainerStatus.PLANNED,
  TrainerStatus.PENDING,
]

function onFilterChange(status: TrainerStatus | 'All') {
  activeFilter.value = status
  setFilter('trainerStatus' as keyof Course, status === 'All' ? undefined : status)
}

function badgeVariant(status: TrainerStatus) {
  switch (status) {
    case TrainerStatus.INVITED:
      return 'outline'
    case TrainerStatus.PLANNED:
      return 'secondary'
    case TrainerStatus.PENDING:
      return 'default'
  }
}

const columns: ColumnDef<Course>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'startDate',
    header: 'Start date',
    cell: ({ row }) => {
      const date = row.getValue('startDate') as Date
      return new Date(date).toLocaleDateString('nl-NL')
    },
  },
  {
    accessorKey: 'location',
    header: 'Location',
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'trainerStatus',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('trainerStatus') as TrainerStatus
      return h(Badge, { variant: badgeVariant(status), class: 'capitalize' }, () => status)
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const course = row.original as Course
      return h(DropdownMenu, {}, () => [
        h(DropdownMenuTrigger, { asChild: true }, () =>
          h(
            Button,
            { variant: 'ghost', class: 'data-[state=open]:bg-muted flex h-8 w-8 p-0' },
            () => h(MoreHorizontal, { class: 'h-4 w-4' }),
          ),
        ),
        h(DropdownMenuContent, { align: 'end', class: 'w-40' }, () => [
          h(
            DropdownMenuItem,
            { onClick: () => console.log('View details:', course.id) },
            () => 'View details',
          ),
          course.trainerStatus === TrainerStatus.INVITED
            ? h(DropdownMenuItem, { onClick: () => applyForCourse(course.id) }, () => 'Apply')
            : null,
        ]),
      ])
    },
  },
]
</script>

<template>
  <div>
    <div class="mb-4 flex gap-2">
      <Button
        v-for="status in statusFilters"
        :key="status"
        :variant="activeFilter === status ? 'default' : 'outline'"
        size="sm"
        @click="onFilterChange(status)"
      >
        {{ status }}
      </Button>
    </div>

    <AppTable
      v-if="data"
      :loading="isInitialLoading"
      :updating="isUpdating"
      :error
      :columns
      :response="data"
      @page-change="setPage"
      @search="setSearch"
      @sort-change="setSort"
    />
  </div>
</template>
