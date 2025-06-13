<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
    error: Object as () => NuxtError,
})

const config = useRuntimeConfig()

// Set appropriate SEO meta tags for error pages
useSeoMeta({
    title: `${props.error?.statusCode} - ${props.error?.statusMessage || 'Error'}`,
    description: props.error?.statusCode === 404 
        ? 'The page you are looking for could not be found.' 
        : 'An error occurred while loading this page.',
    robots: 'noindex, nofollow',
})

useHead({
    link: [
        {
            rel: 'canonical',
            href: `${config.public.siteUrl}/404`,
        },
    ],
})
</script>

<template>
    <div class="min-h-screen flex items-center justify-center">
        <div class="text-center">
            <h1 class="text-6xl font-bold text-gray-800 mb-4">{{ error?.statusCode }}</h1>
            <p class="text-xl text-gray-600 mb-8">
                {{ error?.statusCode === 404 ? 'Page not found' : error?.statusMessage || 'An error occurred' }}
            </p>
            <NuxtLink to="/" class="text-blue-600 hover:underline">
                ← Go back home
            </NuxtLink>
        </div>
    </div>
</template>
