import { mockPersons } from './mockData'
import { createListHandler, createGetByIdHandler } from './genericApi'

export const personHandlers = [
  createListHandler({
    api: '/api/users',
    items: mockPersons,
    searchableKeys: ['email', 'firstName', 'lastName'],
  }),
  createGetByIdHandler({
    api: '/api/users',
    items: mockPersons,
  }),
]
