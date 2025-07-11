import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import { apiPlugin } from './vite-plugin-api'
import { generateSitemap, generateRSS } from './buildEnd'

export default defineConfig({
  title: 'Blog',
  description: 'A blog built with VitePress',
  srcDir: 'content',
  cleanUrls: true,
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'material-theme-palenight'
    },
    lineNumbers: false
  },
  buildEnd: async (siteConfig) => {
    await Promise.all([
      generateSitemap(siteConfig),
      generateRSS(siteConfig)
    ])
  },
  vite: {
    plugins: [apiPlugin()],
    resolve: {
      extensions: ['.js', '.ts', '.vue', '.json'],
      alias: {
        '~': fileURLToPath(new URL('..', import.meta.url)),
        '@': fileURLToPath(new URL('..', import.meta.url))
      }
    }
  }
})