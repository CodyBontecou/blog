<script setup lang="ts">
// Get all unique topics from content
const { data: articles } = await useAsyncData('all-articles', () =>
    queryContent().only(['topics', '_path', 'title']).find()
)

// Extract all unique topics
const allTopics = computed(() => {
    if (!articles.value) return []
    
    const topicSet = new Set<string>()
    articles.value.forEach(article => {
        if (article.topics && Array.isArray(article.topics)) {
            article.topics.forEach(topic => topicSet.add(topic))
        }
    })
    
    return Array.from(topicSet).sort()
})

defineOgImageComponent('Frame', {
    title: 'Topics',
})

useSeoMeta({
    title: 'Topics | Cody Bontecou',
    description: 'Browse all topics covered in my blog posts. Find articles by topic to explore specific areas of interest.',
    ogTitle: 'Topics | Cody Bontecou',
    ogDescription: 'Browse all topics covered in my blog posts.',
})

useHead({
    title: 'Topics | Cody Bontecou',
    htmlAttrs: {
        lang: 'en',
    },
})
</script>

<template>
    <main>
        <div class="mb-12">
            <h1 class="text-4xl font-normal mb-8">Topics</h1>
            <p class="text-gray-600 text-lg">
                Browse articles by topic
            </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <NuxtLink
                v-for="topic in allTopics"
                :key="topic"
                :to="`/topics/${topic}`"
                class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
                {{ topic }}
            </NuxtLink>
        </div>
    </main>
</template>