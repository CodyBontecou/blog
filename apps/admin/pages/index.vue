<template>
  <div class="admin-app">
    <AuthGate v-if="!isAuthenticated" @authenticated="handleAuthenticated" />
    <AdminDashboard v-else />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
import AuthGate from '~/components/AuthGate.vue'
import AdminDashboard from '~/components/AdminDashboard.vue'

const { isAuthenticated, initialize } = useAuth()

const handleAuthenticated = () => {
  // Refresh to show dashboard
  window.location.reload()
}

onMounted(async () => {
  await initialize()
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');

.admin-app {
  min-height: 100vh;
  font-family: 'Outfit', sans-serif;
}
</style>
