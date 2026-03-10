import type { Course } from '../course'
import type { Education } from '../education'
import type { SubscriptionStatus } from '../status'

export interface Subscription {
  id: string
  courses: Course[]
  educations: Education[]
  status: SubscriptionStatus
  userId: string
}

export type ApiSubscription = Subscription
