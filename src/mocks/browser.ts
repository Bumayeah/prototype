import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

// its started in mswReady so it only run in development and will be picked up by the axios interceptor
