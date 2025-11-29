// Export a getter function that uses the Nuxt Supabase client
// This works around the limitation of not being able to use composables at module level
export const supabase = new Proxy({} as any, {
  get(_target, prop) {
    // Access the Nuxt Supabase client - this will be available via the @nuxtjs/supabase module
    const client = useSupabaseClient()
    return client[prop as keyof typeof client]
  }
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
