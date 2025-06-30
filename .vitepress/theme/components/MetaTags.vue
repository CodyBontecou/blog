<script setup lang="ts">
import { useData } from 'vitepress'
import { computed, onMounted } from 'vue'

const { page, frontmatter } = useData()

const baseUrl = 'https://codybontecou.com'

// Generate canonical URL
const canonicalUrl = computed(() => {
  const path = page.value.relativePath.replace(/\.md$/, '')
  return path === 'index' ? baseUrl : `${baseUrl}/${path}`
})

// Generate meta description
const metaDescription = computed(() => {
  if (frontmatter.value.description) {
    return frontmatter.value.description
  }
  
  return 'Personal blog and portfolio of Cody Bontecou - Web development, JavaScript, TypeScript, Vue, and technical writing.'
})

// Generate page title
const pageTitle = computed(() => {
  const title = frontmatter.value.title || page.value.title
  if (title && title !== 'Cody Bontecou') {
    return `${title} | Cody Bontecou`
  }
  return 'Cody Bontecou - Web Developer & Technical Writer'
})

// Generate Open Graph image
const ogImage = computed(() => {
  const customImage = frontmatter.value.meta?.find(m => m.name === 'og:image')?.content
  if (customImage) return customImage
  
  return `${baseUrl}/apple-touch-icon.png`
})

// Update meta tags on mount and when page changes
onMounted(() => {
  updateMetaTags()
})

function updateMetaTags() {
  // Update document title
  if (typeof document !== 'undefined') {
    document.title = pageTitle.value
    
    // Update or create meta description
    updateMetaTag('name', 'description', metaDescription.value)
    
    // Update Open Graph tags
    updateMetaTag('property', 'og:title', pageTitle.value)
    updateMetaTag('property', 'og:description', metaDescription.value)
    updateMetaTag('property', 'og:image', ogImage.value)
    updateMetaTag('property', 'og:url', canonicalUrl.value)
    
    // Update Twitter Card tags
    updateMetaTag('name', 'twitter:title', pageTitle.value)
    updateMetaTag('name', 'twitter:description', metaDescription.value)
    updateMetaTag('name', 'twitter:image', ogImage.value)
    
    // Update canonical link
    updateCanonicalLink(canonicalUrl.value)
  }
}

function updateMetaTag(attribute: string, name: string, content: string) {
  if (typeof document === 'undefined') return
  
  let meta = document.querySelector(`meta[${attribute}="${name}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute(attribute, name)
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', content)
}

function updateCanonicalLink(href: string) {
  if (typeof document === 'undefined') return
  
  let canonical = document.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', href)
}
</script>

<template>
  <!-- This component only manages meta tags, no visual output -->
</template>