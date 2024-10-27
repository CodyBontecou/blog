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

            <p class="text-gray-600 text-xl">
                {{ articleCount }} entries about this topic
            </p>
        </div>

        <div class="space-y-4">
            <article
                v-for="article in articles"
                :key="article._id"
                class="flex items-baseline gap-8"
            >
                <!-- Date -->
                <div class="w-24 text-gray-500 font-normal">
                    {{ new Date(article.date).getFullYear() }} ·
                    {{
                        new Date(article.date).getMonth() +
                        (1).toString().padStart(2, '0')
                    }}
                </div>

                <!-- Title -->
                <NuxtLink :to="article._path" class="text-xl hover:underline">
                    {{ article.title }}
                </NuxtLink>
            </article>
        </div>
    </main>
</template>
