import * as personService from '@/services/personService'
import type { Person } from '@/types/person'
import { useAsync } from '../useAsync'

export function usePerson() {
  const { data, loading, error, execute } = useAsync<Person>()

  const loadPerson = () => execute(personService.fetchCurrentPerson)

  return { data, loading, error, loadPerson }
}
