<template>
  <ul>
    <li
      v-for="article in filteredArticles"
      :key="article.frontmatter?.title || article.url"
      class="article-item"
    >
      <span class="article-date">
        {{ formatPostDate(article.frontmatter?.created_at || article.frontmatter?.date) }}
      </span>
      <a :href="article.url" class="article-title">
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

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  margin-bottom: 1em;
  display: flex;
  align-items: baseline;
  gap: 1em;
}

.article-date {
  color: #666;
  font-family: monospace;
  flex-shrink: 0;
  white-space: nowrap;
}

.article-title {
  text-decoration: none;
}

.article-title:hover {
  text-decoration: underline;
}
</style>
