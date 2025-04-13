import type { ParsedContent } from '@nuxt/content'

export const getLatestPost = (
    posts: ParsedContent[] | null
): ParsedContent | null => {
    if (!posts || !posts.length) return null

    // Find first post that doesn't have draft: true
    return posts.find(post => !post.draft) || null
}
