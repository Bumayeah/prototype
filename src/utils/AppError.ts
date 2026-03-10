import axios from 'axios'

export type ErrorCode =
  | 'NETWORK_ERROR'
  | 'TIMEOUT'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'VALIDATION_ERROR'
  | 'SERVER_ERROR'
  | 'UNKNOWN'

export class AppError extends Error {
  public readonly status?: number
  public readonly code: ErrorCode
  public readonly userMessage: string

  constructor(message: string, code: ErrorCode, userMessage: string, status?: number) {
    super(message)
    this.name = 'AppError'
    this.code = code
    this.userMessage = userMessage
    this.status = status
  }

  /** Strip HTML tags to prevent injection via error messages. */
  private static sanitize(text: string): string {
    return text.replace(/<[^>]*>/g, '')
  }

  static fromAxios(error: unknown): AppError {
    if (!axios.isAxiosError(error)) {
      return AppError.fromUnknown(error)
    }

    const status = error.response?.status
    const rawServerMessage: unknown = error.response?.data?.message
    const serverMessage =
      typeof rawServerMessage === 'string' ? AppError.sanitize(rawServerMessage) : undefined

    if (!error.response) {
      return new AppError(
        error.message,
        'NETWORK_ERROR',
        'Could not connect to the server. Please check your connection.',
      )
    }

    if (error.code === 'ECONNABORTED') {
      return new AppError(error.message, 'TIMEOUT', 'The request timed out. Please try again.')
    }

    switch (status) {
      case 400:
        return new AppError(
          serverMessage || error.message,
          'VALIDATION_ERROR',
          serverMessage || 'The request was invalid.',
          400,
        )
      case 401:
        return new AppError(
          serverMessage || 'Unauthorized',
          'UNAUTHORIZED',
          serverMessage || 'Please log in to continue.',
          401,
        )
      case 403:
        return new AppError(
          serverMessage || 'Forbidden',
          'FORBIDDEN',
          'You do not have permission to perform this action.',
          403,
        )
      case 404:
        return new AppError(
          serverMessage || 'Not found',
          'NOT_FOUND',
          'The requested resource was not found.',
          404,
        )
      default:
        // 5xx: never expose internal server details to the user
        if (status && status >= 500) {
          return new AppError(
            serverMessage || error.message,
            'SERVER_ERROR',
            'Something went wrong on the server. Please try again later.',
            status,
          )
        }
        // Other status codes: use a generic user message (don't forward
        // the raw server response which may contain internal details)
        return new AppError(
          serverMessage || error.message,
          'UNKNOWN',
          'An unexpected error occurred.',
          status,
        )
    }
  }

  static fromUnknown(error: unknown): AppError {
    if (error instanceof AppError) return error

    if (error instanceof Error) {
      return new AppError(error.message, 'UNKNOWN', 'An unexpected error occurred.')
    }

    return new AppError(String(error), 'UNKNOWN', 'An unexpected error occurred.')
  }
}
