import type { ApiPeActivity } from '@/types/pe-activity'
import { getList, getById } from './genericApi'
import type { PaginationOptions } from '@/types/api'

export const getPeActivitiesByUser = (params: PaginationOptions<ApiPeActivity>) =>
  getList<ApiPeActivity>('/api/pe-activity', params)

export const getPeActivityById = (id: string) => getById<ApiPeActivity>('/api/pe-activity', id)
