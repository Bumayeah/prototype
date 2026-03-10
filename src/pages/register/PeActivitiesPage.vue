<script setup lang="ts">
import { usePeActivities } from '@/composables/pe-activity/usePeActivities'
import AppTable from '@/components/AppTable.vue'
import type { PeActivity } from '@/types/pe-activity'
import { PeActivityStatus } from '@/types/status'
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
  usePeActivities()

setPageSize(PAGE_SIZE.SM)

function viewDetails(activity: PeActivity) {
  console.log('View details:', activity.id)
}

const columns: ColumnDef<PeActivity>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'provider',
    header: 'Provider',
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
      const status = row.getValue('status') as PeActivity['status']
      const variant =
        status === PeActivityStatus.APPROVED
          ? 'default'
          : status === PeActivityStatus.PENDING
            ? 'secondary'
            : 'destructive'

      return h(Badge, { variant, class: 'capitalize' }, () => status)
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const activity = row.original as PeActivity
      return h(DropdownMenu, {}, () => [
        h(DropdownMenuTrigger, { asChild: true }, () =>
          h(
            Button,
            { variant: 'ghost', class: 'data-[state=open]:bg-muted flex h-8 w-8 p-0' },
            () => h(MoreHorizontal, { class: 'h-4 w-4' }),
          ),
        ),
        h(DropdownMenuContent, { align: 'end', class: 'w-40' }, () => [
          h(DropdownMenuItem, { onClick: () => viewDetails(activity) }, () => 'View Details'),
          h(DropdownMenuItem, { onClick: () => console.log('Edit', activity.id) }, () => 'Edit'),
          activity.status === PeActivityStatus.APPROVED
            ? h(
                DropdownMenuItem,
                { onClick: () => console.log('Download Certificate', activity.id) },
                () => 'Download',
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
