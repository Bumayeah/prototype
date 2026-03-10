<script setup lang="ts">
import AppTable from '@/components/AppTable.vue'
import { ArrowUpDown } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import Badge from '@/components/ui/badge/Badge.vue'
import { useCourses } from '@/composables'
import type { Course } from '@/types'
import { useRouter } from 'vue-router'
import { RouteName } from '@/router/types'
import { PAGE_SIZE } from '@/constants'

const { data, isInitialLoading, isUpdating, error, setPage, setSearch, setSort, setPageSize } =
  useCourses()
const router = useRouter()

setPageSize(PAGE_SIZE.MD)

const columns: ColumnDef<Course>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        },
        () => ['Title', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })],
      )
    },
    cell: ({ row }) => h('div', { class: '' }, row.getValue('title')),
    enableHiding: false,
  },
  {
    accessorKey: 'startDate',
    header: 'Start date',
    cell: ({ row }) => {
      const date = row.getValue('startDate') as Date
      return new Date(date).toLocaleDateString('en-US')
    },
  },
  {
    accessorKey: 'endDate',
    header: 'End date',
    cell: ({ row }) => {
      const date = row.getValue('endDate') as Date
      return new Date(date).toLocaleDateString('en-US')
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) =>
      h(Badge, { variant: 'secondary', class: 'capitalize' }, () => row.getValue('type')),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) =>
      h(
        Button,
        {
          variant: 'default',
          size: 'sm',
          onClick: () => {
            router.push({ name: RouteName.users, params: { id: row.original.id } })
          },
        },
        () => 'More',
      ),
  },
]
</script>

<template>
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
</template>
