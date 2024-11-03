<script setup lang="ts">
import { formatPostDate } from '@/lib/utils/formatPostDate'
import type { ParsedContent } from '@nuxt/content'

interface Props {
    articles: globalThis.ComputedRef<ParsedContent[]>
}

defineProps<Props>()
</script>

<template>
    <ul>
        <li
            v-for="article in articles"
            :key="article.title"
            class="flex items-baseline leading-tight mb-1"
        >
            <div class="flex-shrink-0 text-gray-600 text-md pr-6 font-mono">
                {{ formatPostDate(article.date) }}
            </div>
            <NuxtLink
                :to="article._path"
                class="opacity-90 hover:opacity-50 hover:underline text-lg truncate"
            >
                {{ article.title }}
            </NuxtLink>
        </li>
    </ul>
</template>
