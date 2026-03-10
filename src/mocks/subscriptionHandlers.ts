import { mockSubscriptions } from './mockDataSubscription'
import { createListHandler, createGetByIdHandler } from './genericApi'

export const subscriptionHandlers = [
  createListHandler({
    api: '/api/subscription',
    items: mockSubscriptions,
    searchableKeys: ['courses', 'educations'],
    filterableKeys: ['status'],
  }),
  createGetByIdHandler({
    api: '/api/subscription',
    items: mockSubscriptions,
  }),
]
