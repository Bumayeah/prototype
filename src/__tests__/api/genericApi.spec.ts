import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getList, getById, getCurrent } from '@/api/genericApi'

vi.mock('@/api/apiWrapper', () => ({
  apiGet: vi.fn(),
}))

import * as api from '@/api/apiWrapper'

const mockApiGet = vi.mocked(api.apiGet)

beforeEach(() => {
  vi.clearAllMocks()
})

describe('getList', () => {
  it('builds query with page and pageSize defaults', async () => {
    mockApiGet.mockResolvedValue({ data: [], totalPages: 0, currentPage: 1, pageSize: 10, totalItems: 0 })

    await getList('/api/items', {})

    expect(mockApiGet).toHaveBeenCalledWith(
      expect.stringContaining('/api/items?'),
    )
    const url = mockApiGet.mock.calls[0][0]
    const params = new URLSearchParams(url.split('?')[1])
    expect(params.get('page')).toBe('1')
    expect(params.get('pageSize')).toBe('10')
  })

  it('uses provided page and pageSize', async () => {
    mockApiGet.mockResolvedValue({ data: [], totalPages: 1, currentPage: 2, pageSize: 25, totalItems: 50 })

    await getList('/api/items', { page: 2, pageSize: 25 })

    const url = mockApiGet.mock.calls[0][0]
    const params = new URLSearchParams(url.split('?')[1])
    expect(params.get('page')).toBe('2')
    expect(params.get('pageSize')).toBe('25')
  })

  it('includes search param when provided', async () => {
    mockApiGet.mockResolvedValue({ data: [], totalPages: 0, currentPage: 1, pageSize: 10, totalItems: 0 })

    await getList('/api/items', { search: 'test query' })

    const url = mockApiGet.mock.calls[0][0]
    const params = new URLSearchParams(url.split('?')[1])
    expect(params.get('search')).toBe('test query')
  })

  it('does not include search param when empty', async () => {
    mockApiGet.mockResolvedValue({ data: [], totalPages: 0, currentPage: 1, pageSize: 10, totalItems: 0 })

    await getList('/api/items', {})

    const url = mockApiGet.mock.calls[0][0]
    const params = new URLSearchParams(url.split('?')[1])
    expect(params.has('search')).toBe(false)
  })

  it('includes sortBy and sortOrder when provided', async () => {
    mockApiGet.mockResolvedValue({ data: [], totalPages: 0, currentPage: 1, pageSize: 10, totalItems: 0 })

    await getList<{ name: string }>('/api/items', { sortBy: 'name', sortOrder: 'desc' })

    const url = mockApiGet.mock.calls[0][0]
    const params = new URLSearchParams(url.split('?')[1])
    expect(params.get('sortBy')).toBe('name')
    expect(params.get('sortOrder')).toBe('desc')
  })

  it('includes filters as filter[key] params', async () => {
    mockApiGet.mockResolvedValue({ data: [], totalPages: 0, currentPage: 1, pageSize: 10, totalItems: 0 })

    await getList<{ status: string; category: string }>('/api/items', {
      filters: { status: 'active', category: 'A' },
    })

    const url = mockApiGet.mock.calls[0][0]
    const params = new URLSearchParams(url.split('?')[1])
    expect(params.get('filter[status]')).toBe('active')
    expect(params.get('filter[category]')).toBe('A')
  })

  it('skips undefined filter values', async () => {
    mockApiGet.mockResolvedValue({ data: [], totalPages: 0, currentPage: 1, pageSize: 10, totalItems: 0 })

    await getList<{ status: string; category: string }>('/api/items', {
      filters: { status: 'active', category: undefined },
    })

    const url = mockApiGet.mock.calls[0][0]
    const params = new URLSearchParams(url.split('?')[1])
    expect(params.get('filter[status]')).toBe('active')
    expect(params.has('filter[category]')).toBe(false)
  })

  it('returns paginated response', async () => {
    const response = {
      data: [{ id: 1 }, { id: 2 }],
      totalPages: 5,
      currentPage: 1,
      pageSize: 10,
      totalItems: 50,
    }
    mockApiGet.mockResolvedValue(response)

    const result = await getList('/api/items', { page: 1, pageSize: 10 })

    expect(result).toEqual(response)
  })
})

describe('getById', () => {
  it('calls apiGet with resource/id', async () => {
    mockApiGet.mockResolvedValue({ id: '123', name: 'Item' })

    const result = await getById('/api/items', '123')

    expect(mockApiGet).toHaveBeenCalledWith('/api/items/123')
    expect(result).toEqual({ id: '123', name: 'Item' })
  })
})

describe('getCurrent', () => {
  it('calls apiGet with resource/me', async () => {
    mockApiGet.mockResolvedValue({ id: '1', email: 'me@example.com' })

    const result = await getCurrent('/api/users')

    expect(mockApiGet).toHaveBeenCalledWith('/api/users/me')
    expect(result).toEqual({ id: '1', email: 'me@example.com' })
  })
})
