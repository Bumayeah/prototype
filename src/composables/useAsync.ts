import { ref } from 'vue'
import { AppError } from '@/utils/AppError'

export function useAsync<T, P = void>() {
  const data = ref<T | null>(null)
  const loading = ref(false)
  const error = ref<AppError | null>(null)

  const execute = async (fn: (payload: P) => Promise<T>, payload: P): Promise<T | null> => {
    loading.value = true
    error.value = null
    try {
      data.value = await fn(payload)
      return data.value
    } catch (err: unknown) {
      error.value = err instanceof AppError ? err : AppError.fromUnknown(err)
      return null
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, execute }
}
