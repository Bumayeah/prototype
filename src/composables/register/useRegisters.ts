import { usePaginated } from '@/composables/usePaginated'
import { getRegistersByUser } from '@/api/registerApi'
import type { Register } from '@/types/register'

export function useRegisters() {
  return usePaginated<Register>(getRegistersByUser)
}
