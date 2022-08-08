<script setup>
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import { ref, watch, getCurrentInstance } from 'vue'

const { Layout } = DefaultTheme
const route = useRoute()
const currentRoute = ref(route)
const instance = getCurrentInstance()

watch(route, (newRoute, oldRoute) => {
  currentRoute.value = newRoute.path
  console.log(currentRoute.value)
  instance?.proxy?.$forceUpdate()
})
</script>

<template>
  <Layout>
    <template #doc-after>
      <SimpleNewsletter />
      <Post
        repo="CodyBontecou/blog"
        theme="github-dark"
        :issue-term="currentRoute.value"
      />
    </template>
  </Layout>
</template>
