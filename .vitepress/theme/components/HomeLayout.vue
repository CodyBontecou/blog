<template>
  <div class="lg:h-screen lg:flex lg:flex-col lg:overflow-hidden">
    <div class="mx-auto max-w-7xl w-full py-16 px-4 sm:px-6 lg:px-8 lg:py-0 lg:h-full lg:flex-1 lg:overflow-hidden">
      <div class="lg:h-full lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        <!-- Left Column -->
        <div class="max-w-lg mx-auto mb-16 lg:mb-0 lg:mx-0 lg:h-full lg:overflow-y-auto lg:pr-4">
          <div class="lg:py-16">
            <!-- Hero, description -->
            <div class="mb-4">
              <h1 class="mb-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Cody Bontecou
              </h1>
              <p class="text-lg italic leading-8 text-gray-600">
                is enjoying life 💭
              </p>
            </div>

            <!-- CTA, learn more -->
            <div class="mb-8 flex items-center gap-x-2.5 w-full">
              <a href="/">
                <Button>Writing</Button>
              </a>
              <a href="/about">
                <Button variant="outline">About</Button>
              </a>
            </div>

            <!-- Latest -->
            <section v-if="latestArticle" class="mb-16 w-full">
              <h2 class="text-gray-600 mb-6">Latest</h2>
              <article>
                <h3 class="text-xl font-medium mb-2">
                  <a :href="latestArticle.url" class="hover:opacity-75">
                    {{ latestArticle.frontmatter?.title }}
                  </a>
                </h3>
                <div class="text-gray-600 mb-4">
                  {{ formattedDate }} · {{ readingTime }} minute read
                </div>
                <p class="text-gray-600">
                  {{ excerpt }}
                  <a :href="latestArticle.url" class="text-gray-900 hover:opacity-75">
                    Keep reading
                  </a>
                </p>
              </article>
            </section>

            <!-- Topics -->
            <section v-if="topicsWithCounts.length" class="mb-16 w-full" style="min-height: 0">
              <h2 class="text-lg text-gray-600">Topics</h2>
              <div class="mt-6 flex flex-wrap gap-2">
                <a
                  v-for="{ topic, count } in topicsWithCounts"
                  :key="topic"
                  :href="`/topics/${topic}`"
                  class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-sm transition-colors"
                >
                  <span>{{ topic }}</span>
                  <span class="text-gray-500">({{ count }})</span>
                </a>
              </div>
            </section>
          </div>
        </div>

        <!-- Right Column -->
        <div class="max-w-lg mx-auto lg:mt-0 lg:h-full lg:overflow-y-auto lg:pl-4">
          <div class="lg:py-16">
            <h2 class="mb-6 text-lg text-gray-600">Writing</h2>
            <ArticleList v-if="articles" :articles="articles" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { data as posts } from '../posts.data'
import { getLatestPost, getTopicsWithCounts, formatDateWithMonth, calculateReadingTime, getFirstParagraphText } from '../utils'
import ArticleList from './ArticleList.vue'
import Button from './Button.vue'

// Filter out draft posts and sort by date
const articles = computed(() => {
  return posts
    .filter(post => !post.frontmatter?.draft)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter?.created_at || a.frontmatter?.date || '')
      const dateB = new Date(b.frontmatter?.created_at || b.frontmatter?.date || '')
      return dateB.getTime() - dateA.getTime()
    })
})

const latestArticle = computed(() => getLatestPost(articles.value))
const topicsWithCounts = computed(() => getTopicsWithCounts(articles.value))

const formattedDate = computed(() => {
  if (!latestArticle.value?.frontmatter?.created_at && !latestArticle.value?.frontmatter?.date) return ''
  return formatDateWithMonth(latestArticle.value.frontmatter.created_at || latestArticle.value.frontmatter.date)
})

const readingTime = computed(() => {
  if (!latestArticle.value?.excerpt) return 0
  return calculateReadingTime(latestArticle.value.excerpt)
})

const excerpt = computed(() => {
  if (!latestArticle.value?.excerpt) return ''
  return getFirstParagraphText(latestArticle.value.excerpt)
})
</script>