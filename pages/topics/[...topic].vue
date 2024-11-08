<script setup lang="ts">
import { capitalizeFirstLetter } from '~/lib/utils/capitalizeFirstLetter'

const route = useRoute()
const topic = route.params.topic[0]

const { data: articles } = await useAsyncData(`post-${route.path}`, () =>
    queryContent()
        .where({
            topics: {
                $containsAny: [
                    topic.toLowerCase(),
                    capitalizeFirstLetter(topic),
                    topic,
                ],
            },
        })
        .sort({ date: -1 })
        .find()
)

const articleCount = articles.value ? articles.value.length : 0
</script>

<template>
    <div class="max-w-3xl mx-auto py-8 px-4">
        <TopNav />

        <main>
            <div class="mb-12">
                <h1 class="text-4xl font-normal mb-8">
                    <span class="text-gray-500">Topics / </span>
                    <span>{{ capitalizeFirstLetter(topic) }}</span>
                </h1>

                <p class="text-gray-600 text-lg">
                    {{ articleCount }} entries about this topic
                </p>
            </div>

            <ArticleList :articles="articles" />
        </main>
    </div>
</template>
