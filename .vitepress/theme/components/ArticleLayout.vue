<template>
  <article>
    <h1>{{ title }}</h1>
    <div>
      <span v-if="date">
        {{ formatDate(date) }}
      </span>
      <span v-if="readingTime">· {{ readingTime }} min read</span>
      <span v-if="topics"> ·
        <span
          v-for="(topic, index) in topics"
          :key="topic"
        >
          {{ topic.toLowerCase() }}<span v-if="index !== topics.length - 1">, </span>
        </span>
      </span>
    </div>
    <slot />
  </article>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  date?: string
  readingTime?: number
  topics?: string[]
}

defineProps<Props>()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>