<script setup lang="ts">
import { useSubscriptions } from '@/composables/subscription/useSubscriptions'
import AppTable from '@/components/AppTable.vue'
import type { Subscription } from '@/types'
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
  useSubscriptions()

setPageSize(PAGE_SIZE.SM)

function cancelSubscription(subscription: Subscription) {
  console.log('Cancel subscription:', subscription.id)
}

const columns: ColumnDef<Subscription>[] = [
  {
    accessorKey: 'courses',
    header: 'Courses',
    cell: ({ row }) => {
      const courses = row.getValue('courses') as Subscription['courses']
      return courses.map((c) => c.title).join(', ')
    },
  },
  {
    accessorKey: 'educations',
    header: 'As Part of Education',
    cell: ({ row }) => {
      const educations = row.getValue('educations') as Subscription['educations']
      return educations.map((e) => e.title).join(', ')
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as Subscription['status']
      const variant = status === SubscriptionStatus.CANCELLED ? 'destructive' : 'secondary'

      return h(Badge, { variant, class: 'capitalize' }, () => status)
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const subscription = row.original as Subscription
      return h(DropdownMenu, {}, () => [
        h(DropdownMenuTrigger, { asChild: true }, () =>
          h(
            Button,
            { variant: 'ghost', class: 'data-[state=open]:bg-muted flex h-8 w-8 p-0' },
            () => h(MoreHorizontal, { class: 'h-4 w-4' }),
          ),
        ),
        h(DropdownMenuContent, { align: 'end', class: 'w-40' }, () => [
          subscription.status === SubscriptionStatus.SUBSCRIBED
            ? h(
                DropdownMenuItem,
                { onClick: () => cancelSubscription(subscription) },
                () => 'Cancel',
              )
            : null,
          h(
            DropdownMenuItem,
            { onClick: () => console.log('Reschedule', subscription.id) },
            () => 'Reschedule',
          ),
          h(
            DropdownMenuItem,
            { onClick: () => console.log('Details', subscription.id) },
            () => 'Details',
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
