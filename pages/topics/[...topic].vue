<script setup lang="ts">
import { capitalizeFirstLetter } from '~/lib/utils/capitalizeFirstLetter'

const route = useRoute()
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
    description: `${articleCount} of articles about ${topic}`,
    ogTitle: 'Topics / ' + topic,
    ogDescription: `${articleCount} of articles about ${topic}`,
    twitterTitle: 'Topics / ' + topic,
    twitterDescription: `${articleCount} of articles about ${topic}`,
    twitterCard: 'summary',
})

useHead({
    htmlAttrs: {
        lang: 'en',
    },
    link: [
        {
            rel: 'icon',
            type: 'image/ico',
            href: '/favicon.ico',
        },
    ],
})
</script>

<template>
    <main>
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
