import RSS from 'rss'
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { globSync } from 'glob'
import matter from 'gray-matter'
import { readFileSync } from 'fs'

const hostname = 'https://codybontecou.com'

export const generateRSS = async (siteConfig: any) => {
  console.log('Generating RSS feed...')
  const feed = new RSS({
    title: 'Cody Bontecou',
    description: 'Personal blog covering web development, Vue.js, TypeScript, and tech insights',
    feed_url: `${hostname}/rss.xml`,
    site_url: hostname,
    language: 'en',
    image_url: `${hostname}/apple-touch-icon.png`,
    copyright: 'Copyright © 2025 Cody Bontecou',
    managingEditor: 'Cody Bontecou',
    webMaster: 'Cody Bontecou',
    ttl: 60
  })

  // Get all blog posts
  const contentDir = resolve(siteConfig.srcDir || './content')
  const markdownFiles = globSync('**/*.md', { 
    cwd: contentDir,
    ignore: ['**/templates/**', '**/node_modules/**', 'index.md', 'about.md', 'talks.md', '**/topics/**']
  })

  const posts = []
  
  for (const file of markdownFiles) {
    const filePath = resolve(contentDir, file)
    const content = readFileSync(filePath, 'utf-8')
    const { data, content: body } = matter(content)
    
    // Skip files without dates or marked as drafts
    if (!data.date || data.draft) continue
    
    const url = `${hostname}/${file.replace(/\.md$/, '')}`
    
    posts.push({
      title: data.title || file.replace(/\.md$/, '').replace(/-/g, ' '),
      description: data.description || body.slice(0, 200) + '...',
      url,
      date: new Date(data.date),
      categories: data.topics || [],
      author: 'Cody Bontecou'
    })
  }

  // Sort posts by date (newest first)
  posts.sort((a, b) => b.date.getTime() - a.date.getTime())

  // Add posts to feed (limit to 50 most recent)
  posts.slice(0, 50).forEach(post => {
    feed.item({
      title: post.title,
      description: post.description,
      url: post.url,
      date: post.date,
      categories: post.categories,
      author: post.author
    })
  })

  // Write RSS feed
  const outDir = siteConfig.outDir || './dist'
  const rssPath = resolve(outDir, 'rss.xml')
  writeFileSync(rssPath, feed.xml({ indent: true }))
  
  console.log(`RSS feed generated with ${posts.length} posts`)
}