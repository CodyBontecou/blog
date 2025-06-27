<script setup lang="ts">
import { capitalizeFirstLetter } from '~/lib/utils/capitalizeFirstLetter'
import { Breadcrumb } from '@/components/ui/breadcrumb'

const route = useRoute()
const config = useRuntimeConfig()
const topic = route.params.topic[0]

const { data: articles } = await useAsyncData(`post-${route.path}`, () =>
    queryContent()
        .where({
            topics: {
                $containsAny: [
                    topic.toLowerCase(),
                    capitalizeFirstLetter(topic),
                    topic,
                ],
            },
        })
        .sort({ created_at: -1 })
        .find()
)

// Only throw 404 if the query failed, not if it returned empty results
if (!articles.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found',
    })
}

const articleCount = articles.value ? articles.value.length : 0

defineOgImageComponent('Frame', {
    title: 'Topics / ' + topic,
})

useSeoMeta({
    title: `${capitalizeFirstLetter(topic)} Articles | Cody Bontecou`,
    description: `Discover ${articleCount} articles about ${topic}. Learn from tutorials, insights, and practical examples covering ${topic} development and best practices.`,
    ogTitle: `${capitalizeFirstLetter(topic)} Articles | Cody Bontecou`,
    ogDescription: `Discover ${articleCount} articles about ${topic}. Learn from tutorials, insights, and practical examples covering ${topic} development.`,
    ogImage: `/og-image.png`,
    twitterTitle: `${capitalizeFirstLetter(topic)} Articles | Cody Bontecou`,
    twitterDescription: `Discover ${articleCount} articles about ${topic}. Learn from tutorials, insights, and practical examples.`,
    twitterCard: 'summary_large_image',
    twitterImage: `/og-image.png`,
})

useHead({
    title: `${capitalizeFirstLetter(topic)} Articles | Cody Bontecou`,
    htmlAttrs: {
        lang: 'en',
    },
    link: [
        {
            rel: 'icon',
            type: 'image/ico',
            href: '/favicon.ico',
        },
        {
            rel: 'canonical',
            href: `${config.public.siteUrl}${route.path}`,
        },
    ],
})

// Generate breadcrumb items
const breadcrumbItems = computed(() => [
    { name: 'Home', path: '/' },
    { name: 'Topics', path: '/topics' },
    { name: capitalizeFirstLetter(topic), isActive: true },
])
</script>

<template>
    <main>
        <Breadcrumb :items="breadcrumbItems" />
        
        <div class="mb-12">
            <h1 class="text-4xl font-normal mb-8">
                <span class="text-gray-500">Topics / </span>
                <span>{{ capitalizeFirstLetter(topic) }}</span>
            </h1>

            <p class="text-gray-600 text-lg">
                {{ articleCount }} entries about this topic
            </p>
        </div>

        <ArticleList :articles="articles" />
    </main>
</template>
