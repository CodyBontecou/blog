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
</template>

<script setup>
// Get the current route params
const { path } = useRoute()

// Fetch the post data
const { data: post } = await useAsyncData(`post-${path}`, () =>
    queryContent(path).findOne()
)
</script>
