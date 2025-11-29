<script setup lang="ts">
definePageMeta({
  layout: false
})

const route = useRoute()
const { supabase } = useSupabase()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const mode = ref<'login' | 'signup'>('login')

// Get redirect URL from query params
const redirectTo = computed(() => {
  return (route.query.redirect as string) || '/'
})

async function handleAuth() {
  if (!email.value || !password.value) {
    error.value = 'Please fill in all fields'
    return
  }

  loading.value = true
  error.value = ''

  try {
    if (mode.value === 'login') {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
      })

      if (authError) throw authError
    } else {
      const { error: authError } = await supabase.auth.signUp({
        email: email.value,
        password: password.value
      })

      if (authError) throw authError
    }

    // Redirect after successful auth
    await navigateTo(redirectTo.value)
  } catch (e: any) {
    error.value = e.message || 'Authentication failed'
  } finally {
    loading.value = false
  }
}

async function handleOAuthLogin(provider: 'google' | 'github') {
  loading.value = true
  error.value = ''

  try {
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}${redirectTo.value}`
      }
    })

    if (authError) throw authError
  } catch (e: any) {
    error.value = e.message || 'OAuth authentication failed'
    loading.value = false
  }
}

function toggleMode() {
  mode.value = mode.value === 'login' ? 'signup' : 'login'
  error.value = ''
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-container fade-in">
      <div class="auth-header">
        <h1 class="auth-title">
          {{ mode === 'login' ? 'Welcome Back' : 'Create Account' }}
        </h1>
        <p class="auth-subtitle">
          {{ mode === 'login' ? 'Sign in to track your progress' : 'Start your learning journey' }}
        </p>
      </div>

      <!-- OAuth Providers -->
      <div class="oauth-section">
        <button
          @click="handleOAuthLogin('google')"
          type="button"
          class="oauth-button"
          :disabled="loading"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
            <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9.003 18z" fill="#34A853"/>
            <path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
          </svg>
          <span>Continue with Google</span>
        </button>

        <button
          @click="handleOAuthLogin('github')"
          type="button"
          class="oauth-button"
          :disabled="loading"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
            <path d="M9 0C4.0275 0 0 4.13211 0 9.22838C0 13.3065 2.5785 16.7648 6.15375 17.9841C6.60375 18.0709 6.76875 17.7853 6.76875 17.5403C6.76875 17.3212 6.76125 16.7405 6.7575 15.9712C4.254 16.5277 3.726 14.7332 3.726 14.7332C3.3165 13.6681 2.72475 13.3832 2.72475 13.3832C1.9095 12.8111 2.78775 12.8229 2.78775 12.8229C3.6915 12.8871 4.16625 13.7737 4.16625 13.7737C4.96875 15.1847 6.273 14.777 6.7875 14.5414C6.8685 13.9443 7.10025 13.5381 7.3575 13.3073C5.35875 13.0764 3.258 12.2829 3.258 8.74704C3.258 7.73918 3.60825 6.91558 4.18425 6.26794C4.083 6.03456 3.77925 5.09184 4.263 3.82035C4.263 3.82035 5.01675 3.57229 6.738 4.76458C7.458 4.56116 8.223 4.45939 8.988 4.45617C9.753 4.45939 10.518 4.56116 11.238 4.76458C12.948 3.57229 13.7017 3.82035 13.7017 3.82035C14.1855 5.09184 13.8818 6.03456 13.7917 6.26794C14.3655 6.91558 14.7142 7.73918 14.7142 8.74704C14.7142 12.2923 12.6105 13.0725 10.608 13.2995C10.923 13.5765 11.2155 14.1423 11.2155 15.0071C11.2155 16.242 11.2043 17.2344 11.2043 17.5341C11.2043 17.7759 11.3617 18.0647 11.823 17.9723C15.4237 16.7609 18 13.3002 18 9.22838C18 4.13211 13.9703 0 9 0Z"/>
          </svg>
          <span>Continue with GitHub</span>
        </button>
      </div>

      <div class="divider">
        <span class="divider-text">or</span>
      </div>

      <form @submit.prevent="handleAuth" class="auth-form">
        <div class="form-field">
          <label class="field-label">Email</label>
          <input
            v-model="email"
            type="email"
            class="field-input"
            placeholder="you@example.com"
            required
          />
        </div>

        <div class="form-field">
          <label class="field-label">Password</label>
          <input
            v-model="password"
            type="password"
            class="field-input"
            placeholder="••••••••"
            required
          />
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <button type="submit" class="submit-button" :disabled="loading">
          {{ loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Sign Up' }}
        </button>
      </form>

      <div class="auth-footer">
        <button @click="toggleMode" class="toggle-mode">
          {{ mode === 'login' ? 'Need an account? Sign up' : 'Already have an account? Sign in' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@300;400;600&family=DM+Sans:wght@400;500&display=swap');

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

.auth-page {
  min-height: 100vh;
  background: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  font-family: 'DM Sans', -apple-system, sans-serif;
}

.auth-container {
  width: 100%;
  max-width: 440px;
  background: white;
  border: 1px solid #e0e0e0;
  padding: 48px 40px;
}

.auth-header {
  margin-bottom: 40px;
  text-align: center;
}

.auth-title {
  font-family: 'Crimson Pro', serif;
  font-size: 36px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 12px 0;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.auth-subtitle {
  font-size: 15px;
  color: #666;
  margin: 0;
  line-height: 1.6;
}

/* OAuth Section */
.oauth-section {
  margin-bottom: 32px;
}

.oauth-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 14px 24px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
  background: white;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 12px;
}

.oauth-button:last-child {
  margin-bottom: 0;
}

.oauth-button:hover:not(:disabled) {
  border-color: #1a1a1a;
  transform: translateY(-1px);
}

.oauth-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.oauth-button svg {
  flex-shrink: 0;
}

.oauth-button span {
  flex: 1;
  text-align: center;
}

/* Divider */
.divider {
  position: relative;
  text-align: center;
  margin: 32px 0;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e0e0e0;
}

.divider-text {
  position: relative;
  display: inline-block;
  padding: 0 16px;
  background: white;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #999;
  font-weight: 500;
}

.auth-form {
  margin-bottom: 32px;
}

.form-field {
  margin-bottom: 24px;
}

.field-label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #999;
  margin-bottom: 8px;
}

.field-input {
  width: 100%;
  padding: 14px 16px;
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  color: #1a1a1a;
  background: #fafafa;
  border: 1px solid #e0e0e0;
  transition: all 0.2s ease;
}

.field-input:focus {
  outline: none;
  border-color: #1a1a1a;
  background: white;
}

.error-message {
  padding: 12px 16px;
  background: #ffebee;
  border: 1px solid #ffcdd2;
  color: #c62828;
  font-size: 13px;
  margin-bottom: 24px;
  line-height: 1.5;
}

.submit-button {
  width: 100%;
  padding: 14px 24px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  background: #1a1a1a;
  color: #fafafa;
  border: 1px solid #1a1a1a;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.submit-button:hover:not(:disabled) {
  opacity: 0.85;
}

.submit-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.auth-footer {
  text-align: center;
  padding-top: 24px;
  border-top: 1px solid #e0e0e0;
}

.toggle-mode {
  background: none;
  border: none;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  padding: 8px;
  transition: color 0.3s ease;
}

.toggle-mode:hover {
  color: #1a1a1a;
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .auth-page {
    background: #1a1a1a;
  }

  .auth-container {
    background: #1a1a1a;
    border-color: #333;
  }

  .auth-title {
    color: #fafafa;
  }

  .auth-subtitle {
    color: #999;
  }

  .field-label {
    color: #666;
  }

  .field-input {
    background: #2a2a2a;
    border-color: #333;
    color: #fafafa;
  }

  .field-input:focus {
    border-color: #fafafa;
    background: #1a1a1a;
  }

  .error-message {
    background: #3d1f1f;
    border-color: #5c2828;
    color: #ff8a80;
  }

  .submit-button {
    background: #fafafa;
    color: #1a1a1a;
    border-color: #fafafa;
  }

  .auth-footer {
    border-color: #333;
  }

  .toggle-mode {
    color: #999;
  }

  .toggle-mode:hover {
    color: #fafafa;
  }

  .oauth-button {
    background: #1a1a1a;
    border-color: #333;
    color: #fafafa;
  }

  .oauth-button:hover:not(:disabled) {
    border-color: #666;
  }

  .divider::before {
    background: #333;
  }

  .divider-text {
    background: #1a1a1a;
    color: #666;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .auth-container {
    padding: 36px 28px;
  }

  .auth-title {
    font-size: 32px;
  }

  .auth-subtitle {
    font-size: 14px;
  }
}
</style>
