<script setup lang="ts">
import type { Course } from '@blog/shared/lib/types/courses'

definePageMeta({
  layout: false
})

const { supabase } = useSupabase()
const recentCourses = ref<Course[]>([])
const popularCourses = ref<Course[]>([])
const freeCourses = ref<Course[]>([])
const loading = ref(true)

onMounted(async () => {
  // Fetch recent courses
  const { data: recent } = await supabase
    .from('courses')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(3)

  // Fetch popular courses (for now, same as recent - you can add a views/enrollment count later)
  const { data: popular } = await supabase
    .from('courses')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(3)

  // Fetch free courses
  const { data: free } = await supabase
    .from('courses')
    .select('*')
    .eq('published', true)
    .eq('is_free', true)
    .limit(3)

  if (recent) recentCourses.value = recent as Course[]
  if (popular) popularCourses.value = popular as Course[]
  if (free) freeCourses.value = free as Course[]

  loading.value = false
})
</script>

<template>
  <div class="landing-page">
    <!-- Navigation -->
    <nav class="nav-bar fade-in">
      <div class="nav-content">
        <div class="nav-logo">Learn.</div>
        <div class="nav-actions">
          <a href="/courses" class="nav-link">Browse Courses</a>
          <UserAvatar />
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-label fade-in" style="animation-delay: 0.1s">Online Learning Platform</div>
        <h1 class="hero-title">
          <span class="hero-title-line fade-in" style="animation-delay: 0.2s">Transform</span>
          <span class="hero-title-line fade-in" style="animation-delay: 0.35s">Your Skills</span>
          <span class="hero-title-line accent fade-in" style="animation-delay: 0.5s">Your Way</span>
        </h1>
        <p class="hero-description fade-in" style="animation-delay: 0.65s">
          Master new technologies through practical, real-world courses designed by industry professionals.
          Learn at your own pace, build real projects, and level up your career.
        </p>
        <div class="hero-cta fade-in" style="animation-delay: 0.8s">
          <a href="/courses" class="btn-primary">Explore All Courses</a>
          <a href="#featured" class="btn-secondary">See What's New</a>
        </div>
      </div>

      <!-- Decorative elements -->
      <div class="hero-decoration">
        <div class="decoration-circle circle-1"></div>
        <div class="decoration-circle circle-2"></div>
        <div class="decoration-circle circle-3"></div>
      </div>
    </section>

    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
    </div>

    <!-- Featured Courses Sections -->
    <div v-else class="featured-sections">
      <!-- Recently Added -->
      <section v-if="recentCourses.length > 0" id="featured" class="course-section">
        <div class="section-header fade-in" style="animation-delay: 0.2s">
          <div class="section-label">Fresh Content</div>
          <h2 class="section-title">Recently Added</h2>
          <p class="section-description">Brand new courses just added to our platform</p>
        </div>
        <div class="courses-showcase">
          <NuxtLink
            v-for="(course, index) in recentCourses"
            :key="course.id"
            :to="`/${course.slug}`"
            class="showcase-card fade-in"
            :style="`animation-delay: ${0.3 + index * 0.15}s`"
          >
            <div class="card-image" v-if="course.thumbnail_url">
              <img :src="course.thumbnail_url" :alt="course.title" />
              <div class="card-badge" v-if="course.is_free">Free</div>
              <div class="card-badge price" v-else>${{ course.price }}</div>
            </div>
            <div class="card-content">
              <h3 class="card-title">{{ course.title }}</h3>
              <p class="card-description" v-if="course.description">
                {{ course.description.substring(0, 120) }}{{ course.description.length > 120 ? '...' : '' }}
              </p>
              <div class="card-footer">
                <span class="card-cta">Start Learning →</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </section>

      <!-- Most Popular -->
      <section v-if="popularCourses.length > 0" class="course-section alternate">
        <div class="section-header fade-in" style="animation-delay: 0.2s">
          <div class="section-label">Top Picks</div>
          <h2 class="section-title">Most Popular</h2>
          <p class="section-description">Join thousands of students in these trending courses</p>
        </div>
        <div class="courses-showcase">
          <NuxtLink
            v-for="(course, index) in popularCourses"
            :key="course.id"
            :to="`/${course.slug}`"
            class="showcase-card fade-in"
            :style="`animation-delay: ${0.3 + index * 0.15}s`"
          >
            <div class="card-image" v-if="course.thumbnail_url">
              <img :src="course.thumbnail_url" :alt="course.title" />
              <div class="card-badge" v-if="course.is_free">Free</div>
              <div class="card-badge price" v-else>${{ course.price }}</div>
            </div>
            <div class="card-content">
              <h3 class="card-title">{{ course.title }}</h3>
              <p class="card-description" v-if="course.description">
                {{ course.description.substring(0, 120) }}{{ course.description.length > 120 ? '...' : '' }}
              </p>
              <div class="card-footer">
                <span class="card-cta">Start Learning →</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </section>

      <!-- Free Courses -->
      <section v-if="freeCourses.length > 0" class="course-section">
        <div class="section-header fade-in" style="animation-delay: 0.2s">
          <div class="section-label">No Cost</div>
          <h2 class="section-title">Free to Start</h2>
          <p class="section-description">Begin your learning journey with zero investment</p>
        </div>
        <div class="courses-showcase">
          <NuxtLink
            v-for="(course, index) in freeCourses"
            :key="course.id"
            :to="`/${course.slug}`"
            class="showcase-card fade-in"
            :style="`animation-delay: ${0.3 + index * 0.15}s`"
          >
            <div class="card-image" v-if="course.thumbnail_url">
              <img :src="course.thumbnail_url" :alt="course.title" />
              <div class="card-badge">Free</div>
            </div>
            <div class="card-content">
              <h3 class="card-title">{{ course.title }}</h3>
              <p class="card-description" v-if="course.description">
                {{ course.description.substring(0, 120) }}{{ course.description.length > 120 ? '...' : '' }}
              </p>
              <div class="card-footer">
                <span class="card-cta">Start Learning →</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </section>

      <!-- Value Props -->
      <section class="value-section">
        <div class="value-header fade-in">
          <h2 class="value-title">Why Learn With Us</h2>
        </div>
        <div class="value-grid">
          <div class="value-card fade-in" style="animation-delay: 0.2s">
            <div class="value-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M6 8L16 4L26 8L16 12L6 8Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                <path d="M6 16L16 20L26 16" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                <path d="M6 24L16 28L26 24" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="value-heading">Practical Learning</h3>
            <p class="value-text">Build real-world projects and gain hands-on experience that matters in your career</p>
          </div>
          <div class="value-card fade-in" style="animation-delay: 0.35s">
            <div class="value-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="10" stroke="currentColor" stroke-width="2"/>
                <path d="M16 12V16L19 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <h3 class="value-heading">Learn at Your Pace</h3>
            <p class="value-text">Flexible learning on your schedule. Pause, rewind, and revisit content anytime</p>
          </div>
          <div class="value-card fade-in" style="animation-delay: 0.5s">
            <div class="value-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="4" y="6" width="24" height="20" rx="2" stroke="currentColor" stroke-width="2"/>
                <path d="M13 14L18 16.5L13 19V14Z" fill="currentColor"/>
              </svg>
            </div>
            <h3 class="value-heading">Expert Instructors</h3>
            <p class="value-text">Learn from industry professionals with years of real-world experience</p>
          </div>
        </div>
      </section>

      <!-- Final CTA -->
      <section class="cta-section">
        <div class="cta-content fade-in">
          <h2 class="cta-title">Ready to Start Learning?</h2>
          <p class="cta-description">Join thousands of students already transforming their careers</p>
          <a href="/courses" class="btn-cta">Browse All Courses</a>
        </div>
      </section>
    </div>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <p class="footer-text">© 2024 Learn. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,700;1,9..144,300&family=Archivo:wght@400;600;700;900&family=Manrope:wght@400;500;600;700&display=swap');

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
  }
  33% {
    transform: translateY(-20px) translateX(10px);
  }
  66% {
    transform: translateY(10px) translateX(-10px);
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.fade-in {
  animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) both;
}

/* Base Styles */
.landing-page {
  min-height: 100vh;
  background: linear-gradient(to bottom, #fef9f3 0%, #fef5ed 100%);
  font-family: 'Manrope', -apple-system, sans-serif;
  color: #1a1a1a;
  overflow-x: hidden;
}

/* Navigation */
.nav-bar {
  position: sticky;
  top: 0;
  background: rgba(254, 249, 243, 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 20px 40px;
  z-index: 100;
}

.nav-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  font-family: 'Fraunces', serif;
  font-size: 24px;
  font-weight: 700;
  font-style: italic;
  color: #1a1a1a;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-link {
  font-size: 15px;
  font-weight: 500;
  color: #666;
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #1a1a1a;
}

/* Hero Section */
.hero-section {
  position: relative;
  padding: 120px 40px 160px;
  max-width: 1400px;
  margin: 0 auto;
  overflow: hidden;
}

.hero-content {
  max-width: 900px;
  position: relative;
  z-index: 2;
}

.hero-label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #ff6b4a;
  margin-bottom: 32px;
}

.hero-title {
  font-family: 'Fraunces', serif;
  font-size: 96px;
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.03em;
  margin: 0 0 40px 0;
  display: flex;
  flex-direction: column;
}

.hero-title-line {
  display: block;
}

.hero-title-line.accent {
  font-style: italic;
  color: #ff6b4a;
  position: relative;
}

.hero-description {
  font-size: 20px;
  line-height: 1.7;
  color: #4a4a4a;
  margin: 0 0 48px 0;
  max-width: 680px;
  font-weight: 400;
}

.hero-cta {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.btn-primary {
  padding: 18px 36px;
  background: #1a1a1a;
  color: #fef9f3;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  border: 2px solid #1a1a1a;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-block;
}

.btn-primary:hover {
  background: transparent;
  color: #1a1a1a;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.btn-secondary {
  padding: 18px 36px;
  background: transparent;
  color: #1a1a1a;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  border: 2px solid #1a1a1a;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-block;
}

.btn-secondary:hover {
  background: #1a1a1a;
  color: #fef9f3;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

/* Hero Decorations */
.hero-decoration {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.4;
}

.circle-1 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #ff6b4a 0%, #ffa366 100%);
  top: -100px;
  right: -100px;
  animation: float 20s ease-in-out infinite;
}

.circle-2 {
  width: 280px;
  height: 280px;
  background: linear-gradient(135deg, #ffa366 0%, #ffcc99 100%);
  top: 200px;
  right: 150px;
  animation: float 25s ease-in-out infinite;
  animation-delay: -5s;
}

.circle-3 {
  width: 180px;
  height: 180px;
  background: linear-gradient(135deg, #ffcc99 0%, #ffe6cc 100%);
  bottom: 100px;
  right: 50px;
  animation: float 18s ease-in-out infinite;
  animation-delay: -10s;
}

/* Loading */
.loading-container {
  display: flex;
  justify-content: center;
  padding: 120px 40px;
}

.spinner {
  width: 56px;
  height: 56px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-top-color: #ff6b4a;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Featured Sections */
.featured-sections {
  background: #ffffff;
  padding-top: 80px;
}

.course-section {
  padding: 80px 40px;
  max-width: 1400px;
  margin: 0 auto;
}

.course-section.alternate {
  background: linear-gradient(to bottom, #fef9f3 0%, #ffffff 100%);
}

.section-header {
  margin-bottom: 60px;
  max-width: 700px;
}

.section-label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #ff6b4a;
  margin-bottom: 16px;
}

.section-title {
  font-family: 'Fraunces', serif;
  font-size: 56px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 20px 0;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.section-description {
  font-size: 18px;
  color: #666;
  margin: 0;
  line-height: 1.6;
}

/* Course Showcase */
.courses-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 32px;
}

.showcase-card {
  background: #ffffff;
  border: 2px solid #e8e8e8;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  position: relative;
}

.showcase-card:hover {
  transform: translateY(-8px) rotate(-1deg);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: #ff6b4a;
}

.card-image {
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: linear-gradient(135deg, #fef9f3 0%, #ffe6cc 100%);
  position: relative;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.showcase-card:hover .card-image img {
  transform: scale(1.08);
}

.card-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: #1a1a1a;
  color: #fef9f3;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.card-badge.price {
  background: #ff6b4a;
}

.card-content {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
}

.card-title {
  font-family: 'Archivo', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  letter-spacing: -0.01em;
  line-height: 1.2;
}

.card-description {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  flex: 1;
}

.card-footer {
  padding-top: 20px;
  border-top: 2px solid #f0f0f0;
}

.card-cta {
  font-size: 15px;
  font-weight: 700;
  color: #999;
  transition: color 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.showcase-card:hover .card-cta {
  color: #ff6b4a;
}

/* Value Section */
.value-section {
  padding: 120px 40px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  color: #fef9f3;
}

.value-header {
  text-align: center;
  margin-bottom: 80px;
}

.value-title {
  font-family: 'Fraunces', serif;
  font-size: 64px;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.02em;
}

.value-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 48px;
  max-width: 1200px;
  margin: 0 auto;
}

.value-card {
  text-align: center;
  padding: 40px 32px;
}

.value-icon {
  display: inline-flex;
  width: 72px;
  height: 72px;
  align-items: center;
  justify-content: center;
  background: rgba(255, 107, 74, 0.15);
  color: #ff6b4a;
  margin-bottom: 24px;
  border: 2px solid rgba(255, 107, 74, 0.3);
}

.value-heading {
  font-family: 'Archivo', sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: #fef9f3;
}

.value-text {
  font-size: 16px;
  line-height: 1.7;
  color: #cccccc;
  margin: 0;
}

/* CTA Section */
.cta-section {
  padding: 120px 40px;
  background: #ffffff;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.cta-title {
  font-family: 'Fraunces', serif;
  font-size: 64px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 24px 0;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.cta-description {
  font-size: 20px;
  color: #666;
  margin: 0 0 48px 0;
  line-height: 1.6;
}

.btn-cta {
  padding: 20px 48px;
  background: #ff6b4a;
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  text-decoration: none;
  border: 2px solid #ff6b4a;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.btn-cta:hover {
  background: transparent;
  color: #ff6b4a;
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(255, 107, 74, 0.3);
}

/* Footer */
.footer {
  background: #1a1a1a;
  padding: 40px;
  border-top: 1px solid #333;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  text-align: center;
}

.footer-text {
  font-size: 14px;
  color: #999;
  margin: 0;
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .landing-page {
    background: linear-gradient(to bottom, #1a1a1a 0%, #0a0a0a 100%);
    color: #fafafa;
  }

  .nav-bar {
    background: rgba(26, 26, 26, 0.9);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .nav-logo {
    color: #fafafa;
  }

  .nav-link {
    color: #999;
  }

  .nav-link:hover {
    color: #fafafa;
  }

  .hero-title {
    color: #fafafa;
  }

  .hero-description {
    color: #cccccc;
  }

  .btn-primary {
    background: #fafafa;
    color: #1a1a1a;
    border-color: #fafafa;
  }

  .btn-primary:hover {
    background: transparent;
    color: #fafafa;
  }

  .btn-secondary {
    color: #fafafa;
    border-color: #fafafa;
  }

  .btn-secondary:hover {
    background: #fafafa;
    color: #1a1a1a;
  }

  .featured-sections {
    background: #0a0a0a;
  }

  .course-section.alternate {
    background: linear-gradient(to bottom, #1a1a1a 0%, #0a0a0a 100%);
  }

  .section-title {
    color: #fafafa;
  }

  .section-description {
    color: #999;
  }

  .showcase-card {
    background: #1a1a1a;
    border-color: #333;
  }

  .showcase-card:hover {
    border-color: #ff6b4a;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  }

  .card-image {
    background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
  }

  .card-badge {
    background: #fafafa;
    color: #1a1a1a;
  }

  .card-badge.price {
    background: #ff6b4a;
    color: #ffffff;
  }

  .card-title {
    color: #fafafa;
  }

  .card-description {
    color: #999;
  }

  .card-footer {
    border-color: #333;
  }

  .value-section {
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  }

  .cta-section {
    background: #0a0a0a;
  }

  .cta-title {
    color: #fafafa;
  }

  .cta-description {
    color: #999;
  }

  .spinner {
    border-color: rgba(255, 255, 255, 0.1);
    border-top-color: #ff6b4a;
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-title {
    font-size: 72px;
  }

  .section-title {
    font-size: 48px;
  }

  .value-title,
  .cta-title {
    font-size: 48px;
  }

  .courses-showcase {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
}

@media (max-width: 768px) {
  .nav-bar {
    padding: 16px 24px;
  }

  .nav-logo {
    font-size: 20px;
  }

  .nav-actions {
    gap: 16px;
  }

  .nav-link {
    font-size: 14px;
  }

  .hero-section {
    padding: 80px 24px 120px;
  }

  .hero-title {
    font-size: 52px;
  }

  .hero-description {
    font-size: 17px;
  }

  .hero-cta {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    text-align: center;
    padding: 16px 32px;
  }

  .hero-decoration {
    opacity: 0.5;
  }

  .circle-1 {
    width: 280px;
    height: 280px;
  }

  .circle-2 {
    width: 200px;
    height: 200px;
  }

  .circle-3 {
    width: 140px;
    height: 140px;
  }

  .course-section {
    padding: 60px 24px;
  }

  .section-title {
    font-size: 36px;
  }

  .section-description {
    font-size: 16px;
  }

  .courses-showcase {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .card-content {
    padding: 24px;
  }

  .card-title {
    font-size: 24px;
  }

  .value-section {
    padding: 80px 24px;
  }

  .value-title {
    font-size: 36px;
  }

  .value-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .cta-section {
    padding: 80px 24px;
  }

  .cta-title {
    font-size: 36px;
  }

  .cta-description {
    font-size: 17px;
  }

  .btn-cta {
    width: 100%;
    padding: 18px 40px;
  }

  .footer {
    padding: 32px 24px;
  }
}
</style>
