<template>
  <div class="articles-list">
    <header class="list-header">
      <div class="header-content">
        <div class="header-text">
          <h2 class="header-title">Articles</h2>
          <p class="header-subtitle">{{ filteredArticles.length }} total · {{ publishedCount }} published · {{ draftCount }} drafts</p>
        </div>
        <button @click="$emit('create')" class="create-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14m-7-7h14"/>
          </svg>
          New Article
        </button>
      </div>

      <div class="filters-row">
        <div class="filters-group">
          <div class="filter-section">
            <label class="filter-label">Status</label>
            <div class="filter-pills">
              <button
                v-for="filter in statusFilters"
                :key="filter.id"
                @click="toggleStatusFilter(filter.id)"
                :class="['filter-pill', { active: activeStatusFilters.includes(filter.id) }]"
              >
                <span :class="['pill-dot', filter.id]"></span>
                {{ filter.label }}
                <span class="pill-count">{{ filter.count }}</span>
              </button>
            </div>
          </div>

          <div class="filter-section">
            <label class="filter-label">Topics</label>
            <div class="filter-pills">
              <button
                v-for="topic in topTopics"
                :key="topic"
                @click="toggleTopicFilter(topic)"
                :class="['filter-pill', { active: activeTopicFilters.includes(topic) }]"
              >
                {{ topic }}
                <span class="pill-count">{{ getTopicCount(topic) }}</span>
              </button>
            </div>
          </div>
        </div>

        <div class="search-box">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search articles..."
            class="search-input"
          />
        </div>
      </div>
    </header>

    <div class="table-container">
      <div v-if="filteredArticles.length === 0" class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
        <p class="empty-text">No articles match your filters</p>
        <button @click="clearFilters" class="empty-button">Clear filters</button>
      </div>

      <table v-else class="articles-table">
        <thead>
          <tr>
            <th class="col-status" @click="sortBy('published')">
              <div class="th-content">
                Status
                <svg v-if="sortColumn === 'published'" class="sort-icon" :class="{ desc: sortDirection === 'desc' }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="18 15 12 9 6 15"/>
                </svg>
              </div>
            </th>
            <th class="col-title" @click="sortBy('title')">
              <div class="th-content">
                Title
                <svg v-if="sortColumn === 'title'" class="sort-icon" :class="{ desc: sortDirection === 'desc' }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="18 15 12 9 6 15"/>
                </svg>
              </div>
            </th>
            <th class="col-topics" @click="sortBy('topics')">
              <div class="th-content">
                Topics
                <svg v-if="sortColumn === 'topics'" class="sort-icon" :class="{ desc: sortDirection === 'desc' }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="18 15 12 9 6 15"/>
                </svg>
              </div>
            </th>
            <th class="col-date" @click="sortBy('date')">
              <div class="th-content">
                Published
                <svg v-if="sortColumn === 'date'" class="sort-icon" :class="{ desc: sortDirection === 'desc' }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="18 15 12 9 6 15"/>
                </svg>
              </div>
            </th>
            <th class="col-modified" @click="sortBy('last_modified')">
              <div class="th-content">
                Modified
                <svg v-if="sortColumn === 'last_modified'" class="sort-icon" :class="{ desc: sortDirection === 'desc' }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="18 15 12 9 6 15"/>
                </svg>
              </div>
            </th>
            <th class="col-draft">
              <div class="th-content">Draft</div>
            </th>
            <th class="col-newsletter">
              <div class="th-content">Newsletter</div>
            </th>
            <th class="col-actions"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(article, index) in sortedArticles"
            :key="article.id"
            class="article-row"
            :style="{ animationDelay: `${Math.min(index * 20, 300)}ms` }"
            @click="$emit('edit', article)"
          >
            <td class="col-status">
              <div :class="['status-indicator', article.published ? 'published' : 'unpublished']">
                <span class="status-dot"></span>
                <span class="status-text">{{ article.published ? 'Live' : 'Unpublished' }}</span>
              </div>
            </td>
            <td class="col-title">
              <div class="title-cell">
                <span class="title-text">{{ article.title || 'Untitled' }}</span>
                <span v-if="article.excerpt" class="title-excerpt">{{ truncate(article.excerpt, 80) }}</span>
              </div>
            </td>
            <td class="col-topics">
              <div class="topics-cell">
                <span
                  v-for="topic in article.topics.slice(0, 2)"
                  :key="topic"
                  class="topic-chip"
                >
                  {{ topic }}
                </span>
                <span v-if="article.topics.length > 2" class="topic-more">
                  +{{ article.topics.length - 2 }}
                </span>
              </div>
            </td>
            <td class="col-date">
              <time class="date-text">{{ formatDate(article.date) }}</time>
            </td>
            <td class="col-modified">
              <time class="date-text modified">{{ formatRelativeDate(article.last_modified) }}</time>
            </td>
            <td class="col-draft">
              <div class="checkbox-cell">
                <span :class="['checkbox', { checked: article.draft }]">
                  <svg v-if="article.draft" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </span>
              </div>
            </td>
            <td class="col-newsletter">
              <div class="checkbox-cell">
                <span :class="['checkbox', { checked: article.metadata?.newsletter_sent }]">
                  <svg v-if="article.metadata?.newsletter_sent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </span>
              </div>
            </td>
            <td class="col-actions">
              <button
                @click.stop="$emit('delete', article)"
                class="delete-button"
                title="Delete article"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Article } from '../lib/supabase-client'

const props = defineProps<{
  articles: Article[]
}>()

defineEmits<{
  edit: [article: Article]
  create: []
  delete: [article: Article]
}>()

// Filtering
const activeStatusFilters = ref<string[]>([])
const activeTopicFilters = ref<string[]>([])
const searchQuery = ref('')

// Sorting
const sortColumn = ref<'title' | 'date' | 'last_modified' | 'published' | 'topics'>('last_modified')
const sortDirection = ref<'asc' | 'desc'>('desc')

const statusFilters = computed(() => [
  {
    id: 'published',
    label: 'Published',
    count: props.articles.filter(a => a.published).length,
  },
  {
    id: 'unpublished',
    label: 'Unpublished',
    count: props.articles.filter(a => !a.published).length,
  },
  {
    id: 'draft',
    label: 'Draft',
    count: props.articles.filter(a => a.draft).length,
  },
])

const topTopics = computed(() => {
  const topicCounts = new Map<string, number>()
  props.articles.forEach(article => {
    article.topics.forEach(topic => {
      topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1)
    })
  })
  return Array.from(topicCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([topic]) => topic)
})

const publishedCount = computed(() => props.articles.filter(a => a.published).length)
const draftCount = computed(() => props.articles.filter(a => a.draft).length)

const getTopicCount = (topic: string) => {
  return props.articles.filter(a => a.topics.includes(topic)).length
}

const toggleStatusFilter = (filterId: string) => {
  const index = activeStatusFilters.value.indexOf(filterId)
  if (index > -1) {
    activeStatusFilters.value.splice(index, 1)
  } else {
    activeStatusFilters.value.push(filterId)
  }
}

const toggleTopicFilter = (topic: string) => {
  const index = activeTopicFilters.value.indexOf(topic)
  if (index > -1) {
    activeTopicFilters.value.splice(index, 1)
  } else {
    activeTopicFilters.value.push(topic)
  }
}

const clearFilters = () => {
  activeStatusFilters.value = []
  activeTopicFilters.value = []
  searchQuery.value = ''
}

const filteredArticles = computed(() => {
  let filtered = [...props.articles]

  // Status filters
  if (activeStatusFilters.value.length > 0) {
    filtered = filtered.filter(article => {
      if (activeStatusFilters.value.includes('published') && article.published) return true
      if (activeStatusFilters.value.includes('unpublished') && !article.published) return true
      if (activeStatusFilters.value.includes('draft') && article.draft) return true
      return false
    })
  }

  // Topic filters
  if (activeTopicFilters.value.length > 0) {
    filtered = filtered.filter(article =>
      activeTopicFilters.value.some(topic => article.topics.includes(topic))
    )
  }

  // Search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(article =>
      article.title.toLowerCase().includes(query) ||
      article.excerpt?.toLowerCase().includes(query) ||
      article.topics.some(topic => topic.toLowerCase().includes(query))
    )
  }

  return filtered
})

const sortedArticles = computed(() => {
  const sorted = [...filteredArticles.value]

  sorted.sort((a, b) => {
    let aVal: any
    let bVal: any

    switch (sortColumn.value) {
      case 'title':
        aVal = a.title.toLowerCase()
        bVal = b.title.toLowerCase()
        break
      case 'date':
        aVal = new Date(a.date).getTime()
        bVal = new Date(b.date).getTime()
        break
      case 'last_modified':
        aVal = new Date(a.last_modified).getTime()
        bVal = new Date(b.last_modified).getTime()
        break
      case 'published':
        aVal = a.published ? 1 : 0
        bVal = b.published ? 1 : 0
        break
      case 'topics':
        aVal = a.topics.join(',').toLowerCase()
        bVal = b.topics.join(',').toLowerCase()
        break
    }

    if (aVal < bVal) return sortDirection.value === 'asc' ? -1 : 1
    if (aVal > bVal) return sortDirection.value === 'asc' ? 1 : -1
    return 0
  })

  return sorted
})

const sortBy = (column: typeof sortColumn.value) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column
    sortDirection.value = 'desc'
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const formatRelativeDate = (date: string) => {
  const now = new Date()
  const then = new Date(date)
  const diffMs = now.getTime() - then.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return formatDate(date)
}

const truncate = (text: string, length: number) => {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');

.articles-list {
  min-height: 100vh;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Header */
.list-header {
  background: #ffffff;
  border-bottom: 2px solid #2d2a26;
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-content {
  padding: 2rem 2.5rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e8e0d5;
}

.header-text {
  flex: 1;
}

.header-title {
  font-family: 'Crimson Pro', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #2d2a26;
  margin: 0;
  letter-spacing: -0.02em;
}

.header-subtitle {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8125rem;
  color: #8b7f72;
  margin: 0.5rem 0 0 0;
  font-weight: 500;
}

.create-button {
  padding: 0.75rem 1.5rem;
  background: #2d2a26;
  color: #f5f1e8;
  border: none;
  font-family: 'Outfit', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.create-button:hover {
  background: #1f1d1a;
  transform: translateY(-1px);
}

.create-button svg {
  width: 16px;
  height: 16px;
}

/* Filters Row */
.filters-row {
  padding: 1.5rem 2.5rem;
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  background: linear-gradient(180deg, #faf8f5 0%, #ffffff 100%);
}

.filters-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.filter-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.filter-label {
  font-family: 'Outfit', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: #5a5147;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  min-width: 80px;
}

.filter-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-pill {
  padding: 0.375rem 0.75rem;
  background: #ffffff;
  border: 1.5px solid #e8e0d5;
  color: #5a5147;
  font-family: 'Outfit', sans-serif;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-pill:hover {
  border-color: #2d2a26;
  background: #faf8f5;
}

.filter-pill.active {
  background: #2d2a26;
  border-color: #2d2a26;
  color: #f5f1e8;
}

.pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 0;
  display: block;
}

.pill-dot.published {
  background: #10b981;
}

.pill-dot.unpublished {
  background: #8b7f72;
}

.pill-dot.draft {
  background: #f59e0b;
}

.pill-count {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  opacity: 0.6;
}

.filter-pill.active .pill-count {
  opacity: 0.8;
}

.search-box {
  position: relative;
  min-width: 280px;
}

.search-icon {
  position: absolute;
  left: 0.875rem;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: #8b7f72;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.625rem 0.875rem 0.625rem 2.5rem;
  background: #ffffff;
  border: 1.5px solid #e8e0d5;
  color: #2d2a26;
  font-family: 'Outfit', sans-serif;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #2d2a26;
  background: #faf8f5;
}

.search-input::placeholder {
  color: #a39a8d;
}

/* Table */
.table-container {
  padding: 0 2.5rem 3rem;
  overflow-x: auto;
}

.empty-state {
  text-align: center;
  padding: 5rem 2rem;
}

.empty-state svg {
  width: 56px;
  height: 56px;
  color: #d4cdc0;
  margin: 0 auto 1.5rem;
}

.empty-text {
  font-size: 1rem;
  color: #8b7f72;
  margin: 0 0 1.5rem 0;
}

.empty-button {
  padding: 0.75rem 1.5rem;
  background: #2d2a26;
  color: #f5f1e8;
  border: none;
  font-family: 'Outfit', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.empty-button:hover {
  background: #1f1d1a;
}

.articles-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 1.5rem;
}

.articles-table thead {
  position: sticky;
  top: 0;
  z-index: 5;
}

.articles-table th {
  background: #2d2a26;
  color: #f5f1e8;
  font-family: 'Outfit', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-align: left;
  padding: 0.875rem 1rem;
  border-bottom: 2px solid #1f1d1a;
  cursor: pointer;
  user-select: none;
  transition: background 0.15s ease;
}

.articles-table th:hover {
  background: #1f1d1a;
}

.th-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sort-icon {
  width: 14px;
  height: 14px;
  opacity: 0.7;
  transition: transform 0.2s ease;
}

.sort-icon.desc {
  transform: rotate(180deg);
}

.article-row {
  background: #ffffff;
  cursor: pointer;
  transition: all 0.15s ease;
  animation: slideIn 0.3s ease backwards;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.article-row:nth-child(even) {
  background: linear-gradient(90deg, #faf8f5 0%, #ffffff 100%);
}

.article-row:hover {
  background: #f5f1e8 !important;
  transform: translateX(4px);
}

.articles-table td {
  padding: 1rem;
  border-bottom: 1px solid #e8e0d5;
  font-size: 0.875rem;
  color: #2d2a26;
}

/* Column widths */
.col-status { width: 120px; }
.col-title { width: auto; min-width: 300px; }
.col-topics { width: 200px; }
.col-date { width: 120px; }
.col-modified { width: 100px; }
.col-draft { width: 80px; text-align: center; }
.col-newsletter { width: 100px; text-align: center; }
.col-actions { width: 60px; text-align: right; }

/* Status indicator */
.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.625rem;
  border-left: 3px solid;
}

.status-indicator.published {
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.08);
}

.status-indicator.unpublished {
  border-color: #8b7f72;
  background: rgba(139, 127, 114, 0.08);
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 0;
  background: currentColor;
}

.status-indicator.published .status-dot {
  color: #10b981;
}

.status-indicator.unpublished .status-dot {
  color: #8b7f72;
}

.status-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

/* Title cell */
.title-cell {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.title-text {
  font-family: 'Crimson Pro', serif;
  font-size: 1rem;
  font-weight: 600;
  color: #2d2a26;
  line-height: 1.3;
}

.title-excerpt {
  font-size: 0.8125rem;
  color: #8b7f72;
  line-height: 1.4;
}

/* Topics cell */
.topics-cell {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.topic-chip {
  padding: 0.125rem 0.5rem;
  background: #2d2a26;
  color: #f5f1e8;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.topic-more {
  padding: 0.125rem 0.5rem;
  background: #e8e0d5;
  color: #5a5147;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6875rem;
  font-weight: 600;
}

/* Date cells */
.date-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8125rem;
  color: #5a5147;
  font-weight: 500;
}

.date-text.modified {
  color: #8b7f72;
  font-size: 0.75rem;
}

/* Checkbox cell */
.checkbox-cell {
  display: flex;
  justify-content: center;
}

.checkbox {
  width: 18px;
  height: 18px;
  border: 2px solid #d4cdc0;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}

.checkbox.checked {
  background: #2d2a26;
  border-color: #2d2a26;
  color: #f5f1e8;
}

.checkbox svg {
  width: 12px;
  height: 12px;
}

/* Actions */
.delete-button {
  padding: 0.375rem;
  background: transparent;
  border: 1.5px solid transparent;
  color: #c9a962;
  cursor: pointer;
  transition: all 0.15s ease;
  opacity: 0;
}

.article-row:hover .delete-button {
  opacity: 1;
}

.delete-button:hover {
  background: #fff5f5;
  border-color: #ef4444;
  color: #ef4444;
}

.delete-button svg {
  width: 16px;
  height: 16px;
  display: block;
}
</style>
