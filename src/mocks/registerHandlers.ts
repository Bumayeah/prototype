import { mockRegisters } from './mockDataRegister'
import { createListHandler, createGetByIdHandler } from './genericApi'

export const registerHandlers = [
  createListHandler({
    api: '/api/register',
    items: mockRegisters,
    searchableKeys: ['title'],
    filterableKeys: ['status'],
  }),
  createGetByIdHandler({
    api: '/api/register',
    items: mockRegisters,
  }),
]
