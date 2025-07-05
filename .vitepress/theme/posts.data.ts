import { createContentLoader } from 'vitepress'

export default createContentLoader('*.md', {
  excerpt: true,
  transform(rawData) {
    return rawData
      .filter(({ frontmatter, url }) => {
        // Exclude files that are not blog posts
        if (frontmatter.draft || 
            frontmatter.ignore || 
            url.includes('/topics/') || 
            url === '/' || 
            url === '/about' || 
            url === '/README' || 
            url === '/SEO_FIXES') {
          return false
        }
        // Only include files that have blog post characteristics
        return frontmatter.title || frontmatter.date || frontmatter.created_at
      })
      .sort((a, b) => {
        const dateA = new Date(a.frontmatter.created_at || a.frontmatter.date || '')
        const dateB = new Date(b.frontmatter.created_at || b.frontmatter.date || '')
        return dateB.getTime() - dateA.getTime()
      })
  }
})