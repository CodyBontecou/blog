<template>
    <div class="topic-sorted-list">
        <div
            v-for="({ topic, articles }, topicIndex) in sortedTopics"
            :key="topic"
            class="topic-section"
            :style="{ animationDelay: `${topicIndex * 0.1}s` }"
        >
            <!-- Topic Header - Clickable -->
            <button
                @click="navigateToTopic(topic)"
                class="topic-header"
            >
                <h2 class="topic-name">{{ capitalizeFirstLetter(topic) }}</h2>
                <span class="topic-count">{{ articles.length }}</span>
            </button>

            <!-- Articles List -->
            <ul class="topic-articles-list">
                <li
                    v-for="(article, index) in articles"
                    :key="article.url"
                    class="topic-article-item"
                    :style="{ animationDelay: `${(topicIndex * 0.1) + (index * 0.03)}s` }"
                >
                    <a :href="article.url" @click="handleArticleClick($event, article)" class="topic-article-link">
                        <div class="topic-article-date">
                            {{ formatPostDate(article.frontmatter?.date || article.frontmatter?.created_at) }}
                        </div>
                        <div class="topic-article-title">
                            {{ article.frontmatter?.title }}
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vitepress'
import { formatPostDate } from '../utils'

interface Article {
    url: string
    frontmatter: {
        title?: string
        created_at?: string
        date?: string
        draft?: boolean
        topics?: string[]
    }
}

interface Props {
    articles: Article[]
}

const props = defineProps<Props>()
const router = useRouter()

// Emit article click event
const emit = defineEmits<{
    articleClick: [article: Article]
}>()

// Handle article click - prevent default navigation and emit event
const handleArticleClick = (event: MouseEvent, article: Article) => {
    event.preventDefault()
    emit('articleClick', article)
}

// Navigate to topic page
const navigateToTopic = (topic: string) => {
    router.go(`/topics/${topic}`)
}

// Group articles by topic and sort
const sortedTopics = computed(() => {
    const topicMap = new Map<string, Article[]>()

    // Group articles by topic
    props.articles.forEach(article => {
        const topics = article.frontmatter?.topics || []
        topics.forEach(topic => {
            const normalizedTopic = topic.toLowerCase()
            if (!topicMap.has(normalizedTopic)) {
                topicMap.set(normalizedTopic, [])
            }
            topicMap.get(normalizedTopic)!.push(article)
        })
    })

    // Sort each topic's articles by date (newest first)
    topicMap.forEach((articles, topic) => {
        articles.sort((a, b) => {
            const dateA = new Date(a.frontmatter?.date || a.frontmatter?.created_at || '')
            const dateB = new Date(b.frontmatter?.date || b.frontmatter?.created_at || '')
            return dateB.getTime() - dateA.getTime()
        })
    })

    // Convert to array and sort topics alphabetically
    return Array.from(topicMap.entries())
        .map(([topic, articles]) => ({ topic, articles }))
        .sort((a, b) => a.topic.localeCompare(b.topic))
})

// Helper function to capitalize first letter
const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600&family=DM+Sans:wght@400;500&display=swap');

.topic-sorted-list {
    display: flex;
    flex-direction: column;
    gap: 48px;
}

.topic-section {
    opacity: 0;
    animation: fadeInSection 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeInSection {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.topic-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid #e0e0e0;
    background: none;
    border-top: none;
    border-left: none;
    border-right: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    transition: all 0.3s ease;
    padding-left: 0;
    padding-right: 0;
}

.topic-header:hover {
    border-bottom-color: #1a1a1a;
}

.topic-header:hover .topic-name {
    opacity: 0.6;
}

.topic-name {
    font-family: 'Crimson Pro', serif;
    font-size: 28px;
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: #1a1a1a;
    margin: 0;
    transition: opacity 0.3s ease;
}

.topic-count {
    font-size: 14px;
    font-weight: 500;
    color: #999;
    font-family: 'DM Sans', sans-serif;
    flex-shrink: 0;
}

.topic-articles-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.topic-article-item {
    opacity: 0;
    animation: fadeInArticle 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeInArticle {
    from {
        opacity: 0;
        transform: translateX(-10px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.topic-article-link {
    display: block;
    width: 100%;
    text-decoration: none;
    transition: opacity 0.3s ease;
    padding: 8px 0;
}

.topic-article-link:hover {
    opacity: 0.6;
}

.topic-article-date {
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #999;
    margin-bottom: 6px;
    font-family: 'DM Sans', sans-serif;
}

.topic-article-title {
    font-family: 'Crimson Pro', serif;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: -0.01em;
    color: #1a1a1a;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
    .topic-header {
        border-bottom-color: #333;
    }

    .topic-header:hover {
        border-bottom-color: #fafafa;
    }

    .topic-name {
        color: #fafafa;
    }

    .topic-count {
        color: #666;
    }

    .topic-article-date {
        color: #666;
    }

    .topic-article-title {
        color: #fafafa;
    }
}

/* Mobile adjustments */
@media (max-width: 640px) {
    .topic-sorted-list {
        gap: 36px;
    }

    .topic-name {
        font-size: 24px;
    }

    .topic-count {
        font-size: 13px;
    }

    .topic-article-title {
        font-size: 17px;
    }
}
</style>
