#!/usr/bin/env tsx

import { readdirSync, readFileSync, statSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { supabase } from '../lib/supabase'

interface ArticleData {
  title: string
  slug: string
  draft?: boolean
  date?: string
  created_at?: string
}

async function populateSentNewsletters() {
  console.log('🔄 Starting to populate newsletter_campaigns with existing blog posts...\n')
  
  const contentDir = join(process.cwd(), 'content')
  const articles: ArticleData[] = []
  
  // Get all markdown files
  function getAllMarkdownFiles(dir: string): string[] {
    const files: string[] = []
    
    try {
      const entries = readdirSync(dir, { withFileTypes: true })
      
      for (const entry of entries) {
        const fullPath = join(dir, entry.name)
        
        if (entry.isDirectory()) {
          files.push(...getAllMarkdownFiles(fullPath))
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
          // Skip certain files
          if (
            !entry.name.startsWith('.') &&
            !entry.name.includes('.paths.') &&
            !entry.name.includes('index.md') &&
            !entry.name.includes('README.md') &&
            !entry.name.includes('confirm.md') &&
            !entry.name.includes('unsubscribe.md')
          ) {
            files.push(fullPath)
          }
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${dir}:`, error)
    }
    
    return files
  }
  
  // Parse articles from files
  const files = getAllMarkdownFiles(contentDir)
  console.log(`📁 Found ${files.length} markdown files\n`)
  
  for (const filePath of files) {
    try {
      const content = readFileSync(filePath, 'utf-8')
      const { data: frontmatter } = matter(content)
      
      // Skip drafts or ignored articles
      if (frontmatter.draft || frontmatter.ignore) {
        console.log(`⏭️  Skipping draft/ignored: ${filePath}`)
        continue
      }
      
      // Extract slug from file path
      const slug = filePath
        .replace(contentDir + '/', '')
        .replace(/\.md$/, '')
        .replace(/\\/g, '/')
      
      articles.push({
        title: frontmatter.title || 'Untitled',
        slug,
        draft: frontmatter.draft || false,
        date: frontmatter.date || frontmatter.created_at,
        created_at: frontmatter.created_at || frontmatter.date
      })
      
      console.log(`✅ Found article: ${frontmatter.title || 'Untitled'} (${slug})`)
    } catch (error) {
      console.error(`❌ Error parsing ${filePath}:`, error)
    }
  }
  
  console.log(`\n📋 Total publishable articles found: ${articles.length}\n`)
  
  // Check which articles are already in the database
  const { data: existingCampaigns, error: fetchError } = await supabase
    .from('newsletter_campaigns')
    .select('article_slug')
  
  if (fetchError) {
    console.error('❌ Error fetching existing campaigns:', fetchError)
    process.exit(1)
  }
  
  const existingSlugs = new Set(existingCampaigns?.map(c => c.article_slug) || [])
  const articlesToAdd = articles.filter(article => !existingSlugs.has(article.slug))
  
  console.log(`📊 Already in database: ${existingSlugs.size}`)
  console.log(`📝 New articles to add: ${articlesToAdd.length}\n`)
  
  if (articlesToAdd.length === 0) {
    console.log('✨ All articles are already marked as sent!')
    process.exit(0)
  }
  
  // Insert articles as sent campaigns
  console.log('💾 Inserting articles into newsletter_campaigns...\n')
  
  for (const article of articlesToAdd) {
    try {
      const { error } = await supabase
        .from('newsletter_campaigns')
        .insert({
          article_slug: article.slug,
          article_title: article.title,
          subject: `📚 New Article: ${article.title}`,
          recipients_count: 0, // Mark as 0 since these weren't actually sent
          sent_at: article.date || article.created_at || new Date().toISOString()
        })
      
      if (error) {
        console.error(`❌ Error inserting ${article.slug}:`, error)
      } else {
        console.log(`✅ Marked as sent: ${article.title}`)
      }
    } catch (error) {
      console.error(`❌ Unexpected error for ${article.slug}:`, error)
    }
  }
  
  // Final stats
  const { count } = await supabase
    .from('newsletter_campaigns')
    .select('*', { count: 'exact', head: true })
  
  console.log('\n🎉 Done!')
  console.log(`📊 Total campaigns in database: ${count}`)
}

// Run the script
populateSentNewsletters().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})