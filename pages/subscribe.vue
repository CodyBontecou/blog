<script setup lang="ts">
const config = useRuntimeConfig()

useSeoMeta({
    title: 'Subscribe | Cody Bontecou',
    description: 'Subscribe to my newsletter for updates on web development, programming tutorials, and insights on Vue.js, Nuxt, TypeScript, and modern web technologies.',
    ogTitle: 'Subscribe to Newsletter | Cody Bontecou',
    ogDescription: 'Get the latest updates on web development, programming tutorials, and tech insights delivered to your inbox.',
    twitterTitle: 'Subscribe to Newsletter | Cody Bontecou',
    twitterDescription: 'Get the latest updates on web development, programming tutorials, and tech insights delivered to your inbox.',
    twitterCard: 'summary_large_image',
})

useHead({
    title: 'Subscribe | Cody Bontecou',
    htmlAttrs: {
        lang: 'en',
    },
    link: [
        {
            rel: 'canonical',
            href: `${config.public.siteUrl}/subscribe`,
        },
    ],
})

useJsonLd({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Subscribe to Newsletter',
    description: 'Subscribe to receive updates on web development and programming content',
    author: {
        '@type': 'Person',
        name: 'Cody Bontecou',
        url: config.public.siteUrl,
    },
    mainEntity: {
        '@type': 'NewsletterService',
        name: 'Cody Bontecou Newsletter',
        description: 'Weekly updates on web development, programming tutorials, and tech insights',
    }
})
</script>

<template>
    <div class="max-w-2xl mx-auto px-4 py-16">
        <div class="text-center mb-12">
            <h1 class="text-4xl font-bold tracking-tight text-gray-900 mb-4">
                Subscribe to My Newsletter
            </h1>
            <p class="text-lg text-gray-600">
                Get the latest updates on web development, programming tutorials, and tech insights delivered straight to your inbox.
            </p>
        </div>

        <div class="bg-white rounded-lg border border-gray-200 p-8 mb-8">
            <h2 class="text-xl font-semibold mb-4">What You'll Get</h2>
            <ul class="space-y-3 text-gray-600">
                <li class="flex items-start">
                    <span class="text-green-500 mr-2">✓</span>
                    Weekly updates on new blog posts and tutorials
                </li>
                <li class="flex items-start">
                    <span class="text-green-500 mr-2">✓</span>
                    Insights on Vue.js, Nuxt, TypeScript, and modern web development
                </li>
                <li class="flex items-start">
                    <span class="text-green-500 mr-2">✓</span>
                    Tips and tricks for better coding practices
                </li>
                <li class="flex items-start">
                    <span class="text-green-500 mr-2">✓</span>
                    Early access to new projects and experiments
                </li>
                <li class="flex items-start">
                    <span class="text-green-500 mr-2">✓</span>
                    No spam, unsubscribe anytime
                </li>
            </ul>
        </div>

        <div class="bg-gray-50 rounded-lg p-8">
            <Newsletter />
        </div>

        <div class="mt-8 text-center">
            <p class="text-sm text-gray-500">
                Join other developers who are staying up-to-date with the latest in web development.
            </p>
        </div>

        <div class="mt-12 text-center">
            <p class="text-gray-600 mb-4">
                Want to read some content first?
            </p>
            <NuxtLink 
                to="/"
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
                Browse Articles
            </NuxtLink>
        </div>
    </div>
</template>
