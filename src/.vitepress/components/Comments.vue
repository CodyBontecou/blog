<script setup>
import { useRoute } from 'vitepress'
import { onMounted, ref, watch } from 'vue'

const route = useRoute()
const currentRoute = ref(route)
const comment = ref('comment')

watch(route, (newRoute, oldRoute) => {
  currentRoute.value = newRoute.path

  let utterances = document.createElement('script')
  utterances.async = true
  utterances.setAttribute('src', 'https://utteranc.es/client.js')
  utterances.setAttribute('repo', 'codybontecou/blog')
  utterances.setAttribute('issue-term', newRoute.path)
  utterances.setAttribute('theme', 'github-dark')
  utterances.setAttribute('crossorigin', 'anonymous')

  while (comment.value.firstChild) {
    comment.value.removeChild(comment.value.firstChild)
  }

  comment.value.appendChild(utterances)
})

onMounted(() => {
  console.log('called')
  let utterances = document.createElement('script')
  utterances.async = true
  utterances.setAttribute('src', 'https://utteranc.es/client.js')
  utterances.setAttribute('repo', 'codybontecou/blog')
  utterances.setAttribute('issue-term', currentRoute.value)
  utterances.setAttribute('theme', 'github-dark')
  utterances.setAttribute('crossorigin', 'anonymous')

  comment.value.appendChild(utterances)
})

// watch(props.theme, (newTheme, oldTheme) => {
//   comment.querySelector('iframe').contentWindow.postMessage(
//     {
//       type: 'set-theme',
//       theme: newTheme,
//     },
//     'https://utteranc.es'
//   )
// })
</script>

<template>
  <div id="comments" ref="comment"></div>
</template>

<style scoped></style>
