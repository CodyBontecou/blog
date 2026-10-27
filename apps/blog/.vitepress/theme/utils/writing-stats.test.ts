import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
    countProseWords,
    filterWritingPosts,
    getTopicCounts,
    getWritingPosts,
} from './writing-stats.ts'

test('counts prose without code, image markup, comments, or link URLs', () => {
    assert.equal(
        countProseWords(`Hello [Vue developers](https://example.com).

\`\`\`ts
const hidden = 'do not count these words'
\`\`\`

~~~sh
also exclude this
~~~
![image alt](image.png)
<!-- hidden comment -->
Use \`ref\` today.`),
        6,
    )
    assert.equal(countProseWords(''), 0)
})

test('normalizes and deduplicates topics, handles undated posts, and sorts newest first', () => {
    const posts = getWritingPosts([
        {
            url: '/old',
            frontmatter: {
                title: 'Older',
                date: '2020-12-31',
                topics: ['Vue', 'vue', ' AI '],
            },
            wordCount: 42,
        },
        {
            url: '/new',
            frontmatter: {
                title: 'Newer',
                created_at: '2022-01-01T00:00',
                topics: ['vue'],
            },
            wordCount: 18,
        },
        { url: '/undated', frontmatter: { title: 'Undated', date: 'invalid' } },
        { url: '/untitled', frontmatter: {} },
    ])
    assert.deepEqual(
        posts.map((post) => post.url),
        ['/new', '/old', '/undated'],
    )
    assert.equal(posts[0].date, '2022-01-01T00:00:00.000Z')
    assert.deepEqual(posts[1].topics, ['vue', 'ai'])
    assert.equal(posts[2].year, null)
    assert.equal(
        posts.reduce((sum, post) => sum + post.words, 0),
        60,
    )
    assert.deepEqual(getTopicCounts(posts), [
        { topic: 'vue', count: 2 },
        { topic: 'ai', count: 1 },
    ])
    assert.deepEqual(
        filterWritingPosts(posts, '2020', 'ai').map((post) => post.url),
        ['/old'],
    )
    assert.equal(filterWritingPosts(posts, '2022', 'ai').length, 0)
    assert.equal(filterWritingPosts(posts, '', 'vue').length, 2)
    assert.equal(filterWritingPosts(posts, 'undated', '').length, 1)
    assert.equal(filterWritingPosts(posts, '', '').length, 3)
})
