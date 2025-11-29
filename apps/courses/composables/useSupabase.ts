import { createClient } from '@supabase/supabase-js'

export const useSupabase = () => {
  const config = useRuntimeConfig()

  const supabase = createClient(
    config.public.supabaseUrl as string,
    config.public.supabaseAnonKey as string
  )

  return { supabase }
}
