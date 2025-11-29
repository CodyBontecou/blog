export default defineNuxtPlugin(() => {
  const supabase = useSupabaseClient()

  // Ensure PKCE flow is properly configured for client-side
  if (process.client) {
    console.log('Supabase client initialized with PKCE flow')

    // Listen for storage events to debug cookie/storage issues
    supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change:', event, session?.user?.email || 'No user')

      if (event === 'SIGNED_OUT') {
        console.log('User signed out')
      } else if (event === 'SIGNED_IN') {
        console.log('User signed in:', session?.user?.email)
      }
    })
  }
})
