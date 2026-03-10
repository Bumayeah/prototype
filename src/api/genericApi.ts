import type { PaginatedResponse, PaginationOptions } from '@/types/api'
import * as api from './apiWrapper'

/**
 * Generic function to get paginated list of any resource
 */
export const getList = <T>(
  resource: string,
  params: PaginationOptions<T>,
): Promise<PaginatedResponse<T>> => {
  const query = new URLSearchParams({
    page: String(params.page ?? 1),
    pageSize: String(params.pageSize ?? 10),
  })

  if (params.search) query.set('search', params.search)
  if (params.sortBy) query.set('sortBy', String(params.sortBy))
  if (params.sortOrder) query.set('sortOrder', params.sortOrder)

  // Optional: add filters if you have them
  if (params.filters) {
    Object.entries(params.filters).forEach(([key, val]) => {
      if (val !== undefined) query.set(`filter[${key}]`, String(val))
    })
  }

  return api.apiGet<PaginatedResponse<T>>(`${resource}?${query.toString()}`)
}

/**
 * Generic function to get a resource by ID
 */
export const getById = <T>(resource: string, id: string) => api.apiGet<T>(`${resource}/${id}`)

/**
 * Optional helper for current user
 */
export const getCurrent = <T>(resource: string) => api.apiGet<T>(`${resource}/me`)
