import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import { usePaginated } from '@/composables/usePaginated'
import type { PaginatedResponse, PaginationOptions } from '@/types/api'

interface TestItem {
  id: string
  name: string
  status: string
}

function createMockFetch(items: TestItem[] = []) {
  return vi.fn(async (params: PaginationOptions<TestItem>): Promise<PaginatedResponse<TestItem>> => {
    const page = params.page ?? 1
    const pageSize = params.pageSize ?? 10
    return {
      data: items.slice((page - 1) * pageSize, page * pageSize),
      currentPage: page,
      pageSize,
      totalItems: items.length,
      totalPages: Math.ceil(items.length / pageSize),
    }
  })
}

const testItems: TestItem[] = Array.from({ length: 25 }, (_, i) => ({
  id: String(i + 1),
  name: `Item ${i + 1}`,
  status: i % 2 === 0 ? 'active' : 'inactive',
}))

describe('usePaginated', () => {
  it('loads data on setPageSize call', async () => {
    const fetchFn = createMockFetch(testItems)
    const { data, setPageSize } = usePaginated<TestItem>(fetchFn)

    setPageSize(5)
    await nextTick()

    expect(fetchFn).toHaveBeenCalledWith(
      expect.objectContaining({ page: 1, pageSize: 5 }),
    )
    expect(data.value).not.toBeNull()
    expect(data.value!.data).toHaveLength(5)
  })

  it('resets page to 1 on search', async () => {
    const fetchFn = createMockFetch(testItems)
    const { setPageSize, setPage, setSearch } = usePaginated<TestItem>(fetchFn)

    setPageSize(10)
    await nextTick()

    setPage(3)
    await nextTick()

    setSearch('test')
    await nextTick()

    const lastCall = fetchFn.mock.calls.at(-1)![0]
    expect(lastCall.page).toBe(1)
    expect(lastCall.search).toBe('test')
  })

  it('resets page to 1 on sort', async () => {
    const fetchFn = createMockFetch(testItems)
    const { setPageSize, setPage, setSort } = usePaginated<TestItem>(fetchFn)

    setPageSize(10)
    await nextTick()

    setPage(2)
    await nextTick()

    setSort('name', 'desc')
    await nextTick()

    const lastCall = fetchFn.mock.calls.at(-1)![0]
    expect(lastCall.page).toBe(1)
    expect(lastCall.sortBy).toBe('name')
    expect(lastCall.sortOrder).toBe('desc')
  })

  it('passes filters to fetchFn', async () => {
    const fetchFn = createMockFetch(testItems)
    const { setPageSize, setFilter } = usePaginated<TestItem>(fetchFn)

    setPageSize(10)
    await nextTick()

    setFilter('status', 'active')
    await nextTick()

    const lastCall = fetchFn.mock.calls.at(-1)![0]
    expect(lastCall.filters).toEqual({ status: 'active' })
  })

  it('removes filter when value is undefined', async () => {
    const fetchFn = createMockFetch(testItems)
    const { setPageSize, setFilter } = usePaginated<TestItem>(fetchFn)

    setPageSize(10)
    await nextTick()

    setFilter('status', 'active')
    await nextTick()

    setFilter('status', undefined)
    await nextTick()

    const lastCall = fetchFn.mock.calls.at(-1)![0]
    expect(lastCall.filters).toBeUndefined()
  })

  it('resets page to 1 on filter', async () => {
    const fetchFn = createMockFetch(testItems)
    const { setPageSize, setPage, setFilter } = usePaginated<TestItem>(fetchFn)

    setPageSize(10)
    await nextTick()

    setPage(3)
    await nextTick()

    setFilter('status', 'active')
    await nextTick()

    const lastCall = fetchFn.mock.calls.at(-1)![0]
    expect(lastCall.page).toBe(1)
  })

  it('does not pass empty search or sort', async () => {
    const fetchFn = createMockFetch(testItems)
    const { setPageSize } = usePaginated<TestItem>(fetchFn)

    setPageSize(10)
    await nextTick()

    const lastCall = fetchFn.mock.calls.at(-1)![0]
    expect(lastCall.search).toBeUndefined()
    expect(lastCall.sortBy).toBeUndefined()
    expect(lastCall.sortOrder).toBeUndefined()
    expect(lastCall.filters).toBeUndefined()
  })

  it('tracks loading state correctly', async () => {
    let resolvePromise: (value: PaginatedResponse<TestItem>) => void
    const fetchFn = vi.fn(
      () =>
        new Promise<PaginatedResponse<TestItem>>((resolve) => {
          resolvePromise = resolve
        }),
    )

    const { isInitialLoading, isUpdating, setPageSize } = usePaginated<TestItem>(fetchFn)

    expect(isInitialLoading.value).toBe(false)
    expect(isUpdating.value).toBe(false)

    setPageSize(10)
    await nextTick()

    expect(isInitialLoading.value).toBe(true)
    expect(isUpdating.value).toBe(false)

    resolvePromise!({
      data: [],
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
      totalPages: 0,
    })
    await nextTick()
    await nextTick()

    expect(isInitialLoading.value).toBe(false)
    expect(isUpdating.value).toBe(false)
  })

  it('sets pagination correctly', async () => {
    const fetchFn = createMockFetch(testItems)
    const { data, setPageSize, setPage } = usePaginated<TestItem>(fetchFn)

    setPageSize(10)
    await nextTick()

    expect(data.value!.totalItems).toBe(25)
    expect(data.value!.totalPages).toBe(3)

    setPage(2)
    await nextTick()

    expect(data.value!.currentPage).toBe(2)
    expect(data.value!.data).toHaveLength(10)

    setPage(3)
    await nextTick()

    expect(data.value!.data).toHaveLength(5)
  })
})
