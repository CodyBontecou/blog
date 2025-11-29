import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get all published articles
    const { data: articles, error } = await supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .order('date', { ascending: false })

    if (error) {
      throw error
    }

    if (!articles || articles.length === 0) {
      return res.status(200).json({ count: 0, message: 'No published articles to sync' })
    }

    // Convert each article to markdown file
    let syncedCount = 0
    for (const article of articles) {
      const frontmatter = [
        '---',
        `title: ${article.title}`,
        `draft: ${article.draft}`,
        `ignore: ${article.ignore}`,
        article.topics.length > 0 ? `topics:\n${article.topics.map((t: string) => `  - ${t}`).join('\n')}` : '',
        `date: ${new Date(article.date).toISOString()}`,
        `created_at: ${new Date(article.created_at).toISOString()}`,
        `last_modified: ${new Date(article.last_modified).toISOString()}`,
        '---',
        '',
      ].filter(Boolean).join('\n')

      // In a real implementation, you would write to the file system
      // For Vercel serverless, we can't write to the file system directly
      // Instead, you might want to:
      // 1. Use GitHub API to commit files
      // 2. Trigger a webhook that runs a local script
      // 3. Use a CI/CD pipeline to sync

      // For now, we'll just return the count
      syncedCount++

      // Example of what you would do locally:
      // const filePath = join(process.cwd(), 'content', `${article.slug}.md`)
      // writeFileSync(filePath, content, 'utf-8')
    }

    return res.status(200).json({
      count: syncedCount,
      message: `Would sync ${syncedCount} articles (file system write not available in serverless)`,
      articles: articles.map(a => ({ slug: a.slug, title: a.title })),
    })
  } catch (error) {
    console.error('Sync error:', error)
    return res.status(500).json({ error: 'Failed to sync articles' })
  }
}
