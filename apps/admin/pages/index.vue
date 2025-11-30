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

// Use singleton browser client with localStorage for proper PKCE flow
const user = ref(null)
let browserClient: any = null

if (process.client) {
  const { getBrowserClient } = await import('~/lib/supabase-browser')
  browserClient = getBrowserClient()
}

const handleAuthenticated = () => {
  // The user will be automatically updated via useSupabaseUser
}

onMounted(async () => {
  console.log('=== PAGE MOUNTED ===')
  console.log('Current URL:', window.location.href)

  if (!browserClient) {
    console.error('Browser client not initialized')
    return
  }

  // Check for OAuth callback
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')

  if (code) {
    console.log('=== OAUTH CALLBACK DETECTED ===')
    console.log('Code:', code)
    console.log('LocalStorage keys:', Object.keys(localStorage))
  }

  // Get initial session
  const { data: { session } } = await browserClient.auth.getSession()
  user.value = session?.user || null
  console.log('Initial session:', session?.user?.email || 'No user')

  // Listen for auth changes
  browserClient.auth.onAuthStateChange((event: string, session: any) => {
    console.log('🔔 Auth state changed:', event, 'User:', session?.user?.email || 'No user')
    user.value = session?.user || null
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
