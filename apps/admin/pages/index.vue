<script setup lang="ts">
import type { Course } from '@blog/shared/lib/types/courses'

definePageMeta({
  layout: false
})

const { supabase } = useSupabase()
const user = ref(null)
const courses = ref<Course[]>([])
const loading = ref(true)
const showLoginScreen = ref(true)

onMounted(async () => {
  const { data: { user: currentUser } } = await supabase.auth.getUser()
  user.value = currentUser

  if (currentUser) {
    showLoginScreen.value = false
    await loadCourses()
    loading.value = false
  } else {
    loading.value = false
  }
})

async function handleLogin() {
  await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: window.location.origin + '/admin'
    }
  })
}

async function loadCourses() {
  const { data } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false })

  if (data) {
    courses.value = data as Course[]
  }
}

async function handleSignOut() {
  await supabase.auth.signOut()
  showLoginScreen.value = true
  user.value = null
}
</script>

<template>
  <!-- Login Screen -->
  <div v-if="showLoginScreen && !user" class="admin-login">
    <div class="login-container fade-in">
      <div class="login-header">
        <h1 class="login-title">Admin</h1>
        <p class="login-subtitle">Sign in to manage courses</p>
      </div>

      <button
        @click="handleLogin"
        :disabled="loading"
        class="login-button"
      >
        <svg class="button-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        <span>{{ loading ? 'Connecting...' : 'Continue with GitHub' }}</span>
      </button>

      <a href="/" class="back-link">← Back to home</a>
    </div>
  </div>

  <!-- Admin Panel -->
  <div v-else class="admin-panel">
    <div class="admin-container">
      <!-- Header -->
      <header class="admin-header fade-in">
        <div class="header-row">
          <h1 class="admin-title">Course Admin</h1>
          <div v-if="user" class="user-section">
            <span class="user-email">{{ user.email }}</span>
            <button @click="handleSignOut" class="sign-out-button">Sign out</button>
          </div>
        </div>
      </header>

      <!-- Loading -->
      <div v-if="loading" class="loading-state fade-in" style="animation-delay: 0.2s">
        <div class="spinner"></div>
        <p>Loading courses...</p>
      </div>

      <!-- Content -->
      <div v-else class="admin-content fade-in" style="animation-delay: 0.2s">
        <div class="content-header">
          <h2 class="section-title">All Courses</h2>
          <NuxtLink to="/courses/new" class="new-course-button">
            New Course
          </NuxtLink>
        </div>

        <div class="courses-list">
          <div
            v-for="course in courses"
            :key="course.id"
            class="course-item fade-in"
            style="animation-delay: 0.3s"
          >
            <NuxtLink :to="`/courses/${course.id}`" class="course-link">
              <h3 class="course-item-title">{{ course.title }}</h3>
              <div class="course-meta">
                <span class="meta-badge" :class="{ published: course.published }">
                  {{ course.published ? 'Published' : 'Draft' }}
                </span>
                <span class="meta-divider">·</span>
                <span class="meta-text">{{ course.is_free ? 'Free' : `$${course.price}` }}</span>
              </div>
            </NuxtLink>
            <div class="course-actions">
              <NuxtLink :to="`/lessons/${course.id}`" class="action-button">
                Manage Lessons
              </NuxtLink>
              <NuxtLink :to="`/courses/${course.id}`" class="action-button">
                Edit Course
              </NuxtLink>
            </div>
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

/* Login Screen */
.admin-login {
  min-height: 100vh;
  background: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  font-family: 'DM Sans', -apple-system, sans-serif;
}

.login-container {
  max-width: 420px;
  width: 100%;
  text-align: center;
}

.login-header {
  margin-bottom: 48px;
}

.login-title {
  font-family: 'Crimson Pro', serif;
  font-size: 56px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 12px 0;
  letter-spacing: -0.02em;
  line-height: 1;
}

.login-subtitle {
  font-size: 15px;
  color: #666;
  margin: 0;
}

.login-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 18px 24px;
  background: #1a1a1a;
  color: #fafafa;
  border: 1px solid #1a1a1a;
  cursor: pointer;
  transition: opacity 0.3s ease;
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  font-weight: 500;
}

.login-button:hover:not(:disabled) {
  opacity: 0.8;
}

.login-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.button-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.back-link {
  display: inline-block;
  margin-top: 24px;
  font-size: 14px;
  color: #999;
  text-decoration: none;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: #1a1a1a;
}

/* Admin Panel */
.admin-panel {
  min-height: 100vh;
  background: #fafafa;
  font-family: 'DM Sans', -apple-system, sans-serif;
}

.admin-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 40px;
}

/* Header */
.admin-header {
  margin-bottom: 48px;
  padding-bottom: 32px;
  border-bottom: 1px solid #e0e0e0;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.admin-title {
  font-family: 'Crimson Pro', serif;
  font-size: 42px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-email {
  font-size: 13px;
  color: #666;
}

.sign-out-button {
  background: none;
  border: none;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #999;
  cursor: pointer;
  transition: color 0.3s ease;
  padding: 0;
}

.sign-out-button:hover {
  color: #1a1a1a;
}

/* Loading */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 40px;
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
  font-size: 14px;
  color: #999;
}

/* Content */
.admin-content {
  max-width: 100%;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.section-title {
  font-family: 'Crimson Pro', serif;
  font-size: 32px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  letter-spacing: -0.01em;
}

.new-course-button {
  padding: 12px 24px;
  background: #1a1a1a;
  color: #fafafa;
  border: 1px solid #1a1a1a;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: opacity 0.3s ease;
  display: inline-block;
}

.new-course-button:hover {
  opacity: 0.8;
}

/* Courses List */
.courses-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.course-item {
  background: white;
  border: 1px solid #e0e0e0;
  padding: 28px 32px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 32px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.course-item:hover {
  border-color: #999;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.course-link {
  flex: 1;
  min-width: 0;
  text-decoration: none;
  color: inherit;
}

.course-item-title {
  font-family: 'Crimson Pro', serif;
  font-size: 22px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 12px 0;
  letter-spacing: -0.01em;
  line-height: 1.2;
}

.course-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.meta-badge {
  font-size: 12px;
  font-weight: 500;
  color: #999;
  padding: 4px 10px;
  border: 1px solid #e0e0e0;
  background: #fafafa;
}

.meta-badge.published {
  color: #1a1a1a;
  border-color: #1a1a1a;
  background: white;
}

.meta-divider {
  color: #e0e0e0;
  font-size: 12px;
}

.meta-text {
  font-size: 13px;
  color: #666;
}

.course-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.action-button {
  padding: 10px 18px;
  background: white;
  border: 1px solid #e0e0e0;
  color: #1a1a1a;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.action-button:hover {
  border-color: #1a1a1a;
  background: #fafafa;
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .admin-login,
  .admin-panel {
    background: #1a1a1a;
  }

  .login-title,
  .admin-title,
  .section-title,
  .course-item-title {
    color: #fafafa;
  }

  .login-subtitle,
  .user-email,
  .meta-text {
    color: #999;
  }

  .login-button {
    background: #fafafa;
    border-color: #fafafa;
    color: #1a1a1a;
  }

  .back-link,
  .sign-out-button {
    color: #666;
  }

  .back-link:hover,
  .sign-out-button:hover {
    color: #fafafa;
  }

  .admin-header {
    border-color: #333;
  }

  .spinner {
    border-color: #333;
    border-top-color: #fafafa;
  }

  .loading-state p {
    color: #666;
  }

  .new-course-button {
    background: #fafafa;
    border-color: #fafafa;
    color: #1a1a1a;
  }

  .course-item {
    background: #1a1a1a;
    border-color: #333;
  }

  .course-item:hover {
    border-color: #666;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .meta-badge {
    background: #1a1a1a;
    border-color: #333;
    color: #666;
  }

  .meta-badge.published {
    background: #1a1a1a;
    border-color: #666;
    color: #fafafa;
  }

  .meta-divider {
    color: #333;
  }

  .action-button {
    background: #1a1a1a;
    border-color: #333;
    color: #fafafa;
  }

  .action-button:hover {
    border-color: #fafafa;
    background: #2a2a2a;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .admin-container {
    padding: 32px 24px;
  }

  .admin-header {
    margin-bottom: 32px;
  }

  .header-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .admin-title {
    font-size: 32px;
  }

  .section-title {
    font-size: 24px;
  }

  .content-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .new-course-button {
    width: 100%;
    text-align: center;
  }

  .course-item {
    flex-direction: column;
    padding: 24px;
    gap: 20px;
  }

  .course-actions {
    width: 100%;
    flex-direction: column;
  }

  .action-button {
    width: 100%;
    text-align: center;
  }
}
</style>
