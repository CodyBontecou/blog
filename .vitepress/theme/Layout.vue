<template>
    <div v-if="frontmatter.layout === 'home'">
        <HomeLayout />
    </div>
    <div
        v-else-if="frontmatter.layout === 'blog'"
        class="max-w-3xl mx-auto py-8 px-4"
    >
        <div class="max-w-lg mx-auto mb-16 lg:max-w-3xl">
            <TopNav />
            <BlogLayout />
        </div>
    </div>
    <div v-else-if="frontmatter.layout === 'topic'">
        <TopicLayout />
    </div>
    <div v-else-if="frontmatter.layout === 'topics-index'">
        <TopicsIndexLayout />
    </div>
    <div v-else class="max-w-3xl mx-auto py-8 px-4">
        <div class="max-w-lg mx-auto mb-16 lg:max-w-3xl">
            <TopNav />

            <!-- Blog post with header -->
            <div v-if="isBlogPost">
                <Breadcrumb :items="breadcrumbItems" />

                <article
                    class="prose lg:prose-lg max-w-none dark:prose-invert prose-code:before:content-none prose-code:after:content-none prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded dark:prose-code:bg-gray-800 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-blue-400 prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:px-4 prose-blockquote:py-2 dark:prose-blockquote:bg-gray-800 dark:prose-blockquote:border-l-blue-400"
                >
                    <!-- Article Header -->
                    <h1 class="text-4xl font-normal mb-4">
                        {{ frontmatter.title }}
                    </h1>
                    <div
                        class="text-gray-600 text-base sm:text-lg flex flex-wrap items-center gap-x-2 mb-10"
                    >
                        <span class="whitespace-nowrap">
                            {{
                                formatDate(
                                    frontmatter.created_at || frontmatter.date
                                )
                            }}
                        </span>

                        <div
                            class="flex flex-wrap gap-x-2 gap-y-1 mt-1 sm:mt-0"
                        >
                            <a
                                :href="`/topics/${topic.toLowerCase()}`"
                                class="text-gray-600 topics hover:underline cursor-pointer"
                                v-for="(topic, index) in frontmatter.topics"
                                :key="topic"
                            >
                                {{ topic.toLowerCase()
                                }}<span
                                    v-if="
                                        index !== frontmatter.topics.length - 1
                                    "
                                    >,</span
                                >
                            </a>
                        </div>
                    </div>

                    <!-- Audio Player -->
                    <div class="not-prose mb-8">
                        <AudioPlayer
                            :audioSrc="audioSrc"
                            :title="frontmatter.title"
                        />
                    </div>

                    <Content :key="route.path" />

                    <!-- Newsletter and Comments for blog posts -->
                    <div class="not-prose mt-12">
                        <Newsletter />
                        <Comments />
                    </div>
                </article>

                <!-- Table of Contents for blog posts -->
                <TableOfContents v-if="isBlogPost" />
            </div>

            <!-- Regular page without header -->
            <article
                v-else
                class="prose lg:prose-lg max-w-none dark:prose-invert prose-code:before:content-none prose-code:after:content-none prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded dark:prose-code:bg-gray-800 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-blue-400 prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:px-4 prose-blockquote:py-2 dark:prose-blockquote:bg-gray-800 dark:prose-blockquote:border-l-blue-400"
            >
                <Content :key="route.path" />
            </article>

            <!-- Table of Contents for regular pages -->
            <TableOfContents v-if="!isBlogPost" />
        </div>
    </div>

    <!-- Toast notifications -->
    <ToastProvider>
        <Toaster />
    </ToastProvider>
</template>

<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import { computed, onMounted, nextTick } from 'vue'
import TopNav from './components/TopNav.vue'
import HomeLayout from './components/HomeLayout.vue'
import BlogLayout from './components/BlogLayout.vue'
import TopicLayout from './components/TopicLayout.vue'
import TopicsIndexLayout from './components/TopicsIndexLayout.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import TableOfContents from './components/TableOfContents.vue'
import Newsletter from './components/NewsletterWrapper.vue'
import Comments from './components/Comments.vue'
import AudioPlayer from '../../components/ui/AudioPlayer.vue'
import { calculateReadingTime } from './utils/index.ts'
// import ToastProvider from '../../components/ui/toast/ToastProvider.vue'
// import Toaster from '../../components/ui/toast/Toaster.vue'
import { useCopyCodeEnhancement } from './copyCodeEnhancement'
// import { useToast } from '../../components/ui/toast/use-toast'
const { page, frontmatter } = useData()
const route = useRoute()
// const { toast } = useToast()

// Initialize copy code enhancement
useCopyCodeEnhancement()

// Listen for copy toast events (temporarily disabled)
// onMounted(() => {
//   const handleCopyToast = () => {
//     toast({
//       title: "Copied to clipboard",
//       description: "Code snippet has been copied to your clipboard.",
//       duration: 2000,
//     })
//   }
//
//   window.addEventListener('show-copy-toast', handleCopyToast)
//
//   // Cleanup
//   return () => {
//     window.removeEventListener('show-copy-toast', handleCopyToast)
//   }
// })

// Check if this is a blog post (has title, created_at/date, and topics)
const isBlogPost = computed(() => {
    return (
        frontmatter.value.title &&
        (frontmatter.value.created_at || frontmatter.value.date) &&
        frontmatter.value.topics
    )
})

// Calculate reading time for blog posts
const readingTime = computed(() => {
    if (!isBlogPost.value) return 0

    // Use the markdown content from page data
    const content = page.value?.content || page.value?.src || ''
    if (!content) {
        // Fallback: estimate based on typical article length
        return 3
    }

    // Simple reading time calculation
    const wordsPerMinute = 200
    const words = content
        .trim()
        .split(/\s+/)
        .filter(word => word.length > 0).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return minutes || 1 // At least 1 minute
})

// Generate breadcrumbs for blog posts
const breadcrumbItems = computed(() => {
    if (!isBlogPost.value) return []

    const items = [{ name: 'home', path: '/' }]

    // Add first topic if available
    if (frontmatter.value.topics?.length) {
        items.push({
            name: frontmatter.value.topics[0].toLowerCase(),
            path: `/topics/${frontmatter.value.topics[0].toLowerCase()}`,
        })
    }

    // Add current post
    items.push({
        name: frontmatter.value.title.toLowerCase(),
        isActive: true,
    })

    return items
})

// Format date
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

// Generate audio source path from the current route
const audioSrc = computed(() => {
    if (!isBlogPost.value) return ''

    // Convert the current route path to an audio file path
    const routePath = route.path
    const filename = routePath.split('/').pop() || 'unknown'
    const slug = filename.replace(/\.html$/, '')

    return `/audio/${slug}.mp3`
})
</script>
