<template>
    <div>
        <h1>Cody Bontecou</h1>
        <p>I'm a software engineer who loves building things with TypeScript and Vue.js. I write about web development, AI, and making the web more accessible. When I'm not coding, you'll find me tinkering with new technologies, contributing to open source, or writing essays to share what I've learned.</p>

        <h2>Essays</h2>
        <ul>
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
