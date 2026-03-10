import type { Employee } from '@/types/employee'
import { usePaginated } from '../usePaginated'
import { getEmployees } from '@/api/employeeApi'

export function useEmployees() {
  return usePaginated<Employee>(getEmployees)
}
