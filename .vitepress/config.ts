import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import { apiPlugin } from './vite-plugin-api'

export default defineConfig({
  title: 'Blog',
  description: 'A blog built with VitePress',
  srcDir: 'content',
  cleanUrls: true,
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