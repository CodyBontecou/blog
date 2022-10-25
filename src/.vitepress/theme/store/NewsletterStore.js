import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNewsletterStore = defineStore('newsletterStore', () => {
  const submitted = ref(false)
  const success = ref(false)

  function setSubmit(bool) {
    submitted.value = bool
  }

  function setSuccess(bool) {
    success.value = bool
  }

  return { submitted, success, setSubmit, setSuccess }
})
