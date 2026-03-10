import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import { useAsync } from '@/composables/useAsync'
import { AppError } from '@/utils/AppError'

describe('useAsync', () => {
  it('starts with default state', () => {
    const { data, loading, error } = useAsync<string>()

    expect(data.value).toBeNull()
    expect(loading.value).toBe(false)
    expect(error.value).toBeNull()
  })

  it('sets data on successful execute', async () => {
    const { data, error, execute } = useAsync<string>()

    await execute(async () => 'result')

    expect(data.value).toBe('result')
    expect(error.value).toBeNull()
  })

  it('sets loading during execution', async () => {
    const { loading, execute } = useAsync<string>()
    const states: boolean[] = []

    let resolvePromise: (value: string) => void
    const promise = execute(
      () =>
        new Promise<string>((resolve) => {
          resolvePromise = resolve
        }),
    )

    await nextTick()
    states.push(loading.value)

    resolvePromise!('done')
    await promise

    states.push(loading.value)

    expect(states).toEqual([true, false])
  })

  it('sets error on failure with AppError', async () => {
    const { data, error, execute } = useAsync<string>()
    const appError = new AppError('test', 'UNKNOWN', 'Something went wrong')

    await execute(async () => {
      throw appError
    })

    expect(error.value).toBe(appError)
    expect(data.value).toBeNull()
  })

  it('wraps non-AppError in AppError', async () => {
    const { error, execute } = useAsync<string>()

    await execute(async () => {
      throw new Error('raw error')
    })

    expect(error.value).toBeInstanceOf(AppError)
    expect(error.value!.code).toBe('UNKNOWN')
  })

  it('clears error on new execute', async () => {
    const { data, error, execute } = useAsync<string>()

    await execute(async () => {
      throw new Error('fail')
    })
    expect(error.value).not.toBeNull()

    await execute(async () => 'success')
    expect(error.value).toBeNull()
    expect(data.value).toBe('success')
  })

  it('returns data on success and null on failure', async () => {
    const { execute } = useAsync<string>()

    const successResult = await execute(async () => 'value')
    expect(successResult).toBe('value')

    const failResult = await execute(async () => {
      throw new Error('fail')
    })
    expect(failResult).toBeNull()
  })
})
