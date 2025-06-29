// Utility functions for VitePress theme

export const getLatestPost = (posts: any[] | null): any | null => {
    if (!posts || !posts.length) return null
    // Find first post that doesn't have draft: true
    return posts.find(post => !post.frontmatter?.draft) || null
}

export const getTopics = (posts: any[] | null) => {
    const allTopics = posts
        ?.flatMap(post => post.frontmatter?.topics || [])
        .filter(Boolean)
        .map(topic => topic.toLowerCase())

    return [...new Set(allTopics)].sort()
}

export const formatPostDate = (date: string) => {
    const d = new Date(date)
    return `${d.getFullYear()} · ${String(d.getMonth() + 1).padStart(2, '0')}`
}

export const formatDateWithMonth = (date: string) => {
    const d = new Date(date)
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December']
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

export const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.trim().split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
}

export const getFirstParagraphText = (content: string) => {
    // Extract first paragraph from markdown content
    const paragraphs = content.split('\n\n')
    const firstParagraph = paragraphs.find(p => p.trim() && !p.startsWith('#'))
    return firstParagraph?.replace(/[#*`]/g, '').trim().substring(0, 150) + '...' || ''
}

export const capitalizeFirstLetter = (string: string) => {
    if (string.length === 0) return '' // Handle empty string
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

export const getArticlesByTopic = (posts: any[], topic: string) => {
    if (!posts || !topic) return []
    
    const normalizedTopic = topic.toLowerCase()
    
    return posts.filter(post => {
        const topics = post.frontmatter?.topics || []
        return topics.some((t: string) => 
            t.toLowerCase() === normalizedTopic ||
            t === capitalizeFirstLetter(topic) ||
            t === topic
        )
    })
}

export const getTopicsWithCounts = (posts: any[]) => {
    if (!posts) return []
    
    const topicCounts = new Map<string, number>()
    
    posts.forEach(post => {
        if (post.frontmatter?.topics) {
            post.frontmatter.topics.forEach((topic: string) => {
                const normalizedTopic = topic.toLowerCase()
                topicCounts.set(normalizedTopic, (topicCounts.get(normalizedTopic) || 0) + 1)
            })
        }
    })
    
    // Convert to array and sort alphabetically
    return Array.from(topicCounts.entries())
        .map(([topic, count]) => ({ topic, count }))
        .sort((a, b) => a.topic.localeCompare(b.topic))
}