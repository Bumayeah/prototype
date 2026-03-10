import type { CycleStatus } from '../status'

export interface Cycle {
  id: string
  userId: string
  title: string
  total: number
  registered: number
  remaining: number
  hours: number
  points: number
  startDate: Date
  endDate?: Date
  status: CycleStatus
}

export type ApiCycle = Cycle
