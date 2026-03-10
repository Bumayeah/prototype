<script setup lang="ts">
import { useEmployeeCertificates } from '@/composables/employee/useEmployeeCertificates'
import AppTable from '@/components/AppTable.vue'
import type { Certificate } from '@/types/certificate'
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
  useEmployeeCertificates()

setPageSize(PAGE_SIZE.SM)

const columns: ColumnDef<Certificate>[] = [
  {
    accessorKey: 'employeeName',
    header: 'Employee',
  },
  {
    id: 'courseName',
    header: 'Course / Education',
    cell: ({ row }) => {
      const cert = row.original
      return cert.course?.title ?? cert.education?.title ?? '-'
    },
  },
  {
    accessorKey: 'achievedOn',
    header: 'Achieved on',
    cell: ({ row }) => {
      const date = row.getValue('achievedOn') as Date
      return new Date(date).toLocaleDateString('en-US')
    },
  },
  {
    accessorKey: 'expireDate',
    header: 'Expiry date',
    cell: ({ row }) => {
      const date = row.getValue('expireDate') as Date | undefined
      return date ? new Date(date).toLocaleDateString('en-US') : '-'
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as Certificate['status']
      const variant = status === 'expired' ? 'destructive' : 'secondary'
      return h(Badge, { variant, class: 'capitalize' }, () => status)
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const certificate = row.original as Certificate
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
            { onClick: () => console.log('Details', certificate.id) },
            () => 'View details',
          ),
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
