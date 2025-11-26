---
created_at: 2025-10-12T21:44
last_modified: 2025-11-26T13:19
---

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()

const isLoading = ref(true)
const message = ref('')
const isSuccess = ref(false)

onMounted(async () => {
  // Get the token from the URL query parameters
  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get('token')

  if (!token) {
    message.value = 'Invalid unsubscribe link. Please check your email and try again.'
    isSuccess.value = false
    isLoading.value = false
    return
  }

  try {
    // Call the API endpoint to unsubscribe
    const response = await fetch(`/api/newsletter/unsubscribe?token=${encodeURIComponent(token)}`)
    const result = await response.json()

    message.value = result.message
    isSuccess.value = result.success

    if (result.success) {
      // Redirect to home page after 5 seconds
      setTimeout(() => {
        router.go('/')
      }, 5000)
    }
  } catch (error) {
    console.error('Unsubscribe error:', error)
    message.value = 'An error occurred while unsubscribing. Please try again.'
    isSuccess.value = false
  } finally {
    isLoading.value = false
  }
})
</script>

<div v-if="isLoading" class="flex flex-col items-center justify-center min-h-[60vh]">
  <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
  <span class="text-lg">Processing your request...</span>
</div>

<div v-else class="flex items-center justify-center min-h-[60vh] px-4">
  <div class="max-w-2xl w-full mx-auto text-center">
    <div v-if="isSuccess" class="space-y-6">
      <div class="text-8xl mb-6">✅</div>
      <h1 class="text-4xl font-bold mb-4">Successfully Unsubscribed</h1>
      <p class="text-xl mb-8 opacity-90">{{ message }}</p>
      <div class="space-y-3 opacity-75">
        <p class="text-base">
          Sorry to see you go! You can always resubscribe later by visiting the newsletter signup form.
        </p>
        <p class="text-sm">You'll be redirected to the home page in a few seconds...</p>
      </div>
    </div>

    <div v-else class="space-y-6">
      <div class="text-8xl mb-6">❌</div>
      <h1 class="text-4xl font-bold mb-4">Unsubscribe Failed</h1>
      <p class="text-xl mb-8 opacity-90">{{ message }}</p>
      <a href="/" class="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium">
        Return to Home
      </a>
    </div>
  </div>
</div>
