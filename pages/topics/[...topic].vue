<script setup lang="ts">
const route = useRoute()
const topic = route.params.topic[0]

const { data: articles } = await useAsyncData(`post-${route.path}`, () =>
    queryContent()
        .where({ topics: { $contains: topic } })
        .find()
)

const articleCount = articles.value ? articles.value.length : 0
</script>

<template>
    <main class="max-w-3xl mx-auto py-8 px-4">
        <div class="mb-12">
            <h1 class="text-4xl font-normal mb-8">
                <span class="text-gray-500">Topics / </span>
                <span>{{ capitalizeFirstLetter(topic) }}</span>
            </h1>

            <p class="text-gray-600 text-lg">
                {{ articleCount }} entries about this topic
            </p>
        </div>

        <ul class="">
            <li
                v-for="article in articles"
                :key="article._path"
                class="flex items-center"
            >
                <div class="flex-shrink-0 text-gray-600 text-md pr-6">
                    {{ formatPostDate(article.date) }}
                </div>
                <NuxtLink
                    :to="article._path"
                    class="hover:opacity-75 underline text-lg"
                >
                    {{ article.title }}
                </NuxtLink>
            </li>
        </ul>
    </main>
</template>
