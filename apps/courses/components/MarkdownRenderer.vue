<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'

const props = defineProps<{
  content: string
}>()

const renderedContent = computed(() => {
  if (!props.content) return ''

  try {
    return marked.parse(props.content)
  } catch (e) {
    console.error('Error rendering markdown:', e)
    return `<p>${props.content}</p>`
  }
})
</script>

<template>
  <div class="markdown-content" v-html="renderedContent"></div>
</template>

<style scoped>
.markdown-content {
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  line-height: 1.8;
  color: #333;
}

/* Typography */
.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3),
.markdown-content :deep(h4),
.markdown-content :deep(h5),
.markdown-content :deep(h6) {
  font-family: 'Crimson Pro', serif;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.02em;
  margin: 32px 0 16px 0;
  color: #1a1a1a;
}

.markdown-content :deep(h1) {
  font-size: 40px;
  margin-top: 0;
}

.markdown-content :deep(h2) {
  font-size: 32px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e0e0e0;
}

.markdown-content :deep(h3) {
  font-size: 24px;
}

.markdown-content :deep(h4) {
  font-size: 18px;
}

.markdown-content :deep(h5),
.markdown-content :deep(h6) {
  font-size: 16px;
}

.markdown-content :deep(p) {
  margin: 0 0 20px 0;
  color: #333;
}

.markdown-content :deep(p:last-child) {
  margin-bottom: 0;
}

/* Links */
.markdown-content :deep(a) {
  color: #1a1a1a;
  text-decoration: underline;
  text-decoration-color: #ccc;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
  transition: all 0.2s ease;
  font-weight: 500;
}

.markdown-content :deep(a:hover) {
  text-decoration-color: #1a1a1a;
  text-decoration-thickness: 2px;
}

/* Emphasis */
.markdown-content :deep(strong) {
  font-weight: 600;
  color: #1a1a1a;
}

.markdown-content :deep(em) {
  font-style: italic;
  color: #555;
}

/* Code */
.markdown-content :deep(code) {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  background: #f5f5f5;
  padding: 3px 8px;
  border-radius: 4px;
  color: #d14;
  font-weight: 500;
}

.markdown-content :deep(pre) {
  background: #1a1a1a;
  color: #fafafa;
  padding: 20px 24px;
  overflow-x: auto;
  margin: 24px 0;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.markdown-content :deep(pre code) {
  background: transparent;
  padding: 0;
  color: #fafafa;
  border-radius: 0;
  font-size: 14px;
  line-height: 1.6;
}

/* Lists */
.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin: 0 0 20px 0;
  padding-left: 28px;
}

.markdown-content :deep(li) {
  margin: 8px 0;
  padding-left: 8px;
}

.markdown-content :deep(ul li) {
  list-style-type: none;
  position: relative;
}

.markdown-content :deep(ul li::before) {
  content: '•';
  position: absolute;
  left: -20px;
  color: #1a1a1a;
  font-weight: bold;
}

.markdown-content :deep(ol) {
  counter-reset: item;
}

.markdown-content :deep(ol li) {
  counter-increment: item;
  list-style-type: none;
  position: relative;
}

.markdown-content :deep(ol li::before) {
  content: counter(item) '.';
  position: absolute;
  left: -28px;
  color: #1a1a1a;
  font-weight: 600;
  font-family: 'Crimson Pro', serif;
}

/* Nested lists */
.markdown-content :deep(li > ul),
.markdown-content :deep(li > ol) {
  margin: 8px 0;
}

/* Blockquotes */
.markdown-content :deep(blockquote) {
  margin: 24px 0;
  padding: 16px 24px;
  border-left: 4px solid #1a1a1a;
  background: linear-gradient(to right, #f9f9f9 0%, #fafafa 100%);
  font-style: italic;
  color: #555;
  position: relative;
}

.markdown-content :deep(blockquote p) {
  margin: 0;
}

.markdown-content :deep(blockquote::before) {
  content: '"';
  position: absolute;
  top: 8px;
  left: 8px;
  font-family: 'Crimson Pro', serif;
  font-size: 48px;
  color: #e0e0e0;
  line-height: 1;
}

/* Horizontal Rule */
.markdown-content :deep(hr) {
  border: none;
  height: 1px;
  background: linear-gradient(to right, transparent 0%, #e0e0e0 50%, transparent 100%);
  margin: 40px 0;
}

/* Images */
.markdown-content :deep(img) {
  max-width: 100%;
  height: auto;
  margin: 24px 0;
  border-radius: 6px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

/* Tables */
.markdown-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 24px 0;
  font-size: 14px;
}

.markdown-content :deep(thead) {
  border-bottom: 2px solid #1a1a1a;
}

.markdown-content :deep(th) {
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  color: #1a1a1a;
  background: transparent;
}

.markdown-content :deep(td) {
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
}

.markdown-content :deep(tr:last-child td) {
  border-bottom: none;
}

.markdown-content :deep(tbody tr:hover) {
  background: #fafafa;
}

/* Task Lists */
.markdown-content :deep(input[type="checkbox"]) {
  margin-right: 8px;
  cursor: pointer;
}

/* Keyboard shortcuts */
.markdown-content :deep(kbd) {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  padding: 2px 6px;
  background: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  color: #1a1a1a;
}
</style>
