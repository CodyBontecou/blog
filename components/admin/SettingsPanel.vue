<template>
  <div class="settings-panel">
    <header class="panel-header">
      <h2 class="header-title">Settings</h2>
      <p class="header-subtitle">Configure your admin dashboard</p>
    </header>

    <div class="panel-content">
      <div class="settings-section">
        <h3 class="section-title">Sync to Markdown</h3>
        <p class="section-description">
          Export articles from Supabase to markdown files in the /content directory.
          This will sync all published articles to the file system.
        </p>
        <button @click="handleSync" :disabled="syncing" class="sync-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="23 4 23 10 17 10"/>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
          </svg>
          {{ syncing ? 'Syncing...' : 'Sync to Markdown' }}
        </button>
        <p v-if="syncMessage" class="sync-message">{{ syncMessage }}</p>
      </div>

      <div class="settings-section">
        <h3 class="section-title">About</h3>
        <p class="section-description">
          Editorial CMS for managing blog content with Supabase and GitHub authentication.
          Built with VitePress, Vue 3, and Tailwind CSS.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const syncing = ref(false)
const syncMessage = ref('')

const handleSync = async () => {
  syncing.value = true
  syncMessage.value = ''

  try {
    const response = await fetch('/api/sync-articles', {
      method: 'POST',
    })

    if (!response.ok) {
      throw new Error('Sync failed')
    }

    const result = await response.json()
    syncMessage.value = `Successfully synced ${result.count} articles to markdown files`
  } catch (error) {
    console.error('Sync error:', error)
    syncMessage.value = 'Failed to sync articles'
  } finally {
    syncing.value = false
  }
}
</script>

<style scoped>
.settings-panel {
  min-height: 100vh;
  animation: fadeIn 0.4s ease;
}

.panel-header {
  background: #ffffff;
  border-bottom: 1px solid #e8e0d5;
  padding: 2.5rem 3rem 2rem;
}

.header-title {
  font-family: 'Crimson Pro', serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d2a26;
  margin: 0;
  letter-spacing: -0.02em;
}

.header-subtitle {
  font-size: 1rem;
  color: #8b7f72;
  margin: 0.5rem 0 0 0;
}

.panel-content {
  padding: 3rem;
  max-width: 800px;
}

.settings-section {
  background: #ffffff;
  border: 1px solid #e8e0d5;
  border-radius: 2px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.section-title {
  font-family: 'Crimson Pro', serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d2a26;
  margin: 0 0 1rem 0;
}

.section-description {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: #5a5147;
  margin: 0 0 1.5rem 0;
}

.sync-button {
  padding: 0.875rem 1.75rem;
  background: #2d2a26;
  color: #f5f1e8;
  border: none;
  border-radius: 2px;
  font-family: 'Outfit', sans-serif;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sync-button:hover:not(:disabled) {
  background: #1f1d1a;
}

.sync-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.sync-button svg {
  width: 18px;
  height: 18px;
}

.sync-message {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #28a745;
}
</style>
