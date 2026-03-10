import type { Role } from '@/types/auth'

export interface Person {
  id: string
  firstName: string
  lastName: string
  email: string
  role: Role
  organizationId: string
  fullName?: string
}
