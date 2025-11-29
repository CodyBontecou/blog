<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { supabase } from '~/lib/supabase/storage'
import type { CourseWithLessons, Lesson, LessonProgress } from '~/lib/types/courses'
import VideoPlayer from './VideoPlayer.vue'
import MarkdownRenderer from './MarkdownRenderer.vue'

const props = defineProps<{
  courseSlug: string
  lessonSlug: string
}>()

const course = ref<CourseWithLessons | null>(null)
const currentLesson = ref<Lesson | null>(null)
const progress = ref<LessonProgress | null>(null)
const user = ref(null)
const loading = ref(true)
const sidebarOpen = ref(true)

const lessonIndex = computed(() => {
  if (!course.value || !currentLesson.value) return -1
  return course.value.lessons.findIndex(l => l.id === currentLesson.value?.id)
})

const nextLesson = computed(() => {
  if (!course.value || lessonIndex.value === -1) return null
  return course.value.lessons[lessonIndex.value + 1] || null
})

const previousLesson = computed(() => {
  if (!course.value || lessonIndex.value === -1) return null
  return course.value.lessons[lessonIndex.value - 1] || null
})

onMounted(async () => {
  // Get current user
  const { data: { user: currentUser } } = await supabase.auth.getUser()
  user.value = currentUser

  // Fetch course with lessons
  const { data: courseData } = await supabase
    .from('courses')
    .select(`
      *,
      lessons (*)
    `)
    .eq('slug', props.courseSlug)
    .eq('published', true)
    .single()

  if (courseData) {
    const lessons = courseData.lessons as Lesson[]
    course.value = {
      ...courseData,
      lessons: lessons.sort((a, b) => a.order_index - b.order_index)
    } as CourseWithLessons

    currentLesson.value = lessons.find(l => l.slug === props.lessonSlug) || null
  }

  // Fetch progress if user is logged in
  if (currentUser && currentLesson.value) {
    const { data: progressData } = await supabase
      .from('lesson_progress')
      .select('*')
      .eq('user_id', currentUser.id)
      .eq('lesson_id', currentLesson.value.id)
      .maybeSingle()

    progress.value = progressData
  }

  loading.value = false
})

function navigateToLesson(lesson: Lesson) {
  window.location.href = `/courses/${props.courseSlug}/${lesson.slug}`
}
</script>

<template>
  <div class="lesson-viewer">
    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
    </div>

    <div v-else-if="!course || !currentLesson" class="error-state">
      <h1>Lesson not found</h1>
      <a :href="`/courses/${courseSlug}`" class="back-link">← Back to course</a>
    </div>

    <div v-else class="viewer-layout">
      <!-- Sidebar -->
      <aside :class="['lesson-sidebar', { open: sidebarOpen }]">
        <div class="sidebar-header">
          <a :href="`/courses/${course.slug}`" class="course-title">
            ← {{ course.title }}
          </a>
          <button @click="sidebarOpen = !sidebarOpen" class="toggle-sidebar">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        </div>

        <div class="lessons-list">
          <div
            v-for="(lesson, index) in course.lessons"
            :key="lesson.id"
            @click="navigateToLesson(lesson)"
            :class="['lesson-item', { active: lesson.id === currentLesson.id }]"
          >
            <div class="lesson-number">{{ String(index + 1).padStart(2, '0') }}</div>
            <div class="lesson-info">
              <div class="lesson-title">{{ lesson.title }}</div>
              <div v-if="lesson.duration" class="lesson-duration">
                {{ Math.floor(lesson.duration / 60) }}:{{ String(lesson.duration % 60).padStart(2, '0') }}
              </div>
            </div>
            <div class="lesson-status">
              <svg v-if="lesson.id === currentLesson.id" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
              </svg>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="lesson-content">
        <!-- Video Player -->
        <div class="video-container">
          <VideoPlayer
            v-if="currentLesson.video_url"
            :video-url="currentLesson.video_url"
            :lesson-id="currentLesson.id"
            :course-id="course.id"
            :user-id="user?.id"
            :initial-progress="progress?.watched_seconds || 0"
          />
          <div v-else class="no-video">
            <p>No video available for this lesson</p>
          </div>
        </div>

        <!-- Lesson Info -->
        <div class="lesson-header">
          <div class="lesson-meta">
            <span class="lesson-number-badge">
              Lesson {{ lessonIndex + 1 }} of {{ course.lessons.length }}
            </span>
          </div>
          <h1 class="lesson-title-main">{{ currentLesson.title }}</h1>
          <MarkdownRenderer
            v-if="currentLesson.description"
            :content="currentLesson.description"
            class="lesson-description"
          />
        </div>

        <!-- Lesson Content -->
        <div v-if="currentLesson.content" class="lesson-content-section">
          <MarkdownRenderer :content="currentLesson.content" />
        </div>

        <!-- Navigation -->
        <div class="lesson-navigation">
          <button
            v-if="previousLesson"
            @click="navigateToLesson(previousLesson)"
            class="nav-btn prev"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <div class="nav-info">
              <span class="nav-label">Previous</span>
              <span class="nav-title">{{ previousLesson.title }}</span>
            </div>
          </button>

          <button
            v-if="nextLesson"
            @click="navigateToLesson(nextLesson)"
            class="nav-btn next"
          >
            <div class="nav-info">
              <span class="nav-label">Next</span>
              <span class="nav-title">{{ nextLesson.title }}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </main>
    </div>

    <!-- Mobile Toggle -->
    <button
      v-if="!sidebarOpen"
      @click="sidebarOpen = true"
      class="mobile-toggle"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
      Course Content
    </button>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@300;400;600&family=DM+Sans:wght@400;500&display=swap');

/* Animations */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.lesson-viewer {
  min-height: 100vh;
  background: #fafafa;
  font-family: 'DM Sans', sans-serif;
}

.loading,
.error-state {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 2px solid #e0e0e0;
  border-top-color: #1a1a1a;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.error-state h1 {
  font-family: 'Crimson Pro', serif;
  font-size: 48px;
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0 0 16px 0;
  color: #1a1a1a;
}

.back-link {
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
  text-decoration: none;
  transition: opacity 0.3s ease;
  display: inline-block;
}

.back-link:hover {
  opacity: 0.6;
}

.viewer-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 100vh;
}

/* Sidebar */
.lesson-sidebar {
  background: #fafafa;
  border-right: 1px solid #e0e0e0;
  overflow-y: auto;
  position: sticky;
  top: 0;
  height: 100vh;
  transition: transform 0.3s ease;
}

.sidebar-header {
  padding: 24px 20px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.course-title {
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: #999;
  text-decoration: none;
  transition: color 0.3s ease;
}

.course-title:hover {
  color: #1a1a1a;
}

.toggle-sidebar {
  background: transparent;
  border: none;
  color: #ccc;
  cursor: pointer;
  padding: 4px;
  display: none;
  transition: color 0.3s ease;
}

.toggle-sidebar:hover {
  color: #1a1a1a;
}

.lessons-list {
  padding: 0;
}

.lesson-item {
  display: grid;
  grid-template-columns: 40px 1fr auto;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  transition: all 0.3s ease;
  align-items: center;
}

.lesson-item:hover {
  background: #f5f5f5;
}

.lesson-item.active {
  background: #1a1a1a;
  color: #fafafa;
}

.lesson-number {
  font-family: 'Crimson Pro', serif;
  font-size: 16px;
  font-weight: 400;
  color: #999;
  letter-spacing: -0.01em;
}

.lesson-item.active .lesson-number {
  color: #fafafa;
}

.lesson-info {
  min-width: 0;
}

.lesson-title {
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 400;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #1a1a1a;
}

.lesson-item.active .lesson-title {
  color: #fafafa;
  font-weight: 500;
}

.lesson-duration {
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  color: #999;
}

.lesson-item.active .lesson-duration {
  color: rgba(250, 250, 250, 0.6);
}

.lesson-status {
  color: #ccc;
}

.lesson-item.active .lesson-status {
  color: #fafafa;
}

/* Main Content */
.lesson-content {
  padding: 48px 40px;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
}

.video-container {
  margin-bottom: 48px;
}

.no-video {
  aspect-ratio: 16 / 9;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  color: #999;
}

.lesson-header {
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e0e0e0;
}

.lesson-content-section {
  margin-bottom: 48px;
  padding-bottom: 32px;
  border-bottom: 1px solid #e0e0e0;
}

.lesson-meta {
  margin-bottom: 16px;
}

.lesson-number-badge {
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  font-weight: 500;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.lesson-title-main {
  font-family: 'Crimson Pro', serif;
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin: 0 0 16px 0;
  color: #1a1a1a;
}

.lesson-description {
  margin: 16px 0 0 0;
}

/* Navigation */
.lesson-navigation {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid #e0e0e0;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s ease;
  text-align: left;
  font-family: 'DM Sans', sans-serif;
}

.nav-btn:hover {
  opacity: 0.6;
}

.nav-btn.next {
  justify-content: flex-end;
  text-align: right;
}

.nav-btn svg {
  flex-shrink: 0;
  color: #ccc;
}

.nav-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.nav-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  font-weight: 500;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.nav-title {
  font-family: 'Crimson Pro', serif;
  font-size: 16px;
  font-weight: 400;
  color: #1a1a1a;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: -0.01em;
}

.mobile-toggle {
  display: none;
}

/* Responsive */
@media (max-width: 968px) {
  .viewer-layout {
    grid-template-columns: 1fr;
  }

  .lesson-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 80%;
    max-width: 280px;
    z-index: 1000;
    transform: translateX(-100%);
    box-shadow: 2px 0 20px rgba(0, 0, 0, 0.1);
  }

  .lesson-sidebar.open {
    transform: translateX(0);
  }

  .toggle-sidebar {
    display: block;
  }

  .lesson-content {
    padding: 32px 24px;
  }

  .mobile-toggle {
    display: flex;
    align-items: center;
    gap: 8px;
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: #1a1a1a;
    color: #fafafa;
    border: none;
    padding: 12px 20px;
    border-radius: 0;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 999;
    transition: opacity 0.3s ease;
  }

  .mobile-toggle:hover {
    opacity: 0.8;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .lesson-viewer {
    background: #1a1a1a;
  }

  .error-state h1,
  .lesson-title-main,
  .nav-title {
    color: #fafafa;
  }

  .lesson-description {
    color: #999;
  }

  .lesson-sidebar {
    background: #1a1a1a;
    border-color: #333;
  }

  .sidebar-header,
  .lesson-item {
    border-color: #333;
  }

  .course-title {
    color: #666;
  }

  .course-title:hover {
    color: #fafafa;
  }

  .toggle-sidebar {
    color: #555;
  }

  .toggle-sidebar:hover {
    color: #fafafa;
  }

  .lesson-item:hover {
    background: #2a2a2a;
  }

  .lesson-item.active {
    background: #fafafa;
    color: #1a1a1a;
  }

  .lesson-number {
    color: #666;
  }

  .lesson-item.active .lesson-number {
    color: #1a1a1a;
  }

  .lesson-title {
    color: #fafafa;
  }

  .lesson-item.active .lesson-title {
    color: #1a1a1a;
  }

  .lesson-duration {
    color: #666;
  }

  .lesson-item.active .lesson-duration {
    color: rgba(26, 26, 26, 0.6);
  }

  .lesson-status {
    color: #555;
  }

  .lesson-item.active .lesson-status {
    color: #1a1a1a;
  }

  .no-video {
    background: #2a2a2a;
    color: #666;
  }

  .lesson-header,
  .lesson-content-section,
  .lesson-navigation {
    border-color: #333;
  }

  .lesson-number-badge,
  .nav-label {
    color: #666;
  }

  .nav-btn svg {
    color: #555;
  }

  .loading-spinner {
    border-color: #333;
    border-top-color: #fafafa;
  }

  .mobile-toggle {
    background: #fafafa;
    color: #1a1a1a;
  }
}
</style>
