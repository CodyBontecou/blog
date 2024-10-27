<!-- pages/posts/[...slug].vue -->
<template>
    <!-- Article -->
    <article class="max-w-none">
        <h1 class="text-4xl font-normal mb-4">{{ post.title }}</h1>
        <div class="text-gray-600 text-lg mb-10">
            {{ formatDate(post.date) }} · {{ post.readingTime }} minute read
        </div>
        <ContentRenderer :value="post" />
    </article>

    <Separator class="my-20" />

    <div>
        <h2>You might also enjoy</h2>
        <ArticleList :articles="similarArticles" />
    </div>
</template>

<script setup lang="ts">
// Get the current route params
const { path } = useRoute()

// Fetch the post data
const { data: post } = await useAsyncData(`post-${path}`, () =>
    queryContent(path).findOne()
)

// Extract topics and create an array of queries
const postTopics = post.value.topics

const { data: allArticles } = await useAsyncData('allArticles', () =>
    queryContent().find()
)

const similarArticles = computed(() => {
    return allArticles.value.filter(
        article =>
            article.title !== post.value.title &&
            article.topics.some(topic => postTopics.includes(topic))
    )
})
</script>
