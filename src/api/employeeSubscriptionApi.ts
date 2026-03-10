import type { ApiEmployeeSubscription } from '@/types/employee'
import { getList, getById } from './genericApi'
import type { PaginationOptions } from '@/types/api'

export const getEmployeeSubscriptions = (params: PaginationOptions<ApiEmployeeSubscription>) =>
  getList<ApiEmployeeSubscription>('/api/employee-subscriptions', params)

export const getEmployeeSubscriptionById = (id: string) =>
  getById<ApiEmployeeSubscription>('/api/employee-subscriptions', id)
