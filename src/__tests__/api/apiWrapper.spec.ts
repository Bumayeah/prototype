import { describe, it, expect, vi, beforeEach } from 'vitest'
import { apiGet, apiPost, apiPut, apiPatch, apiDelete } from '@/api/apiWrapper'

vi.mock('@/api/axiosInstance', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}))

import axiosInstance from '@/api/axiosInstance'

const mock = vi.mocked(axiosInstance)

beforeEach(() => {
  vi.clearAllMocks()
})

describe('apiGet', () => {
  it('calls axiosInstance.get and returns data', async () => {
    mock.get.mockResolvedValue({ data: { id: 1, name: 'Test' } })

    const result = await apiGet('/test')

    expect(mock.get).toHaveBeenCalledWith('/test', undefined)
    expect(result).toEqual({ id: 1, name: 'Test' })
  })

  it('passes config to axiosInstance.get', async () => {
    const config = { headers: { 'X-Custom': 'value' } }
    mock.get.mockResolvedValue({ data: 'ok' })

    await apiGet('/test', config)

    expect(mock.get).toHaveBeenCalledWith('/test', config)
  })

  it('propagates errors from axiosInstance', async () => {
    mock.get.mockRejectedValue(new Error('Network error'))

    await expect(apiGet('/test')).rejects.toThrow('Network error')
  })
})

describe('apiPost', () => {
  it('calls axiosInstance.post with body and returns data', async () => {
    const body = { email: 'test@example.com' }
    mock.post.mockResolvedValue({ data: { success: true } })

    const result = await apiPost('/test', body)

    expect(mock.post).toHaveBeenCalledWith('/test', body, undefined)
    expect(result).toEqual({ success: true })
  })

  it('passes config to axiosInstance.post', async () => {
    const config = { headers: { Authorization: 'Bearer token' } }
    mock.post.mockResolvedValue({ data: 'ok' })

    await apiPost('/test', {}, config)

    expect(mock.post).toHaveBeenCalledWith('/test', {}, config)
  })
})

describe('apiPut', () => {
  it('calls axiosInstance.put with body and returns data', async () => {
    const body = { name: 'Updated' }
    mock.put.mockResolvedValue({ data: { id: 1, name: 'Updated' } })

    const result = await apiPut('/test/1', body)

    expect(mock.put).toHaveBeenCalledWith('/test/1', body, undefined)
    expect(result).toEqual({ id: 1, name: 'Updated' })
  })
})

describe('apiPatch', () => {
  it('calls axiosInstance.patch with body and returns data', async () => {
    const body = { status: 'active' }
    mock.patch.mockResolvedValue({ data: { status: 'active' } })

    const result = await apiPatch('/test/1', body)

    expect(mock.patch).toHaveBeenCalledWith('/test/1', body, undefined)
    expect(result).toEqual({ status: 'active' })
  })

  it('works without body (optional)', async () => {
    mock.patch.mockResolvedValue({ data: { applied: true } })

    const result = await apiPatch('/test/1')

    expect(mock.patch).toHaveBeenCalledWith('/test/1', undefined, undefined)
    expect(result).toEqual({ applied: true })
  })
})

describe('apiDelete', () => {
  it('calls axiosInstance.delete and returns data', async () => {
    mock.delete.mockResolvedValue({ data: { deleted: true } })

    const result = await apiDelete('/test/1')

    expect(mock.delete).toHaveBeenCalledWith('/test/1', undefined)
    expect(result).toEqual({ deleted: true })
  })
})
