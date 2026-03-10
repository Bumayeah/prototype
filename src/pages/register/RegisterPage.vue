<script setup lang="ts">
import { useRegisters } from '@/composables/register/useRegisters'
import AppTable from '@/components/AppTable.vue'
import type { Register } from '@/types/register'
import { RegisterStatus } from '@/types/status'
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
import { logger } from '@/utils/logger'
import { PAGE_SIZE } from '@/constants'

const { data, isInitialLoading, isUpdating, error, setPage, setSearch, setSort, setPageSize } =
  useRegisters()

setPageSize(PAGE_SIZE.SM)

function viewDetails(register: Register) {
  logger.warn('View details:', register.id)
}

const columns: ColumnDef<Register>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
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
    accessorKey: 'graduationDate',
    header: 'Graduation Date',
    cell: ({ row }) => {
      const date = row.getValue('graduationDate') as Date | undefined
      return date ? new Date(date).toLocaleDateString('en-US') : '-'
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as Register['status']
      const variant =
        status === RegisterStatus.ACTIVE
          ? 'default'
          : status === RegisterStatus.PENDING
            ? 'secondary'
            : 'destructive'

      return h(Badge, { variant, class: 'capitalize' }, () => status)
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const register = row.original as Register
      return h(DropdownMenu, {}, () => [
        h(DropdownMenuTrigger, { asChild: true }, () =>
          h(
            Button,
            { variant: 'ghost', class: 'data-[state=open]:bg-muted flex h-8 w-8 p-0' },
            () => h(MoreHorizontal, { class: 'h-4 w-4' }),
          ),
        ),
        h(DropdownMenuContent, { align: 'end', class: 'w-40' }, () => [
          h(DropdownMenuItem, { onClick: () => viewDetails(register) }, () => 'View Details'),
          h(DropdownMenuItem, { onClick: () => logger.warn('Edit', register.id) }, () => 'Edit'),
          register.status === RegisterStatus.DENIED
            ? h(
                DropdownMenuItem,
                { onClick: () => logger.warn('Reapply', register.id) },
                () => 'Reapply',
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
