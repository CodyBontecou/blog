<script setup>
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
// import { useScriptTag } from '@vueuse/core'
import { computed, ref, watch, onMounted } from 'vue'

const { Layout } = DefaultTheme
const route = useRoute()
const currentRoute = ref(route)
// const comment = ref('comment')

watch(route, (newRoute, oldRoute) => {
  currentRoute.value = newRoute.path
})

// useScriptTag(
//   'https://utteranc.es/client.js',
//   e => {
//     comment.value = e
//     console.log(comment.value)
//   },
//   {
//     async: true,
//     crossOrigin: 'anonymous',
//     options: {
//       repo: 'codybontecou/blog',
//       theme: 'github-dark',
//       'issue-term': currentRoute.value.path,
//     },
//   }
// )
</script>

<template>
  <Layout>
    <template #doc-after>
      <SimpleNewsletter />
      <Comments />
    </template>
  </Layout>
</template>
