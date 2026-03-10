import type { PaginatedResponse, PaginationOptions } from '@/types/api'
import * as api from './apiWrapper'
import type { ApiPerson } from '@/types/person/api'

export interface PersonsParams {
  currentPage: number
  pageSize: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export const getPersons = (
  params: PaginationOptions<ApiPerson>,
): Promise<PaginatedResponse<ApiPerson>> => {
  const query = new URLSearchParams({
    page: String(params.page),
    pageSize: String(params.pageSize),
  })
  if (params.search) query.set('search', params.search)
  if (params.sortBy) query.set('sortBy', params.sortBy)
  if (params.sortOrder) query.set('sortOrder', params.sortOrder)

  return api.apiGet<PaginatedResponse<ApiPerson>>(`/api/users?${query}`)
}
export const getPersonById = (id: string) => api.apiGet<ApiPerson>(`/api/users/${id}`)
export const getCurrentPerson = () => api.apiGet<ApiPerson>('/api/users/me')
