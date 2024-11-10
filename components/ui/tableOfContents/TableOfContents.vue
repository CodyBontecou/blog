<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

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

    // Create intersection observer
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

    // Observe all section headings
    tocLinks.value.forEach(id => {
        const element = document.getElementById(id)
        if (element) observer.value?.observe(element)
    })
})

onUnmounted(() => {
    // Cleanup observer
    if (observer.value) {
        observer.value.disconnect()
    }
})

const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
    }
}
</script>

<template>
    <aside
        class="hidden lg:block fixed right-8 top-32 w-64 max-h-[calc(100vh-200px)] overflow-y-auto"
    >
        <nav class="toc">
            <h2 class="text-lg font-semibold mb-4">On this page</h2>
            <ul class="space-y-3">
                <li v-for="link in headings" :key="link.id" class="text-sm">
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
    </aside>

    <!-- Main content needs to be updated to work with the observer -->
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
</style>
