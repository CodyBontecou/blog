<template>
  <section ref="comments"></section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'

const comments = ref('')
const route = useRoute()

watch(route, (newRoute, _) => {
  createUtteranceScriptElement(newRoute.path)
})

onMounted(() => {
  createUtteranceScriptElement(route.path)
})

function createUtteranceScriptElement(path) {
  const script = document.createElement('script')

  script.setAttribute('src', 'https://utteranc.es/client.js')
  script.setAttribute('repo', 'codybontecou/blog')
  script.setAttribute('issue-term', route.path)
  script.setAttribute('label', 'Comments')
  script.setAttribute('theme', 'github-dark')
  script.setAttribute('crossorigin', 'anonymous')
  script.setAttribute('async', true)

  comments.value.innerHTML = ''
  comments.value.appendChild(script)
}
</script>
