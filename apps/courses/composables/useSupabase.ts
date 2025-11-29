import { createClient } from '@supabase/supabase-js'

export const useSupabase = () => {
  const config = useRuntimeConfig()

  const supabase = createClient(
    config.public.supabaseUrl as string,
    config.public.supabaseAnonKey as string
  )

  const user = useState('supabase_user', () => null)

  // Initialize auth state
  if (process.client) {
    supabase.auth.getSession().then(({ data: { session } }) => {
      user.value = session?.user ?? null
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user ?? null
    })
  }

  return { supabase, user }
}
