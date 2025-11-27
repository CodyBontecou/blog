<template>
  <main class="topics-archive">
    <div class="topics-container">
      <TopNav />

      <!-- Simple Header -->
      <header class="topics-header">
        <h1 class="topics-title">TOPICS</h1>
      </header>

      <!-- Simple List -->
      <div class="topics-list">
        <a
          v-for="({ topic, count }) in topicsWithCounts"
          :key="topic"
          :href="`/topics/${topic}`"
          class="topic-item"
        >
          <div class="topic-meta">{{ count }}</div>
          <h2 class="topic-title">{{ capitalizeFirstLetter(topic) }}</h2>
        </a>
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
</script>

<style scoped>
.topics-archive {
  min-height: 100vh;
  background: var(--vp-c-bg);
  padding: 2rem 1.5rem 6rem;
}

.topics-container {
  max-width: 680px;
  margin: 0 auto;
}

/* Header */
.topics-header {
  margin-bottom: 3rem;
}

.topics-title {
  font-size: 0.8125rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
  margin: 0;
}

/* Topics List */
.topics-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.topic-item {
  display: block;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.topic-item:hover {
  opacity: 0.7;
}

.topic-meta {
  font-size: 0.8125rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.5rem;
  font-weight: 400;
}

.topic-title {
  font-size: 1.25rem;
  font-weight: 400;
  color: var(--vp-c-text-1);
  margin: 0;
  line-height: 1.4;
  letter-spacing: -0.01em;
}

@media (max-width: 640px) {
  .topics-archive {
    padding: 1.5rem 1rem 4rem;
  }

  .topics-list {
    gap: 1.75rem;
  }
}
</style>