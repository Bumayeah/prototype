import type { ApiRegister } from '@/types/register'
import { getList, getById } from './genericApi'
import type { PaginationOptions } from '@/types/api'

export const getRegistersByUser = (params: PaginationOptions<ApiRegister>) =>
  getList<ApiRegister>('/api/register', params)

export const getRegisterById = (id: string) => getById<ApiRegister>('/api/register', id)
