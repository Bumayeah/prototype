<script setup lang="ts">
import { useEmployeeSubscriptions } from '@/composables/employee/useEmployeeSubscriptions'
import AppTable from '@/components/AppTable.vue'
import type { EmployeeSubscription } from '@/types/employee'
import { SubscriptionStatus } from '@/types/status'
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
  useEmployeeSubscriptions()

setPageSize(PAGE_SIZE.SM)

const columns: ColumnDef<EmployeeSubscription>[] = [
  {
    accessorKey: 'employeeName',
    header: 'Employee',
  },
  {
    accessorKey: 'courseName',
    header: 'Course',
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
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as EmployeeSubscription['status']
      const variant = status === SubscriptionStatus.CANCELLED ? 'destructive' : 'secondary'
      return h(Badge, { variant, class: 'capitalize' }, () => status)
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const subscription = row.original as EmployeeSubscription
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
            { onClick: () => console.log('Details', subscription.id) },
            () => 'View details',
          ),
          subscription.status === SubscriptionStatus.SUBSCRIBED
            ? h(
                DropdownMenuItem,
                { onClick: () => console.log('Cancel', subscription.id) },
                () => 'Cancel',
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
