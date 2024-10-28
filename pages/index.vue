<script setup lang="ts">
import { formatPostDate } from '@/lib/utils/formatPostDate'
import { formatDateWithMonth } from '@/lib/utils/formatDateWithMonth'
import { getFirstParagraphText } from '@/lib/utils/getFirstParagraphText'
import { getLatestPost } from '@/lib/utils/getLatestPost'

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
    <section v-if="latestPost" class="mb-16">
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
    </section>

    <!-- Topics -->
    <section v-if="topics.length" class="mb-16 text-lg">
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
    </section>

    <!-- Writing -->
    <section v-if="posts.length">
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
    </section>
</template>
