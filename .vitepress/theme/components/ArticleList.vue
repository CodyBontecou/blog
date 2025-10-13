<template>
  <ul>
    <li v-for="article in filteredArticles" :key="article.frontmatter?.title || article.url">
      <span>
        {{ formatPostDate(article.frontmatter?.created_at || article.frontmatter?.date) }}
      </span>
      <a :href="article.url">
        {{ article.frontmatter?.title }}
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
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

// Filter out articles without titles to prevent empty list items
const filteredArticles = computed(() => {
  return props.articles.filter(article =>
    article.frontmatter?.title &&
    article.frontmatter.title.trim() !== ''
  )
})
</script>
