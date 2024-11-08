<script setup lang="ts">
import { formatDate } from '~/lib/utils/formatDate'
import { shuffleArray } from '~/lib/utils/shuffleArray'
import { calculateReadingTime } from '~/lib/utils/calculateReadingTime'
import { getPostBody } from '~/lib/utils/getPostBody'
import type { ParsedContent } from '@nuxt/content'

// Get the current route params
const { path } = useRoute()

// Fetch the post data
const { data: post } = await useAsyncData(`post-${path}`, () =>
    queryContent(path).findOne()
)

// Extract topics and create an array of queries
const postTopics: string[] = post.value?.topics

const { data: allArticles } = await useAsyncData('allArticles', () =>
    queryContent('/')
        .sort({ date: -1 })
        .where({ draft: { $ne: true }, ignore: { $ne: true } })
        .find()
)

const similarArticles = computed(() => {
    return allArticles.value
        .filter(article => {
            // Skip if it's the same article
            if (article.title === post.value.title) return false

            // Handle cases where topics might be undefined/null
            const articleTopics = article.topics || []
            const currentPostTopics = postTopics || []

            // Only check topic overlap if both articles have topics
            return (
                articleTopics.length > 0 &&
                currentPostTopics.length > 0 &&
                articleTopics.some((topic: string) =>
                    currentPostTopics.includes(topic)
                )
            )
        })
        .slice(0, 5)
})

/*
Return similar if there are 5
Otherwise randomly inserts additional articles
*/
const suggestedArticles = computed<ParsedContent[]>(() => {
    const suggestedLength = 5

    if (similarArticles.value.length === suggestedLength) {
        return similarArticles.value
    }

    // Remaining amount that we need to randomly find
    const remainder = suggestedLength - similarArticles.value.length

    /*
    Making sure none of the randomly selected articles are the same as
    the similarArticles
    */
    const filteredArticles = allArticles.value.filter(
        article =>
            !similarArticles.value.map(a => a.title).includes(article.title)
    )

    /*
    Shuffling filteredArticles array to ensure added articles are random
    getting the remainder of the suggested article length
    then sorting the array to
    */
    const shuffledArray = shuffleArray(filteredArticles)
        .slice(0, remainder)
        .sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
        })

    // Concatting to ensure related articles are first in suggestion
    return similarArticles.value.concat(shuffledArray)
})

const postBody = computed(() => getPostBody(post.value?.body))
</script>

<template>
    <Suspense>
        <!-- Main content -->
        <template #default>
            <main class="flex flex-col justify-center">
                <ContentDoc v-slot="{ doc }">
                    <ul>
                        <li v-for="link of doc.body?.toc?.links" :key="link.id">
                            <a :href="`#${link.id}`">{{ link.text }}</a>
                        </li>
                    </ul>

                    <!-- Article -->
                    <article class="prose">
                        <h1 class="text-4xl font-normal mb-4">
                            {{ post?.title }}
                        </h1>
                        <div class="text-gray-600 text-lg mb-10">
                            {{ formatDate(post?.date) }} ·
                            {{ calculateReadingTime(postBody) }}
                            {{ $t('latest.minuteRead') }}
                        </div>
                        <ContentRenderer :value="post" />
                    </article>
                </ContentDoc>

                <Newsletter class="mt-10" />
                <Comments class="mt-10" />

                <Separator class="my-20" />

                <div>
                    <h2 class="mb-6">{{ $t('slug.alsoEnjoy') }}</h2>
                    <ArticleList
                        v-if="suggestedArticles && suggestedArticles.length"
                        :articles="suggestedArticles"
                    />
                </div>
            </main>
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
