import { usePaginated } from '../usePaginated'
import type { Education } from '@/types'
import { getEducations } from '@/api/educationApi'

export function useEducations() {
  return usePaginated<Education>(getEducations)
}
