<script setup lang="ts">
import { useEmployees } from '@/composables/employee/useEmployees'
import AppTable from '@/components/AppTable.vue'
import type { Employee } from '@/types/employee'
import type { ColumnDef } from '@tanstack/vue-table'
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
  useEmployees()

setPageSize(PAGE_SIZE.SM)

function viewDetails(employee: Employee) {
  logger.warn('View details:', employee.id)
}

const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'firstName',
    header: 'First name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('email')),
  },
  {
    accessorKey: 'function',
    header: 'Function',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const employee = row.original as Employee
      return h(DropdownMenu, {}, () => [
        h(DropdownMenuTrigger, { asChild: true }, () =>
          h(
            Button,
            { variant: 'ghost', class: 'data-[state=open]:bg-muted flex h-8 w-8 p-0' },
            () => h(MoreHorizontal, { class: 'h-4 w-4' }),
          ),
        ),
        h(DropdownMenuContent, { align: 'end', class: 'w-40' }, () => [
          h(DropdownMenuItem, { onClick: () => viewDetails(employee) }, () => 'View details'),
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
