import { usePaginated } from '@/composables/usePaginated'
import { getCyclesByUser } from '@/api/cycleApi'
import type { Cycle } from '@/types/cycle'

export function useCycles() {
  return usePaginated<Cycle>(getCyclesByUser)
}
