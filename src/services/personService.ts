import * as personApi from '@/api/personApi'
import type { ApiPerson } from '@/types/person/api'
import type { Person } from '@/types/person'
import type { PaginatedResponse, PaginationOptions } from '@/types/api'

function toPerson(apiPerson: ApiPerson): Person {
  return { ...apiPerson, fullName: `${apiPerson.firstName} ${apiPerson.lastName}` }
}

export const fetchPersons = async (
  params: PaginationOptions<Person>,
): Promise<PaginatedResponse<Person>> => {
  const response: PaginatedResponse<ApiPerson> = await personApi.getPersons(params)

  const transferData = response.data.map(toPerson)

  return {
    data: transferData,
    currentPage: response.currentPage,
    pageSize: response.pageSize,
    totalItems: response.totalItems,
    totalPages: response.totalPages,
  }
}

export const fetchPersonPrivate = async (id: string): Promise<Person> => {
  const person: ApiPerson = await personApi.getPersonById(id)
  return toPerson(person)
}

export const fetchCurrentPerson = async (): Promise<Person> => {
  const person: ApiPerson = await personApi.getCurrentPerson()
  return toPerson(person)
}
