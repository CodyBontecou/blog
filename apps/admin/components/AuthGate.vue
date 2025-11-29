<template>
  <div class="auth-gate">
    <div class="auth-container">
      <div class="auth-content">
        <div class="auth-header">
          <h1 class="auth-title">Editorial</h1>
          <p class="auth-subtitle">Content Management System</p>
        </div>

        <div class="auth-body">
          <p class="auth-description">
            Sign in with your GitHub account to access the admin dashboard and manage your blog content.
          </p>

          <button
            @click="handleSignIn"
            :disabled="loading"
            class="auth-button"
          >
            <svg class="github-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span v-if="!loading">Continue with GitHub</span>
            <span v-else>Authenticating...</span>
          </button>

          <p class="auth-note">
            Only authorized users can access this area.
          </p>
        </div>
      </div>

      <div class="auth-decoration">
        <div class="decoration-line"></div>
        <div class="decoration-circle"></div>
        <div class="decoration-text">Admin Access</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  authenticated: []
}>()

const loading = ref(false)

// Use browser client with localStorage for PKCE
let browserClient: any = null
if (process.client) {
  const { createBrowserClient } = await import('~/lib/supabase-browser')
  browserClient = createBrowserClient()
}

const handleSignIn = async () => {
  console.log('=== SIGN IN INITIATED ===')
  console.log('Current URL:', window.location.href)
  console.log('Redirect to:', window.location.origin)

  loading.value = true
  try {
    if (!browserClient) {
      throw new Error('Browser client not initialized')
    }

    const { data, error } = await browserClient.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: window.location.origin,
      },
    })

    console.log('OAuth initiated - URL:', data?.url)
    console.log('OAuth error:', error)

    if (error) throw error
  } catch (error) {
    console.error('Authentication error:', error)
    alert('Failed to authenticate. Please try again.')
    loading.value = false
  }
}
</script>

<style scoped>
.auth-gate {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f1e8 0%, #e8e0d5 100%);
  position: relative;
  overflow: hidden;
}

.auth-gate::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.01) 2px, rgba(0,0,0,0.01) 4px);
  pointer-events: none;
}

.auth-container {
  position: relative;
  max-width: 480px;
  width: 90%;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

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

.auth-content {
  background: #ffffff;
  border-radius: 2px;
  padding: 3rem 2.5rem;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.05),
    0 10px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.06);
  position: relative;
}

.auth-header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e8e0d5;
}

.auth-title {
  font-family: 'Crimson Pro', serif;
  font-size: 3rem;
  font-weight: 700;
  color: #2d2a26;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.02em;
}

.auth-subtitle {
  font-size: 0.875rem;
  font-weight: 500;
  color: #8b7f72;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0;
}

.auth-body {
  text-align: center;
}

.auth-description {
  font-size: 1rem;
  line-height: 1.6;
  color: #5a5147;
  margin: 0 0 2rem 0;
}

.auth-button {
  width: 100%;
  padding: 1rem 2rem;
  background: #24292e;
  color: #ffffff;
  border: none;
  border-radius: 2px;
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  box-shadow: 0 2px 8px rgba(36, 41, 46, 0.2);
}

.auth-button:hover:not(:disabled) {
  background: #1b1f23;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(36, 41, 46, 0.3);
}

.auth-button:active:not(:disabled) {
  transform: translateY(0);
}

.auth-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.github-icon {
  width: 20px;
  height: 20px;
}

.auth-note {
  margin-top: 1.5rem;
  font-size: 0.875rem;
  color: #8b7f72;
}

.auth-decoration {
  position: absolute;
  top: -60px;
  right: -20px;
  display: flex;
  align-items: center;
  gap: 1rem;
  opacity: 0.4;
}

.decoration-line {
  width: 60px;
  height: 1px;
  background: #2d2a26;
}

.decoration-circle {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #2d2a26;
}

.decoration-text {
  font-family: 'Crimson Pro', serif;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #2d2a26;
}
</style>
