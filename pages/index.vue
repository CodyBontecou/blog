<script setup lang="ts">
import { formatPostDate } from '@/lib/utils/formatPostDate'
import { formatDateWithMonth } from '@/lib/utils/formatDateWithMonth'
import { getFirstParagraphText } from '@/lib/utils/getFirstParagraphText'
import { getLatestPost } from '@/lib/utils/getLatestPost'
import eng_Latn from '../i18n/eng_Latn.json'
import { JsonViewer } from '@/components/ui/jsonViewer'

const { t } = useI18n()

// Fetch all posts sorted by date and ignoring where draft is true
const { data: posts } = await useAsyncData('articles', () =>
    queryContent('/')
        .sort({ date: -1 })
        .where({ draft: { $ne: true } })
        .find()
)
const latestPost = getLatestPost(posts.value)

// Extract unique topics from all posts
const topics = getTopics(posts.value)

console.log(toRaw(latestPost))

const formattedDateWithMonth = formatDateWithMonth(
    latestPost.date,
    latestPost.readingTime,
    t
)
</script>

<!-- pages/index.vue -->
<template>
    <!-- Latest Post -->
    <!-- <section v-if="latestPost" class="mb-16">
        <h2 class="text-gray-600 mb-6">{{ $t('latest.latest') }}</h2>
        <article>
            <h3 class="text-xl font-medium mb-2">
                <NuxtLink :to="latestPost._path" class="hover:opacity-75">
                    {{ latestPost.title }}
                </NuxtLink>
            </h3>
            <div class="text-gray-600 mb-4">{{ formattedDateWithMonth }}</div>
            <p class="text-gray-600">
                {{ getFirstParagraphText(latestPost.body) }}
                <NuxtLink
                    :to="latestPost._path"
                    class="text-gray-900 hover:opacity-75"
                >
                    {{ $t('latest.keepReading') }}
                </NuxtLink>
            </p>
        </article>
    </section> -->

    <!-- Topics -->
    <!-- <section v-if="topics.length" class="mb-16 text-lg">
        <h2 class="text-gray-600 mb-6">{{ $t('topics.topics') }}</h2>
        <div class="flex flex-wrap gap-2">
            <NuxtLink
                v-for="topic in topics"
                :key="topic"
                :to="`/topics/${topic}`"
                class="underline hover:opacity-75"
            >
                {{ topic }}
            </NuxtLink>
        </div>
    </section> -->

    <!-- Writing -->
    <!-- <section v-if="posts.length">
        <h2 class="text-gray-600 mb-6">{{ $t('writing.writing') }}</h2>
        <ul class="">
            <li
                v-for="post in posts"
                :key="post._path"
                class="flex items-center"
            >
                <div class="flex-shrink-0 text-gray-600 text-md pr-6">
                    {{ formatPostDate(post.date) }}
                </div>
                <NuxtLink
                    :to="post._path"
                    class="hover:opacity-75 underline text-lg"
                >
                    {{ post.title }}
                </NuxtLink>
            </li>
        </ul>
    </section> -->

    <div
        class="h-full relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 scroll-smooth"
    >
        <section
            class="h-full mx-auto max-w-7xl lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8"
        >
            <div
                class="flex flex-col items-center justify-center px-6 lg:px-0 lg:pt-4"
            >
                <div class="mx-auto max-w-2xl">
                    <div class="max-w-lg">
                        <!-- What's new -->
                        <!-- <div class="mb-6 mt-24 sm:mt-32 lg:mt-16">
                            <NuxtLink
                                to="/blog/new-file-formats"
                                class="inline-flex space-x-6"
                            >
                                <span
                                    class="rounded-full bg-gray-600/10 px-3 py-1 text-sm font-semibold leading-6 text-gray-600 ring-1 ring-inset ring-gray-600/10"
                                >
                                    {{ $t('landing.whatsNew') }}
                                </span>
                                <span
                                    class="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600"
                                >
                                    <span>
                                        {{ $t('landing.whatsNew') }}
                                    </span>
                                    <Icon
                                        name="heroicons:chevron-right"
                                        class="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                            </NuxtLink>
                        </div> -->

                        <!-- Hero, description -->
                        <div>
                            <h1
                                class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
                            >
                                {{ $t('landing.hero') }}
                            </h1>
                            <p class="mt-2 text-lg leading-8 text-gray-600">
                                {{ $t('landing.description') }}
                            </p>
                        </div>

                        <!-- CTA, learn more -->
                        <div class="mt-8 flex items-center gap-x-2.5">
                            <NuxtLink to="get-started">
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

                        <section v-if="topics.length" class="mt-16 text-lg">
                            <h2 class="text-gray-600">
                                {{ $t('topics.topics') }}
                            </h2>
                            <div class="flex flex-wrap gap-2">
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
                </div>
            </div>

            <div
                class="flex flex-col justify-center mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen"
            >
                <div
                    class="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 md:-mr-20 lg:-mr-36"
                    aria-hidden="true"
                />
                <div class="shadow-lg md:rounded-3xl">
                    <div
                        class="[clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]"
                    >
                        <div
                            class="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36"
                            aria-hidden="true"
                        />
                        <div class="relative md:pr-0">
                            <div
                                class="mx-auto max-w-2xl md:mx-0 md:max-w-none"
                            >
                                <div
                                    class="w-screen overflow-hidden rounded-tl-xl bg-gray-900"
                                >
                                    <div
                                        class="px-6 pb-6 pt-6 text-white max-h-[920px] overflow-y-scroll overflow-x-hidden text-start"
                                    >
                                        <JsonViewer :json-data="eng_Latn" />
                                    </div>
                                </div>
                            </div>
                            <div
                                class="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 md:rounded-3xl"
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
