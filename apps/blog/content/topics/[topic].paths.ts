import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'
import glob from 'fast-glob'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default {
  async paths() {
    // Find all markdown files in the content directory
    const contentDir = path.resolve(__dirname, '..')
    const files = await glob('*.md', {
      cwd: contentDir,
      ignore: ['topics/**', 'node_modules/**']
    })

    // Extract all unique topics from blog posts
    const topicsSet = new Set<string>()

    for (const file of files) {
      const filePath = path.join(contentDir, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      const { data: frontmatter } = matter(content)

      // Skip non-blog posts
      if (frontmatter.draft ||
          frontmatter.ignore ||
          file.includes('README') ||
          file.includes('SEO_FIXES') ||
          file === 'index.md' ||
          file === 'about.md') {
        continue
      }

      // Extract topics from frontmatter
      const topics = frontmatter.topics
      if (Array.isArray(topics)) {
        topics.forEach(topic => {
          if (typeof topic === 'string') {
            // Normalize to lowercase to avoid duplicates
            topicsSet.add(topic.toLowerCase())
          }
        })
      }
    }

    // Convert to array and sort alphabetically
    const topics = Array.from(topicsSet).sort()

    // Filter out any invalid topics (empty strings, etc.)
    const validTopics = topics.filter(topic => topic && topic.trim().length > 0)

    return validTopics.map(topic => ({
      params: { topic }
    }))
  }
}
