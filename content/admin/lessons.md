---
layout: false
title: Admin - Lessons
---

<script setup>
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import AdminLessonsList from '../../.vitepress/theme/components/AdminLessonsList.vue'
import AdminLessonEditor from '../../.vitepress/theme/components/AdminLessonEditor.vue'

const route = useRoute()

// Get IDs from query parameters
const courseId = computed(() => {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  return params.get('courseId')
})

const lessonId = computed(() => {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  return params.get('lessonId')
})
</script>

<AdminLessonEditor
  v-if="courseId && lessonId"
  :course-id="courseId"
  :lesson-id="lessonId"
/>
<AdminLessonsList
  v-else-if="courseId"
  :course-id="courseId"
/>
<div v-else>
  <p>Course ID required</p>
</div>

