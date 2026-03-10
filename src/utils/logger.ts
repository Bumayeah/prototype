export const logger = {
  error(code: string, message: string, context?: unknown) {
    console.error(`[${code}]`, message, ...(context !== undefined ? [context] : []))
  },

  warn(message: string, context?: unknown) {
    console.warn(`[WARN]`, message, ...(context !== undefined ? [context] : []))
  },
}
