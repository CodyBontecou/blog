<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vitepress'
import { supabase } from '~/lib/supabase/storage'
import type { Course } from '~/lib/types/courses'

const router = useRouter()
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
      redirectTo: window.location.href
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

function newCourse() {
  router.go('/admin/courses?id=new')
}

function editCourse(courseId: string) {
  router.go(`/admin/courses?id=${courseId}`)
}

function manageLessons(courseId: string) {
  router.go(`/admin/lessons?courseId=${courseId}`)
}
</script>

<template>
  <!-- Login Screen -->
  <div v-if="showLoginScreen && !user" class="login-container">
    <div class="login-content fade-in">
      <div class="login-header">
        <h1 class="login-title">Admin</h1>
        <p class="login-subtitle">Sign in to manage courses</p>
      </div>

      <button @click="handleLogin" class="login-btn" :disabled="loading">
        <svg
          class="github-icon"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        <span>{{ loading ? 'Connecting...' : 'Continue with GitHub' }}</span>
      </button>

      <a href="/" class="back-link">← Back to home</a>
    </div>
  </div>

  <!-- Admin Panel (when authenticated) -->
  <div v-else>
    <div class="admin-panel">
      <div class="admin-container">
        <!-- Header -->
        <header class="admin-header fade-in">
          <div class="header-content">
            <h1 class="admin-title">Course Admin</h1>
            <div class="header-actions" v-if="user">
              <span class="user-email">{{ user.email }}</span>
              <button @click="supabase.auth.signOut()" class="btn-link">Sign out</button>
            </div>
          </div>
        </header>

        <div v-if="loading" class="loading fade-in" style="animation-delay: 0.1s">
          <div class="spinner"></div>
          <p>Loading...</p>
        </div>

        <div v-else class="admin-content">
          <!-- Courses List -->
          <div class="tab-content fade-in" style="animation-delay: 0.2s">
            <div class="content-header">
              <h2 class="section-title">All Courses</h2>
              <button @click="newCourse" class="btn-primary">New Course</button>
            </div>

            <div class="courses-list">
              <div
                v-for="course in courses"
                :key="course.id"
                class="course-row"
              >
                <div class="course-info" @click="editCourse(course.id)">
                  <h3 class="course-title">{{ course.title }}</h3>
                  <div class="course-meta">
                    <span class="meta-item" :class="{ published: course.published }">
                      {{ course.published ? 'Published' : 'Draft' }}
                    </span>
                    <span class="meta-divider">·</span>
                    <span class="meta-item">{{ course.is_free ? 'Free' : `$${course.price}` }}</span>
                  </div>
                </div>
                <div class="course-actions">
                  <button @click.stop="manageLessons(course.id)" class="btn-small">Manage Lessons</button>
                  <button @click.stop="editCourse(course.id)" class="btn-small">Edit Course</button>
                </div>
              </div>
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
.login-container {
  min-height: 100vh;
  background: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  font-family: 'DM Sans', sans-serif;
}

.login-content {
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.login-header {
  margin-bottom: 48px;
}

.login-title {
  font-family: 'Crimson Pro', serif;
  font-size: 48px;
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0 0 12px 0;
  color: #1a1a1a;
}

.login-subtitle {
  font-size: 15px;
  font-weight: 400;
  color: #666;
  margin: 0;
}

.login-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  padding: 16px 24px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #fafafa;
  background: #1a1a1a;
  border: 1px solid #1a1a1a;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 24px;
}

.login-btn:hover:not(:disabled) {
  opacity: 0.8;
}

.login-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.github-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.back-link {
  display: inline-block;
  font-size: 13px;
  font-weight: 500;
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
  font-family: 'DM Sans', sans-serif;
}

.admin-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 40px;
}

.admin-header {
  margin-bottom: 48px;
  padding-bottom: 32px;
  border-bottom: 1px solid #e0e0e0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.admin-title {
  font-family: 'Crimson Pro', serif;
  font-size: 32px;
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0;
  color: #1a1a1a;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-email {
  font-size: 13px;
  color: #666;
}

.btn-link {
  background: none;
  border: none;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #999;
  cursor: pointer;
  padding: 0;
  transition: color 0.3s ease;
}

.btn-link:hover {
  color: #1a1a1a;
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

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading p {
  font-size: 13px;
  color: #999;
  margin: 0;
}

/* Tabs */
.tabs {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e0e0e0;
}

.tab {
  background: none;
  border: none;
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  font-weight: 400;
  color: #999;
  cursor: pointer;
  padding: 0;
  transition: color 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

.tab:hover:not(:disabled) {
  color: #1a1a1a;
}

.tab.active {
  color: #1a1a1a;
  font-weight: 500;
}

.tab:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.tab-divider {
  color: #e0e0e0;
  font-size: 15px;
}

.tab-subtitle {
  font-size: 11px;
  font-weight: 400;
  color: #999;
}

/* Content */
.admin-content {
  /* Container for tab content */
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.section-title {
  font-family: 'Crimson Pro', serif;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
  margin: 0;
  color: #1a1a1a;
}

.breadcrumb {
  background: none;
  border: none;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: #999;
  cursor: pointer;
  padding: 0;
  margin-bottom: 8px;
  transition: color 0.3s ease;
}

.breadcrumb:hover {
  color: #1a1a1a;
}

/* Courses List */
.courses-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.course-row {
  background: white;
  border: 1px solid #e0e0e0;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.course-row:hover {
  border-color: #1a1a1a;
}

.course-info {
  flex: 1;
}

.course-title {
  font-family: 'Crimson Pro', serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.3;
  margin: 0 0 8px 0;
  color: #1a1a1a;
}

.course-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.meta-item {
  font-size: 13px;
  color: #999;
}

.meta-item.published {
  color: #1a1a1a;
}

.meta-divider {
  font-size: 13px;
  color: #e0e0e0;
}

.course-actions {
  display: flex;
  gap: 8px;
}

/* Lessons List */
.lessons-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.lesson-row {
  background: white;
  border: 1px solid #e0e0e0;
  padding: 20px;
  display: grid;
  grid-template-columns: 32px 1fr auto;
  gap: 20px;
  align-items: center;
}

.lesson-order {
  font-family: 'Crimson Pro', serif;
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
}

.lesson-info {
  flex: 1;
}

.lesson-title {
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  font-weight: 500;
  margin: 0 0 6px 0;
  color: #1a1a1a;
}

.lesson-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.lesson-actions {
  display: flex;
  gap: 8px;
}

/* Buttons */
.btn-primary,
.btn-secondary,
.btn-small {
  font-family: 'DM Sans', sans-serif;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #1a1a1a;
  color: #fafafa;
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 4px;
}

.btn-primary:hover {
  opacity: 0.8;
}

.btn-secondary {
  background: white;
  border: 1px solid #e0e0e0;
  color: #1a1a1a;
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 4px;
}

.btn-secondary:hover {
  border-color: #1a1a1a;
}

.btn-small {
  font-size: 13px;
  padding: 6px 12px;
  background: white;
  border: 1px solid #e0e0e0;
  color: #1a1a1a;
  border-radius: 4px;
}

.btn-small:hover {
  border-color: #1a1a1a;
}

.btn-small.btn-danger:hover {
  background: #1a1a1a;
  border-color: #1a1a1a;
  color: #fafafa;
}

/* Modal */
.modal {
  position: fixed;
  inset: 0;
  background: rgba(26, 26, 26, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: #fafafa;
  border: 1px solid #e0e0e0;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-bottom: 1px solid #e0e0e0;
}

.modal-title {
  font-family: 'Crimson Pro', serif;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: #1a1a1a;
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 28px;
  line-height: 1;
  color: #999;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  transition: color 0.3s ease;
}

.close-btn:hover {
  color: #1a1a1a;
}

/* Form */
.form {
  padding: 32px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e0e0e0;
  background: white;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  color: #1a1a1a;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #1a1a1a;
}

.form-input:read-only {
  background: #f5f5f5;
  color: #666;
  cursor: not-allowed;
}

.form-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #1a1a1a;
  cursor: pointer;
}

.form-checkbox input[type="checkbox"] {
  cursor: pointer;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.help-text {
  font-size: 12px;
  color: #999;
  margin-top: 6px;
}

.help-text.success {
  color: #1a1a1a;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e0e0e0;
}

/* Responsive */
@media (max-width: 768px) {
  .admin-container {
    padding: 32px 24px;
  }

  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .course-row,
  .lesson-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .course-actions,
  .lesson-actions {
    width: 100%;
    justify-content: flex-start;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .lesson-row {
    grid-template-columns: 32px 1fr;
  }

  .lesson-actions {
    grid-column: 2;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .login-container,
  .admin-panel {
    background: #1a1a1a;
  }

  .login-title,
  .admin-title,
  .section-title,
  .course-title,
  .lesson-title,
  .modal-title,
  .form-label,
  .meta-item.published,
  .lesson-order {
    color: #fafafa;
  }

  .login-subtitle,
  .user-email,
  .meta-item,
  .breadcrumb,
  .help-text {
    color: #999;
  }

  .close-btn {
    color: #b3b3b3;
  }

  .tab {
    color: #b3b3b3;
  }

  .tab.active {
    color: #fafafa;
  }

  .login-btn,
  .btn-primary {
    background: #fafafa;
    border-color: #fafafa;
    color: #1a1a1a;
  }

  .admin-header,
  .tabs {
    border-color: #333;
  }

  .course-row,
  .lesson-row {
    background: #2a2a2a;
    border-color: #333;
    color: #fafafa;
  }

  .btn-secondary {
    background: #2a2a2a;
    border-color: #555;
    color: #e0e0e0;
  }

  .btn-small {
    background: #2a2a2a;
    border-color: #333;
    color: #fafafa;
  }

  .form-input {
    background: #2a2a2a;
    border-color: #555;
    color: #fafafa;
  }

  .form-input::placeholder {
    color: #808080;
  }

  .course-row:hover {
    border-color: #fafafa;
  }

  .btn-secondary:hover {
    border-color: #888;
    background: #333;
  }

  .btn-small:hover {
    border-color: #fafafa;
  }

  .form-input:focus {
    border-color: #fafafa;
    background: #333;
  }

  .form-input:read-only {
    background: #1f1f1f;
    color: #808080;
    cursor: not-allowed;
    border-color: #333;
  }

  .modal-content {
    background: #1a1a1a;
    border-color: #444;
  }

  .form-checkbox {
    color: #e0e0e0;
  }

  .modal-header,
  .form-actions {
    border-color: #444;
  }

  .tab-divider {
    color: #666;
  }

  .meta-divider {
    color: #333;
  }

  .tab-subtitle {
    color: #808080;
  }

  .btn-link:hover,
  .back-link:hover,
  .breadcrumb:hover,
  .close-btn:hover,
  .tab:hover:not(:disabled) {
    color: #fafafa;
  }
}
</style>
