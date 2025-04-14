<script setup lang="ts">
import { calculateReadingTime } from '~/lib/utils/calculateReadingTime'
import { formatDateWithMonth } from '~/lib/utils/formatDateWithMonth'
import { getFirstParagraphText } from '~/lib/utils/getFirstParagraphText'
import { getLatestPost } from '~/lib/utils/getLatestPost'
import { getPostBody } from '~/lib/utils/getPostBody'
import { getTopics } from '~/lib/utils/getTopics'

const { t } = useI18n()
// defineOgImageComponent('Frame', {
//     title: 'Cody Bontecou',
//     description: 'is enjoying life.',
// })

// Fetch all posts sorted by date and ignoring where draft is true
const { data: articles } = await useAsyncData('articles', () =>
    queryContent('/')
        .sort({ created_at: -1 })
        .where({ draft: { $ne: true } })
        .find()
)
// Extract unique topics from all posts
const topics = getTopics(articles.value)

const latestArticle = getLatestPost(articles.value)
const postBody = computed(() => getPostBody(latestArticle?.body))

const formattedDateWithMonth = formatDateWithMonth(
    latestArticle.created_at,
    calculateReadingTime(postBody.value),
    t
)

useSeoMeta({
    description: 'is enjoying life',
    ogTitle: 'Cody Bontecou | Blog',
    ogDescription: 'is enjoying life',
    twitterTitle: 'Cody Bontecou | Blog',
    twitterDescription: 'is enjoying life',
    twitterCard: 'summary',
})

useHead({
    title: 'Cody Bontecou | Blog',
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

definePageMeta({
    layout: 'landing',
})
</script>

<template>
    <div class="h-full mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
        <div class="lg:pt-0 lg:grid lg:grid-cols-2 lg:gap-x-12">
            <!-- Left Column -->
            <div class="max-w-lg mx-auto mb-16 lg:mb-0 lg:mx-0">
                <div class="lg:fixed lg:max-w-lg">
                    <!-- Hero, description -->
                    <div class="mb-4">
                        <h1
                            class="mb-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
                        >
                            {{ $t('landing.hero') }}
                        </h1>
                        <p class="text-lg italic leading-8 text-gray-600">
                            {{ $t('landing.description') }}
                        </p>
                    </div>

                    <!-- CTA, learn more -->
                    <div class="mb-8 flex items-center gap-x-2.5 w-full">
                        <NuxtLink to="/">
                            <Button>
                                {{ $t('landing.cta') }}
                            </Button>
                        </NuxtLink>
                        <NuxtLink to="about">
                            <Button variant="outline">
                                {{ $t('landing.learnMore') }}
                            </Button>
                        </NuxtLink>
                    </div>

                    <!-- Latest -->
                    <section v-if="latestArticle" class="mb-16 w-full">
                        <h2 class="text-gray-600 mb-6">
                            {{ $t('latest.latest') }}
                        </h2>
                        <article>
                            <h3 class="text-xl font-medium mb-2">
                                <NuxtLink
                                    :to="latestArticle._path"
                                    class="hover:opacity-75"
                                >
                                    {{ latestArticle.title }}
                                </NuxtLink>
                            </h3>
                            <div class="text-gray-600 mb-4">
                                {{ formattedDateWithMonth }}
                            </div>
                            <p class="text-gray-600">
                                {{ getFirstParagraphText(latestArticle.body) }}
                                <NuxtLink
                                    :to="latestArticle._path"
                                    class="text-gray-900 hover:opacity-75"
                                >
                                    {{ $t('latest.keepReading') }}
                                </NuxtLink>
                            </p>
                        </article>
                    </section>

                    <!-- Topics -->
                    <section
                        v-if="topics.length"
                        class="mb-16 w-full"
                        style="min-height: 0"
                    >
                        <h2 class="text-lg text-gray-600">
                            {{ $t('topics.topics') }}
                        </h2>
                        <div
                            class="mt-6 flex flex-wrap gap-2 md:max-h-64 overflow-y-auto"
                        >
                            <NuxtLink
                                v-for="topic in topics"
                                :key="topic"
                                :to="`/topics/${topic}`"
                                class="underline hover:opacity-75 break-keep"
                            >
                                {{ topic }}
                            </NuxtLink>
                        </div>
                    </section>
                </div>
            </div>

            <!-- Right Column -->
            <div class="max-w-lg mx-auto lg:mt-0">
                <h2 class="mb-6 text-lg text-gray-600">
                    {{ $t('writing.writing') }}
                </h2>
                <ArticleList :articles="articles" />
            </div>
        </div>
    </div>
</template>
