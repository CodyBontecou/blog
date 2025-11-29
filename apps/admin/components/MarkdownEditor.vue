<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { marked } from 'marked'

const props = defineProps<{
  modelValue: string
  label?: string
  rows?: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const content = ref(props.modelValue || '')
const showPreview = ref(false)

watch(() => props.modelValue, (newValue) => {
  content.value = newValue || ''
})

watch(content, (newValue) => {
  emit('update:modelValue', newValue)
})

const renderedMarkdown = computed(() => {
  try {
    return marked.parse(content.value || '')
  } catch (e) {
    return '<p class="error">Error rendering markdown</p>'
  }
})

function insertMarkdown(before: string, after: string = '') {
  const textarea = document.querySelector('.markdown-textarea') as HTMLTextAreaElement
  if (!textarea) return

  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selectedText = content.value.substring(start, end)
  const beforeText = content.value.substring(0, start)
  const afterText = content.value.substring(end)

  content.value = beforeText + before + selectedText + after + afterText

  // Restore focus and selection
  setTimeout(() => {
    textarea.focus()
    const newPos = start + before.length + selectedText.length
    textarea.setSelectionRange(newPos, newPos)
  }, 0)
}

function insertBold() { insertMarkdown('**', '**') }
function insertItalic() { insertMarkdown('_', '_') }
function insertHeading() { insertMarkdown('## ', '') }
function insertLink() { insertMarkdown('[', '](url)') }
function insertCode() { insertMarkdown('`', '`') }
function insertList() { insertMarkdown('- ', '') }
function insertCodeBlock() { insertMarkdown('\n```\n', '\n```\n') }
</script>

<template>
  <div class="markdown-editor">
    <div class="editor-header">
      <label v-if="label" class="editor-label">{{ label }}</label>
      <div class="editor-controls">
        <div class="toolbar">
          <button
            type="button"
            @click="insertBold"
            class="toolbar-btn"
            title="Bold (Ctrl+B)"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
              <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
            </svg>
          </button>
          <button
            type="button"
            @click="insertItalic"
            class="toolbar-btn"
            title="Italic (Ctrl+I)"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="19" y1="4" x2="10" y2="4"/>
              <line x1="14" y1="20" x2="5" y2="20"/>
              <line x1="15" y1="4" x2="9" y2="20"/>
            </svg>
          </button>
          <span class="toolbar-divider"></span>
          <button
            type="button"
            @click="insertHeading"
            class="toolbar-btn"
            title="Heading"
          >
            H
          </button>
          <button
            type="button"
            @click="insertLink"
            class="toolbar-btn"
            title="Link"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
          </button>
          <button
            type="button"
            @click="insertCode"
            class="toolbar-btn"
            title="Inline Code"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="16 18 22 12 16 6"/>
              <polyline points="8 6 2 12 8 18"/>
            </svg>
          </button>
          <button
            type="button"
            @click="insertCodeBlock"
            class="toolbar-btn"
            title="Code Block"
          >
            { }
          </button>
          <button
            type="button"
            @click="insertList"
            class="toolbar-btn"
            title="List"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="8" y1="6" x2="21" y2="6"/>
              <line x1="8" y1="12" x2="21" y2="12"/>
              <line x1="8" y1="18" x2="21" y2="18"/>
              <line x1="3" y1="6" x2="3.01" y2="6"/>
              <line x1="3" y1="12" x2="3.01" y2="12"/>
              <line x1="3" y1="18" x2="3.01" y2="18"/>
            </svg>
          </button>
        </div>
        <button
          type="button"
          @click="showPreview = !showPreview"
          :class="['preview-toggle', { active: showPreview }]"
        >
          <svg v-if="!showPreview" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
          {{ showPreview ? 'Edit' : 'Preview' }}
        </button>
      </div>
    </div>

    <div class="editor-container">
      <div :class="['editor-pane', { hidden: showPreview }]">
        <textarea
          v-model="content"
          class="markdown-textarea"
          :rows="rows || 12"
          placeholder="Write your content in markdown..."
        ></textarea>
      </div>

      <div :class="['preview-pane', { visible: showPreview }]">
        <div class="markdown-preview" v-html="renderedMarkdown"></div>
      </div>
    </div>

    <div class="editor-footer">
      <span class="hint">Markdown supported</span>
      <span class="word-count">{{ (content || '').split(/\s+/).filter(w => w).length }} words</span>
    </div>
  </div>
</template>

<style scoped>
.markdown-editor {
  display: flex;
  flex-direction: column;
  gap: 0;
  background: white;
  border: 1px solid #e0e0e0;
  transition: border-color 0.3s ease;
}

.markdown-editor:focus-within {
  border-color: #1a1a1a;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
  background: #fafafa;
}

.editor-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #1a1a1a;
}

.editor-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 4px;
}

.toolbar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: transparent;
  border: none;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 600;
}

.toolbar-btn:hover {
  background: #f0f0f0;
  color: #1a1a1a;
}

.toolbar-divider {
  width: 1px;
  height: 16px;
  background: #e0e0e0;
  margin: 0 4px;
}

.preview-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: transparent;
  border: 1px solid #e0e0e0;
  color: #666;
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.preview-toggle:hover {
  background: #f5f5f5;
  border-color: #ccc;
  color: #1a1a1a;
}

.preview-toggle.active {
  background: #1a1a1a;
  border-color: #1a1a1a;
  color: #fafafa;
}

.editor-container {
  position: relative;
  min-height: 300px;
}

.editor-pane,
.preview-pane {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.editor-pane {
  opacity: 1;
  transform: translateX(0);
}

.editor-pane.hidden {
  position: absolute;
  opacity: 0;
  transform: translateX(-20px);
  pointer-events: none;
}

.preview-pane {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0;
  transform: translateX(20px);
  pointer-events: none;
  padding: 24px;
  overflow-y: auto;
  max-height: 500px;
}

.preview-pane.visible {
  position: relative;
  opacity: 1;
  transform: translateX(0);
  pointer-events: auto;
}

.markdown-textarea {
  width: 100%;
  padding: 24px;
  border: none;
  background: white;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  line-height: 1.8;
  color: #1a1a1a;
  resize: vertical;
  transition: background 0.3s ease;
}

.markdown-textarea:focus {
  outline: none;
  background: #fafafa;
}

.markdown-textarea::placeholder {
  color: #ccc;
  font-style: italic;
}

.markdown-preview {
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  line-height: 1.8;
  color: #1a1a1a;
}

/* Markdown Preview Styles */
.markdown-preview :deep(h1),
.markdown-preview :deep(h2),
.markdown-preview :deep(h3),
.markdown-preview :deep(h4) {
  font-family: 'Crimson Pro', serif;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.02em;
  margin: 24px 0 12px 0;
  color: #1a1a1a;
}

.markdown-preview :deep(h1) {
  font-size: 32px;
  margin-top: 0;
}

.markdown-preview :deep(h2) {
  font-size: 26px;
}

.markdown-preview :deep(h3) {
  font-size: 20px;
}

.markdown-preview :deep(h4) {
  font-size: 16px;
}

.markdown-preview :deep(p) {
  margin: 0 0 16px 0;
  color: #333;
}

.markdown-preview :deep(a) {
  color: #1a1a1a;
  text-decoration: underline;
  text-decoration-color: #ccc;
  text-underline-offset: 3px;
  transition: text-decoration-color 0.2s ease;
}

.markdown-preview :deep(a:hover) {
  text-decoration-color: #1a1a1a;
}

.markdown-preview :deep(code) {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  background: #f5f5f5;
  padding: 2px 6px;
  border-radius: 3px;
  color: #d14;
}

.markdown-preview :deep(pre) {
  background: #1a1a1a;
  color: #fafafa;
  padding: 16px;
  overflow-x: auto;
  margin: 16px 0;
  border-radius: 4px;
}

.markdown-preview :deep(pre code) {
  background: transparent;
  padding: 0;
  color: #fafafa;
  border-radius: 0;
}

.markdown-preview :deep(ul),
.markdown-preview :deep(ol) {
  margin: 0 0 16px 0;
  padding-left: 24px;
}

.markdown-preview :deep(li) {
  margin: 6px 0;
}

.markdown-preview :deep(blockquote) {
  margin: 16px 0;
  padding: 12px 20px;
  border-left: 3px solid #1a1a1a;
  background: #f9f9f9;
  font-style: italic;
  color: #666;
}

.markdown-preview :deep(hr) {
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 32px 0;
}

.markdown-preview :deep(img) {
  max-width: 100%;
  height: auto;
  margin: 16px 0;
}

.markdown-preview :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
}

.markdown-preview :deep(th),
.markdown-preview :deep(td) {
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  text-align: left;
}

.markdown-preview :deep(th) {
  background: #f5f5f5;
  font-weight: 600;
}

.markdown-preview :deep(.error) {
  color: #d14;
  font-style: italic;
}

.editor-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-top: 1px solid #e0e0e0;
  background: #fafafa;
}

.hint,
.word-count {
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  color: #999;
}
</style>
