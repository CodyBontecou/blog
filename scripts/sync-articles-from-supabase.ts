import { createClient } from '@supabase/supabase-js'
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function syncArticles() {
  console.log('🔄 Syncing articles from Supabase to markdown files...\n')

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
      console.log('No published articles to sync')
      return
    }

    console.log(`Found ${articles.length} published articles\n`)

    // Ensure content directory exists
    const contentDir = join(process.cwd(), 'content')
    mkdirSync(contentDir, { recursive: true })

    let syncedCount = 0
    for (const article of articles) {
      try {
        // Build frontmatter
        const frontmatter = [
          '---',
          `title: ${article.title}`,
          `draft: ${article.draft}`,
          `ignore: ${article.ignore}`,
        ]

        if (article.topics && article.topics.length > 0) {
          frontmatter.push('topics:')
          article.topics.forEach((topic: string) => {
            frontmatter.push(`  - ${topic}`)
          })
        }

        frontmatter.push(
          `date: ${new Date(article.date).toISOString()}`,
          `created_at: ${new Date(article.created_at).toISOString()}`,
          `last_modified: ${new Date(article.last_modified).toISOString()}`,
          '---',
          ''
        )

        const content = frontmatter.join('\n') + article.content

        // Write to file
        const filePath = join(contentDir, `${article.slug}.md`)
        writeFileSync(filePath, content, 'utf-8')

        console.log(`✓ Synced: ${article.slug}.md (${article.title})`)
        syncedCount++
      } catch (err) {
        console.error(`✗ Failed to sync ${article.slug}:`, err)
      }
    }

    console.log(`\n✨ Successfully synced ${syncedCount} of ${articles.length} articles`)
  } catch (error) {
    console.error('Sync error:', error)
    process.exit(1)
  }
}

syncArticles()
