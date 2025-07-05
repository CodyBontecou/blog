import { defineConfig } from 'vitepress'
import path from 'path'

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
    description: 'Personal blog and portfolio',

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
    ],
})
