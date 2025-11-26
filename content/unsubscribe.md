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

# Newsletter Unsubscribe

<div v-if="isLoading" class="flex items-center justify-center py-8">
  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  <span class="ml-2">Processing your request...</span>
</div>

<div v-else class="max-w-2xl mx-auto text-center py-8">
  <div v-if="isSuccess" class="text-green-600">
    <div class="text-6xl mb-4">✅</div>
    <h2 class="text-2xl font-bold mb-4">Successfully Unsubscribed</h2>
    <p class="text-lg mb-6">{{ message }}</p>
    <p class="text-sm text-gray-600 mb-4">
      Sorry to see you go! You can always resubscribe later by visiting the newsletter signup form.
    </p>
    <p class="text-sm text-gray-600">You'll be redirected to the home page in a few seconds...</p>
  </div>

  <div v-else class="text-red-600">
    <div class="text-6xl mb-4">❌</div>
    <h2 class="text-2xl font-bold mb-4">Unsubscribe Failed</h2>
    <p class="text-lg mb-6">{{ message }}</p>
    <a href="/" class="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90">
      Return to Home
    </a>
  </div>
</div>
