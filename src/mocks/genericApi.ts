import type { PaginatedResponse } from '@/types/api'
import { http, HttpResponse } from 'msw'

/**
 * Extract claims from JWT in Authorization header
 * (Mock decoding only — no signature verification)
 */
export function getClaimsFromRequest(request: Request): { userId: string | null; organizationId: string | null } {
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) return { userId: null, organizationId: null }

  const token = authHeader.substring(7) // remove "Bearer "

  const parts = token.split('.')
  if (parts.length < 2) return { userId: null, organizationId: null }

  const payloadBase64 = parts[1]
  if (!payloadBase64) return { userId: null, organizationId: null }

  try {
    const decoded = JSON.parse(atob(payloadBase64))
    return {
      userId: decoded?.sub ?? decoded?.userId ?? null,
      organizationId: decoded?.organizationId ?? null,
    }
  } catch {
    return { userId: null, organizationId: null }
  }
}

/**
 * Nested key search helper
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getNestedValue(obj: any, key: string): any {
  return key.split('.').reduce((acc, k) => {
    if (acc === undefined || acc === null) return undefined
    return acc[k]
  }, obj)
}

/**
 * Generic GET-list handler for MSW
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createListHandler<T extends Record<string, any>>(config: {
  api: string
  items: T[]
  searchableKeys?: (keyof T)[]
  filterableKeys?: (keyof T)[]
}) {
  const { api, items, searchableKeys = [], filterableKeys = [] } = config

  return http.get(`${api}`, ({ request }) => {
    const url = new URL(request.url)

    const { userId, organizationId } = getClaimsFromRequest(request)

    // Safe parsing of page/pageSize
    const pageParam = url.searchParams.get('page') ?? url.searchParams.get('currentPage')
    const page = pageParam && pageParam !== 'undefined' ? Number(pageParam) : 1

    const pageSizeParam = url.searchParams.get('pageSize')
    const pageSize = pageSizeParam && pageSizeParam !== 'undefined' ? Number(pageSizeParam) : 10

    const search = url.searchParams.get('search')?.toLowerCase() || ''
    const sortBy = url.searchParams.get('sortBy') as keyof T
    const sortOrder = (url.searchParams.get('sortOrder') as 'asc' | 'desc') || 'asc'

    // Extract filters
    const filters: Partial<Record<keyof T, string>> = {}
    filterableKeys.forEach((key) => {
      const value = url.searchParams.get(`filter[${String(key)}]`)
      if (value && value !== 'undefined') {
        filters[key] = value.toLowerCase()
      }
    })

    let filtered = [...items]

    /**
     * Simulate backend security
     * If items contain userId field → filter by userId
     * If items contain organizationId field → filter by organizationId
     */
    if (userId && filtered.length > 0 && 'userId' in filtered[0]!) {
      filtered = filtered.filter((item) => item.userId === userId)
    }

    if (organizationId && filtered.length > 0 && 'organizationId' in filtered[0]!) {
      filtered = filtered.filter((item) => item.organizationId === organizationId)
    }

    // Apply search
    if (search && searchableKeys.length) {
      filtered = filtered.filter((item) =>
        searchableKeys.some((key) => {
          const val = getNestedValue(item, String(key))

          if (Array.isArray(val)) {
            return val.some((v) =>
              typeof v === 'object'
                ? Object.values(v).some((nested) =>
                    String(nested ?? '')
                      .toLowerCase()
                      .includes(search),
                  )
                : String(v ?? '')
                    .toLowerCase()
                    .includes(search),
            )
          }

          return String(val ?? '')
            .toLowerCase()
            .includes(search)
        }),
      )
    }

    // Apply field filters
    if (Object.keys(filters).length > 0) {
      filtered = filtered.filter((item) =>
        Object.entries(filters).every(
          ([key, val]) => String(item[key as keyof T] ?? '').toLowerCase() === val,
        ),
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

    const response: PaginatedResponse<T> = {
      data: paginated,
      currentPage: page,
      pageSize,
      totalItems,
      totalPages,
    }

    return HttpResponse.json(response, { status: 200 })
  })
}

/**
 * Generic GET-by-id handler
 */
export function createGetByIdHandler<T extends { id: string; userId?: string }>(config: {
  api: string
  items: T[]
}) {
  const { api, items } = config

  return http.get(`${api}/:id`, ({ params, request }) => {
    const { userId } = getClaimsFromRequest(request)

    const item = items.find((i) => i.id === params.id)

    if (!item) {
      return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    }

    // Enforce ownership
    if (userId && item.userId && item.userId !== userId) {
      return HttpResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    return HttpResponse.json(item, { status: 200 })
  })
}
