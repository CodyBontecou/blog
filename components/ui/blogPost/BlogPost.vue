<script setup lang="ts">
import { formatDate } from '~/lib/utils/formatDate'
import { shuffleArray } from '~/lib/utils/shuffleArray'
import { calculateReadingTime } from '~/lib/utils/calculateReadingTime'
import { getPostBody } from '~/lib/utils/getPostBody'
import type { ParsedContent } from '@nuxt/content'

// Get the current route params
const { path } = useRoute()

// Fetch the post data
const { data: post } = await useAsyncData(`post-${path}`, () =>
    queryContent(path).findOne()
)

// Extract topics and create an array of queries
const postTopics: string[] = post.value?.topics

const { data: allArticles } = await useAsyncData('allArticles', () =>
    queryContent('/')
        .sort({ date: -1 })
        .where({ draft: { $ne: true }, ignore: { $ne: true } })
        .find()
)

const similarArticles = computed(() => {
    return allArticles.value
        .filter(article => {
            // Skip if it's the same article
            if (article.title === post.value.title) return false

            // Handle cases where topics might be undefined/null
            const articleTopics = article.topics || []
            const currentPostTopics = postTopics || []

            // Only check topic overlap if both articles have topics
            return (
                articleTopics.length > 0 &&
                currentPostTopics.length > 0 &&
                articleTopics.some((topic: string) =>
                    currentPostTopics.includes(topic)
                )
            )
        })
        .slice(0, 5)
})

/*
Return similar if there are 5
Otherwise randomly inserts additional articles
*/
const suggestedArticles = computed<ParsedContent[]>(() => {
    const suggestedLength = 5

    if (similarArticles.value.length === suggestedLength) {
        return similarArticles.value
    }

    // Remaining amount that we need to randomly find
    const remainder = suggestedLength - similarArticles.value.length

    /*
    Making sure none of the randomly selected articles are the same as
    the similarArticles
    */
    const filteredArticles = allArticles.value.filter(
        article =>
            !similarArticles.value.map(a => a.title).includes(article.title)
    )

    /*
    Shuffling filteredArticles array to ensure added articles are random
    getting the remainder of the suggested article length
    then sorting the array to
    */
    const shuffledArray = shuffleArray(filteredArticles)
        .slice(0, remainder)
        .sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
        })

    // Concatting to ensure related articles are first in suggestion
    return similarArticles.value.concat(shuffledArray)
})

const postBody = computed(() => getPostBody(post.value?.body))

// TableOfContents
const isMobileMenuOpen = ref(false)
const activeSection = ref('')
const observer = ref<IntersectionObserver | null>(null)
const tocLinks = ref<string[]>([])

// Get all headings from the article
const headings = computed(() => {
    if (!post.value?.body?.toc?.links) return []
    return post.value.body.toc.links
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
            class="hidden lg:block fixed right-8 top-32 w-64 max-h-[calc(100vh-200px)] overflow-y-auto"
        >
            <Suspense>
                <template #default>
                    <nav class="toc">
                        <h2 class="text-lg font-semibold mb-4">On this page</h2>
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
            @click="isMobileMenuOpen = true"
            class="lg:hidden fixed right-4 bottom-4 z-20 rounded-full w-10 h-10 bg-white shadow transition-colors duration-200"
            aria-label="Open table of contents"
        >
            <Icon
                name="material-symbols-light:menu-book-outline"
                class=""
            ></Icon>
        </button>

        <!-- Mobile TOC Overlay -->
        <Transition
            enter-active-class="transition-opacity duration-200"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="isMobileMenuOpen"
                class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                @click="isMobileMenuOpen = false"
            />
        </Transition>

        <!-- Mobile TOC Drawer -->
        <Transition
            enter-active-class="transition-transform duration-300 ease-out"
            enter-from-class="translate-y-full"
            enter-to-class="translate-y-0"
            leave-active-class="transition-transform duration-200 ease-in"
            leave-from-class="translate-y-0"
            leave-to-class="translate-y-full"
        >
            <div
                v-if="isMobileMenuOpen"
                class="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white rounded-t-xl shadow-lg max-h-[75vh] overflow-y-auto"
            >
                <div
                    class="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between"
                >
                    <h2 class="text-lg font-semibold">On this page</h2>
                    <button
                        @click="isMobileMenuOpen = false"
                        class="p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        aria-label="Close table of contents"
                    >
                        <X class="w-6 h-6" />
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
                                            'bg-indigo-50 text-indigo-600':
                                                activeSection === link.id,
                                            'hover:bg-gray-50':
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
                        <article class="prose lg:prose-lg">
                            <h1 class="text-4xl font-normal mb-4">
                                {{ post?.title }}
                            </h1>
                            <div class="text-gray-600 text-lg mb-10">
                                {{ formatDate(post?.date) }} ·
                                {{ calculateReadingTime(postBody) }}
                                {{ $t('latest.minuteRead') }}
                            </div>
                            <ContentRenderer :value="post" />
                        </article>
                    </ContentDoc>

                    <Newsletter class="mt-10 w-2/3" />
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
