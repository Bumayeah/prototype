import { ref, computed, onUnmounted } from 'vue'

/**
 * Client-side rate limiter for auth forms.
 *
 * Tracks failed attempts and enforces a cooldown after `maxAttempts`.
 * This is a UX safeguard — the server must enforce its own rate limiting.
 */
export function useRateLimiter(maxAttempts = 5, cooldownSeconds = 30) {
  const attempts = ref(0)
  const lockedUntil = ref(0)
  let timer: ReturnType<typeof setInterval> | null = null

  const remainingSeconds = ref(0)

  function startCountdown() {
    timer = setInterval(() => {
      const diff = Math.ceil((lockedUntil.value - Date.now()) / 1000)
      if (diff <= 0) {
        remainingSeconds.value = 0
        if (timer) {
          clearInterval(timer)
          timer = null
        }
      } else {
        remainingSeconds.value = diff
      }
    }, 1000)
  }

  const isLocked = computed(() => remainingSeconds.value > 0)

  function recordAttempt() {
    attempts.value++
    if (attempts.value >= maxAttempts) {
      lockedUntil.value = Date.now() + cooldownSeconds * 1000
      remainingSeconds.value = cooldownSeconds
      attempts.value = 0
      startCountdown()
    }
  }

  function reset() {
    attempts.value = 0
    lockedUntil.value = 0
    remainingSeconds.value = 0
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  onUnmounted(() => {
    if (timer) clearInterval(timer)
  })

  return { isLocked, remainingSeconds, recordAttempt, reset }
}
