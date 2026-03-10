import type { Certificate } from '@/types/certificate'
import { usePaginated } from '../usePaginated'
import { getEmployeeCertificates } from '@/api/employeeCertificateApi'

export function useEmployeeCertificates() {
  return usePaginated<Certificate>(getEmployeeCertificates)
}
