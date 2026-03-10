import { computed, ref } from 'vue'
import { useAsync } from './useAsync'
import { usePaginationParams } from './usePaginationParams'
import type { PaginatedResponse, PaginationOptions } from '@/types/api'

export function usePaginated<T>(
  fetchFn: (params: PaginationOptions<T>) => Promise<PaginatedResponse<T>>,
) {
  const params = usePaginationParams<T>()
  const { data, loading, error, execute } = useAsync<PaginatedResponse<T>>()
  const hasLoadedOnce = ref(false)

  const isInitialLoading = computed(() => loading.value && !hasLoadedOnce.value)
  const isUpdating = computed(() => loading.value && hasLoadedOnce.value)

  const loadData = async () => {
    await execute(() => fetchFn(params.buildParams()))
    if (!hasLoadedOnce.value) hasLoadedOnce.value = true
  }

  const withLoad =
    <A extends unknown[]>(fn: (...args: A) => void) =>
    (...args: A) => {
      fn(...args)
      loadData()
    }

  return {
    data,
    error,
    isInitialLoading,
    isUpdating,
    loadData,
    setPage: withLoad(params.setPage),
    setPageSize: withLoad(params.setPageSize),
    setSearch: withLoad(params.setSearch),
    setSort: withLoad(params.setSort),
    setFilter: withLoad(params.setFilter),
  }
}
