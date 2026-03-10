import { getCertificatesByUser } from '@/api/certificateApi'
import { usePaginated } from '@/composables/usePaginated'
import type { Certificate } from '@/types'

export function useCertificates() {
  return usePaginated<Certificate>(getCertificatesByUser)
}
