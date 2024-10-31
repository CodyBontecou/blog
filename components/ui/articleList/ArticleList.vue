<script setup lang="ts">
import { formatPostDate } from '@/lib/utils/formatPostDate'
import type { ParsedContent } from '@nuxt/content'

interface Props {
    articles: ParsedContent[] | ComputedRef<ParsedContent[]>
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
                class="opacity-90 hover:opacity-50 underline text-lg"
            >
                {{ article.title }}
            </NuxtLink>
        </li>
    </ul>
</template>
