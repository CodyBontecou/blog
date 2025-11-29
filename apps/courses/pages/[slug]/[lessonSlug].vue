<script setup lang="ts">
import type { Course, Lesson } from '@blog/shared/lib/types/courses'

definePageMeta({
  layout: false
})

const route = useRoute()
const { supabase } = useSupabase()

const courseSlug = route.params.slug as string
const lessonSlug = route.params.lessonSlug as string

const course = ref<Course | null>(null)
const lesson = ref<Lesson | null>(null)
const lessons = ref<Lesson[]>([])
const loading = ref(true)

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
  }

  loading.value = false
})

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

    <!-- Lesson Content -->
    <div v-else class="lesson-layout">
      <!-- Header -->
      <header class="lesson-header fade-in">
        <div class="header-content">
          <NuxtLink :to="`/${courseSlug}`" class="back-link">
            ← {{ course.title }}
          </NuxtLink>
          <div class="lesson-number-badge">
            Lesson {{ String(currentLessonIndex + 1).padStart(2, '0') }}
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="content-wrapper">
        <!-- Lesson Title -->
        <div class="lesson-hero fade-in" style="animation-delay: 0.1s">
          <h1 class="lesson-title">{{ lesson.title }}</h1>
          <p v-if="lesson.description" class="lesson-subtitle">{{ lesson.description }}</p>
        </div>

        <!-- Video Player -->
        <div v-if="lesson.video_url" class="video-section fade-in" style="animation-delay: 0.2s">
          <VideoPlayer :video-url="lesson.video_url" />
        </div>

        <!-- Lesson Content -->
        <article class="lesson-content fade-in" style="animation-delay: 0.3s">
          <MarkdownRenderer :content="lesson.content" />
        </article>

        <!-- Navigation -->
        <nav class="lesson-navigation fade-in" style="animation-delay: 0.4s">
          <NuxtLink
            v-if="prevLesson"
            :to="`/${courseSlug}/${prevLesson.slug}`"
            class="nav-button prev"
          >
            <div class="nav-content">
              <span class="nav-label">Previous Lesson</span>
              <span class="nav-title">{{ prevLesson.title }}</span>
            </div>
            <svg class="nav-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 16L6 10L12 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </NuxtLink>

          <NuxtLink
            v-if="nextLesson"
            :to="`/${courseSlug}/${nextLesson.slug}`"
            class="nav-button next"
          >
            <div class="nav-content">
              <span class="nav-label">Next Lesson</span>
              <span class="nav-title">{{ nextLesson.title }}</span>
            </div>
            <svg class="nav-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M8 4L14 10L8 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </NuxtLink>
        </nav>
      </main>
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

/* Layout */
.lesson-layout {
  min-height: 100vh;
}

/* Header */
.lesson-header {
  background: #fafafa;
  border-bottom: 1px solid #e0e0e0;
  padding: 32px 0;
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back-link {
  font-size: 14px;
  font-weight: 400;
  color: #999;
  text-decoration: none;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: #1a1a1a;
}

.lesson-number-badge {
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #999;
  padding: 6px 12px;
  border: 1px solid #e0e0e0;
  background: white;
}

/* Content */
.content-wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 60px 40px 120px;
}

.lesson-hero {
  margin-bottom: 48px;
  padding-bottom: 48px;
  border-bottom: 1px solid #e0e0e0;
}

.lesson-title {
  font-family: 'Crimson Pro', serif;
  font-size: 48px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 16px 0;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.lesson-subtitle {
  font-size: 18px;
  font-style: italic;
  color: #666;
  margin: 0;
  line-height: 1.6;
}

.video-section {
  margin-bottom: 60px;
}

.lesson-content {
  font-size: 16px;
  line-height: 1.8;
  color: #1a1a1a;
  margin-bottom: 80px;
}

.lesson-content :deep(h2) {
  font-family: 'Crimson Pro', serif;
  font-size: 32px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 48px 0 20px 0;
  letter-spacing: -0.01em;
  line-height: 1.2;
}

.lesson-content :deep(h3) {
  font-family: 'Crimson Pro', serif;
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 36px 0 16px 0;
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.lesson-content :deep(p) {
  margin: 0 0 24px 0;
  color: #666;
  line-height: 1.8;
}

.lesson-content :deep(ul),
.lesson-content :deep(ol) {
  margin: 0 0 24px 0;
  padding-left: 28px;
  color: #666;
}

.lesson-content :deep(li) {
  margin-bottom: 12px;
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
  border-radius: 3px;
  color: #1a1a1a;
}

.lesson-content :deep(pre) {
  background: #f5f5f5;
  padding: 24px;
  border-radius: 4px;
  overflow-x: auto;
  margin: 32px 0;
  border: 1px solid #e0e0e0;
}

.lesson-content :deep(pre code) {
  background: none;
  padding: 0;
}

.lesson-content :deep(blockquote) {
  border-left: 3px solid #e0e0e0;
  padding-left: 24px;
  margin: 32px 0;
  color: #999;
  font-style: italic;
}

.lesson-content :deep(img) {
  max-width: 100%;
  height: auto;
  margin: 32px 0;
  border-radius: 4px;
}

/* Navigation */
.lesson-navigation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  padding-top: 60px;
  border-top: 1px solid #e0e0e0;
}

.nav-button {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 28px 32px;
  background: white;
  border: 1px solid #e0e0e0;
  text-decoration: none;
  color: inherit;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-button:hover {
  border-color: #999;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.04);
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
  gap: 8px;
}

.nav-button.next .nav-content {
  text-align: right;
}

.nav-label {
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #999;
}

.nav-title {
  font-family: 'Crimson Pro', serif;
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  letter-spacing: -0.01em;
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

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .lesson-viewer {
    background: #1a1a1a;
  }

  .lesson-header {
    background: #1a1a1a;
    border-color: #333;
  }

  .back-link,
  .lesson-number-badge,
  .lesson-subtitle,
  .nav-label,
  .loading-state p,
  .not-found a {
    color: #999;
  }

  .back-link:hover,
  .not-found a:hover {
    color: #fafafa;
  }

  .lesson-number-badge {
    background: #1a1a1a;
    border-color: #333;
  }

  .lesson-title,
  .nav-title,
  .not-found h2 {
    color: #fafafa;
  }

  .lesson-hero {
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

  .lesson-navigation {
    border-color: #333;
  }

  .nav-button {
    background: #1a1a1a;
    border-color: #333;
  }

  .nav-button:hover {
    border-color: #666;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }

  .nav-icon {
    color: #333;
  }

  .nav-button:hover .nav-icon {
    color: #fafafa;
  }

  .spinner {
    border-color: #333;
    border-top-color: #fafafa;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .lesson-header {
    padding: 24px 0;
  }

  .header-content {
    padding: 0 24px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .content-wrapper {
    padding: 40px 24px 80px;
  }

  .lesson-title {
    font-size: 32px;
  }

  .lesson-subtitle {
    font-size: 16px;
  }

  .lesson-navigation {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .nav-button {
    padding: 20px 24px;
  }

  .nav-title {
    font-size: 16px;
  }
}
</style>
