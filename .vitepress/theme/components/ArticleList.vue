<template>
  <TransitionGroup name="article" tag="ul" appear>
    <li
      v-for="article in filteredArticles"
      :key="article.frontmatter?.title || article.url"
      :class="[
        'flex items-baseline leading-tight mb-1 min-w-0 overflow-hidden transition-all duration-500',
        isNewlyShown(article) ? 'bg-gray-100 border-l-4 border-gray-400 pl-3 -ml-3' : ''
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
  </TransitionGroup>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
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

// Track previously shown articles to identify newly shown ones
const previousArticleUrls = ref<Set<string>>(new Set())
const newlyShownArticles = ref<Set<string>>(new Set())

// Filter out articles without titles to prevent empty list items
const filteredArticles = computed(() => {
  return props.articles.filter(article => 
    article.frontmatter?.title && 
    article.frontmatter.title.trim() !== ''
  )
})

// Check if an article is newly shown
const isNewlyShown = (article: Article) => {
  return newlyShownArticles.value.has(article.url)
}

// Watch for changes in filtered articles to identify newly shown ones
watch(filteredArticles, (newArticles, oldArticles) => {
  const currentUrls = new Set(newArticles.map(a => a.url))
  const newlyAdded = new Set<string>()
  
  // Find articles that are now visible but weren't before
  for (const article of newArticles) {
    if (!previousArticleUrls.value.has(article.url)) {
      newlyAdded.add(article.url)
    }
  }
  
  // Update tracking sets
  newlyShownArticles.value = newlyAdded
  previousArticleUrls.value = currentUrls
  
  // Clear the highlight after a delay
  if (newlyAdded.size > 0) {
    setTimeout(() => {
      newlyShownArticles.value.clear()
    }, 1500) // Remove highlight after 1.5 seconds
  }
}, { immediate: true })
</script>

<style scoped>
/* Enter and leave animations for articles */
.article-enter-active {
  transition: all 0.5s ease-out;
}

.article-leave-active {
  transition: all 0.3s ease-in;
}

.article-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.article-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Move animation for existing items */
.article-move {
  transition: transform 0.3s ease;
}
</style>