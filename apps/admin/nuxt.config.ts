// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase'
  ],

  supabase: {
    redirect: false
  },

  runtimeConfig: {
    // Private keys - only available server-side
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    resendApiKey: process.env.RESEND_API_KEY,

    // Public keys - available both client and server
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      fromEmail: process.env.FROM_EMAIL,
      siteUrl: process.env.SITE_URL,
    }
  },

  app: {
    head: {
      title: 'Admin Dashboard',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})
