import type { Role } from '@/types/auth'

export interface ApiPerson {
  id: string
  firstName: string
  lastName: string
  email: string
  role: Role
  organizationId: string
}
