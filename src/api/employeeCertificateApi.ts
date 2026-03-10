import type { ApiCertificate } from '@/types/certificate'
import { getList, getById } from './genericApi'
import type { PaginationOptions } from '@/types/api'

export const getEmployeeCertificates = (params: PaginationOptions<ApiCertificate>) =>
  getList<ApiCertificate>('/api/employee-certificates', params)

export const getEmployeeCertificateById = (id: string) =>
  getById<ApiCertificate>('/api/employee-certificates', id)
