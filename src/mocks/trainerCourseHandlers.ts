import { http, HttpResponse } from 'msw'
import { mockCourses } from './mockDataCourse'
import { getClaimsFromRequest } from './genericApi'
import type { PaginatedResponse } from '@/types/api'
import type { Course } from '@/types'

export const trainerCourseHandlers = [
  http.get('/api/trainer-courses', ({ request }) => {
    const url = new URL(request.url)
    const { userId } = getClaimsFromRequest(request)

    const page = Number(url.searchParams.get('page') ?? 1)
    const pageSize = Number(url.searchParams.get('pageSize') ?? 10)
    const search = url.searchParams.get('search')?.toLowerCase() || ''
    const sortBy = url.searchParams.get('sortBy') as keyof Course | null
    const sortOrder = (url.searchParams.get('sortOrder') as 'asc' | 'desc') || 'asc'
    const statusFilter = url.searchParams.get('filter[trainerStatus]')?.toLowerCase()

    // Filter by trainerId matching logged-in user
    let filtered = mockCourses.filter((c) => c.trainerId && c.trainerId === userId)

    // Apply search
    if (search) {
      filtered = filtered.filter((c) =>
        [c.title, c.location, c.category].some((val) =>
          val?.toLowerCase().includes(search),
        ),
      )
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(
        (c) => c.trainerStatus?.toLowerCase() === statusFilter,
      )
    }

    // Apply sorting
    if (sortBy && filtered.length > 0 && sortBy in filtered[0]!) {
      filtered.sort((a, b) => {
        const aVal = String(a[sortBy] ?? '').toLowerCase()
        const bVal = String(b[sortBy] ?? '').toLowerCase()
        return sortOrder === 'desc' ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal)
      })
    }

    // Apply pagination
    const totalItems = filtered.length
    const totalPages = Math.ceil(totalItems / pageSize)
    const startIdx = (page - 1) * pageSize
    const paginated = filtered.slice(startIdx, startIdx + pageSize)

    const response: PaginatedResponse<Course> = {
      data: paginated,
      currentPage: page,
      pageSize,
      totalItems,
      totalPages,
    }

    return HttpResponse.json(response, { status: 200 })
  }),

  http.patch('/api/trainer-courses/:id/apply', ({ params }) => {
    const course = mockCourses.find((c) => c.id === params.id)

    if (!course) {
      return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    }

    if (course.trainerStatus !== 'Invited') {
      return HttpResponse.json(
        { message: 'Can only apply when status is Invited' },
        { status: 400 },
      )
    }

    course.trainerStatus = 'Pending'

    return HttpResponse.json(course, { status: 200 })
  }),
]
