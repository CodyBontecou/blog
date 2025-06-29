import { defineConfig } from 'vitepress'

export default defineConfig({
  srcExclude: ['**/templates/**', '**/node_modules/**'],
  vite: {
    css: {
      postcss: './postcss.config.cjs'
    }
  },
  title: 'Cody Bontecou',
  description: 'Personal blog and portfolio',
  
  // Site config
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,
  
  // Theme config
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog' },
      { text: 'About', link: '/about' },
      { text: 'Projects', link: '/projects' },
      { text: 'Talks', link: '/talks' }
    ],
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/codybontecou' }
    ],
    
    footer: {
      message: 'Built with VitePress',
      copyright: 'Copyright © 2024 Cody Bontecou'
    }
  },
  
  // Build config for static generation
  outDir: 'dist',
  base: '/',
  
  // Markdown config
  markdown: {
    theme: 'github-dark',
    lineNumbers: true
  },
  
  // Head config for SEO
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: 'Cody Bontecou RSS Feed', href: '/rss.xml' }]
  ]
})