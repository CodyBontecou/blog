---
layout: false
title: Admin - Courses
---

<script setup>
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import AdminCourseEditor from '../../.vitepress/theme/components/AdminCourseEditor.vue'
import AdminPanel from '../../.vitepress/theme/components/AdminPanel.vue'

const route = useRoute()

// Get course ID from query parameter
const courseId = computed(() => {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  return params.get('id')
})
</script>

<AdminCourseEditor v-if="courseId" :course-id="courseId" />
<AdminPanel v-else />

