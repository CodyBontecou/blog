<template>
  <div class="admin-dashboard">
    <!-- Sidebar Navigation -->
    <aside class="admin-sidebar">
      <div class="sidebar-header">
        <h1 class="sidebar-title">Editorial</h1>
        <p class="sidebar-subtitle">CMS</p>
      </div>

      <nav class="sidebar-nav">
        <button
          v-for="item in navItems"
          :key="item.id"
          @click="currentView = item.id"
          :class="['nav-item', { active: currentView === item.id }]"
        >
          <span class="nav-icon" v-html="item.icon"></span>
          <span class="nav-label">{{ item.label }}</span>
          <span v-if="item.count !== undefined" class="nav-count">{{ item.count }}</span>
        </button>
      </nav>

      <div class="sidebar-footer">
        <div class="user-info">
          <div class="user-avatar">
            {{ userInitial }}
          </div>
          <div class="user-details">
            <p class="user-name">{{ user?.user_metadata?.full_name || 'Admin' }}</p>
            <p class="user-email">{{ user?.email }}</p>
          </div>
        </div>
        <button @click="handleSignOut" class="signout-button">
          Sign Out
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="admin-main">
      <ArticlesList
        v-if="currentView === 'articles'"
        :articles="articles"
        @edit="editArticle"
        @create="createNewArticle"
        @delete="deleteArticle"
      />
      <ArticleEditor
        v-else-if="currentView === 'editor'"
        :article="selectedArticle"
        @save="saveArticle"
        @back="currentView = 'articles'"
        @publish="publishArticle"
        @send-newsletter="sendNewsletter"
      />
      <NewsletterManager
        v-else-if="currentView === 'newsletter'"
      />
      <SettingsPanel
        v-else-if="currentView === 'settings'"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { supabase, type Article } from '../lib/supabase-client'
import ArticlesList from './ArticlesList.vue'
import ArticleEditor from './ArticleEditor.vue'
import NewsletterManager from './NewsletterManager.vue'
import SettingsPanel from './SettingsPanel.vue'

const { user, signOut } = useAuth()
const currentView = ref<'articles' | 'editor' | 'newsletter' | 'settings'>('articles')
const articles = ref<Article[]>([])
const selectedArticle = ref<Article | null>(null)

const userInitial = computed(() => {
  const name = user.value?.user_metadata?.full_name || user.value?.email || 'A'
  return name.charAt(0).toUpperCase()
})

const navItems = computed(() => [
  {
    id: 'articles',
    label: 'Articles',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
    count: articles.value.length,
  },
  {
    id: 'newsletter',
    label: 'Newsletter',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/></svg>',
  },
])

const handleSignOut = async () => {
  try {
    await signOut()
    window.location.href = '/'
  } catch (error) {
    console.error('Sign out error:', error)
  }
}

const loadArticles = async () => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('last_modified', { ascending: false })

  if (error) {
    console.error('Error loading articles:', error)
    return
  }

  articles.value = data || []
}

const createNewArticle = () => {
  selectedArticle.value = {
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
  currentView.value = 'editor'
}

const editArticle = (article: Article) => {
  selectedArticle.value = article
  currentView.value = 'editor'
}

const deleteArticle = async (article: Article) => {
  if (!confirm(`Are you sure you want to delete "${article.title}"?`)) {
    return
  }

  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', article.id)

  if (error) {
    console.error('Error deleting article:', error)
    alert('Failed to delete article')
    return
  }

  await loadArticles()
}

const saveArticle = async (article: Article) => {
  try {
    if (article.id) {
      // Update existing
      const { error } = await supabase
        .from('articles')
        .update({
          slug: article.slug,
          title: article.title,
          content: article.content,
          excerpt: article.excerpt,
          topics: article.topics,
          draft: article.draft,
          ignore: article.ignore,
          published: article.published,
          date: article.date,
          metadata: article.metadata,
        })
        .eq('id', article.id)

      if (error) throw error
    } else {
      // Create new
      const { data, error } = await supabase
        .from('articles')
        .insert({
          slug: article.slug,
          title: article.title,
          content: article.content,
          excerpt: article.excerpt,
          topics: article.topics,
          draft: article.draft,
          ignore: article.ignore,
          published: article.published,
          date: article.date,
          author_id: user.value?.id,
          metadata: article.metadata,
        })
        .select()
        .single()

      if (error) throw error
      selectedArticle.value = data
    }

    await loadArticles()
    alert('Article saved successfully!')
  } catch (error) {
    console.error('Error saving article:', error)
    alert('Failed to save article')
  }
}

const publishArticle = async (article: Article) => {
  article.published = !article.published
  article.draft = article.published ? false : article.draft
  await saveArticle(article)
}

const sendNewsletter = async (article: Article) => {
  if (!confirm(`Send newsletter for "${article.title}"?`)) {
    return
  }

  try {
    const response = await fetch('/api/newsletter/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        articleSlug: article.slug,
        articleTitle: article.title,
      }),
    })

    if (!response.ok) throw new Error('Failed to send newsletter')

    alert('Newsletter sent successfully!')
  } catch (error) {
    console.error('Error sending newsletter:', error)
    alert('Failed to send newsletter')
  }
}

onMounted(() => {
  loadArticles()
})
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  min-height: 100vh;
  background: #faf8f5;
}

.admin-sidebar {
  width: 280px;
  background: #2d2a26;
  color: #f5f1e8;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
}

.sidebar-header {
  padding: 2.5rem 2rem 2rem;
  border-bottom: 1px solid rgba(245, 241, 232, 0.1);
}

.sidebar-title {
  font-family: 'Crimson Pro', serif;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.02em;
}

.sidebar-subtitle {
  font-size: 0.75rem;
  font-weight: 500;
  color: #8b7f72;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin: 0.25rem 0 0 0;
}

.sidebar-nav {
  flex: 1;
  padding: 1.5rem 0;
  overflow-y: auto;
}

.nav-item {
  width: 100%;
  padding: 0.875rem 2rem;
  background: transparent;
  border: none;
  color: #a39a8d;
  font-family: 'Outfit', sans-serif;
  font-size: 0.9375rem;
  font-weight: 400;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.875rem;
  border-left: 3px solid transparent;
}

.nav-item:hover {
  background: rgba(245, 241, 232, 0.05);
  color: #f5f1e8;
}

.nav-item.active {
  background: rgba(245, 241, 232, 0.08);
  color: #f5f1e8;
  border-left-color: #c9a962;
}

.nav-icon {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.nav-label {
  flex: 1;
}

.nav-count {
  font-size: 0.75rem;
  background: rgba(245, 241, 232, 0.1);
  padding: 0.125rem 0.5rem;
  border-radius: 10px;
  font-weight: 500;
}

.sidebar-footer {
  padding: 1.5rem;
  border-top: 1px solid rgba(245, 241, 232, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #c9a962;
  color: #2d2a26;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
}

.user-details {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #f5f1e8;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-email {
  font-size: 0.75rem;
  color: #8b7f72;
  margin: 0.125rem 0 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.signout-button {
  width: 100%;
  padding: 0.625rem;
  background: rgba(245, 241, 232, 0.05);
  border: 1px solid rgba(245, 241, 232, 0.1);
  color: #a39a8d;
  border-radius: 2px;
  font-family: 'Outfit', sans-serif;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.signout-button:hover {
  background: rgba(245, 241, 232, 0.08);
  color: #f5f1e8;
}

.admin-main {
  margin-left: 280px;
  flex: 1;
  min-height: 100vh;
}
</style>
