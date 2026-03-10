import type { Person } from '@/types/person'
import * as personService from '@/services/personService'
import { usePaginated } from '../usePaginated'

export function usePersons() {
  return usePaginated<Person>(personService.fetchPersons)
}
