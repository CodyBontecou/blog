<script setup lang="ts">
import type { Course, Lesson } from '@blog/shared/lib/types/courses'

definePageMeta({
  layout: false
})

const route = useRoute()
const { supabase } = useSupabase()
const toast = useToast()

const courseId = route.params.courseId as string
const lessonId = route.params.lessonId as string

const course = ref<Course | null>(null)
const lesson = ref<Lesson | null>(null)
const loading = ref(true)
const saving = ref(false)

const form = ref({
  id: '',
  course_id: '',
  slug: '',
  title: '',
  description: '',
  content: '',
  video_url: '',
  duration: 0,
  order_index: 0,
  published: false
})

onMounted(async () => {
  await loadCourse(courseId)

  if (lessonId && lessonId !== 'new') {
    await loadLesson(lessonId)
  } else {
    // Get the next order index for new lessons
    const { count } = await supabase
      .from('lessons')
      .select('*', { count: 'exact', head: true })
      .eq('course_id', courseId)

    form.value.course_id = courseId
    form.value.order_index = count || 0
    loading.value = false
  }
})

async function loadCourse(id: string) {
  const { data } = await supabase
    .from('courses')
    .select('*')
    .eq('id', id)
    .single()

  if (data) {
    course.value = data as Course
  }
}

async function loadLesson(id: string) {
  loading.value = true
  const { data } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', id)
    .single()

  if (data) {
    lesson.value = data as Lesson
    // Convert null values to empty strings for form fields
    form.value = {
      ...data,
      description: data.description || '',
      content: data.content || '',
      video_url: data.video_url || ''
    }
  }
  loading.value = false
}

async function saveLesson() {
  saving.value = true
  const { id, ...lessonData } = form.value

  try {
    if (id) {
      // Update existing lesson
      const { error } = await supabase
        .from('lessons')
        .update(lessonData)
        .eq('id', id)

      if (error) throw error
      toast.success('Lesson saved successfully')
    } else {
      // Insert new lesson
      const { data, error } = await supabase
        .from('lessons')
        .insert(lessonData)
        .select()
        .single()

      if (error) throw error
      if (data) {
        form.value.id = data.id
        lesson.value = data
        toast.success('Lesson created successfully')
        // Navigate to the edit page with the new ID
        await navigateTo(`/lessons/${courseId}/${data.id}`)
      }
    }
  } catch (error) {
    console.error('Error saving lesson:', error)
    toast.error('Failed to save lesson')
  } finally {
    saving.value = false
  }
}

async function deleteLesson() {
  if (!lesson.value) return
  if (!confirm(`Are you sure you want to delete "${lesson.value.title}"?`)) return

  try {
    const { error } = await supabase
      .from('lessons')
      .delete()
      .eq('id', lesson.value.id)

    if (error) throw error
    toast.success('Lesson deleted successfully')
    await navigateTo(`/lessons/${courseId}`)
  } catch (error) {
    console.error('Error deleting lesson:', error)
    toast.error('Failed to delete lesson')
  }
}

function goBack() {
  navigateTo(`/lessons/${courseId}`)
}

function goToCourse() {
  navigateTo(`/courses/${courseId}`)
}
</script>

<template>
  <div class="editor-container">
    <!-- Header -->
    <header class="editor-header">
      <div class="breadcrumb-nav">
        <button @click="goToCourse" class="breadcrumb-btn">
          {{ course?.title || 'Course' }}
        </button>
        <span class="breadcrumb-sep">/</span>
        <button @click="goBack" class="breadcrumb-btn">
          Lessons
        </button>
        <span class="breadcrumb-sep">/</span>
        <span class="breadcrumb-current">{{ lesson?.title || 'New Lesson' }}</span>
      </div>

      <div class="header-actions">
        <button v-if="lesson" @click="deleteLesson" class="btn-danger">
          Delete Lesson
        </button>
        <button @click="saveLesson" class="btn-primary" :disabled="saving">
          {{ saving ? 'Saving...' : 'Save Lesson' }}
        </button>
      </div>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading lesson...</p>
    </div>

    <!-- Editor Form -->
    <form v-else @submit.prevent="saveLesson" class="editor-form">
      <div class="form-layout">
        <!-- Main Content Column -->
        <div class="main-column">
          <div class="section fade-in" style="animation-delay: 0.1s">
            <h2 class="section-title">Lesson Information</h2>

            <div class="field">
              <label class="label">Title</label>
              <input
                v-model="form.title"
                type="text"
                class="input input-large"
                placeholder="Getting Started with Components"
                required
              />
            </div>

            <div class="field">
              <label class="label">Slug</label>
              <input
                v-model="form.slug"
                type="text"
                class="input input-mono"
                placeholder="getting-started"
                pattern="[a-z0-9\-]+"
                required
              />
              <p class="hint">URL-friendly identifier (lowercase, hyphens only)</p>
            </div>

            <div class="field">
              <MarkdownEditor
                v-model="form.description"
                label="Description"
                :rows="4"
              />
              <p class="hint">Brief summary shown in lesson lists</p>
            </div>
          </div>

          <div class="section fade-in" style="animation-delay: 0.2s">
            <h2 class="section-title">Lesson Content</h2>

            <div class="field">
              <MarkdownEditor
                v-model="form.content"
                label="Full Content"
                :rows="20"
              />
              <p class="hint">Complete lesson material with detailed explanations and examples</p>
            </div>
          </div>

          <div class="section fade-in" style="animation-delay: 0.3s">
            <h2 class="section-title">Video</h2>

            <div class="field">
              <label class="label">Video URL</label>
              <input
                v-model="form.video_url"
                type="url"
                class="input"
                placeholder="https://example.com/videos/lesson.mp4"
              />
              <p class="hint">Direct URL to video file (mp4, webm, etc.)</p>
            </div>

            <div class="field">
              <label class="label">Duration (seconds)</label>
              <input
                v-model.number="form.duration"
                type="number"
                min="0"
                class="input"
                placeholder="360"
              />
              <p class="hint">Video length in seconds (e.g., 360 for 6 minutes)</p>
            </div>

            <div v-if="form.video_url" class="video-preview">
              <video :src="form.video_url" controls style="width: 100%; max-width: 600px;"></video>
            </div>
          </div>
        </div>

        <!-- Sidebar Column -->
        <aside class="sidebar-column">
          <div class="sidebar-section fade-in" style="animation-delay: 0.4s">
            <h3 class="sidebar-title">Publishing</h3>

            <div class="field">
              <label class="checkbox-label">
                <input v-model="form.published" type="checkbox" class="checkbox" />
                <span class="checkbox-text">
                  <strong>Published</strong>
                  <span class="checkbox-hint">Visible to students</span>
                </span>
              </label>
            </div>

            <div class="status-badge" :class="{ active: form.published }">
              {{ form.published ? '● Live' : '○ Draft' }}
            </div>
          </div>

          <div class="sidebar-section fade-in" style="animation-delay: 0.5s">
            <h3 class="sidebar-title">Lesson Order</h3>

            <div class="field">
              <label class="label">Order Index</label>
              <input
                v-model.number="form.order_index"
                type="number"
                min="0"
                class="input"
              />
              <p class="hint">Determines lesson sequence (0-based)</p>
            </div>
          </div>

          <div v-if="lesson" class="sidebar-section metadata fade-in" style="animation-delay: 0.6s">
            <h3 class="sidebar-title">Metadata</h3>
            <dl class="meta-list">
              <dt>Lesson ID</dt>
              <dd class="mono">{{ lesson.id }}</dd>
              <dt>Created</dt>
              <dd>{{ new Date(lesson.created_at).toLocaleDateString() }}</dd>
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

.breadcrumb-nav {
  display: flex;
  align-items: center;
  gap: 10px;
}

.breadcrumb-btn {
  background: none;
  border: none;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  color: #999;
  cursor: pointer;
  padding: 6px 10px;
  transition: all 0.2s ease;
}

.breadcrumb-btn:hover {
  background: #f5f5f5;
  color: #1a1a1a;
}

.breadcrumb-sep {
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  color: #e0e0e0;
}

.breadcrumb-current {
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  color: #1a1a1a;
  padding: 6px 10px;
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

/* Buttons */
.btn-primary,
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

.video-preview {
  margin-top: 16px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
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

  .breadcrumb-btn {
    color: #999;
  }

  .breadcrumb-btn:hover {
    background: #2a2a2a;
    color: #fafafa;
  }

  .breadcrumb-current {
    color: #fafafa;
  }

  .breadcrumb-sep {
    color: #333;
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
  .btn-danger {
    flex: 1;
    min-width: 0;
  }
}
</style>
