<template>
  <div class="article-editor">
    <header class="editor-header">
      <button @click="$emit('back')" class="back-button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5m7 7l-7-7 7-7"/>
        </svg>
        Back
      </button>

      <div class="header-actions">
        <button
          @click="showPreview = !showPreview"
          :class="['action-button', { active: showPreview }]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          {{ showPreview ? 'Hide' : 'Show' }} Preview
        </button>

        <button @click="handleSave" class="action-button save-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
            <polyline points="17 21 17 13 7 13 7 21"/>
            <polyline points="7 3 7 8 15 8"/>
          </svg>
          Save
        </button>

        <button
          @click="handlePublish"
          :class="['action-button', 'publish-button', { published: localArticle.published }]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          {{ localArticle.published ? 'Unpublish' : 'Publish' }}
        </button>

        <button
          v-if="localArticle.published"
          @click="handleNewsletter"
          class="action-button newsletter-button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="m2 7 10 6 10-6"/>
          </svg>
          Send Newsletter
        </button>
      </div>
    </header>

    <div :class="['editor-container', { 'split-view': showPreview }]">
      <div class="editor-pane">
        <div class="editor-fields">
          <div class="field-group">
            <label class="field-label">Title</label>
            <input
              v-model="localArticle.title"
              type="text"
              placeholder="Enter article title..."
              class="field-input title-input"
            />
          </div>

          <div class="field-row">
            <div class="field-group">
              <label class="field-label">Slug</label>
              <input
                v-model="localArticle.slug"
                type="text"
                placeholder="article-url-slug"
                class="field-input"
              />
            </div>

            <div class="field-group">
              <label class="field-label">Date</label>
              <input
                v-model="dateValue"
                type="datetime-local"
                class="field-input"
              />
            </div>
          </div>

          <div class="field-group">
            <label class="field-label">Topics (comma-separated)</label>
            <input
              v-model="topicsValue"
              type="text"
              placeholder="vue, javascript, typescript"
              class="field-input"
            />
          </div>

          <div class="field-group">
            <label class="field-label">Excerpt</label>
            <textarea
              v-model="localArticle.excerpt"
              placeholder="Brief description of the article..."
              class="field-textarea"
              rows="2"
            />
          </div>

          <div class="field-checkboxes">
            <label class="checkbox-label">
              <input
                v-model="localArticle.draft"
                type="checkbox"
                class="checkbox-input"
              />
              <span>Draft</span>
            </label>
            <label class="checkbox-label">
              <input
                v-model="localArticle.ignore"
                type="checkbox"
                class="checkbox-input"
              />
              <span>Ignore</span>
            </label>
          </div>

          <div class="field-group">
            <label class="field-label">Content (Markdown)</label>
            <textarea
              v-model="localArticle.content"
              placeholder="Write your article content in markdown..."
              class="field-textarea content-textarea"
              rows="20"
              @keydown.tab.prevent="handleTab"
            />
          </div>
        </div>
      </div>

      <div v-if="showPreview" class="preview-pane">
        <div class="preview-header">
          <h3 class="preview-title">Preview</h3>
        </div>
        <div class="preview-content">
          <h1 class="preview-article-title">{{ localArticle.title || 'Untitled' }}</h1>
          <div class="preview-meta">
            <time>{{ formatDate(localArticle.date) }}</time>
            <div v-if="localArticle.topics.length > 0" class="preview-topics">
              <span v-for="topic in localArticle.topics" :key="topic" class="preview-topic">
                {{ topic }}
              </span>
            </div>
          </div>
          <div class="preview-body" v-html="renderedMarkdown"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Article } from '../lib/supabase-client'

const props = defineProps<{
  article: Article | null
}>()

const emit = defineEmits<{
  save: [article: Article]
  back: []
  publish: [article: Article]
  'send-newsletter': [article: Article]
}>()

const showPreview = ref(false)
const localArticle = ref<Article>({ ...props.article! })

watch(() => props.article, (newArticle) => {
  if (newArticle) {
    localArticle.value = { ...newArticle }
  }
}, { deep: true })

const dateValue = computed({
  get: () => {
    const date = new Date(localArticle.value.date)
    return date.toISOString().slice(0, 16)
  },
  set: (value: string) => {
    localArticle.value.date = new Date(value).toISOString()
  }
})

const topicsValue = computed({
  get: () => localArticle.value.topics.join(', '),
  set: (value: string) => {
    localArticle.value.topics = value.split(',').map(t => t.trim()).filter(Boolean)
  }
})

const renderedMarkdown = computed(() => {
  // Simple markdown rendering (you can replace with a library like marked.js)
  let html = localArticle.value.content

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')

  // Code blocks
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')

  // Inline code
  html = html.replace(/`(.*?)`/g, '<code>$1</code>')

  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')

  // Line breaks
  html = html.replace(/\n/g, '<br>')

  return html
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

const handleTab = (e: KeyboardEvent) => {
  const target = e.target as HTMLTextAreaElement
  const start = target.selectionStart
  const end = target.selectionEnd
  const value = target.value

  target.value = value.substring(0, start) + '  ' + value.substring(end)
  target.selectionStart = target.selectionEnd = start + 2
}

const handleSave = () => {
  if (!localArticle.value.title || !localArticle.value.slug) {
    alert('Please enter a title and slug')
    return
  }
  emit('save', localArticle.value)
}

const handlePublish = () => {
  emit('publish', localArticle.value)
}

const handleNewsletter = () => {
  emit('send-newsletter', localArticle.value)
}
</script>

<style scoped>
.article-editor {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  animation: fadeIn 0.4s ease;
}

.editor-header {
  background: #ffffff;
  border-bottom: 1px solid #e8e0d5;
  padding: 1.5rem 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 10;
  gap: 1.5rem;
}

.back-button {
  padding: 0.625rem 1.25rem;
  background: transparent;
  border: 1px solid #e8e0d5;
  color: #5a5147;
  border-radius: 2px;
  font-family: 'Outfit', sans-serif;
  font-size: 0.9375rem;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.back-button:hover {
  border-color: #c9a962;
  color: #2d2a26;
}

.back-button svg {
  width: 16px;
  height: 16px;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.action-button {
  padding: 0.625rem 1.25rem;
  background: transparent;
  border: 1px solid #e8e0d5;
  color: #5a5147;
  border-radius: 2px;
  font-family: 'Outfit', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.action-button:hover {
  border-color: #c9a962;
  background: #faf8f5;
}

.action-button.active {
  background: #2d2a26;
  border-color: #2d2a26;
  color: #f5f1e8;
}

.action-button svg {
  width: 16px;
  height: 16px;
}

.save-button {
  background: #2d2a26;
  border-color: #2d2a26;
  color: #f5f1e8;
}

.save-button:hover {
  background: #1f1d1a;
}

.publish-button {
  background: #c9a962;
  border-color: #c9a962;
  color: #2d2a26;
}

.publish-button:hover {
  background: #b89952;
}

.publish-button.published {
  background: #28a745;
  border-color: #28a745;
  color: #ffffff;
}

.publish-button.published:hover {
  background: #218838;
}

.newsletter-button {
  background: #4a90e2;
  border-color: #4a90e2;
  color: #ffffff;
}

.newsletter-button:hover {
  background: #357abd;
}

.editor-container {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr;
  transition: grid-template-columns 0.3s ease;
}

.editor-container.split-view {
  grid-template-columns: 1fr 1fr;
}

.editor-pane {
  background: #ffffff;
  overflow-y: auto;
}

.editor-fields {
  padding: 3rem;
  max-width: 800px;
  margin: 0 auto;
}

.field-group {
  margin-bottom: 2rem;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.field-label {
  display: block;
  font-family: 'Crimson Pro', serif;
  font-size: 1rem;
  font-weight: 600;
  color: #2d2a26;
  margin-bottom: 0.5rem;
  letter-spacing: -0.01em;
}

.field-input {
  width: 100%;
  padding: 0.875rem 1rem;
  background: #faf8f5;
  border: 1px solid #e8e0d5;
  border-radius: 2px;
  font-family: 'Outfit', sans-serif;
  font-size: 0.9375rem;
  color: #2d2a26;
  transition: all 0.2s ease;
}

.field-input:focus {
  outline: none;
  border-color: #c9a962;
  background: #ffffff;
}

.title-input {
  font-family: 'Crimson Pro', serif;
  font-size: 1.75rem;
  font-weight: 600;
  padding: 1rem;
}

.field-textarea {
  width: 100%;
  padding: 0.875rem 1rem;
  background: #faf8f5;
  border: 1px solid #e8e0d5;
  border-radius: 2px;
  font-family: 'Outfit', sans-serif;
  font-size: 0.9375rem;
  color: #2d2a26;
  line-height: 1.6;
  resize: vertical;
  transition: all 0.2s ease;
}

.field-textarea:focus {
  outline: none;
  border-color: #c9a962;
  background: #ffffff;
}

.content-textarea {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.7;
  min-height: 500px;
}

.field-checkboxes {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9375rem;
  color: #5a5147;
  cursor: pointer;
}

.checkbox-input {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.preview-pane {
  background: #f5f1e8;
  border-left: 1px solid #e8e0d5;
  overflow-y: auto;
}

.preview-header {
  padding: 2rem 3rem;
  border-bottom: 1px solid #e8e0d5;
  background: #ffffff;
}

.preview-title {
  font-family: 'Crimson Pro', serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d2a26;
  margin: 0;
}

.preview-content {
  padding: 3rem;
  max-width: 700px;
  margin: 0 auto;
}

.preview-article-title {
  font-family: 'Crimson Pro', serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d2a26;
  margin: 0 0 1rem 0;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.preview-meta {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e8e0d5;
  font-size: 0.9375rem;
  color: #8b7f72;
}

.preview-topics {
  display: flex;
  gap: 0.5rem;
}

.preview-topic {
  padding: 0.25rem 0.75rem;
  background: #ffffff;
  border-radius: 2px;
  font-size: 0.8125rem;
  color: #5a5147;
}

.preview-body {
  font-size: 1.0625rem;
  line-height: 1.8;
  color: #2d2a26;
}

.preview-body :deep(h1),
.preview-body :deep(h2),
.preview-body :deep(h3) {
  font-family: 'Crimson Pro', serif;
  font-weight: 600;
  color: #2d2a26;
  margin: 2rem 0 1rem;
  line-height: 1.3;
}

.preview-body :deep(h1) {
  font-size: 2rem;
}

.preview-body :deep(h2) {
  font-size: 1.75rem;
}

.preview-body :deep(h3) {
  font-size: 1.5rem;
}

.preview-body :deep(code) {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.875em;
  background: #e8e0d5;
  padding: 0.2em 0.4em;
  border-radius: 2px;
}

.preview-body :deep(pre) {
  background: #2d2a26;
  color: #f5f1e8;
  padding: 1.5rem;
  border-radius: 2px;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.preview-body :deep(pre code) {
  background: transparent;
  padding: 0;
}

.preview-body :deep(a) {
  color: #c9a962;
  text-decoration: none;
  border-bottom: 1px solid #c9a962;
}

.preview-body :deep(a:hover) {
  color: #b89952;
}
</style>
