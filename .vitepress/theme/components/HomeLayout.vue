<template>
    <div class="content-container">
        <h1>Cody Bontecou</h1>
        <p>Software engineer interested in TypeScript, Vue.js, accessibility, AI, and web development.</p>

        <h2>Essays</h2>
        <ul>
            <li v-for="article in articles" :key="article.url">
                {{ formatPostDate(article.frontmatter?.created_at || article.frontmatter?.date) }}
                <a :href="article.url">{{ article.frontmatter?.title }}</a>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { data as posts } from '../posts.data'
import { formatPostDate } from '../utils'

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
