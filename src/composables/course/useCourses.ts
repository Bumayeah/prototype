import type { Course } from '@/types/course'
import { usePaginated } from '../usePaginated'
import { getCourses } from '@/api/courseApi'

export function useCourses() {
  return usePaginated<Course>(getCourses)
}
