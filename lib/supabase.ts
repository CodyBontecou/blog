import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { join } from 'path'

// Load environment variables if they haven't been loaded yet
if (!process.env.SUPABASE_URL && !process.env.VITE_SUPABASE_URL) {
  config({ path: join(process.cwd(), '.env.local') })
  config({ path: join(process.cwd(), '.env') })
}

let _supabase: ReturnType<typeof createClient> | null = null

function getSupabaseClient() {
  if (_supabase) return _supabase
  
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  
  // Use service role key for server operations, fallback to anon key
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 
                      process.env.SUPABASE_ANON_KEY || 
                      process.env.VITE_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables. Please set SUPABASE_URL and either SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY in your .env file.')
  }

  _supabase = createClient(supabaseUrl, supabaseKey)
  return _supabase
}

export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get(target, prop) {
    const client = getSupabaseClient()
    return client[prop as keyof typeof client]
  }
})

// Database types
export interface Subscriber {
  id: string
  email: string
  subscribed_at: string
  confirmed: boolean
  unsubscribe_token: string
  created_at: string
  updated_at: string
}

export interface NewsletterCampaign {
  id: string
  article_slug: string
  article_title: string
  subject: string
  sent_at: string
  recipients_count: number
  created_at: string
}