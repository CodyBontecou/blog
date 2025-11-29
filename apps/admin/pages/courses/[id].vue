<script setup lang="ts">
import type { Course } from '@blog/shared/lib/types/courses'

definePageMeta({
  layout: false
})

const route = useRoute()
const router = useRouter()
const { supabase } = useSupabase()

const courseId = route.params.id as string
const course = ref<Course | null>(null)
const loading = ref(true)
const saving = ref(false)

const form = ref({
  id: '',
  slug: '',
  title: '',
  description: '',
  thumbnail_url: '',
  is_free: true,
  price: 0,
  published: false
})

onMounted(async () => {
  if (courseId && courseId !== 'new') {
    await loadCourse(courseId)
  } else {
    loading.value = false
  }
})

async function loadCourse(id: string) {
  loading.value = true
  const { data } = await supabase
    .from('courses')
    .select('*')
    .eq('id', id)
    .single()

  if (data) {
    course.value = data as Course
    form.value = { ...data }
  }
  loading.value = false
}

async function saveCourse() {
  saving.value = true
  const { id, ...courseData } = form.value

  try {
    if (id) {
      // Update existing course
      const { error } = await supabase
        .from('courses')
        .update(courseData)
        .eq('id', id)

      if (error) throw error
    } else {
      // Insert new course
      const { data, error } = await supabase
        .from('courses')
        .insert(courseData)
        .select()
        .single()

      if (error) throw error
      if (data) {
        form.value.id = data.id
        course.value = data
        // Navigate to the edit page with the new ID
        await navigateTo(`/courses/${data.id}`)
      }
    }
  } catch (error) {
    console.error('Error saving course:', error)
    alert('Failed to save course')
  } finally {
    saving.value = false
  }
}

async function deleteCourse() {
  if (!course.value) return
  if (!confirm(`Are you sure you want to delete "${course.value.title}"?`)) return

  try {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', course.value.id)

    if (error) throw error
    await navigateTo('/')
  } catch (error) {
    console.error('Error deleting course:', error)
    alert('Failed to delete course')
  }
}

function goBack() {
  navigateTo('/')
}

function manageLessons() {
  if (course.value) {
    navigateTo(`/lessons/${course.value.id}`)
  }
}
</script>

<template>
  <div class="editor-container">
    <!-- Header -->
    <header class="editor-header">
      <button @click="goBack" class="back-btn">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12 16L6 10L12 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        All Courses
      </button>

      <div class="header-actions">
        <button v-if="course" @click="manageLessons" class="btn-secondary">
          Manage Lessons
        </button>
        <button v-if="course" @click="deleteCourse" class="btn-danger">
          Delete Course
        </button>
        <button @click="saveCourse" class="btn-primary" :disabled="saving">
          {{ saving ? 'Saving...' : 'Save Course' }}
        </button>
      </div>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading course...</p>
    </div>

    <!-- Editor Form -->
    <form v-else @submit.prevent="saveCourse" class="editor-form">
      <div class="form-layout">
        <!-- Main Content Column -->
        <div class="main-column">
          <div class="section fade-in" style="animation-delay: 0.1s">
            <h2 class="section-title">Course Details</h2>

            <div class="field">
              <label class="label">Title</label>
              <input
                v-model="form.title"
                type="text"
                class="input input-large"
                placeholder="Introduction to Web Development"
                required
              />
            </div>

            <div class="field">
              <label class="label">Slug</label>
              <input
                v-model="form.slug"
                type="text"
                class="input input-mono"
                placeholder="intro-web-dev"
                pattern="[a-z0-9-]+"
                required
              />
              <p class="hint">URL-friendly identifier (lowercase, hyphens only)</p>
            </div>

            <div class="field">
              <MarkdownEditor
                v-model="form.description"
                label="Description"
                :rows="8"
              />
              <p class="hint">Full course description supporting markdown</p>
            </div>
          </div>

          <div class="section fade-in" style="animation-delay: 0.2s">
            <h2 class="section-title">Media</h2>

            <div class="field">
              <label class="label">Thumbnail URL</label>
              <input
                v-model="form.thumbnail_url"
                type="url"
                class="input"
                placeholder="https://example.com/thumbnail.jpg"
              />
              <p class="hint">Cover image for the course</p>
            </div>

            <div v-if="form.thumbnail_url" class="thumbnail-preview">
              <img :src="form.thumbnail_url" alt="Course thumbnail" />
            </div>
          </div>
        </div>

        <!-- Sidebar Column -->
        <aside class="sidebar-column">
          <div class="sidebar-section fade-in" style="animation-delay: 0.3s">
            <h3 class="sidebar-title">Publishing</h3>

            <div class="field">
              <label class="checkbox-label">
                <input v-model="form.published" type="checkbox" class="checkbox" />
                <span class="checkbox-text">
                  <strong>Published</strong>
                  <span class="checkbox-hint">Visible to public</span>
                </span>
              </label>
            </div>

            <div class="status-badge" :class="{ active: form.published }">
              {{ form.published ? '● Live' : '○ Draft' }}
            </div>
          </div>

          <div class="sidebar-section fade-in" style="animation-delay: 0.4s">
            <h3 class="sidebar-title">Pricing</h3>

            <div class="field">
              <label class="checkbox-label">
                <input v-model="form.is_free" type="checkbox" class="checkbox" />
                <span class="checkbox-text">
                  <strong>Free Course</strong>
                </span>
              </label>
            </div>

            <div v-if="!form.is_free" class="field">
              <label class="label">Price (USD)</label>
              <div class="price-input">
                <span class="currency">$</span>
                <input
                  v-model.number="form.price"
                  type="number"
                  step="0.01"
                  min="0"
                  class="input"
                  placeholder="49.99"
                />
              </div>
            </div>
          </div>

          <div v-if="course" class="sidebar-section metadata fade-in" style="animation-delay: 0.5s">
            <h3 class="sidebar-title">Metadata</h3>
            <dl class="meta-list">
              <dt>Course ID</dt>
              <dd class="mono">{{ course.id }}</dd>
              <dt>Created</dt>
              <dd>{{ new Date(course.created_at).toLocaleDateString() }}</dd>
            </dl>
          </div>
        </aside>
      </div>
    </form>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@300;400;600&family=DM+Sans:wght@400;500&display=swap');

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.editor-container {
  min-height: 100vh;
  background: #fafafa;
  font-family: 'DM Sans', -apple-system, sans-serif;
  color: #1a1a1a;
}

/* Header */
.editor-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(250, 250, 250, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e0e0e0;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  padding: 8px 12px 8px 8px;
  transition: all 0.2s ease;
}

.back-btn:hover {
  background: #f5f5f5;
  color: #1a1a1a;
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

/* Buttons */
.btn-primary,
.btn-secondary,
.btn-danger {
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.btn-primary {
  background: #1a1a1a;
  color: #fafafa;
}

.btn-primary:hover:not(:disabled) {
  opacity: 0.8;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: white;
  color: #1a1a1a;
  border: 1px solid #e0e0e0;
}

.btn-secondary:hover {
  border-color: #1a1a1a;
}

.btn-danger {
  background: transparent;
  color: #e74c3c;
  border: 1px solid #e74c3c;
}

.btn-danger:hover {
  background: #e74c3c;
  color: #fafafa;
}

/* Loading */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px 40px;
  gap: 16px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 2px solid #e0e0e0;
  border-top-color: #1a1a1a;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-state p {
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  color: #999;
}

/* Form Layout */
.editor-form {
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 40px 120px;
}

.form-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 60px;
}

/* Main Column */
.main-column {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.section {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 2px;
  padding: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.section-title {
  font-family: 'Crimson Pro', serif;
  font-size: 28px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 32px 0;
  letter-spacing: -0.01em;
}

/* Fields */
.field {
  margin-bottom: 28px;
}

.field:last-child {
  margin-bottom: 0;
}

.label {
  display: block;
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #999;
  margin-bottom: 10px;
}

.input {
  width: 100%;
  padding: 12px 16px;
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  color: #1a1a1a;
  background: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 2px;
  transition: all 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: #1a1a1a;
  background: white;
}

.input-large {
  font-size: 20px;
  font-weight: 600;
  padding: 14px 18px;
}

.input-mono {
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
}

.hint {
  margin-top: 8px;
  font-size: 13px;
  color: #999;
  font-style: italic;
}

.price-input {
  position: relative;
}

.currency {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  color: #999;
}

.price-input .input {
  padding-left: 36px;
}

/* Thumbnail Preview */
.thumbnail-preview {
  margin-top: 16px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  max-width: 500px;
}

.thumbnail-preview img {
  width: 100%;
  height: auto;
  display: block;
}

/* Sidebar */
.sidebar-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.sidebar-section {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 2px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.sidebar-section.metadata {
  background: #f5f5f5;
  border-color: #e0e0e0;
}

.sidebar-title {
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #999;
  margin: 0 0 20px 0;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  margin-bottom: 16px;
}

.checkbox {
  margin-top: 2px;
  cursor: pointer;
  width: 18px;
  height: 18px;
  accent-color: #1a1a1a;
}

.checkbox-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.checkbox-text strong {
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  color: #1a1a1a;
  font-weight: 600;
}

.checkbox-hint {
  font-size: 13px;
  color: #999;
}

.status-badge {
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  padding: 8px 14px;
  border-radius: 20px;
  text-align: center;
  background: #f5f5f5;
  color: #999;
  border: 1px solid #e0e0e0;
}

.status-badge.active {
  background: #e8f5e9;
  color: #2e7d32;
  border-color: #a5d6a7;
}

.meta-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0;
}

.meta-list dt {
  font-family: 'DM Sans', sans-serif;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #999;
  margin: 0;
}

.meta-list dd {
  font-size: 13px;
  color: #1a1a1a;
  margin: 0;
  padding-bottom: 12px;
  border-bottom: 1px solid #e0e0e0;
}

.meta-list dd:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.meta-list dd.mono {
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .editor-container {
    background: #1a1a1a;
    color: #fafafa;
  }

  .editor-header {
    background: rgba(26, 26, 26, 0.95);
    border-color: #333;
  }

  .back-btn {
    color: #999;
  }

  .back-btn:hover {
    background: #2a2a2a;
    color: #fafafa;
  }

  .btn-secondary {
    background: #1a1a1a;
    color: #fafafa;
    border-color: #333;
  }

  .btn-secondary:hover {
    border-color: #fafafa;
  }

  .section,
  .sidebar-section {
    background: #1a1a1a;
    border-color: #333;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  .sidebar-section.metadata {
    background: #2a2a2a;
    border-color: #333;
  }

  .section-title,
  .checkbox-text strong,
  .meta-list dd {
    color: #fafafa;
  }

  .label,
  .sidebar-title,
  .checkbox-hint,
  .hint,
  .meta-list dt {
    color: #666;
  }

  .input {
    background: #2a2a2a;
    border-color: #333;
    color: #fafafa;
  }

  .input:focus {
    border-color: #fafafa;
    background: #1a1a1a;
  }

  .thumbnail-preview,
  .video-preview {
    border-color: #333;
  }

  .spinner {
    border-color: #333;
    border-top-color: #fafafa;
  }

  .loading-state p {
    color: #666;
  }

  .status-badge {
    background: #2a2a2a;
    border-color: #333;
    color: #666;
  }

  .status-badge.active {
    background: #1e4620;
    color: #81c784;
    border-color: #2e7d32;
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .form-layout {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .editor-header {
    flex-wrap: wrap;
  }

  .header-actions {
    width: 100%;
    justify-content: flex-end;
  }
}

@media (max-width: 768px) {
  .editor-header {
    padding: 16px 20px;
  }

  .editor-form {
    padding: 40px 20px 80px;
  }

  .section {
    padding: 28px 20px;
  }

  .header-actions {
    flex-wrap: wrap;
  }

  .btn-primary,
  .btn-secondary,
  .btn-danger {
    flex: 1;
    min-width: 0;
  }
}
</style>
