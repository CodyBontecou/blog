<script setup lang="ts">
import { calculateReadingTime } from '~/lib/utils/calculateReadingTime'
import { formatDateWithMonth } from '~/lib/utils/formatDateWithMonth'
import { getFirstParagraphText } from '~/lib/utils/getFirstParagraphText'
import { getLatestPost } from '~/lib/utils/getLatestPost'
import { getPostBody } from '~/lib/utils/getPostBody'
import { getTopics } from '~/lib/utils/getTopics'

const { t } = useI18n()
const config = useRuntimeConfig()

defineOgImageComponent('Frame', {
    title: 'Cody Bontecou',
    description: 'is enjoying life.',
})

useHead({
    link: [
        {
            rel: 'canonical',
            href: config.public.siteUrl,
        },
    ],
})

// Add organization structured data
useJsonLd({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Cody Bontecou',
    url: config.public.siteUrl,
    image: `${config.public.siteUrl}/og-image.png`,
    sameAs: [
        'https://github.com/CodyBontecou',
        'https://twitter.com/CodyBontecou',
        'https://www.linkedin.com/in/cody-bontecou/',
        'https://bsky.app/profile/codybontecou.com',
        'https://www.youtube.com/@codybontecou',
    ],
    jobTitle: 'Software Developer',
    description: 'Software developer and content creator sharing insights on Vue.js, Nuxt, TypeScript, and modern web development.',
    knowsAbout: ['Vue.js', 'Nuxt.js', 'TypeScript', 'JavaScript', 'Web Development', 'Frontend Development', 'Software Engineering'],
    worksFor: {
        '@type': 'Organization',
        name: 'Independent',
    },
    alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Software Development',
    },
})

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
    description: 'Software developer and content creator sharing insights on Vue.js, Nuxt, TypeScript, web development, and modern programming practices. Tutorials, tips, and adventures in code.',
    ogTitle: 'Cody Bontecou | Blog',
    ogDescription: 'Software developer sharing web development tutorials, Vue.js insights, and programming adventures. Learn modern web technologies and best practices.',
    ogImage: `/og-image.png`,
    twitterTitle: 'Cody Bontecou | Blog',
    twitterDescription: 'Software developer sharing web development tutorials, Vue.js insights, and programming adventures. Learn modern web technologies and best practices.',
    twitterCard: 'summary_large_image',
    twitterImage: `/og-image.png`,
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
    <div class="lg:h-screen lg:flex lg:flex-col lg:overflow-hidden">
        <div
            class="mx-auto max-w-7xl w-full py-16 px-4 sm:px-6 lg:px-8 lg:py-0 lg:h-full lg:flex-1 lg:overflow-hidden"
        >
            <div
                class="lg:h-full lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
            >
                <!-- Left Column -->
                <div
                    class="max-w-lg mx-auto mb-16 lg:mb-0 lg:mx-0 lg:h-full lg:overflow-y-auto lg:pr-4"
                >
                    <div class="lg:py-16">
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
                                    {{
                                        getFirstParagraphText(
                                            latestArticle.body
                                        )
                                    }}
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
                            <div class="mt-6 flex flex-wrap gap-2">
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
                <div
                    class="max-w-lg mx-auto lg:mt-0 lg:h-full lg:overflow-y-auto lg:pl-4"
                >
                    <div class="lg:py-16">
                        <h2 class="mb-6 text-lg text-gray-600">
                            {{ $t('writing.writing') }}
                        </h2>
                        <ArticleList v-if="articles" :articles="articles" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
