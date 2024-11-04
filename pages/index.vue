<script setup lang="ts">
import { formatDateWithMonth } from '@/lib/utils/formatDateWithMonth'
import { getFirstParagraphText } from '@/lib/utils/getFirstParagraphText'
import { getLatestPost } from '@/lib/utils/getLatestPost'
import { getTopics } from '~/lib/utils/getTopics'

const { t } = useI18n()

// Fetch all posts sorted by date and ignoring where draft is true
const { data: articles } = await useAsyncData('articles', () =>
    queryContent('/')
        .sort({ date: -1 })
        .where({ draft: { $ne: true }, ignore: { $ne: true } })
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
        class="h-full mx-auto max-w-7xl flex items-center md:justify-center pt-16 px-4 sm:px-6 lg:px-8"
    >
        <div class="lg:pt-0 lg:grid lg:grid-cols-2 lg:gap-x-12">
            <!-- Left Column -->
            <div class="max-w-lg mx-auto mb-16 lg:mb-0 lg:mx-0">
                <!-- Hero, description -->
                <div class="mb-4">
                    <h1
                        class="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
                    >
                        {{ $t('landing.hero') }}
                    </h1>
                    <p class="text-lg italic leading-8 text-gray-600">
                        {{ $t('landing.description') }}
                    </p>
                </div>

                <!-- CTA, learn more -->
                <div class="mb-8 flex items-center gap-x-2.5">
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
                <section v-if="latestArticle" class="mb-16">
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
                <section v-if="topics.length" class="mb-16">
                    <h2 class="text-lg text-gray-600">
                        {{ $t('topics.topics') }}
                    </h2>
                    <div class="mt-6 flex flex-wrap gap-2">
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
            <div class="max-w-lg mx-auto lg:mt-0">
                <h2 class="mb-6 text-lg text-gray-600">
                    {{ $t('writing.writing') }}
                </h2>
                <ArticleList :articles="articles" />
                <!-- <BlurredScroller :items="articles" /> -->
            </div>
        </div>
    </div>
</template>
