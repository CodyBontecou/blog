<template>
  <div>
    <h1>All Posts</h1>
    <ArticleList :articles="articles" />
  </div>
</template>

<script setup lang="ts">
import { data as posts } from '../posts.data'
import ArticleList from './ArticleList.vue'

// All posts sorted by date, excluding drafts
const articles = posts
</script>