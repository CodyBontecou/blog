<template>
    <div class="minimal-home">
        <div class="container">
            <div class="two-column-grid">
                <!-- Left Column -->
                <div class="left-column" :class="{ collapsed: isCollapsed }">
                    <!-- Collapsed Sidebar Icons -->
                    <div v-if="isCollapsed" class="collapsed-sidebar-content">
                        <button
                            @click="goHomeAndExpand"
                            class="sidebar-icon-btn home-btn"
                            :class="{ active: isHomePage }"
                            title="Home"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                <polyline points="9 22 9 12 15 12 15 22"/>
                            </svg>
                        </button>

                        <div class="sidebar-divider"></div>

                        <button
                            @click="navigateWithScroll('/', '.articles-container')"
                            class="sidebar-icon-btn"
                            :class="{ active: currentView === 'writing' && !isHomePage }"
                            title="Writing"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 20h9"/>
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                            </svg>
                        </button>
                        <button
                            @click="navigateWithScroll('/about', '.about-view')"
                            class="sidebar-icon-btn"
                            :class="{ active: currentView === 'about' }"
                            title="About"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M12 16v-4"/>
                                <path d="M12 8h.01"/>
                            </svg>
                        </button>
                        <button
                            @click="navigateWithScroll('/topics', '.topics-view')"
                            class="sidebar-icon-btn"
                            :class="{ active: currentView === 'topics' }"
                            title="Topics"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
                                <path d="M22 12A10 10 0 0 0 12 2v10z"/>
                            </svg>
                        </button>
                    </div>

                    <!-- Hero with inline navigation -->
                    <div v-else class="hero-section fade-in">
                        <div class="hero-header">
                            <h1 class="hero-name">Cody Bontecou</h1>
                            <!-- View Toggle - Now inline -->
                            <div class="toggle-section-inline">
                                <button
                                    @click="navigateWithScroll('/', '.articles-container')"
                                    :class="['toggle-btn', { active: currentView === 'writing' }]"
                                >
                                    Writing
                                </button>
                                <span class="toggle-divider">/</span>
                                <button
                                    @click="navigateWithScroll('/about', '.about-view')"
                                    :class="['toggle-btn', { active: currentView === 'about' }]"
                                >
                                    About
                                </button>
                                <span class="toggle-divider">/</span>
                                <button
                                    @click="navigateWithScroll('/topics', '.topics-view')"
                                    :class="['toggle-btn', { active: currentView === 'topics' }]"
                                >
                                    Topics
                                </button>
                            </div>
                        </div>

                        <!-- Tagline and Social Icons on same line -->
                        <div class="tagline-social-row">
                            <p class="hero-tagline">is enjoying life</p>
                            <div class="social-icons">
                                <a
                                    href="https://github.com/codybontecou"
                                    class="social-icon"
                                    target="_blank"
                                    rel="noopener"
                                    aria-label="GitHub"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                                    </svg>
                                </a>
                                <a
                                    href="https://www.youtube.com/@codybontecou"
                                    class="social-icon"
                                    target="_blank"
                                    rel="noopener"
                                    aria-label="YouTube"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                                    </svg>
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/cody-bontecou/"
                                    class="social-icon"
                                    target="_blank"
                                    rel="noopener"
                                    aria-label="LinkedIn"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                                        <rect x="2" y="9" width="4" height="12"/>
                                        <circle cx="4" cy="4" r="2"/>
                                    </svg>
                                </a>
                                <a
                                    href="https://x.com/isolatedtech"
                                    class="social-icon"
                                    target="_blank"
                                    rel="noopener"
                                    aria-label="X (Twitter)"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
                                        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Latest Article -->
                    <section
                        v-if="latestArticle"
                        class="latest-section fade-in"
                        style="animation-delay: 0.2s"
                    >
                        <div class="section-label">Latest</div>
                        <article class="latest-article">
                            <h2 class="latest-title">
                                <a :href="latestArticle.url">
                                    {{ latestArticle.frontmatter?.title }}
                                </a>
                            </h2>
                            <div class="latest-meta">
                                {{ formattedDate }} · {{ readingTime }} min
                            </div>
                            <p class="latest-excerpt">{{ excerpt }}</p>
                            <a :href="latestArticle.url" class="read-more">
                                Keep reading →
                            </a>
                        </article>
                    </section>

                    <!-- Newsletter -->
                    <section class="newsletter-section fade-in" style="animation-delay: 0.3s">
                        <NewsletterWrapper />
                    </section>
                </div>

                <!-- Right Column -->
                <div class="right-column">
                    <!-- Collapse Toggle Button -->
                    <button
                        @click="toggleSidebar"
                        class="sidebar-toggle"
                        :class="{ collapsed: isCollapsed }"
                        aria-label="Toggle sidebar"
                    >
                        <svg
                            v-if="!isCollapsed"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                        </svg>
                        <svg
                            v-else
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
                        </svg>
                    </button>

                    <!-- Article Detail View (when on an article page) -->
                    <div v-if="isArticlePage" class="article-detail-view fade-in" style="animation-delay: 0.5s">
                        <!-- Breadcrumb -->
                        <div class="topic-breadcrumb">
                            <button @click="goHome" class="breadcrumb-link">
                                Writing
                            </button>
                            <span class="breadcrumb-separator">→</span>
                            <span class="breadcrumb-current">{{ frontmatter.title }}</span>
                        </div>

                        <!-- Article Content -->
                        <article class="article-content">
                            <Content class="article-body" />
                        </article>
                    </div>

                    <!-- Writing View - Show Archive (when on home page) -->
                    <div v-else-if="currentView === 'writing'" class="articles-container fade-in" style="animation-delay: 0.5s">
                        <div class="section-label">Writing</div>
                        <ArticleList v-if="articles" :articles="articles" @article-click="handleArticleClick" />
                    </div>

                    <!-- About View - Show About Content -->
                    <div v-else-if="currentView === 'about'" class="about-view fade-in" style="animation-delay: 0.5s">
                        <div class="section-label">About</div>
                        <div class="about-content">
                            <p>
                                I'm a software engineer with a passion for building meaningful
                                products and sharing knowledge through writing.
                            </p>
                            <p>
                                My interests span across TypeScript, Vue.js, accessibility, AI,
                                and the evolving landscape of web development. I enjoy exploring
                                new technologies and documenting my learnings along the way.
                            </p>
                            <p>
                                When I'm not coding, you'll find me experimenting with new tools,
                                contributing to open source, or writing about the intersection of
                                technology and human experience.
                            </p>
                            <div class="connect-section">
                                <div class="connect-label">Connect</div>
                                <div class="connect-links">
                                    <a
                                        href="https://github.com/codybontecou"
                                        class="connect-link"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        GitHub →
                                    </a>
                                    <a
                                        href="https://www.youtube.com/@codybontecou"
                                        class="connect-link"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        YouTube →
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/cody-bontecou/"
                                        class="connect-link"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        LinkedIn →
                                    </a>
                                    <a
                                        href="https://x.com/isolatedtech"
                                        class="connect-link"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        X →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Topics View - Show Topics -->
                    <div v-else-if="currentView === 'topics'" class="topics-view fade-in" style="animation-delay: 0.5s">
                        <!-- Topic Detail View (when on a topic page) -->
                        <div v-if="isTopicPage">
                            <!-- Breadcrumb -->
                            <div class="topic-breadcrumb">
                                <button @click="router.go('/topics')" class="breadcrumb-link">
                                    Topics
                                </button>
                                <span class="breadcrumb-separator">→</span>
                                <span class="breadcrumb-current">{{ currentTopic }}</span>
                            </div>

                            <!-- Filtered Articles -->
                            <div class="topic-articles">
                                <ArticleList v-if="topicFilteredArticles" :articles="topicFilteredArticles" @article-click="handleArticleClick" />
                            </div>
                        </div>

                        <!-- Topics List (when no topic is selected) -->
                        <div v-else class="topics-simple-view">
                            <div class="section-label">Topics</div>
                            <div class="topics-simple-list">
                                <button
                                    v-for="({ topic, count }) in topicsWithCounts"
                                    :key="topic"
                                    @click="viewTopicArticles(topic)"
                                    class="topic-simple-item"
                                >
                                    <span class="topic-simple-count">{{ count }}</span>
                                    <h3 class="topic-simple-title">{{ capitalizeFirstLetter(topic) }}</h3>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Toaster />
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { useData, useRouter, Content } from 'vitepress'
import { data as posts } from '../posts.data'
import {
    getLatestPost,
    getTopicsWithCounts,
    formatDateWithMonth,
    calculateReadingTime,
} from '../utils'
import ArticleList from './ArticleListMinimal.vue'
import NewsletterWrapper from './NewsletterMinimal.vue'
import Toaster from '../../../components/ui/toast/Toaster.vue'

const { page, frontmatter } = useData()
const router = useRouter()

// Sidebar collapse state - initialize from URL param
const isCollapsed = ref(false)

// Initialize collapsed state from URL on mount
onMounted(() => {
    if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search)
        isCollapsed.value = urlParams.get('sidebar') === 'collapsed'
    }
})

const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value

    // Update URL parameter
    if (typeof window !== 'undefined') {
        const url = new URL(window.location.href)
        if (isCollapsed.value) {
            url.searchParams.set('sidebar', 'collapsed')
        } else {
            url.searchParams.delete('sidebar')
        }
        window.history.replaceState({}, '', url.toString())
    }
}

// Determine current view based on route
const currentPath = computed(() => page.value.relativePath)

const isHomePage = computed(() => currentPath.value === 'index.md')
const isAboutPage = computed(() => currentPath.value === 'about.md')
const isTopicsIndexPage = computed(() => currentPath.value === 'topics.md')
const isTopicPage = computed(() => currentPath.value.startsWith('topics/') && currentPath.value.endsWith('.md'))
const isArticlePage = computed(() => {
    return !isHomePage.value && !isAboutPage.value && !isTopicsIndexPage.value && !isTopicPage.value
})

// Get the current topic from the route
const currentTopic = computed(() => {
    if (isTopicPage.value) {
        return currentPath.value.replace('topics/', '').replace('.md', '')
    }
    return frontmatter.value.topic || null
})

// View state based on current route
const currentView = computed(() => {
    if (isAboutPage.value) return 'about'
    if (isTopicsIndexPage.value || isTopicPage.value) return 'topics'
    return 'writing'
})

// Selected topic for view is now derived from the route
const selectedTopicForView = computed(() => {
    if (isTopicPage.value) return currentTopic.value
    return null
})


// Filter posts
const allArticles = computed(() => {
    return posts
        .filter(post => !post.frontmatter?.draft)
        .sort((a, b) => {
            const dateA = new Date(a.frontmatter?.date || a.frontmatter?.created_at || '')
            const dateB = new Date(b.frontmatter?.date || b.frontmatter?.created_at || '')
            return dateB.getTime() - dateA.getTime()
        })
})

// All articles for the writing view
const articles = computed(() => allArticles.value)

// View articles for a specific topic
const viewTopicArticles = (topic: string) => {
    router.go(`/topics/${topic}`)
}

// Handle article click - navigate to article page
const handleArticleClick = (article: any, source: 'archive' | 'topic' = 'archive') => {
    router.go(article.url)
}

// Go back to home
const goHome = () => {
    router.go('/')
}

// Go home and expand sidebar
const goHomeAndExpand = () => {
    isCollapsed.value = false

    // Update URL parameter
    if (typeof window !== 'undefined') {
        const url = new URL(window.location.href)
        url.searchParams.delete('sidebar')
        window.history.replaceState({}, '', url.toString())
    }

    router.go('/')
}

// Helper to check if we're on mobile
const isMobile = () => {
    if (typeof window === 'undefined') return false
    return window.innerWidth <= 1024
}

// Scroll to section smoothly on mobile
const scrollToSection = (sectionClass: string) => {
    if (!isMobile()) return

    // Use nextTick to ensure DOM is updated after navigation
    setTimeout(() => {
        const section = document.querySelector(sectionClass)
        if (section) {
            const headerOffset = 48 // Adjust based on your header height
            const elementPosition = section.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })
        }
    }, 100) // Small delay to ensure content is rendered
}

// Navigate and scroll on mobile
const navigateWithScroll = (path: string, sectionClass: string) => {
    router.go(path)
    scrollToSection(sectionClass)
}

// Filtered articles for the selected topic in detail view
const topicFilteredArticles = computed(() => {
    if (!currentTopic.value) return []

    return allArticles.value.filter(article => {
        const articleTopics = article.frontmatter?.topics || []
        return articleTopics.some((topic: string) =>
            topic.toLowerCase() === currentTopic.value?.toLowerCase()
        )
    })
})

// Computed properties
const latestArticle = computed(() => getLatestPost(allArticles.value))
const topicsWithCounts = computed(() => getTopicsWithCounts(allArticles.value))

// Helper function to capitalize first letter
const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

const formattedDate = computed(() => {
    if (!latestArticle.value?.frontmatter?.date && !latestArticle.value?.frontmatter?.created_at)
        return ''
    return formatDateWithMonth(
        latestArticle.value.frontmatter.date || latestArticle.value.frontmatter.created_at
    )
})

const readingTime = computed(() => {
    if (!latestArticle.value) return 3
    const content = latestArticle.value.content || latestArticle.value.excerpt || ''
    if (!content) return 3

    const wordsPerMinute = 200
    const words = content.trim().split(/\s+/).filter(word => word.length > 0).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return minutes || 1
})

const excerpt = computed(() => {
    if (!latestArticle.value) return ''
    let content = latestArticle.value.excerpt || latestArticle.value.content || ''
    if (!content) {
        return 'Open-source AI is an exciting space. There is a lot of research and innovation is taking place here.'
    }

    const text = content
        .replace(/<[^>]*>/g, '')
        .replace(/\n/g, ' ')
        .replace(/#{1,6}\s+/g, '')
        .trim()

    return text.length > 400 ? text.substring(0, 400) + '...' : text
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@300;400;600&family=DM+Sans:wght@400;500&display=swap');

.minimal-home {
    min-height: 100vh;
    background: #fafafa;
    color: #1a1a1a;
    font-family: 'DM Sans', -apple-system, sans-serif;
}

.container {
    max-width: 100%;
    margin: 0;
    padding: 0;
}

.two-column-grid {
    display: flex;
    gap: 0;
    align-items: stretch;
    min-height: 100vh;
}

@media (max-width: 1024px) {
    .two-column-grid {
        flex-direction: column;
        gap: 60px;
    }
}

/* Animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in {
    animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

/* Sidebar Toggle Button */
.sidebar-toggle {
    position: absolute;
    top: 48px;
    right: 32px;
    background: none;
    border: none;
    padding: 4px;
    cursor: pointer;
    color: #ccc;
    transition: color 0.3s ease;
    z-index: 10;
}

.sidebar-toggle:hover {
    color: #1a1a1a;
}

@media (max-width: 1024px) {
    .sidebar-toggle {
        display: none;
    }
}

/* Left Column */
.left-column {
    position: fixed;
    left: 0;
    top: 0;
    width: 50%;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    border-right: 1px solid #e0e0e0;
    padding: 40px 60px 40px 32px;
    background: #fafafa;
    display: flex;
    flex-direction: column;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Collapsed Left Column */
.left-column.collapsed {
    width: 80px;
    padding: 24px 16px;
    align-items: center;
    overflow: hidden;
}

/* Hide all non-collapsed content when collapsed */
.left-column.collapsed .hero-section,
.left-column.collapsed .latest-section,
.left-column.collapsed .newsletter-section {
    display: none;
}

/* Custom scrollbar for left column */
.left-column::-webkit-scrollbar {
    width: 6px;
}

.left-column::-webkit-scrollbar-track {
    background: transparent;
}

.left-column::-webkit-scrollbar-thumb {
    background: #e0e0e0;
    border-radius: 3px;
}

.left-column::-webkit-scrollbar-thumb:hover {
    background: #ccc;
}

@media (max-width: 1024px) {
    .left-column {
        position: relative;
        width: 100%;
        height: auto;
        border-right: none;
        padding-right: 32px;
        border-bottom: 1px solid #e0e0e0;
        padding-bottom: 60px;
    }
}

/* Hero */
.hero-section {
    margin-bottom: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid #e0e0e0;
    flex-shrink: 0;
}

.hero-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 12px;
}

.hero-name {
    font-family: 'Crimson Pro', serif;
    font-size: 42px;
    font-weight: 600;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin: 0;
    color: #1a1a1a;
}

/* Tagline and Social Icons Row */
.tagline-social-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 12px;
    opacity: 0;
    animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
}

.hero-tagline {
    font-size: 18px;
    font-weight: 400;
    font-style: italic;
    color: #666;
    margin: 0;
}

/* Social Icons */
.social-icons {
    display: flex;
    align-items: center;
    gap: 16px;
}

.social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ccc;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    text-decoration: none;
    position: relative;
}

.social-icon svg {
    width: 16px;
    height: 16px;
    stroke-width: 1.5;
}

.social-icon:hover {
    color: #1a1a1a;
    transform: translateY(-2px);
}

.social-icon::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: 20px;
    height: 1px;
    background: #1a1a1a;
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.social-icon:hover::after {
    transform: translateX(-50%) scaleX(1);
}

/* Toggle - Inline version */
.toggle-section-inline {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
}

.toggle-btn {
    background: none;
    border: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 400;
    color: #999;
    cursor: pointer;
    padding: 0;
    transition: color 0.3s ease;
}

.toggle-btn:hover {
    color: #1a1a1a;
}

.toggle-btn.active {
    color: #1a1a1a;
    font-weight: 500;
}

.toggle-divider {
    color: #e0e0e0;
    font-size: 15px;
}

/* Section Labels */
.section-label {
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #999;
    margin-bottom: 16px;
}

/* Latest Section */
.latest-section {
    margin-bottom: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid #e0e0e0;
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
}

.latest-article {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
}

.latest-title {
    font-family: 'Crimson Pro', serif;
    font-size: 24px;
    font-weight: 600;
    line-height: 1.3;
    letter-spacing: -0.01em;
    margin: 0 0 8px 0;
    flex-shrink: 0;
}

.latest-title a {
    color: #1a1a1a;
    text-decoration: none;
    transition: opacity 0.3s ease;
}

.latest-title a:hover {
    opacity: 0.6;
}

.latest-meta {
    font-size: 13px;
    color: #999;
    margin-bottom: 12px;
    flex-shrink: 0;
}

.latest-excerpt {
    font-size: 14px;
    line-height: 1.6;
    color: #666;
    margin: 0 0 12px 0;
    flex: 1;
    overflow-y: auto;
}

.read-more {
    font-size: 14px;
    font-weight: 500;
    color: #1a1a1a;
    text-decoration: none;
    transition: opacity 0.3s ease;
    flex-shrink: 0;
}

.read-more:hover {
    opacity: 0.6;
}

/* Newsletter Section */
.newsletter-section {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    min-height: 0;
}

/* Topics View (in right column) */
.topics-view {
    max-width: 100%;
}

/* Topic Breadcrumb */
.topic-breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 32px;
    padding-bottom: 32px;
    border-bottom: 1px solid #e0e0e0;
}

.breadcrumb-link {
    background: none;
    border: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 400;
    color: #999;
    cursor: pointer;
    padding: 0;
    transition: color 0.3s ease;
}

.breadcrumb-link:hover {
    color: #1a1a1a;
}

.breadcrumb-separator {
    font-size: 13px;
    color: #e0e0e0;
}

.breadcrumb-current {
    font-size: 13px;
    font-weight: 500;
    color: #1a1a1a;
}

.topic-articles {
    /* Articles will be styled by ArticleList component */
}

.filter-info {
    font-size: 13px;
    color: #666;
    margin-bottom: 20px;
}

.clear-filter {
    background: none;
    border: none;
    font-size: 13px;
    color: #1a1a1a;
    text-decoration: underline;
    cursor: pointer;
    padding: 0;
    margin-left: 4px;
    transition: opacity 0.3s ease;
}

.clear-filter:hover {
    opacity: 0.6;
}

.single-topic-info {
    font-size: 13px;
    color: #666;
    margin-bottom: 20px;
    padding: 16px;
    border: 1px solid #e0e0e0;
}

.single-topic-info strong {
    color: #1a1a1a;
    font-weight: 500;
}

.topic-link {
    color: #1a1a1a;
    text-decoration: underline;
    transition: opacity 0.3s ease;
    margin-left: 4px;
}

.topic-link:hover {
    opacity: 0.6;
}

.topics-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
}

.topic-pill {
    background: transparent;
    border: 1px solid #e0e0e0;
    padding: 8px 16px;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    color: #666;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
}

.topic-pill:hover {
    background: #f5f5f5;
    border-color: #1a1a1a;
    color: #1a1a1a;
}

.topic-pill.selected {
    background: #1a1a1a;
    border-color: #1a1a1a;
    color: #fafafa;
}

.topic-count {
    opacity: 0.6;
    margin-left: 4px;
}

/* About View */
.about-view {
    max-width: 100%;
}

.about-content {
    font-size: 15px;
    line-height: 1.7;
    color: #666;
}

.about-content p {
    margin: 0 0 24px 0;
}

.connect-section {
    margin-top: 32px;
    padding-top: 32px;
    border-top: 1px solid #e0e0e0;
}

.connect-label {
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #999;
    margin-bottom: 16px;
}

.connect-links {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.connect-link {
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    color: #1a1a1a;
    text-decoration: none;
    transition: opacity 0.3s ease;
    width: fit-content;
}

.connect-link:hover {
    opacity: 0.6;
}

/* Collapsed Sidebar Content */
.collapsed-sidebar-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-top: 60px;
    width: 100%;
    align-items: center;
}

.sidebar-divider {
    width: 32px;
    height: 1px;
    background: #e0e0e0;
    margin: 8px 0;
}

.sidebar-icon-btn {
    width: 48px;
    height: 48px;
    background: transparent;
    border: none;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    color: #999;
    position: relative;
}

.sidebar-icon-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 12px;
    background: transparent;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-icon-btn:hover {
    color: #1a1a1a;
    transform: scale(1.05);
}

.sidebar-icon-btn:hover::before {
    background: rgba(26, 26, 26, 0.06);
}

.sidebar-icon-btn.active {
    color: #1a1a1a;
}

.sidebar-icon-btn.active::before {
    background: rgba(26, 26, 26, 0.08);
    box-shadow: 0 0 0 1px rgba(26, 26, 26, 0.1) inset;
}

.sidebar-icon-btn:active {
    transform: scale(0.95);
}

/* Right Column */
.right-column {
    position: relative;
    margin-left: 50%;
    width: 50%;
    min-height: 100vh;
    padding: 48px 32px 48px 60px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Adjust right column when sidebar is collapsed */
.left-column.collapsed ~ .right-column {
    margin-left: 80px;
    width: calc(100% - 80px);
}

@media (max-width: 1024px) {
    .right-column {
        margin-left: 0;
        width: 100%;
        padding-left: 32px;
    }
}

.articles-container {
    /* Styling handled by ArticleList component */
}

/* Article Detail View */
.article-detail-view {
    max-width: 100%;
}

.article-loading {
    font-size: 14px;
    color: #999;
    padding: 40px 0;
    text-align: center;
}

.article-content {
    max-width: 100%;
}

/* Article body inherits prose styling from the fetched content */
.article-body {
    font-size: 15px;
    line-height: 1.7;
    color: #1a1a1a;
}

/* Style the article elements */
.article-body :deep(h1) {
    font-family: 'Crimson Pro', serif;
    font-size: 32px;
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: #1a1a1a;
    margin: 0 0 16px 0;
}

.article-body :deep(h2) {
    font-family: 'Crimson Pro', serif;
    font-size: 24px;
    font-weight: 600;
    line-height: 1.3;
    color: #1a1a1a;
    margin: 40px 0 16px 0;
}

.article-body :deep(h3) {
    font-family: 'Crimson Pro', serif;
    font-size: 20px;
    font-weight: 600;
    line-height: 1.4;
    color: #1a1a1a;
    margin: 32px 0 12px 0;
}

.article-body :deep(p) {
    margin-bottom: 20px;
    line-height: 1.7;
    color: #666;
}

.article-body :deep(a) {
    color: #1a1a1a;
    text-decoration: underline;
    transition: opacity 0.3s ease;
}

.article-body :deep(a:hover) {
    opacity: 0.6;
}

.article-body :deep(ul),
.article-body :deep(ol) {
    margin-bottom: 20px;
    padding-left: 24px;
    color: #666;
}

.article-body :deep(li) {
    margin-bottom: 8px;
}

.article-body :deep(code) {
    font-family: 'Monaco', 'Courier New', monospace;
    font-size: 14px;
    background: #f5f5f5;
    padding: 2px 6px;
    border-radius: 3px;
    color: #1a1a1a;
}

.article-body :deep(pre) {
    background: #f5f5f5;
    padding: 16px;
    border-radius: 4px;
    overflow-x: auto;
    margin-bottom: 20px;
}

.article-body :deep(pre code) {
    background: none;
    padding: 0;
}

.article-body :deep(blockquote) {
    border-left: 3px solid #e0e0e0;
    padding-left: 20px;
    margin: 24px 0;
    color: #999;
    font-style: italic;
}

.article-body :deep(img) {
    max-width: 100%;
    height: auto;
    margin: 24px 0;
}

.article-body :deep(.text-gray-600) {
    color: #999;
    font-size: 13px;
}

/* Dark mode support (minimal changes) */
@media (prefers-color-scheme: dark) {
    .minimal-home {
        background: #1a1a1a;
        color: #fafafa;
    }

    .sidebar-toggle {
        color: #666;
    }

    .sidebar-toggle:hover {
        color: #fafafa;
    }

    .left-column {
        background: #1a1a1a;
    }

    .sidebar-divider {
        background: #333;
    }

    .sidebar-icon-btn {
        color: #666;
    }

    .sidebar-icon-btn:hover {
        color: #fafafa;
    }

    .sidebar-icon-btn:hover::before {
        background: rgba(250, 250, 250, 0.08);
    }

    .sidebar-icon-btn.active {
        color: #fafafa;
    }

    .sidebar-icon-btn.active::before {
        background: rgba(250, 250, 250, 0.1);
        box-shadow: 0 0 0 1px rgba(250, 250, 250, 0.15) inset;
    }

    .left-column::-webkit-scrollbar-thumb {
        background: #333;
    }

    .left-column::-webkit-scrollbar-thumb:hover {
        background: #444;
    }

    .hero-name,
    .toggle-btn.active,
    .latest-title a,
    .read-more,
    .clear-filter,
    .topic-link,
    .connect-link {
        color: #fafafa;
    }

    .hero-tagline,
    .latest-excerpt,
    .about-content,
    .topic-pill {
        color: #999;
    }

    .toggle-btn,
    .latest-meta,
    .filter-info,
    .single-topic-info,
    .section-label {
        color: #666;
    }

    .hero-section,
    .toggle-section,
    .latest-section,
    .newsletter-section,
    .left-column,
    .single-topic-info,
    .connect-section {
        border-color: #333;
    }

    .topic-pill {
        border-color: #333;
    }

    .topic-pill:hover {
        background: #2a2a2a;
        border-color: #fafafa;
        color: #fafafa;
    }

    .topic-pill.selected {
        background: #fafafa;
        border-color: #fafafa;
        color: #1a1a1a;
    }

    .breadcrumb-link {
        color: #666;
    }

    .breadcrumb-link:hover {
        color: #fafafa;
    }

    .breadcrumb-separator {
        color: #333;
    }

    .breadcrumb-current {
        color: #fafafa;
    }

    .article-loading {
        color: #666;
    }

    .article-body {
        color: #fafafa;
    }

    .article-body :deep(h1),
    .article-body :deep(h2),
    .article-body :deep(h3) {
        color: #fafafa;
    }

    .article-body :deep(p) {
        color: #999;
    }

    .article-body :deep(a) {
        color: #fafafa;
    }

    .article-body :deep(ul),
    .article-body :deep(ol) {
        color: #999;
    }

    .article-body :deep(code) {
        background: #2a2a2a;
        color: #fafafa;
    }

    .article-body :deep(pre) {
        background: #2a2a2a;
    }

    .article-body :deep(blockquote) {
        border-left-color: #333;
        color: #666;
    }

    .article-body :deep(.text-gray-600) {
        color: #666;
    }

    .social-icon {
        color: #666;
    }

    .social-icon:hover {
        color: #fafafa;
    }

    .social-icon::after {
        background: #fafafa;
    }
}

/* Topics Simple View */
.topics-simple-view {
    max-width: 100%;
}

.topics-simple-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.topic-simple-item {
    background: none;
    border: none;
    text-align: left;
    padding: 0;
    cursor: pointer;
    transition: opacity 0.3s ease;
    display: flex;
    align-items: baseline;
    gap: 12px;
}

.topic-simple-item:hover {
    opacity: 0.6;
}

.topic-simple-count {
    font-size: 13px;
    color: #999;
    font-weight: 400;
    min-width: 16px;
    flex-shrink: 0;
}

.topic-simple-title {
    font-family: 'Crimson Pro', serif;
    font-size: 20px;
    font-weight: 400;
    color: #1a1a1a;
    margin: 0;
    line-height: 1.4;
    letter-spacing: -0.01em;
}

@media (prefers-color-scheme: dark) {
    .topic-simple-title {
        color: #fafafa;
    }
}

@media (max-width: 640px) {
    .topics-simple-list {
        gap: 14px;
    }

    .hero-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
    }

    .hero-name {
        font-size: 32px;
    }

    .toggle-section-inline {
        width: 100%;
    }
}
</style>
