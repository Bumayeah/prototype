import type { PeActivityStatus } from '../status'

export interface PeActivity {
  id: string
  userId: string
  title: string
  provider: string
  hours: number
  points: number
  startDate: Date
  endDate?: Date
  status: PeActivityStatus
}

export type ApiPeActivity = PeActivity
