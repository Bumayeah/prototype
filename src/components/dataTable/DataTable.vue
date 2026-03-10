<script setup lang="ts" generic="TData, TValue">
import { ref } from 'vue'
import { FlexRender, getCoreRowModel, useVueTable, type ColumnDef } from '@tanstack/vue-table'
import {
  DataTableContainer,
  DataTableBody,
  DataTableCell,
  DataTableHead,
  DataTableHeader,
  DataTableRow,
} from './'
import settings from 'remixicon/icons/System/settings-5-line.svg?url'

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  hasSettings?: boolean
  columnVisibility?: Record<string, boolean>
}>()

const emit = defineEmits<{
  (e: 'settings-click'): void
}>()

const columnOrder = ref<string[]>([])
const draggingColumnId = ref<string | null>(null)

const table = useVueTable<TData>({
  get data() {
    return props.data
  },
  get columns(): ColumnDef<TData, TValue>[] {
    return props.columns
  },
  state: {
    get columnOrder() {
      return columnOrder.value
    },
    get columnVisibility() {
      return props.columnVisibility ?? {}
    },
  },
  onColumnOrderChange: (updater) => {
    columnOrder.value = typeof updater === 'function' ? updater(columnOrder.value) : updater
  },
  getCoreRowModel: getCoreRowModel(),
})

// Drag start only allowed on columns with enableColumnDragging
function onDragStart(columnId: string) {
  return (event: DragEvent) => {
    const column = table.getColumn(columnId)
    if (!column?.columnDef.meta?.enableColumnDragging) {
      event.preventDefault()
      return
    }
    draggingColumnId.value = columnId
  }
}

// Drop guard: cannot drop onto first checkbox column
function onDrop(targetColumnId: string) {
  return (event: DragEvent) => {
    event.preventDefault()
    if (!draggingColumnId.value) return

    const leafColumns = table.getAllLeafColumns().map((c) => c.id)
    const fromIndex = leafColumns.indexOf(draggingColumnId.value)
    const toIndex = leafColumns.indexOf(targetColumnId)

    if (toIndex === 0) return // cannot drop on first column

    if (fromIndex === -1 || toIndex === -1) return

    const newOrder = [...leafColumns]
    const [moved] = newOrder.splice(fromIndex, 1)
    newOrder.splice(toIndex, 0, moved)

    table.setColumnOrder(newOrder)
    draggingColumnId.value = null
  }
}
</script>

<template>
  <div
    role="data-table"
    class="relative overflow-x-auto border-l border-r border-border-base-soft text-(--text-text-heading)"
  >
    <button
      v-if="hasSettings"
      @click="emit('settings-click')"
      class="absolute bg-white top-0 right-0 px-3 h-11.5 z-10 border border-(--colors-border-white-default)"
    >
      <img class="size-5" :src="settings" />
    </button>
    <DataTableContainer>
      <DataTableHeader>
        <DataTableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <DataTableHead
            v-for="header in headerGroup.headers"
            :key="header.id"
            :is-pinned="header.column.columnDef.enablePinning && header.column.id !== 'select'"
            :header-menu-items="header.column.columnDef.meta?.headerMenuItems"
            :is-custom-header="header.column.columnDef.meta?.isCustomHeader"
            :is-draggable="header.column.columnDef.meta?.enableColumnDragging === true"
            :draggable="header.column.columnDef.meta?.enableColumnDragging === true"
            @dragstart="($event: DragEvent) => onDragStart(header.column.id)($event)"
            @dragover.prevent
            @drop="($event: DragEvent) => onDrop(header.column.id)($event)"
            class="header-cell"
          >
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </DataTableHead>
        </DataTableRow>
      </DataTableHeader>

      <DataTableBody>
        <template v-if="table.getRowModel().rows?.length">
          <DataTableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined"
          >
            <DataTableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </DataTableCell>
          </DataTableRow>
        </template>

        <template v-else>
          <DataTableRow>
            <DataTableCell :colspan="columns.length" class="h-24 text-center"> No results. </DataTableCell>
          </DataTableRow>
        </template>
      </DataTableBody>
    </DataTableContainer>
  </div>
</template>
