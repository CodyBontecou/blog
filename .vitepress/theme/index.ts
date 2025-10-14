import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import './style.css'

export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    if (typeof window !== 'undefined') {
      // Support back/forward cache (bfcache)
      window.addEventListener('pageshow', (event) => {
        // If page is restored from bfcache, re-initialize if needed
        if (event.persisted) {
          // Page was restored from bfcache
          // Vue's reactivity should automatically work, but we can
          // trigger any necessary re-initialization here
        }
      })

      // Clean up resources before page is cached
      window.addEventListener('pagehide', (event) => {
        // Don't do anything that would prevent bfcache
        // Just clean up if necessary
      })
    }
  }
} satisfies Theme
