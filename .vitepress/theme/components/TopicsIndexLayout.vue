<template>
  <main class="max-w-3xl mx-auto py-8 px-4">
    <div class="max-w-lg mx-auto mb-16 lg:max-w-3xl">
      <TopNav />
      
      <div class="mb-12">
        <h1 class="text-4xl font-normal mb-8">Topics</h1>
        <p class="text-gray-600 dark:text-gray-300 text-lg">
          Browse {{ totalTopics }} topics covering {{ totalArticles }} articles
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <a
          v-for="{ topic, count } in topicsWithCounts"
          :key="topic"
          :href="`/topics/${topic}`"
          class="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
        >
          <div class="flex items-center justify-between">
            <span class="text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-200 font-medium">
              {{ capitalizeFirstLetter(topic) }}
            </span>
            <span class="text-gray-500 dark:text-gray-400 text-sm">
              {{ count }} {{ count === 1 ? 'post' : 'posts' }}
            </span>
          </div>
        </a>
      </div>

      <!-- Alternative compact view -->
      <div class="mt-16 pt-16 border-t border-gray-200 dark:border-gray-700">
        <h2 class="text-xl font-medium mb-6 text-gray-900 dark:text-gray-100">All Topics (Compact)</h2>
        <div class="flex flex-wrap gap-2">
          <a
            v-for="{ topic, count } in topicsWithCounts"
            :key="`compact-${topic}`"
            :href="`/topics/${topic}`"
            class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm transition-colors text-gray-900 dark:text-gray-100"
          >
            <span>{{ topic }}</span>
            <span class="text-gray-500 dark:text-gray-400">({{ count }})</span>
          </a>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { data as posts } from '../posts.data'
import { getTopicsWithCounts, capitalizeFirstLetter } from '../utils'
import TopNav from './TopNav.vue'

const topicsWithCounts = computed(() => getTopicsWithCounts(posts))

const totalTopics = computed(() => topicsWithCounts.value.length)

const totalArticles = computed(() => posts.length)
</script>