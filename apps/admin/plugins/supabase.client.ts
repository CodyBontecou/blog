// Disabled the Nuxt Supabase plugin to prevent multiple client instances
// We're using our own singleton browser client instead
export default defineNuxtPlugin(() => {
  console.log('⚠️  Nuxt Supabase plugin disabled - using custom browser client')
})
