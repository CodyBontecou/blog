<template>
  <ul>
    <li
      v-for="article in articles"
      :key="article.frontmatter?.title"
      class="flex items-baseline leading-tight mb-1 min-w-0 overflow-hidden"
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

defineProps<Props>()</script>