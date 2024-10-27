<!-- pages/posts/[...slug].vue -->
<template>
    <!-- Article -->
    <article class="prose prose-slate max-w-none">
        <h1 class="text-4xl font-normal mb-4">{{ post.title }}</h1>
        <div class="text-gray-600 text-lg mb-16">
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

// Format the date (August 7, 2023)
const formatDate = date => {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })
}
</script>

<style>
/* Custom prose styles to match the design */
.prose {
    font-size: 1.125rem;
    line-height: 1.75;
}

.prose h1 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-weight: 400;
}

.prose p {
    margin-bottom: 1.5rem;
}

.prose em {
    font-style: italic;
}
</style>
