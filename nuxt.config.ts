// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: true,
    devtools: {
        enabled: true,
        timeline: {
            enabled: true,
        },
    },
    modules: [
        '@nuxt/content',
        '@nuxtjs/tailwindcss',
        'shadcn-nuxt',
        '@nuxtjs/i18n',
        '@nuxt/icon',
        '@nuxtjs/color-mode',
        ['nuxt-og-image', {
            debug: false,
            compatibility: {
                prerender: {
                    chromium: false
                }
            },
            defaults: {
                cacheMaxAgeSeconds: 60 * 60 * 24 * 7 // 1 week
            }
        }],
        'nuxt-gtag',
        // '@nuxt/image',
        // '@vueuse/nuxt',
    ],
    compatibilityDate: '2024-10-24',
    css: ['~/assets/css/main.css', '~/assets/css/tailwind.css'],
    content: {
        markdown: {
            anchorLinks: true,
        },
        highlight: {
            theme: 'github-dark', // You can use any Shiki theme (e.g., 'nord', 'monokai', 'dracula')
            preload: [
                'javascript',
                'python',
                'html',
                'css',
                'elixir',
                'scss',
                'sass',
                'toml',
            ], // Languages to preload
        },
        experimental: {
            clientDB: true
        }
    },
    i18n: {
        strategy: 'no_prefix',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'nuxt_i18n',
        },
        defaultLocale: 'eng_Latn',
        locales: [{ code: 'eng_Latn', title: 'English' }],
        vueI18n: './i18n.config.ts',
    },
    shadcn: {
        /**
         * Prefix for all the imported component
         */
        prefix: '',
        /**
         * Directory that the component lives in.
         * @default "./components/ui"
         */
        componentDir: './components/ui',
    },
    nitro: {
        preset: 'static',
        prerender: {
            routes: [
                '/sitemap.xml', 
                '/rss.xml', 
                '/'
            ],
            crawlLinks: true,
            ignore: [
                '/__og-image__/**',
                '/api/_content/**'
            ]
        },
        compressPublicAssets: false,
        minify: true,
        experimental: {
            wasm: true,
        },
        routeRules: {
            // Remove .html extensions - redirect to clean URLs
            '/**/*.html': { redirect: '/**', prerender: false },
            // Ensure dynamic topic routes are rendered on-demand
            '/topics/**': { prerender: false },
        },
    },

    // Performance optimizations
    experimental: {
        payloadExtraction: false,
    },


    site: {
        url: process.env.NUXT_PUBLIC_SITE_URL || 'https://codybontecou.com',
    },
    runtimeConfig: {
        MAILCHIMP_SECRET_KEY: process.env.MAILCHIMP_SECRET_KEY,
        MAILCHIMP_API_SERVER: process.env.MAILCHIMP_API_SERVER,
        MAILCHIMP_AUDIENCE_ID: process.env.MAILCHIMP_AUDIENCE_ID,
        public: {
            siteUrl:
                process.env.NUXT_PUBLIC_SITE_URL || 'https://codybontecou.com',
        },
    },
    gtag: {
        id: 'G-3NM0E524EK',
    },
    app: {
        head: {
            link: [
                {
                    rel: 'icon',
                    type: 'image/x-icon',
                    href: '/favicon.ico',
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '16x16',
                    href: '/favicon-16x16.png',
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '32x32',
                    href: '/favicon-32x32.png',
                },
                {
                    rel: 'apple-touch-icon',
                    sizes: '180x180',
                    href: '/apple-touch-icon.png',
                },
                {
                    rel: 'alternate',
                    type: 'application/rss+xml',
                    title: 'Cody Bontecou RSS Feed',
                    href: '/rss.xml',
                },
                {
                    rel: 'preconnect',
                    href: 'https://fonts.googleapis.com',
                },
                {
                    rel: 'dns-prefetch',
                    href: 'https://www.google-analytics.com',
                },
            ],
        },
    },
})
