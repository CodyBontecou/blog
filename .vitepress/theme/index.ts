import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import './style.css'

export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    // No client-side only initialization needed
    // VitePress handles routing and state management
  }
} satisfies Theme
