<template>
    <aside v-if="headings.length > 0">
        <nav>
            <div>
                <h3>On this page</h3>
                <button @click="scrollToTop" title="Back to top">
                    ↑
                </button>
            </div>
            <ul>
                <li v-for="heading in headings" :key="heading.id">
                    <a :href="`#${heading.id}`" @click="scrollToHeading">
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
