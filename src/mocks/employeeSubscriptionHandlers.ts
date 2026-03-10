import { mockEmployeeSubscriptions } from './mockDataEmployeeSubscription'
import { createListHandler, createGetByIdHandler } from './genericApi'

export const employeeSubscriptionHandlers = [
  createListHandler({
    api: '/api/employee-subscriptions',
    items: mockEmployeeSubscriptions,
    searchableKeys: ['employeeName', 'courseName'],
    filterableKeys: ['status'],
  }),
  createGetByIdHandler({
    api: '/api/employee-subscriptions',
    items: mockEmployeeSubscriptions,
  }),
]
