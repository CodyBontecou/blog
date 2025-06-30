<template>
    <div class="mx-auto max-w-7xl w-full py-16 px-4 sm:px-6 lg:px-8">
        <div class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <!-- Left Column -->
            <div class="max-w-lg mx-auto mb-16 lg:mb-0 lg:mx-0 lg:pr-4">
                <div class="">
                    <!-- Hero, description -->
                    <div class="mb-4">
                        <h1
                            class="mb-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
                        >
                            Cody Bontecou
                        </h1>
                        <p class="text-lg italic leading-8 text-gray-600">
                            is enjoying life 💭
                        </p>
                    </div>

                    <!-- Toggle Switch -->
                    <div class="mb-8 w-full">
                        <ToggleSwitch
                            v-model="isAboutView"
                            @update:modelValue="handleViewToggle"
                        />
                    </div>

                    <!-- Writing View Content -->
                    <div v-if="!isAboutView">
                        <!-- Latest -->
                        <section v-if="latestArticle" class="mb-16 w-full">
                            <h2 class="text-gray-600 mb-6">Latest</h2>
                            <article>
                                <h3 class="text-xl font-medium mb-2">
                                    <a
                                        :href="latestArticle.url"
                                        class="hover:opacity-75"
                                    >
                                        {{ latestArticle.frontmatter?.title }}
                                    </a>
                                </h3>
                                <div class="text-gray-600 mb-3">
                                    {{ formattedDate }} ·
                                    {{ readingTime }} minute read
                                </div>
                                <div class="text-gray-700 text-sm mb-4">
                                    {{ excerpt }}
                                </div>
                                <p class="text-gray-600">
                                    <a
                                        :href="latestArticle.url"
                                        class="text-gray-900 hover:opacity-75"
                                    >
                                        Keep reading
                                    </a>
                                </p>
                            </article>
                        </section>

                        <!-- Topics -->
                        <section
                            v-if="topicsWithCounts.length"
                            class="mb-16 w-full"
                            style="min-height: 0"
                        >
                            <h2 class="text-lg text-gray-600">Topics</h2>

                            <!-- Multiple topics info -->
                            <div
                                v-if="selectedTopics.length > 1 && hasUrlParams"
                                class="mt-4"
                            >
                                <p class="text-sm text-gray-600">
                                    Filtering by
                                    {{ selectedTopics.length }} topics.
                                    <button
                                        @click="clearAllTopics"
                                        class="underline hover:opacity-75"
                                    >
                                        Clear all filters
                                    </button>
                                </p>
                            </div>

                            <!-- Single topic suggestion -->
                            <div
                                v-if="selectedTopics.length === 1"
                                class="mt-4 mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg"
                            >
                                <p class="text-sm text-blue-800">
                                    📍 Viewing articles about
                                    <strong>{{ selectedTopics[0] }}</strong
                                    >.
                                    <a
                                        :href="`/topics/${selectedTopics[0]}/`"
                                        class="underline hover:opacity-75"
                                    >
                                        Visit the dedicated
                                        {{ selectedTopics[0] }} page
                                    </a>
                                    for better SEO and sharing.
                                </p>
                            </div>

                            <div class="mt-6 flex flex-wrap gap-2">
                                <button
                                    v-for="{ topic, count } in topicsWithCounts"
                                    :key="topic"
                                    type="button"
                                    @click="toggleTopic(topic, $event)"
                                    :class="[
                                        'inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors duration-200',
                                        selectedTopics.includes(topic)
                                            ? 'bg-gray-900 text-white'
                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700',
                                    ]"
                                >
                                    <span>{{ topic }}</span>
                                    <span
                                        :class="
                                            selectedTopics.includes(topic)
                                                ? 'text-gray-300'
                                                : 'text-gray-500'
                                        "
                                        >({{ count }})</span
                                    >
                                </button>
                            </div>
                        </section>
                    </div>

                    <!-- About View Content -->
                    <div v-else class="mb-16 w-full">
                        <section class="w-full">
                            <h2 class="text-lg text-gray-600 mb-6">About</h2>
                            <div class="prose prose-gray max-w-none">
                                <p class="text-gray-700 leading-relaxed mb-4">
                                    I'm a software engineer with a passion for
                                    building meaningful products and sharing
                                    knowledge through writing.
                                </p>

                                <p class="text-gray-700 leading-relaxed mb-4">
                                    My interests span across TypeScript, Vue.js,
                                    accessibility, AI, and the evolving
                                    landscape of web development. I enjoy
                                    exploring new technologies and documenting
                                    my learnings along the way.
                                </p>

                                <p class="text-gray-700 leading-relaxed mb-6">
                                    When I'm not coding, you'll find me
                                    experimenting with new tools, contributing
                                    to open source, or writing about the
                                    intersection of technology and human
                                    experience.
                                </p>

                                <div class="space-y-3">
                                    <h3 class="text-gray-900 font-medium">
                                        Connect
                                    </h3>
                                    <div class="flex flex-col space-y-2">
                                        <a
                                            href="https://github.com/codybontecou"
                                            class="text-blue-600 hover:underline flex items-center gap-2"
                                        >
                                            <span>GitHub</span>
                                            <svg
                                                class="w-4 h-4"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>
                                        </a>
                                        <a
                                            href="https://twitter.com/codybontecou"
                                            class="text-blue-600 hover:underline flex items-center gap-2"
                                        >
                                            <span>Twitter</span>
                                            <svg
                                                class="w-4 h-4"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <!-- Right Column -->
            <div class="max-w-lg mx-auto lg:mt-0 lg:pl-4">
                <div v-if="!isAboutView">
                    <h2 class="mb-6 text-lg text-gray-600">Writing</h2>
                    <ArticleList v-if="articles" :articles="articles" />
                </div>
            </div>
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
import ToggleSwitch from './ToggleSwitch.vue'

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

// Handle view toggle and update URL
const handleViewToggle = (newValue: boolean) => {
    const url = new URL(window.location.href)

    if (newValue) {
        // Set view to about
        url.searchParams.set('view', 'about')
    } else {
        // Remove view parameter (default to writing)
        url.searchParams.delete('view')
    }

    // Update URL without page reload
    window.history.pushState({}, '', url.toString())

    // Update view state
    isAboutView.value = newValue
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
    if (!latestArticle.value) return 3 // Default fallback like individual posts

    // Try to get full content for accurate reading time calculation
    const content =
        latestArticle.value.content || latestArticle.value.excerpt || ''

    if (!content) {
        return 3 // Same fallback as individual blog posts
    }

    // Use same calculation as individual blog posts (200 WPM)
    const wordsPerMinute = 200
    const words = content
        .trim()
        .split(/\s+/)
        .filter(word => word.length > 0).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return minutes || 1 // At least 1 minute
})

const excerpt = computed(() => {
    if (!latestArticle.value) return ''

    // First try to get excerpt, then fall back to content
    let content =
        latestArticle.value.excerpt || latestArticle.value.content || ''

    // If still no content, create a simple excerpt from the post
    if (!content) {
        // Return first paragraph from the markdown file
        return 'Open-source AI is an exciting space. There is a lot of research and innovation is taking place here.'
    }

    // Clean up the content
    const text = content
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/\n/g, ' ') // Replace newlines with spaces
        .replace(/#{1,6}\s+/g, '') // Remove markdown headers
        .trim()

    return text.length > 150 ? text.substring(0, 150) + '...' : text
})
</script>
