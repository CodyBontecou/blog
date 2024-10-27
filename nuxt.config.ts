// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@nuxt/content', '@nuxtjs/tailwindcss', 'shadcn-nuxt'],

    routeRules: {
        '/': { prerender: true },
    },

    compatibilityDate: '2024-10-24',
    css: ['~/assets/css/main.css'],
    content: {
        markdown: {
            anchorLinks: true,
        },
        highlight: {
            theme: 'github-light',
        },
    },
})
