<script setup lang="ts">
import { capitalizeFirstLetter } from '@/lib/utils/capitalizeFirstLetter'

const route = useRoute()
const topic = route.params.topic[0]

const { data: articles } = await useAsyncData(`post-${route.path}`, () =>
    queryContent()
        .where({ topics: { $contains: topic } })
        .sort({ date: -1 })
        .find()
)

const articleCount = articles.value ? articles.value.length : 0
</script>

<template>
    <div class="max-w-3xl mx-auto py-8 px-4">
        <!-- Header -->
        <header class="flex justify-between items-center mb-16">
            <h1 class="">
                <NuxtLink to="/" class="hover:opacity-75">
                    Cody Bontecou
                </NuxtLink>
            </h1>
            <nav class="flex gap-6 text-gray-600">
                <NuxtLink to="/about"> Articles </NuxtLink>
                <NuxtLink to="/now"> Learn more </NuxtLink>
            </nav>
        </header>

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
