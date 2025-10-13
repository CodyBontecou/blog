<template>
    <div v-if="frontmatter.layout === 'home'">
        <HomeLayout />
    </div>
    <div v-else-if="frontmatter.layout === 'blog'">
        <BlogLayout />
    </div>
    <div v-else-if="frontmatter.layout === 'topic'">
        <TopicLayout />
    </div>
    <div v-else-if="frontmatter.layout === 'topics-index'">
        <TopicsIndexLayout />
    </div>
    <div v-else>
        <!-- Blog post with header -->
        <div v-if="isBlogPost">
            <article>
                <!-- Article Header -->
                <h1>{{ frontmatter.title }}</h1>
                <div>
                    <span>{{ formatDate(frontmatter.created_at || frontmatter.date) }}</span>
                    <span v-for="(topic, index) in frontmatter.topics" :key="topic">
                        <a :href="`/topics/${topic.toLowerCase()}`">
                            {{ topic.toLowerCase() }}
                        </a>
                        <span v-if="index !== frontmatter.topics.length - 1">, </span>
                    </span>
                </div>

                <Content :key="route.path" />
            </article>
        </div>

        <!-- Regular page without header -->
        <article v-else>
            <Content :key="route.path" />
        </article>
    </div>
</template>

<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import { computed } from 'vue'
import HomeLayout from './components/HomeLayout.vue'
import BlogLayout from './components/BlogLayout.vue'
import TopicLayout from './components/TopicLayout.vue'
import TopicsIndexLayout from './components/TopicsIndexLayout.vue'

const { page, frontmatter } = useData()
const route = useRoute()

// Check if this is a blog post (has title, created_at/date, and topics)
const isBlogPost = computed(() => {
    return (
        frontmatter.value.title &&
        (frontmatter.value.created_at || frontmatter.value.date) &&
        frontmatter.value.topics
    )
})

// Format date
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}
</script>
