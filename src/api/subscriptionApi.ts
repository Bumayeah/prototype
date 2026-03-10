import type { ApiSubscription } from '@/types'
import { getList, getById } from './genericApi'
import type { PaginationOptions } from '@/types/api'

export const getSubscriptionsByUser = (params: PaginationOptions<ApiSubscription>) =>
  getList<ApiSubscription>('/api/subscription', params)

export const getSubscriptionById = (id: string) => getById<ApiSubscription>('/api/subscription', id)
