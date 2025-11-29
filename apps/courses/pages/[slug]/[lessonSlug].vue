<script setup lang="ts">
import type { Course, Lesson } from '@blog/shared/lib/types/courses'

definePageMeta({
  layout: false
})

const route = useRoute()
const { supabase, user } = useSupabase()

const courseSlug = route.params.slug as string
const lessonSlug = route.params.lessonSlug as string

const course = ref<Course | null>(null)
const lesson = ref<Lesson | null>(null)
const lessons = ref<Lesson[]>([])
const loading = ref(true)
const markingComplete = ref(false)

// Track completed lessons from database
const completedLessonIds = ref<Set<string>>(new Set())

onMounted(async () => {
  // Load course
  const { data: courseData } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', courseSlug)
    .eq('published', true)
    .single()

  if (courseData) {
    course.value = courseData as Course

    // Load all lessons for navigation
    const { data: lessonsData } = await supabase
      .from('lessons')
      .select('*')
      .eq('course_id', courseData.id)
      .eq('published', true)
      .order('order_index', { ascending: true })

    if (lessonsData) {
      lessons.value = lessonsData as Lesson[]

      // Find current lesson
      const currentLesson = lessonsData.find((l: Lesson) => l.slug === lessonSlug)
      if (currentLesson) {
        lesson.value = currentLesson as Lesson
      }
    }

    // Load user progress if authenticated
    if (user.value) {
      await loadUserProgress(courseData.id)
    }
  }

  loading.value = false
})

async function loadUserProgress(courseId: string) {
  if (!user.value) return

  const { data } = await supabase
    .from('lesson_progress')
    .select('lesson_id')
    .eq('user_id', user.value.id)
    .eq('course_id', courseId)
    .eq('completed', true)

  if (data) {
    completedLessonIds.value = new Set(data.map(p => p.lesson_id))
  }
}

const currentLessonIndex = computed(() => {
  if (!lesson.value) return -1
  return lessons.value.findIndex(l => l.id === lesson.value!.id)
})

const prevLesson = computed(() => {
  if (currentLessonIndex.value > 0) {
    return lessons.value[currentLessonIndex.value - 1]
  }
  return null
})

const nextLesson = computed(() => {
  if (currentLessonIndex.value >= 0 && currentLessonIndex.value < lessons.value.length - 1) {
    return lessons.value[currentLessonIndex.value + 1]
  }
  return null
})

// Progress tracking
const completedCount = computed(() => completedLessonIds.value.size)
const progressPercentage = computed(() => {
  if (lessons.value.length === 0) return 0
  return Math.round((completedCount.value / lessons.value.length) * 100)
})

const isLessonCompleted = (lessonId: string) => {
  return completedLessonIds.value.has(lessonId)
}

const isLessonCurrent = (lessonId: string) => {
  return lesson.value?.id === lessonId
}

const getLessonState = (lessonId: string) => {
  if (isLessonCurrent(lessonId)) return 'current'
  if (isLessonCompleted(lessonId)) return 'completed'
  return 'upcoming'
}

// Mobile navigation
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

// Mark lesson as complete
async function markAsComplete() {
  if (!lesson.value || !course.value) return

  // Check if user is authenticated
  if (!user.value) {
    // Build redirect URL to come back to next lesson or current if no next
    const targetLesson = nextLesson.value || lesson.value
    const redirectUrl = `/${courseSlug}/${targetLesson.slug}`

    // Redirect to login
    await navigateTo(`/login?redirect=${encodeURIComponent(redirectUrl)}`)
    return
  }

  markingComplete.value = true

  try {
    // Save or update progress in database
    const { error } = await supabase
      .from('lesson_progress')
      .upsert({
        user_id: user.value.id,
        course_id: course.value.id,
        lesson_id: lesson.value.id,
        completed: true,
        completed_at: new Date().toISOString()
      })

    if (error) throw error

    // Add to completed set
    completedLessonIds.value.add(lesson.value.id)

    // Navigate to next lesson if available
    if (nextLesson.value) {
      await navigateTo(`/${courseSlug}/${nextLesson.value.slug}`)
    }
  } catch (error) {
    console.error('Error marking lesson as complete:', error)
  } finally {
    markingComplete.value = false
  }
}
</script>

<template>
  <div class="lesson-viewer">
    <!-- Loading -->
    <div v-if="loading" class="loading-state fade-in">
      <div class="spinner"></div>
      <p>Loading lesson...</p>
    </div>

    <!-- Not Found -->
    <div v-else-if="!lesson || !course" class="not-found fade-in">
      <h2>Lesson not found</h2>
      <NuxtLink :to="`/${courseSlug}`">← Back to course</NuxtLink>
    </div>

    <!-- Three-Column Layout -->
    <div v-else class="lesson-layout">
      <!-- Mobile Header -->
      <header class="mobile-header">
        <button @click="toggleMobileMenu" class="mobile-menu-button">
          <svg v-if="!mobileMenuOpen" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div class="mobile-header-title">
          <div class="mobile-course-name">{{ course.title }}</div>
          <div class="mobile-lesson-label">Lesson {{ String(currentLessonIndex + 1).padStart(2, '0') }}</div>
        </div>
        <UserAvatar />
      </header>

      <!-- Mobile Navigation Drawer -->
      <div v-if="mobileMenuOpen" class="mobile-overlay" @click="closeMobileMenu"></div>
      <aside class="mobile-drawer" :class="{ open: mobileMenuOpen }">
        <div class="mobile-drawer-content">
          <div class="drawer-header">
            <h2 class="drawer-title">{{ course.title }}</h2>
            <button @click="closeMobileMenu" class="drawer-close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- Progress in Drawer -->
          <div class="drawer-progress">
            <div class="drawer-progress-stats">
              <span class="drawer-progress-label">Progress</span>
              <span class="drawer-progress-value">{{ completedCount }}/{{ lessons.length }}</span>
            </div>
            <div class="drawer-progress-bar">
              <div class="drawer-progress-fill" :style="`width: ${progressPercentage}%`"></div>
            </div>
          </div>

          <!-- Lessons List -->
          <nav class="drawer-lessons">
            <div class="drawer-lessons-label">All Lessons</div>
            <ul class="drawer-lessons-list">
              <li
                v-for="(item, index) in lessons"
                :key="item.id"
                class="drawer-lesson-item"
                :class="getLessonState(item.id)"
              >
                <NuxtLink
                  :to="`/${courseSlug}/${item.slug}`"
                  class="drawer-lesson-link"
                  @click="closeMobileMenu"
                >
                  <div class="drawer-lesson-status">
                    <div class="drawer-status-indicator"></div>
                    <span class="drawer-lesson-number">{{ String(index + 1).padStart(2, '0') }}</span>
                  </div>
                  <span class="drawer-lesson-name">{{ item.title }}</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      <!-- Left Sidebar - Lesson Navigation -->
      <aside class="sidebar sidebar-left fade-in">
        <div class="sidebar-sticky">
          <!-- Course Header -->
          <div class="course-header">
            <div class="course-header-top">
              <NuxtLink :to="`/${courseSlug}`" class="course-back-link">
                ← Back to course
              </NuxtLink>
              <UserAvatar />
            </div>
            <h2 class="course-title">{{ course.title }}</h2>
          </div>

          <!-- Lessons List -->
          <nav class="lessons-nav">
            <div class="lessons-label">Lessons</div>
            <ul class="lessons-list">
              <li
                v-for="(item, index) in lessons"
                :key="item.id"
                class="lesson-item"
                :class="getLessonState(item.id)"
                :style="`animation-delay: ${0.1 + index * 0.05}s`"
              >
                <NuxtLink
                  :to="`/${courseSlug}/${item.slug}`"
                  class="lesson-link"
                >
                  <div class="lesson-status">
                    <div class="status-indicator"></div>
                    <span class="lesson-number">{{ String(index + 1).padStart(2, '0') }}</span>
                  </div>
                  <span class="lesson-name">{{ item.title }}</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <!-- Compact Header -->
        <header class="content-header fade-in">
          <div class="header-label">
            Lesson {{ String(currentLessonIndex + 1).padStart(2, '0') }}
          </div>
          <h1 class="content-title">{{ lesson.title }}</h1>
        </header>

        <!-- Video Player -->
        <div v-if="lesson.video_url" class="video-section fade-in" style="animation-delay: 0.1s">
          <VideoPlayer :video-url="lesson.video_url" />
        </div>

        <!-- Lesson Content -->
        <article class="lesson-content fade-in" style="animation-delay: 0.2s">
          <MarkdownRenderer :content="lesson.content" />
        </article>

        <!-- Bottom Navigation -->
        <nav class="bottom-navigation fade-in" style="animation-delay: 0.3s">
          <NuxtLink
            v-if="prevLesson"
            :to="`/${courseSlug}/${prevLesson.slug}`"
            class="nav-button prev"
          >
            <svg class="nav-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 16L6 10L12 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <div class="nav-content">
              <span class="nav-label">Previous</span>
              <span class="nav-title">{{ prevLesson.title }}</span>
            </div>
          </NuxtLink>

          <NuxtLink
            v-if="nextLesson"
            :to="`/${courseSlug}/${nextLesson.slug}`"
            class="nav-button next"
          >
            <div class="nav-content">
              <span class="nav-label">Next</span>
              <span class="nav-title">{{ nextLesson.title }}</span>
            </div>
            <svg class="nav-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M8 4L14 10L8 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </NuxtLink>
        </nav>
      </main>

      <!-- Right Sidebar - Progress & CTA -->
      <aside class="sidebar sidebar-right fade-in" style="animation-delay: 0.2s">
        <div class="sidebar-sticky">
          <!-- Progress Widget -->
          <div class="progress-widget">
            <div class="widget-label">Your Progress</div>
            <div class="progress-stats">
              <div class="stat-primary">{{ progressPercentage }}%</div>
              <div class="stat-secondary">{{ completedCount }} of {{ lessons.length }} lessons</div>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" :style="`width: ${progressPercentage}%`"></div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="quick-actions">
            <div class="widget-label">Quick Actions</div>
            <button
              @click="markAsComplete"
              class="action-button primary"
              :disabled="markingComplete || isLessonCompleted(lesson?.id || '')"
            >
              {{ isLessonCompleted(lesson?.id || '') ? 'Completed ✓' : markingComplete ? 'Saving...' : 'Mark as Complete' }}
            </button>
            <button class="action-button secondary">
              Download Resources
            </button>
          </div>

        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@300;400;600&family=DM+Sans:wght@400;500&display=swap');

/* Animations */
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

.lesson-viewer {
  min-height: 100vh;
  background: #fafafa;
  font-family: 'DM Sans', -apple-system, sans-serif;
}

/* Loading & Not Found */
.loading-state,
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px 40px;
  gap: 16px;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 2px solid #e0e0e0;
  border-top-color: #1a1a1a;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-state p,
.not-found a {
  font-size: 14px;
  color: #999;
  text-decoration: none;
  transition: color 0.3s ease;
}

.not-found h2 {
  font-family: 'Crimson Pro', serif;
  font-size: 32px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.not-found a:hover {
  color: #1a1a1a;
}

/* Three-Column Layout */
.lesson-layout {
  display: grid;
  grid-template-columns: 300px 1fr 300px;
  min-height: 100vh;
}

/* Sidebars */
.sidebar {
  height: 100vh;
  overflow-y: auto;
  border-right: 1px solid #e0e0e0;
}

.sidebar-right {
  border-right: none;
  border-left: 1px solid #e0e0e0;
}

.sidebar-sticky {
  position: sticky;
  top: 0;
  padding: 40px 24px;
}

/* Custom Scrollbar for Sidebars */
.sidebar::-webkit-scrollbar {
  width: 4px;
}

.sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar::-webkit-scrollbar-thumb {
  background: #e0e0e0;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: #ccc;
}

/* Left Sidebar - Lesson Navigation */
.course-header {
  margin-bottom: 40px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e0e0e0;
}

.course-header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  gap: 12px;
}

.course-back-link {
  font-size: 12px;
  color: #999;
  text-decoration: none;
  transition: color 0.3s ease;
  white-space: nowrap;
}

.course-back-link:hover {
  color: #1a1a1a;
}

.course-title {
  font-family: 'Crimson Pro', serif;
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  letter-spacing: -0.01em;
  line-height: 1.2;
}

.lessons-label {
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #999;
  margin-bottom: 16px;
}

.lessons-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.lesson-item {
  opacity: 0;
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.lesson-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border-left: 2px solid transparent;
}

.lesson-link:hover {
  background: #f5f5f5;
}

.lesson-status {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.status-indicator {
  width: 6px;
  height: 6px;
  border: 1.5px solid #e0e0e0;
  background: transparent;
  transition: all 0.3s ease;
}

.lesson-number {
  font-size: 11px;
  font-weight: 500;
  color: #999;
  min-width: 20px;
}

.lesson-name {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
  transition: color 0.3s ease;
}

/* Lesson States */
.lesson-item.current .lesson-link {
  background: white;
  border-left-color: #1a1a1a;
}

.lesson-item.current .status-indicator {
  background: #1a1a1a;
  border-color: #1a1a1a;
}

.lesson-item.current .lesson-number,
.lesson-item.current .lesson-name {
  color: #1a1a1a;
  font-weight: 500;
}

.lesson-item.completed .status-indicator {
  background: #4caf50;
  border-color: #4caf50;
}

.lesson-item.completed .lesson-link:hover .status-indicator {
  transform: scale(1.2);
}

/* Main Content */
.main-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 48px 48px 80px;
  width: 100%;
}

.content-header {
  margin-bottom: 32px;
}

.header-label {
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #999;
  margin-bottom: 12px;
}

.content-title {
  font-family: 'Crimson Pro', serif;
  font-size: 36px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.video-section {
  margin-bottom: 48px;
}

.lesson-content {
  font-size: 16px;
  line-height: 1.8;
  color: #1a1a1a;
  margin-bottom: 60px;
}

.lesson-content :deep(h2) {
  font-family: 'Crimson Pro', serif;
  font-size: 28px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 40px 0 16px 0;
  letter-spacing: -0.01em;
  line-height: 1.2;
}

.lesson-content :deep(h3) {
  font-family: 'Crimson Pro', serif;
  font-size: 22px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 32px 0 12px 0;
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.lesson-content :deep(p) {
  margin: 0 0 20px 0;
  color: #666;
  line-height: 1.8;
}

.lesson-content :deep(ul),
.lesson-content :deep(ol) {
  margin: 0 0 20px 0;
  padding-left: 28px;
  color: #666;
}

.lesson-content :deep(li) {
  margin-bottom: 8px;
  line-height: 1.7;
}

.lesson-content :deep(a) {
  color: #1a1a1a;
  text-decoration: underline;
  transition: opacity 0.3s ease;
}

.lesson-content :deep(a:hover) {
  opacity: 0.6;
}

.lesson-content :deep(code) {
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  background: #f5f5f5;
  padding: 3px 7px;
  color: #1a1a1a;
}

.lesson-content :deep(pre) {
  background: #f5f5f5;
  padding: 20px;
  overflow-x: auto;
  margin: 24px 0;
  border: 1px solid #e0e0e0;
}

.lesson-content :deep(pre code) {
  background: none;
  padding: 0;
}

.lesson-content :deep(blockquote) {
  border-left: 3px solid #e0e0e0;
  padding-left: 20px;
  margin: 24px 0;
  color: #999;
  font-style: italic;
}

/* Bottom Navigation */
.bottom-navigation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding-top: 48px;
  border-top: 1px solid #e0e0e0;
}

.nav-button {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 24px;
  background: white;
  border: 1px solid #e0e0e0;
  text-decoration: none;
  color: inherit;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-button:hover {
  border-color: #1a1a1a;
  transform: translateY(-1px);
}

.nav-button.next {
  justify-content: space-between;
}

.nav-button.prev {
  flex-direction: row-reverse;
  justify-content: space-between;
}

.nav-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-button.next .nav-content {
  text-align: right;
}

.nav-label {
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #999;
}

.nav-title {
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
  line-height: 1.3;
}

.nav-icon {
  color: #e0e0e0;
  flex-shrink: 0;
  transition: color 0.3s ease;
}

.nav-button:hover .nav-icon {
  color: #1a1a1a;
}

/* Right Sidebar - Progress & CTA */
.widget-label {
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #999;
  margin-bottom: 16px;
}

.progress-widget {
  background: white;
  border: 1px solid #e0e0e0;
  padding: 24px;
  margin-bottom: 20px;
}

.progress-stats {
  margin-bottom: 16px;
}

.stat-primary {
  font-family: 'Crimson Pro', serif;
  font-size: 48px;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1;
  letter-spacing: -0.02em;
  margin-bottom: 4px;
}

.stat-secondary {
  font-size: 13px;
  color: #999;
}

.progress-bar {
  height: 6px;
  background: #f5f5f5;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: #1a1a1a;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.quick-actions {
  margin-bottom: 20px;
}

.action-button {
  width: 100%;
  padding: 12px 16px;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  border: 1px solid #e0e0e0;
  background: white;
  color: #1a1a1a;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 8px;
}

.action-button:hover {
  border-color: #1a1a1a;
}

.action-button.primary {
  background: #1a1a1a;
  color: #fafafa;
  border-color: #1a1a1a;
}

.action-button.primary:hover {
  opacity: 0.85;
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .lesson-viewer {
    background: #1a1a1a;
  }

  .sidebar {
    border-color: #333;
  }

  .course-header {
    border-color: #333;
  }

  .course-header-top {
    /* Inherits dark mode from child elements */
  }

  .course-back-link {
    color: #999;
  }

  .course-back-link:hover {
    color: #fafafa;
  }

  .course-title,
  .content-title,
  .stat-primary {
    color: #fafafa;
  }

  .lessons-label,
  .header-label,
  .widget-label,
  .lesson-number,
  .nav-label,
  .stat-secondary {
    color: #666;
  }

  .lesson-name {
    color: #999;
  }

  .lesson-link:hover {
    background: #2a2a2a;
  }

  .lesson-item.current .lesson-link {
    background: #2a2a2a;
    border-left-color: #fafafa;
  }

  .lesson-item.current .status-indicator {
    background: #fafafa;
    border-color: #fafafa;
  }

  .lesson-item.current .lesson-number,
  .lesson-item.current .lesson-name {
    color: #fafafa;
  }

  .status-indicator {
    border-color: #333;
  }

  .lesson-content,
  .lesson-content :deep(h2),
  .lesson-content :deep(h3) {
    color: #fafafa;
  }

  .lesson-content :deep(p),
  .lesson-content :deep(ul),
  .lesson-content :deep(ol),
  .lesson-content :deep(li) {
    color: #999;
  }

  .lesson-content :deep(a) {
    color: #fafafa;
  }

  .lesson-content :deep(code) {
    background: #2a2a2a;
    color: #fafafa;
  }

  .lesson-content :deep(pre) {
    background: #2a2a2a;
    border-color: #333;
  }

  .lesson-content :deep(blockquote) {
    border-color: #333;
    color: #666;
  }

  .bottom-navigation {
    border-color: #333;
  }

  .nav-button,
  .progress-widget,
  .action-button {
    background: #1a1a1a;
    border-color: #333;
  }

  .nav-button:hover,
  .action-button:hover {
    border-color: #666;
  }

  .nav-title,
  .action-button {
    color: #fafafa;
  }

  .nav-icon {
    color: #333;
  }

  .nav-button:hover .nav-icon {
    color: #fafafa;
  }

  .action-button.primary {
    background: #fafafa;
    color: #1a1a1a;
    border-color: #fafafa;
  }

  .progress-bar {
    background: #2a2a2a;
  }

  .progress-fill {
    background: #fafafa;
  }

  .sidebar::-webkit-scrollbar-thumb {
    background: #333;
  }

  .sidebar::-webkit-scrollbar-thumb:hover {
    background: #444;
  }

  .spinner {
    border-color: #333;
    border-top-color: #fafafa;
  }
}

/* Mobile Header & Drawer */
.mobile-header {
  display: none;
}

.mobile-overlay {
  display: none;
}

.mobile-drawer {
  display: none;
}

/* Responsive */
@media (max-width: 1200px) {
  .lesson-layout {
    grid-template-columns: 280px 1fr 280px;
  }

  .sidebar-sticky {
    padding: 32px 20px;
  }

  .main-content {
    padding: 40px 32px 60px;
  }
}

@media (max-width: 1024px) {
  .lesson-layout {
    grid-template-columns: 1fr;
    position: relative;
  }

  .sidebar {
    display: none;
  }

  /* Mobile Header */
  .mobile-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    background: #fafafa;
    border-bottom: 1px solid #e0e0e0;
    position: sticky;
    top: 0;
    z-index: 100;
    gap: 16px;
  }

  .mobile-menu-button {
    background: none;
    border: none;
    padding: 8px;
    cursor: pointer;
    color: #1a1a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease;
  }

  .mobile-menu-button:hover {
    opacity: 0.6;
  }

  .mobile-header-title {
    flex: 1;
    min-width: 0;
  }

  .mobile-course-name {
    font-size: 11px;
    color: #999;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .mobile-lesson-label {
    font-family: 'Crimson Pro', serif;
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
    letter-spacing: -0.01em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Mobile Overlay */
  .mobile-overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 200;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* Mobile Drawer */
  .mobile-drawer {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 85%;
    max-width: 320px;
    background: #fafafa;
    z-index: 300;
    transform: translateX(-100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow-y: auto;
  }

  .mobile-drawer.open {
    transform: translateX(0);
  }

  .mobile-drawer-content {
    padding: 20px;
  }

  .drawer-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e0e0e0;
  }

  .drawer-title {
    font-family: 'Crimson Pro', serif;
    font-size: 22px;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0;
    letter-spacing: -0.01em;
    line-height: 1.2;
    flex: 1;
    padding-right: 12px;
  }

  .drawer-close {
    background: none;
    border: none;
    padding: 4px;
    cursor: pointer;
    color: #999;
    flex-shrink: 0;
    transition: color 0.3s ease;
  }

  .drawer-close:hover {
    color: #1a1a1a;
  }

  /* Drawer Progress */
  .drawer-progress {
    background: white;
    border: 1px solid #e0e0e0;
    padding: 16px;
    margin-bottom: 24px;
  }

  .drawer-progress-stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .drawer-progress-label {
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #999;
  }

  .drawer-progress-value {
    font-size: 14px;
    font-weight: 600;
    color: #1a1a1a;
  }

  .drawer-progress-bar {
    height: 4px;
    background: #f5f5f5;
    overflow: hidden;
  }

  .drawer-progress-fill {
    height: 100%;
    background: #1a1a1a;
    transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Drawer Lessons */
  .drawer-lessons-label {
    font-size: 10px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #999;
    margin-bottom: 12px;
  }

  .drawer-lessons-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .drawer-lesson-item {
    margin-bottom: 2px;
  }

  .drawer-lesson-link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    text-decoration: none;
    color: inherit;
    transition: background 0.3s ease;
    border-left: 2px solid transparent;
  }

  .drawer-lesson-link:active {
    background: #f5f5f5;
  }

  .drawer-lesson-status {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .drawer-status-indicator {
    width: 6px;
    height: 6px;
    border: 1.5px solid #e0e0e0;
    background: transparent;
  }

  .drawer-lesson-number {
    font-size: 11px;
    font-weight: 500;
    color: #999;
    min-width: 20px;
  }

  .drawer-lesson-name {
    font-size: 14px;
    color: #666;
    line-height: 1.4;
  }

  /* Drawer Lesson States */
  .drawer-lesson-item.current .drawer-lesson-link {
    background: white;
    border-left-color: #1a1a1a;
  }

  .drawer-lesson-item.current .drawer-status-indicator {
    background: #1a1a1a;
    border-color: #1a1a1a;
  }

  .drawer-lesson-item.current .drawer-lesson-number,
  .drawer-lesson-item.current .drawer-lesson-name {
    color: #1a1a1a;
    font-weight: 500;
  }

  .drawer-lesson-item.completed .drawer-status-indicator {
    background: #4caf50;
    border-color: #4caf50;
  }

  .main-content {
    max-width: 700px;
    padding: 40px 24px 60px;
  }

  .content-header {
    margin-bottom: 24px;
  }

  .content-title {
    font-size: 32px;
  }

  .bottom-navigation {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 32px 20px 48px;
  }

  .content-title {
    font-size: 28px;
  }

  .lesson-content :deep(h2) {
    font-size: 24px;
  }

  .lesson-content :deep(h3) {
    font-size: 20px;
  }

  .nav-button {
    padding: 16px 20px;
  }

  .nav-title {
    font-size: 13px;
  }
}

/* Dark Mode for Mobile */
@media (prefers-color-scheme: dark) and (max-width: 1024px) {
  .mobile-header {
    background: #1a1a1a;
    border-color: #333;
  }

  .mobile-menu-button {
    color: #fafafa;
  }

  .mobile-course-name {
    color: #666;
  }

  .mobile-lesson-label {
    color: #fafafa;
  }

  .mobile-overlay {
    background: rgba(0, 0, 0, 0.7);
  }

  .mobile-drawer {
    background: #1a1a1a;
  }

  .drawer-header {
    border-color: #333;
  }

  .drawer-title {
    color: #fafafa;
  }

  .drawer-close {
    color: #999;
  }

  .drawer-close:hover {
    color: #fafafa;
  }

  .drawer-progress {
    background: #1a1a1a;
    border-color: #333;
  }

  .drawer-progress-value {
    color: #fafafa;
  }

  .drawer-progress-label {
    color: #666;
  }

  .drawer-progress-bar {
    background: #2a2a2a;
  }

  .drawer-progress-fill {
    background: #fafafa;
  }

  .drawer-lessons-label {
    color: #666;
  }

  .drawer-lesson-link:active {
    background: #2a2a2a;
  }

  .drawer-status-indicator {
    border-color: #333;
  }

  .drawer-lesson-number {
    color: #999;
  }

  .drawer-lesson-name {
    color: #999;
  }

  .drawer-lesson-item.current .drawer-lesson-link {
    background: #2a2a2a;
    border-left-color: #fafafa;
  }

  .drawer-lesson-item.current .drawer-status-indicator {
    background: #fafafa;
    border-color: #fafafa;
  }

  .drawer-lesson-item.current .drawer-lesson-number,
  .drawer-lesson-item.current .drawer-lesson-name {
    color: #fafafa;
  }
}
</style>
