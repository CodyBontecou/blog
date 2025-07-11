<script setup lang="ts">
import { formatDate } from '~/lib/utils/formatDate'
import { shuffleArray } from '~/lib/utils/shuffleArray'
import { calculateReadingTime } from '~/lib/utils/calculateReadingTime'
import { getPostBody } from '~/lib/utils/getPostBody'
import type { ParsedContent } from '@nuxt/content'

// Get the current route params
const route = useRoute()

// Get post data from the parent page
const post = await queryContent(route.path).findOne()

const postTopics = computed(() => (post?.topics as string[]) || [])

const { data: allArticles } = await useAsyncData(
    'allArticles',
    async () => {
        const all = await queryContent('/') // Ensure you are querying the correct path
            .sort({ created_at: -1 })
            .where({ draft: { $ne: true } })
            .find()

        if (!post) {
            return all // Return all if the post data isn't available yet (shouldn't happen often)
        }

        const similar = all
            .filter(article => {
                if (article.title === post?.title) return false
                const articleTopics = article.topics || []
                const currentPostTopics = postTopics.value || []
                return (
                    articleTopics.length > 0 &&
                    currentPostTopics.length > 0 &&
                    articleTopics.some((topic: string) =>
                        currentPostTopics.includes(topic)
                    )
                )
            })
            .slice(0, 5)

        // For the remaining slots, we can't do true random on the server.
        // A simple approach is to take the next few articles based on the existing sort order.
        const remainder = 5 - similar.length
        const additional = all
            .filter(
                article =>
                    !similar.map(a => a.title).includes(article.title) &&
                    article.title !== post?.title
            )
            .slice(5, 5 + remainder) // Take articles after the initial 5 (excluding similar)

        return [...similar, ...additional].slice(0, 5) // Combine and ensure max 5
    },
    {
        // Pass the post title as a key dependency to re-run when the post loads
        watch: [() => post?.title],
    }
)

const suggestedArticles = computed(() => allArticles.value)

const postBody = computed(() => getPostBody(post?.body))

// TableOfContents
const isMobileMenuOpen = ref(false)
const activeSection = ref('')
const observer = ref<IntersectionObserver | null>(null)
const tocLinks = ref<string[]>([])

// Get all headings from the article
const headings = computed(() => {
    if (!post?.body?.toc?.links) return []
    return post.body.toc.links
})

onMounted(() => {
    // Store all section IDs
    tocLinks.value = headings.value.map(link => link.id)

    observer.value = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    activeSection.value = entry.target.id
                }
            })
        },
        {
            rootMargin: '-10% 0% -85% 0%',
            threshold: 0,
        }
    )

    tocLinks.value.forEach(id => {
        const element = document.getElementById(id)
        if (element) observer.value?.observe(element)
    })
})

onUnmounted(() => {
    if (observer.value) {
        observer.value.disconnect()
    }
})

const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        isMobileMenuOpen.value = false // Close menu after selection
    }
}

// Prevent body scroll when mobile menu is open
watch(isMobileMenuOpen, newValue => {
    if (newValue) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = ''
    }
})
</script>
<template>
    <div class="relative">
        <!-- Table of Contents -->
        <aside
            v-if="headings.length"
            class="hidden xl:block fixed right-8 top-32 w-64 max-h-[calc(100vh-200px)] overflow-y-auto"
        >
            <Suspense>
                <template #default>
                    <nav class="toc">
                        <h2 class="font-medium mb-4">On this page</h2>
                        <ul class="space-y-3">
                            <li
                                v-for="link in headings"
                                :key="link.id"
                                class="text-sm"
                            >
                                <a
                                    :href="`#${link.id}`"
                                    @click.prevent="scrollToSection(link.id)"
                                    :class="{
                                        'text-primary hover:text-primary-dark transition-colors duration-200': true,
                                        'text-indigo-600 font-medium':
                                            activeSection === link.id,
                                        'text-gray-600 hover:text-gray-900':
                                            activeSection !== link.id,
                                    }"
                                >
                                    {{ link.text }}
                                </a>
                            </li>
                        </ul>
                    </nav>
                </template>
                <template #fallback>
                    <div class="animate-pulse">
                        <div class="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div class="space-y-3">
                            <div class="h-4 bg-gray-200 rounded w-5/6"></div>
                            <div class="h-4 bg-gray-200 rounded w-4/6"></div>
                            <div class="h-4 bg-gray-200 rounded w-3/6"></div>
                        </div>
                    </div>
                </template>
            </Suspense>
        </aside>

        <!-- Mobile TOC Button (hidden on desktop) -->
        <button
            v-if="headings.length"
            @click="isMobileMenuOpen = true"
            class="xl:hidden flex items-center justify-center fixed right-4 bottom-4 z-20 rounded-full p-3 bg-white shadow transition-colors duration-200"
            aria-label="Open table of contents"
        >
            <Icon name="material-symbols:menu-book-outline" class="w-6 h-6" />
        </button>

        <!-- Mobile TOC Overlay -->
        <Transition
            v-if="headings.length"
            enter-active-class="transition-opacity duration-200"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="isMobileMenuOpen"
                class="xl:hidden fixed bottom-0 inset-x-0 z-40 bg-white rounded-t-xl shadow-lg max-h-[75vh] overflow-y-auto"
            />
        </Transition>

        <!-- Mobile TOC Drawer -->
        <Transition
            v-if="headings.length"
            enter-active-class="transition-transform duration-300 ease-out"
            enter-from-class="translate-y-full"
            enter-to-class="translate-y-0"
            leave-active-class="transition-transform duration-200 ease-in"
            leave-from-class="translate-y-0"
            leave-to-class="translate-y-full"
        >
            <div
                v-if="isMobileMenuOpen"
                class="xl:hidden fixed bottom-0 inset-x-0 z-40 bg-white rounded-t-xl shadow-lg max-h-[75vh] overflow-y-auto"
            >
                <div
                    class="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between"
                >
                    <h2 class="font-medium">On this page</h2>
                    <button
                        @click="isMobileMenuOpen = false"
                        class="p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        aria-label="Close table of contents"
                    >
                        <Icon name="material-symbols:close" class="w-6 h-6" />
                    </button>
                </div>

                <nav class="p-4">
                    <Suspense>
                        <template #default>
                            <ul class="space-y-4">
                                <li v-for="link in headings" :key="link.id">
                                    <a
                                        :href="`#${link.id}`"
                                        @click.prevent="
                                            scrollToSection(link.id)
                                        "
                                        class="block py-2 px-3 rounded-lg transition-colors duration-200"
                                        :class="{
                                            'bg-gray-100 font-semibold':
                                                activeSection === link.id,
                                            'hover:bg-gray-100':
                                                activeSection !== link.id,
                                        }"
                                    >
                                        {{ link.text }}
                                    </a>
                                </li>
                            </ul>
                        </template>
                        <template #fallback>
                            <div class="animate-pulse space-y-4">
                                <div class="h-10 bg-gray-200 rounded-lg"></div>
                                <div class="h-10 bg-gray-200 rounded-lg"></div>
                                <div class="h-10 bg-gray-200 rounded-lg"></div>
                            </div>
                        </template>
                    </Suspense>
                </nav>
            </div>
        </Transition>

        <!-- Main Content -->
        <Suspense>
            <!-- Main content -->
            <template #default>
                <main class="flex flex-col justify-center max-w-3xl mx-auto">
                    <ContentDoc v-slot="{ doc }">
                        <h1 class="text-4xl font-normal mb-4">
                            {{ post?.title }}
                        </h1>
                        <div class="text-gray-600 text-base sm:text-lg flex flex-wrap items-center gap-x-2 mb-10">
                            <span class="whitespace-nowrap">
                                {{ formatDate(post?.created_at) }} ·
                                {{ calculateReadingTime(postBody) }}
                                {{ $t('latest.minuteRead') }}
                            </span>
                            <span class="hidden sm:inline">·</span>
                            <div class="flex flex-wrap gap-x-2 gap-y-1 mt-1 sm:mt-0">
                                <NuxtLink
                                    class="text-gray-600 topics hover:underline"
                                    v-for="(topic, index) in post?.topics"
                                    :to="'/topics/' + topic.toLowerCase()"
                                >{{ topic.toLowerCase() }}<span v-if="index !== post?.topics.length - 1">,</span>
                                </NuxtLink>
                            </div>
                        </div>

                        <article class="prose prose-slate lg:prose-lg xl:prose-xl max-w-none dark:prose-invert prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-code:before:content-none prose-code:after:content-none prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded dark:prose-code:bg-gray-800 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-blue-400 prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:px-4 prose-blockquote:py-2 dark:prose-blockquote:bg-gray-800 dark:prose-blockquote:border-l-blue-400">
                            <ContentRenderer :value="post" />
                        </article>
                    </ContentDoc>

                    <Newsletter class="mt-10 lg:w-2/3" />
                    <Comments class="mt-10" />

                    <Separator class="my-20" />

                    <div>
                        <h2 class="mb-6">{{ $t('slug.alsoEnjoy') }}</h2>
                        <ArticleList
                            v-if="suggestedArticles && suggestedArticles.length"
                            :articles="suggestedArticles"
                        />
                    </div>
                </main>
            </template>

            <!-- Loading state -->
            <template #fallback>
                <div class="animate-pulse max-w-3xl mx-auto">
                    <div class="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div class="h-4 bg-gray-200 rounded w-1/4 mb-10"></div>
                    <div class="space-y-4">
                        <div class="h-4 bg-gray-200 rounded"></div>
                        <div class="h-4 bg-gray-200 rounded"></div>
                        <div class="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                </div>
            </template>
        </Suspense>
    </div>
</template>

<style scoped>
.toc {
    border-left: 2px solid #e5e7eb;
    padding-left: 1rem;
}

/* Smooth scrolling for the whole page */
html {
    scroll-behavior: smooth;
}

/* Hide scrollbar but keep functionality */
.toc::-webkit-scrollbar {
    display: none;
}
.toc {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.mobile-toc-overlay-enter-active,
.mobile-toc-overlay-leave-active {
    transition: opacity 0.2s ease;
}

.mobile-toc-overlay-enter-from,
.mobile-toc-overlay-leave-to {
    opacity: 0;
}

/* Prevent content shift when scrollbar disappears */
.overflow-hidden {
    padding-right: var(--scrollbar-width, 0px);
}
</style>
