<template>
  <transition name="submit-popup">
    <slot :enabled="submitted" :message="message" :isError="isError">
      <div
        v-if="submitted"
        class="submit-popup"
        :class="{ error: isError }"
        data-cy="popup"
      >
        {{ message }}
      </div>
    </slot>
  </transition>
</template>

<script setup>
import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useNewsletterStore } from '../theme/store/NewsletterStore'

const newsletterStore = useNewsletterStore()
const { submitted, success } = storeToRefs(newsletterStore)

const message = computed(() => {
  if (!submitted) return ''
  return success ? 'Thank you for subscribing!' : 'Request failed!'
})

const isError = computed(() => {
  if (submitted && !success) return true
  return false
})

watch(submitted, (newVal, oldVal) => {
  if (newVal) {
    setTimeout(() => {
      newsletterStore.setSuccess(false)
      newsletterStore.setSubmit(false)
    }, 3000)
  }
})
</script>

<style>
.submit-popup {
  position: fixed;
  right: 1em;
  top: 6em;
  padding: 1em;
  border-radius: 3px;
  background-color: #4979ff;
  color: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
  text-align: center;
  z-index: 2;
}

.submit-popup button {
  margin-top: 0.5em;
  padding: 0.25em 2em;
}

.submit-popup button .error {
  background-color: white;
}

/* transition */
.submit-popup-enter-active,
.submit-popup-leave-active {
  transition: transform 0.8s;
}

.submit-popup-enter,
.submit-popup-leave-to {
  transform: translate(200%, 0);
}
</style>
