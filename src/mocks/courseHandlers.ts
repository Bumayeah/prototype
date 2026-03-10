import { mockCourses } from './mockDataCourse'
import { createListHandler, createGetByIdHandler } from './genericApi'

export const courseHandlers = [
  createListHandler({
    api: '/api/course',
    items: mockCourses,
    searchableKeys: ['title', 'location', 'instructor', 'category'],
    filterableKeys: ['category', 'type', 'location'],
  }),
  createGetByIdHandler({
    api: '/api/course',
    items: mockCourses,
  }),
]
