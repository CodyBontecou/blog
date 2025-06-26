<script setup lang="ts">
import { BlogPost } from '@/components/ui/blogPost'
import { Breadcrumb } from '@/components/ui/breadcrumb'

import { getFirstParagraphText } from '~/lib/utils/getFirstParagraphText'

// Get the current route params
const { path } = useRoute()
const config = useRuntimeConfig()

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

// Add structured data for blog posts
useJsonLd({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.value?.title,
    description: getFirstParagraphText(post.value?.body),
    image: post.value?.image || `${config.public.siteUrl}/og-image.png`,
    author: {
        '@type': 'Person',
        name: 'Cody Bontecou',
        url: config.public.siteUrl,
        image: `${config.public.siteUrl}/og-image.png`,
        sameAs: [
            'https://github.com/CodyBontecou',
            'https://twitter.com/CodyBontecou',
            'https://www.linkedin.com/in/cody-bontecou/',
        ],
    },
    datePublished: post.value?.date || post.value?.created_at,
    dateModified: post.value?.updatedAt || post.value?.date || post.value?.created_at,
    publisher: {
        '@type': 'Person',
        name: 'Cody Bontecou',
        url: config.public.siteUrl,
        logo: {
            '@type': 'ImageObject',
            url: `${config.public.siteUrl}/og-image.png`,
        },
    },
    mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${config.public.siteUrl}${path}`,
    },
    wordCount: post.value?.body?.children?.length || 0,
    keywords: post.value?.topics?.join(', ') || post.value?.tags?.join(', ') || '',
    inLanguage: 'en-US',
    genre: 'Technology',
    about: post.value?.topics?.[0] || 'Web Development',
})

useSeoMeta({
    description: getFirstParagraphText(post.value?.body),
    ogTitle: post.value?.title,
    ogDescription: getFirstParagraphText(post.value?.body),
    twitterTitle: post.value?.title,
    twitterDescription: getFirstParagraphText(post.value?.body),
    twitterCard: 'summary_large_image',
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
        {
            rel: 'canonical',
            href: post.value?.canonicalUrl || `${config.public.siteUrl}${path}`,
        },
    ],
})

// Generate breadcrumb items
const breadcrumbItems = computed(() => {
    const items = [
        { name: 'Home', path: '/' },
    ]
    
    // Add topic if available
    if (post.value?.topics?.length) {
        items.push({
            name: post.value.topics[0],
            path: `/topics/${post.value.topics[0].toLowerCase()}`,
        })
    }
    
    // Add current post
    items.push({
        name: post.value?.title || 'Article',
        isActive: true,
    })
    
    return items
})
</script>

<template>
    <div>
        <Breadcrumb :items="breadcrumbItems" />
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
    </div>
</template>
