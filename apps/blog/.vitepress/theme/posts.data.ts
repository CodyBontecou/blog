import { createContentLoader } from 'vitepress'
import matter from 'gray-matter'
import { countProseWords } from './utils/writing-stats'

export default createContentLoader('*.md', {
  excerpt: true,
  includeSrc: true,
  transform(rawData) {
    return rawData
      .filter(({ frontmatter, url }) => {
        // Exclude files that are not blog posts
        if (frontmatter.draft ||
            frontmatter.ignore ||
            url.includes('/topics') ||
            url === '/' ||
            url === '/about' ||
            url === '/README' ||
            url === '/SEO_FIXES') {
          return false
        }
        // Only include files that have blog post characteristics
        return frontmatter.title || frontmatter.date || frontmatter.created_at
      })
      .map(({ src, ...post }) => ({
        ...post,
        wordCount: countProseWords(matter(src || '').content),
      }))
      .sort((a, b) => {
        const dateA = new Date(a.frontmatter.date || a.frontmatter.created_at || '')
        const dateB = new Date(b.frontmatter.date || b.frontmatter.created_at || '')
        return dateB.getTime() - dateA.getTime()
      })
  }
})
