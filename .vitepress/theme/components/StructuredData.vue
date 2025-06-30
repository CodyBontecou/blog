<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useData } from 'vitepress'

const { page, frontmatter } = useData()

const structuredData = computed(() => {
  const baseUrl = 'https://codybontecou.com'
  const pageUrl = `${baseUrl}${page.value.relativePath.replace(/\.md$/, '')}`
  
  if (frontmatter.value.type === 'post') {
    // Blog post schema
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": frontmatter.value.title,
      "description": frontmatter.value.description,
      "author": {
        "@type": "Person",
        "name": frontmatter.value.author?.name || "Cody Bontecou",
        "image": frontmatter.value.author?.image,
        "url": baseUrl
      },
      "publisher": {
        "@type": "Organization",
        "name": "Cody Bontecou",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/apple-touch-icon.png`
        }
      },
      "datePublished": frontmatter.value.date,
      "dateModified": frontmatter.value.last_modified || frontmatter.value.date,
      "url": pageUrl,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": pageUrl
      },
      "image": frontmatter.value.meta?.find(m => m.name === 'og:image')?.content,
      "keywords": frontmatter.value.topics?.join(', '),
      "articleSection": frontmatter.value.category || frontmatter.value.dropdown,
      "inLanguage": "en-US"
    }
  } else {
    // Generic webpage schema
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": frontmatter.value.title || page.value.title,
      "description": frontmatter.value.description,
      "url": pageUrl,
      "author": {
        "@type": "Person",
        "name": "Cody Bontecou",
        "url": baseUrl
      },
      "publisher": {
        "@type": "Organization",
        "name": "Cody Bontecou",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/apple-touch-icon.png`
        }
      },
      "inLanguage": "en-US"
    }
  }
})

// Add structured data to head
function updateStructuredData() {
  if (typeof document === 'undefined') return
  
  // Remove existing structured data
  const existing = document.querySelector('script[type="application/ld+json"]')
  if (existing) {
    existing.remove()
  }
  
  // Add new structured data
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(structuredData.value)
  document.head.appendChild(script)
}

onMounted(() => {
  updateStructuredData()
})

// Watch for page changes
watch([page, frontmatter], () => {
  updateStructuredData()
}, { deep: true })
</script>

<template>
  <!-- This component only manages structured data, no visual output -->
</template>