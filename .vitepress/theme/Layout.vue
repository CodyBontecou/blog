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
            <article class="vp-doc">
                <!-- Article Header -->
                <h1>{{ frontmatter.title }}</h1>
                <div>
                    <span>{{ formatDate(frontmatter.created_at || frontmatter.date) }}</span>
                    <span v-if="frontmatter.topics && frontmatter.topics.length"> · </span>
                    <span v-for="(topic, index) in frontmatter.topics" :key="topic">
                        <a :href="`/topics/${topic.toLowerCase()}`">
                            {{ topic.toLowerCase() }}
                        </a>
                        <span v-if="index !== frontmatter.topics.length - 1">, </span>
                    </span>
                </div>

                <Content :key="route.path" />

                <!-- Newsletter subscription form at bottom of blog posts -->
                <BlogPostNewsletterForm />
            </article>
        </div>

        <!-- Regular page without header -->
        <article v-else class="vp-doc">
            <Content :key="route.path" />
        </article>
    </div>
</template>

<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import { computed, defineAsyncComponent } from 'vue'

// Lazy load layout components for better performance
const HomeLayout = defineAsyncComponent(() => import('./components/HomeLayout.vue'))
const BlogLayout = defineAsyncComponent(() => import('./components/BlogLayout.vue'))
const TopicLayout = defineAsyncComponent(() => import('./components/TopicLayout.vue'))
const TopicsIndexLayout = defineAsyncComponent(() => import('./components/TopicsIndexLayout.vue'))
const BlogPostNewsletterForm = defineAsyncComponent(() => import('./components/BlogPostNewsletterForm.vue'))

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
