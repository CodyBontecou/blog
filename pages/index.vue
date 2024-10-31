<script setup lang="ts">
import eng_Latn from '../i18n/eng_Latn.json'
import { JsonViewer } from '@/components/ui/jsonViewer'
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
