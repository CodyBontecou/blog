<template>
  <main>
    <div>
      <TopNav />

      <div>
        <h1>Topics</h1>
        <p>
          Browse {{ totalTopics }} topics covering {{ totalArticles }} articles
        </p>
      </div>

      <div>
        <a
          v-for="{ topic, count } in topicsWithCounts"
          :key="topic"
          :href="`/topics/${topic}`"
        >
          <div>
            <span>
              {{ capitalizeFirstLetter(topic) }}
            </span>
            <span>
              {{ count }} {{ count === 1 ? 'post' : 'posts' }}
            </span>
          </div>
        </a>
      </div>

      <div>
        <h2>All Topics (Compact)</h2>
        <div>
          <a
            v-for="{ topic, count } in topicsWithCounts"
            :key="`compact-${topic}`"
            :href="`/topics/${topic}`"
          >
            <span>{{ topic }}</span>
            <span>({{ count }})</span>
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