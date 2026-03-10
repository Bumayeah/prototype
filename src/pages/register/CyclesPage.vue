<script setup lang="ts">
import { useCycles } from '@/composables/cycle/useCycles'
import AppTable from '@/components/AppTable.vue'
import type { Cycle } from '@/types/cycle'
import { CycleStatus } from '@/types/status'
import type { ColumnDef } from '@tanstack/vue-table'
import { Badge } from '@/components/ui/badge'
import { h } from 'vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-vue-next'
import { PAGE_SIZE } from '@/constants'

const { data, isInitialLoading, isUpdating, error, setPage, setSearch, setSort, setPageSize } =
  useCycles()

setPageSize(PAGE_SIZE.SM)

function viewDetails(cycle: Cycle) {
  console.log('View details:', cycle.id)
}

const columns: ColumnDef<Cycle>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'registered',
    header: 'Registered',
    cell: ({ row }) => {
      const registered = row.getValue('registered') as number
      const total = row.original.total
      return `${registered} / ${total}`
    },
  },
  {
    accessorKey: 'remaining',
    header: 'Remaining',
  },
  {
    accessorKey: 'hours',
    header: 'Hours',
  },
  {
    accessorKey: 'points',
    header: 'Points',
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ row }) => {
      const date = row.getValue('startDate') as Date
      return new Date(date).toLocaleDateString('en-US')
    },
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ row }) => {
      const date = row.getValue('endDate') as Date | undefined
      return date ? new Date(date).toLocaleDateString('en-US') : '-'
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as Cycle['status']
      const variant = status === CycleStatus.ACHIEVED ? 'default' : 'destructive'

      return h(Badge, { variant, class: 'capitalize' }, () => status)
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const cycle = row.original as Cycle
      return h(DropdownMenu, {}, () => [
        h(DropdownMenuTrigger, { asChild: true }, () =>
          h(
            Button,
            { variant: 'ghost', class: 'data-[state=open]:bg-muted flex h-8 w-8 p-0' },
            () => h(MoreHorizontal, { class: 'h-4 w-4' }),
          ),
        ),
        h(DropdownMenuContent, { align: 'end', class: 'w-40' }, () => [
          h(DropdownMenuItem, { onClick: () => viewDetails(cycle) }, () => 'View Details'),
          h(
            DropdownMenuItem,
            { onClick: () => console.log('Download Report', cycle.id) },
            () => 'Download Report',
          ),
          cycle.status === CycleStatus.ACHIEVED
            ? h(
                DropdownMenuItem,
                { onClick: () => console.log('Download Certificate', cycle.id) },
                () => 'Download Certificate',
              )
            : null,
        ]),
      ])
    },
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
