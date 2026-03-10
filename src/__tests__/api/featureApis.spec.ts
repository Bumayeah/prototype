import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/api/genericApi', () => ({
  getList: vi.fn(),
  getById: vi.fn(),
}))

vi.mock('@/api/apiWrapper', () => ({
  apiPatch: vi.fn(),
}))

import * as genericApi from '@/api/genericApi'
import * as apiWrapper from '@/api/apiWrapper'

const mockGetList = vi.mocked(genericApi.getList)
const mockGetById = vi.mocked(genericApi.getById)
const mockApiPatch = vi.mocked(apiWrapper.apiPatch)

beforeEach(() => {
  vi.clearAllMocks()
})

const paginatedResponse = {
  data: [{ id: '1' }],
  totalPages: 1,
  currentPage: 1,
  pageSize: 10,
  totalItems: 1,
}

const defaultParams = { page: 1, pageSize: 10 }

// --- employeeApi ---
describe('employeeApi', () => {
  it('getEmployees delegates to getList with /api/employees', async () => {
    const { getEmployees } = await import('@/api/employeeApi')
    mockGetList.mockResolvedValue(paginatedResponse)

    await getEmployees(defaultParams)

    expect(mockGetList).toHaveBeenCalledWith('/api/employees', defaultParams)
  })

  it('getEmployeeById delegates to getById with /api/employees', async () => {
    const { getEmployeeById } = await import('@/api/employeeApi')
    mockGetById.mockResolvedValue({ id: '1' })

    await getEmployeeById('1')

    expect(mockGetById).toHaveBeenCalledWith('/api/employees', '1')
  })
})

// --- courseApi ---
describe('courseApi', () => {
  it('getCourses delegates to getList with /api/course', async () => {
    const { getCourses } = await import('@/api/courseApi')
    mockGetList.mockResolvedValue(paginatedResponse)

    await getCourses(defaultParams)

    expect(mockGetList).toHaveBeenCalledWith('/api/course', defaultParams)
  })

  it('getCourseById delegates to getById with /api/course', async () => {
    const { getCourseById } = await import('@/api/courseApi')
    mockGetById.mockResolvedValue({ id: '1' })

    await getCourseById('1')

    expect(mockGetById).toHaveBeenCalledWith('/api/course', '1')
  })
})

// --- certificateApi ---
describe('certificateApi', () => {
  it('getCertificatesByUser delegates to getList with /api/certificate', async () => {
    const { getCertificatesByUser } = await import('@/api/certificateApi')
    mockGetList.mockResolvedValue(paginatedResponse)

    await getCertificatesByUser(defaultParams)

    expect(mockGetList).toHaveBeenCalledWith('/api/certificate', defaultParams)
  })

  it('getCertificateById delegates to getById with /api/certificate', async () => {
    const { getCertificateById } = await import('@/api/certificateApi')
    mockGetById.mockResolvedValue({ id: '1' })

    await getCertificateById('1')

    expect(mockGetById).toHaveBeenCalledWith('/api/certificate', '1')
  })
})

// --- subscriptionApi ---
describe('subscriptionApi', () => {
  it('getSubscriptionsByUser delegates to getList with /api/subscription', async () => {
    const { getSubscriptionsByUser } = await import('@/api/subscriptionApi')
    mockGetList.mockResolvedValue(paginatedResponse)

    await getSubscriptionsByUser(defaultParams)

    expect(mockGetList).toHaveBeenCalledWith('/api/subscription', defaultParams)
  })

  it('getSubscriptionById delegates to getById with /api/subscription', async () => {
    const { getSubscriptionById } = await import('@/api/subscriptionApi')
    mockGetById.mockResolvedValue({ id: '1' })

    await getSubscriptionById('1')

    expect(mockGetById).toHaveBeenCalledWith('/api/subscription', '1')
  })
})

// --- educationApi ---
describe('educationApi', () => {
  it('getEducations delegates to getList with /api/education', async () => {
    const { getEducations } = await import('@/api/educationApi')
    mockGetList.mockResolvedValue(paginatedResponse)

    await getEducations(defaultParams)

    expect(mockGetList).toHaveBeenCalledWith('/api/education', defaultParams)
  })

  it('getEducationById delegates to getById with /api/education', async () => {
    const { getEducationById } = await import('@/api/educationApi')
    mockGetById.mockResolvedValue({ id: '1' })

    await getEducationById('1')

    expect(mockGetById).toHaveBeenCalledWith('/api/education', '1')
  })
})

// --- cycleApi ---
describe('cycleApi', () => {
  it('getCyclesByUser delegates to getList with /api/cycle', async () => {
    const { getCyclesByUser } = await import('@/api/cycleApi')
    mockGetList.mockResolvedValue(paginatedResponse)

    await getCyclesByUser(defaultParams)

    expect(mockGetList).toHaveBeenCalledWith('/api/cycle', defaultParams)
  })

  it('getCycleById delegates to getById with /api/cycle', async () => {
    const { getCycleById } = await import('@/api/cycleApi')
    mockGetById.mockResolvedValue({ id: '1' })

    await getCycleById('1')

    expect(mockGetById).toHaveBeenCalledWith('/api/cycle', '1')
  })
})

// --- peActivityApi ---
describe('peActivityApi', () => {
  it('getPeActivitiesByUser delegates to getList with /api/pe-activity', async () => {
    const { getPeActivitiesByUser } = await import('@/api/peActivityApi')
    mockGetList.mockResolvedValue(paginatedResponse)

    await getPeActivitiesByUser(defaultParams)

    expect(mockGetList).toHaveBeenCalledWith('/api/pe-activity', defaultParams)
  })

  it('getPeActivityById delegates to getById with /api/pe-activity', async () => {
    const { getPeActivityById } = await import('@/api/peActivityApi')
    mockGetById.mockResolvedValue({ id: '1' })

    await getPeActivityById('1')

    expect(mockGetById).toHaveBeenCalledWith('/api/pe-activity', '1')
  })
})

// --- registerApi ---
describe('registerApi', () => {
  it('getRegistersByUser delegates to getList with /api/register', async () => {
    const { getRegistersByUser } = await import('@/api/registerApi')
    mockGetList.mockResolvedValue(paginatedResponse)

    await getRegistersByUser(defaultParams)

    expect(mockGetList).toHaveBeenCalledWith('/api/register', defaultParams)
  })

  it('getRegisterById delegates to getById with /api/register', async () => {
    const { getRegisterById } = await import('@/api/registerApi')
    mockGetById.mockResolvedValue({ id: '1' })

    await getRegisterById('1')

    expect(mockGetById).toHaveBeenCalledWith('/api/register', '1')
  })
})

// --- employeeCertificateApi ---
describe('employeeCertificateApi', () => {
  it('getEmployeeCertificates delegates to getList with /api/employee-certificates', async () => {
    const { getEmployeeCertificates } = await import('@/api/employeeCertificateApi')
    mockGetList.mockResolvedValue(paginatedResponse)

    await getEmployeeCertificates(defaultParams)

    expect(mockGetList).toHaveBeenCalledWith('/api/employee-certificates', defaultParams)
  })

  it('getEmployeeCertificateById delegates to getById with /api/employee-certificates', async () => {
    const { getEmployeeCertificateById } = await import('@/api/employeeCertificateApi')
    mockGetById.mockResolvedValue({ id: '1' })

    await getEmployeeCertificateById('1')

    expect(mockGetById).toHaveBeenCalledWith('/api/employee-certificates', '1')
  })
})

// --- employeeSubscriptionApi ---
describe('employeeSubscriptionApi', () => {
  it('getEmployeeSubscriptions delegates to getList with /api/employee-subscriptions', async () => {
    const { getEmployeeSubscriptions } = await import('@/api/employeeSubscriptionApi')
    mockGetList.mockResolvedValue(paginatedResponse)

    await getEmployeeSubscriptions(defaultParams)

    expect(mockGetList).toHaveBeenCalledWith('/api/employee-subscriptions', defaultParams)
  })

  it('getEmployeeSubscriptionById delegates to getById with /api/employee-subscriptions', async () => {
    const { getEmployeeSubscriptionById } = await import('@/api/employeeSubscriptionApi')
    mockGetById.mockResolvedValue({ id: '1' })

    await getEmployeeSubscriptionById('1')

    expect(mockGetById).toHaveBeenCalledWith('/api/employee-subscriptions', '1')
  })
})

// --- trainerCourseApi ---
describe('trainerCourseApi', () => {
  it('getTrainerCourses delegates to getList with /api/trainer-courses', async () => {
    const { getTrainerCourses } = await import('@/api/trainerCourseApi')
    mockGetList.mockResolvedValue(paginatedResponse)

    await getTrainerCourses(defaultParams)

    expect(mockGetList).toHaveBeenCalledWith('/api/trainer-courses', defaultParams)
  })

  it('applyForCourse calls apiPatch with correct endpoint', async () => {
    const { applyForCourse } = await import('@/api/trainerCourseApi')
    mockApiPatch.mockResolvedValue({ id: '5', applied: true })

    const result = await applyForCourse('5')

    expect(mockApiPatch).toHaveBeenCalledWith('/api/trainer-courses/5/apply')
    expect(result).toEqual({ id: '5', applied: true })
  })
})
