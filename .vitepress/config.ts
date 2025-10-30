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
    `],
    // Preload critical fonts
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    // Viewport meta for proper mobile rendering
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' }]
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
      // Reduce CSS and JS output
      cssMinify: true,
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
              if (id.includes('@vueuse')) {
                return 'vueuse'
              }
              return 'vendor'
            }
          },
          // Optimize chunk file names for better caching
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
        }
      },
      // Target modern browsers to reduce polyfills
      target: 'es2020',
      // Additional optimizations
      reportCompressedSize: false,
      sourcemap: false
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