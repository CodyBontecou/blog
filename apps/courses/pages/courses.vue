<script setup lang="ts">
import type { Course } from '@blog/shared/lib/types/courses'

definePageMeta({
  layout: false
})

const { supabase } = useSupabase()
const courses = ref<Course[]>([])
const loading = ref(true)

onMounted(async () => {
  const { data } = await supabase
    .from('courses')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (data) {
    courses.value = data as Course[]
  }
  loading.value = false
})
</script>

<template>
  <div class="courses-catalog">
    <!-- Header -->
    <header class="catalog-header fade-in">
      <div class="header-content">
        <div class="header-top">
          <h1 class="page-title">All Courses</h1>
          <div class="header-actions">
            <a href="/" class="home-link">← Home</a>
            <UserAvatar />
          </div>
        </div>
        <p class="page-subtitle">Learn from practical, real-world tutorials</p>
      </div>
    </header>

    <!-- Loading -->
    <div v-if="loading" class="loading-state fade-in" style="animation-delay: 0.2s">
      <div class="spinner"></div>
      <p>Loading courses...</p>
    </div>

    <!-- Courses Grid -->
    <div v-else class="catalog-content">
      <div v-if="courses.length === 0" class="empty-state fade-in" style="animation-delay: 0.2s">
        <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
          <rect x="12" y="16" width="40" height="36" rx="2" stroke="currentColor" stroke-width="1.5"/>
          <path d="M20 26H44M20 34H40M20 42H36" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <h3>No courses available yet</h3>
        <p>Check back soon for new courses</p>
      </div>

      <div v-else class="courses-grid">
        <div class="section-label fade-in" style="animation-delay: 0.2s">{{ courses.length }} Available Courses</div>
        <NuxtLink
          v-for="(course, index) in courses"
          :key="course.id"
          :to="`/${course.slug}`"
          class="course-card fade-in"
          :style="`animation-delay: ${0.3 + index * 0.1}s`"
        >
          <div v-if="course.thumbnail_url" class="course-thumbnail">
            <img :src="course.thumbnail_url" :alt="course.title" />
          </div>
          <div class="course-content">
            <div class="course-header">
              <h2 class="course-title">{{ course.title }}</h2>
              <span class="course-price">
                {{ course.is_free ? 'Free' : `$${course.price}` }}
              </span>
            </div>
            <div class="course-description" v-if="course.description">
              {{ course.description.substring(0, 180) }}{{ course.description.length > 180 ? '...' : '' }}
            </div>
            <div class="course-footer">
              <span class="course-cta">Explore course →</span>
            </div>
          </div>
        </NuxtLink>
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

.courses-catalog {
  min-height: 100vh;
  background: #fafafa;
  font-family: 'DM Sans', -apple-system, sans-serif;
}

/* Header */
.catalog-header {
  background: #fafafa;
  border-bottom: 1px solid #e0e0e0;
  padding: 48px 40px;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  gap: 24px;
}

.page-title {
  font-family: 'Crimson Pro', serif;
  font-size: 56px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.home-link {
  font-size: 14px;
  font-weight: 400;
  color: #999;
  text-decoration: none;
  transition: color 0.3s ease;
}

.home-link:hover {
  color: #1a1a1a;
}

.page-subtitle {
  font-size: 18px;
  font-style: italic;
  color: #666;
  margin: 0;
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
  width: 48px;
  height: 48px;
  border: 3px solid #e0e0e0;
  border-top-color: #1a1a1a;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-state p {
  font-size: 14px;
  color: #999;
}

/* Content */
.catalog-content {
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
  padding: 120px 40px;
  gap: 16px;
}

.empty-state svg {
  color: #e0e0e0;
  margin-bottom: 16px;
}

.empty-state h3 {
  font-family: 'Crimson Pro', serif;
  font-size: 28px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.empty-state p {
  font-size: 16px;
  color: #999;
  margin: 0;
}

/* Section Label */
.section-label {
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #999;
  margin-bottom: 24px;
  grid-column: 1 / -1;
}

/* Courses Grid */
.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 32px;
}

.course-card {
  background: white;
  border: 1px solid #e0e0e0;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
}

.course-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  border-color: #999;
}

.course-thumbnail {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
}

.course-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.course-card:hover .course-thumbnail img {
  transform: scale(1.03);
}

.course-content {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
}

.course-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 8px;
}

.course-title {
  font-family: 'Crimson Pro', serif;
  font-size: 28px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  letter-spacing: -0.01em;
  line-height: 1.2;
  flex: 1;
}

.course-price {
  font-weight: 500;
  font-size: 15px;
  color: #666;
  flex-shrink: 0;
  padding-top: 4px;
}

.course-description {
  font-size: 15px;
  color: #666;
  line-height: 1.7;
  flex: 1;
}

.course-footer {
  padding-top: 16px;
  border-top: 1px solid #e0e0e0;
}

.course-cta {
  font-size: 14px;
  font-weight: 500;
  color: #999;
  transition: color 0.3s ease;
}

.course-card:hover .course-cta {
  color: #1a1a1a;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .courses-catalog {
    background: #1a1a1a;
    color: #fafafa;
  }

  .catalog-header {
    background: #1a1a1a;
    border-color: #333;
  }

  .page-title,
  .course-title,
  .course-cta:hover {
    color: #fafafa;
  }

  .home-link,
  .page-subtitle,
  .course-description,
  .course-price {
    color: #999;
  }

  .home-link:hover {
    color: #fafafa;
  }

  .section-label,
  .course-cta {
    color: #666;
  }

  .course-card {
    background: #1a1a1a;
    border-color: #333;
  }

  .course-card:hover {
    border-color: #666;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }

  .course-thumbnail {
    background: #2a2a2a;
    border-color: #333;
  }

  .course-footer {
    border-color: #333;
  }

  .spinner {
    border-color: #333;
    border-top-color: #fafafa;
  }

  .empty-state svg {
    color: #333;
  }

  .empty-state h3 {
    color: #fafafa;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .catalog-header {
    padding: 32px 24px;
  }

  .header-top {
    flex-wrap: wrap;
    gap: 16px;
  }

  .page-title {
    font-size: 40px;
    flex: 1 1 100%;
  }

  .header-actions {
    gap: 12px;
  }

  .home-link {
    font-size: 13px;
  }

  .catalog-content {
    padding: 40px 24px;
  }

  .courses-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .course-content {
    padding: 24px;
  }

  .course-title {
    font-size: 24px;
  }
}
</style>
