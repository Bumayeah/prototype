import { mockEmployees } from './mockDataEmployee'
import { createListHandler, createGetByIdHandler } from './genericApi'

export const employeeHandlers = [
  createListHandler({
    api: '/api/employees',
    items: mockEmployees,
    searchableKeys: ['firstName', 'lastName', 'email', 'function'],
    filterableKeys: ['function'],
  }),
  createGetByIdHandler({
    api: '/api/employees',
    items: mockEmployees,
  }),
]
