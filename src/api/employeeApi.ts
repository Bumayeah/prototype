import type { ApiEmployee } from '@/types/employee'
import { getById, getList } from './genericApi'
import type { PaginationOptions } from '@/types/api'

export const getEmployees = (params: PaginationOptions<ApiEmployee>) =>
  getList<ApiEmployee>('/api/employees', params)

export const getEmployeeById = (id: string) => getById<ApiEmployee>('/api/employees', id)
