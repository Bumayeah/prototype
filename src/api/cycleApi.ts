import type { ApiCycle } from '@/types/cycle'
import { getList, getById } from './genericApi'
import type { PaginationOptions } from '@/types/api'

export const getCyclesByUser = (params: PaginationOptions<ApiCycle>) =>
  getList<ApiCycle>('/api/cycle', params)

export const getCycleById = (id: string) => getById<ApiCycle>('/api/cycle', id)
