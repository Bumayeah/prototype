export interface PaginatedResponse<T> extends PaginationInfo {
  data: T[]
  totalPages: number
}

export interface PaginationInfo {
  currentPage: number
  pageSize: number
  totalItems: number
}

export interface PaginationOptions<T> {
  page?: number
  pageSize?: number
  sortBy?: keyof T
  sortOrder?: 'asc' | 'desc'
  search?: string
  filters?: Partial<Record<keyof T, string>> // simple string filters for now
}
