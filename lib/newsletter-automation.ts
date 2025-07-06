import { newsletterService } from './newsletter'
import { supabase } from './supabase'
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import type { ArticleData } from './email-templates'

interface BuildContext {
  contentDir: string
  lastBuildTime?: number
}

export class NewsletterAutomation {
  private contentDir: string
  private lastBuildFile: string

  constructor(contentDir: string = 'content') {
    this.contentDir = contentDir
    this.lastBuildFile = join(process.cwd(), '.newsletter-last-build')
  }

  /**
   * Check for new articles and send newsletters
   */
  async checkAndSendNewsletter(context?: BuildContext): Promise<void> {
    try {
      const lastBuildTime = this.getLastBuildTime()
      const newArticles = await this.getNewArticles(lastBuildTime)
      
      console.log(`Found ${newArticles.length} new articles since last build`)
      
      // Filter out articles that have already been sent
      const unsent = await this.filterUnsentArticles(newArticles)
      console.log(`${unsent.length} articles have not been sent as newsletters yet`)
      
      for (const article of unsent) {
        console.log(`Sending newsletter for: ${article.title}`)
        const result = await newsletterService.sendArticleNewsletter(article)
        
        if (result.success) {
          console.log(`✅ Newsletter sent for "${article.title}" to ${result.recipientCount} subscribers`)
        } else {
          console.error(`❌ Failed to send newsletter for "${article.title}": ${result.message}`)
        }
      }
      
      // Update last build time
      this.updateLastBuildTime()
      
    } catch (error) {
      console.error('Newsletter automation error:', error)
    }
  }

  /**
   * Filter out articles that have already been sent as newsletters
   */
  private async filterUnsentArticles(articles: ArticleData[]): Promise<ArticleData[]> {
    try {
      // Get all sent campaign slugs from database
      const { data: sentCampaigns, error } = await supabase
        .from('newsletter_campaigns')
        .select('article_slug')
      
      if (error) {
        console.error('Error fetching sent campaigns:', error)
        return articles // If we can't check, return all articles to be safe
      }
      
      const sentSlugs = new Set(sentCampaigns?.map(c => c.article_slug) || [])
      
      // Filter out articles that have already been sent
      return articles.filter(article => !sentSlugs.has(article.slug))
    } catch (error) {
      console.error('Error filtering unsent articles:', error)
      return articles
    }
  }

  /**
   * Get articles that were created or modified since last build
   */
  private async getNewArticles(lastBuildTime: number): Promise<ArticleData[]> {
    const articles: ArticleData[] = []
    
    try {
      const files = this.getAllMarkdownFiles(this.contentDir)
      
      for (const filePath of files) {
        const stats = statSync(filePath)
        const modifiedTime = stats.mtime.getTime()
        
        // Check if file was modified since last build
        if (modifiedTime > lastBuildTime) {
          const article = await this.parseArticleFromFile(filePath)
          
          // Only include published articles (not drafts)
          if (article && !article.draft) {
            articles.push(article)
          }
        }
      }
    } catch (error) {
      console.error('Error getting new articles:', error)
    }
    
    return articles
  }

  /**
   * Parse article data from markdown file
   */
  private async parseArticleFromFile(filePath: string): Promise<ArticleData | null> {
    try {
      const content = readFileSync(filePath, 'utf-8')
      const { data: frontmatter, content: markdownContent } = matter(content)
      
      // Skip if draft or ignore flag is set
      if (frontmatter.draft || frontmatter.ignore) {
        return null
      }
      
      // Extract slug from file path
      const slug = filePath
        .replace(this.contentDir + '/', '')
        .replace(/\.md$/, '')
        .replace(/\\/g, '/')
      
      // Generate excerpt from content (first 200 characters)
      const excerpt = markdownContent
        .replace(/^#{1,6}\s+.*$/gm, '') // Remove headers
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove markdown links
        .replace(/[*_`]/g, '') // Remove markdown formatting
        .trim()
        .substring(0, 200)
        .replace(/\s+/g, ' ')
      
      return {
        title: frontmatter.title || 'Untitled',
        slug,
        content: markdownContent,
        excerpt: excerpt + (markdownContent.length > 200 ? '...' : ''),
        topics: frontmatter.topics || [],
        created_at: frontmatter.created_at || frontmatter.date || new Date().toISOString(),
        author: frontmatter.author,
        draft: frontmatter.draft || false
      }
    } catch (error) {
      console.error(`Error parsing article from ${filePath}:`, error)
      return null
    }
  }

  /**
   * Get all markdown files recursively
   */
  private getAllMarkdownFiles(dir: string): string[] {
    const files: string[] = []
    
    try {
      const entries = readdirSync(dir, { withFileTypes: true })
      
      for (const entry of entries) {
        const fullPath = join(dir, entry.name)
        
        if (entry.isDirectory()) {
          files.push(...this.getAllMarkdownFiles(fullPath))
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
          // Skip certain files
          if (
            !entry.name.startsWith('.') &&
            !entry.name.includes('.paths.') &&
            !entry.name.includes('index.md') &&
            !entry.name.includes('README.md')
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

  /**
   * Get last build time from file
   */
  private getLastBuildTime(): number {
    try {
      const timestamp = readFileSync(this.lastBuildFile, 'utf-8').trim()
      return parseInt(timestamp, 10) || 0
    } catch {
      return 0
    }
  }

  /**
   * Update last build time
   */
  private updateLastBuildTime(): void {
    try {
      const timestamp = Date.now().toString()
      writeFileSync(this.lastBuildFile, timestamp)
    } catch (error) {
      console.error('Error updating last build time:', error)
    }
  }

  /**
   * Send newsletter for a specific article (manual trigger)
   */
  async sendNewsletterForArticle(slug: string): Promise<{ success: boolean; message: string }> {
    try {
      const filePath = join(this.contentDir, `${slug}.md`)
      const article = await this.parseArticleFromFile(filePath)
      
      if (!article) {
        return { success: false, message: 'Article not found or is a draft' }
      }
      
      // Check if already sent
      const { data: existing, error } = await supabase
        .from('newsletter_campaigns')
        .select('*')
        .eq('article_slug', article.slug)
        .limit(1)
      
      if (existing && existing.length > 0) {
        return { 
          success: false, 
          message: `Newsletter for "${article.title}" was already sent on ${new Date(existing[0].sent_at).toLocaleDateString()}` 
        }
      }
      
      const result = await newsletterService.sendArticleNewsletter(article)
      return result
    } catch (error) {
      console.error('Manual newsletter send error:', error)
      return { success: false, message: 'Failed to send newsletter' }
    }
  }

  /**
   * Get newsletter stats
   */
  async getStats() {
    return await newsletterService.getStats()
  }
}

export const newsletterAutomation = new NewsletterAutomation()