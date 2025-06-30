import { defineConfig } from 'vitepress'
import path from 'path'

export default defineConfig({
    srcDir: 'blog',
    srcExclude: ['**/templates/**', '**/node_modules/**'],
    sitemap: {
        hostname: 'https://codybontecou.com'
    },
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
    outDir: '.vitepress/dist',
    base: '/',

    // Markdown config
    markdown: {
        theme: 'github-dark',
        lineNumbers: false,
        anchor: {
            permalink: true,
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
        ['meta', { name: 'keywords', content: 'web development, javascript, typescript, vue, nuxt, react, programming, software engineering, technical writing' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:locale', content: 'en_US' }],
        ['meta', { property: 'og:site_name', content: 'Cody Bontecou' }],
        ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
        ['meta', { name: 'twitter:site', content: '@codybontecou' }],
        ['meta', { name: 'twitter:creator', content: '@codybontecou' }],
        ['meta', { name: 'robots', content: 'index, follow' }],
        ['link', { rel: 'canonical', href: 'https://codybontecou.com' }],
        ['meta', { name: 'theme-color', content: '#ffffff' }],
        ['meta', { name: 'msapplication-TileColor', content: '#ffffff' }],
        ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
        ['link', { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' }],
    ],
})
