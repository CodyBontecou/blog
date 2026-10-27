export interface ArchivePost {
    url: string
    wordCount?: number
    frontmatter: {
        title?: string
        date?: string | Date
        created_at?: string | Date
        topics?: string[]
    }
}

export interface WritingPost {
    url: string
    title: string
    date: string | null
    year: number | null
    topics: string[]
    words: number
}

// Count prose, including inline code, but exclude code blocks and markup/URLs.
export function countProseWords(markdown: string): number {
    const prose = markdown
        .replace(/^\s*(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\s*\1\s*$/gm, '')
        .replace(/<!--[^]*?-->/g, '')
        .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/^\s*\[[^\]]+\]:.*$/gm, '')
        .replace(/<[^>]+>/g, '')
        .replace(/https?:\/\/\S+/g, '')
    return prose.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length || 0
}

export function getWritingPosts(posts: ArchivePost[]): WritingPost[] {
    return posts
        .filter((post) => post.frontmatter.title?.trim())
        .map((post) => {
            const rawDate = post.frontmatter.date || post.frontmatter.created_at
            // Frontmatter timestamps without an offset represent UTC, independent of the reader's timezone.
            const dateInput =
                typeof rawDate === 'string' &&
                /^\d{4}-\d{2}-\d{2}T[\d:.]+$/.test(rawDate)
                    ? `${rawDate}Z`
                    : rawDate
            const timestamp = dateInput ? new Date(dateInput).getTime() : NaN
            const date = Number.isFinite(timestamp)
                ? new Date(timestamp).toISOString()
                : null
            return {
                url: post.url,
                title: post.frontmatter.title!.trim(),
                date,
                year: date ? new Date(date).getUTCFullYear() : null,
                topics: [
                    ...new Set(
                        (post.frontmatter.topics || [])
                            .filter(
                                (topic): topic is string =>
                                    typeof topic === 'string' && !!topic.trim(),
                            )
                            .map((topic) => topic.trim().toLowerCase()),
                    ),
                ],
                words: post.wordCount || 0,
            }
        })
        .sort(
            (a, b) =>
                (b.date || '').localeCompare(a.date || '') ||
                a.title.localeCompare(b.title),
        )
}

export function getTopicCounts(posts: WritingPost[]) {
    const counts = new Map<string, number>()
    for (const post of posts) {
        for (const topic of post.topics)
            counts.set(topic, (counts.get(topic) || 0) + 1)
    }
    return [...counts]
        .map(([topic, count]) => ({ topic, count }))
        .sort((a, b) => b.count - a.count || a.topic.localeCompare(b.topic))
}

export function filterWritingPosts(
    posts: WritingPost[],
    year: string,
    topic: string,
) {
    return posts.filter(
        (post) =>
            (!year ||
                (year === 'undated'
                    ? post.year === null
                    : String(post.year) === year)) &&
            (!topic || post.topics.includes(topic)),
    )
}
