import type { ApiCertificate } from '@/types'
import { getList, getById } from './genericApi'
import type { PaginationOptions } from '@/types/api'

export const getCertificatesByUser = (params: PaginationOptions<ApiCertificate>) =>
  getList<ApiCertificate>('/api/certificate', params)

export const getCertificateById = (id: string) => getById<ApiCertificate>('/api/certificate', id)
