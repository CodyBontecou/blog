<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { supabase } from '~/lib/supabase/storage'
import type { Course } from '~/lib/types/courses'

const courses = ref<Course[]>([])
const loading = ref(true)
const selectedFilter = ref<'all' | 'free' | 'paid'>('all')

onMounted(async () => {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (data) {
    courses.value = data as Course[]
  }
  loading.value = false
})

const filteredCourses = computed(() => {
  if (selectedFilter.value === 'all') return courses.value
  if (selectedFilter.value === 'free') return courses.value.filter(c => c.is_free)
  return courses.value.filter(c => !c.is_free)
})
</script>

<template>
  <div class="courses-page">
    <div class="courses-container">
      <!-- Header Navigation -->
      <header class="page-header fade-in">
        <div class="header-nav">
          <a href="/" class="nav-link">Home</a>
          <span class="nav-divider">/</span>
          <a href="/about" class="nav-link">About</a>
          <span class="nav-divider">/</span>
          <span class="nav-link active">Courses</span>
        </div>
        <div class="social-icons">
          <a
            href="https://github.com/codybontecou"
            class="social-icon"
            target="_blank"
            rel="noopener"
            aria-label="GitHub"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
              />
            </svg>
          </a>
          <a
            href="https://www.youtube.com/@codybontecou"
            class="social-icon"
            target="_blank"
            rel="noopener"
            aria-label="YouTube"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"
              />
              <polygon
                points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
              />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/cody-bontecou/"
            class="social-icon"
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
              />
              <rect
                x="2"
                y="9"
                width="4"
                height="12"
              />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a
            href="https://x.com/isolatedtech"
            class="social-icon"
            target="_blank"
            rel="noopener"
            aria-label="X (Twitter)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M4 4l11.733 16h4.267l-11.733 -16z"
              />
              <path
                d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"
              />
            </svg>
          </a>
        </div>
      </header>

      <!-- Hero Section -->
      <header class="hero fade-in" style="animation-delay: 0.1s">
        <h1 class="hero-title">Courses</h1>
        <p class="hero-subtitle">
          In-depth courses on modern web development, AI integration, and software engineering.
        </p>
      </header>

      <!-- Filter Section -->
      <div class="filter-section fade-in" style="animation-delay: 0.1s">
        <button
          v-for="filter in ['all', 'free', 'paid']"
          :key="filter"
          @click="selectedFilter = filter"
          :class="['filter-btn', { active: selectedFilter === filter }]"
        >
          {{ filter.charAt(0).toUpperCase() + filter.slice(1) }}
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading fade-in" style="animation-delay: 0.2s">
        <div class="spinner"></div>
        <p>Loading courses...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredCourses.length === 0" class="empty-state fade-in" style="animation-delay: 0.2s">
        <h2 class="empty-title">No courses yet</h2>
        <p class="empty-text">Check back soon for new content.</p>
      </div>

      <!-- Courses Grid -->
      <div v-else class="courses-grid">
        <a
          v-for="(course, index) in filteredCourses"
          :key="course.id"
          :href="`/courses/${course.slug}`"
          class="course-card fade-in"
          :style="{ 'animation-delay': `${0.2 + index * 0.1}s` }"
        >
          <div class="card-image">
            <img
              v-if="course.thumbnail_url"
              :src="course.thumbnail_url"
              :alt="course.title"
            />
            <div v-else class="placeholder-image"></div>
          </div>
          <div class="card-content">
            <div class="card-header">
              <h3 class="card-title">{{ course.title }}</h3>
              <span v-if="course.is_free" class="card-badge">Free</span>
              <span v-else class="card-badge">${{ course.price }}</span>
            </div>
            <p v-if="course.description" class="card-description">
              {{ course.description }}
            </p>
            <span class="card-link">View course →</span>
          </div>
        </a>
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

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Page */
.courses-page {
  min-height: 100vh;
  background: #fafafa;
  font-family: 'DM Sans', sans-serif;
}

.courses-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 40px 80px;
}

/* Header Navigation */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e0e0e0;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-link {
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  font-weight: 400;
  color: #999;
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #1a1a1a;
}

.nav-link.active {
  color: #1a1a1a;
  font-weight: 500;
}

.nav-divider {
  color: #e0e0e0;
  font-size: 15px;
}

/* Social Icons */
.social-icons {
  display: flex;
  align-items: center;
  gap: 16px;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  position: relative;
}

.social-icon svg {
  width: 16px;
  height: 16px;
  stroke-width: 1.5;
}

.social-icon:hover {
  color: #1a1a1a;
  transform: translateY(-2px);
}

/* Hero */
.hero {
  margin-bottom: 48px;
  padding-bottom: 32px;
  border-bottom: 1px solid #e0e0e0;
}

.hero-title {
  font-family: 'Crimson Pro', serif;
  font-size: 48px;
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0 0 12px 0;
  color: #1a1a1a;
}

.hero-subtitle {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  color: #666;
  margin: 0;
  max-width: 600px;
}

/* Filter */
.filter-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e0e0e0;
}

.filter-btn {
  background: none;
  border: none;
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  font-weight: 400;
  color: #999;
  cursor: pointer;
  padding: 0;
  transition: color 0.3s ease;
}

.filter-btn:hover {
  color: #1a1a1a;
}

.filter-btn.active {
  color: #1a1a1a;
  font-weight: 500;
}

/* Loading */
.loading {
  text-align: center;
  padding: 80px 0;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 2px solid #e0e0e0;
  border-top-color: #1a1a1a;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 16px;
}

.loading p {
  font-size: 13px;
  color: #999;
  margin: 0;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 0;
}

.empty-title {
  font-family: 'Crimson Pro', serif;
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #1a1a1a;
}

.empty-text {
  font-size: 15px;
  color: #666;
  margin: 0;
}

/* Courses Grid */
.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.course-card {
  background: white;
  border: 1px solid #e0e0e0;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.course-card:hover {
  border-color: #1a1a1a;
}

.card-image {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.course-card:hover .card-image img {
  transform: scale(1.02);
}

.placeholder-image {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
}

.card-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 12px;
}

.card-title {
  font-family: 'Crimson Pro', serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
  margin: 0;
  color: #1a1a1a;
  flex: 1;
}

.card-badge {
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #666;
  padding: 4px 8px;
  background: #f5f5f5;
  border-radius: 2px;
  white-space: nowrap;
  flex-shrink: 0;
}

.card-description {
  font-size: 14px;
  line-height: 1.6;
  color: #666;
  margin: 0 0 16px 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-link {
  font-size: 13px;
  font-weight: 500;
  color: #999;
  transition: color 0.3s ease;
}

.course-card:hover .card-link {
  color: #1a1a1a;
}

/* Responsive */
@media (max-width: 768px) {
  .courses-container {
    padding: 32px 24px 60px;
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 24px;
  }

  .social-icons {
    width: 100%;
    justify-content: flex-start;
  }

  .hero {
    margin-bottom: 32px;
  }

  .hero-title {
    font-size: 36px;
  }

  .hero-subtitle {
    font-size: 15px;
  }

  .courses-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .card-content {
    padding: 20px;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .courses-page {
    background: #1a1a1a;
  }

  .page-header {
    border-color: #333;
  }

  .nav-link {
    color: #999;
  }

  .nav-link:hover,
  .nav-link.active {
    color: #fafafa;
  }

  .nav-divider {
    color: #333;
  }

  .social-icon {
    color: #666;
  }

  .social-icon:hover {
    color: #fafafa;
  }

  .hero {
    border-color: #333;
  }

  .hero-title,
  .card-title,
  .empty-title {
    color: #fafafa;
  }

  .hero-subtitle,
  .card-description,
  .empty-text,
  .loading p {
    color: #999;
  }

  .filter-section {
    border-color: #333;
  }

  .filter-btn {
    color: #999;
  }

  .filter-btn:hover,
  .filter-btn.active {
    color: #fafafa;
  }

  .course-card {
    background: #2a2a2a;
    border-color: #333;
  }

  .course-card:hover {
    border-color: #fafafa;
  }

  .card-image {
    background: #1a1a1a;
    border-color: #333;
  }

  .placeholder-image {
    background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  }

  .card-badge {
    background: #1a1a1a;
    color: #999;
  }

  .card-link {
    color: #666;
  }

  .course-card:hover .card-link {
    color: #fafafa;
  }

  .spinner {
    border-color: #333;
    border-top-color: #fafafa;
  }
}
</style>
