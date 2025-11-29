<template>
  <div class="admin-app">
    <AuthGate v-if="!user" @authenticated="handleAuthenticated" />
    <AdminDashboard v-else />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AuthGate from '~/components/AuthGate.vue'
import AdminDashboard from '~/components/AdminDashboard.vue'

// Use Nuxt Supabase's built-in user composable which handles OAuth callbacks automatically
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const handleAuthenticated = () => {
  // The user will be automatically updated via useSupabaseUser
}

onMounted(async () => {
  // Listen for auth changes
  supabase.auth.onAuthStateChange((event, session) => {
    console.log('🔔 Auth state changed:', event, 'User:', session?.user)
  })
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');

.admin-app {
  min-height: 100vh;
  font-family: 'Outfit', sans-serif;
}
</style>
