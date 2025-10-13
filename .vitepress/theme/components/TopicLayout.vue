<template>
  <div>
    <main>
      <div>
        <TopNav />

        <Breadcrumb :items="breadcrumbItems" />

        <div>
          <h1>
            <span>Topics / </span>
            <span>{{ capitalizedTopic }}</span>
          </h1>

          <p>
            {{ articleCount }} {{ articleCount === 1 ? 'article' : 'articles' }} about {{ capitalizedTopic.toLowerCase() }}
          </p>

          <div v-if="relatedTopics.length > 0">
            <h2>Related Topics</h2>
            <div>
              <a
                v-for="relatedTopic in relatedTopics"
                :key="relatedTopic"
                :href="`/topics/${relatedTopic}/`"
              >
                {{ capitalizeFirstLetter(relatedTopic) }}
              </a>
            </div>
          </div>
        </div>

        <div v-if="filteredArticles.length === 0">
          <p>No articles found for this topic yet.</p>
          <p>
            <a href="/">← Back to all posts</a>
          </p>
        </div>

        <ArticleList v-else :articles="filteredArticles" />

        <div v-if="filteredArticles.length > 0">
          <p>
            Explore more topics:
            <a href="/topics/">View all topics</a>
            or
            <a href="/">browse all articles</a>
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useData, useRoute } from 'vitepress'
import { data as posts } from '../posts.data'
import { capitalizeFirstLetter, getArticlesByTopic, getTopics } from '../utils'
import TopNav from './TopNav.vue'
import Breadcrumb from './Breadcrumb.vue'
import ArticleList from './ArticleList.vue'

const { page, site } = useData()
const route = useRoute()

// Extract topic from the URL path
const topic = computed(() => {
  const path = page.value.relativePath || route.path
  const match = path.match(/topics\/([^\/]+)/)
  return match ? decodeURIComponent(match[1].replace('.md', '')) : ''
})

const capitalizedTopic = computed(() => capitalizeFirstLetter(topic.value))

// Filter articles by topic
const filteredArticles = computed(() => getArticlesByTopic(posts, topic.value))

const articleCount = computed(() => filteredArticles.value.length)

// Generate breadcrumb items
const breadcrumbItems = computed(() => [
  { name: 'home', path: '/' },
  { name: 'topics', path: '/topics' },
  { name: topic.value.toLowerCase(), isActive: true },
])

// SEO metadata
const seoTitle = computed(() => `${capitalizedTopic.value} Articles | Cody Bontecou`)
const seoDescription = computed(() => 
  `Explore ${articleCount.value} articles about ${capitalizedTopic.value}. Learn from tutorials, guides, and insights on ${capitalizedTopic.value} development.`
)
const canonicalUrl = computed(() => `${site.value.base}topics/${topic.value}/`)

// Structured data for the topic page
const structuredData = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: seoTitle.value,
  description: seoDescription.value,
  url: canonicalUrl.value,
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: articleCount.value,
    itemListElement: filteredArticles.value.map((article, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'BlogPosting',
        name: article.frontmatter?.title,
        url: `${site.value.base}${article.url}`,
        datePublished: article.frontmatter?.created_at || article.frontmatter?.date,
        author: {
          '@type': 'Person',
          name: 'Cody Bontecou'
        }
      }
    }))
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.value.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.path && { item: `${site.value.base}${item.path.slice(1)}` })
    }))
  }
}))

// Related topics (topics that appear with this topic in the same articles)
const relatedTopics = computed(() => {
  const currentTopic = topic.value.toLowerCase()
  const topicCooccurrences = new Map<string, number>()
  
  filteredArticles.value.forEach(article => {
    const topics = article.frontmatter?.topics || []
    topics.forEach((t: string) => {
      const normalizedTopic = t.toLowerCase()
      if (normalizedTopic !== currentTopic) {
        topicCooccurrences.set(normalizedTopic, (topicCooccurrences.get(normalizedTopic) || 0) + 1)
      }
    })
  })
  
  return Array.from(topicCooccurrences.entries())
    .sort((a, b) => b[1] - a[1]) // Sort by frequency
    .slice(0, 5) // Top 5 related topics
    .map(([topic]) => topic)
})

// Set page metadata using VitePress approach
onMounted(() => {
  // Update document title
  document.title = seoTitle.value
  
  // Update meta description
  let metaDescription = document.querySelector('meta[name="description"]')
  if (!metaDescription) {
    metaDescription = document.createElement('meta')
    metaDescription.setAttribute('name', 'description')
    document.head.appendChild(metaDescription)
  }
  metaDescription.setAttribute('content', seoDescription.value)
  
  // Update canonical URL
  let canonicalLink = document.querySelector('link[rel="canonical"]')
  if (!canonicalLink) {
    canonicalLink = document.createElement('link')
    canonicalLink.setAttribute('rel', 'canonical')
    document.head.appendChild(canonicalLink)
  }
  canonicalLink.setAttribute('href', canonicalUrl.value)
  
  // Add structured data
  let structuredDataScript = document.querySelector('script[type="application/ld+json"]')
  if (!structuredDataScript) {
    structuredDataScript = document.createElement('script')
    structuredDataScript.setAttribute('type', 'application/ld+json')
    document.head.appendChild(structuredDataScript)
  }
  structuredDataScript.textContent = JSON.stringify(structuredData.value)
  
  // Open Graph tags
  const ogTags = [
    { property: 'og:title', content: seoTitle.value },
    { property: 'og:description', content: seoDescription.value },
    { property: 'og:url', content: canonicalUrl.value },
    { property: 'og:type', content: 'website' }
  ]
  
  ogTags.forEach(({ property, content }) => {
    let ogTag = document.querySelector(`meta[property="${property}"]`)
    if (!ogTag) {
      ogTag = document.createElement('meta')
      ogTag.setAttribute('property', property)
      document.head.appendChild(ogTag)
    }
    ogTag.setAttribute('content', content)
  })
})
</script>