<template>
  <main class="max-w-3xl mx-auto py-8 px-4">
    <div class="max-w-lg mx-auto mb-16 lg:max-w-3xl">
      <TopNav />
      
      <Breadcrumb :items="breadcrumbItems" />

      <div class="mb-12">
        <h1 class="text-4xl font-normal mb-8">
          <span class="text-gray-500">Topics / </span>
          <span>{{ capitalizedTopic }}</span>
        </h1>

        <p class="text-gray-600 text-lg">
          {{ articleCount }} entries about this topic
        </p>
      </div>

      <div v-if="filteredArticles.length === 0" class="text-gray-600">
        <p>No articles found for this topic yet.</p>
        <p class="mt-4">
          <a href="/" class="underline hover:opacity-75">← Back to all posts</a>
        </p>
      </div>
      
      <ArticleList v-else :articles="filteredArticles" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import { data as posts } from '../posts.data'
import { capitalizeFirstLetter, getArticlesByTopic } from '../utils'
import TopNav from './TopNav.vue'
import Breadcrumb from './Breadcrumb.vue'
import ArticleList from './ArticleList.vue'

const { page } = useData()
const route = useRoute()

// Extract topic from the URL path
const topic = computed(() => {
  const path = page.value.relativePath || route.path
  const match = path.match(/topics\/([^\/]+)/)
  return match ? decodeURIComponent(match[1].replace('.md', '')) : ''
})

const capitalizedTopic = computed(() => capitalizeFirstLetter(topic.value))

// Filter articles by topic
const filteredArticles = computed(() => getArticlesByTopic(posts, topic.value))

const articleCount = computed(() => filteredArticles.value.length)

// Generate breadcrumb items
const breadcrumbItems = computed(() => [
  { name: 'Home', path: '/' },
  { name: 'Topics', path: '/topics' },
  { name: capitalizedTopic.value, isActive: true },
])
</script>