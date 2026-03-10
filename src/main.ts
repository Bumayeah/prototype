import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './styles/main.css'
import App from './App.vue'
import router from './router'
import { AppError } from './utils/AppError'
import { useErrorStore } from './stores/errorStore'
import { logger } from './utils/logger'

import { mswReady } from './mocks/mswReady'

// Redirect to HTTPS in production (non-localhost)
if (
  !import.meta.env.DEV &&
  location.protocol === 'http:' &&
  !location.hostname.includes('localhost')
) {
  location.replace(`https:${location.href.substring(location.protocol.length)}`)
}

const app = createApp(App)

app.use(createPinia())

app.config.errorHandler = (err) => {
  const appError = err instanceof AppError ? err : AppError.fromUnknown(err)
  useErrorStore().set(appError)
  logger.error(appError.code, appError.message)
}
app.use(router)
app.mount('#app')

void mswReady
