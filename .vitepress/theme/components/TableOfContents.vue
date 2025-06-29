<template>
    <aside
        v-if="headings.length > 0"
        class="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 w-64 max-h-[70vh] overflow-y-auto z-10"
    >
        <nav
            class="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4"
        >
            <div class="flex items-center justify-between mb-3">
                <h3
                    class="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center"
                >
                    <svg
                        class="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h7"
                        ></path>
                    </svg>
                    On this page
                </h3>
                <button
                    @click="scrollToTop"
                    class="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                    title="Back to top"
                >
                    <svg
                        class="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                        ></path>
                    </svg>
                </button>
            </div>
            <ul class="space-y-1 text-sm">
                <li
                    v-for="heading in headings"
                    :key="heading.id"
                    :class="getHeadingClass(heading.level)"
                >
                    <a
                        :href="`#${heading.id}`"
                        :class="[
                            'block py-1.5 px-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 border-l-2 border-transparent hover:border-blue-600 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-r',
                            activeHeading === heading.id
                                ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 font-medium bg-blue-50 dark:bg-blue-900/20'
                                : '',
                        ]"
                        @click="scrollToHeading"
                    >
                        {{ heading.text }}
                    </a>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Heading {
    id: string
    text: string
    level: number
}

const headings = ref<Heading[]>([])
const activeHeading = ref<string>('')

const getHeadingClass = (level: number) => {
    const baseClasses = 'relative'
    switch (level) {
        case 2:
            return baseClasses
        case 3:
            return `${baseClasses} ml-4`
        case 4:
            return `${baseClasses} ml-8`
        default:
            return baseClasses
    }
}

const scrollToHeading = (event: Event) => {
    event.preventDefault()
    const target = event.target as HTMLAnchorElement
    const id = target.getAttribute('href')?.slice(1)
    if (id) {
        const element = document.getElementById(id)
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
            const offsetPosition = elementPosition - 120 // Add offset to account for fixed header
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })
        }
    }
}

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })
}

const generateHeadingId = (text: string): string => {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
}

const extractHeadings = () => {
    // Try multiple selectors to find headings
    const selectors = [
        'article h2, article h3, article h4',
        '.vp-doc h2, .vp-doc h3, .vp-doc h4',
        '.prose h2, .prose h3, .prose h4',
        'h2, h3, h4',
    ]

    let headingElements: NodeListOf<Element> | null = null

    for (const selector of selectors) {
        const elements = document.querySelectorAll(selector)
        if (elements.length > 0) {
            headingElements = elements
            break
        }
    }

    // Fallback if no elements found
    if (!headingElements) {
        headingElements = document.querySelectorAll('h2, h3, h4')
    }

    const extractedHeadings: Heading[] = []

    headingElements.forEach(element => {
        const level = parseInt(element.tagName.charAt(1))
        const text = element.textContent?.trim() || ''

        // Clean up text by removing permalink symbols and extra whitespace
        const cleanText = text.replace(/^#\s*/, '').replace(/\s*#$/, '').trim()

        const id = element.id || generateHeadingId(cleanText)

        // Add id to the heading element if it doesn't have one
        if (!element.id) {
            element.id = id
        }

        // Add clickable anchor link if it doesn't exist
        if (!element.querySelector('.header-anchor')) {
            const anchor = document.createElement('a')
            anchor.className = 'header-anchor'
            anchor.href = `#${id}`
            anchor.textContent = '#'
            anchor.addEventListener('click', (e) => {
                e.preventDefault()
                // Copy URL to clipboard
                const url = new URL(window.location.href)
                url.hash = id
                navigator.clipboard.writeText(url.toString()).then(() => {
                    // Optional: Show a toast or feedback that URL was copied
                    console.log('URL copied to clipboard:', url.toString())
                })
                // Also update the browser URL
                window.history.replaceState(null, '', `#${id}`)
            })
            element.appendChild(anchor)
        }

        extractedHeadings.push({ id, text: cleanText, level })
    })

    headings.value = extractedHeadings
}

const updateActiveHeading = () => {
    const headingElements = headings.value
        .map(h => document.getElementById(h.id))
        .filter(Boolean)
    const scrollY = window.scrollY

    let activeId = ''

    for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i]
        if (element) {
            const rect = element.getBoundingClientRect()
            const elementTop = rect.top + scrollY
            
            // Consider a heading active if it's within 150px of the top of the viewport
            if (scrollY >= elementTop - 150) {
                activeId = element.id
                break
            }
        }
    }

    activeHeading.value = activeId
}

let scrollTimeout: NodeJS.Timeout

const handleScroll = () => {
    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(updateActiveHeading, 10)
}

onMounted(() => {
    // Wait for content to be rendered
    setTimeout(() => {
        extractHeadings()
        updateActiveHeading()
    }, 500)

    // Also try again after a longer delay in case content loads slowly
    setTimeout(() => {
        if (headings.value.length === 0) {
            extractHeadings()
            updateActiveHeading()
        }
    }, 1000)

    window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    clearTimeout(scrollTimeout)
})
</script>
