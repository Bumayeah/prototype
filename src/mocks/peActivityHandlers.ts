import { mockPeActivities } from './mockDataPeActivity'
import { createListHandler, createGetByIdHandler } from './genericApi'

export const peActivityHandlers = [
  createListHandler({
    api: '/api/pe-activity',
    items: mockPeActivities,
    searchableKeys: ['title', 'provider'],
    filterableKeys: ['status'],
  }),
  createGetByIdHandler({
    api: '/api/pe-activity',
    items: mockPeActivities,
  }),
]
