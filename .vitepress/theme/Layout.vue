<template>
    <AdminPanel v-if="isAdminPage" />
    <CoursesLayout v-else-if="isCoursesListPage" />
    <CourseDetail v-else-if="isCourseDetailPage" :course-slug="courseSlug" />
    <LessonViewer v-else-if="isLessonPage" :course-slug="courseSlug" :lesson-slug="lessonSlug" />
    <HomeLayout v-else />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import HomeLayout from './components/HomeLayoutRedesign.vue'
import CoursesLayout from './components/CoursesLayout.vue'
import CourseDetail from './components/CourseDetail.vue'
import LessonViewer from './components/LessonViewer.vue'
import AdminPanel from './components/AdminPanel.vue'

const { page, frontmatter } = useData()

const isAdminPage = computed(() => {
  return frontmatter.value.layout === 'admin' || page.value.relativePath === 'admin.md'
})

const isCoursesListPage = computed(() => {
  return frontmatter.value.layout === 'courses' || page.value.relativePath === 'courses.md'
})

const isCourseDetailPage = computed(() => {
  const path = page.value.relativePath
  // Match: courses/slug.md but not courses/slug/lesson.md
  return path.startsWith('courses/') && !path.includes('/', 8) && path !== 'courses.md'
})

const isLessonPage = computed(() => {
  const path = page.value.relativePath
  // Match: courses/slug/lesson.md
  return path.startsWith('courses/') && path.includes('/', 8)
})

const courseSlug = computed(() => {
  const path = page.value.relativePath
  if (isCourseDetailPage.value || isLessonPage.value) {
    const parts = path.replace('.md', '').split('/')
    return parts[1] // courses/[slug]/...
  }
  return ''
})

const lessonSlug = computed(() => {
  const path = page.value.relativePath
  if (isLessonPage.value) {
    const parts = path.replace('.md', '').split('/')
    return parts[2] // courses/slug/[lesson]
  }
  return ''
})
</script>
