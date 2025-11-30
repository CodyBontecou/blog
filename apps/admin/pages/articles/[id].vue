<template>
  <div class="article-page">
    <ArticleEditor
      v-if="article"
      :article="article"
      @save="saveArticle"
      @back="handleBack"
      @publish="publishArticle"
      @send-newsletter="sendNewsletter"
    />
    <div v-else-if="loading" class="loading-state">
      <p>Loading article...</p>
    </div>
    <div v-else class="error-state">
      <p>Article not found</p>
      <button @click="handleBack">Back to Articles</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase, type Article } from '../../lib/supabase-client'
import ArticleEditor from '../../components/ArticleEditor.vue'
import { toast } from '~/components/ui/toast/use-toast'

const route = useRoute()
const router = useRouter()
const { user } = useAuth()

const article = ref<Article | null>(null)
const loading = ref(true)

const loadArticle = async () => {
  const articleId = route.params.id as string

  // Handle "new" as a special case for creating new articles
  if (articleId === 'new') {
    article.value = {
      id: '',
      slug: '',
      title: '',
      content: '',
      excerpt: '',
      topics: [],
      draft: true,
      ignore: false,
      published: false,
      date: new Date().toISOString(),
      created_at: new Date().toISOString(),
      last_modified: new Date().toISOString(),
      author_id: user.value?.id,
      metadata: {},
    }
    loading.value = false
    return
  }

  // Load existing article
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', articleId)
    .single()

  if (error) {
    console.error('Error loading article:', error)
    article.value = null
  } else {
    article.value = data
  }

  loading.value = false
}

const handleBack = () => {
  router.push('/')
}

const saveArticle = async (updatedArticle: Article) => {
  try {
    if (updatedArticle.id) {
      // Update existing
      const { error } = await supabase
        .from('articles')
        .update({
          slug: updatedArticle.slug,
          title: updatedArticle.title,
          content: updatedArticle.content,
          excerpt: updatedArticle.excerpt,
          topics: updatedArticle.topics,
          draft: updatedArticle.draft,
          ignore: updatedArticle.ignore,
          published: updatedArticle.published,
          date: updatedArticle.date,
          metadata: updatedArticle.metadata,
        })
        .eq('id', updatedArticle.id)

      if (error) throw error

      // Update local state
      article.value = { ...updatedArticle }
    } else {
      // Create new
      const { data, error } = await supabase
        .from('articles')
        .insert({
          slug: updatedArticle.slug,
          title: updatedArticle.title,
          content: updatedArticle.content,
          excerpt: updatedArticle.excerpt,
          topics: updatedArticle.topics,
          draft: updatedArticle.draft,
          ignore: updatedArticle.ignore,
          published: updatedArticle.published,
          date: updatedArticle.date,
          author_id: user.value?.id,
          metadata: updatedArticle.metadata,
        })
        .select()
        .single()

      if (error) throw error

      // Navigate to the new article's URL
      if (data) {
        await router.push(`/articles/${data.id}`)
        article.value = data
      }
    }

    alert('Article saved successfully!')
  } catch (error) {
    console.error('Error saving article:', error)
    alert('Failed to save article')
  }
}

const publishArticle = async (articleToPublish: Article) => {
  articleToPublish.published = !articleToPublish.published
  articleToPublish.draft = articleToPublish.published ? false : articleToPublish.draft
  await saveArticle(articleToPublish)
}

const sendNewsletter = async (articleToSend: Article) => {
  if (!confirm(`Send newsletter for "${articleToSend.title}"?`)) {
    return
  }

  try {
    const response = await fetch('/api/newsletter/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        articleSlug: articleToSend.slug,
        articleTitle: articleToSend.title,
      }),
    })

    if (!response.ok) throw new Error('Failed to send newsletter')

    toast({
      title: 'Newsletter sent successfully!',
      description: `The newsletter for "${articleToSend.title}" has been sent to all subscribers.`,
    })
  } catch (error) {
    console.error('Error sending newsletter:', error)
    toast({
      title: 'Failed to send newsletter',
      description: 'There was an error sending the newsletter. Please try again.',
      variant: 'destructive',
    })
  }
}

onMounted(() => {
  loadArticle()
})
</script>

<style scoped>
.article-page {
  min-height: 100vh;
}

.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-family: 'Outfit', sans-serif;
  color: #5a5147;
}

.error-state button {
  margin-top: 1rem;
  padding: 0.625rem 1.25rem;
  background: #2d2a26;
  border: none;
  color: #f5f1e8;
  border-radius: 2px;
  font-family: 'Outfit', sans-serif;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.error-state button:hover {
  background: #1f1d1a;
}
</style>
