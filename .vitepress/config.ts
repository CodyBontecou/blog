import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import { apiPlugin } from './vite-plugin-api'
import { generateSitemap, generateRSS } from './buildEnd'

export default defineConfig({
  title: 'Cody Bontecou - Software Engineer | Vue.js, Nuxt, AI & Web Development',
  description: 'Technical blog by Cody Bontecou covering Vue.js, Nuxt 3, AI integration, web development, and software engineering. Practical guides and tutorials.',
  srcDir: 'content',
  cleanUrls: true,
  head: [
    // Favicon
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],

    // SEO Meta Tags
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { name: 'author', content: 'Cody Bontecou' }],

    // Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Cody Bontecou' }],
    ['meta', { property: 'og:image', content: 'https://codybontecou.com/android-chrome-512x512.png' }],
    ['meta', { property: 'og:image:width', content: '512' }],
    ['meta', { property: 'og:image:height', content: '512' }],
    ['meta', { property: 'og:image:alt', content: 'Cody Bontecou - Software Engineer' }],

    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://codybontecou.com/android-chrome-512x512.png' }],
  ],
  markdown: {
    theme: {
      light: 'min-light',
      dark: 'min-dark'
    },
    lineNumbers: false
  },
  transformHead: ({ pageData }) => {
    const siteUrl = 'https://codybontecou.com'

    // Clean up the path for canonical URL
    let path = pageData.relativePath
      .replace(/\.md$/, '')
      .replace(/\/index$/, '')
      .replace(/^index$/, '')

    // Ensure path starts with / if not empty
    if (path && !path.startsWith('/')) {
      path = '/' + path
    }

    const canonicalUrl = `${siteUrl}${path || '/'}`
    const pageUrl = canonicalUrl

    // Get page title and description
    const pageTitle = pageData.frontmatter?.title || pageData.title || 'Cody Bontecou'
    const pageDescription = pageData.frontmatter?.description || pageData.description || 'Technical blog by Cody Bontecou covering Vue.js, Nuxt 3, AI integration, web development, and software engineering.'

    const head = [
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:url', content: pageUrl }],
      ['meta', { property: 'og:title', content: pageTitle }],
      ['meta', { property: 'og:description', content: pageDescription }],
      ['meta', { name: 'twitter:title', content: pageTitle }],
      ['meta', { name: 'twitter:description', content: pageDescription }],
    ]

    // Add structured data for blog posts
    if (pageData.frontmatter?.created_at || pageData.frontmatter?.date) {
      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': pageTitle,
        'description': pageDescription,
        'author': {
          '@type': 'Person',
          'name': 'Cody Bontecou',
          'url': 'https://codybontecou.com'
        },
        'datePublished': pageData.frontmatter.created_at || pageData.frontmatter.date,
        'dateModified': pageData.frontmatter.last_modified || pageData.lastUpdated || pageData.frontmatter.created_at || pageData.frontmatter.date,
        'url': pageUrl,
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': pageUrl
        }
      }

      head.push(['script', { type: 'application/ld+json' }, JSON.stringify(structuredData)])
    } else if (pageData.relativePath === 'index.md') {
      // Add structured data for homepage
      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        'name': 'Cody Bontecou\'s Blog',
        'description': 'Technical blog covering web development, Vue.js, Nuxt, AI, and software engineering',
        'url': 'https://codybontecou.com',
        'author': {
          '@type': 'Person',
          'name': 'Cody Bontecou',
          'url': 'https://codybontecou.com'
        }
      }

      head.push(['script', { type: 'application/ld+json' }, JSON.stringify(structuredData)])
    }

    return head
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