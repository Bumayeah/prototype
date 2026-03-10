<script setup lang="ts">
import AppTable from '@/components/AppTable.vue'
import type { Certificate } from '@/types'
import { CertificateStatus } from '@/types/status'
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
import { useCertificates } from '@/composables/certificate/useCertificates'
import { PAGE_SIZE } from '@/constants'

const { data, isInitialLoading, isUpdating, error, setPage, setSearch, setSort, setPageSize } =
  useCertificates()

setPageSize(PAGE_SIZE.SM)

const columns: ColumnDef<Certificate>[] = [
  {
    accessorKey: 'course',
    header: 'Course',
    cell: ({ row }) => {
      const course = row.getValue('course') as Certificate['course']
      return course?.title
    },
  },
  {
    accessorKey: 'education',
    header: 'Education',
    cell: ({ row }) => {
      const education = row.getValue('education') as Certificate['education']
      return education?.title
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as Certificate['status']
      const variant = status === CertificateStatus.EXPIRED ? 'destructive' : 'secondary'

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
          certificate.status === CertificateStatus.EXPIRED
            ? h(
                DropdownMenuItem,
                { onClick: () => console.log('Reschedule', certificate.id) },
                () => 'Reschedule',
              )
            : null,
          h(
            DropdownMenuItem,
            { onClick: () => console.log('Download', certificate.id) },
            () => 'Download',
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
