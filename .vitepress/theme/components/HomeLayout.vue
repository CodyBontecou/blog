<template>
    <div>
        <h1>Cody Bontecou</h1>
        <p>I'm a software engineer who loves building things with TypeScript and Vue.js. I write about web development, AI, and making the web more accessible. When I'm not coding, you'll find me tinkering with new technologies, contributing to open source, or writing essays to share what I've learned.</p>

        <h2>Essays</h2>
        <ul class="essay-list">
            <li v-for="article in articles" :key="article.url">
                <a :href="article.url">{{ article.frontmatter?.title }}</a>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { data as posts } from '../posts.data'

// Filter out draft posts and sort by date
const articles = computed(() => {
    return posts
        .filter((post: any) => !post.frontmatter?.draft && post.frontmatter?.title)
        .sort((a: any, b: any) => {
            const dateA = new Date(a.frontmatter?.created_at || a.frontmatter?.date || '')
            const dateB = new Date(b.frontmatter?.created_at || b.frontmatter?.date || '')
            return dateB.getTime() - dateA.getTime()
        })
})
</script>

<style scoped>
.essay-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.essay-list li {
  margin: 0;
  padding: 0;
}

.essay-list a {
  display: block;
  min-height: 48px;
  padding: 12px 0;
  line-height: 1.5;
}
</style>
