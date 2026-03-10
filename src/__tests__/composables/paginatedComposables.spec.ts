import { describe, it, expect, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import type { PaginatedResponse } from '@/types/api'

// Mock all API modules used by the paginated composables
vi.mock('@/services/personService', () => ({
  fetchPersons: vi.fn(),
}))
vi.mock('@/api/courseApi', () => ({
  getCourses: vi.fn(),
}))
vi.mock('@/api/employeeApi', () => ({
  getEmployees: vi.fn(),
}))
vi.mock('@/api/educationApi', () => ({
  getEducations: vi.fn(),
}))
vi.mock('@/api/certificateApi', () => ({
  getCertificatesByUser: vi.fn(),
}))
vi.mock('@/api/subscriptionApi', () => ({
  getSubscriptionsByUser: vi.fn(),
}))
vi.mock('@/api/registerApi', () => ({
  getRegistersByUser: vi.fn(),
}))
vi.mock('@/api/peActivityApi', () => ({
  getPeActivitiesByUser: vi.fn(),
}))
vi.mock('@/api/cycleApi', () => ({
  getCyclesByUser: vi.fn(),
}))
vi.mock('@/api/employeeCertificateApi', () => ({
  getEmployeeCertificates: vi.fn(),
}))
vi.mock('@/api/employeeSubscriptionApi', () => ({
  getEmployeeSubscriptions: vi.fn(),
}))
vi.mock('@/api/trainerCourseApi', () => ({
  getTrainerCourses: vi.fn(),
  applyForCourse: vi.fn(),
}))

import { fetchPersons } from '@/services/personService'
import { getCourses } from '@/api/courseApi'
import { getEmployees } from '@/api/employeeApi'
import { getEducations } from '@/api/educationApi'
import { getCertificatesByUser } from '@/api/certificateApi'
import { getSubscriptionsByUser } from '@/api/subscriptionApi'
import { getRegistersByUser } from '@/api/registerApi'
import { getPeActivitiesByUser } from '@/api/peActivityApi'
import { getCyclesByUser } from '@/api/cycleApi'
import { getEmployeeCertificates } from '@/api/employeeCertificateApi'
import { getEmployeeSubscriptions } from '@/api/employeeSubscriptionApi'
import { getTrainerCourses, applyForCourse } from '@/api/trainerCourseApi'

function mockPaginatedResponse<T>(data: T[] = []): PaginatedResponse<T> {
  return {
    data,
    currentPage: 1,
    pageSize: 10,
    totalItems: data.length,
    totalPages: 1,
  }
}

beforeEach(() => {
  vi.clearAllMocks()
})

// Helper: tests that a composable correctly wires up to usePaginated with its fetch function
async function testPaginatedComposable(
  composableImport: () => Promise<{ default?: never; [key: string]: unknown }>,
  composableName: string,
  mockFetchFn: ReturnType<typeof vi.fn>,
) {
  mockFetchFn.mockResolvedValue(mockPaginatedResponse([{ id: '1' }]))

  const mod = await composableImport()
  const composableFn = mod[composableName] as () => ReturnType<typeof import('@/composables/usePaginated').usePaginated>
  const { loadData, data } = composableFn()

  await loadData()
  await nextTick()

  expect(mockFetchFn).toHaveBeenCalledWith(
    expect.objectContaining({ page: 1, pageSize: 10 }),
  )
  expect(data.value).not.toBeNull()
  expect(data.value!.data).toHaveLength(1)
}

describe('usePersons', () => {
  it('delegates to usePaginated with fetchPersons', async () => {
    await testPaginatedComposable(
      () => import('@/composables/person/usePersons'),
      'usePersons',
      vi.mocked(fetchPersons),
    )
  })
})

describe('useCourses', () => {
  it('delegates to usePaginated with getCourses', async () => {
    await testPaginatedComposable(
      () => import('@/composables/course/useCourses'),
      'useCourses',
      vi.mocked(getCourses),
    )
  })
})

describe('useEmployees', () => {
  it('delegates to usePaginated with getEmployees', async () => {
    await testPaginatedComposable(
      () => import('@/composables/employee/useEmployees'),
      'useEmployees',
      vi.mocked(getEmployees),
    )
  })
})

describe('useEducations', () => {
  it('delegates to usePaginated with getEducations', async () => {
    await testPaginatedComposable(
      () => import('@/composables/education/useEducations'),
      'useEducations',
      vi.mocked(getEducations),
    )
  })
})

describe('useCertificates', () => {
  it('delegates to usePaginated with getCertificatesByUser', async () => {
    await testPaginatedComposable(
      () => import('@/composables/certificate/useCertificates'),
      'useCertificates',
      vi.mocked(getCertificatesByUser),
    )
  })
})

describe('useSubscriptions', () => {
  it('delegates to usePaginated with getSubscriptionsByUser', async () => {
    await testPaginatedComposable(
      () => import('@/composables/subscription/useSubscriptions'),
      'useSubscriptions',
      vi.mocked(getSubscriptionsByUser),
    )
  })
})

describe('useRegisters', () => {
  it('delegates to usePaginated with getRegistersByUser', async () => {
    await testPaginatedComposable(
      () => import('@/composables/register/useRegisters'),
      'useRegisters',
      vi.mocked(getRegistersByUser),
    )
  })
})

describe('usePeActivities', () => {
  it('delegates to usePaginated with getPeActivitiesByUser', async () => {
    await testPaginatedComposable(
      () => import('@/composables/pe-activity/usePeActivities'),
      'usePeActivities',
      vi.mocked(getPeActivitiesByUser),
    )
  })
})

describe('useCycles', () => {
  it('delegates to usePaginated with getCyclesByUser', async () => {
    await testPaginatedComposable(
      () => import('@/composables/cycle/useCycles'),
      'useCycles',
      vi.mocked(getCyclesByUser),
    )
  })
})

describe('useEmployeeCertificates', () => {
  it('delegates to usePaginated with getEmployeeCertificates', async () => {
    await testPaginatedComposable(
      () => import('@/composables/employee/useEmployeeCertificates'),
      'useEmployeeCertificates',
      vi.mocked(getEmployeeCertificates),
    )
  })
})

describe('useEmployeeSubscriptions', () => {
  it('delegates to usePaginated with getEmployeeSubscriptions', async () => {
    await testPaginatedComposable(
      () => import('@/composables/employee/useEmployeeSubscriptions'),
      'useEmployeeSubscriptions',
      vi.mocked(getEmployeeSubscriptions),
    )
  })
})

describe('useTrainerCourses', () => {
  it('delegates to usePaginated with getTrainerCourses', async () => {
    await testPaginatedComposable(
      () => import('@/composables/course/useTrainerCourses'),
      'useTrainerCourses',
      vi.mocked(getTrainerCourses),
    )
  })

  it('applyForCourse calls API and reloads data', async () => {
    const mockApply = vi.mocked(applyForCourse)
    const mockGetTrainer = vi.mocked(getTrainerCourses)

    mockGetTrainer.mockResolvedValue(mockPaginatedResponse([{ id: '5' }]))
    mockApply.mockResolvedValue({ id: '5' } as never)

    const { useTrainerCourses } = await import('@/composables/course/useTrainerCourses')
    const { applyForCourse: apply, loadData } = useTrainerCourses()

    // Initial load
    await loadData()
    await nextTick()
    const callCountAfterLoad = mockGetTrainer.mock.calls.length

    // Apply triggers reload
    await apply('5')
    await nextTick()

    expect(mockApply).toHaveBeenCalledWith('5')
    expect(mockGetTrainer.mock.calls.length).toBeGreaterThan(callCountAfterLoad)
  })
})
