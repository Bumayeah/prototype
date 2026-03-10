import type { ApiEducation } from '@/types'
import { getById, getList } from './genericApi'
import type { PaginationOptions } from '@/types/api'

export const getEducations = (params: PaginationOptions<ApiEducation>) =>
  getList<ApiEducation>('/api/education', params)

export const getEducationById = (id: string) => getById<ApiEducation>('/api/education', id)
