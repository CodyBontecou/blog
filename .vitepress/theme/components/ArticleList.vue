<template>
  <ul>
    <li
      v-for="article in filteredArticles"
      :key="article.frontmatter?.title || article.url"
      :class="[
        'flex items-baseline leading-tight mb-1 min-w-0 overflow-hidden transition-all duration-500 ease-out',
        getArticleClasses(article.url)
      ]"
    >
      <div
        class="flex-shrink-0 text-gray-600 text-md pr-3 sm:pr-6 font-mono whitespace-nowrap"
      >
        {{ formatPostDate(article.frontmatter?.created_at || article.frontmatter?.date) }}
      </div>
      <a
        :href="article.url"
        class="opacity-90 hover:opacity-50 hover:underline text-lg truncate block"
      >
        {{ article.frontmatter?.title }}
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

// Track previous article URLs to identify newly shown articles
const previousArticleUrls = ref<string[]>([])
const newlyShownArticles = ref<string[]>([])
const isInitialLoad = ref(true)

// Filter out articles without titles to prevent empty list items
const filteredArticles = computed(() => {
  return props.articles.filter(article => 
    article.frontmatter?.title && 
    article.frontmatter.title.trim() !== ''
  )
})

// Watch for changes in filtered articles to identify new ones
watch(() => props.articles, (newArticles, oldArticles) => {
  const currentUrls = newArticles.map(a => a.url)
  
  if (isInitialLoad.value) {
    // First time - just set previous URLs, no animation
    previousArticleUrls.value = currentUrls
    isInitialLoad.value = false
    return
  }

  const previousUrls = previousArticleUrls.value
  
  // Find newly shown articles (in current but not in previous)
  const newUrls = currentUrls.filter(url => !previousUrls.includes(url))
  
  if (newUrls.length > 0) {
    // Set new articles to highlight
    newlyShownArticles.value = newUrls
    
    // Remove highlighting after 3 seconds
    setTimeout(() => {
      newlyShownArticles.value = []
    }, 3000)
  }
  
  // Update previous articles tracking
  previousArticleUrls.value = currentUrls
}, { deep: true })

// Get CSS classes for an article based on its state
const getArticleClasses = (articleUrl: string) => {
  const isNewlyShown = newlyShownArticles.value.includes(articleUrl)
  
  return {
    'animate-fade-in': isNewlyShown,
    'bg-gray-100': isNewlyShown,
    'filter grayscale': isNewlyShown,
    'rounded-md px-2 py-1': isNewlyShown,
    '-mx-2 -my-1': isNewlyShown
  }
}
</script>

<style scoped>
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}
</style>