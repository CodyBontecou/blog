<script setup lang="ts">
interface Props {
    articles: Article[]
}

interface Article {}

defineProps<Props>()
</script>

<template>
    <ul>
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
</template>
