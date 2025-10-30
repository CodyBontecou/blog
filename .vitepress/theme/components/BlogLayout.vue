<template>
  <div class="max-w-lg mx-auto">
    <h1 class="text-4xl font-bold tracking-tight text-gray-900 mb-8">All Posts</h1>
    <ArticleList :articles="articles" />
  </div>
</template>

<script setup lang="ts">
import { data as posts } from '../posts.data'
import ArticleList from './ArticleList.vue'

// All posts sorted by date, excluding drafts
const articles = posts
</script>