import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import { apiPlugin } from './vite-plugin-api'
import { generateSitemap, generateRSS } from './buildEnd'

export default defineConfig({
  title: 'Blog',
  description: 'A blog built with VitePress',
  srcDir: 'content',
  cleanUrls: true,
  appearance: false,
  markdown: {
    theme: 'github-light',
    lineNumbers: false
  },
  head: [
    // Inline critical CSS for above-the-fold content
    ['style', {}, `
      html,body{background:#fff;color:#000}
      body{max-width:650px;margin:50px auto;padding:0 20px;font-family:Times;font-size:16px;line-height:1.4}
      h1{font-weight:bold;margin:19.92px 0;font-size:24px;line-height:1.4}
      h2{font-weight:bold;margin:18.72px 0;font-size:18.72px;line-height:1.4}
      p{margin:16px 0}
      a{color:#0000EE;text-decoration:underline}
      a:visited{color:#551A8B}
    `]
  ],
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
    },
    build: {
      // Enable CSS code splitting for better caching
      cssCodeSplit: true,
      // Inline small assets to reduce requests
      assetsInlineLimit: 4096,
      // Use esbuild minification (faster and included by default)
      minify: 'esbuild',
      // Optimize chunk size
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          // Manual chunking for better code splitting
          manualChunks: (id) => {
            // Split vendor code into separate chunks
            if (id.includes('node_modules')) {
              if (id.includes('mermaid')) {
                return 'mermaid'
              }
              if (id.includes('vue')) {
                return 'vue'
              }
              return 'vendor'
            }
          }
        }
      }
    },
    // Tree-shake unused code
    optimizeDeps: {
      exclude: []
    },
    ssr: {
      noExternal: []
    }
  }
})