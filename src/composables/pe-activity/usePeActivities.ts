import { usePaginated } from '@/composables/usePaginated'
import { getPeActivitiesByUser } from '@/api/peActivityApi'
import type { PeActivity } from '@/types/pe-activity'

export function usePeActivities() {
  return usePaginated<PeActivity>(getPeActivitiesByUser)
}
