import type { ParsedContent } from '@nuxt/content'

export const getLatestPost = (
    posts: ParsedContent[] | null
): ParsedContent | null => {
    if (posts && posts.length) return posts[0]
    return null
}
