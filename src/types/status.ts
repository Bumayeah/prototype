export const SubscriptionStatus = {
  SUBSCRIBED: 'subscribed',
  CANCELLED: 'cancelled',
} as const

export type SubscriptionStatus = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus]

export const RegisterStatus = {
  ACTIVE: 'Active',
  PENDING: 'Pending',
  DENIED: 'Denied',
} as const

export type RegisterStatus = (typeof RegisterStatus)[keyof typeof RegisterStatus]

export const PeActivityStatus = {
  APPROVED: 'Approved',
  PENDING: 'Pending',
  DENIED: 'Denied',
} as const

export type PeActivityStatus = (typeof PeActivityStatus)[keyof typeof PeActivityStatus]

export const CycleStatus = {
  ACHIEVED: 'Achieved',
  FAILED: 'Failed',
} as const

export type CycleStatus = (typeof CycleStatus)[keyof typeof CycleStatus]

export const CertificateStatus = {
  ACHIEVED: 'achieved',
  EXPIRED: 'expired',
} as const

export type CertificateStatus = (typeof CertificateStatus)[keyof typeof CertificateStatus]

export const TrainerStatus = {
  INVITED: 'Invited',
  PLANNED: 'Planned',
  PENDING: 'Pending',
} as const

export type TrainerStatus = (typeof TrainerStatus)[keyof typeof TrainerStatus]

export const CourseType = {
  ONLINE: 'Online',
  ON_SITE: 'On-site',
  HYBRID: 'Hybrid',
} as const

export type CourseType = (typeof CourseType)[keyof typeof CourseType]
