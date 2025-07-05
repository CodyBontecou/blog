import { defineConfig } from 'vitepress'
import path from 'path'
import { generateSitemap } from './buildEnd'
import { generateRSS } from './rss'

export default defineConfig({
    srcDir: './content',
    srcExclude: ['**/templates/**', '**/node_modules/**'],
    vite: {
        css: {
            postcss: './postcss.config.cjs',
        },
        resolve: {
            alias: {
                '~/lib/utils/cn': path.resolve(__dirname, '../lib/utils/cn.ts'),
                '~/composables': path.resolve(__dirname, '../composables'),
                '~': path.resolve(__dirname, '../'),
                '@': path.resolve(__dirname, '../'),
            },
        },
    },
    title: 'Cody Bontecou',
    description: 'Personal blog covering web development, Vue.js, TypeScript, and tech insights',

    // Site config
    cleanUrls: true,
    lastUpdated: true,
    ignoreDeadLinks: true,

    // Theme config
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'About', link: '/about' },
            { text: 'Projects', link: '/projects' },
            { text: 'Talks', link: '/talks' },
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/codybontecou' },
        ],

        footer: {
            message: 'Built with VitePress',
            copyright: 'Copyright © 2025 Cody Bontecou',
        },
    },

    // Build config for static generation
    // outDir: 'dist',
    base: '/',

    // Markdown config
    markdown: {
        theme: 'github-dark',
        lineNumbers: false,
        anchor: {
            permalink: false,
        },
    },

    // Head config for SEO
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }],
        [
            'link',
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                href: '/favicon-16x16.png',
            },
        ],
        [
            'link',
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                href: '/favicon-32x32.png',
            },
        ],
        [
            'link',
            {
                rel: 'apple-touch-icon',
                sizes: '180x180',
                href: '/apple-touch-icon.png',
            },
        ],
        [
            'link',
            {
                rel: 'alternate',
                type: 'application/rss+xml',
                title: 'Cody Bontecou RSS Feed',
                href: '/rss.xml',
            },
        ],
        ['meta', { name: 'author', content: 'Cody Bontecou' }],
        ['meta', { name: 'keywords', content: 'web development, Vue.js, TypeScript, JavaScript, frontend, blog' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:locale', content: 'en_US' }],
        ['meta', { property: 'og:site_name', content: 'Cody Bontecou' }],
        ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
        ['meta', { name: 'twitter:site', content: '@codybontecou' }],
        ['meta', { name: 'twitter:creator', content: '@codybontecou' }],
        ['meta', { name: 'theme-color', content: '#ffffff' }],
        ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-3NM0E524EK' }],
        ['script', {}, `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3NM0E524EK');
        `],
    ],

    // Build hooks for SEO
    buildEnd: async (siteConfig) => {
        await generateSitemap(siteConfig)
        await generateRSS(siteConfig)
    },

    // Transform head for structured data
    transformHead: ({ pageData }) => {
        const head = []
        
        // Add structured data for blog posts
        if (pageData.frontmatter.date && pageData.frontmatter.title) {
            const structuredData = {
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                headline: pageData.frontmatter.title,
                description: pageData.frontmatter.description || pageData.description,
                author: {
                    '@type': 'Person',
                    name: 'Cody Bontecou',
                    url: 'https://codybontecou.com/about'
                },
                datePublished: new Date(pageData.frontmatter.date).toISOString(),
                url: `https://codybontecou.com${pageData.relativePath.replace(/\.md$/, '')}`,
                image: pageData.frontmatter.image || 'https://codybontecou.com/apple-touch-icon.png',
                publisher: {
                    '@type': 'Organization',
                    name: 'Cody Bontecou',
                    logo: {
                        '@type': 'ImageObject',
                        url: 'https://codybontecou.com/apple-touch-icon.png'
                    }
                }
            }
            
            head.push(['script', { type: 'application/ld+json' }, JSON.stringify(structuredData)] as [string, Record<string, string>, string])
        }
        
        return head
    },
})
