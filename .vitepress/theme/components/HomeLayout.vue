<template>
    <div class="content-container">
        <div>
            <h1>Cody Bontecou</h1>
            <p>is enjoying life</p>
        </div>

        <div>
            <button @click="isAboutView = !isAboutView">
                {{ isAboutView ? 'Writing' : 'About' }}
            </button>
        </div>

        <!-- Writing View -->
        <div v-if="!isAboutView">
            <!-- Latest Article -->
            <section v-if="latestArticle">
                <h2>Latest</h2>
                <article class="article-item">
                    <div class="article-title">
                        <a :href="latestArticle.url">
                            {{ latestArticle.frontmatter?.title }}
                        </a>
                    </div>
                    <div class="article-meta">
                        {{ formattedDate }} · {{ readingTime }} minute read
                    </div>
                    <p>{{ excerpt }}</p>
                    <a :href="latestArticle.url">Keep reading</a>
                </article>
            </section>

            <!-- Topics -->
            <section v-if="topicsWithCounts.length">
                <h2>Topics</h2>

                <div v-if="selectedTopics.length > 1 && hasUrlParams">
                    <p>
                        Filtering by {{ selectedTopics.length }} topics.
                        <button @click="clearAllTopics">Clear all filters</button>
                    </p>
                </div>

                <div v-if="selectedTopics.length === 1">
                    <p>
                        Viewing articles about <strong>{{ selectedTopics[0] }}</strong>.
                        <a :href="`/topics/${selectedTopics[0]}/`">
                            Visit the dedicated {{ selectedTopics[0] }} page
                        </a>
                    </p>
                </div>

                <ul class="topic-list">
                    <li v-for="{ topic, count } in topicsWithCounts" :key="topic">
                        <button
                            type="button"
                            @click="toggleTopic(topic, $event)"
                            :class="['topic-tag', { active: selectedTopics.includes(topic) }]"
                        >
                            {{ topic }} ({{ count }})
                        </button>
                    </li>
                </ul>
            </section>

            <!-- Articles List -->
            <section>
                <h2>Writing</h2>
                <ArticleList v-if="articles" :articles="articles" />
            </section>
        </div>

        <!-- About View -->
        <div v-else>
            <section>
                <h2>About</h2>
                <p>
                    I'm a software engineer with a passion for building meaningful products and
                    sharing knowledge through writing.
                </p>
                <p>
                    My interests span across TypeScript, Vue.js, accessibility, AI, and the
                    evolving landscape of web development. I enjoy exploring new technologies and
                    documenting my learnings along the way.
                </p>
                <p>
                    When I'm not coding, you'll find me experimenting with new tools,
                    contributing to open source, or writing about the intersection of technology and
                    human experience.
                </p>
                <h3>Connect</h3>
                <ul>
                    <li>
                        <a href="https://github.com/codybontecou">GitHub</a>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { data as posts } from '../posts.data'
import {
    getLatestPost,
    getTopicsWithCounts,
    formatDateWithMonth,
    calculateReadingTime,
    getFirstParagraphText,
} from '../utils'
import ArticleList from './ArticleList.vue'

// View state
const isAboutView = ref(false)

// Topic filtering state
const defaultTopics = [
    'typescript',
    'a11y',
    'ai',
    'javascript',
    'vue',
    'blogging',
    'obsidian',
    'nuxt',
]
const selectedTopics = ref<string[]>([])
const hasUrlParams = ref(false)

// Initialize from URL and handle navigation
onMounted(() => {
    // Initialize view state from URL
    initializeViewFromUrl()

    // Initialize topic filters
    const urlParams = new URLSearchParams(window.location.search)
    const topicParams = urlParams.getAll('topic')
    if (topicParams.length > 0) {
        selectedTopics.value = topicParams
        hasUrlParams.value = true
    } else {
        selectedTopics.value = [...defaultTopics]
        hasUrlParams.value = false
    }

    // Listen for browser navigation events
    window.addEventListener('popstate', initializeViewFromUrl)
})

// Initialize view state from current URL
const initializeViewFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search)
    isAboutView.value = urlParams.get('view') === 'about'
}

// Filter out draft posts and sort by date
const allArticles = computed(() => {
    return posts
        .filter(post => !post.frontmatter?.draft)
        .sort((a, b) => {
            const dateA = new Date(
                a.frontmatter?.created_at || a.frontmatter?.date || ''
            )
            const dateB = new Date(
                b.frontmatter?.created_at || b.frontmatter?.date || ''
            )
            return dateB.getTime() - dateA.getTime()
        })
})

// Filtered articles based on selected topics
const articles = computed(() => {
    if (selectedTopics.value.length === 0) {
        return allArticles.value
    }

    return allArticles.value.filter(article => {
        const articleTopics = article.frontmatter?.topics || []
        return articleTopics.some((topic: string) =>
            selectedTopics.value.includes(topic.toLowerCase())
        )
    })
})

// Toggle topic selection and update URL
const toggleTopic = (topic: string, event: Event) => {
    event.preventDefault()

    const index = selectedTopics.value.indexOf(topic)
    if (index > -1) {
        selectedTopics.value.splice(index, 1)
    } else {
        selectedTopics.value.push(topic)
    }

    // Mark that we now have URL params from user interaction
    hasUrlParams.value = true

    // Update URL query parameters
    const url = new URL(window.location.href)
    // Clear existing topic parameters
    url.searchParams.delete('topic')
    // Add each selected topic as a separate parameter
    selectedTopics.value.forEach(topic => {
        url.searchParams.append('topic', topic)
    })

    window.history.replaceState({}, '', url.toString())

    // Update canonical URL for SEO
    updateCanonicalUrl()
}

// Update canonical URL based on selected topics
const updateCanonicalUrl = () => {
    if (typeof window === 'undefined') return

    let canonicalUrl = window.location.origin + '/'

    // If single topic is selected, point to the topic page
    if (selectedTopics.value.length === 1) {
        canonicalUrl = `${window.location.origin}/topics/${selectedTopics.value[0]}/`
    }

    // Update or create canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
        canonicalLink = document.createElement('link')
        canonicalLink.setAttribute('rel', 'canonical')
        document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', canonicalUrl)
}

// Clear all topic filters
const clearAllTopics = () => {
    selectedTopics.value = []
    const url = new URL(window.location.href)
    url.searchParams.delete('topic')
    window.history.replaceState({}, '', url.toString())
    updateCanonicalUrl()
}

const latestArticle = computed(() => getLatestPost(allArticles.value))
const topicsWithCounts = computed(() => getTopicsWithCounts(allArticles.value))

const formattedDate = computed(() => {
    if (
        !latestArticle.value?.frontmatter?.created_at &&
        !latestArticle.value?.frontmatter?.date
    )
        return ''
    return formatDateWithMonth(
        latestArticle.value.frontmatter.created_at ||
            latestArticle.value.frontmatter.date
    )
})

const readingTime = computed(() => {
    if (!latestArticle.value) return 3

    const content =
        latestArticle.value.content || latestArticle.value.excerpt || ''

    if (!content) {
        return 3
    }

    const wordsPerMinute = 200
    const words = content
        .trim()
        .split(/\s+/)
        .filter(word => word.length > 0).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return minutes || 1
})

const excerpt = computed(() => {
    if (!latestArticle.value) return ''

    let content =
        latestArticle.value.excerpt || latestArticle.value.content || ''

    if (!content) {
        return 'Open-source AI is an exciting space. There is a lot of research and innovation is taking place here.'
    }

    const text = content
        .replace(/<[^>]*>/g, '')
        .replace(/\n/g, ' ')
        .replace(/#{1,6}\s+/g, '')
        .trim()

    return text.length > 150 ? text.substring(0, 150) + '...' : text
})
</script>
