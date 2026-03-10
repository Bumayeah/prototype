import { describe, it, expect } from 'vitest'
import { AppError } from '@/utils/AppError'
import { AxiosError, AxiosHeaders } from 'axios'

function createAxiosError(status: number, message = 'error'): AxiosError {
  const headers = new AxiosHeaders()
  return new AxiosError(message, undefined, undefined, undefined, {
    status,
    statusText: '',
    headers,
    config: { headers },
    data: { message },
  })
}

describe('AppError', () => {
  describe('fromAxios', () => {
    it('maps 400 to VALIDATION_ERROR', () => {
      const error = AppError.fromAxios(createAxiosError(400, 'Bad request'))
      expect(error.code).toBe('VALIDATION_ERROR')
      expect(error.status).toBe(400)
    })

    it('maps 401 to UNAUTHORIZED', () => {
      const error = AppError.fromAxios(createAxiosError(401))
      expect(error.code).toBe('UNAUTHORIZED')
      expect(error.status).toBe(401)
    })

    it('maps 403 to FORBIDDEN', () => {
      const error = AppError.fromAxios(createAxiosError(403))
      expect(error.code).toBe('FORBIDDEN')
      expect(error.status).toBe(403)
    })

    it('maps 404 to NOT_FOUND', () => {
      const error = AppError.fromAxios(createAxiosError(404))
      expect(error.code).toBe('NOT_FOUND')
      expect(error.status).toBe(404)
    })

    it('maps 500+ to SERVER_ERROR', () => {
      const error = AppError.fromAxios(createAxiosError(500))
      expect(error.code).toBe('SERVER_ERROR')
      expect(error.status).toBe(500)
    })

    it('uses server message when available', () => {
      const error = AppError.fromAxios(createAxiosError(400, 'Custom validation error'))
      expect(error.userMessage).toBe('Custom validation error')
    })

    it('handles non-axios errors', () => {
      const error = AppError.fromAxios(new Error('plain error'))
      expect(error.code).toBe('UNKNOWN')
    })

    it('handles network errors (no response)', () => {
      const axiosError = new AxiosError('Network Error')
      const error = AppError.fromAxios(axiosError)
      expect(error.code).toBe('NETWORK_ERROR')
    })

    it('handles timeout errors', () => {
      const axiosError = new AxiosError('timeout', 'ECONNABORTED')
      axiosError.response = { status: 0, statusText: '', headers: {}, config: { headers: new AxiosHeaders() }, data: null }
      const error = AppError.fromAxios(axiosError)
      expect(error.code).toBe('TIMEOUT')
    })
  })

  describe('fromUnknown', () => {
    it('returns same AppError if already AppError', () => {
      const original = new AppError('test', 'NOT_FOUND', 'Not found')
      const result = AppError.fromUnknown(original)
      expect(result).toBe(original)
    })

    it('wraps Error in AppError', () => {
      const result = AppError.fromUnknown(new Error('test'))
      expect(result).toBeInstanceOf(AppError)
      expect(result.message).toBe('test')
      expect(result.code).toBe('UNKNOWN')
    })

    it('wraps string in AppError', () => {
      const result = AppError.fromUnknown('string error')
      expect(result).toBeInstanceOf(AppError)
      expect(result.message).toBe('string error')
    })
  })
})
