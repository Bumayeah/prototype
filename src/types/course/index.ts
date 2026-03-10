import type { TrainerStatus, CourseType } from '../status'

export interface Course {
  id: string
  title: string
  description: string
  startDate: Date
  endDate?: Date
  location: string
  available: number
  type: CourseType
  price: number
  category: string
  instructor: string
  trainerId?: string
  trainerStatus?: TrainerStatus
}

export type ApiCourse = Course
