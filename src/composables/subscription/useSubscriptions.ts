import { usePaginated } from '@/composables/usePaginated'
import { getSubscriptionsByUser } from '@/api/subscriptionApi'
import type { Subscription } from '@/types'

export function useSubscriptions() {
  return usePaginated<Subscription>(getSubscriptionsByUser)
}
