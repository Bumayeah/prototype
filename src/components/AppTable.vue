<script setup lang="ts">
import type { ColumnDef, ExpandedState, SortingState, VisibilityState } from '@tanstack/vue-table'
import {
  FlexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { ChevronDown } from 'lucide-vue-next'
import { ref } from 'vue'

import { SEARCH_DEBOUNCE_MS } from '@/constants'
import { valueUpdater } from './ui/table/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import DataState from './DataState.vue'
import type { AppError } from '@/utils/AppError'
import type { PaginatedResponse } from '@/types/api'

interface Props<T> {
  response: PaginatedResponse<T>
  columns: ColumnDef<T>[]
  loading: boolean
  updating: boolean
  error: AppError | null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const props = defineProps<Props<any>>()

const emit = defineEmits<{
  pageChange: [page: number]
  search: [query: string]
  sortChange: [column: string, order: 'asc' | 'desc']
}>()

const searchQuery = ref('')
let searchTimeout: ReturnType<typeof setTimeout>
const onSearch = (value: string) => {
  searchQuery.value = value
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => emit('search', value), SEARCH_DEBOUNCE_MS)
}

const sorting = ref<SortingState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})
const expanded = ref<ExpandedState>({})
const pagination = ref({
  pageIndex: props.response.currentPage - 1,
  pageSize: props.response.pageSize,
})

const table = useVueTable({
  get data() {
    return props.response.data
  },
  columns: props.columns,
  get pageCount() {
    return props.response.totalPages
  },
  manualPagination: true,
  manualSorting: true,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  onSortingChange: (updaterOrValue) => {
    valueUpdater(updaterOrValue, sorting)
    const sort = sorting.value[0]
    if (sort) {
      emit('sortChange', sort.id, sort.desc ? 'desc' : 'asc')
    }
  },
  onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
  onExpandedChange: (updaterOrValue) => valueUpdater(updaterOrValue, expanded),
  onPaginationChange: (updaterOrValue) => {
    valueUpdater(updaterOrValue, pagination)
    emit('pageChange', pagination.value.pageIndex + 1)
  },
  state: {
    get sorting() {
      return sorting.value
    },
    get columnVisibility() {
      return columnVisibility.value
    },
    get rowSelection() {
      return rowSelection.value
    },
    get expanded() {
      return expanded.value
    },
    get pagination() {
      return pagination.value
    },
  },
})
</script>

<template>
  <div class="w-full max-w-full">
    <div class="flex items-center py-4">
      <Input
        class="max-w-sm"
        placeholder="Zoeken..."
        :model-value="searchQuery"
        @update:model-value="onSearch(String($event ?? ''))"
      />
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="ml-auto">
            Columns <ChevronDown class="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuCheckboxItem
            v-for="column in table.getAllColumns().filter((column) => column.getCanHide())"
            :key="column.id"
            class="capitalize"
            :model-value="column.getIsVisible()"
            @update:model-value="
              (value) => {
                column.toggleVisibility(!!value)
              }
            "
          >
            {{ column.id }}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <DataState :loading="loading" :updating :error="error">
      <div class="relative overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
              <TableHead v-for="header in headerGroup.headers" :key="header.id" class="bg-muted/40">
                <FlexRender
                  v-if="!header.isPlaceholder"
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <template v-if="table.getRowModel().rows?.length">
              <template v-for="row in table.getRowModel().rows" :key="row.id">
                <TableRow :data-state="row.getIsSelected() && 'selected'">
                  <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                    <FlexRender
                      :render="cell.column.columnDef.cell"
                      :props="cell.getContext()"
                      class="max-w-24 truncate md:max-w-80"
                    />
                  </TableCell>
                </TableRow>
                <TableRow v-if="row.getIsExpanded()">
                  <TableCell :colspan="row.getAllCells().length">
                    {{ JSON.stringify(row.original) }}
                  </TableCell>
                </TableRow>
              </template>
            </template>

            <TableRow v-else>
              <TableCell :colspan="columns.length" class="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </DataState>

    <div class="flex items-center justify-end space-x-2 py-4">
      <div class="text-muted-foreground flex-1 text-sm">
        Page {{ response.currentPage }} of {{ response.totalPages }} ({{ response.totalItems }}
        results)
      </div>
      <div class="space-x-2">
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          Next
        </Button>
      </div>
    </div>
  </div>
</template>
