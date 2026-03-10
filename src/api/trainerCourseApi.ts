import type { ApiCourse } from '@/types/course'
import { getList } from './genericApi'
import { apiPatch } from './apiWrapper'
import type { PaginationOptions } from '@/types/api'

export const getTrainerCourses = (params: PaginationOptions<ApiCourse>) =>
  getList<ApiCourse>('/api/trainer-courses', params)

export const applyForCourse = (id: string) =>
  apiPatch<ApiCourse>(`/api/trainer-courses/${id}/apply`)
