<script setup lang="ts">
import { formatPostDate } from '~/lib/utils/formatPostDate'
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
            class="flex items-baseline leading-tight mb-1 min-w-0 overflow-hidden"
        >
            <div
                class="flex-shrink-0 text-gray-600 text-md pr-3 sm:pr-6 font-mono whitespace-nowrap"
            >
                {{ formatPostDate(article.created_at) }}
            </div>
            <NuxtLink
                :to="article._path"
                class="opacity-90 hover:opacity-50 hover:underline text-lg truncate block"
            >
                {{ article.title }}
            </NuxtLink>
        </li>
    </ul>
</template>
