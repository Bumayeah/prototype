import { mockEducations } from './mockDataEducation'
import { createListHandler, createGetByIdHandler } from './genericApi'

export const educationHandlers = [
  createListHandler({
    api: '/api/education',
    items: mockEducations,
    searchableKeys: ['title', 'description', 'price', 'category'],
    filterableKeys: ['category'],
  }),
  createGetByIdHandler({
    api: '/api/education',
    items: mockEducations,
  }),
]
