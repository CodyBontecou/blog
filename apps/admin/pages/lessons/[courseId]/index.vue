<script setup lang="ts">
import type { Course, Lesson } from '@blog/shared/lib/types/courses'

definePageMeta({
  layout: false
})

const route = useRoute()
const { supabase } = useSupabase()

const courseId = route.params.courseId as string
const course = ref<Course | null>(null)
const lessons = ref<Lesson[]>([])
const loading = ref(true)

onMounted(async () => {
  await loadCourse()
  await loadLessons()
  loading.value = false
})

async function loadCourse() {
  const { data } = await supabase
    .from('courses')
    .select('*')
    .eq('id', courseId)
    .single()

  if (data) {
    course.value = data as Course
  }
}

async function loadLessons() {
  const { data } = await supabase
    .from('lessons')
    .select('*')
    .eq('course_id', courseId)
    .order('order_index', { ascending: true })

  if (data) {
    lessons.value = data as Lesson[]
  }
}

function newLesson() {
  navigateTo(`/lessons/${courseId}/new`)
}

function editLesson(lessonId: string) {
  navigateTo(`/lessons/${courseId}/${lessonId}`)
}

function goBack() {
  navigateTo('/')
}

function goToCourse() {
  navigateTo(`/courses/${courseId}`)
}
</script>

<template>
  <div class="list-container">
    <!-- Header -->
    <header class="list-header">
      <div class="header-top">
        <div class="breadcrumb-nav">
          <button @click="goBack" class="breadcrumb-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 14L4 8L10 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            All Courses
          </button>
          <span class="breadcrumb-sep">/</span>
          <button @click="goToCourse" class="breadcrumb-btn">
            {{ course?.title || 'Course' }}
          </button>
        </div>

        <button @click="newLesson" class="btn-primary">
          New Lesson
        </button>
      </div>

      <div class="header-title-section">
        <h1 class="page-title">Lessons</h1>
        <p v-if="course" class="page-subtitle">{{ lessons.length }} lesson{{ lessons.length !== 1 ? 's' : '' }}</p>
      </div>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading lessons...</p>
    </div>

    <!-- Lessons List -->
    <div v-else class="list-content">
      <div v-if="lessons.length === 0" class="empty-state">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="8" y="12" width="32" height="28" rx="2" stroke="currentColor" stroke-width="2"/>
          <path d="M16 20H32M16 26H28M16 32H24" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <h3>No lessons yet</h3>
        <p>Create your first lesson to get started</p>
        <button @click="newLesson" class="btn-primary">Create Lesson</button>
      </div>

      <div v-else class="lessons-grid">
        <div
          v-for="(lesson, index) in lessons"
          :key="lesson.id"
          @click="editLesson(lesson.id)"
          class="lesson-card fade-in"
          :style="`animation-delay: ${0.1 + index * 0.1}s`"
        >
          <div class="lesson-order">{{ String(lesson.order_index + 1).padStart(2, '0') }}</div>
          <div class="lesson-content">
            <h3 class="lesson-title">{{ lesson.title }}</h3>
            <p v-if="lesson.description" class="lesson-description">{{ lesson.description }}</p>

            <div class="lesson-meta">
              <span class="meta-badge" :class="{ active: lesson.published }">
                {{ lesson.published ? 'Published' : 'Draft' }}
              </span>
              <span v-if="lesson.video_url" class="meta-item">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2H12V12H2V2Z" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M5 4.5L9.5 7L5 9.5V4.5Z" fill="currentColor"/>
                </svg>
                Video
              </span>
              <span v-if="lesson.duration" class="meta-item">
                {{ Math.floor(lesson.duration / 60) }}:{{ String(lesson.duration % 60).padStart(2, '0') }}
              </span>
            </div>
          </div>

          <svg class="lesson-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M8 6L12 10L8 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
      </div>
    </div>
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

.list-container {
  min-height: 100vh;
  background: #fafafa;
  font-family: 'DM Sans', sans-serif;
}

/* Header */
.list-header {
  background: white;
  border-bottom: 1px solid #e0e0e0;
  padding: 32px 40px 40px;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.breadcrumb-nav {
  display: flex;
  align-items: center;
  gap: 10px;
}

.breadcrumb-btn {
  display: flex;
  align-items: center;
  gap: 6px;
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

.header-title-section {
  /* Title section styling */
}

.page-title {
  font-family: 'Crimson Pro', serif;
  font-size: 48px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  letter-spacing: -0.02em;
}

.page-subtitle {
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  color: #999;
  margin: 0;
}

/* Buttons */
.btn-primary {
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #1a1a1a;
  color: #fafafa;
}

.btn-primary:hover {
  background: #000;
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

/* Content */
.list-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 40px;
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 80px 40px;
  gap: 16px;
}

.empty-state svg {
  color: #e0e0e0;
  margin-bottom: 8px;
}

.empty-state h3 {
  font-family: 'Crimson Pro', serif;
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.empty-state p {
  font-size: 15px;
  color: #999;
  margin: 0 0 24px 0;
}

/* Lessons Grid */
.lessons-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.lesson-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 2px;
  padding: 28px 32px;
  display: grid;
  grid-template-columns: 48px 1fr auto;
  gap: 24px;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.lesson-card:hover {
  border-color: #1a1a1a;
  box-shadow: 0 4px 12px rgba(26, 26, 26, 0.08);
  transform: translateY(-2px);
}

.lesson-order {
  font-family: 'Crimson Pro', serif;
  font-size: 32px;
  font-weight: 600;
  color: #e0e0e0;
  line-height: 1;
  transition: color 0.3s ease;
}

.lesson-card:hover .lesson-order {
  color: #1a1a1a;
}

.lesson-content {
  flex: 1;
  min-width: 0;
}

.lesson-title {
  font-family: 'Crimson Pro', serif;
  font-size: 22px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  letter-spacing: -0.01em;
}

.lesson-description {
  font-size: 15px;
  color: #999;
  margin: 0 0 12px 0;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.lesson-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.meta-badge {
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 12px;
  background: #f5f5f5;
  color: #999;
  border: 1px solid #e0e0e0;
}

.meta-badge.active {
  background: #e8f5e9;
  color: #2e7d32;
  border-color: #a5d6a7;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  color: #999;
}

.meta-item svg {
  color: #1a1a1a;
}

.lesson-arrow {
  color: #e0e0e0;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.lesson-card:hover .lesson-arrow {
  color: #1a1a1a;
  transform: translateX(4px);
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .list-container {
    background: #1a1a1a;
  }

  .list-header {
    background: #1a1a1a;
    border-color: #333;
  }

  .breadcrumb-btn {
    color: #999;
  }

  .breadcrumb-btn:hover {
    background: #2a2a2a;
    color: #fafafa;
  }

  .breadcrumb-sep {
    color: #333;
  }

  .page-title {
    color: #fafafa;
  }

  .page-subtitle {
    color: #666;
  }

  .btn-primary:hover {
    background: #fafafa;
    color: #1a1a1a;
  }

  .spinner {
    border-color: #333;
    border-top-color: #fafafa;
  }

  .loading-state p {
    color: #666;
  }

  .empty-state svg {
    color: #333;
  }

  .empty-state h3 {
    color: #fafafa;
  }

  .empty-state p {
    color: #666;
  }

  .lesson-card {
    background: #1a1a1a;
    border-color: #333;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }

  .lesson-card:hover {
    border-color: #fafafa;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  }

  .lesson-order {
    color: #333;
  }

  .lesson-card:hover .lesson-order {
    color: #fafafa;
  }

  .lesson-title {
    color: #fafafa;
  }

  .lesson-description {
    color: #666;
  }

  .meta-badge {
    background: #2a2a2a;
    border-color: #333;
    color: #666;
  }

  .meta-badge.active {
    background: #1e4620;
    color: #81c784;
    border-color: #2e7d32;
  }

  .meta-item {
    color: #666;
  }

  .meta-item svg {
    color: #fafafa;
  }

  .lesson-arrow {
    color: #333;
  }

  .lesson-card:hover .lesson-arrow {
    color: #fafafa;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .list-header {
    padding: 24px 20px 32px;
  }

  .header-top {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .page-title {
    font-size: 36px;
  }

  .list-content {
    padding: 40px 20px;
  }

  .lesson-card {
    grid-template-columns: 36px 1fr;
    padding: 20px;
    gap: 16px;
  }

  .lesson-order {
    font-size: 24px;
  }

  .lesson-title {
    font-size: 18px;
  }

  .lesson-arrow {
    grid-column: 2;
    justify-self: end;
  }
}
</style>
