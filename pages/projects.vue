<script setup lang="ts">
const config = useRuntimeConfig()

useSeoMeta({
    title: 'Projects | Cody Bontecou',
    description: 'Explore my software development projects including web applications, open source contributions, and technical experiments. Built with Vue.js, Nuxt, TypeScript, and more.',
    ogTitle: 'Projects | Cody Bontecou',
    ogDescription: 'Explore my software development projects including web applications, open source contributions, and technical experiments.',
    twitterTitle: 'Projects | Cody Bontecou',
    twitterDescription: 'Explore my software development projects including web applications, open source contributions, and technical experiments.',
    twitterCard: 'summary_large_image',
})

useHead({
    title: 'Projects | Cody Bontecou',
    htmlAttrs: {
        lang: 'en',
    },
    link: [
        {
            rel: 'canonical',
            href: `${config.public.siteUrl}/projects`,
        },
    ],
})

useJsonLd({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Projects by Cody Bontecou',
    description: 'A collection of software development projects and technical experiments',
    author: {
        '@type': 'Person',
        name: 'Cody Bontecou',
        url: config.public.siteUrl,
    },
    mainEntity: {
        '@type': 'ItemList',
        name: 'Software Projects',
        description: 'Collection of web applications and development projects',
    }
})
</script>

<template>
    <div class="max-w-4xl mx-auto px-4 py-16">
        <div class="mb-8">
            <h1 class="text-4xl font-bold tracking-tight text-gray-900 mb-4">
                Projects
            </h1>
            <p class="text-lg text-gray-600">
                Here are some of the projects I've worked on, ranging from web applications to open source contributions.
            </p>
        </div>

        <div class="grid gap-8 md:grid-cols-2">
            <div class="bg-white rounded-lg border border-gray-200 p-6">
                <h2 class="text-xl font-semibold mb-3">Blog Platform</h2>
                <p class="text-gray-600 mb-4">
                    This very blog you're reading, built with Nuxt Content and deployed on Vercel. Features markdown content management, SEO optimization, and responsive design.
                </p>
                <div class="flex gap-2 flex-wrap">
                    <span class="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">Nuxt.js</span>
                    <span class="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">TypeScript</span>
                    <span class="px-2 py-1 bg-purple-100 text-purple-800 text-sm rounded">Tailwind CSS</span>
                </div>
            </div>

            <div class="bg-white rounded-lg border border-gray-200 p-6">
                <h2 class="text-xl font-semibold mb-3">Coming Soon</h2>
                <p class="text-gray-600 mb-4">
                    More projects will be added here as I continue building and experimenting with new technologies.
                </p>
                <div class="flex gap-2 flex-wrap">
                    <span class="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">In Development</span>
                </div>
            </div>
        </div>

        <div class="mt-12 text-center">
            <p class="text-gray-600 mb-4">
                Want to see more of my work?
            </p>
            <div class="flex justify-center gap-4">
                <a 
                    href="https://github.com/CodyBontecou" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                    View on GitHub
                </a>
                <NuxtLink 
                    to="/about"
                    class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800"
                >
                    Learn More About Me
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
