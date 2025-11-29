import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

export type Article = {
  id: string
  slug: string
  title: string
  content: string
  excerpt?: string
  topics: string[]
  draft: boolean
  ignore: boolean
  published: boolean
  date: string
  created_at: string
  last_modified: string
  author_id?: string
  metadata: Record<string, any>
}

export type ArticleRevision = {
  id: string
  article_id: string
  title: string
  content: string
  topics: string[]
  metadata: Record<string, any>
  revision_number: number
  created_at: string
  created_by?: string
}
