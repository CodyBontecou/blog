<script setup lang="ts">
import type { Course, Lesson } from '@blog/shared/lib/types/courses'

definePageMeta({
  layout: false
})

const route = useRoute()
const { supabase } = useSupabase()

const courseSlug = route.params.slug as string
const course = ref<Course | null>(null)
const lessons = ref<Lesson[]>([])
const loading = ref(true)

onMounted(async () => {
  // Load course by slug
  const { data: courseData } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', courseSlug)
    .eq('published', true)
    .single()

  if (courseData) {
    course.value = courseData as Course

    // Load lessons for this course
    const { data: lessonsData } = await supabase
      .from('lessons')
      .select('*')
      .eq('course_id', courseData.id)
      .eq('published', true)
      .order('order_index', { ascending: true })

    if (lessonsData) {
      lessons.value = lessonsData as Lesson[]
    }
  }

  loading.value = false
})
</script>

<template>
  <div class="course-detail">
    <!-- Loading -->
    <div v-if="loading" class="loading-state fade-in">
      <div class="spinner"></div>
      <p>Loading course...</p>
    </div>

    <!-- Course Not Found -->
    <div v-else-if="!course" class="not-found fade-in">
      <h2>Course not found</h2>
      <NuxtLink to="/">← Back to courses</NuxtLink>
    </div>

    <!-- Course Content -->
    <div v-else class="course-layout">
      <!-- Left Column - Course Info -->
      <div class="left-column">
        <div class="column-content fade-in">
          <NuxtLink to="/" class="back-link">← All Courses</NuxtLink>

          <div class="course-hero">
            <h1 class="course-title">{{ course.title }}</h1>

            <div class="course-meta-row">
              <div class="meta-item">
                <span class="meta-label">Price</span>
                <span class="meta-value">{{ course.is_free ? 'Free' : `$${course.price}` }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Lessons</span>
                <span class="meta-value">{{ lessons.length }}</span>
              </div>
            </div>
          </div>

          <div class="course-description-section fade-in" style="animation-delay: 0.2s">
            <div class="section-label">About</div>
            <div class="description-content">
              <MarkdownRenderer :content="course.description" />
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column - Lessons List -->
      <div class="right-column">
        <div class="lessons-section fade-in" style="animation-delay: 0.3s">
          <div class="section-label">Course Lessons</div>

          <div v-if="lessons.length === 0" class="empty-lessons">
            <p>No lessons available yet.</p>
          </div>

          <div v-else class="lessons-list">
            <NuxtLink
              v-for="(lesson, index) in lessons"
              :key="lesson.id"
              :to="`/${courseSlug}/${lesson.slug}`"
              class="lesson-item fade-in"
              :style="`animation-delay: ${0.4 + index * 0.08}s`"
            >
              <span class="lesson-number">{{ String(index + 1).padStart(2, '0') }}</span>
              <div class="lesson-details">
                <h3>{{ lesson.title }}</h3>
                <p v-if="lesson.description">{{ lesson.description }}</p>
              </div>
              <svg class="lesson-arrow" width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M8 6L12 10L8 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
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

.course-detail {
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

/* Two Column Layout */
.course-layout {
  display: flex;
  gap: 0;
  align-items: stretch;
  min-height: 100vh;
}

/* Left Column */
.left-column {
  position: fixed;
  left: 0;
  top: 0;
  width: 45%;
  height: 100vh;
  overflow-y: auto;
  border-right: 1px solid #e0e0e0;
  background: #fafafa;
}

.column-content {
  padding: 48px 60px 48px 40px;
  max-width: 700px;
  margin-left: auto;
}

/* Custom scrollbar */
.left-column::-webkit-scrollbar {
  width: 6px;
}

.left-column::-webkit-scrollbar-track {
  background: transparent;
}

.left-column::-webkit-scrollbar-thumb {
  background: #e0e0e0;
  border-radius: 3px;
}

.left-column::-webkit-scrollbar-thumb:hover {
  background: #ccc;
}

.back-link {
  display: inline-block;
  font-size: 14px;
  font-weight: 400;
  color: #999;
  text-decoration: none;
  margin-bottom: 32px;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: #1a1a1a;
}

.course-hero {
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid #e0e0e0;
}

.course-title {
  font-family: 'Crimson Pro', serif;
  font-size: 52px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 32px 0;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.course-meta-row {
  display: flex;
  gap: 40px;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.meta-label {
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #999;
}

.meta-value {
  font-size: 18px;
  font-weight: 500;
  color: #1a1a1a;
}

/* Description Section */
.course-description-section {
  margin-top: 40px;
}

.section-label {
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #999;
  margin-bottom: 16px;
}

.description-content {
  font-size: 15px;
  line-height: 1.7;
  color: #666;
}

.description-content :deep(p) {
  margin: 0 0 16px 0;
}

.description-content :deep(p:last-child) {
  margin-bottom: 0;
}

/* Right Column */
.right-column {
  margin-left: 45%;
  width: 55%;
  min-height: 100vh;
  padding: 48px 40px 48px 60px;
}

.lessons-section {
  max-width: 800px;
}

/* Lessons List */
.lessons-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.lesson-item {
  display: grid;
  grid-template-columns: 40px 1fr 24px;
  gap: 20px;
  align-items: center;
  padding: 20px 24px;
  background: white;
  border: 1px solid #e0e0e0;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.lesson-item:hover {
  transform: translateX(4px);
  border-color: #999;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.lesson-number {
  font-family: 'Crimson Pro', serif;
  font-size: 20px;
  font-weight: 600;
  color: #e0e0e0;
  transition: color 0.3s ease;
  text-align: center;
}

.lesson-item:hover .lesson-number {
  color: #1a1a1a;
}

.lesson-details h3 {
  font-family: 'Crimson Pro', serif;
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 6px 0;
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.lesson-details p {
  font-size: 13px;
  color: #666;
  margin: 0;
  line-height: 1.5;
}

.lesson-arrow {
  color: #e0e0e0;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.lesson-item:hover .lesson-arrow {
  color: #1a1a1a;
  transform: translateX(2px);
}

.empty-lessons {
  text-align: center;
  padding: 80px 40px;
  color: #999;
  font-size: 14px;
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .course-detail {
    background: #1a1a1a;
  }

  .left-column {
    background: #1a1a1a;
    border-color: #333;
  }

  .left-column::-webkit-scrollbar-thumb {
    background: #333;
  }

  .left-column::-webkit-scrollbar-thumb:hover {
    background: #444;
  }

  .course-title,
  .meta-value,
  .lesson-details h3,
  .not-found h2 {
    color: #fafafa;
  }

  .back-link,
  .meta-label,
  .section-label,
  .description-content,
  .lesson-details p,
  .empty-lessons,
  .loading-state p,
  .not-found a {
    color: #999;
  }

  .back-link:hover,
  .not-found a:hover {
    color: #fafafa;
  }

  .course-hero {
    border-color: #333;
  }

  .lesson-item {
    background: #1a1a1a;
    border-color: #333;
  }

  .lesson-item:hover {
    border-color: #666;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .lesson-number {
    color: #333;
  }

  .lesson-item:hover .lesson-number {
    color: #fafafa;
  }

  .lesson-arrow {
    color: #333;
  }

  .lesson-item:hover .lesson-arrow {
    color: #fafafa;
  }

  .spinner {
    border-color: #333;
    border-top-color: #fafafa;
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .course-layout {
    flex-direction: column;
  }

  .left-column {
    position: relative;
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
  }

  .column-content {
    padding: 32px 24px;
    max-width: 100%;
    margin: 0;
  }

  .right-column {
    margin-left: 0;
    width: 100%;
    padding: 32px 24px;
  }

  .course-title {
    font-size: 36px;
  }

  .lesson-item {
    grid-template-columns: 32px 1fr;
    gap: 16px;
    padding: 16px 20px;
  }

  .lesson-arrow {
    grid-column: 2;
    justify-self: end;
  }
}
</style>
