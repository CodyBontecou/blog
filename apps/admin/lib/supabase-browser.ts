import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

// Singleton instance to prevent multiple clients
let browserClient: SupabaseClient | null = null

// Create a browser-only Supabase client with localStorage
// This ensures PKCE works properly in production
export const getBrowserClient = () => {
  // Return existing instance if already created
  if (browserClient) {
    return browserClient
  }

  const config = useRuntimeConfig()

  browserClient = createClient(
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

  console.log('🔧 Browser Supabase client created (singleton)')

  return browserClient
}
