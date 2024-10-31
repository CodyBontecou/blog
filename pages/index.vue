<script setup lang="ts">
import { formatPostDate } from '@/lib/utils/formatPostDate'
import { formatDateWithMonth } from '@/lib/utils/formatDateWithMonth'
import { getFirstParagraphText } from '@/lib/utils/getFirstParagraphText'
import { getLatestPost } from '@/lib/utils/getLatestPost'

const { t } = useI18n()

// Fetch all posts sorted by date and ignoring where draft is true
const { data: articles } = await useAsyncData('articles', () =>
    queryContent('/')
        .sort({ date: -1 })
        .where({ draft: { $ne: true } })
        .find()
)
// Extract unique topics from all posts
const topics = getTopics(articles.value)

const latestArticle = getLatestPost(articles.value)
const formattedDateWithMonth = formatDateWithMonth(
    latestArticle.date,
    latestArticle.readingTime,
    t
)
</script>

<template>
    <div
        class="h-screen relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 scroll-smooth"
    >
        <div
            class="h-full mx-auto max-w-7xl flex items-center justify-center pt-32 px-4 sm:px-6 lg:px-8"
        >
            <div class="lg:grid lg:grid-cols-2 lg:gap-x-8">
                <!-- Left Column -->
                <div class="max-w-lg mx-auto lg:mx-0">
                    <!-- Hero, description -->
                    <div>
                        <h1
                            class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
                        >
                            {{ $t('landing.hero') }}
                        </h1>
                        <p class="mt-2 text-lg italic leading-8 text-gray-600">
                            {{ $t('landing.description') }}
                        </p>
                    </div>

                    <!-- CTA, learn more -->
                    <div class="mt-8 flex items-center gap-x-2.5">
                        <NuxtLink to="/">
                            <Button>
                                {{ $t('landing.cta') }}
                            </Button>
                        </NuxtLink>
                        <a href="#key-features" @click="">
                            <Button variant="outline">
                                {{ $t('landing.learnMore') }}
                            </Button>
                        </a>
                    </div>

                    <!-- Latest -->
                    <section v-if="latestArticle" class="mt-16">
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
                    <section v-if="topics.length" class="mt-16">
                        <h2 class="text-lg text-gray-600">
                            {{ $t('topics.topics') }}
                        </h2>
                        <div class="mt-2 flex flex-wrap gap-2">
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
                </div>

                <!-- Right Column -->
                <div class="max-w-lg mx-auto lg:mx-0 mt-12 lg:mt-0">
                    <h2 class="text-lg text-gray-600">
                        {{ $t('writing.writing') }}
                    </h2>
                    <ArticleList :articles="articles" />
                </div>
            </div>
        </div>
    </div>
</template>
