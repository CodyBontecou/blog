import { createWriteStream } from 'fs'
import { resolve } from 'path'
import { SitemapStream } from 'sitemap'
import { globSync } from 'glob'
import matter from 'gray-matter'
import { readFileSync, writeFileSync } from 'fs'
import RSS from 'rss'

const hostname = 'https://codybontecou.com'

export const generateSitemap = async (siteConfig: any) => {
  console.log('Generating sitemap...')
  const sitemap = new SitemapStream({ hostname })
  const outDir = siteConfig.outDir || './dist'
  console.log('Output directory:', outDir)
  const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'))
  
  sitemap.pipe(writeStream)

  // Add homepage
  sitemap.write({
    url: '/',
    changefreq: 'daily',
    priority: 1.0
  })

  // Add static pages
  const staticPages = ['/about', '/talks']
  staticPages.forEach(page => {
    sitemap.write({
      url: page,
      changefreq: 'monthly',
      priority: 0.8
    })
  })

  // Add blog posts
  const contentDir = resolve(siteConfig.srcDir || './content')
  const markdownFiles = globSync('**/*.md', { 
    cwd: contentDir,
    ignore: ['**/templates/**', '**/node_modules/**', 'index.md', 'about.md', 'talks.md']
  })

  for (const file of markdownFiles) {
    const filePath = resolve(contentDir, file)
    const content = readFileSync(filePath, 'utf-8')
    const { data } = matter(content)
    
    // Skip files without dates or marked as drafts
    if (!data.date || data.draft) continue
    
    const url = `/${file.replace(/\.md$/, '')}`
    
    sitemap.write({
      url,
      changefreq: 'weekly',
      priority: 0.6,
      lastmod: data.date
    })
  }

  sitemap.end()
  
  return new Promise((resolve, reject) => {
    writeStream.on('finish', resolve)
    writeStream.on('error', reject)
  })
}

export const generateRSS = async (siteConfig: any) => {
  console.log('Generating RSS feed...')
  const outDir = siteConfig.outDir || './dist'
  
  const feed = new RSS({
    title: 'Cody Bontecou\'s Blog',
    description: 'Technical writing about web development, software engineering, and emerging technologies',
    site_url: hostname,
    feed_url: `${hostname}/rss.xml`,
    language: 'en-US',
    pubDate: new Date(),
    ttl: 60,
  })

  // Get blog posts
  const contentDir = resolve(siteConfig.srcDir || './content')
  const markdownFiles = globSync('**/*.md', { 
    cwd: contentDir,
    ignore: ['**/templates/**', '**/node_modules/**', 'index.md', 'about.md', 'talks.md', '**/topics/**']
  })

  const posts = []
  
  for (const file of markdownFiles) {
    const filePath = resolve(contentDir, file)
    const content = readFileSync(filePath, 'utf-8')
    const { data, content: markdownContent } = matter(content)
    
    // Skip files without dates or marked as drafts
    if (!data.date || data.draft) continue
    
    const url = `${hostname}/${file.replace(/\.md$/, '')}`
    const title = data.title || file.replace(/\.md$/, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    const description = data.description || markdownContent.substring(0, 160).replace(/\n/g, ' ') + '...'
    
    posts.push({
      title,
      description,
      url,
      date: new Date(data.date),
      guid: url,
    })
  }

  // Sort posts by date (newest first) and limit to 20
  posts.sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 20)
    .forEach(post => feed.item(post))

  const rssXML = feed.xml()
  writeFileSync(resolve(outDir, 'rss.xml'), rssXML)
  
  console.log(`RSS feed generated with ${posts.length} posts`)
}