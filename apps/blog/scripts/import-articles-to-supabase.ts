import { createClient } from '@supabase/supabase-js'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local' })
config({ path: '.env' })

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function importArticles() {
  console.log('📚 Importing articles from content directory to Supabase...\n')

  const contentDir = join(process.cwd(), 'content')
  const files = readdirSync(contentDir).filter(f => f.endsWith('.md'))

  console.log(`Found ${files.length} markdown files\n`)

  let importedCount = 0
  let skippedCount = 0
  let errorCount = 0

  for (const filename of files) {
    try {
      // Skip special files
      if (filename === 'index.md' ||
          filename === 'about.md' ||
          filename === 'admin.md' ||
          filename === 'confirm.md' ||
          filename === 'README.md') {
        console.log(`⏭️  Skipped: ${filename} (special file)`)
        skippedCount++
        continue
      }

      // Read and parse markdown file
      const filePath = join(contentDir, filename)
      const fileContent = readFileSync(filePath, 'utf-8')
      const { data: frontmatter, content } = matter(fileContent)

      // Skip if it's a topic page
      if (filename.startsWith('[topic]') || filePath.includes('/topics/')) {
        console.log(`⏭️  Skipped: ${filename} (topic page)`)
        skippedCount++
        continue
      }

      // Generate slug from filename
      const slug = filename.replace(/\.md$/, '')

      // Check if article already exists
      const { data: existing } = await supabase
        .from('articles')
        .select('id')
        .eq('slug', slug)
        .single()

      if (existing) {
        console.log(`⏭️  Skipped: ${slug} (already exists in database)`)
        skippedCount++
        continue
      }

      // Prepare article data
      const article = {
        slug,
        title: frontmatter.title || slug,
        content: content.trim(),
        excerpt: frontmatter.excerpt || content.substring(0, 200).trim() + '...',
        topics: frontmatter.topics || [],
        draft: frontmatter.draft || false,
        ignore: frontmatter.ignore || false,
        published: !frontmatter.draft && !frontmatter.ignore,
        date: frontmatter.date || frontmatter.created_at || new Date().toISOString(),
        created_at: frontmatter.created_at || frontmatter.date || new Date().toISOString(),
        last_modified: frontmatter.last_modified || frontmatter.date || new Date().toISOString(),
        metadata: {
          original_filename: filename,
          imported_at: new Date().toISOString(),
        }
      }

      // Insert into Supabase
      const { error } = await supabase
        .from('articles')
        .insert(article)

      if (error) {
        throw error
      }

      const status = article.published ? '✅' : '📝'
      console.log(`${status} Imported: ${slug} (${article.title})`)
      importedCount++

    } catch (err) {
      console.error(`❌ Failed to import ${filename}:`, err)
      errorCount++
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log('📊 Import Summary:')
  console.log(`   ✅ Imported: ${importedCount}`)
  console.log(`   ⏭️  Skipped: ${skippedCount}`)
  console.log(`   ❌ Errors: ${errorCount}`)
  console.log(`   📁 Total files: ${files.length}`)
  console.log('='.repeat(60))

  if (importedCount > 0) {
    console.log('\n✨ Articles successfully imported to Supabase!')
    console.log('You can now view and edit them in the admin interface at /admin')
  }
}

importArticles().catch(console.error)
