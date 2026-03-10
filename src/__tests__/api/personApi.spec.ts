import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getPersons, getPersonById, getCurrentPerson } from '@/api/personApi'

vi.mock('@/api/apiWrapper', () => ({
  apiGet: vi.fn(),
}))

import * as api from '@/api/apiWrapper'

const mockApiGet = vi.mocked(api.apiGet)

beforeEach(() => {
  vi.clearAllMocks()
})

describe('getPersons', () => {
  it('builds query with page and pageSize', async () => {
    mockApiGet.mockResolvedValue({ data: [], totalPages: 0, currentPage: 1, pageSize: 10, totalItems: 0 })

    await getPersons({ page: 1, pageSize: 10 })

    const url = mockApiGet.mock.calls[0][0]
    expect(url).toContain('/api/users?')
    const params = new URLSearchParams(url.split('?')[1])
    expect(params.get('page')).toBe('1')
    expect(params.get('pageSize')).toBe('10')
  })

  it('includes search when provided', async () => {
    mockApiGet.mockResolvedValue({ data: [], totalPages: 0, currentPage: 1, pageSize: 10, totalItems: 0 })

    await getPersons({ page: 1, pageSize: 10, search: 'John' })

    const url = mockApiGet.mock.calls[0][0]
    const params = new URLSearchParams(url.split('?')[1])
    expect(params.get('search')).toBe('John')
  })

  it('includes sortBy and sortOrder when provided', async () => {
    mockApiGet.mockResolvedValue({ data: [], totalPages: 0, currentPage: 1, pageSize: 10, totalItems: 0 })

    await getPersons({ page: 1, pageSize: 10, sortBy: 'email', sortOrder: 'asc' })

    const url = mockApiGet.mock.calls[0][0]
    const params = new URLSearchParams(url.split('?')[1])
    expect(params.get('sortBy')).toBe('email')
    expect(params.get('sortOrder')).toBe('asc')
  })

  it('does not include optional params when not set', async () => {
    mockApiGet.mockResolvedValue({ data: [], totalPages: 0, currentPage: 1, pageSize: 10, totalItems: 0 })

    await getPersons({ page: 1, pageSize: 10 })

    const url = mockApiGet.mock.calls[0][0]
    const params = new URLSearchParams(url.split('?')[1])
    expect(params.has('search')).toBe(false)
    expect(params.has('sortBy')).toBe(false)
    expect(params.has('sortOrder')).toBe(false)
  })
})

describe('getPersonById', () => {
  it('calls apiGet with /api/users/:id', async () => {
    mockApiGet.mockResolvedValue({ id: 'abc', firstName: 'John' })

    const result = await getPersonById('abc')

    expect(mockApiGet).toHaveBeenCalledWith('/api/users/abc')
    expect(result).toEqual({ id: 'abc', firstName: 'John' })
  })
})

describe('getCurrentPerson', () => {
  it('calls apiGet with /api/users/me', async () => {
    mockApiGet.mockResolvedValue({ id: '1', firstName: 'Current' })

    const result = await getCurrentPerson()

    expect(mockApiGet).toHaveBeenCalledWith('/api/users/me')
    expect(result).toEqual({ id: '1', firstName: 'Current' })
  })
})
