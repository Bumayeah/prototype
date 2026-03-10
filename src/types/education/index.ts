import type { Course } from '../course'

export interface Education {
  id: string
  title: string
  description: string
  price: number
  category: string
  courses: Course[]
}

export type ApiEducation = Education
