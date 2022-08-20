<template>
  <div>
    <section class="mb-40" ref="comments"></section>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'

const comments = ref('')
const route = useRoute()

watch(route, (newRoute, oldRoute) => {
  comments.value.innerHTML = ''

  createUtteranceScriptElement(comments.value, newRoute.path)
})

onMounted(() => {
  createUtteranceScriptElement(comments.value, route.path)
})

function createUtteranceScriptElement(refValue, path) {
  const script = document.createElement('script')

  script.setAttribute('src', 'https://utteranc.es/client.js')
  script.setAttribute('repo', 'codybontecou/blog')
  script.setAttribute('issue-term', route.path)
  script.setAttribute('label', 'Comments')
  script.setAttribute('theme', 'github-dark')
  script.setAttribute('crossorigin', 'anonymous')
  script.setAttribute('async', true)

  refValue.appendChild(script)
}
</script>
