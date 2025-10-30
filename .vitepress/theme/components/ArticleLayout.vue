<template>
  <article class="prose lg:prose-lg max-w-none">
    <h1 class="text-4xl font-normal mb-4">{{ title }}</h1>
    <div class="text-gray-600 text-base sm:text-lg flex flex-wrap items-center gap-x-2 mb-10">
      <span class="whitespace-nowrap" v-if="date">
        {{ formatDate(date) }}
      </span>
      <span v-if="readingTime">· {{ readingTime }} min read</span>
      <div class="flex flex-wrap gap-x-2 gap-y-1 mt-1 sm:mt-0" v-if="topics">
        <span 
          class="text-gray-600 topics"
          v-for="(topic, index) in topics"
          :key="topic"
        >
          {{ topic.toLowerCase() }}<span v-if="index !== topics.length - 1">,</span>
        </span>
      </div>
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