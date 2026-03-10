import type { Course } from '@/types/course'
import { usePaginated } from '../usePaginated'
import { getTrainerCourses, applyForCourse as applyApi } from '@/api/trainerCourseApi'

export function useTrainerCourses() {
  const paginated = usePaginated<Course>(getTrainerCourses)

  const applyForCourse = async (id: string) => {
    await applyApi(id)
    paginated.loadData()
  }

  return {
    ...paginated,
    applyForCourse,
  }
}
