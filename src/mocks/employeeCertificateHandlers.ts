import { mockCertificates } from './mockDataCertificates'
import { createListHandler, createGetByIdHandler } from './genericApi'

// Map certificates: strip userId (prevent user-level filtering) and add flat courseName for search
const employeeCertificateItems = mockCertificates.map(({ userId, ...rest }) => ({
  ...rest,
  courseName: rest.course?.title ?? rest.education?.title ?? '',
}))

export const employeeCertificateHandlers = [
  createListHandler({
    api: '/api/employee-certificates',
    items: employeeCertificateItems,
    searchableKeys: ['employeeName', 'courseName'],
    filterableKeys: ['status'],
  }),
  createGetByIdHandler({
    api: '/api/employee-certificates',
    items: employeeCertificateItems,
  }),
]
