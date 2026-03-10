import type { EmployeeSubscription } from '@/types/employee'
import { usePaginated } from '../usePaginated'
import { getEmployeeSubscriptions } from '@/api/employeeSubscriptionApi'

export function useEmployeeSubscriptions() {
  return usePaginated<EmployeeSubscription>(getEmployeeSubscriptions)
}
