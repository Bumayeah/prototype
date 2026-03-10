import { mockCertificates } from './mockDataCertificates'
import { createListHandler, createGetByIdHandler } from './genericApi'

export const certificateHandlers = [
  createListHandler({
    api: '/api/certificate',
    items: mockCertificates,
    searchableKeys: ['course', 'education', 'achievedOn', 'expireDate'],
    filterableKeys: ['status'],
  }),
  createGetByIdHandler({
    api: '/api/certificate',
    items: mockCertificates,
  }),
]
