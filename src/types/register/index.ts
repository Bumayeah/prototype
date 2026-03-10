import type { RegisterStatus } from '../status'

export interface Register {
  id: string
  userId: string
  title: string
  startDate: Date
  graduationDate?: Date
  status: RegisterStatus
}

export type ApiRegister = Register
