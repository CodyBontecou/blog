import { createWriteStream } from 'fs'
import { resolve } from 'path'
import { SitemapStream } from 'sitemap'
import { globSync } from 'glob'
import matter from 'gray-matter'
import { readFileSync } from 'fs'

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