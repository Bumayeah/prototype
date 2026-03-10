import type { ApiCourse } from '@/types'
import { getById, getList } from './genericApi'
import type { PaginationOptions } from '@/types/api'

export const getCourses = (params: PaginationOptions<ApiCourse>) =>
  getList<ApiCourse>('/api/course', params)

export const getCourseById = (id: string) => getById<ApiCourse>('/api/course', id)
