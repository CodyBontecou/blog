<template>
  <div class="">
    <div class="mx-auto max-w-7xl w-full py-16 px-4 sm:px-6 lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        <!-- Left Column -->
        <div class="max-w-lg mx-auto mb-16 lg:mb-0 lg:mx-0 lg:pr-4">
          <div class="">
            <!-- Hero, description -->
            <div class="mb-4">
              <h1 class="mb-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Cody Bontecou
              </h1>
              <p class="text-lg italic leading-8 text-gray-600">
                is enjoying life 💭
              </p>
            </div>

            <!-- CTA, learn more -->
            <div class="mb-8 flex items-center gap-x-2.5 w-full">
              <a href="/">
                <Button>Writing</Button>
              </a>
              <a href="/about">
                <Button variant="outline">About</Button>
              </a>
            </div>

            <!-- Latest -->
            <section v-if="latestArticle" class="mb-16 w-full">
              <h2 class="text-gray-600 mb-6">Latest</h2>
              <article>
                <h3 class="text-xl font-medium mb-2">
                  <a :href="latestArticle.url" class="hover:opacity-75">
                    {{ latestArticle.frontmatter?.title }}
                  </a>
                </h3>
                <div class="text-gray-600 mb-3">
                  {{ formattedDate }} · {{ readingTime }} minute read
                </div>
                <div class="text-gray-700 text-sm mb-4">
                  {{ excerpt }}
                </div>
                <p class="text-gray-600">
                  <a :href="latestArticle.url" class="text-gray-900 hover:opacity-75">
                    Keep reading
                  </a>
                </p>
              </article>
            </section>

            <!-- Topics -->
            <section v-if="topicsWithCounts.length" class="mb-16 w-full" style="min-height: 0">
              <h2 class="text-lg text-gray-600">Topics</h2>
              
              <!-- Multiple topics info -->
              <div v-if="selectedTopics.length > 1 && hasUrlParams" class="mt-4">
                <p class="text-sm text-gray-600">
                  Filtering by {{ selectedTopics.length }} topics. 
                  <button @click="clearAllTopics" class="underline hover:opacity-75">
                    Clear all filters
                  </button>
                </p>
              </div>
              
              <!-- Single topic suggestion -->
              <div v-if="selectedTopics.length === 1" class="mt-4 mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p class="text-sm text-blue-800">
                  📍 Viewing articles about <strong>{{ selectedTopics[0] }}</strong>. 
                  <a :href="`/topics/${selectedTopics[0]}/`" class="underline hover:opacity-75">
                    Visit the dedicated {{ selectedTopics[0] }} page
                  </a> for better SEO and sharing.
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
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  ]"
                >
                  <span>{{ topic }}</span>
                  <span :class="selectedTopics.includes(topic) ? 'text-gray-300' : 'text-gray-500'">({{ count }})</span>
                </button>
              </div>
            </section>
          </div>
        </div>

        <!-- Right Column -->
        <div class="max-w-lg mx-auto lg:mt-0 lg:pl-4">
          <div class="">
            <h2 class="mb-6 text-lg text-gray-600">Writing</h2>
            <ArticleList v-if="articles" :articles="articles" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { data as posts } from '../posts.data'
import { getLatestPost, getTopicsWithCounts, formatDateWithMonth, calculateReadingTime, getFirstParagraphText } from '../utils'
import ArticleList from './ArticleList.vue'
import Button from './Button.vue'

// Topic filtering state
const defaultTopics = ['typescript', 'a11y', 'ai', 'javascript', 'vue', 'blogging', 'obsidian', 'nuxt']
const selectedTopics = ref<string[]>([])
const hasUrlParams = ref(false)

// Initialize from URL query parameters or use defaults
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const topicParams = urlParams.getAll('topic')
  if (topicParams.length > 0) {
    selectedTopics.value = topicParams
    hasUrlParams.value = true
  } else {
    selectedTopics.value = [...defaultTopics]
    hasUrlParams.value = false
  }
})

// Filter out draft posts and sort by date
const allArticles = computed(() => {
  return posts
    .filter(post => !post.frontmatter?.draft)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter?.created_at || a.frontmatter?.date || '')
      const dateB = new Date(b.frontmatter?.created_at || b.frontmatter?.date || '')
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
  if (!latestArticle.value?.frontmatter?.created_at && !latestArticle.value?.frontmatter?.date) return ''
  return formatDateWithMonth(latestArticle.value.frontmatter.created_at || latestArticle.value.frontmatter.date)
})

const readingTime = computed(() => {
  if (!latestArticle.value) return 3 // Default fallback like individual posts
  
  // Try to get full content for accurate reading time calculation
  const content = latestArticle.value.content || latestArticle.value.excerpt || ''
  
  if (!content) {
    return 3 // Same fallback as individual blog posts
  }
  
  // Use same calculation as individual blog posts (200 WPM)
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).filter(word => word.length > 0).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return minutes || 1 // At least 1 minute
})

const excerpt = computed(() => {
  if (!latestArticle.value) return ''
  
  // First try to get excerpt, then fall back to content
  let content = latestArticle.value.excerpt || latestArticle.value.content || ''
  
  // If still no content, create a simple excerpt from the post
  if (!content) {
    // Return first paragraph from the markdown file
    return "Open-source AI is an exciting space. There is a lot of research and innovation is taking place here."
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