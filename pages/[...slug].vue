<script setup lang="ts">
import { BlogPost } from '@/components/ui/blogPost'

import { getFirstParagraphText } from '~/lib/utils/getFirstParagraphText'

// Get the current route params
const { path } = useRoute()

// Fetch the post data
const { data: post } = await useAsyncData(`post-${path}`, () =>
    queryContent(path).findOne()
)

if (!post.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found',
    })
}

defineOgImageComponent('BlogPost', {
    title: post.value?.title ?? '',
    description: getFirstParagraphText(post.value?.body),
})

useSeoMeta({
    description: getFirstParagraphText(post.value?.body),
    ogTitle: post.value?.title,
    ogDescription: getFirstParagraphText(post.value?.body),
    twitterTitle: post.value?.title,
    twitterDescription: getFirstParagraphText(post.value?.body),
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
    <Suspense>
        <!-- Main content -->
        <template #default>
            <BlogPost />
        </template>

        <!-- Loading state -->
        <template #fallback>
            <div class="animate-pulse">
                <div class="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div class="h-4 bg-gray-200 rounded w-1/4 mb-10"></div>
                <div class="space-y-4">
                    <div class="h-4 bg-gray-200 rounded"></div>
                    <div class="h-4 bg-gray-200 rounded"></div>
                    <div class="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
            </div>
        </template>
    </Suspense>
</template>
