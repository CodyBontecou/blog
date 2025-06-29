import { createContentLoader } from 'vitepress'

export default createContentLoader('blog/*.md', {
  excerpt: true,
  transform(rawData) {
    return rawData
      .filter(({ frontmatter }) => !frontmatter.draft)
      .sort((a, b) => {
        const dateA = new Date(a.frontmatter.created_at || a.frontmatter.date || '')
        const dateB = new Date(b.frontmatter.created_at || b.frontmatter.date || '')
        return dateB.getTime() - dateA.getTime()
      })
  }
})