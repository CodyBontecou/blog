<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'

const comments = ref<HTMLElement>()
const route = useRoute()

// Watch for route changes to update comments for the specific article
watch(() => route.path, (newPath) => {
  if (comments.value) {
    createUtteranceScriptElement(newPath)
  }
}, { immediate: false })

onMounted(() => {
  createUtteranceScriptElement(route.path)
})

function createUtteranceScriptElement(path: string) {
  if (!comments.value) return
  
  const script = document.createElement('script')
  
  script.setAttribute('src', 'https://utteranc.es/client.js')
  script.setAttribute('repo', 'codybontecou/blog-nuxt-content')
  // Use the path without leading slash as the issue term to make it article-specific
  script.setAttribute('issue-term', path.replace(/^\//, ''))
  script.setAttribute('label', 'Comments')
  script.setAttribute('theme', 'github-light')
  script.setAttribute('crossorigin', 'anonymous')
  script.setAttribute('async', 'true')
  
  // Clear any existing comments and add the new script
  comments.value.innerHTML = ''
  comments.value.appendChild(script)
}
</script>

<template>
  <div>
    <div>
      <h3>Comments</h3>
      <p>
        Share your thoughts and feedback using GitHub comments.
      </p>
    </div>
    <section ref="comments"></section>
  </div>
</template>