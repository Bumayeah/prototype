// This promise ensures that the MSW worker is initialized before the app uses it
export const mswReady: Promise<void> = (async () => {
  // Only start the worker in development mode
  if (import.meta.env.VITE_USE_MOCK) {
    // Dynamically import the worker to avoid loading it in production
    const { worker } = await import('./browser')

    // Start the service worker with configuration
    await worker.start({
      // Specify the service worker file URL
      serviceWorker: { url: import.meta.env.BASE_URL + 'mockServiceWorker.js' },

      // Handle requests that do not match any defined MSW handlers
      onUnhandledRequest: (req) => {
        // Convert the request URL string into a URL object
        const url = new URL(req.url)

        // Only log unhandled requests for API endpoints
        // This ignores requests for .vue files or other dev server assets
        if (url.pathname.startsWith('/api') || url.pathname.startsWith('/auth')) {
          console.warn(`[MSW] Unhandled API request to: ${req.url}`)
        }
      },
    })
  }
})()
