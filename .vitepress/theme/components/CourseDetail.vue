<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { supabase } from '~/lib/supabase/storage'
import type { CourseWithLessons, Lesson, Enrollment } from '~/lib/types/courses'
import { loadStripe } from '@stripe/stripe-js'
import MarkdownRenderer from './MarkdownRenderer.vue'

const props = defineProps<{
  courseSlug: string
}>()

const course = ref<CourseWithLessons | null>(null)
const enrollment = ref<Enrollment | null>(null)
const loading = ref(true)
const user = ref(null)
const processingPayment = ref(false)

const isEnrolled = computed(() => !!enrollment.value)
const canAccess = computed(() => course.value?.is_free || isEnrolled.value)

onMounted(async () => {
  // Get current user
  const { data: { user: currentUser } } = await supabase.auth.getUser()
  user.value = currentUser

  // Fetch course with lessons
  const { data: courseData, error: courseError } = await supabase
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
  }

  // Check enrollment if user is logged in
  if (currentUser && courseData) {
    const { data: enrollmentData } = await supabase
      .from('enrollments')
      .select('*')
      .eq('user_id', currentUser.id)
      .eq('course_id', courseData.id)
      .single()

    enrollment.value = enrollmentData
  }

  loading.value = false
})

async function handleEnroll() {
  if (!user.value) {
    // Redirect to auth
    await supabase.auth.signInWithOAuth({
      provider: 'github', // Or your preferred provider
      options: {
        redirectTo: window.location.href
      }
    })
    return
  }

  if (course.value?.is_free) {
    // Free enrollment
    const { error } = await supabase
      .from('enrollments')
      .insert({
        user_id: user.value.id,
        course_id: course.value.id
      })

    if (!error) {
      enrollment.value = {
        id: crypto.randomUUID(),
        user_id: user.value.id,
        course_id: course.value.id,
        enrolled_at: new Date().toISOString(),
        stripe_payment_intent_id: null
      }
    }
  } else {
    // Paid enrollment via Stripe
    processingPayment.value = true
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: course.value.id,
          userId: user.value.id
        })
      })

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Payment error:', error)
    } finally {
      processingPayment.value = false
    }
  }
}
</script>

<template>
  <div class="course-detail">
    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
    </div>

    <div v-else-if="!course" class="error-state">
      <h1>Course not found</h1>
      <p>The course you're looking for doesn't exist or has been removed.</p>
      <a href="/courses" class="back-link">← Back to courses</a>
    </div>

    <div v-else class="course-content">
      <!-- Header -->
      <header class="course-header">
        <div class="header-content">
          <a href="/courses" class="breadcrumb">← All Courses</a>

          <div class="header-grid">
            <div class="header-text">
              <h1 class="course-title">{{ course.title }}</h1>
              <MarkdownRenderer
                v-if="course.description"
                :content="course.description"
                class="course-description"
              />

              <div class="course-meta">
                <span class="meta-item">
                  {{ course.lessons.length }} Lessons
                </span>
                <span class="meta-divider">•</span>
                <span v-if="course.is_free" class="meta-item free">Free Course</span>
                <span v-else class="meta-item">${{ course.price }}</span>
              </div>

              <button
                v-if="!isEnrolled"
                @click="handleEnroll"
                :disabled="processingPayment"
                class="enroll-btn"
              >
                <span v-if="processingPayment">Processing...</span>
                <span v-else-if="course.is_free">Enroll for Free</span>
                <span v-else>Purchase Course</span>
              </button>

              <div v-else class="enrolled-badge">
                ✓ Enrolled
              </div>
            </div>

            <div v-if="course.thumbnail_url" class="header-image">
              <img :src="course.thumbnail_url" :alt="course.title" />
            </div>
          </div>
        </div>
      </header>

      <!-- Lessons -->
      <section class="lessons-section">
        <div class="lessons-container">
          <h2 class="lessons-title">Course Content</h2>

          <div class="lessons-list">
            <a
              v-for="(lesson, index) in course.lessons"
              :key="lesson.id"
              :href="canAccess ? `/courses/${course.slug}/${lesson.slug}` : '#'"
              :class="['lesson-item', { locked: !canAccess }]"
            >
              <div class="lesson-number">{{ String(index + 1).padStart(2, '0') }}</div>
              <div class="lesson-info">
                <h3 class="lesson-title">{{ lesson.title }}</h3>
                <MarkdownRenderer
                  v-if="lesson.description"
                  :content="lesson.description"
                  class="lesson-description"
                />
                <div v-if="lesson.duration" class="lesson-duration">
                  {{ Math.floor(lesson.duration / 60) }}:{{ String(lesson.duration % 60).padStart(2, '0') }}
                </div>
              </div>
              <div class="lesson-icon">
                <svg v-if="!canAccess" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              </div>
            </a>
          </div>
        </div>
      </section>
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

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.course-detail {
  min-height: 100vh;
  background: #fafafa;
  font-family: 'DM Sans', sans-serif;
}

/* Loading & Error States */
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

.error-state p {
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #666;
  margin: 0 0 32px 0;
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

/* Header */
.course-header {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 40px 60px;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.breadcrumb {
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: #999;
  text-decoration: none;
  margin-bottom: 32px;
  display: inline-block;
  transition: color 0.3s ease;
}

.breadcrumb:hover {
  color: #1a1a1a;
}

.header-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  padding-bottom: 48px;
  border-bottom: 1px solid #e0e0e0;
}

.course-title {
  font-family: 'Crimson Pro', serif;
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0 0 16px 0;
  color: #1a1a1a;
}

.course-description {
  margin: 0 0 24px 0;
  max-width: 700px;
}

.course-meta {
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  color: #999;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.meta-item {
  color: #999;
}

.meta-item.free {
  color: #1a1a1a;
  font-weight: 500;
}

.meta-divider {
  color: #e0e0e0;
}

.enroll-btn {
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  padding: 12px 32px;
  background: #1a1a1a;
  color: #fafafa;
  border: none;
  border-radius: 0;
  cursor: pointer;
  transition: opacity 0.3s ease;
  display: inline-block;
}

.enroll-btn:hover:not(:disabled) {
  opacity: 0.8;
}

.enroll-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.enrolled-badge {
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  padding: 8px 16px;
  background: transparent;
  color: #1a1a1a;
  border: 1px solid #1a1a1a;
  display: inline-block;
}

.header-image {
  overflow: hidden;
  background: #f5f5f5;
  aspect-ratio: 16 / 9;
}

.header-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Lessons Section */
.lessons-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 40px 80px;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
}

.lessons-title {
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #999;
  margin: 0 0 24px 0;
}

.lessons-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  border-top: 1px solid #e0e0e0;
}

.lesson-item {
  display: grid;
  grid-template-columns: 60px 1fr auto;
  gap: 24px;
  padding: 24px 0;
  border-bottom: 1px solid #e0e0e0;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  align-items: center;
}

.lesson-item:not(.locked):hover {
  opacity: 0.6;
}

.lesson-item.locked {
  opacity: 0.4;
  cursor: not-allowed;
}

.lesson-item.locked:hover {
  opacity: 0.4;
}

.lesson-number {
  font-family: 'Crimson Pro', serif;
  font-size: 20px;
  font-weight: 400;
  color: #999;
  letter-spacing: -0.01em;
}

.lesson-info {
  min-width: 0;
}

.lesson-title {
  font-family: 'Crimson Pro', serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.4;
  margin: 0 0 4px 0;
  color: #1a1a1a;
  letter-spacing: -0.01em;
}

.lesson-description {
  margin: 4px 0 0 0;
  font-size: 13px;
}

.lesson-duration {
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  color: #999;
  margin-top: 4px;
}

.lesson-icon {
  color: #ccc;
  flex-shrink: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .course-header,
  .lessons-section {
    padding-left: 24px;
    padding-right: 24px;
  }

  .course-title {
    font-size: 32px;
  }

  .lesson-item {
    grid-template-columns: 40px 1fr auto;
    gap: 16px;
    padding: 20px 0;
  }

  .lesson-number {
    font-size: 16px;
  }

  .lesson-title {
    font-size: 16px;
  }

  .lesson-description {
    font-size: 12px;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .course-detail {
    background: #1a1a1a;
  }

  .error-state h1,
  .course-title,
  .lesson-title,
  .meta-item.free {
    color: #fafafa;
  }

  .error-state p,
  .course-description,
  .lesson-description {
    color: #999;
  }

  .breadcrumb,
  .course-meta,
  .lesson-number,
  .lesson-duration {
    color: #666;
  }

  .breadcrumb:hover,
  .back-link {
    color: #fafafa;
  }

  .meta-divider {
    color: #333;
  }

  .header-grid,
  .lessons-list,
  .lesson-item {
    border-color: #333;
  }

  .enroll-btn {
    background: #fafafa;
    color: #1a1a1a;
  }

  .enrolled-badge {
    background: transparent;
    color: #fafafa;
    border-color: #fafafa;
  }

  .header-image {
    background: #2a2a2a;
  }

  .lesson-icon {
    color: #555;
  }

  .loading-spinner {
    border-color: #333;
    border-top-color: #fafafa;
  }
}
</style>
