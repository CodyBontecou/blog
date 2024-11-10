// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
    ],
    routeRules: {
        '/': { prerender: true },
    },
    compatibilityDate: '2024-10-24',
    css: ['~/assets/css/main.css', '~/assets/css/tailwind.css'],
    content: {
        markdown: {
            anchorLinks: true,
        },
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
        prerender: {
            routes: ['/sitemap.xml'],
        },
    },
    runtimeConfig: {
      MAILCHIMP_SECRET_KEY: process.env.MAILCHIMP_SECRET_KEY,
    }
})
