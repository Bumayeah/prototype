import { ref } from 'vue'
import { defineStore } from 'pinia'
import { AppError } from '@/utils/AppError'

export const useErrorStore = defineStore('error', () => {
  const error = ref<AppError | null>(null)

  function set(err: unknown) {
    error.value = err instanceof AppError ? err : AppError.fromUnknown(err)
  }

  function clear() {
    error.value = null
  }

  return { error, set, clear }
})
