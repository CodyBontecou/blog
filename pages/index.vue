<script setup lang="ts">
// Fetch all posts sorted by date
const { data: posts } = await useAsyncData('articles', () =>
    queryContent('/')
        .sort({ date: -1 })
        .where({ draft: { $ne: true } })
        .find()
)

// Get the latest post
const latestPost = computed(() => posts.value?.[0])

// Extract unique topics from all posts
const topics = computed(() => {
    const allTopics = posts.value
        ?.flatMap(post => post.topics || [])
        .filter(Boolean)
    return [...new Set(allTopics)].sort()
})

// Get the first paragraph text and truncate it
const getFirstParagraphText = body => {
    if (!body?.children) return ''

    // Find the first paragraph element
    const firstParagraph = body.children.find(
        child => child.tag === 'p' && child.children?.[0]?.value
    )

    if (!firstParagraph) return ''

    const text = firstParagraph.children[0].value
    if (text.length <= 120) return text
    return text.slice(0, 120).trim() + '...'
}
</script>

<!-- pages/index.vue -->
<template>
    <!-- Latest Post -->
    <section v-if="latestPost" class="mb-16">
        <h2 class="text-gray-600 mb-6">Latest</h2>
        <article>
            <h3 class="text-xl font-medium mb-2">
                <NuxtLink :to="latestPost._path" class="hover:opacity-75">
                    {{ latestPost.title }}
                </NuxtLink>
            </h3>
            <div class="text-gray-600 mb-4">
                {{ formatDate(latestPost.date) }} ·
                {{ latestPost.readingTime }} minute read
            </div>
            <p class="text-gray-600">
                {{ getFirstParagraphText(latestPost.body) }}
                <NuxtLink
                    :to="latestPost._path"
                    class="text-gray-900 hover:opacity-75"
                >
                    Keep reading →
                </NuxtLink>
            </p>
        </article>
    </section>

    <!-- Topics -->
    <section v-if="topics.length" class="mb-16 text-lg">
        <h2 class="text-gray-600 mb-6">Topics</h2>
        <div class="flex flex-wrap gap-2">
            <NuxtLink
                v-for="topic in topics"
                :key="topic"
                :to="`/topics/${topic}`"
                class="underline hover:opacity-75"
            >
                {{ topic }}
            </NuxtLink>
        </div>
    </section>

    <!-- Writing -->
    <section v-if="posts.length">
        <h2 class="text-gray-600 mb-6">Writing</h2>
        <ul class="">
            <li
                v-for="post in posts"
                :key="post._path"
                class="flex items-center"
            >
                <div class="flex-shrink-0 text-gray-600 text-md pr-6">
                    {{ formatPostDate(post.date) }}
                </div>
                <NuxtLink
                    :to="post._path"
                    class="hover:opacity-75 underline text-lg"
                >
                    {{ post.title }}
                </NuxtLink>
            </li>
        </ul>
    </section>
</template>
