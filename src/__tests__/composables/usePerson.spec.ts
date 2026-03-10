import { describe, it, expect, vi, beforeEach } from 'vitest'
import { usePerson } from '@/composables/person/usePerson'

vi.mock('@/services/personService', () => ({
  fetchCurrentPerson: vi.fn(),
}))

import * as personService from '@/services/personService'

const mockFetchCurrentPerson = vi.mocked(personService.fetchCurrentPerson)

beforeEach(() => {
  vi.clearAllMocks()
})

describe('usePerson', () => {
  it('starts with null data, no loading, no error', () => {
    const { data, loading, error } = usePerson()

    expect(data.value).toBeNull()
    expect(loading.value).toBe(false)
    expect(error.value).toBeNull()
  })

  it('loadPerson fetches current person and sets data', async () => {
    const person = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.com',
      role: 'User' as const,
      organizationId: 'org-1',
      fullName: 'John Doe',
    }
    mockFetchCurrentPerson.mockResolvedValue(person)

    const { data, loadPerson } = usePerson()
    await loadPerson()

    expect(mockFetchCurrentPerson).toHaveBeenCalled()
    expect(data.value).toEqual(person)
  })

  it('sets error when fetchCurrentPerson fails', async () => {
    mockFetchCurrentPerson.mockRejectedValue(new Error('Network error'))

    const { error, loadPerson } = usePerson()
    await loadPerson()

    expect(error.value).not.toBeNull()
  })
})
