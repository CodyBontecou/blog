<script setup lang="ts">
import { formatDate } from '@/lib/utils/formatDate'
import { shuffleArray } from '@/lib/utils/shuffleArray'

// Get the current route params
const { path } = useRoute()

// Fetch the post data
const { data: post } = await useAsyncData(`post-${path}`, () =>
    queryContent(path).findOne()
)

// Extract topics and create an array of queries
const postTopics: string[] = post.value.topics

const { data: allArticles } = await useAsyncData('allArticles', () =>
    queryContent().find()
)

const similarArticles = computed(() => {
    return allArticles.value
        .filter(
            article =>
                article.title !== post.value.title &&
                article.topics.some((topic: string) =>
                    postTopics.includes(topic)
                )
        )
        .slice(0, 5)
})

/*
Return similar if there are 5
Otherwise randomly inserts additional articles
*/
const suggestedArticles = computed(() => {
    const suggestedLength = 5

    if (similarArticles.value.length === suggestedLength) return similarArticles

    // Remaining amount that we need to randomly find
    const remainder = suggestedLength - similarArticles.value.length

    /*
    Making sure none of the randomly selected articles are the same as
    the similarArticles
    */
    const filteredArticles = allArticles.value.filter(
        article =>
            // similarArticles.value.some(a => a.title !== article.title)
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
</script>

<!-- pages/posts/[...slug].vue -->
<template>
    <div class="max-w-3xl mx-auto py-8 px-4">
        <TopNav />

        <main>
            <!-- Article -->
            <article class="">
                <h1 class="text-4xl font-normal mb-4">{{ post.title }}</h1>
                <div class="text-gray-600 text-lg mb-10">
                    {{ formatDate(post.date) }} · {{ post.readingTime }} minute
                    read
                </div>
                <ContentRenderer :value="post" />
            </article>

            <Separator class="my-20" />

            <div>
                <h2>You might also enjoy</h2>
                <ArticleList :articles="suggestedArticles" />
            </div>
        </main>
    </div>
</template>
