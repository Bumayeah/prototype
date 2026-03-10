import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchPersons, fetchPersonPrivate, fetchCurrentPerson } from '@/services/personService'
import type { ApiPerson } from '@/types/person/api'

vi.mock('@/api/personApi', () => ({
  getPersons: vi.fn(),
  getPersonById: vi.fn(),
  getCurrentPerson: vi.fn(),
}))

import * as personApi from '@/api/personApi'

const mockGetPersons = vi.mocked(personApi.getPersons)
const mockGetPersonById = vi.mocked(personApi.getPersonById)
const mockGetCurrentPerson = vi.mocked(personApi.getCurrentPerson)

const apiPerson: ApiPerson = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  role: 'User',
  organizationId: 'org-1',
}

const apiPerson2: ApiPerson = {
  id: '2',
  firstName: 'Jane',
  lastName: 'Smith',
  email: 'jane@example.com',
  role: 'Manager',
  organizationId: 'org-1',
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('fetchPersons', () => {
  it('maps API persons to domain persons with fullName', async () => {
    mockGetPersons.mockResolvedValue({
      data: [apiPerson, apiPerson2],
      currentPage: 1,
      pageSize: 10,
      totalItems: 2,
      totalPages: 1,
    })

    const result = await fetchPersons({ page: 1, pageSize: 10 })

    expect(result.data).toHaveLength(2)
    expect(result.data[0].fullName).toBe('John Doe')
    expect(result.data[1].fullName).toBe('Jane Smith')
  })

  it('preserves pagination metadata', async () => {
    mockGetPersons.mockResolvedValue({
      data: [apiPerson],
      currentPage: 3,
      pageSize: 5,
      totalItems: 25,
      totalPages: 5,
    })

    const result = await fetchPersons({ page: 3, pageSize: 5 })

    expect(result.currentPage).toBe(3)
    expect(result.pageSize).toBe(5)
    expect(result.totalItems).toBe(25)
    expect(result.totalPages).toBe(5)
  })

  it('passes params to personApi.getPersons', async () => {
    mockGetPersons.mockResolvedValue({
      data: [],
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
      totalPages: 0,
    })

    const params = { page: 2, pageSize: 20, search: 'test' }
    await fetchPersons(params)

    expect(mockGetPersons).toHaveBeenCalledWith(params)
  })

  it('preserves all original API fields on each person', async () => {
    mockGetPersons.mockResolvedValue({
      data: [apiPerson],
      currentPage: 1,
      pageSize: 10,
      totalItems: 1,
      totalPages: 1,
    })

    const result = await fetchPersons({ page: 1, pageSize: 10 })
    const person = result.data[0]

    expect(person.id).toBe('1')
    expect(person.firstName).toBe('John')
    expect(person.lastName).toBe('Doe')
    expect(person.email).toBe('john@example.com')
    expect(person.role).toBe('User')
    expect(person.organizationId).toBe('org-1')
  })

  it('handles empty data array', async () => {
    mockGetPersons.mockResolvedValue({
      data: [],
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
      totalPages: 0,
    })

    const result = await fetchPersons({ page: 1, pageSize: 10 })

    expect(result.data).toEqual([])
  })
})

describe('fetchPersonPrivate', () => {
  it('fetches person by id and adds fullName', async () => {
    mockGetPersonById.mockResolvedValue(apiPerson)

    const result = await fetchPersonPrivate('1')

    expect(mockGetPersonById).toHaveBeenCalledWith('1')
    expect(result.fullName).toBe('John Doe')
    expect(result.id).toBe('1')
  })
})

describe('fetchCurrentPerson', () => {
  it('fetches current person and adds fullName', async () => {
    mockGetCurrentPerson.mockResolvedValue(apiPerson2)

    const result = await fetchCurrentPerson()

    expect(mockGetCurrentPerson).toHaveBeenCalled()
    expect(result.fullName).toBe('Jane Smith')
    expect(result.email).toBe('jane@example.com')
  })
})
