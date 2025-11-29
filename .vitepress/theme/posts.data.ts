import { createContentLoader } from 'vitepress'

export default createContentLoader('*.md', {
  excerpt: true,
  transform(rawData) {
    console.log('Total markdown files found:', rawData.length)
    console.log('Sample URLs:', rawData.slice(0, 5).map(d => d.url))

    const filtered = rawData
      .filter(({ frontmatter, url }) => {
        // Exclude files that are not blog posts
        if (frontmatter.draft ||
            frontmatter.ignore ||
            url.includes('/topics') ||
            url === '/' ||
            url === '/about' ||
            url === '/README' ||
            url === '/SEO_FIXES' ||
            url.includes('/templates/') ||
            url.includes('/admin') ||
            url.includes('/courses')) {
          return false
        }
        // Only include files that have blog post characteristics
        return frontmatter.title || frontmatter.date || frontmatter.created_at
      })

    console.log('Filtered posts:', filtered.length)

    return filtered.sort((a, b) => {
        const dateA = new Date(a.frontmatter.date || a.frontmatter.created_at || '')
        const dateB = new Date(b.frontmatter.date || b.frontmatter.created_at || '')
        return dateB.getTime() - dateA.getTime()
      })
  }
})