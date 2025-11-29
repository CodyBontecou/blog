import { createClient } from '@supabase/supabase-js'

// Create a browser-only Supabase client with localStorage
// This ensures PKCE works properly in production
export const createBrowserClient = () => {
  const config = useRuntimeConfig()

  return createClient(
    config.public.supabase.url,
    config.public.supabase.key,
    {
      auth: {
        flowType: 'pkce',
        autoRefreshToken: true,
        detectSessionInUrl: true,
        persistSession: true,
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
        storageKey: 'supabase.auth.token'
      }
    }
  )
}
