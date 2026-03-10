import { ref, type Ref } from 'vue'
import type { PaginationOptions } from '@/types/api'
import { PAGE_SIZE } from '@/constants'

export function usePaginationParams<T>() {
  const currentPage = ref(1)
  const pageSize = ref<number>(PAGE_SIZE.SM)
  const search = ref('')
  const sortBy = ref<keyof T | ''>('')
  const sortOrder = ref<'asc' | 'desc'>('asc')
  const filters = ref<Partial<Record<keyof T, string>>>({}) as Ref<Partial<Record<keyof T, string>>>

  const buildParams = (): PaginationOptions<T> => {
    const activeFilters = Object.fromEntries(
      Object.entries(filters.value).filter(([, v]) => v !== undefined && v !== ''),
    ) as Partial<Record<keyof T, string>>

    return {
      page: currentPage.value,
      pageSize: pageSize.value,
      search: search.value || undefined,
      sortBy: sortBy.value || undefined,
      sortOrder: sortBy.value ? sortOrder.value : undefined,
      filters: Object.keys(activeFilters).length ? activeFilters : undefined,
    }
  }

  const setPage = (page: number) => {
    currentPage.value = page
  }

  const setPageSize = (size: number) => {
    pageSize.value = size
  }

  const setSearch = (query: string) => {
    search.value = query
    currentPage.value = 1
  }

  const setSort = (column: keyof T | string, order: 'asc' | 'desc') => {
    sortBy.value = column as keyof T
    sortOrder.value = order
    currentPage.value = 1
  }

  const setFilter = (key: keyof T, value: string | undefined) => {
    if (value) {
      filters.value[key] = value
    } else {
      delete filters.value[key]
    }
    currentPage.value = 1
  }

  return {
    currentPage,
    pageSize,
    search,
    sortBy,
    sortOrder,
    filters,
    buildParams,
    setPage,
    setPageSize,
    setSearch,
    setSort,
    setFilter,
  }
}
