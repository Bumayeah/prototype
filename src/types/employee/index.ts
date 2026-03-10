export interface Employee {
  id: string
  firstName: string
  lastName: string
  email: string
  organizationId: string
  function: string
}

export type ApiEmployee = Employee

import type { SubscriptionStatus } from '../status'

export interface EmployeeSubscription {
  id: string
  employeeId: string
  employeeName: string
  organizationId: string
  courseName: string
  status: SubscriptionStatus
  startDate: Date
}

export type ApiEmployeeSubscription = EmployeeSubscription
