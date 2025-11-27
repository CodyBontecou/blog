<template>
    <ul class="minimal-article-list">
        <li
            v-for="(article, index) in filteredArticles"
            :key="article.frontmatter?.title || article.url"
            :class="['article-item', getArticleClasses(article.url)]"
            :style="{ animationDelay: `${index * 0.05}s` }"
        >
            <a :href="article.url" @click="handleClick($event, article)" class="article-link">
                <div class="article-date">
                    {{ formatPostDate(article.frontmatter?.created_at || article.frontmatter?.date) }}
                </div>
                <div class="article-title">
                    {{ article.frontmatter?.title }}
                </div>
            </a>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
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

// Emit article click event
const emit = defineEmits<{
    articleClick: [article: Article]
}>()

// Handle article click - prevent default navigation and emit event
const handleClick = (event: MouseEvent, article: Article) => {
    // Always prevent default to handle navigation in SPA mode
    event.preventDefault()
    emit('articleClick', article)
}

// Track previous article URLs to identify newly shown articles
const previousArticleUrls = ref<string[]>([])
const newlyShownArticles = ref<string[]>([])
const isInitialLoad = ref(true)

// Filter out articles without titles
const filteredArticles = computed(() => {
    return props.articles.filter(
        article => article.frontmatter?.title && article.frontmatter.title.trim() !== ''
    )
})

// Watch for changes in filtered articles
watch(
    () => props.articles,
    (newArticles, oldArticles) => {
        const currentUrls = newArticles.map(a => a.url)

        if (isInitialLoad.value) {
            previousArticleUrls.value = currentUrls
            isInitialLoad.value = false
            return
        }

        const previousUrls = previousArticleUrls.value
        const newUrls = currentUrls.filter(url => !previousUrls.includes(url))

        if (newUrls.length > 0) {
            newlyShownArticles.value = newUrls
            setTimeout(() => {
                newlyShownArticles.value = []
            }, 2000)
        }

        previousArticleUrls.value = currentUrls
    },
    { deep: true }
)

// Get CSS classes for an article
const getArticleClasses = (articleUrl: string) => {
    const isNewlyShown = newlyShownArticles.value.includes(articleUrl)
    return {
        highlighted: isNewlyShown,
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600&family=DM+Sans:wght@400&display=swap');

.minimal-article-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.article-item {
    margin-bottom: 24px;
    opacity: 0;
    animation: fadeInArticle 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeInArticle {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.article-item.highlighted {
    background: #f5f5f5;
    margin-left: -16px;
    margin-right: -16px;
    padding: 12px 16px;
    border-left: 2px solid #1a1a1a;
}

.article-link {
    display: block;
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    text-decoration: none;
    transition: opacity 0.3s ease;
}

.article-link:hover {
    opacity: 0.6;
}

.article-date {
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #999;
    margin-bottom: 8px;
    font-family: 'DM Sans', sans-serif;
}

.article-title {
    font-family: 'Crimson Pro', serif;
    font-size: 20px;
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: -0.01em;
    color: #1a1a1a;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
    .article-item.highlighted {
        background: #2a2a2a;
        border-left-color: #fafafa;
    }

    .article-date {
        color: #666;
    }

    .article-title {
        color: #fafafa;
    }
}
</style>
