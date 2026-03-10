import { mockCycles } from './mockDataCycle'
import { createListHandler, createGetByIdHandler } from './genericApi'

export const cycleHandlers = [
  createListHandler({
    api: '/api/cycle',
    items: mockCycles,
    searchableKeys: ['title'],
    filterableKeys: ['status'],
  }),
  createGetByIdHandler({
    api: '/api/cycle',
    items: mockCycles,
  }),
]
